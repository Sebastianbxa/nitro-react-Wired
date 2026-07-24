import type { TruffleBuffer } from 'truffle-text';
import { getTruffle } from 'truffle-text/react';
import { FC, useLayoutEffect, useMemo, useRef } from 'react';
import { VOLTER_BOLD_MODIFIED } from './TruffleVolterBoldText';

interface TruffleVolterLinkTextProps
{
    text: string;
}

const VOLTER_BOLD_WHITE_UNDERLINED = {
    ...VOLTER_BOLD_MODIFIED,
    underline: true
};

export const TruffleVolterLinkText: FC<TruffleVolterLinkTextProps> = props =>
{
    const { text = '' } = props;
    const canvasRef = useRef<HTMLCanvasElement>();
    const buffer = useMemo<TruffleBuffer>(() => getTruffle()?.renderToBuffer(text, VOLTER_BOLD_WHITE_UNDERLINED), [ text ]);

    useLayoutEffect(() =>
    {
        if(!buffer || !canvasRef.current) return;

        canvasRef.current.getContext('2d').putImageData(
            new ImageData(new Uint8ClampedArray(buffer.data), buffer.width, buffer.height), 0, 0);
    }, [ buffer ]);

    if(!buffer) return null;

    return <canvas ref={ canvasRef } width={ buffer.width } height={ buffer.height } role="img" aria-label={ text } />;
}
