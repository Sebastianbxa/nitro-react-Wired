import { HABBO_STYLES } from 'truffle-text';
import { getTruffle } from 'truffle-text/react';
import { createContext, CSSProperties, FC, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, ReactNode, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { applyHabboXmlTextRendering, flashTextRunFormat, parseFlashTextRuns, TruffleFormattedTextView, TruffleTextView } from '../../truffle';
import { HabboBitmapView } from './HabboBitmapView';
import { getHabboChromeContentInsets, habboChromeDrawsOwnSkin, HabboChromeView, hasHabboChromeLayout } from './HabboChromeView';
import { HabboResolvedSkin, resolveHabboNodeSkin, resolveWindowType, styleFamily } from './HabboWindowTypeRegistry';
import { getSkinRegistryLayoutGeometry, HabboSkinState, SkinRegistryView } from './SkinRegistryView';
import './HabboLayoutView.scss';

export interface HabboLayoutVariable
{
    key: string;
    value: string;
    type?: string;
}

export interface HabboLayoutNode
{
    id: string;
    type: string;
    attributes: Record<string, string>;
    variables: HabboLayoutVariable[];
    children: HabboLayoutNode[];
    editorSkin?: HabboResolvedSkin;
}

export interface HabboLayoutDefinition
{
    name: string;
    width: number;
    height: number;
    nodes: HabboLayoutNode[];
}

export interface HabboLayoutViewProps
{
    layout: HabboLayoutDefinition;
    className?: string;
    slots?: Partial<Record<string, ReactNode>>;
    visibility?: Partial<Record<string, boolean>>;
    captions?: Partial<Record<string, string>>;
    itemListOrder?: Partial<Record<string, string[]>>;
    geometryOverrides?: Partial<Record<string, Partial<HabboNodeGeometry>>>;
    rootSize?: { width: number; height: number };
    initialActiveTabs?: Record<string, string>;
    resolveCaption?: (caption: string) => string;
    showPlaceholders?: boolean;
    onAction?: (name: string, event: ReactMouseEvent<HTMLElement>) => void;
    onTabChange?: (contextName: string, tabName: string) => void;
    onClose?: () => void;
}

export interface HabboLayoutRuntimeController
{
    rootSize?: HabboLayoutViewProps['rootSize'];
    geometryOverrides?: HabboLayoutViewProps['geometryOverrides'];
    textColors?: Partial<Record<string, number>>;
    colors?: Partial<Record<string, number>>;
    hoverColors?: Partial<Record<string, number>>;
    hoverTextColors?: Partial<Record<string, number>>;
    textStyles?: Partial<Record<string, string>>;
    backgroundColors?: Partial<Record<string, number>>;
    skinOverrides?: Partial<Record<string, HabboResolvedSkin>>;
    enabled?: Partial<Record<string, boolean>>;
    selected?: Partial<Record<string, boolean>>;
    interactive?: Partial<Record<string, boolean>>;
    blends?: Partial<Record<string, number>>;
    appendedSlots?: Partial<Record<string, ReactNode>>;
    collections?: Partial<Record<string, HabboLayoutRuntimeCollection>>;
    resizable?: boolean;
    onResize?: (size: { width: number; height: number }) => void;
}

export interface HabboLayoutRuntimeNodeOverride
{
    attributes?: Partial<Record<string, string>>;
    variables?: Partial<Record<string, string>>;
}

export interface HabboLayoutRuntimeCollectionItem
{
    key: string;
    template: string;
    overrides?: Partial<Record<string, HabboLayoutRuntimeNodeOverride>>;
    collections?: Partial<Record<string, HabboLayoutRuntimeCollection>>;
}

export interface HabboLayoutRuntimeCollection
{
    templates: string[];
    items: HabboLayoutRuntimeCollectionItem[];
}

const HabboLayoutRuntimeContext = createContext<HabboLayoutRuntimeController>(null);

export const HabboLayoutRuntimeProvider: FC<{ controller: HabboLayoutRuntimeController; children: ReactNode }> = ({ controller, children }) =>
    <HabboLayoutRuntimeContext.Provider value={ controller }>{ children }</HabboLayoutRuntimeContext.Provider>;

const INTERACTIVE_TYPES = new Set([ 'button', 'button_thick', 'container_button', 'iconbutton', 'closebutton', 'button_group_left', 'button_group_center', 'button_group_right', 'tab_button', 'tab_container_button', 'dropmenu', 'checkbox', 'radiobutton', 'radio_button', 'switch', 'scaler', 'region', 'link', 'bitmap' ]);
const TEXT_TYPES = new Set([ 'text', 'formatted_text', 'html', 'label', 'link', 'input', 'button', 'button_thick', 'button_group_left', 'button_group_center', 'button_group_right', 'tab_button', 'tab_container_button', 'dropmenu' ]);
// Sulake window type table maps both `itemlist` and `itemlist_vertical` to
// ItemListController type 50. Type 51 is the horizontal variant.
const ITEMLIST_TYPES = new Set([ 'itemlist', 'itemlist_vertical', 'itemlist_horizontal', 'scrollable_itemlist_vertical' ]);
const BOXSIZER_TYPES = new Set([ 'boxsizer', 'box_sizer' ]);
// Sulake source: core/window/utils/§_-n1r§.as (Glaze param table).
const WINDOW_PARAM_EXPAND_TO_ACCOMMODATE_CHILDREN = 0x020000;
const WINDOW_PARAM_RESIZE_TO_ACCOMMODATE_CHILDREN = 0x024000;
const WINDOW_PARAM_REFLECT_HORIZONTAL_RESIZE_TO_PARENT = 0x400000;
const WINDOW_PARAM_REFLECT_VERTICAL_RESIZE_TO_PARENT = 0x800000;
const failedTextMeasurements = new Set<string>();
const warnedMultiTagOverrides = new Set<string>();
const FLASH_FONT_STYLE_ALIASES: Record<string, keyof typeof HABBO_STYLES> = {
    'Volter': 'regular',
    'Volter Bold': 'bold',
    'Ubuntu': 'u_regular'
};

const variable = (node: HabboLayoutNode, key: string) => node.variables.find(value => value.key === key)?.value;
const numberAttribute = (node: HabboLayoutNode, name: string, fallback = 0) => Number(node.attributes[name] ?? fallback);
const flattenNodes = (nodes: HabboLayoutNode[]): HabboLayoutNode[] => nodes.flatMap(node => [ node, ...flattenNodes(node.children) ]);
const displayCaption = (caption = '') =>
{
    try
    {
        return decodeURIComponent(caption);
    }
    catch
    {
        return caption;
    }
};
const argbBackground = (value = '') =>
{
    const color = Number(value) >>> 0;
    const alpha = color >>> 24;

    if(!alpha) return undefined;

    const red = (color >>> 16) & 0xFF;
    const green = (color >>> 8) & 0xFF;
    const blue = color & 0xFF;

    return `rgba(${ red }, ${ green }, ${ blue }, ${ alpha / 255 })`;
};
const rgbColor = (value = '0xffffff') => `#${ (Number(value) & 0xFFFFFF).toString(16).padStart(6, '0') }`;
const skinForType = (type: string, style: string) =>
{
    const entry = resolveWindowType(type, style);

    return entry?.renderer === 'skin' && entry.registryId && entry.layout ? { registryId: entry.registryId, layout: entry.layout } : null;
};
const isPlaceholder = (node: HabboLayoutNode) => node.type === 'widget'
    || node.type === 'bitmap'
    || node.type.includes('itemgrid')
    || (node.type === 'static_bitmap' && !variable(node, 'asset_uri'));
const decodeSlotName = (value: string) =>
{
    try
    {
        return decodeURIComponent(value);
    }
    catch
    {
        return value;
    }
};
const nodeNames = (node: HabboLayoutNode) => [
    node.attributes.name,
    node.attributes.id,
    node.id
].filter(Boolean).map(decodeSlotName);
const nodeTags = (node: HabboLayoutNode) => (node.attributes.tags || '').split(/[\s,]+/).filter(Boolean).map(decodeSlotName);
const runtimeOverrideMatches = (node: HabboLayoutNode, name: string) => name === '$self' || nodeNames(node).includes(name) || nodeTags(node).includes(name);
const cloneRuntimeTemplate = (template: HabboLayoutNode, item: HabboLayoutRuntimeCollectionItem, parentId: string, siblingIndex: number) =>
{
    const cloneNode = (source: HabboLayoutNode, id: string, isRoot = false): HabboLayoutNode =>
    {
        const clone: HabboLayoutNode = {
            ...source,
            id,
            attributes: { ...source.attributes },
            variables: source.variables.map(entry => ({ ...entry })),
            children: []
        };

        for(const [ name, override ] of Object.entries(item.overrides || {}))
        {
            if((name === '$self' && !isRoot) || !runtimeOverrideMatches(clone, name)) continue;

            Object.assign(clone.attributes, override.attributes || {});

            for(const [ key, value ] of Object.entries(override.variables || {}))
            {
                const existing = clone.variables.find(entry => entry.key === key);

                if(existing) existing.value = value;
                else clone.variables.push({ key, value });
            }
        }

        clone.children = source.children.map((child, index) => cloneNode(child, `${ id }.${ index }`));

        return clone;
    };
    const safeKey = item.key.replace(/[^a-zA-Z0-9_-]/g, '_');

    return cloneNode(template, `${ parentId }.runtime_${ safeKey }_${ siblingIndex }`, true);
};
const materializeRuntimeCollections = (nodes: HabboLayoutNode[], collections: Partial<Record<string, HabboLayoutRuntimeCollection>>) =>
{
    if(!Object.keys(collections || {}).length) return nodes;

    const templates = new Map<string, HabboLayoutNode>();

    for(const node of flattenNodes(nodes))
    {
        for(const name of nodeNames(node)) if(!templates.has(name)) templates.set(name, node);
    }

    const applyCollections = (node: HabboLayoutNode, requested: Partial<Record<string, HabboLayoutRuntimeCollection>>, allowSelf = true): HabboLayoutNode =>
    {
        let clone: HabboLayoutNode = {
            ...node,
            attributes: { ...node.attributes },
            variables: node.variables.map(entry => ({ ...entry })),
            children: node.children.map(child => applyCollections(child, requested, false))
        };
        const matching = Object.entries(requested).find(([ name ]) => (allowSelf && name === '$self') || nodeNames(clone).includes(name) || nodeTags(clone).includes(name));

        if(!matching) return clone;

        const collection = matching[1];
        const templateNames = new Set(collection.templates);
        const retainedChildren = clone.children.filter(child => !nodeNames(child).some(name => templateNames.has(name)));
        const runtimeChildren = collection.items.map((item, index) =>
        {
            const template = templates.get(item.template);

            if(!template) throw new Error(`[HabboLayoutView] Missing runtime collection template "${ item.template }" in ${ clone.attributes.name || clone.id }.`);

            let runtimeNode = cloneRuntimeTemplate(template, item, clone.id, index);

            if(item.collections) runtimeNode = applyCollections(runtimeNode, item.collections);

            return runtimeNode;
        });

        clone = { ...clone, children: [ ...retainedChildren, ...runtimeChildren ] };

        return clone;
    };

    return nodes.map(node => applyCollections(node, collections));
};
const warnMultiTagOverride = (kind: string, tag: string, matches: HabboLayoutNode[]) =>
{
    const warningKey = `${ kind }:${ tag }`;

    if(warnedMultiTagOverrides.has(warningKey)) return;

    warnedMultiTagOverrides.add(warningKey);
    console.warn(`[HabboLayoutView] Ambiguous ${ kind } tag "${ tag }" matches ${ matches.length } nodes: ${ matches.map(match => match.attributes.name || match.id).join(', ') }.`);
};
const overrideNameForNode = <T,>(node: HabboLayoutNode, values: Partial<Record<string, T>>, allNodes: HabboLayoutNode[], kind: string) =>
{
    const exactName = nodeNames(node).find(candidate => Object.prototype.hasOwnProperty.call(values, candidate));

    if(exactName) return exactName;

    for(const tag of nodeTags(node))
    {
        if(!Object.prototype.hasOwnProperty.call(values, tag)) continue;

        // A key that names a node is never also treated as a tag. Sulake uses
        // tags as broad lookup groups, so allowing both makes one runtime
        // caption/slot silently overwrite unrelated windows.
        if(allNodes.some(candidate => nodeNames(candidate).includes(tag))) continue;

        const matches = allNodes.filter(candidate => nodeTags(candidate).includes(tag));

        if(matches.length > 1)
        {
            // Visibility tags are authored lookup groups in Sulake XML and
            // intentionally target every matching node (for example all
            // `arrow_right` icons in an avatar context menu).
            if(kind !== 'visibility override') warnMultiTagOverride(kind, tag, matches);
            return tag;
        }

        return tag;
    }

    return undefined;
};
const overrideForNode = <T,>(node: HabboLayoutNode, values: Partial<Record<string, T>>, allNodes: HabboLayoutNode[], kind: string) =>
{
    const name = overrideNameForNode(node, values, allNodes, kind);

    return name ? values[name] : undefined;
};
const ancestorOverride = <T,>(parentId: string, values: Partial<Record<string, T>>, allNodes: HabboLayoutNode[]) =>
{
    let ancestorId = parentId;

    while(ancestorId)
    {
        const ancestor = allNodes.find(candidate => candidate.id === ancestorId);

        if(!ancestor) break;
        if(ancestor.attributes.name && Object.prototype.hasOwnProperty.call(values, ancestor.attributes.name)) return values[ancestor.attributes.name];
        ancestorId = ancestor.id.includes('.') ? ancestor.id.slice(0, ancestor.id.lastIndexOf('.')) : '';
    }

    return undefined;
};
const textFormat = (node: HabboLayoutNode, styleOverride?: string) =>
{
    const presetOnly = styleOverride?.startsWith('preset:');
    const controllerStyle = presetOnly ? styleOverride.slice(7) : styleOverride;
    const family = styleFamily(node.attributes.style);
    const windowLayout = resolveWindowType(node.type, node.attributes.style || '0')?.windowLayout || '';
    const buttonStyle = windowLayout.includes('button_shiny_thick') || windowLayout.includes('button_shiny_large')
        ? 'button_shiny_bold'
        : windowLayout.includes('button_shiny')
            ? 'button_shiny_regular'
            : node.type === 'button_thick'
                ? 'button_bold'
                : 'button_regular';
    const defaultStyle = node.type === 'frame'
        ? (family === 'ubuntu' ? 'u_frame_title' : family === 'blue' ? 'frame_title' : family === 'illumina-dark' ? 'id_frame_title' : 'il_frame_title')
        : ([ 'button', 'button_thick' ].includes(node.type) ? buttonStyle : family === 'ubuntu' ? 'u_regular' : family === 'blue' ? 'regular' : 'il_regular');
    const authoredStyleName = controllerStyle || variable(node, 'text_style');
    const fontFace = variable(node, 'font_face');
    const authoredBold = variable(node, 'bold') === 'true';
    const authoredItalic = variable(node, 'italic') === 'true';
    const mappedFontStyle = fontFace ? FLASH_FONT_STYLE_ALIASES[fontFace] : undefined;
    let styleName = authoredStyleName || mappedFontStyle || defaultStyle;

    if(!authoredStyleName && mappedFontStyle)
    {
        if(mappedFontStyle === 'regular' || mappedFontStyle === 'bold') styleName = authoredItalic ? (authoredBold || mappedFontStyle === 'bold' ? 'bold_italic' : 'italic') : (authoredBold || mappedFontStyle === 'bold' ? 'bold' : 'regular');
        if(mappedFontStyle === 'u_regular') styleName = authoredItalic ? (authoredBold ? 'u_bold_italic' : 'u_italic') : (authoredBold ? 'u_bold' : 'u_regular');
    }

    const base = HABBO_STYLES[styleName];

    if(!base)
    {
        const message = `[HabboLayoutView] Unknown Habbo text style "${ String(styleName) }" on ${ node.attributes.name || node.id }.`;

        console.error(message);
        throw new Error(message);
    }

    if(fontFace && !authoredStyleName && !mappedFontStyle)
    {
        const message = `[HabboLayoutView] Unknown Flash font_face "${ fontFace }" on ${ node.attributes.name || node.id }.`;

        console.error(message);
        throw new Error(message);
    }

    const format: Record<string, unknown> = { ...base };
    const size = variable(node, 'font_size');

    if(size && !presetOnly) format.size = Number(size);

    if(!authoredStyleName)
    {
        if(variable(node, 'bold')) format.bold = authoredBold;
        if(variable(node, 'italic')) format.italic = authoredItalic;
    }
    if(variable(node, 'underline')) format.underline = variable(node, 'underline') === 'true';
    if(variable(node, 'spacing')) format.letterSpacing = Number(variable(node, 'spacing'));
    if(variable(node, 'leading')) format.leading = Number(variable(node, 'leading'));
    if(variable(node, 'sharpness')) format.sharpness = Number(variable(node, 'sharpness'));
    if(variable(node, 'thickness')) format.thickness = Number(variable(node, 'thickness'));
    if(variable(node, 'kerning')) format.kerning = variable(node, 'kerning') === 'true';

    return applyHabboXmlTextRendering(format, {
        antiAliasType: variable(node, 'antialias_type'),
        gridFitType: variable(node, 'grid_fit_type')
    });
};

export interface HabboNodeGeometry
{
    x: number;
    y: number;
    width: number;
    height: number;
}

const constrainedSize = (node: HabboLayoutNode, axis: 'width' | 'height', value: number) =>
{
    const minimum = numberAttribute(node, `${ axis }_min`, 1);
    const maximum = numberAttribute(node, `${ axis }_max`, 0);
    const constrained = Math.max(1, minimum, Math.ceil(value));

    return maximum > 0 ? Math.min(constrained, maximum) : constrained;
};

const anchoredXAfterResize = (x: number, authoredWidth: number, nextWidth: number, params: number) =>
{
    const horizontalAnchor = params & 0x0C0000;

    if(horizontalAnchor === 0x040000) return x + authoredWidth - nextWidth;
    if(horizontalAnchor === 0x0C0000) return x + Math.trunc((authoredWidth - nextWidth) / 2);

    return x;
};

const anchoredYAfterResize = (y: number, authoredHeight: number, nextHeight: number, params: number) =>
{
    const verticalAnchor = params & 0x300000;

    if(verticalAnchor === 0x100000) return y + authoredHeight - nextHeight;
    if(verticalAnchor === 0x300000) return y + Math.trunc((authoredHeight - nextHeight) / 2);

    return y;
};

export const measureHabboText = (text: string, format: string | Record<string, unknown>, width?: number) =>
{
    const truffle = getTruffle();

    if(!truffle || !text) return null;

    try
    {
        const measured = truffle.measure(text, format, width ? { width, wordWrap: true } : undefined);
        const charBounds = measured.charBounds as { right?: number; bottom?: number; y?: number; height?: number }[];
        const terminalAdvance = charBounds.reduce((maximum, bounds) => Math.max(maximum, Number(bounds?.right) || 0), 0);
        const terminalBottom = charBounds.reduce((maximum, bounds) => Math.max(maximum, Number(bounds?.bottom) || ((Number(bounds?.y) || 0) + (Number(bounds?.height) || 0))), 0);

        // Flash getCharBoundaries().right is the terminal glyph advance in
        // TextField coordinates, including the authored left field gutter.
        // It therefore captures the final glyph advance and letter spacing
        // without a per-window padding guess. The bottom edge is likewise read
        // from the actual laid-out character bounds so wrapped descenders keep
        // the TextField gutter and per-line rounding used by the renderer.
        return {
            ...measured,
            textWidth: Math.ceil(Math.max(measured.textWidth, terminalAdvance)),
            textHeight: Math.ceil(Math.max(measured.textHeight, terminalBottom))
        };
    }
    catch(error)
    {
        const failureKey = JSON.stringify(format);

        if(!failedTextMeasurements.has(failureKey))
        {
            failedTextMeasurements.add(failureKey);
            console.error('[HabboLayoutView] Truffle failed to measure an authored text format.', { error, format });
        }

        return null;
    }
};

const measureHabboFormattedText = (text: string, format: string | Record<string, unknown>) =>
{
    let textWidth = 0;
    let textHeight = 0;

    for(const run of parseFlashTextRuns(text))
    {
        const measured = measureHabboText(run.text, flashTextRunFormat(format, run));

        if(!measured) return null;

        textWidth += measured.textWidth;
        textHeight = Math.max(textHeight, measured.textHeight);
    }

    return { textWidth, textHeight };
};

const resolvedNodeCaption = (node: HabboLayoutNode, captions: Partial<Record<string, string>>, resolveCaption: (caption: string) => string, allNodes: HabboLayoutNode[]) =>
{
    const override = overrideForNode(node, captions, allNodes, 'caption override');

    if(override !== undefined) return override;

    // ButtonMenuView assigns captions to the named action container, then
    // writes that value into its immediate generic child named `label`.
    // Do not walk the full ancestor chain: doing so makes unrelated catalog
    // row text inherit the frame caption (for example every row becomes Shop).
    if([ 'label', 'text' ].includes(node.type))
    {
        const parentId = node.id.includes('.') ? node.id.slice(0, node.id.lastIndexOf('.')) : '';
        const parent = allNodes.find(candidate => candidate.id === parentId);
        const inherited = parent?.attributes.name && Object.prototype.hasOwnProperty.call(captions, parent.attributes.name)
            ? captions[parent.attributes.name]
            : undefined;

        if(inherited !== undefined) return inherited;
    }

    return resolveCaption(displayCaption(node.attributes.caption || ''));
};

const baseNodeGeometry = (node: HabboLayoutNode, captions: Partial<Record<string, string>>, textStyles: Partial<Record<string, string>>, resolveCaption: (caption: string) => string, allNodes: HabboLayoutNode[]): HabboNodeGeometry =>
{
    let x = numberAttribute(node, 'x');
    const y = numberAttribute(node, 'y');
    const resolvedSkin = resolveHabboNodeSkin(node);
    const skinGeometry = resolvedSkin && node.type !== 'icon' ? getSkinRegistryLayoutGeometry(resolvedSkin.registryId, resolvedSkin.layout) : null;
    let width = Math.max(1, numberAttribute(node, 'width', 40), numberAttribute(node, 'width_min'), skinGeometry?.minWidth || 0);
    let height = Math.max(1, numberAttribute(node, 'height', 20), numberAttribute(node, 'height_min'), skinGeometry?.minHeight || 0);
    const caption = resolvedNodeCaption(node, captions, resolveCaption, allNodes);

    // Sulake source: core/window/components/ButtonController.as update(),
    // WE_CHILD_RESIZED sets width=0. The themed _BTN_TEXT label contributes its
    // 8px left and right margins, and WindowController.setRectangle() preserves
    // the node's right/center anchor bits while the width changes.
    if(node.type === 'button' && caption && (Number(node.attributes.params || 0) & WINDOW_PARAM_EXPAND_TO_ACCOMMODATE_CHILDREN) !== 0)
    {
        const measured = measureHabboText(caption, textFormat(node, overrideForNode(node, textStyles, allNodes, 'text style override')));
        const authoredWidth = width;
        const nextWidth = constrainedSize(node, 'width', (measured?.textWidth || 0) + 16);

        x = anchoredXAfterResize(x, authoredWidth, nextWidth, Number(node.attributes.params || 0));
        width = nextWidth;
    }

    const autoSize = variable(node, 'auto_size');
    // Sulake source: TextController.setAutoSize() uses a left-autosized Flash
    // TextField for every enabled mode, but refreshTextImage() only resizes the
    // window width for auto_size="left". Center/right retain the authored
    // width and apply the matching text alignment inside that window.
    const autoSizesToText = node.type === 'label' || ([ 'text', 'formatted_text', 'html', 'link' ].includes(node.type) && !!autoSize && autoSize !== 'none');

    if(autoSizesToText && caption)
    {
        const marginLeft = Number(variable(node, 'margin_left') || 0);
        const marginRight = Number(variable(node, 'margin_right') || 0);
        const marginTop = Number(variable(node, 'margin_top') || 0);
        const marginBottom = Number(variable(node, 'margin_bottom') || 0);
        const wordWrap = variable(node, 'word_wrap') === 'true';
        const format = textFormat(node, overrideForNode(node, textStyles, allNodes, 'text style override'));
        const measured = node.type === 'formatted_text' || node.type === 'html'
            ? measureHabboFormattedText(caption, format)
            : measureHabboText(caption, format, wordWrap ? Math.max(1, width - marginLeft - marginRight) : undefined);

        if(measured)
        {
            if(!wordWrap && (!autoSize || autoSize === 'left'))
            {
                const authoredWidth = width;
                // Flash TextField.autoSize includes the 2px trailing field
                // gutter beyond the final character boundary.
                const flashTrailingTextFieldGutter = 2;
                const nextWidth = constrainedSize(node, 'width', measured.textWidth + marginLeft + marginRight + flashTrailingTextFieldGutter);

                x = anchoredXAfterResize(x, authoredWidth, nextWidth, Number(node.attributes.params || 0));
                width = nextWidth;
            }
            height = constrainedSize(node, 'height', Math.max(height, measured.textHeight + marginTop + marginBottom));
        }
    }

    return { x, y, width, height };
};

export interface HabboLayoutGeometryOptions
{
    captions?: Partial<Record<string, string>>;
    textStyles?: Partial<Record<string, string>>;
    itemListOrder?: Partial<Record<string, string[]>>;
    slots?: Partial<Record<string, ReactNode>>;
    resolveCaption?: (caption: string) => string;
    isVisible?: (node: HabboLayoutNode) => boolean;
    rootSize?: { width: number; height: number };
    geometryOverrides?: Partial<Record<string, Partial<HabboNodeGeometry>>>;
}

export const getHabboLayoutGeometry = (nodes: HabboLayoutNode[], options: HabboLayoutGeometryOptions = {}) =>
{
    const allNodes = flattenNodes(nodes);
    const parentById = new Map<string, HabboLayoutNode>();
    const captions = options.captions || {};
    const textStyles = options.textStyles || {};
    const itemListOrder = options.itemListOrder || {};
    const slots = options.slots || {};
    const resolveCaption = options.resolveCaption || (value => value);
    const isVisible = options.isVisible || (node => node.attributes.visible !== 'false');
    const resolved: Record<string, HabboNodeGeometry> = {};

    const mapParents = (children: HabboLayoutNode[], parent?: HabboLayoutNode) =>
    {
        for(const child of children)
        {
            if(parent) parentById.set(child.id, parent);
            mapParents(child.children, child);
        }
    };

    mapParents(nodes);

    allNodes.forEach(node => resolved[node.id] = baseNodeGeometry(node, captions, textStyles, resolveCaption, allNodes));

    for(const node of allNodes)
    {
        const override = overrideForNode(node, options.geometryOverrides || {}, allNodes, 'geometry override');

        if(override) resolved[node.id] = { ...resolved[node.id], ...override };
    }

    // Sulake source: core/window/WindowController.as updateScaleRelativeToParent().
    // 0x80/0x800 stretch, 0x40/0x400 move, and 0xC0/0xC00 center the child
    // when its parent changes size. WindowRectLimits clamps every result.
    const applyParentResize = (nodesToResize: HabboLayoutNode[], parent?: HabboLayoutNode) =>
    {
        for(const [ index, node ] of nodesToResize.entries())
        {
            const geometry = resolved[node.id];

            if(!parent && index === 0 && options.rootSize)
            {
                geometry.width = constrainedSize(node, 'width', options.rootSize.width);
                geometry.height = constrainedSize(node, 'height', options.rootSize.height);
            }
            else if(parent)
            {
                const parentGeometry = resolved[parent.id];
                const widthDelta = parentGeometry.width - numberAttribute(parent, 'width', parentGeometry.width);
                const heightDelta = parentGeometry.height - numberAttribute(parent, 'height', parentGeometry.height);
                const params = Number(node.attributes.params || 0);
                const horizontalScale = params & 0xC0;
                const verticalScale = params & 0x0C00;

                if(horizontalScale === 0x80) geometry.width = constrainedSize(node, 'width', geometry.width + widthDelta);
                else if(horizontalScale === 0x40) geometry.x += widthDelta;
                else if(horizontalScale === 0xC0) geometry.x = Math.floor(parentGeometry.width / 2) - Math.floor(geometry.width / 2);

                if(verticalScale === 0x0800) geometry.height = constrainedSize(node, 'height', geometry.height + heightDelta);
                else if(verticalScale === 0x0400) geometry.y += heightDelta;
                else if(verticalScale === 0x0C00) geometry.y = Math.floor(parentGeometry.height / 2) - Math.floor(geometry.height / 2);
            }

            applyParentResize(node.children, node);
        }
    };

    applyParentResize(nodes);

    // Sulake source: WindowController.as WE_RESIZED. A child carrying the
    // 0x400000/0x800000 reflection flags grows or shrinks its parent by the
    // same delta. The parent then sends WE_PARENT_RESIZED to its other
    // children, so anchored chrome (the avatar-menu minimize region is the
    // canonical example) follows a resize-on-update list.
    const applyResizeDeltaToChildren = (parent: HabboLayoutNode, previousParentGeometry: HabboNodeGeometry, sourceChildId = '') =>
    {
        const parentGeometry = resolved[parent.id];
        const widthDelta = parentGeometry.width - previousParentGeometry.width;
        const heightDelta = parentGeometry.height - previousParentGeometry.height;

        if(!widthDelta && !heightDelta) return;

        for(const child of parent.children)
        {
            if(child.id === sourceChildId) continue;

            const geometry = resolved[child.id];
            const previousGeometry = { ...geometry };
            const params = Number(child.attributes.params || 0);
            const horizontalScale = params & 0xC0;
            const verticalScale = params & 0x0C00;

            if(horizontalScale === 0x80) geometry.width = constrainedSize(child, 'width', geometry.width + widthDelta);
            else if(horizontalScale === 0x40) geometry.x += widthDelta;
            else if(horizontalScale === 0xC0) geometry.x = Math.floor(parentGeometry.width / 2) - Math.floor(geometry.width / 2);

            if(verticalScale === 0x0800) geometry.height = constrainedSize(child, 'height', geometry.height + heightDelta);
            else if(verticalScale === 0x0400) geometry.y += heightDelta;
            else if(verticalScale === 0x0C00) geometry.y = Math.floor(parentGeometry.height / 2) - Math.floor(geometry.height / 2);

            if((geometry.width !== previousGeometry.width) || (geometry.height !== previousGeometry.height))
            {
                applyResizeDeltaToChildren(child, previousGeometry);
            }
        }
    };

    // Sulake source: core/window/components/BoxSizerController.as. Only
    // visible children participate. The controller is horizontal by default,
    // applies authored spacing/padding, and divides the remaining axis among
    // relative(n) children by weight.
    for(const box of allNodes.filter(node => BOXSIZER_TYPES.has(node.type)))
    {
        const boxGeometry = resolved[box.id];
        const spacing = Number(variable(box, 'spacing') ?? 5);
        const paddingHorizontal = Number(variable(box, 'padding_horizontal') ?? 8);
        const paddingVertical = Number(variable(box, 'padding_vertical') ?? 8);
        const vertical = variable(box, 'vertical') === 'true';
        const children = box.children.filter(isVisible);
        const relativeValue = (child: HabboLayoutNode) =>
        {
            for(const tag of nodeTags(child))
            {
                const match = tag.match(/relative\((-?\d+)\)/i);

                if(match) return Math.max(0, Number(match[1]));
            }

            return 0;
        };
        const relativeSum = children.reduce((sum, child) => sum + relativeValue(child), 0);
        let relativeSpace = (vertical ? boxGeometry.height - (paddingVertical * 2) : boxGeometry.width - (paddingHorizontal * 2));

        for(const child of children) relativeSpace -= (relativeValue(child) > 0 ? spacing : (vertical ? resolved[child.id].height : resolved[child.id].width) + spacing);
        relativeSpace += children.length ? spacing : 0;

        let previous: HabboLayoutNode = null;

        for(const child of children)
        {
            const geometry = resolved[child.id];
            const previousGeometry = { ...geometry };
            const weight = relativeValue(child);

            if(vertical)
            {
                geometry.x = paddingHorizontal;
                geometry.y = previous ? resolved[previous.id].y + resolved[previous.id].height + spacing : paddingVertical;
                if(weight > 0 && relativeSum > 0) geometry.height = constrainedSize(child, 'height', relativeSpace * weight / relativeSum);
            }
            else
            {
                geometry.x = previous ? resolved[previous.id].x + resolved[previous.id].width + spacing : paddingHorizontal;
                geometry.y = paddingVertical;
                if(weight > 0 && relativeSum > 0) geometry.width = constrainedSize(child, 'width', relativeSpace * weight / relativeSum);
            }

            if((geometry.width !== previousGeometry.width) || (geometry.height !== previousGeometry.height)) applyResizeDeltaToChildren(child, previousGeometry);
            previous = child;
        }
    }

    const reflectResizeToParent = (node: HabboLayoutNode, previousGeometry: HabboNodeGeometry) =>
    {
        const parent = parentById.get(node.id);

        if(!parent) return;

        const params = Number(node.attributes.params || 0);
        const geometry = resolved[node.id];
        const reflectedWidthDelta = (params & WINDOW_PARAM_REFLECT_HORIZONTAL_RESIZE_TO_PARENT) !== 0 ? geometry.width - previousGeometry.width : 0;
        const reflectedHeightDelta = (params & WINDOW_PARAM_REFLECT_VERTICAL_RESIZE_TO_PARENT) !== 0 ? geometry.height - previousGeometry.height : 0;

        if(!reflectedWidthDelta && !reflectedHeightDelta) return;

        const previousParentGeometry = { ...resolved[parent.id] };
        const controlledRoot = !parentById.has(parent.id) && options.rootSize;

        // A controlled root is already at the controller's final dimensions.
        // Its reflected child chain still has to resize, but applying the same
        // delta to the root again would double-count that controller resize.
        if(!controlledRoot)
        {
            const parentGeometry = resolved[parent.id];
            const nextWidth = constrainedSize(parent, 'width', parentGeometry.width + reflectedWidthDelta);
            const nextHeight = constrainedSize(parent, 'height', parentGeometry.height + reflectedHeightDelta);
            const widthDelta = nextWidth - parentGeometry.width;
            const heightDelta = nextHeight - parentGeometry.height;
            const parentParams = Number(parent.attributes.params || 0);
            const horizontalAlignment = parentParams & 0x0C0000;
            const verticalAlignment = parentParams & 0x300000;

            if(horizontalAlignment === 0x0C0000) parentGeometry.x -= Math.trunc(widthDelta / 2);
            else if(horizontalAlignment === 0x040000) parentGeometry.x -= widthDelta;

            if(verticalAlignment === 0x300000) parentGeometry.y -= Math.trunc(heightDelta / 2);
            else if(verticalAlignment === 0x100000) parentGeometry.y -= heightDelta;

            parentGeometry.width = nextWidth;
            parentGeometry.height = nextHeight;
        }

        applyResizeDeltaToChildren(parent, previousParentGeometry, node.id);

        if((resolved[parent.id].width !== previousParentGeometry.width) || (resolved[parent.id].height !== previousParentGeometry.height))
        {
            reflectResizeToParent(parent, previousParentGeometry);
        }
    };

    // Sulake TextController and ButtonController resize their window before
    // dispatching WE_RESIZED. WindowController then reflects that delta into
    // the parent when the child carries 0x400000 / 0x800000. This is how an
    // auto-sized name field shrinks its containing avatar-info bubble; it is
    // not window-specific centering logic.
    for(const node of [ ...allNodes ].reverse())
    {
        const params = Number(node.attributes.params || 0);
        const reflectsResize = (params & (WINDOW_PARAM_REFLECT_HORIZONTAL_RESIZE_TO_PARENT | WINDOW_PARAM_REFLECT_VERTICAL_RESIZE_TO_PARENT)) !== 0;
        const autoSize = variable(node, 'auto_size');
        const controllerResizesNode = node.type === 'label'
            || ([ 'text', 'formatted_text' ].includes(node.type) && !!autoSize && autoSize !== 'none')
            || (node.type === 'button' && (params & WINDOW_PARAM_EXPAND_TO_ACCOMMODATE_CHILDREN) !== 0);

        if(!reflectsResize || !controllerResizesNode) continue;

        const geometry = resolved[node.id];
        const previousGeometry = {
            ...geometry,
            width: constrainedSize(node, 'width', numberAttribute(node, 'width', geometry.width)),
            height: constrainedSize(node, 'height', numberAttribute(node, 'height', geometry.height))
        };

        if((geometry.width !== previousGeometry.width) || (geometry.height !== previousGeometry.height))
        {
            reflectResizeToParent(node, previousGeometry);
        }
    }

    for(const context of allNodes.filter(node => node.type === 'tab_context'))
    {
        const tabs = context.children.filter(child => child.type === 'tab_container_button');
        let x = tabs.length ? numberAttribute(tabs[0], 'x') : 0;

        for(const tab of tabs)
        {
            if(!isVisible(tab)) continue;

            const resizeToAccommodate = (Number(tab.attributes.params || 0) & WINDOW_PARAM_RESIZE_TO_ACCOMMODATE_CHILDREN) === WINDOW_PARAM_RESIZE_TO_ACCOMMODATE_CHILDREN;

            if(!resizeToAccommodate)
            {
                resolved[tab.id] = { ...resolved[tab.id], x };
                x += resolved[tab.id].width;
                continue;
            }

            const titleChildren = tab.children.filter(child => child.type === 'label' || child.type === 'text');
            const titleNodes = titleChildren.length ? titleChildren : [ tab ];
            let accommodatedWidth = 1;

            titleNodes.forEach(child =>
            {
                const childCaption = resolvedNodeCaption(child, captions, resolveCaption, allNodes);
                const measured = measureHabboText(childCaption, textFormat(child, overrideForNode(child, textStyles, allNodes, 'text style override')));
                const marginLeft = Number(variable(child, 'margin_left') || 0);
                const marginRight = Number(variable(child, 'margin_right') || 0);
                const childWidth = constrainedSize(child, 'width', (measured?.textWidth || 0) + marginLeft + marginRight);

                if(child !== tab) resolved[child.id] = { ...resolved[child.id], width: childWidth };
                accommodatedWidth = Math.max(accommodatedWidth, (child === tab ? 0 : resolved[child.id].x) + childWidth);
            });

            // Sulake source: TabButtonController.as forwards the caption to
            // TAB_BUTTON_TITLE; WindowController.resizeToAccommodateChildren()
            // adopts max(child.x + child.width), including both text margins.
            resolved[tab.id] = { ...resolved[tab.id], x, width: constrainedSize(tab, 'width', accommodatedWidth) };
            x += resolved[tab.id].width;
        }
    }

    // Sulake source: core/window/components/ItemListController.as,
    // updateScrollAreaRegion() lines 684-750. Only visible children advance
    // the cursor; horizontal lists replace x, vertical lists replace y.
    for(const list of allNodes.filter(node => ITEMLIST_TYPES.has(node.type) && variable(node, 'auto_arrange_items') !== 'false').reverse())
    {
        const matchingSlot = overrideNameForNode(list, slots, allNodes, 'slot');

        // A controller-provided slot replaces the XML template children. Those
        // templates have usually been hidden/removed before runtime items are
        // inserted, so treating them as the list's live contents collapses a
        // resize_on_item_update list to 1px and reflects that false shrink into
        // parents (for example the wardrobe's style-4 border).
        if(matchingSlot !== undefined && slots[matchingSlot] !== undefined) continue;

        const previousListGeometry = { ...resolved[list.id] };
        const spacing = Number(variable(list, 'spacing') || 0);
        const orderedNames = overrideForNode(list, itemListOrder, allNodes, 'item-list order');
        const children = orderedNames
            ? orderedNames.map(name =>
            {
                const exact = allNodes.find(node => nodeNames(node).includes(name));

                if(exact) return exact;

                const matches = allNodes.filter(node => nodeTags(node).includes(name));

                if(matches.length > 1) warnMultiTagOverride('item-list member', name, matches);

                return matches.length === 1 ? matches[0] : undefined;
            }).filter(Boolean) as HabboLayoutNode[]
            : list.children;
        const directChildren = new Set(list.children.map(child => child.id));
        const firstExternal = children.find(child => !directChildren.has(child.id));
        let cursor = firstExternal
            ? (list.type === 'itemlist_horizontal' ? resolved[firstExternal.id].x - resolved[list.id].x : resolved[firstExternal.id].y - resolved[list.id].y)
            : 0;

        for(const child of children)
        {
            if(!isVisible(child)) continue;

            const isDirectChild = directChildren.has(child.id);

            if(list.type === 'itemlist_horizontal')
            {
                resolved[child.id] = { ...resolved[child.id], x: isDirectChild ? cursor : resolved[list.id].x + cursor };
                cursor += resolved[child.id].width + spacing;
            }
            else
            {
                resolved[child.id] = { ...resolved[child.id], y: isDirectChild ? cursor : resolved[list.id].y + cursor };
                cursor += resolved[child.id].height + spacing;
            }
        }

        // ItemListController enables resize-on-update either through the XML
        // variable or WindowParam.RESIZE_TO_ACCOMMODATE_CHILDREN (0x024000).
        // The catalog price_display uses the parameter form so its amount row
        // grows to the measured captions before the outer price badge is fit.
        if(variable(list, 'resize_on_item_update') === 'true' || (Number(list.attributes.params || 0) & WINDOW_PARAM_RESIZE_TO_ACCOMMODATE_CHILDREN) === WINDOW_PARAM_RESIZE_TO_ACCOMMODATE_CHILDREN)
        {
            const contentSize = Math.max(0, cursor - (children.some(isVisible) ? spacing : 0));

            if(list.type === 'itemlist_horizontal')
            {
                const nextWidth = constrainedSize(list, 'width', contentSize);

                resolved[list.id] = {
                    ...resolved[list.id],
                    x: anchoredXAfterResize(resolved[list.id].x, resolved[list.id].width, nextWidth, Number(list.attributes.params || 0)),
                    width: nextWidth
                };
            }
            else
            {
                const nextHeight = constrainedSize(list, 'height', contentSize);

                resolved[list.id] = {
                    ...resolved[list.id],
                    y: anchoredYAfterResize(resolved[list.id].y, resolved[list.id].height, nextHeight, Number(list.attributes.params || 0)),
                    height: nextHeight
                };
            }
        }

        if((resolved[list.id].width !== previousListGeometry.width) || (resolved[list.id].height !== previousListGeometry.height))
        {
            reflectResizeToParent(list, previousListGeometry);
        }

    }

    // Sulake ItemGridController.populate() builds columns until the next item
    // no longer fits, then distributes later items row-major across them.
    // XML grid children all start at (0,0); their controller supplies these
    // final positions at runtime.
    for(const grid of allNodes.filter(node => node.type === 'itemgrid_vertical').reverse())
    {
        const children = grid.children.filter(isVisible);
        const spacing = Number(variable(grid, 'spacing') || 0);
        const columns: { x: number; width: number; height: number }[] = [];

        for(const child of children)
        {
            if(!columns.length || (columns.reduce((right, column) => Math.max(right, column.x + column.width), 0) + spacing + resolved[child.id].width) <= resolved[grid.id].width)
            {
                const x = columns.length ? columns[columns.length - 1].x + columns[columns.length - 1].width + spacing : 0;

                columns.push({ x, width: resolved[child.id].width, height: 0 });
            }
            else break;
        }

        const columnCount = Math.max(1, columns.length);

        children.forEach((child, index) =>
        {
            const column = columns[index % columnCount];
            const previousRow = index >= columnCount ? resolved[children[index - columnCount].id] : null;
            const y = previousRow ? previousRow.y + previousRow.height + spacing : 0;

            resolved[child.id] = { ...resolved[child.id], x: column.x, y };
            column.width = Math.max(column.width, resolved[child.id].width);
            column.height = Math.max(column.height, y + resolved[child.id].height);
        });
    }

    // Sulake source: core/window/WindowController.as
    // resizeToAccommodateChildren(). The 0x024000 parameter pair makes a
    // window adopt the maximum right/bottom edge of its visible direct
    // children. Walking deepest-first preserves the controller's recursive
    // me-menu sizing chain (buttons -> box sizer -> container -> border).
    for(const node of [ ...allNodes ].reverse())
    {
        const params = Number(node.attributes.params || 0);

        if((params & WINDOW_PARAM_RESIZE_TO_ACCOMMODATE_CHILDREN) !== WINDOW_PARAM_RESIZE_TO_ACCOMMODATE_CHILDREN) continue;

        const children = node.children.filter(isVisible);

        if(!children.length) continue;

        const geometry = resolved[node.id];
        const previousGeometry = { ...geometry };
        const width = constrainedSize(node, 'width', children.reduce((maximum, child) => Math.max(maximum, resolved[child.id].x + resolved[child.id].width), 0));
        const height = constrainedSize(node, 'height', children.reduce((maximum, child) => Math.max(maximum, resolved[child.id].y + resolved[child.id].height), 0));

        geometry.width = width;
        geometry.height = height;

        if((geometry.width !== previousGeometry.width) || (geometry.height !== previousGeometry.height))
        {
            applyResizeDeltaToChildren(node, previousGeometry);
            reflectResizeToParent(node, previousGeometry);
        }
    }

    // Controller-owned animation geometry is authoritative after controller
    // layout passes such as BoxSizer have produced their normal destination.
    // Sulake's toolbar collapse tween freezes those destinations and then
    // writes interpolated child positions directly each frame.
    for(const node of allNodes)
    {
        const override = overrideForNode(node, options.geometryOverrides || {}, allNodes, 'geometry override');

        if(override) resolved[node.id] = { ...resolved[node.id], ...override };
    }

    return resolved;
};

interface HabboLayoutNodeViewProps
{
    node: HabboLayoutNode;
    parentId?: string;
    siblingIndex?: number;
    allNodes: HabboLayoutNode[];
    activeTabs: Record<string, string>;
    hiddenNodeIds: Set<string>;
    forcedVisibleNodeIds: Set<string>;
    slots: Partial<Record<string, ReactNode>>;
    visibility: Partial<Record<string, boolean>>;
    captions: Partial<Record<string, string>>;
    textColors: Partial<Record<string, number>>;
    colors: Partial<Record<string, number>>;
    hoverColors: Partial<Record<string, number>>;
    hoverTextColors: Partial<Record<string, number>>;
    textStyles: Partial<Record<string, string>>;
    backgroundColors: Partial<Record<string, number>>;
    skinOverrides: Partial<Record<string, HabboResolvedSkin>>;
    enabled: Partial<Record<string, boolean>>;
    selected: Partial<Record<string, boolean>>;
    interactiveOverrides: Partial<Record<string, boolean>>;
    blends: Partial<Record<string, number>>;
    appendedSlots: Partial<Record<string, ReactNode>>;
    resizable: boolean;
    resolveCaption: (caption: string) => string;
    showPlaceholders: boolean;
    onAction?: HabboLayoutViewProps['onAction'];
    onClose?: HabboLayoutViewProps['onClose'];
    onBeginResize: (node: HabboLayoutNode, event: ReactPointerEvent<HTMLButtonElement>) => void;
    onActivateTab: (contextId: string, contextName: string, tabName: string) => void;
    geometry: Record<string, HabboNodeGeometry>;
    ancestorInteractionState?: HabboSkinState;
}

interface HabboFrameChromeButtonProps
{
    className: string;
    label: string;
    registryId: string;
    layout: string;
    color?: number;
    onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    onPointerDown?: (event: ReactPointerEvent<HTMLButtonElement>) => void;
}

const HabboFrameChromeButton: FC<HabboFrameChromeButtonProps> = props =>
{
    const { className, label, registryId, layout, color = 0xFFFFFF, onClick, onPointerDown } = props;
    const [ state, setState ] = useState<HabboSkinState>('default');

    return <button className={ className } type="button" aria-label={ label } onMouseEnter={ () => setState('hovering') } onMouseLeave={ () => setState('default') } onMouseDown={ () => setState('pressed') } onMouseUp={ () => setState('hovering') } onClick={ event =>
    {
        setState('default');
        onClick?.(event);
    } } onPointerDown={ onPointerDown }><SkinRegistryView registryId={ registryId } layout={ layout } state={ state } color={ color } /></button>;
};

const HabboLayoutNodeView: FC<HabboLayoutNodeViewProps> = props =>
{
    const { node, parentId = '', siblingIndex = 0, allNodes, activeTabs, hiddenNodeIds, forcedVisibleNodeIds, slots, visibility, captions, textColors, colors, hoverColors, hoverTextColors, textStyles, backgroundColors, skinOverrides, enabled, selected, interactiveOverrides, blends, appendedSlots, resizable, resolveCaption, showPlaceholders, onAction, onClose, onBeginResize, onActivateTab, geometry, ancestorInteractionState = 'default' } = props;
    const [ interactionState, setInteractionState ] = useState<HabboSkinState>('default');
    const [ toggled, setToggled ] = useState(false);
    const hasBeenVisibleRef = useRef(false);
    const nodeGeometry = geometry[node.id] || baseNodeGeometry(node, captions, textStyles, resolveCaption, allNodes);
    const { x, y, width, height } = nodeGeometry;
    const resolvedSkin = overrideForNode(node, skinOverrides, allNodes, 'skin override') || resolveHabboNodeSkin(node);
    const visibilityName = overrideNameForNode(node, visibility, allNodes, 'visibility override');
    const visibleOverride = visibilityName ? visibility[visibilityName] : undefined;
    const visible = visibleOverride ?? (!hiddenNodeIds.has(node.id) && (node.attributes.visible !== 'false' || forcedVisibleNodeIds.has(node.id)));
    const caption = resolvedNodeCaption(node, captions, resolveCaption, allNodes);
    const hoverColor = overrideForNode(node, hoverColors, allNodes, 'hover color override') ?? ancestorOverride(parentId, hoverColors, allNodes);
    const hoverTextColor = overrideForNode(node, hoverTextColors, allNodes, 'hover text color override') ?? ancestorOverride(parentId, hoverTextColors, allNodes);
    const hoverColorActive = [ interactionState, ancestorInteractionState ].some(state => state === 'hovering' || state === 'pressed');
    const baseColor = overrideForNode(node, colors, allNodes, 'color override') ?? (node.attributes.color ? Number(node.attributes.color) : 0xFFFFFF);
    const color = hoverColorActive && hoverColor !== undefined ? hoverColor : baseColor;
    const enabledOverride = overrideForNode(node, enabled, allNodes, 'enabled override') ?? ancestorOverride(parentId, enabled, allNodes);
    const isEnabled = enabledOverride !== false;
    const baseTextColor = overrideForNode(node, textColors, allNodes, 'text color override') ?? (!isEnabled ? 5789011 : variable(node, 'text_color') ? Number(variable(node, 'text_color')) : undefined);
    const textColor = hoverColorActive && hoverTextColor !== undefined ? hoverTextColor : baseTextColor;
    const backgroundColor = overrideForNode(node, backgroundColors, allNodes, 'background color override') ?? (node.attributes.color ? Number(node.attributes.color) : undefined);
    const nodeStyle = node.attributes.style || '0';
    const family = styleFamily(nodeStyle);
    const closeSkin = node.type === 'frame' ? skinForType('closebutton', nodeStyle) : null;
    const scalerSkin = resizable && node.type === 'frame' && (Number(node.attributes.params || 0) & 0x10000) !== 0 ? skinForType('scaler', nodeStyle) : null;
    const windowLayout = resolveWindowType(node.type === 'scrollbar' ? 'scrollbar_vertical' : node.type, nodeStyle)?.windowLayout || '';
    // Sulake ScrollableItemGridWindow delegates its collection scrolling to
    // the same internal list/scrollbar contract as ScrollableItemListWindow.
    const isScrollableCollection = node.type === 'scrollable_itemlist_vertical' || node.type === 'scrollable_itemgrid_vertical';
    const scrollableContentHeight = isScrollableCollection
        ? Math.max(height, ...node.children.filter(child => !hiddenNodeIds.has(child.id)).map(child => (geometry[child.id]?.y || 0) + (geometry[child.id]?.height || 0)))
        : height;
    const contentInsets = getHabboChromeContentInsets(windowLayout);
    const scrollBarWidth = isScrollableCollection ? (contentInsets?.right || 0) : 0;
    const marginLeft = Number(variable(node, 'margin_left') ?? contentInsets?.left ?? 0);
    const marginTop = Number(variable(node, 'margin_top') ?? contentInsets?.top ?? 0);
    const marginRight = Number(variable(node, 'margin_right') ?? contentInsets?.right ?? 0);
    const marginBottom = Number(variable(node, 'margin_bottom') ?? contentInsets?.bottom ?? 0);
    const isShinyButton = [ 'button', 'button_thick' ].includes(node.type);
    const centersCaption = isShinyButton || [ 'tab_button', 'tab_container_button' ].includes(node.type);
    const textAnchor = Number(node.attributes.params || 0) & 0x0C0000;
    const autoSize = variable(node, 'auto_size');
    const textAlign = centersCaption || autoSize === 'center' ? 'center' : autoSize === 'right' ? 'right' : autoSize === 'left' ? 'left' : textAnchor === 0x0C0000 ? 'center' : textAnchor === 0x040000 ? 'right' : 'left';
    const styleOverride = overrideForNode(node, textStyles, allNodes, 'text style override');
    const format = useMemo(() => textFormat(node, styleOverride), [ node, styleOverride ]);
    const selectedTab = node.type === 'tab_container_button' && activeTabs[parentId] === (node.attributes.name || node.id);
    const toggleControl = [ 'checkbox', 'radiobutton', 'radio_button', 'switch' ].includes(node.type) || node.attributes.intent === 'switch';
    const selectedOverride = overrideForNode(node, selected, allNodes, 'selected override');
    const isSelected = selectedOverride ?? toggled;
    const renderedState: HabboSkinState = !isEnabled
        ? (toggleControl && isSelected ? 'selected' : 'disabled')
        : selectedTab || selectedOverride === true || (toggleControl && isSelected) ? 'selected' : interactionState;
    const hasInheritedTextChild = node.children.some(child => child.type === 'label' || child.type === 'text');
    const bitmapAssetName = node.type === 'static_bitmap' ? variable(node, 'asset_uri') : '';
    const tooltip = variable(node, 'tool_tip_caption');
    const matchingSlot = overrideNameForNode(node, slots, allNodes, 'slot');
    const slot = matchingSlot ? slots[matchingSlot] : undefined;
    const scrollableContentRef = useRef<HTMLDivElement>();
    const [ isScrollBarVisible, setIsScrollBarVisible ] = useState(false);
    const [ scrollMetrics, setScrollMetrics ] = useState({ ratio: 1, position: 0 });
    const appendedSlotName = overrideNameForNode(node, appendedSlots, allNodes, 'appended slot');
    const appendedSlot = appendedSlotName ? appendedSlots[appendedSlotName] : undefined;
    const interactiveOverride = overrideForNode(node, interactiveOverrides, allNodes, 'interactive override');
    const interactive = (interactiveOverride ?? INTERACTIVE_TYPES.has(node.type)) && isEnabled;
    const blend = overrideForNode(node, blends, allNodes, 'blend override') ?? (node.attributes.blend !== undefined ? Number(node.attributes.blend) : undefined);
    const liftedHover = node.attributes.dynamic_style === 'lifted_hover';
    let dynamicStyleAncestorId = parentId;
    let liftedHoverAncestor = false;

    while(dynamicStyleAncestorId)
    {
        const ancestor = allNodes.find(candidate => candidate.id === dynamicStyleAncestorId);

        if(!ancestor) break;
        if(ancestor.attributes.dynamic_style)
        {
            liftedHoverAncestor = ancestor.attributes.dynamic_style === 'lifted_hover';
            break;
        }
        dynamicStyleAncestorId = ancestor.id.includes('.') ? ancestor.id.slice(0, ancestor.id.lastIndexOf('.')) : '';
    }

    const liftedHoverIcon = liftedHoverAncestor && nodeTags(node).includes('#icon');
    const dynamicOffsetX = liftedHover ? (renderedState === 'hovering' ? -1 : renderedState === 'pressed' ? 1 : 0) : 0;
    const dynamicOffsetY = liftedHover && renderedState === 'hovering' ? -1 : 0;
    const ownsRendering = matchingSlot !== undefined && slot !== undefined && !isScrollableCollection;
    const retainHiddenTabPage = hiddenNodeIds.has(node.id) && hasBeenVisibleRef.current && visibleOverride === undefined;
    if(visible) hasBeenVisibleRef.current = true;
    const style: CSSProperties = {
        left: x + dynamicOffsetX,
        top: y + dynamicOffsetY,
        zIndex: siblingIndex,
        width,
        height,
        display: visible || retainHiddenTabPage ? undefined : 'none',
        visibility: retainHiddenTabPage ? 'hidden' : undefined,
        pointerEvents: retainHiddenTabPage ? 'none' : undefined,
        overflow: node.attributes.clipping === 'false' ? 'visible' : undefined,
        isolation: 'isolate',
        opacity: blend,
        filter: liftedHover && renderedState === 'pressed' ? 'url(#habbo-lifted-hover-pressed)' : undefined,
        // The Flash `background` flag enables a node's own fill renderer; it
        // does not assign white when the XML omitted a color. Treating the
        // missing color as 0xFFFFFFFF painted large white rectangles over
        // infostand item lists such as User/Bot view.
        backgroundColor: (node.type === 'background' || node.attributes.background === 'true') && backgroundColor !== undefined ? argbBackground(String(backgroundColor)) : undefined,
        borderColor: node.type === 'input' && variable(node, 'border') === 'true' ? rgbColor(variable(node, 'border_color')) : undefined
    };
    const contentStyle: CSSProperties = { left: marginLeft, top: marginTop, right: marginRight, bottom: marginBottom };
    // Sulake source: _assets/1148_button_shiny_xml*.bin. _BTN_TEXT is centered
    // inside its 8/2/8/3 margin box for every shiny button.
    const captionStyle: CSSProperties = isShinyButton
        ? { left: marginLeft || 8, top: marginTop || 2, right: marginRight || 8, bottom: marginBottom || 3 }
        : { left: marginLeft, top: marginTop, right: marginRight, bottom: marginBottom };
    const rendersChrome = hasHabboChromeLayout(windowLayout);
    const rendersOwnSkinWithChrome = habboChromeDrawsOwnSkin(windowLayout);

    useLayoutEffect(() =>
    {
        const content = scrollableContentRef.current;

        if(!isScrollableCollection || !content) return;

        const update = () =>
        {
            const maximumScroll = Math.max(0, content.scrollHeight - content.clientHeight);

            setIsScrollBarVisible(maximumScroll > 0);
            setScrollMetrics({
                ratio: content.scrollHeight > 0 ? Math.min(1, content.clientHeight / content.scrollHeight) : 1,
                position: maximumScroll > 0 ? Math.max(0, Math.min(1, content.scrollTop / maximumScroll)) : 0
            });
        };
        const observer = new ResizeObserver(update);

        observer.observe(content);
        if(content.firstElementChild) observer.observe(content.firstElementChild);
        content.addEventListener('scroll', update, { passive: true });
        update();

        return () =>
        {
            content.removeEventListener('scroll', update);
            observer.disconnect();
        };
    }, [ isScrollableCollection, slot ]);

    const activate = (event: ReactMouseEvent<HTMLElement>) =>
    {
        let name = node.attributes.name || node.attributes.id || node.id;

        // Habbo button templates deliberately name their interactive child
        // `button`; the controller dispatches using the named action row that
        // owns it. Preserve that generic behavior for every generated layout.
        if([ 'button', 'icon', '#icon' ].includes(name))
        {
            let ancestorId = parentId;

            while(ancestorId)
            {
                const ancestor = allNodes.find(candidate => candidate.id === ancestorId);

                if(!ancestor) break;
                if(ancestor.attributes.name && ![ 'button', 'icon', '#icon', 'label', 'buttons', 'grid' ].includes(ancestor.attributes.name))
                {
                    name = ancestor.attributes.name;
                    break;
                }

                ancestorId = ancestor.id.includes('.') ? ancestor.id.slice(0, ancestor.id.lastIndexOf('.')) : '';
            }
        }

        if(node.type === 'tab_container_button') onActivateTab(parentId, parentId, name);
        if(toggleControl && selectedOverride === undefined) setToggled(current => !current);
        if(node.type === 'closebutton') onClose?.();
        onAction?.(name, event);
    };

    return (
        <div
            className={ `habbo-layout-node habbo-layout-node-${ node.type } ${ interactive ? 'is-interactive' : '' } ${ !isEnabled ? 'is-disabled' : '' } ${ variable(node, 'underline') === 'true' ? 'has-underlined-text' : '' } ${ variable(node, 'border') === 'true' ? 'has-authored-border' : '' }` }
            style={ style }
            data-habbo-node-id={ node.id }
            data-habbo-node-name={ node.attributes.name || '' }
            data-habbo-state={ renderedState }
            role={ interactive ? 'button' : undefined }
            title={ tooltip ? resolveCaption(displayCaption(tooltip)) : undefined }
            tabIndex={ interactive ? 0 : undefined }
            onMouseEnter={ () => interactive && setInteractionState('hovering') }
            onMouseLeave={ () => interactive && setInteractionState('default') }
            onMouseDown={ () => interactive && setInteractionState('pressed') }
            onMouseUp={ () => interactive && setInteractionState('hovering') }
            onClick={ interactive ? activate : undefined }>
            { !ownsRendering && resolvedSkin && (!rendersChrome || rendersOwnSkinWithChrome) && <SkinRegistryView registryId={ resolvedSkin.registryId } layout={ resolvedSkin.layout } state={ renderedState } template={ node.type === 'icon' ? `icon_${ nodeStyle }` : undefined } color={ color } /> }
            { !ownsRendering && rendersChrome && (!isScrollableCollection || isScrollBarVisible) && <HabboChromeView windowLayout={ windowLayout } styleId={ nodeStyle } width={ width } height={ height } state={ renderedState } color={ color } scrollRatio={ scrollMetrics.ratio } scrollPosition={ scrollMetrics.position } /> }
            { !ownsRendering && node.type === 'separator' && <div className="habbo-layout-separator" /> }
            { !ownsRendering && node.type === 'frame' && <div className="habbo-layout-frame-drag-region" /> }
            { !ownsRendering && node.type === 'frame' && caption && <div className={ `habbo-layout-frame-caption theme-${ family }` }><TruffleTextView text={ caption } format={ format } color={ textColor ?? 0xFFFFFF } /></div> }
            { !ownsRendering && closeSkin && <HabboFrameChromeButton className={ `habbo-layout-frame-close theme-${ family }` } label="Close" registryId={ closeSkin.registryId } layout={ closeSkin.layout } onClick={ event =>
            {
                event.stopPropagation();
                onClose?.();
            } } /> }
            { !ownsRendering && scalerSkin && <HabboFrameChromeButton className={ `habbo-layout-frame-scaler theme-${ family }` } label="Resize" registryId={ scalerSkin.registryId } layout={ scalerSkin.layout } color={ color } onPointerDown={ event => onBeginResize(node, event) } /> }
            { !ownsRendering && bitmapAssetName && <HabboBitmapView className="habbo-layout-static-bitmap" assetName={ bitmapAssetName } alt={ node.attributes.name || bitmapAssetName } stretchedX={ variable(node, 'stretched_x') !== 'false' } stretchedY={ variable(node, 'stretched_y') !== 'false' } pivotPoint={ variable(node, 'pivot_point') || 'top_left' } zoomX={ Number(variable(node, 'zoom_x') || 1) } zoomY={ Number(variable(node, 'zoom_y') || 1) } greyscale={ variable(node, 'greyscale') === 'true' } etchingColor={ liftedHoverIcon && ancestorInteractionState !== 'disabled' ? (ancestorInteractionState === 'hovering' ? 0x80000000 : 0x48000000) : Number(variable(node, 'etching_color') || 0) } etchingX={ liftedHoverIcon ? (ancestorInteractionState === 'hovering' ? 2 : ancestorInteractionState === 'pressed' ? -1 : 1) : 0 } etchingY={ liftedHoverIcon ? (ancestorInteractionState === 'hovering' ? 2 : ancestorInteractionState === 'pressed' ? -1 : 1) : -1 } /> }
            { !ownsRendering && TEXT_TYPES.has(node.type) && caption && !hasInheritedTextChild && <div className={ `habbo-layout-node-caption align-${ textAlign }` } style={ captionStyle }>{ (node.type === 'formatted_text' || node.type === 'html')
                ? <TruffleFormattedTextView text={ caption } format={ format } color={ textColor } />
                : <TruffleTextView text={ caption } format={ format } color={ textColor } wordWrap={ variable(node, 'word_wrap') === 'true' } width={ variable(node, 'word_wrap') === 'true' ? Math.max(1, width - marginLeft - marginRight) : undefined } /> }</div> }
            { ownsRendering && hasBeenVisibleRef.current && <div className="habbo-layout-slot" data-slot={ matchingSlot }>{ slot }</div> }
            { isScrollableCollection && hasBeenVisibleRef.current && <div ref={ scrollableContentRef } className="habbo-layout-scrollable-content" style={ { right: isScrollBarVisible ? scrollBarWidth : 0 } } data-slot={ matchingSlot }>
                <div className="habbo-layout-scrollable-extent" style={ { height: scrollableContentHeight } }>{ slot ?? node.children.map((child, index) => <HabboLayoutNodeView key={ child.id } { ...props } node={ child } parentId={ node.id } siblingIndex={ index } ancestorInteractionState={ interactionState !== 'default' ? interactionState : ancestorInteractionState } />) }</div>
            </div> }
            { visible && slot === undefined && showPlaceholders && isPlaceholder(node) && !bitmapAssetName && <div className="habbo-layout-placeholder"><span>{ node.attributes.name || variable(node, 'asset_uri') || node.type }</span><small>{ node.type }</small></div> }
            { !isScrollableCollection && hasBeenVisibleRef.current && slot === undefined && <div className="habbo-layout-node-children" style={ contentStyle }>{ node.children.map((child, index) => <HabboLayoutNodeView key={ child.id } { ...props } node={ child } parentId={ node.id } siblingIndex={ index } ancestorInteractionState={ interactionState !== 'default' ? interactionState : ancestorInteractionState } />) }</div> }
            { hasBeenVisibleRef.current && slot === undefined && appendedSlot !== undefined && <div className="habbo-layout-appended-slot" data-slot={ appendedSlotName }>{ appendedSlot }</div> }
        </div>
    );
};

export const HabboLayoutView: FC<HabboLayoutViewProps> = props =>
{
    const { layout, className = '', slots = {}, visibility = {}, captions = {}, itemListOrder = {}, geometryOverrides: directGeometryOverrides, rootSize: directRootSize, initialActiveTabs = {}, resolveCaption = value => value, showPlaceholders = false, onAction, onTabChange, onClose } = props;
    const runtimeController = useContext(HabboLayoutRuntimeContext);
    const geometryOverrides = useMemo(() => directGeometryOverrides || runtimeController?.geometryOverrides || {}, [ directGeometryOverrides, runtimeController?.geometryOverrides ]);
    const controlledRootSize = directRootSize || runtimeController?.rootSize;
    const textColors = runtimeController?.textColors || {};
    const colors = runtimeController?.colors || {};
    const hoverColors = runtimeController?.hoverColors || {};
    const hoverTextColors = runtimeController?.hoverTextColors || {};
    const textStyles = useMemo(() => runtimeController?.textStyles || {}, [ runtimeController?.textStyles ]);
    const backgroundColors = runtimeController?.backgroundColors || {};
    const skinOverrides = runtimeController?.skinOverrides || {};
    const enabled = runtimeController?.enabled || {};
    const selected = runtimeController?.selected || {};
    const interactiveOverrides = runtimeController?.interactive || {};
    const blends = runtimeController?.blends || {};
    const appendedSlots = runtimeController?.appendedSlots || {};
    const materializedNodes = useMemo(() => materializeRuntimeCollections(layout.nodes, runtimeController?.collections || {}), [ layout.nodes, runtimeController?.collections ]);
    const resizable = runtimeController?.resizable !== false;
    const externallyControlledRoot = !!controlledRootSize;
    const [ manuallyResizedRoot, setManuallyResizedRoot ] = useState(false);
    const [ activeTabs, setActiveTabs ] = useState<Record<string, string>>(initialActiveTabs);
    const [ rootSize, setRootSize ] = useState(() => controlledRootSize || { width: layout.width, height: layout.height });
    const resizeCleanupRef = useRef<() => void>();
    const allNodes = useMemo(() => flattenNodes(materializedNodes), [ materializedNodes ]);
    const initialActiveTabsSignature = JSON.stringify(initialActiveTabs);
    // A semantic signature avoids reapplying an equivalent inline object every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setActiveTabs(current => ({ ...current, ...initialActiveTabs })), [ initialActiveTabsSignature ]);
    useLayoutEffect(() =>
    {
        const nextSize = controlledRootSize || { width: layout.width, height: layout.height };

        setRootSize(current => (current.width === nextSize.width) && (current.height === nextSize.height) ? current : nextSize);
    }, [ controlledRootSize, layout.height, layout.width ]);
    useEffect(() => () => resizeCleanupRef.current?.(), []);
    const tabState = useMemo(() =>
    {
        const resolved = { ...activeTabs };
        const hidden = new Set<string>();
        const forcedVisible = new Set<string>();

        for(const context of allNodes.filter(node => node.type === 'tab_context'))
        {
            const tabs = context.children.filter(child => child.type === 'tab_container_button');
            const visibleTabs = tabs.filter(tab =>
            {
                const visibilityName = overrideNameForNode(tab, visibility, allNodes, 'visibility override');

                return ((visibilityName ? visibility[visibilityName] : undefined) ?? tab.attributes.visible !== 'false');
            });
            const names = visibleTabs.map(tab => tab.attributes.name).filter(Boolean);
            const pages = allNodes.filter(node => node.type !== 'tab_container_button' && names.includes(node.attributes.name));
            const requestedName = names.includes(activeTabs[context.id]) ? activeTabs[context.id] : '';
            const activeName = requestedName || pages.find(page => page.attributes.visible !== 'false')?.attributes.name || names[0];

            if(!activeName) continue;

            resolved[context.id] = activeName;
            for(const page of pages)
            {
                if(page.attributes.name === activeName) forcedVisible.add(page.id);
                else hidden.add(page.id);
            }
        }

        return { resolved, hidden, forcedVisible };
    }, [ activeTabs, allNodes, visibility ]);
    const geometry = useMemo(() =>
    {
        const isVisible = (node: HabboLayoutNode) =>
        {
            const override = overrideForNode(node, visibility, allNodes, 'visibility override');

            return override ?? (!tabState.hidden.has(node.id) && (node.attributes.visible !== 'false' || tabState.forcedVisible.has(node.id)));
        };

        return getHabboLayoutGeometry(materializedNodes, { captions, textStyles, itemListOrder, slots, geometryOverrides, resolveCaption, isVisible, rootSize: (externallyControlledRoot || manuallyResizedRoot) ? rootSize : undefined });
    }, [ allNodes, captions, externallyControlledRoot, geometryOverrides, itemListOrder, manuallyResizedRoot, materializedNodes, resolveCaption, rootSize, slots, tabState.forcedVisible, tabState.hidden, textStyles, visibility ]);
    const renderedRootSize = useMemo(() =>
    {
        if(externallyControlledRoot || manuallyResizedRoot) return rootSize;

        return materializedNodes.reduce((bounds, node) => ({
            width: Math.max(bounds.width, (geometry[node.id]?.x || 0) + (geometry[node.id]?.width || 0)),
            height: Math.max(bounds.height, (geometry[node.id]?.y || 0) + (geometry[node.id]?.height || 0))
        }), { width: 0, height: 0 });
    }, [ externallyControlledRoot, geometry, manuallyResizedRoot, materializedNodes, rootSize ]);

    // Sulake source: WindowController.as WME_DOWN locates the 0x10000 scaling
    // target, WindowMouseScaler.as applies the 0x1000/0x2000 axes, and
    // WindowController.setRectangle() clamps WindowRectLimits.
    const beginResize = (node: HabboLayoutNode, event: ReactPointerEvent<HTMLButtonElement>) =>
    {
        if(event.button !== 0) return;

        event.preventDefault();
        event.stopPropagation();
        setManuallyResizedRoot(true);
        resizeCleanupRef.current?.();
        const params = Number(node.attributes.params || 0);
        const scaleHorizontal = (params & 0x1000) !== 0 || (params & 0x10000) !== 0;
        const scaleVertical = (params & 0x2000) !== 0 || (params & 0x10000) !== 0;
        const startPointer = { x: event.clientX, y: event.clientY };
        const startSize = rootSize;
        const minWidth = numberAttribute(node, 'width_min', 1);
        const maxWidth = numberAttribute(node, 'width_max', Number.MAX_SAFE_INTEGER);
        const minHeight = numberAttribute(node, 'height_min', 1);
        const maxHeight = numberAttribute(node, 'height_max', Number.MAX_SAFE_INTEGER);
        const move = (moveEvent: PointerEvent) =>
        {
            const nextSize = {
                width: scaleHorizontal ? Math.max(minWidth, Math.min(maxWidth, startSize.width + moveEvent.clientX - startPointer.x)) : startSize.width,
                height: scaleVertical ? Math.max(minHeight, Math.min(maxHeight, startSize.height + moveEvent.clientY - startPointer.y)) : startSize.height
            };

            setRootSize(nextSize);
            runtimeController?.onResize?.(nextSize);
        };
        const end = () =>
        {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', end);
            window.removeEventListener('pointercancel', end);
            resizeCleanupRef.current = undefined;
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', end);
        window.addEventListener('pointercancel', end);
        resizeCleanupRef.current = end;
    };

    const activateTab = (contextId: string, _contextName: string, tabName: string) =>
    {
        const context = allNodes.find(node => node.id === contextId);

        setActiveTabs(current => ({ ...current, [contextId]: tabName }));
        onTabChange?.(context?.attributes.name || contextId, tabName);
    };

    return <div className={ `habbo-layout-view ${ className }` } style={ renderedRootSize } data-layout-name={ layout.name }>
        <svg className="habbo-layout-filter-definitions" aria-hidden="true"><defs><filter id="habbo-lifted-hover-pressed" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0 0 .7 0 0 0 0 0 .7 0 0 0 0 0 .7 0" /></filter></defs></svg>
        { materializedNodes.map((node, index) => <HabboLayoutNodeView key={ node.id } node={ node } siblingIndex={ index } allNodes={ allNodes } activeTabs={ tabState.resolved } hiddenNodeIds={ tabState.hidden } forcedVisibleNodeIds={ tabState.forcedVisible } slots={ slots } visibility={ visibility } captions={ captions } textColors={ textColors } colors={ colors } hoverColors={ hoverColors } hoverTextColors={ hoverTextColors } textStyles={ textStyles } backgroundColors={ backgroundColors } skinOverrides={ skinOverrides } enabled={ enabled } selected={ selected } interactiveOverrides={ interactiveOverrides } blends={ blends } appendedSlots={ appendedSlots } resizable={ resizable } resolveCaption={ resolveCaption } showPlaceholders={ showPlaceholders } onAction={ onAction } onClose={ onClose } onBeginResize={ beginResize } onActivateTab={ activateTab } geometry={ geometry } />) }
    </div>;
};
