import { preloadTruffle } from 'truffle-text/react';

let preloadPromise: ReturnType<typeof preloadTruffle>;
let cloveWarmupPromise: Promise<void>;
const CLOVE_STARTUP_STYLES: Array<string | Record<string, unknown>> = [
    'u_regular',
    'u_bold',
    'u_small',
    'u_frame_title',
    {
        fontFamily: 'Volter',
        size: 9,
        bold: false,
        italic: false,
        color: 0x000000,
        antiAliasType: 'normal',
        gridFitType: 'none',
        sharpness: 0,
        thickness: 0,
        kerning: false
    }
];

export const preloadNitroTruffle = () =>
{
    if(!preloadPromise)
    {
        preloadPromise = preloadTruffle({
            base: './assets/truffle',
            styles: null
        });
    }

    return preloadPromise;
};

export const preloadCloveTruffle = () =>
{
    if(!preloadPromise)
    {
        preloadPromise = preloadTruffle({
            base: './assets/truffle',
            styles: CLOVE_STARTUP_STYLES
        });
    }

    return preloadPromise;
};

export const warmCloveTruffle = () =>
{
    if(!cloveWarmupPromise)
    {
        cloveWarmupPromise = preloadCloveTruffle().then(truffle => new Promise<void>((resolve, reject) =>
        {
            const warmRemainingStyles = () => truffle.ensureAllStyles().then(resolve, reject);

            if(typeof window === 'undefined')
            {
                warmRemainingStyles();
                return;
            }

            window.requestAnimationFrame(() =>
            {
                const requestIdle = (window as Window & {
                    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
                }).requestIdleCallback;

                if(requestIdle) requestIdle(warmRemainingStyles, { timeout: 3000 });
                else window.setTimeout(warmRemainingStyles, 500);
            });
        }));
    }

    return cloveWarmupPromise;
};
