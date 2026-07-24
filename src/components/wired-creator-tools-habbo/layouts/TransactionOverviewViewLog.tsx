/* eslint-disable quotes */
import { FC, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { LocalizeText } from '@/api';
import { HabboLayoutDefinition, HabboLayoutView } from '@/common/habbo';

export type TransactionOverviewViewSlot = "first_page_btn" | "footer" | "footer_buttons_left" | "footer_buttons_right" | "header" | "id_key" | "id_value" | "key_value_pairs" | "last_page_btn" | "list_type_key" | "list_type_value" | "middle" | "next_page_btn" | "pagina_number_input" | "pagina_text_end" | "pagina_text_start" | "pagination" | "pair" | "prev_page_btn" | "refresh_btn" | "searching_icon" | "table_view" | "warning_text";

export interface TransactionOverviewViewProps
{
    className?: string;
    slots?: Partial<Record<TransactionOverviewViewSlot, ReactNode>>;
    visibility?: Partial<Record<TransactionOverviewViewSlot, boolean>>;
    captions?: Partial<Record<TransactionOverviewViewSlot, string>>;
    itemListOrder?: Partial<Record<TransactionOverviewViewSlot, TransactionOverviewViewSlot[]>>;
    initialActiveTabs?: Record<string, string>;
    resolveCaption?: (caption: string) => string;
    onAction?: (name: string, event: ReactMouseEvent<HTMLElement>) => void;
    onTabChange?: (contextName: string, tabName: string) => void;
    onClose?: () => void;
}

const layout: HabboLayoutDefinition = {
    "name": "transaction_overview",
    "width": 880,
    "height": 391,
    "nodes": [
        {
            "id": "0",
            "type": "frame",
            "attributes": {
                "x": "138",
                "y": "86",
                "width": "880",
                "height": "391",
                "params": "98305",
                "style": "3",
                "caption": "%24%7Bwiredchests.logs.title%7D",
                "color": "0xff418db0",
                "width_min": "880",
                "width_max": "880",
                "height_min": "391",
                "height_max": "700"
            },
            "variables": [
                {
                    "key": "margin_left",
                    "value": "0",
                    "type": "int"
                },
                {
                    "key": "margin_top",
                    "value": "33",
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
                        "x": "0",
                        "y": "0",
                        "width": "880",
                        "height": "62",
                        "params": "144",
                        "style": "3",
                        "name": "header"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.0.0",
                            "type": "html",
                            "attributes": {
                                "x": "10",
                                "y": "10",
                                "width": "861",
                                "height": "58",
                                "params": "2185",
                                "style": "3",
                                "name": "warning_text",
                                "visible": "false"
                            },
                            "variables": [
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
                                    "value": "1",
                                    "type": "Number"
                                },
                                {
                                    "key": "editable",
                                    "value": "false",
                                    "type": "Boolean"
                                },
                                {
                                    "key": "selectable",
                                    "value": "false",
                                    "type": "Boolean"
                                },
                                {
                                    "key": "editable",
                                    "value": "false",
                                    "type": "Boolean"
                                },
                                {
                                    "key": "selectable",
                                    "value": "false",
                                    "type": "Boolean"
                                }
                            ],
                            "children": []
                        },
                        {
                            "id": "0.0.1",
                            "type": "itemlist",
                            "attributes": {
                                "x": "15",
                                "y": "13",
                                "width": "400",
                                "height": "42",
                                "params": "16",
                                "style": "3",
                                "name": "key_value_pairs"
                            },
                            "variables": [
                                {
                                    "key": "spacing",
                                    "value": "2",
                                    "type": "int"
                                },
                                {
                                    "key": "resize_on_item_update",
                                    "value": "true",
                                    "type": "Boolean"
                                }
                            ],
                            "children": [
                                {
                                    "id": "0.0.1.0",
                                    "type": "itemlist_horizontal",
                                    "attributes": {
                                        "x": "0",
                                        "y": "0",
                                        "width": "94",
                                        "height": "20",
                                        "params": "16",
                                        "style": "3",
                                        "name": "pair"
                                    },
                                    "variables": [
                                        {
                                            "key": "spacing",
                                            "value": "2",
                                            "type": "int"
                                        },
                                        {
                                            "key": "resize_on_item_update",
                                            "value": "true",
                                            "type": "Boolean"
                                        }
                                    ],
                                    "children": [
                                        {
                                            "id": "0.0.1.0.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "57",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "name": "list_type_key",
                                                "caption": "%24%7Bwiredchests.logs.list_type%7D"
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
                                            "id": "0.0.1.0.1",
                                            "type": "text",
                                            "attributes": {
                                                "x": "59",
                                                "y": "0",
                                                "width": "35",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "name": "list_type_value",
                                                "caption": "%24%7Bwiredchests.logs.type.0%7D"
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
                                },
                                {
                                    "id": "0.0.1.1",
                                    "type": "itemlist_horizontal",
                                    "attributes": {
                                        "x": "0",
                                        "y": "22",
                                        "width": "93",
                                        "height": "20",
                                        "params": "16",
                                        "style": "3",
                                        "name": "pair"
                                    },
                                    "variables": [
                                        {
                                            "key": "spacing",
                                            "value": "2",
                                            "type": "int"
                                        },
                                        {
                                            "key": "resize_on_item_update",
                                            "value": "true",
                                            "type": "Boolean"
                                        }
                                    ],
                                    "children": [
                                        {
                                            "id": "0.0.1.1.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "53",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "name": "id_key",
                                                "caption": "%24%7Bwiredchests.logs.chest_id%7D"
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
                                            "id": "0.0.1.1.1",
                                            "type": "text",
                                            "attributes": {
                                                "x": "55",
                                                "y": "0",
                                                "width": "38",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "name": "id_value",
                                                "caption": "12345"
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
                        },
                        {
                            "id": "0.0.2",
                            "type": "button",
                            "attributes": {
                                "x": "801",
                                "y": "13",
                                "width": "62",
                                "height": "30",
                                "params": "393297",
                                "style": "3",
                                "name": "refresh_btn",
                                "caption": "%24%7Bwiredchests.logs.refresh%7D"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.0.3",
                            "type": "icon",
                            "attributes": {
                                "x": "777",
                                "y": "20",
                                "width": "15",
                                "height": "15",
                                "params": "16",
                                "style": "23",
                                "name": "searching_icon",
                                "visible": "false"
                            },
                            "variables": [],
                            "children": []
                        }
                    ]
                },
                {
                    "id": "0.1",
                    "type": "container",
                    "attributes": {
                        "x": "1",
                        "y": "62",
                        "width": "878",
                        "height": "234",
                        "params": "2192",
                        "style": "3",
                        "name": "middle"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.1.0",
                            "type": "container",
                            "attributes": {
                                "x": "13",
                                "y": "0",
                                "width": "852",
                                "height": "234",
                                "params": "2192",
                                "style": "3",
                                "name": "table_view"
                            },
                            "variables": [],
                            "children": []
                        }
                    ]
                },
                {
                    "id": "0.2",
                    "type": "container",
                    "attributes": {
                        "x": "0",
                        "y": "296",
                        "width": "880",
                        "height": "60",
                        "params": "1049744",
                        "style": "3",
                        "name": "footer"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.2.0",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "16",
                                "width": "880",
                                "height": "30",
                                "params": "1168",
                                "style": "3",
                                "name": "pagination"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.2.0.0",
                                    "type": "itemlist_horizontal",
                                    "attributes": {
                                        "x": "17",
                                        "y": "0",
                                        "width": "113",
                                        "height": "30",
                                        "params": "16",
                                        "style": "3",
                                        "name": "footer_buttons_left"
                                    },
                                    "variables": [
                                        {
                                            "key": "spacing",
                                            "value": "13",
                                            "type": "int"
                                        },
                                        {
                                            "key": "resize_on_item_update",
                                            "value": "true",
                                            "type": "Boolean"
                                        }
                                    ],
                                    "children": [
                                        {
                                            "id": "0.2.0.0.0",
                                            "type": "container_button",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "50",
                                                "height": "30",
                                                "params": "17",
                                                "style": "3",
                                                "name": "first_page_btn",
                                                "width_min": "50",
                                                "width_max": "50"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.0.0.0.0",
                                                    "type": "icon",
                                                    "attributes": {
                                                        "x": "18",
                                                        "y": "10",
                                                        "width": "10",
                                                        "height": "10",
                                                        "params": "16",
                                                        "style": "4",
                                                        "color": "0x00"
                                                    },
                                                    "variables": [],
                                                    "children": []
                                                },
                                                {
                                                    "id": "0.2.0.0.0.1",
                                                    "type": "icon",
                                                    "attributes": {
                                                        "x": "27",
                                                        "y": "10",
                                                        "width": "10",
                                                        "height": "10",
                                                        "params": "16",
                                                        "style": "4",
                                                        "color": "0x00"
                                                    },
                                                    "variables": [],
                                                    "children": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "0.2.0.0.1",
                                            "type": "container_button",
                                            "attributes": {
                                                "x": "63",
                                                "y": "0",
                                                "width": "50",
                                                "height": "30",
                                                "params": "17",
                                                "style": "3",
                                                "name": "prev_page_btn",
                                                "width_min": "50",
                                                "width_max": "50"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.0.0.1.0",
                                                    "type": "icon",
                                                    "attributes": {
                                                        "x": "22",
                                                        "y": "10",
                                                        "width": "10",
                                                        "height": "10",
                                                        "params": "16",
                                                        "style": "4",
                                                        "color": "0x00"
                                                    },
                                                    "variables": [],
                                                    "children": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "0.2.0.1",
                                    "type": "itemlist_horizontal",
                                    "attributes": {
                                        "x": "753",
                                        "y": "0",
                                        "width": "110",
                                        "height": "30",
                                        "params": "262224",
                                        "style": "3",
                                        "name": "footer_buttons_right"
                                    },
                                    "variables": [
                                        {
                                            "key": "spacing",
                                            "value": "10",
                                            "type": "int"
                                        },
                                        {
                                            "key": "resize_on_item_update",
                                            "value": "true",
                                            "type": "Boolean"
                                        }
                                    ],
                                    "children": [
                                        {
                                            "id": "0.2.0.1.0",
                                            "type": "container_button",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "50",
                                                "height": "30",
                                                "params": "17",
                                                "style": "3",
                                                "name": "next_page_btn",
                                                "width_min": "50",
                                                "width_max": "50"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.0.1.0.0",
                                                    "type": "icon",
                                                    "attributes": {
                                                        "x": "23",
                                                        "y": "10",
                                                        "width": "10",
                                                        "height": "10",
                                                        "params": "16",
                                                        "style": "5",
                                                        "color": "0x00"
                                                    },
                                                    "variables": [],
                                                    "children": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "0.2.0.1.1",
                                            "type": "container_button",
                                            "attributes": {
                                                "x": "60",
                                                "y": "0",
                                                "width": "50",
                                                "height": "30",
                                                "params": "17",
                                                "style": "3",
                                                "name": "last_page_btn",
                                                "width_min": "50",
                                                "width_max": "50"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.0.1.1.0",
                                                    "type": "icon",
                                                    "attributes": {
                                                        "x": "18",
                                                        "y": "10",
                                                        "width": "10",
                                                        "height": "10",
                                                        "params": "16",
                                                        "style": "5",
                                                        "color": "0x00"
                                                    },
                                                    "variables": [],
                                                    "children": []
                                                },
                                                {
                                                    "id": "0.2.0.1.1.1",
                                                    "type": "icon",
                                                    "attributes": {
                                                        "x": "27",
                                                        "y": "10",
                                                        "width": "10",
                                                        "height": "10",
                                                        "params": "16",
                                                        "style": "5",
                                                        "color": "0x00"
                                                    },
                                                    "variables": [],
                                                    "children": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "0.2.0.2",
                                    "type": "itemlist_horizontal",
                                    "attributes": {
                                        "x": "312",
                                        "y": "4",
                                        "width": "256",
                                        "height": "25",
                                        "params": "786640",
                                        "style": "3"
                                    },
                                    "variables": [
                                        {
                                            "key": "spacing",
                                            "value": "2",
                                            "type": "int"
                                        },
                                        {
                                            "key": "resize_on_item_update",
                                            "value": "true",
                                            "type": "Boolean"
                                        }
                                    ],
                                    "children": [
                                        {
                                            "id": "0.2.0.2.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "205",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "name": "pagina_text_start",
                                                "caption": "X%20transactions%20found.%20Showing%20page%20",
                                                "blend": "0.7"
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
                                            "id": "0.2.0.2.1",
                                            "type": "input",
                                            "attributes": {
                                                "x": "207",
                                                "y": "0",
                                                "width": "21",
                                                "height": "17",
                                                "params": "1",
                                                "style": "3",
                                                "name": "pagina_number_input",
                                                "caption": "1",
                                                "background": "true"
                                            },
                                            "variables": [
                                                {
                                                    "key": "border",
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
                                            "id": "0.2.0.2.2",
                                            "type": "text",
                                            "attributes": {
                                                "x": "230",
                                                "y": "0",
                                                "width": "26",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "name": "pagina_text_end",
                                                "caption": "of%20Y",
                                                "blend": "0.7"
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
                }
            ]
        }
    ]
};

const localizeCaption = (caption: string) => caption.replace(/\$\{([^}]+)\}/g, (_match, key: string) => LocalizeText(key));

export const TransactionOverviewView: FC<TransactionOverviewViewProps> = props =>
{
    const { className = '', slots = {}, visibility = {}, captions = {}, itemListOrder = {}, initialActiveTabs = {}, resolveCaption = localizeCaption, onAction, onTabChange, onClose } = props;

    return <HabboLayoutView
        layout={ layout }
        className={ `generated-transaction-overview-view ${ className }` }
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
