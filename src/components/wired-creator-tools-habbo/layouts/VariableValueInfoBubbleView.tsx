/* eslint-disable quotes */
import { FC, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { LocalizeText } from '@/api';
import { HabboLayoutDefinition, HabboLayoutView } from '@/common/habbo';

export type VariableValueInfoBubbleViewSlot = "border" | "value";

export interface VariableValueInfoBubbleViewProps
{
    className?: string;
    slots?: Partial<Record<VariableValueInfoBubbleViewSlot, ReactNode>>;
    visibility?: Partial<Record<VariableValueInfoBubbleViewSlot, boolean>>;
    captions?: Partial<Record<VariableValueInfoBubbleViewSlot, string>>;
    itemListOrder?: Partial<Record<VariableValueInfoBubbleViewSlot, VariableValueInfoBubbleViewSlot[]>>;
    initialActiveTabs?: Record<string, string>;
    resolveCaption?: (caption: string) => string;
    onAction?: (name: string, event: ReactMouseEvent<HTMLElement>) => void;
    onTabChange?: (contextName: string, tabName: string) => void;
    onClose?: () => void;
}

const layout: HabboLayoutDefinition = {
    "name": "variable_value_info_bubble",
    "width": 60,
    "height": 39,
    "nodes": [
        {
            "id": "0",
            "type": "bubble",
            "attributes": {
                "x": "0",
                "y": "0",
                "width": "60",
                "height": "39",
                "params": "0",
                "style": "5",
                "name": "border",
                "color": "0x0ade6ff"
            },
            "variables": [
                {
                    "key": "margin_left",
                    "value": "8",
                    "type": "int"
                },
                {
                    "key": "margin_top",
                    "value": "8",
                    "type": "int"
                },
                {
                    "key": "margin_right",
                    "value": "8",
                    "type": "int"
                },
                {
                    "key": "margin_bottom",
                    "value": "8",
                    "type": "int"
                }
            ],
            "children": [
                {
                    "id": "0.0",
                    "type": "static_bitmap",
                    "attributes": {
                        "x": "2",
                        "y": "4",
                        "width": "16",
                        "height": "14",
                        "params": "16",
                        "style": "100"
                    },
                    "variables": [
                        {
                            "key": "stretched_x",
                            "value": "false",
                            "type": "Boolean"
                        },
                        {
                            "key": "stretched_y",
                            "value": "false",
                            "type": "Boolean"
                        }
                    ],
                    "children": []
                },
                {
                    "id": "0.1",
                    "type": "text",
                    "attributes": {
                        "x": "11",
                        "y": "3",
                        "width": "22",
                        "height": "16",
                        "params": "4194320",
                        "style": "0",
                        "name": "value",
                        "caption": "505"
                    },
                    "variables": [
                        {
                            "key": "auto_size",
                            "value": "left",
                            "type": "String"
                        },
                        {
                            "key": "font_size",
                            "value": "11",
                            "type": "uint"
                        },
                        {
                            "key": "text_color",
                            "value": "0xffffff",
                            "type": "hex"
                        },
                        {
                            "key": "text_style",
                            "value": "u_regular",
                            "type": "String"
                        },
                        {
                            "key": "mouse_wheel_enabled",
                            "value": "false",
                            "type": "Boolean"
                        },
                        {
                            "key": "spacing",
                            "value": "0",
                            "type": "Number"
                        },
                        {
                            "key": "leading",
                            "value": "0",
                            "type": "Number"
                        }
                    ],
                    "children": []
                }
            ]
        }
    ]
};

const localizeCaption = (caption: string) => caption.replace(/\$\{([^}]+)\}/g, (_match, key: string) => LocalizeText(key));

export const VariableValueInfoBubbleView: FC<VariableValueInfoBubbleViewProps> = props =>
{
    const { className = '', slots = {}, visibility = {}, captions = {}, itemListOrder = {}, initialActiveTabs = {}, resolveCaption = localizeCaption, onAction, onTabChange, onClose } = props;

    return <HabboLayoutView
        layout={ layout }
        className={ `generated-variable-value-info-bubble-view ${ className }` }
        slots={ slots }
        visibility={ visibility }
        captions={ captions }
        itemListOrder={ itemListOrder }
        initialActiveTabs={ initialActiveTabs }
        resolveCaption={ resolveCaption }
        onAction={ onAction }
        onTabChange={ onTabChange }
        onClose={ onClose } />;
};
