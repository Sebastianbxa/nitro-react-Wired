/* eslint-disable quotes */
import { FC, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { LocalizeText } from '@/api';
import { HabboLayoutDefinition, HabboLayoutView } from '@/common/habbo';

export type LogsOverviewViewSlot = "auto_refresh_cbx" | "filter_cont" | "filter_input" | "filter_key" | "first_page_btn" | "footer" | "footer_buttons_left" | "footer_buttons_right" | "header" | "info_text" | "last_page_btn" | "log_level_cont" | "log_level_key" | "log_level_menu" | "log_source_cont" | "log_source_key" | "log_source_menu" | "middle" | "next_page_btn" | "pagina_number_input" | "pagina_text_end" | "pagina_text_start" | "pagination" | "prev_page_btn" | "table_view";

export interface LogsOverviewViewProps
{
    className?: string;
    slots?: Partial<Record<LogsOverviewViewSlot, ReactNode>>;
    visibility?: Partial<Record<LogsOverviewViewSlot, boolean>>;
    captions?: Partial<Record<LogsOverviewViewSlot, string>>;
    itemListOrder?: Partial<Record<LogsOverviewViewSlot, LogsOverviewViewSlot[]>>;
    initialActiveTabs?: Record<string, string>;
    resolveCaption?: (caption: string) => string;
    onAction?: (name: string, event: ReactMouseEvent<HTMLElement>) => void;
    onTabChange?: (contextName: string, tabName: string) => void;
    onClose?: () => void;
}

const layout: HabboLayoutDefinition = {
    "name": "logs_overview",
    "width": 700,
    "height": 508,
    "nodes": [
        {
            "id": "0",
            "type": "frame",
            "attributes": {
                "x": "138",
                "y": "86",
                "width": "700",
                "height": "508",
                "params": "98305",
                "style": "3",
                "caption": "%24%7Bwiredmenu.logs_overview.title%7D",
                "color": "0xff418db0",
                "width_min": "700",
                "width_max": "700",
                "height_min": "380",
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
                        "width": "700",
                        "height": "117",
                        "params": "144",
                        "style": "3",
                        "name": "header"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.0.0",
                            "type": "border",
                            "attributes": {
                                "x": "8",
                                "y": "7",
                                "width": "580",
                                "height": "38",
                                "params": "16",
                                "style": "4"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.0.0.0",
                                    "type": "html",
                                    "attributes": {
                                        "x": "1",
                                        "y": "3",
                                        "width": "578",
                                        "height": "32",
                                        "params": "2185",
                                        "style": "3",
                                        "name": "info_text",
                                        "caption": "%24%7Bwiredmenu.logs_overview.info%7D",
                                        "width_min": "578",
                                        "width_max": "578",
                                        "height_min": "32",
                                        "height_max": "32"
                                    },
                                    "variables": [
                                        {
                                            "key": "auto_size",
                                            "value": "center",
                                            "type": "String"
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
                                }
                            ]
                        },
                        {
                            "id": "0.0.1",
                            "type": "container",
                            "attributes": {
                                "x": "15",
                                "y": "60",
                                "width": "314",
                                "height": "25",
                                "params": "16",
                                "style": "3",
                                "name": "filter_cont"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.0.1.0",
                                    "type": "text",
                                    "attributes": {
                                        "x": "0",
                                        "y": "3",
                                        "width": "38",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "name": "filter_key",
                                        "caption": "%24%7Bwiredmenu.logs_overview.filter%7D"
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
                                    "id": "0.0.1.1",
                                    "type": "border",
                                    "attributes": {
                                        "x": "45",
                                        "y": "0",
                                        "width": "269",
                                        "height": "25",
                                        "params": "16",
                                        "style": "4"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.0.1.1.0",
                                            "type": "input",
                                            "attributes": {
                                                "x": "6",
                                                "y": "4",
                                                "width": "257",
                                                "height": "18",
                                                "params": "1",
                                                "style": "3",
                                                "name": "filter_input"
                                            },
                                            "variables": [
                                                {
                                                    "key": "max_chars",
                                                    "value": "400",
                                                    "type": "int"
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
                            "type": "checkbox",
                            "attributes": {
                                "x": "596",
                                "y": "19",
                                "width": "15",
                                "height": "15",
                                "params": "17",
                                "style": "3",
                                "name": "auto_refresh_cbx"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.0.3",
                            "type": "text",
                            "attributes": {
                                "x": "614",
                                "y": "18",
                                "width": "90",
                                "height": "29",
                                "params": "16",
                                "style": "3",
                                "caption": "%24%7Bwiredmenu.logs_overview.auto_refresh%7D"
                            },
                            "variables": [
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
                            "id": "0.0.4",
                            "type": "container",
                            "attributes": {
                                "x": "349",
                                "y": "60",
                                "width": "164",
                                "height": "25",
                                "params": "16",
                                "style": "3",
                                "name": "log_source_cont"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.0.4.0",
                                    "type": "text",
                                    "attributes": {
                                        "x": "0",
                                        "y": "3",
                                        "width": "68",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "name": "log_source_key",
                                        "caption": "%24%7Bwiredmenu.logs_overview.log_source%7D"
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
                                    "id": "0.0.4.1",
                                    "type": "dropmenu",
                                    "attributes": {
                                        "x": "74",
                                        "y": "0",
                                        "width": "90",
                                        "height": "25",
                                        "params": "17",
                                        "style": "3",
                                        "name": "log_source_menu"
                                    },
                                    "variables": [
                                        {
                                            "key": "item_array",
                                            "value": "",
                                            "type": "String"
                                        }
                                    ],
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": "0.0.5",
                            "type": "container",
                            "attributes": {
                                "x": "534",
                                "y": "60",
                                "width": "154",
                                "height": "25",
                                "params": "16",
                                "style": "3",
                                "name": "log_level_cont"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.0.5.0",
                                    "type": "text",
                                    "attributes": {
                                        "x": "0",
                                        "y": "3",
                                        "width": "56",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "name": "log_level_key",
                                        "caption": "%24%7Bwiredmenu.logs_overview.log_level%7D"
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
                                    "id": "0.0.5.1",
                                    "type": "dropmenu",
                                    "attributes": {
                                        "x": "62",
                                        "y": "0",
                                        "width": "90",
                                        "height": "25",
                                        "params": "17",
                                        "style": "3",
                                        "name": "log_level_menu"
                                    },
                                    "variables": [
                                        {
                                            "key": "item_array",
                                            "value": "",
                                            "type": "String"
                                        }
                                    ],
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "0.1",
                    "type": "container",
                    "attributes": {
                        "x": "1",
                        "y": "97",
                        "width": "698",
                        "height": "316",
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
                                "width": "672",
                                "height": "316",
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
                        "y": "413",
                        "width": "700",
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
                                "width": "700",
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
                                        "x": "573",
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
                                        "x": "245",
                                        "y": "4",
                                        "width": "210",
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
                                                "width": "159",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "name": "pagina_text_start",
                                                "caption": "X%20logs%20found.%20Showing%20page%20",
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
                                                "x": "161",
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
                                                "x": "184",
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

export const LogsOverviewView: FC<LogsOverviewViewProps> = props =>
{
    const { className = '', slots = {}, visibility = {}, captions = {}, itemListOrder = {}, initialActiveTabs = {}, resolveCaption = localizeCaption, onAction, onTabChange, onClose } = props;

    return <HabboLayoutView
        layout={ layout }
        className={ `generated-logs-overview-view ${ className }` }
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
