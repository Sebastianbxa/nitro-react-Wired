import { LocalizeText } from '../../../api';
import localizationSource from './default_localizations.txt?raw';

export type WiredLocalizationParameters = Record<string, string | number | boolean>;

const LOCALIZATIONS = new Map<string, string>();

for(const sourceLine of localizationSource.split(/\r?\n/))
{
    const line = sourceLine.trim();

    if(!line || line.startsWith('#')) continue;

    const separator = line.indexOf('=');

    if(separator <= 0) continue;

    LOCALIZATIONS.set(line.slice(0, separator), line.slice(separator + 1).replace(/\\n/g, '\n'));
}

const replaceParameters = (value: string, parameters: WiredLocalizationParameters) =>
    value.replace(/%([a-z0-9_]+)%/gi, (match, key: string) =>
        Object.prototype.hasOwnProperty.call(parameters, key) ? String(parameters[key]) : match);

export const getWiredLocalization = (key: string, parameters: WiredLocalizationParameters = {}) =>
{
    const localized = LOCALIZATIONS.get(key);

    return replaceParameters(localized === undefined ? LocalizeText(key) : localized, parameters);
};

export const resolveWiredCaption = (caption: string) =>
{
    let resolved = caption;

    for(let depth = 0; depth < 5; depth++)
    {
        const next = resolved
            .replace(/\$\{([^}]+)\}/g, (_match, key: string) => getWiredLocalization(key))
            .replace(/\$\{([^})]+)\)/g, (_match, key: string) => getWiredLocalization(key));

        if(next === resolved) break;

        resolved = next;
    }

    return resolved;
};

export const hasWiredLocalization = (key: string) => LOCALIZATIONS.has(key);
