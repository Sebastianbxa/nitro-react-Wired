import { FC, useLayoutEffect, useMemo, useRef } from 'react';
import { GetConfiguration } from '../../api';
import { resolveCloveAsset } from '../../clove/assetCatalog';
import { getSkinRegistryAssetUrl } from './SkinRegistryView';

interface HabboBitmapViewProps
{
    assetName: string;
    className?: string;
    alt?: string;
    stretchedX?: boolean;
    stretchedY?: boolean;
    pivotPoint?: string;
    zoomX?: number;
    zoomY?: number;
    tint?: number | string;
    greyscale?: boolean;
    etchingColor?: number;
    etchingX?: number;
    etchingY?: number;
}

const imagePromises = new Map<string, Promise<HTMLImageElement>>();

const loadImage = (url: string, fallbackUrl = '') =>
{
    const key = fallbackUrl ? url + '\n' + fallbackUrl : url;
    let promise = imagePromises.get(key);

    if(promise) return promise;

    promise = new Promise((resolve, reject) =>
    {
        const image = new Image();
        let usingFallback = false;

        image.onload = () => resolve(image);
        image.onerror = error =>
        {
            if(fallbackUrl && !usingFallback)
            {
                usingFallback = true;
                image.src = fallbackUrl;
                return;
            }

            reject(error);
        };
        image.src = url;
    });
    imagePromises.set(key, promise);

    return promise;
};

const pivotAxis = (pivotPoint: string, axis: 'x' | 'y') =>
{
    const pivot = (pivotPoint || 'top_left').toLowerCase().replace(/[\s-]+/g, '_');

    if(pivot === 'center' || pivot.includes(axis === 'x' ? 'center' : 'middle')) return .5;
    if(axis === 'x' && (pivot.includes('right') || pivot === 'east')) return 1;
    if(axis === 'y' && (pivot.includes('bottom') || pivot === 'south')) return 1;

    return 0;
};

export const HabboBitmapView: FC<HabboBitmapViewProps> = props =>
{
    const { assetName, className = '', alt = '', stretchedX = true, stretchedY = true, pivotPoint = 'top_left', zoomX = 1, zoomY = 1, tint, greyscale = false, etchingColor = 0, etchingX = 0, etchingY = -1 } = props;
    const canvasRef = useRef<HTMLCanvasElement>();
    const source = useMemo(() =>
    {
        const expandedAssetName = assetName.replace(/\$\{([^}]+)\}/g, (_match, key: string) =>
        {
            const configured = GetConfiguration<string>(key, '');

            // The supplied Nitro config omits this legacy Flash alias even
            // though the XML uses it for achievement/group-entry backgrounds.
            if(!configured && key === 'image.library.questing.url') return `${ GetConfiguration<string>('image.library.url', '') }Quests/`;

            return configured;
        });
        const catalog = resolveCloveAsset(assetName) || resolveCloveAsset(expandedAssetName);
        const directUrl = /^(?:data:|blob:|\.?\/|https?:\/\/)/.test(expandedAssetName) || /\.png(?:[?#].*)?$/i.test(expandedAssetName) ? expandedAssetName : '';

        return catalog
            ? { url: catalog.url, fallbackUrl: catalog.fallbackUrl, region: catalog.region }
            : { url: getSkinRegistryAssetUrl(assetName) || directUrl, fallbackUrl: undefined as string | undefined, region: null as [number, number, number, number] | null };
    }, [ assetName ]);

    useLayoutEffect(() =>
    {
        const canvas = canvasRef.current;

        if(!canvas || !source.url) return;

        let disposed = false;
        let version = 0;
        const render = async () =>
        {
            const renderVersion = ++version;
            const width = Math.round(canvas.clientWidth);
            const height = Math.round(canvas.clientHeight);

            if(!width || !height) return;

            const image = await loadImage(source.url, source.fallbackUrl);

            if(disposed || renderVersion !== version) return;

            const [ sourceX, sourceY, naturalWidth, naturalHeight ] = source.region || [ 0, 0, image.naturalWidth, image.naturalHeight ];
            const drawnWidth = Math.abs(Math.round((stretchedX ? width : naturalWidth) * zoomX));
            const drawnHeight = Math.abs(Math.round((stretchedY ? height : naturalHeight) * zoomY));
            const x = Math.round((width - drawnWidth) * pivotAxis(pivotPoint, 'x'));
            const y = Math.round((height - drawnHeight) * pivotAxis(pivotPoint, 'y'));
            const flippedX = zoomX < 0;
            const flippedY = zoomY < 0;

            canvas.width = width;
            canvas.height = height;

            const context = canvas.getContext('2d');

            context.imageSmoothingEnabled = false;
            context.clearRect(0, 0, width, height);

            const drawBitmap = (target: CanvasRenderingContext2D, targetX: number, targetY: number) =>
            {
                target.save();
                target.translate(targetX + (flippedX ? drawnWidth : 0), targetY + (flippedY ? drawnHeight : 0));
                target.scale(flippedX ? -1 : 1, flippedY ? -1 : 1);
                target.drawImage(image, sourceX, sourceY, naturalWidth, naturalHeight, 0, 0, drawnWidth, drawnHeight);
                target.restore();
            };

            const etchingAlpha = ((etchingColor >>> 24) & 0xFF) / 255;

            if(etchingAlpha >= .001)
            {
                const etchingCanvas = document.createElement('canvas');
                const etchingContext = etchingCanvas.getContext('2d');

                etchingCanvas.width = width;
                etchingCanvas.height = height;
                etchingContext.imageSmoothingEnabled = false;
                drawBitmap(etchingContext, x + etchingX, y + etchingY);
                etchingContext.globalCompositeOperation = 'source-in';
                etchingContext.fillStyle = `rgba(${ (etchingColor >>> 16) & 0xFF }, ${ (etchingColor >>> 8) & 0xFF }, ${ etchingColor & 0xFF }, ${ etchingAlpha })`;
                etchingContext.fillRect(0, 0, width, height);
                context.drawImage(etchingCanvas, 0, 0);
            }

            drawBitmap(context, x, y);

            if(greyscale || typeof tint === 'number')
            {
                const pixels = context.getImageData(0, 0, width, height);
                const data = pixels.data;
                const redMultiplier = typeof tint === 'number' ? ((tint >>> 16) & 0xFF) / 255 : 1;
                const greenMultiplier = typeof tint === 'number' ? ((tint >>> 8) & 0xFF) / 255 : 1;
                const blueMultiplier = typeof tint === 'number' ? (tint & 0xFF) / 255 : 1;

                for(let index = 0; index < data.length; index += 4)
                {
                    if(greyscale)
                    {
                        const luminance = (data[index] * .212671) + (data[index + 1] * .71516) + (data[index + 2] * .072169);

                        data[index] = luminance * redMultiplier;
                        data[index + 1] = luminance * greenMultiplier;
                        data[index + 2] = luminance * blueMultiplier;
                    }
                    else
                    {
                        data[index] *= redMultiplier;
                        data[index + 1] *= greenMultiplier;
                        data[index + 2] *= blueMultiplier;
                    }
                }

                context.putImageData(pixels, 0, 0);
            }
            else if(typeof tint === 'string')
            {

                context.globalCompositeOperation = 'source-atop';
                context.fillStyle = tint;
                context.fillRect(x, y, drawnWidth, drawnHeight);
                context.globalCompositeOperation = 'source-over';
            }
        };
        const observer = new ResizeObserver(render);

        observer.observe(canvas);
        render().catch(() => undefined);

        return () =>
        {
            disposed = true;
            observer.disconnect();
        };
    }, [ etchingColor, etchingX, etchingY, greyscale, pivotPoint, source, stretchedX, stretchedY, tint, zoomX, zoomY ]);

    if(!source.url) return null;

    return <canvas ref={ canvasRef } className={ `habbo-bitmap-view ${ className }`.trim() } role={ alt ? 'img' : undefined } aria-label={ alt || undefined } data-asset-uri={ assetName } />;
};
