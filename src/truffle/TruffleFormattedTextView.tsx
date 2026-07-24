import { CSSProperties, FC, useMemo } from 'react';
import { resolveHabboXmlTextStyle } from './HabboTruffleTextFormat';
import { TruffleTextFormat, TruffleTextView } from './TruffleTextView';

export interface FlashTextRun
{
    text: string;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    color?: number;
}

const decodeEntities = (value: string) => value
    .replace(/&nbsp;/gi, '\u00a0')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, '\'');

export const parseFlashTextRuns = (html: string): FlashTextRun[] =>
{
    const runs: FlashTextRun[] = [];
    const depth = { b: 0, i: 0, u: 0 };
    const fontColors: (number | undefined)[] = [];
    const currentColor = () => fontColors.length ? fontColors[fontColors.length - 1] : undefined;

    for(const token of String(html || '').split(/(<[^>]+>)/g).filter(Boolean))
    {
        if(token.startsWith('<'))
        {
            const match = token.match(/^<\s*(\/?)\s*(b|i|u)\b[^>]*>/i);

            if(match)
            {
                const key = match[2].toLocaleLowerCase() as keyof typeof depth;

                depth[key] = Math.max(0, depth[key] + (match[1] ? -1 : 1));
            }
            else if(/^<\s*font\b/i.test(token))
            {
                const colorMatch = token.match(/\bcolor\s*=\s*["']?#([0-9a-f]{6})/i);

                fontColors.push(colorMatch ? Number.parseInt(colorMatch[1], 16) : currentColor());
            }
            else if(/^<\s*\/\s*font\s*>$/i.test(token))
            {
                fontColors.pop();
            }
            else if(/^<\s*br\s*\/?\s*>$/i.test(token))
            {
                runs.push({ text: '\n', bold: depth.b > 0, italic: depth.i > 0, underline: depth.u > 0, color: currentColor() });
            }

            continue;
        }

        const text = decodeEntities(token);

        if(text) runs.push({ text, bold: depth.b > 0, italic: depth.i > 0, underline: depth.u > 0, color: currentColor() });
    }

    return runs.length ? runs : [ { text: decodeEntities(String(html || '').replace(/<[^>]*>/g, '')), bold: false, italic: false, underline: false, color: undefined } ];
};

export const flashTextRunFormat = (format: TruffleTextFormat, run: FlashTextRun): TruffleTextFormat =>
{
    const resolved = resolveHabboXmlTextStyle(format);

    if(typeof resolved === 'string') return resolved;

    return {
        ...resolved,
        bold: !!resolved.bold || run.bold,
        italic: !!resolved.italic || run.italic,
        underline: !!resolved.underline || run.underline
    };
};

interface TruffleFormattedTextViewProps
{
    text?: string;
    format: TruffleTextFormat;
    color?: number;
    className?: string;
    style?: CSSProperties;
}

export const TruffleFormattedTextView: FC<TruffleFormattedTextViewProps> = ({ text = '', format, color, className = '', style = {}}) =>
{
    const runs = useMemo(() => parseFlashTextRuns(text), [ text ]);

    return <span className={ `truffle-formatted-text ${ className }` } style={ style } aria-label={ runs.map(run => run.text).join('') }>
        { runs.map((run, index) => <TruffleTextView key={ `${ index }-${ run.text }` } text={ run.text } format={ flashTextRunFormat(format, run) } color={ run.color ?? color } />) }
    </span>;
};
