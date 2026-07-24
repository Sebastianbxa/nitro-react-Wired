/* eslint-disable quotes */
import { FC, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { LocalizeText } from '@/api';
import { HabboLayoutDefinition, HabboLayoutView } from '@/common/habbo';

export type ErrorInfoViewViewSlot = "contents" | "error_info_frame" | "error_name" | "error_text" | "type_icon";

export interface ErrorInfoViewViewProps
{
    className?: string;
    slots?: Partial<Record<ErrorInfoViewViewSlot, ReactNode>>;
    visibility?: Partial<Record<ErrorInfoViewViewSlot, boolean>>;
    captions?: Partial<Record<ErrorInfoViewViewSlot, string>>;
    itemListOrder?: Partial<Record<ErrorInfoViewViewSlot, ErrorInfoViewViewSlot[]>>;
    initialActiveTabs?: Record<string, string>;
    resolveCaption?: (caption: string) => string;
    onAction?: (name: string, event: ReactMouseEvent<HTMLElement>) => void;
    onTabChange?: (contextName: string, tabName: string) => void;
    onClose?: () => void;
}

const layout: HabboLayoutDefinition = {
    "name": "error_info_view",
    "width": 337,
    "height": 148,
    "nodes": [
        {
            "id": "0",
            "type": "frame",
            "attributes": {
                "x": "35",
                "y": "30",
                "width": "337",
                "height": "148",
                "params": "1073790977",
                "style": "3",
                "name": "error_info_frame",
                "caption": "%24%7Bwiredmenu.error_info.title%7D",
                "color": "0xff418db0",
                "width_min": "300"
            },
            "variables": [
                {
                    "key": "margin_left",
                    "value": "0",
                    "type": "int"
                },
                {
                    "key": "margin_top",
                    "value": "36",
                    "type": "int"
                },
                {
                    "key": "margin_right",
                    "value": "0",
                    "type": "int"
                },
                {
                    "key": "margin_bottom",
                    "value": "0",
                    "type": "int"
                }
            ],
            "children": [
                {
                    "id": "0.0",
                    "type": "container",
                    "attributes": {
                        "x": "8",
                        "y": "3",
                        "width": "320",
                        "height": "100",
                        "params": "147600",
                        "style": "3",
                        "name": "contents",
                        "height_min": "100"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.0.0",
                            "type": "static_bitmap",
                            "attributes": {
                                "x": "280",
                                "y": "0",
                                "width": "40",
                                "height": "40",
                                "params": "16",
                                "style": "3",
                                "name": "type_icon"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.0.1",
                            "type": "text",
                            "attributes": {
                                "x": "109",
                                "y": "11",
                                "width": "101",
                                "height": "17",
                                "params": "3932176",
                                "style": "3",
                                "name": "error_name",
                                "caption": "EXECUTION_CAP"
                            },
                            "variables": [
                                {
                                    "key": "auto_size",
                                    "value": "left",
                                    "type": "String"
                                },
                                {
                                    "key": "mouse_wheel_enabled",
                                    "value": "false",
                                    "type": "Boolean"
                                },
                                {
                                    "key": "bold",
                                    "value": "true",
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
                        },
                        {
                            "id": "0.0.2",
                            "type": "text",
                            "attributes": {
                                "x": "0",
                                "y": "46",
                                "width": "319",
                                "height": "50",
                                "params": "16400",
                                "style": "3",
                                "name": "error_text",
                                "height_min": "50"
                            },
                            "variables": [
                                {
                                    "key": "auto_size",
                                    "value": "left",
                                    "type": "String"
                                },
                                {
                                    "key": "mouse_wheel_enabled",
                                    "value": "false",
                                    "type": "Boolean"
                                },
                                {
                                    "key": "multiline",
                                    "value": "true",
                                    "type": "Boolean"
                                },
                                {
                                    "key": "word_wrap",
                                    "value": "true",
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
        }
    ]
};

const localizeCaption = (caption: string) => caption.replace(/\$\{([^}]+)\}/g, (_match, key: string) => LocalizeText(key));

export const ErrorInfoViewView: FC<ErrorInfoViewViewProps> = props =>
{
    const { className = '', slots = {}, visibility = {}, captions = {}, itemListOrder = {}, initialActiveTabs = {}, resolveCaption = localizeCaption, onAction, onTabChange, onClose } = props;

    return <HabboLayoutView
        layout={ layout }
        className={ `generated-error-info-view-view ${ className }` }
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
