import { FC, ReactNode, useLayoutEffect, useRef } from 'react';
import { resolveCloveAsset } from '../clove/assetCatalog';

interface HabboNineSliceProps
{
    className?: string;
    children: ReactNode;
    skin: 'black' | 'white' | 'colorless';
    color?: number;
}

const HABBO_BLUE_SKIN_URL = resolveCloveAsset('habbo_blue_skin_png', '826_habbo_skin_blue_png')?.url || '';
let habboBlueSkinPromise: Promise<HTMLImageElement> = null;

const getHabboBlueSkin = () =>
{
    if(habboBlueSkinPromise) return habboBlueSkinPromise;

    habboBlueSkinPromise = new Promise((resolve, reject) =>
    {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = HABBO_BLUE_SKIN_URL;
    });

    return habboBlueSkinPromise;
}

export const HabboNineSlice: FC<HabboNineSliceProps> = props =>
{
    const { className = '', children = null, skin, color = 0xFFFFFF } = props;
    const canvasRef = useRef<HTMLCanvasElement>();

    useLayoutEffect(() =>
    {
        const canvas = canvasRef.current;

        if(!canvas) return;

        let disposed = false;
        let image: HTMLImageElement = null;
        const sourceY = (skin === 'black') ? 129 : ((skin === 'colorless') ? 229 : 29);

        const render = () =>
        {
            if(disposed || !image) return;

            const width = Math.round(canvas.clientWidth);
            const height = Math.round(canvas.clientHeight);

            if((width < 12) || (height < 12)) return;

            canvas.width = width;
            canvas.height = height;

            const context = canvas.getContext('2d');
            const source = document.createElement('canvas');
            const sourceContext = source.getContext('2d');

            source.width = 18;
            source.height = 18;
            sourceContext.drawImage(image, 0, sourceY, 18, 18, 0, 0, 18, 18);

            if(color !== 0xFFFFFF)
            {
                const imageData = sourceContext.getImageData(0, 0, 18, 18);
                const red = ((color >> 16) & 0xFF) / 255;
                const green = ((color >> 8) & 0xFF) / 255;
                const blue = (color & 0xFF) / 255;

                for(let index = 0; index < imageData.data.length; index += 4)
                {
                    imageData.data[index] *= red;
                    imageData.data[index + 1] *= green;
                    imageData.data[index + 2] *= blue;
                }

                sourceContext.putImageData(imageData, 0, 0);
            }

            context.clearRect(0, 0, width, height);
            context.imageSmoothingEnabled = false;

            const centerWidth = width - 12;
            const centerHeight = height - 12;
            const pieces: [number, number, number, number, number, number, number, number][] = [
                [ 0, 0, 6, 6, 0, 0, 6, 6 ], [ 6, 0, 1, 6, 6, 0, centerWidth, 6 ], [ 12, 0, 6, 6, width - 6, 0, 6, 6 ],
                [ 0, 6, 6, 1, 0, 6, 6, centerHeight ], [ 6, 6, 1, 1, 6, 6, centerWidth, centerHeight ], [ 12, 6, 6, 1, width - 6, 6, 6, centerHeight ],
                [ 0, 12, 6, 6, 0, height - 6, 6, 6 ], [ 6, 12, 1, 6, 6, height - 6, centerWidth, 6 ], [ 12, 12, 6, 6, width - 6, height - 6, 6, 6 ]
            ];

            pieces.forEach(piece => context.drawImage(source, ...piece));
        }

        const observer = new ResizeObserver(render);

        observer.observe(canvas);

        getHabboBlueSkin().then(value =>
        {
            image = value;
            render();
        });

        return () =>
        {
            disposed = true;
            observer.disconnect();
        }
    }, [ color, skin ]);

    return (
        <div className={ `habbo-nine-slice ${ className }` }>
            <canvas ref={ canvasRef } className="habbo-nine-slice-canvas" aria-hidden="true" />
            <div className="habbo-nine-slice-content">{ children }</div>
        </div>
    );
}
