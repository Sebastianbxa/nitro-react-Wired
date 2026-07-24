import catalogJson from './data/assets.json';

export interface CloveAssetImage
{
    id: string;
    name: string;
    internalName: string;
    logicalNames: string[];
    manifestNames: string[];
    file: string;
    width: number;
    height: number;
    bytes: number;
    variant: number;
    variantCount: number;
    packages: string[];
}

export interface CloveAssetAlias
{
    name: string;
    ref: string;
    region: [number, number, number, number] | null;
    package: string;
}

export interface CloveAssetManifest
{
    id: string;
    component: string;
    imageCount: number;
}

export interface CloveAssetCatalog
{
    version: number;
    imageCount: number;
    uniqueNameCount: number;
    logicalNameCount: number;
    manifestCount: number;
    aliasCount: number;
    unresolvedManifestNames: string[];
    manifests: CloveAssetManifest[];
    aliases: CloveAssetAlias[];
    images: CloveAssetImage[];
}

export interface ResolvedCloveAsset
{
    image: CloveAssetImage;
    url: string;
    fallbackUrl?: string;
    region: [number, number, number, number] | null;
    alias?: CloveAssetAlias;
}

export const CLOVE_ASSET_CATALOG = catalogJson as unknown as CloveAssetCatalog;
const imagesById = new Map(CLOVE_ASSET_CATALOG.images.map(image => [ image.id, image ]));
const imagesByName = new Map<string, CloveAssetImage[]>();
const aliasesByName = new Map<string, CloveAssetAlias>();

for(const image of CLOVE_ASSET_CATALOG.images)
{
    const names = new Set([ image.name, image.internalName, ...image.logicalNames ]);

    for(const name of names)
    {
        const variants = imagesByName.get(name) || [];

        variants.push(image);
        imagesByName.set(name, variants);
    }
}

for(const alias of CLOVE_ASSET_CATALOG.aliases) if(!aliasesByName.has(alias.name)) aliasesByName.set(alias.name, alias);

const runtimeAssetBase = import.meta.env.DEV ? '/__clove-assets/clove' : '/nitro-assets/clove';

export const cloveAssetImageUrl = (image: CloveAssetImage) => `${ runtimeAssetBase }/${ encodeURIComponent(image.id) }.png`;
export const cloveAssetFallbackImageUrl = (image: CloveAssetImage) => import.meta.env.DEV ? `/__clove-decompile/${ encodeURIComponent(image.file) }` : '';
const resolvedSource = (image: CloveAssetImage, region: [number, number, number, number] | null, alias?: CloveAssetAlias): ResolvedCloveAsset => ({
    image,
    url: cloveAssetImageUrl(image),
    fallbackUrl: cloveAssetFallbackImageUrl(image) || undefined,
    region,
    ...(alias ? { alias } : {})
});

export const resolveCloveAsset = (assetName: string, preferredId = ''): ResolvedCloveAsset | null =>
{
    const preferred = preferredId ? imagesById.get(preferredId) : null;

    if(preferred && [ preferred.name, preferred.internalName, ...preferred.logicalNames ].includes(assetName)) return resolvedSource(preferred, null);

    const direct = imagesByName.get(assetName)?.[0];

    if(direct) return resolvedSource(direct, null);

    const alias = aliasesByName.get(assetName);
    const referenced = alias ? imagesByName.get(alias.ref)?.[0] : null;

    return alias && referenced ? resolvedSource(referenced, alias.region, alias) : null;
};

export const getCloveAssetImage = (id: string) => imagesById.get(id) || null;

const blobDataUrl = (blob: Blob) => new Promise<string>((resolve, reject) =>
{
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error || new Error('Unable to read asset data.'));
    reader.readAsDataURL(blob);
});

const loadImage = (url: string, fallbackUrl = '') => new Promise<HTMLImageElement>((resolve, reject) =>
{
    const image = new Image();
    let usingFallback = false;

    image.onload = () => resolve(image);
    image.onerror = () =>
    {
        if(fallbackUrl && !usingFallback)
        {
            usingFallback = true;
            image.src = fallbackUrl;
            return;
        }

        reject(new Error(`Unable to load ${ url }.`));
    };
    image.src = url;
});

const fetchAsset = async (source: ResolvedCloveAsset) =>
{
    let response = await fetch(source.url);

    if(!response.ok && source.fallbackUrl) response = await fetch(source.fallbackUrl);

    return response;
};

export const cloveAssetDataUrl = async (assetName: string, preferredId = '') =>
{
    const source = resolveCloveAsset(assetName, preferredId);

    if(!source) throw new Error(`Asset '${ assetName }' is not present in the generated catalog.`);

    if(!source.region)
    {
        const response = await fetchAsset(source);

        if(!response.ok) throw new Error(`Asset '${ assetName }' could not be loaded (${ response.status }).`);

        return blobDataUrl(await response.blob());
    }

    const image = await loadImage(source.url, source.fallbackUrl);
    const [ x, y, width, height ] = source.region;
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, x, y, width, height, 0, 0, width, height);

    return canvas.toDataURL('image/png');
};
