import type { RenderOptions, TruffleBuffer } from 'truffle-text';
import { getTruffle } from 'truffle-text/react';
import { FC, useLayoutEffect, useMemo, useRef } from 'react';
import { resolveHabboXmlTextStyle } from './HabboTruffleTextFormat';

export type TruffleTextFormat = string | Record<string, unknown>;
const failedTruffleFormats = new Set<string>();

interface TruffleTextViewProps
{
    text?: string | number;
    format: TruffleTextFormat;
    className?: string;
    color?: number;
    wordWrap?: boolean;
    width?: number;
    maxHeight?: number;
    ellipsis?: boolean;
    tooltipOnEllipsis?: boolean;
}

export const TruffleTextView: FC<TruffleTextViewProps> = props =>
{
    const { text = '', format, className = '', color, wordWrap = false, width, maxHeight, ellipsis = false, tooltipOnEllipsis = false } = props;
    const value = String(text ?? '');
    const canvasRef = useRef<HTMLCanvasElement>();
    const rendered = useMemo<{ buffer: TruffleBuffer | null; truncated: boolean }>(() =>
    {
        const safeWidth = typeof width === 'number' && Number.isFinite(width) && width > 0 ? Math.min(16384, Math.round(width)) : undefined;
        const safeMaxHeight = typeof maxHeight === 'number' && Number.isFinite(maxHeight) && maxHeight > 0 ? Math.min(16384, Math.round(maxHeight)) : undefined;
        const options: RenderOptions = { wordWrap, width: safeWidth };

        if(color !== undefined) options.color = color;

        const truffle = getTruffle();

        if(!truffle) return null;

        const render = (candidate: string) =>
        {
            try
            {
                const result = truffle.renderToBuffer(candidate, resolveHabboXmlTextStyle(format), options);
                const pixels = result.width * result.height;

                if(!Number.isInteger(result.width) || !Number.isInteger(result.height) || result.width < 1 || result.height < 1 || result.width > 16384 || result.height > 16384 || pixels > 16777216 || !result.data || result.data.length !== pixels * 4) return null;

                return result;
            }
            catch(error)
            {
                const failureKey = typeof format === 'string' ? format : JSON.stringify(format);

                if(!failedTruffleFormats.has(failureKey))
                {
                    failedTruffleFormats.add(failureKey);
                    console.error('[TruffleTextView] Truffle failed to render a text format.', { error, format });
                }

                return null;
            }
        };

        let buffer = render(value);
        const exceedsBounds = (candidate: TruffleBuffer | null) => !!candidate
            && ((safeWidth !== undefined && candidate.width > safeWidth)
                || (safeMaxHeight !== undefined && candidate.height > safeMaxHeight));

        if(!buffer || !ellipsis || !exceedsBounds(buffer)) return { buffer, truncated: false };

        const characters = Array.from(value);
        let low = 0;
        let high = characters.length;
        let best = '...';

        while(low <= high)
        {
            const middle = Math.floor((low + high) / 2);
            const candidate = `${ characters.slice(0, middle).join('').trimEnd() }...`;
            const candidateBuffer = render(candidate);

            if(candidateBuffer && !exceedsBounds(candidateBuffer))
            {
                best = candidate;
                low = middle + 1;
            }
            else
            {
                high = middle - 1;
            }
        }

        buffer = render(best);

        return { buffer, truncated: true };
    }, [ color, ellipsis, format, maxHeight, value, width, wordWrap ]);
    const buffer = rendered.buffer;

    useLayoutEffect(() =>
    {
        const canvas = canvasRef.current;

        if(!buffer || !canvas) return;

        const context = canvas.getContext('2d');

        if(!context) return;

        try
        {
            context.putImageData(new ImageData(new Uint8ClampedArray(buffer.data), buffer.width, buffer.height), 0, 0);
        }
        catch
        {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [ buffer ]);

    if(!buffer) return null;

    return <canvas
        ref={ canvasRef }
        width={ buffer.width }
        height={ buffer.height }
        className={ className }
        role="img"
        aria-label={ value }
        title={ tooltipOnEllipsis && rendered.truncated ? value : undefined } />;
}
