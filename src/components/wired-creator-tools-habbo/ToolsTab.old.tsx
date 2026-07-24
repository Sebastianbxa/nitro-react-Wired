/* eslint-disable */
import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { GetRoomEngine, ProductTypeEnum } from '../../api';
import { LayoutFurniImageView } from '../../common';

type ToolType = 'triggers' | 'effects' | 'conditions' | 'selectors' | 'addons' | 'variables' | 'extras';

export interface LegacyWiredToolItem
{
    key: number;
    id: number;
    orderNumber: number;
    itemId: number;
    spriteId: number;
    name: string;
    catalogName: string;
    productType: string;
    previewAsset: string;
}

const TOOL_TYPE_OPTIONS: Array<{ key: ToolType; label: string; iconClass: string; }> = [
    { key: 'triggers', label: 'Triggers', iconClass: 'wired-tools-tool-triggers' },
    { key: 'effects', label: 'Effects', iconClass: 'wired-tools-tool-effects' },
    { key: 'conditions', label: 'Conditions', iconClass: 'wired-tools-tool-conditions' },
    { key: 'selectors', label: 'Selectors', iconClass: 'wired-tools-tool-selectors' },
    { key: 'addons', label: 'Add-Ons', iconClass: 'wired-tools-tool-addons' },
    { key: 'variables', label: 'Variables', iconClass: 'wired-tools-tool-variables' },
    { key: 'extras', label: 'Extras', iconClass: 'wired-tools-tool-extras' }
];

const TOOL_TYPE_LABELS = TOOL_TYPE_OPTIONS.reduce((result, option) =>
{
    result[option.key] = option.label;

    return result;
}, {} as Record<ToolType, string>);

const getWiredToolIconUrl = (item: LegacyWiredToolItem) =>
{
    if(item.productType === ProductTypeEnum.WALL) return GetRoomEngine().getFurnitureWallIconUrl(item.spriteId);

    return GetRoomEngine().getFurnitureFloorIconUrl(item.spriteId);
};

/**
 * Archived custom Tools tab. Habbo's wired menu does not expose this tab, so
 * the Habbo port deliberately does not import it. It remains ready for a later
 * product decision without keeping the old skin active.
 */
export const ToolsTabOld = memo<{
    toolPages: Record<ToolType, LegacyWiredToolItem[]>;
    onRequestCatalog: () => void;
    onRequestPlacement: (toolId: number) => void;
}>(({ toolPages, onRequestCatalog, onRequestPlacement }) =>
{
    const [ toolType, setToolType ] = useState<ToolType>('triggers');
    const [ selectedItemKey, setSelectedItemKey ] = useState(0);
    const [ hoverPreview, setHoverPreview ] = useState<{ item: LegacyWiredToolItem; left: number; top: number; placement: 'top' | 'bottom'; }>(null);
    const mouseDownItemKeyRef = useRef(0);
    const currentItems = toolPages[toolType] ?? [];
    const selectedItem = currentItems.find(item => item.key === selectedItemKey) ?? currentItems[0] ?? null;

    useEffect(() =>
    {
        setSelectedItemKey(previous => currentItems.some(item => item.key === previous) ? previous : (currentItems[0]?.key ?? 0));
        mouseDownItemKeyRef.current = 0;
        setHoverPreview(null);
    }, [ currentItems ]);

    useEffect(() =>
    {
        onRequestCatalog();

        return () =>
        {
            mouseDownItemKeyRef.current = 0;
            setHoverPreview(null);
        };
    }, [ onRequestCatalog ]);

    const startDragPlacement = (item: LegacyWiredToolItem) =>
    {
        if(mouseDownItemKeyRef.current !== item.key) return;

        mouseDownItemKeyRef.current = 0;
        setHoverPreview(null);
        onRequestPlacement(item.key);
    };

    const showHoverPreview = (item: LegacyWiredToolItem, element: HTMLElement) =>
    {
        const rect = element.getBoundingClientRect();
        const placement = rect.top < 128 ? 'bottom' : 'top';
        const left = Math.min(window.innerWidth - 126, Math.max(126, rect.left + (rect.width / 2)));
        const top = placement === 'top' ? rect.top - 10 : rect.bottom + 10;

        setHoverPreview({ item, left, top, placement });
    };

    return (
        <div className="wired-tools-grid wired-tools-tools">
            <section className="wired-tools-panel wired-tools-side-panel">
                <strong>Tool Type</strong>
                <div className="wired-tools-icon-picker wired-tools-icon-picker-tool">
                    { TOOL_TYPE_OPTIONS.map(option => (
                        <button
                            key={ option.key }
                            className={ `wired-tools-icon-button ${ toolType === option.key ? 'is-active' : '' }` }
                            title={ option.label }
                            type="button"
                            onClick={ () => setToolType(option.key) }>
                            <span className={ `wired-tools-variable-icon ${ option.iconClass }` } />
                        </button>
                    )) }
                </div>
                <strong>{ TOOL_TYPE_LABELS[toolType] }</strong>
                <div className="wired-tools-item-grid" onMouseLeave={ () => setHoverPreview(null) }>
                    { currentItems.map(item => (
                        <button
                            key={ item.key }
                            className={ `wired-tools-item-button ${ selectedItem?.key === item.key ? 'is-active' : '' }` }
                            title={ item.name }
                            type="button"
                            onMouseDown={ event =>
                            {
                                if(event.button !== 0) return;
                                mouseDownItemKeyRef.current = item.key;
                                setSelectedItemKey(item.key);
                            } }
                            onMouseLeave={ () =>
                            {
                                setHoverPreview(null);
                                startDragPlacement(item);
                            } }
                            onMouseUp={ () =>
                            {
                                mouseDownItemKeyRef.current = 0;
                                setHoverPreview(null);
                            } }
                            onMouseEnter={ event => showHoverPreview(item, event.currentTarget) }
                            onMouseMove={ event => showHoverPreview(item, event.currentTarget) }
                            onClick={ () => setSelectedItemKey(item.key) }
                            onDragStart={ event => event.preventDefault() }>
                            <img draggable={ false } src={ getWiredToolIconUrl(item) } alt="" />
                        </button>
                    )) }
                </div>
            </section>
            <section className="wired-tools-panel wired-tools-panel-wide wired-tools-tool-details">
                <strong>Selected Furni</strong>
                { selectedItem &&
                    <div className="wired-tools-tool-preview">
                        <LayoutFurniImageView productType={ selectedItem.productType } productClassId={ selectedItem.spriteId } />
                        <span>{ selectedItem.name }</span>
                    </div> }
                <strong>Showcase</strong>
                <div className="wired-tools-showcase-skeleton">
                    { selectedItem?.previewAsset?.trim()
                        ? <img className="wired-tools-showcase-preview" src={ selectedItem.previewAsset } alt="" />
                        : <span>Showcase preview coming soon.</span> }
                </div>
            </section>
            { hoverPreview && createPortal(
                <div
                    className={ `wired-tools-item-bubble wired-tools-item-bubble-${ hoverPreview.placement }` }
                    style={ { left: hoverPreview.left, top: hoverPreview.top } }>
                    <LayoutFurniImageView productType={ hoverPreview.item.productType } productClassId={ hoverPreview.item.spriteId } />
                    <span>{ hoverPreview.item.name }</span>
                </div>,
                document.body) }
        </div>
    );
});
