const { readFile, readdir, mkdir, writeFile, mkdtemp, rm, stat } = require('node:fs/promises');
const { existsSync, readFileSync } = require('node:fs');
const { join, resolve, extname, basename } = require('node:path');
const { tmpdir } = require('node:os');

const SOURCE_ROOT = 'C:\\Users\\steet\\Desktop\\DecompiledHabbo\\scripts\\_assets';
const OUTPUT_ROOT = 'C:\\Users\\steet\\Desktop\\MenuFiles';
const CLOVE_ROOT = 'C:\\Users\\steet\\Desktop\\clove';
const DRY_RUN = process.argv.includes('--dry-run');

const groups = [
    {
        tier: 'Core (Tiers 1-3)', folder: '', names: [
            'catalog_ubuntu_with_tabs', 'catalog_ubuntu',
            'layout_default', 'itemGridWidget', 'gridItem', 'gridItem_with_price_multi', 'gridItem_with_price_single',
            'productViewWidget', 'purchaseWidget', 'totalPriceWidget', 'priceDisplayWidget', 'colourGridWidget',
            'layout_frontpage', 'layout_frontpage_featured'
        ]
    },
    {
        tier: 'Tier 4', folder: 'Tier 4', names: [
            'layout_vip_buy', 'layout_loyalty_vip_buy', 'layout_club_buy', 'layout_club_gifts', 'layout_recycler',
            { name: 'layout_info_recycler', aliases: [ 'layout_recycler_info' ] }, 'layout_recycler_prizes',
            'layout_marketplace', 'layout_marketplace_own_items', 'layout_pets', 'layout_info_pets2', 'layout_info_pets3',
            'layout_petcustomization', 'layout_trophies', 'layout_roomads', 'layout_spaces_new', 'layout_soundmachine',
            'layout_monkey', 'layout_info_rentables', 'layout_info_duckets', 'layout_info_loyalty',
            'layout_guild_custom_furni', 'layout_guild_frontpage', 'layout_guild_forum', 'layout_badge_display',
            'layout_single_bundle', 'layout_builders_club_addons', 'layout_builders_club_loyalty', 'layout_builders_club_frontpage'
        ]
    },
    {
        tier: 'Tier 5', folder: 'Tier 5', names: [
            'vipBuyWidget', 'loyaltyVipBuyWidget', 'vipGiftWidget', 'clubBuyWidget', 'clubGiftWidget', 'recyclerWidget',
            'recyclerPrizesWidget', 'recyclerPrizesWidgetLevelItem', 'marketPlaceWidget', 'marketPlaceOwnItemsWidget',
            'petsWidget', 'newPetsWidget', 'petPreviewWidget', 'trophyWidget', 'roomAdsCatalogWidget', 'spacesNewWidget',
            'traxPreviewWidget', { name: 'songdisk_view', aliases: [ 'songDiskProductViewWidget' ] },
            'guildSelectorWidget', 'guildBadgeViewWidget', 'guildForumSelectorWidget', 'badgeDisplayWidget',
            'bundleGridScrollWidget', 'bundlePurchaseExtraInfoWidget', 'builderWidget', 'builderSubscriptionWidget',
            'builderAddonsWidget', 'builderLoyaltyWidget'
        ]
    },
    {
        tier: 'Tier 6', folder: 'Tier 6', names: [
            'singleViewWidget', 'redeemItemCodeWidget', 'textInputWidget', 'specialInfoWidget', 'activityPointDisplayWidget',
            'addOnBadgeViewWidget', 'soldLtdItemsWidget', 'spinnerWidget', 'warningWidget', 'firstProductAutoSelectorWidget',
            'featuredItemsWidget', 'limitedItemWidget', 'madMoneyWidget', 'buyGuildWidget', 'roomPreviewWidget'
        ]
    },
    {
        tier: 'Tier 7', folder: 'Tier 7', names: [
            'habbo_orderinfo_dialog', 'habbo_orderinfo_gift_checked', 'habbo_orderinfo_gift_unchecked',
            'habbo_orderinfo_nocredits', 'habbo_orderinfo_cantbuycredits', 'habbo_orderinfo_receiver_suggestion',
            'purchase_confirmation', 'club_buy_confirmation', 'club_gift_confirmation', 'club_extend_confirmation',
            'club_buy_hc_item', 'club_buy_info_item', 'club_buy_vip_item', 'club_buy_vip_upgrade_item',
            'club_gift_preview', 'club_gift_list_item', 'vip_buy_item', 'vip_benefits', 'rent_confirmation',
            'gift_wrapping', 'purchaseButtons', 'purchaseWidgetBuyVipStub', 'marketplace_purchase_confirmation',
            'club_direct_buy', 'club_direct_buy_success'
        ]
    },
    {
        tier: 'Tier 8', folder: 'Tier 8', names: [
            'targeted_offer_dialog', 'targeted_offer_dialog_variation', 'targeted_offer_minimized',
            'targeted_offer_purchase_confirmation', 'targeted_offer_habbomall', 'collectible_hub', 'collectible_reward',
            'vault_view', 'special_items_display', 'marketplace_search_simple', 'marketplace_search_advanced',
            'marketplace_offer_details', 'mint_grid_item'
        ]
    }
];

const elementChildren = node => Array.from(node.childNodes || []).filter(child => child.nodeType === 1);
const attributesOf = element => Object.fromEntries(Array.from(element.attributes || [], attribute => [ attribute.name, attribute.value ]));
const directChild = (element, tagName) => elementChildren(element).find(child => child.tagName === tagName);
const widgetChildren = element => element.tagName === 'layout'
    ? elementChildren(directChild(element, 'window') || {})
    : elementChildren(directChild(element, 'children') || {});

const parseVariables = element => elementChildren(directChild(element, 'variables') || {})
    .filter(child => child.tagName === 'var')
    .map(child => ({
        key: child.getAttribute('key') || '',
        value: child.getAttribute('value') || '',
        type: child.getAttribute('type') || 'String'
    }));

const parseNode = (element, path) =>
{
    const attributes = attributesOf(element);
    const variables = parseVariables(element);

    return {
        id: path.join('.'), type: element.tagName, attributes, originalAttributes: { ...attributes }, variables,
        originalVariables: variables.map(variable => ({ ...variable })),
        children: widgetChildren(element).map((child, index) => parseNode(child, [ ...path, index ])),
        structureChanged: false
    };
};

const parseLayoutXml = (sourceXml, DOMParser) =>
{
    const errors = [];
    const parsed = new DOMParser({
        onError: (level, message) =>
        {
            if(level !== 'warning') errors.push(message);
        }
    }).parseFromString(sourceXml, 'application/xml');

    if(errors.length) throw new Error(errors.join('; '));
    const layout = parsed.documentElement;
    if(!layout || layout.tagName !== 'layout') throw new Error(`Expected a <layout> root, received <${ layout?.tagName || 'none' }>.`);
    const attributes = attributesOf(layout);

    return {
        name: attributes.name || 'untitled', width: Number(attributes.width || 320), height: Number(attributes.height || 200),
        attributes, sourceXml, nodes: widgetChildren(layout).map((child, index) => parseNode(child, [ index ])),
        structureChanged: false
    };
};

const flattenNodes = nodes => nodes.flatMap(node => [ node, ...flattenNodes(node.children) ]);
const variableValue = (node, key) => node.variables.find(variable => variable.key === key)?.value || '';
const componentNameOf = name =>
{
    const words = name.split(/[^A-Za-z0-9]+/).filter(Boolean);
    const base = words.map(word => `${ word.charAt(0).toUpperCase() }${ word.slice(1) }`).join('') || 'HabboWindow';
    return `${ /^\d/.test(base) ? `Layout${ base }` : base }View`;
};

const compileCloveExporter = async () =>
{
    const TypeScript = require(join(CLOVE_ROOT, 'node_modules', 'typescript'));
    const runtimeRoot = await mkdtemp(join(tmpdir(), 'clove-batch-'));
    const sourceFiles = [
        [ 'src/clove/model/layoutXml.ts', 'clove/model/layoutXml.js' ],
        [ 'src/clove/customSkins.ts', 'clove/customSkins.js' ],
        [ 'src/clove/exportTsx.ts', 'clove/exportTsx.js' ]
    ];

    for(const [ sourceRelative, outputRelative ] of sourceFiles)
    {
        const source = await readFile(join(CLOVE_ROOT, sourceRelative), 'utf8');
        const output = TypeScript.transpileModule(source, {
            compilerOptions: { module: TypeScript.ModuleKind.CommonJS, target: TypeScript.ScriptTarget.ES2022, esModuleInterop: true }
        }).outputText;
        const outputPath = join(runtimeRoot, outputRelative);
        await mkdir(resolve(outputPath, '..'), { recursive: true });
        await writeFile(outputPath, output, 'utf8');
    }

    return { generate: require(join(runtimeRoot, 'clove', 'exportTsx.js')).generateCloveTsxExport, runtimeRoot };
};

const buildAssetResolver = async imageCropper =>
{
    const catalog = JSON.parse(await readFile(join(CLOVE_ROOT, 'src', 'clove', 'data', 'libraryAssets.json'), 'utf8'));
    const skinSource = await readFile(join(CLOVE_ROOT, 'src', 'clove', 'data', 'skinAssets.ts'), 'utf8');
    const skinAssets = new Set(Array.from(skinSource.matchAll(/^\s*"([^"]+)":/gm), match => match[1]));
    const imagesById = new Map(catalog.images.map(image => [ image.id, image ]));
    const imagesByName = new Map();
    const aliasesByName = new Map();

    for(const image of catalog.images)
    {
        for(const name of new Set([ image.id, image.name, image.internalName, ...image.logicalNames ]))
        {
            const variants = imagesByName.get(name) || [];
            variants.push(image);
            imagesByName.set(name, variants);
        }
    }
    for(const alias of catalog.aliases) if(!aliasesByName.has(alias.name)) aliasesByName.set(alias.name, alias);

    const resolveAsset = assetName =>
    {
        const direct = imagesByName.get(assetName)?.[0];
        if(direct) return { image: direct, region: null };
        const alias = aliasesByName.get(assetName);
        const referenced = alias ? imagesByName.get(alias.ref)?.[0] : null;
        return alias && referenced ? { image: referenced, region: alias.region } : null;
    };

    const mimeOf = filePath => ({
        '.png': 'image/png', '.gif': 'image/gif', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
        '.bmp': 'image/bmp', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.avif': 'image/avif'
    })[extname(filePath).toLowerCase()] || 'application/octet-stream';

    const dataUrl = async resolvedAsset =>
    {
        const image = resolvedAsset.image;
        const relativePath = image.source === 'library' && image.relativePath ? image.relativePath : `${ image.id }.png`;
        const filePath = join(CLOVE_ROOT, 'assets', 'images', 'library', relativePath);
        if(!existsSync(filePath)) throw new Error(`Bundled asset file is missing: ${ filePath }`);
        const contents = await readFile(filePath);

        if(!resolvedAsset.region) return `data:${ mimeOf(filePath) };base64,${ contents.toString('base64') }`;
        if(!imageCropper) throw new Error('An image cropper is required to crop an aliased asset.');
        const [ x, y, width, height ] = resolvedAsset.region;
        const cropped = await imageCropper(contents, { x, y, width, height });
        return `data:image/png;base64,${ cropped.toString('base64') }`;
    };

    return { skinAssets, resolveAsset, dataUrl };
};

const findSources = async () =>
{
    const fileNames = await readdir(SOURCE_ROOT);
    const sourceIndex = new Map();

    for(const fileName of fileNames)
    {
        const match = fileName.match(/^(\d+)_(.+)_xml\$.*\.bin$/i);
        if(!match) continue;
        const key = match[2].toLowerCase();
        const values = sourceIndex.get(key) || [];
        values.push({ number: Number(match[1]), fileName, path: join(SOURCE_ROOT, fileName), matchedName: match[2] });
        sourceIndex.set(key, values);
    }

    const resolutions = [];
    for(const group of groups)
    {
        for(const rawTarget of group.names)
        {
            const target = typeof rawTarget === 'string' ? { name: rawTarget, aliases: [] } : rawTarget;
            const lookupNames = [ target.name, ...(target.aliases || []) ];
            const candidates = lookupNames.flatMap(name => sourceIndex.get(name.toLowerCase()) || [])
                .filter((candidate, index, all) => all.findIndex(item => item.fileName === candidate.fileName) === index)
                .sort((left, right) => left.number - right.number);
            resolutions.push({ tier: group.tier, folder: group.folder, requestedName: target.name, lookupNames, candidates, selected: candidates.at(-1) || null });
        }
    }

    return resolutions;
};

const safeWrite = async (filePath, contents, updateExisting = false) =>
{
    await mkdir(resolve(filePath, '..'), { recursive: true });
    if(existsSync(filePath))
    {
        const existing = await readFile(filePath);
        const next = Buffer.isBuffer(contents) ? contents : Buffer.from(contents, 'utf8');
        if(existing.equals(next)) return 'unchanged';
        if(updateExisting)
        {
            await writeFile(filePath, contents);
            return 'updated';
        }
        throw new Error(`Refusing to overwrite a different existing file: ${ filePath }`);
    }
    await writeFile(filePath, contents);
    return 'written';
};

const mappingMarkdown = (resolutions, results) =>
{
    const byName = new Map(results.map(result => [ `${ result.tier }\0${ result.requestedName }`, result ]));
    const lines = [
        '# Catalog Clove batch export mapping', '',
        'When more than one exact decompiled filename matched a requested name, the highest numbered asset was selected. All candidates are listed.', '',
        '| Tier | Requested grep name | Selected asset | XML layout / TSX | Other matching asset numbers | Status |',
        '| --- | --- | ---: | --- | --- | --- |'
    ];

    for(const resolution of resolutions)
    {
        const result = byName.get(`${ resolution.tier }\0${ resolution.requestedName }`);
        const selected = resolution.selected?.number ?? '—';
        const alternates = resolution.candidates.filter(candidate => candidate !== resolution.selected).map(candidate => candidate.number).join(', ') || '—';
        const output = result?.componentName ? `${ result.layoutName } / ${ result.componentName }.tsx` : '—';
        const status = result?.status || (resolution.selected ? 'not exported' : 'missing');
        lines.push(`| ${ resolution.tier } | \`${ resolution.requestedName }\` | ${ selected } | ${ output } | ${ alternates } | ${ status } |`);
    }

    lines.push('', `Generated ${ new Date().toISOString() }.` , '');
    return lines.join('\n');
};

const run = async imageCropper =>
{
    const { DOMParser } = require(join(CLOVE_ROOT, 'node_modules', '@xmldom', 'xmldom'));
    const resolutions = await findSources();
    const results = [];
    let runtimeRoot = '';

    if(DRY_RUN)
    {
        for(const resolution of resolutions)
        {
            results.push({ ...resolution, status: resolution.selected ? 'dry-run selected' : 'missing' });
        }
    }
    else
    {
        const compiled = await compileCloveExporter();
        runtimeRoot = compiled.runtimeRoot;
        const assets = await buildAssetResolver(imageCropper);
        const outputClaims = new Map();
        const parsedByResolution = new Map();
        const naturalOutputCounts = new Map();

        for(const resolution of resolutions)
        {
            if(!resolution.selected) continue;
            try
            {
                const xml = await readFile(resolution.selected.path, 'utf8');
                const document = parseLayoutXml(xml, DOMParser);
                parsedByResolution.set(resolution, { document });
                const naturalKey = `${ resolution.folder }\0${ componentNameOf(document.name) }`.toLowerCase();
                naturalOutputCounts.set(naturalKey, (naturalOutputCounts.get(naturalKey) || 0) + 1);
            }
            catch(error)
            {
                parsedByResolution.set(resolution, { error });
            }
        }

        for(const resolution of resolutions)
        {
            if(!resolution.selected)
            {
                results.push({ ...resolution, status: 'missing' });
                continue;
            }

            try
            {
                const parsed = parsedByResolution.get(resolution);
                if(parsed?.error) throw parsed.error;
                const document = parsed.document;
                const embeddedNodes = flattenNodes(document.nodes).filter(node =>
                {
                    if(node.type !== 'static_bitmap') return false;
                    const assetName = variableValue(node, 'asset_uri');
                    return !!assetName && !!assets.resolveAsset(assetName) && !assets.skinAssets.has(assetName);
                });
                const embeddedAssets = [];
                for(const node of embeddedNodes)
                {
                    const assetName = variableValue(node, 'asset_uri');
                    embeddedAssets.push({ nodeId: node.id, assetName, dataUrl: await assets.dataUrl(assets.resolveAsset(assetName)) });
                }
                const naturalKey = `${ resolution.folder }\0${ componentNameOf(document.name) }`.toLowerCase();
                const hasNaturalCollision = (naturalOutputCounts.get(naturalKey) || 0) > 1;
                const collisionComponentName = componentNameOf(resolution.requestedName);
                const generated = compiled.generate(document, [], embeddedAssets, hasNaturalCollision
                    ? { componentName: collisionComponentName, fileBase: collisionComponentName }
                    : {});
                const targetDirectory = join(OUTPUT_ROOT, resolution.folder);
                const tsxPath = join(targetDirectory, `${ generated.fileBase }.tsx`);
                const slotsPath = join(targetDirectory, `${ generated.fileBase }.slots.md`);
                const claimKey = tsxPath.toLowerCase();
                if(outputClaims.has(claimKey)) throw new Error(`Output collision with ${ outputClaims.get(claimKey) } at ${ tsxPath}`);
                outputClaims.set(claimKey, `${ resolution.requestedName } (${ resolution.selected.number })`);
                const tsxStatus = await safeWrite(tsxPath, generated.tsx, true);
                const slotsStatus = await safeWrite(slotsPath, generated.slotGuide, true);
                results.push({ ...resolution, status: tsxStatus === 'unchanged' && slotsStatus === 'unchanged' ? 'unchanged' : 'exported', layoutName: document.name, componentName: generated.componentName, embeddedAssetCount: embeddedAssets.length });
            }
            catch(error)
            {
                results.push({ ...resolution, status: `ERROR: ${ error instanceof Error ? error.message : String(error) }` });
            }
        }
    }

    const report = mappingMarkdown(resolutions, results);
    if(DRY_RUN) process.stdout.write(`${ report }\n`);
    else
    {
        const reportPath = join(OUTPUT_ROOT, 'CatalogExportMapping.md');
        if(existsSync(reportPath)) await writeFile(reportPath, report, 'utf8');
        else await safeWrite(reportPath, report);
        process.stdout.write(`${ report }\n`);
    }

    if(runtimeRoot)
    {
        const resolvedTemp = resolve(runtimeRoot);
        const resolvedBase = resolve(tmpdir());
        if(resolvedTemp.startsWith(`${ resolvedBase }\\`) && basename(resolvedTemp).startsWith('clove-batch-')) await rm(resolvedTemp, { recursive: true, force: true });
    }

    const failures = results.filter(result => result.status === 'missing' || result.status.startsWith('ERROR:'));
    return failures.length ? 2 : 0;
};

if(DRY_RUN)
{
    run(null).then(code => { process.exitCode = code; }).catch(error => { console.error(error); process.exitCode = 1; });
}
else
{
    const sharp = require('C:\\Users\\steet\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules\\.pnpm\\sharp@0.34.5\\node_modules\\sharp');
    const crop = (contents, region) => sharp(contents).extract({ left: region.x, top: region.y, width: region.width, height: region.height }).png().toBuffer();
    run(crop).then(code => { process.exitCode = code; }).catch(error => { console.error(error); process.exitCode = 1; });
}
