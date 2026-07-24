/* eslint-disable quotes */
import { FC, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { LocalizeText } from '@/api';
import { HabboLayoutDefinition, HabboLayoutView, setSkinRegistryExtension, SkinRegistryExtension } from '@/common/habbo';

export type TransactionDetailsViewSlot = "border" | "chest_ids_pair" | "coins_icon" | "deposits_container" | "desc1" | "desc2" | "desc3" | "empty_text" | "extra_container" | "extra_info_bubble" | "extra_info_bubble_texts" | "extra_info_button" | "extra_pair" | "furni_details" | "furni_icon" | "furni_quantity" | "furni_template" | "furni_transactions_pair" | "incomplete_text" | "item_grid" | "key_value_pairs" | "number_container" | "number_container_inner_border" | "outline_focus" | "rarity_item_overlay_container" | "room_id_pair" | "spacer" | "spacing" | "timestamp_pair" | "title" | "transaction_type_pair" | "unique_item_background_bitmap" | "unique_item_overlay_container" | "username_pair" | "withdrawals_container";

export interface TransactionDetailsViewProps
{
    className?: string;
    slots?: Partial<Record<TransactionDetailsViewSlot, ReactNode>>;
    visibility?: Partial<Record<TransactionDetailsViewSlot, boolean>>;
    captions?: Partial<Record<TransactionDetailsViewSlot, string>>;
    itemListOrder?: Partial<Record<TransactionDetailsViewSlot, TransactionDetailsViewSlot[]>>;
    initialActiveTabs?: Record<string, string>;
    resolveCaption?: (caption: string) => string;
    onAction?: (name: string, event: ReactMouseEvent<HTMLElement>) => void;
    onTabChange?: (contextName: string, tabName: string) => void;
    onClose?: () => void;
}

const layout: HabboLayoutDefinition = {
    "name": "transaction_details",
    "width": 400,
    "height": 394,
    "nodes": [
        {
            "id": "0",
            "type": "frame",
            "attributes": {
                "x": "42",
                "y": "44",
                "width": "400",
                "height": "394",
                "params": "32769",
                "style": "3",
                "caption": "%24%7Bwiredchests.log_details.title%7D",
                "color": "0xff418db0",
                "width_min": "400",
                "width_max": "400"
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
                    "type": "itemlist_vertical",
                    "attributes": {
                        "x": "10",
                        "y": "13",
                        "width": "380",
                        "height": "336",
                        "params": "8388752",
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
                            "id": "0.0.0",
                            "type": "itemlist_horizontal",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "111",
                                "height": "20",
                                "params": "16",
                                "style": "3",
                                "name": "transaction_type_pair"
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
                                    "id": "0.0.0.0",
                                    "type": "text",
                                    "attributes": {
                                        "x": "0",
                                        "y": "0",
                                        "width": "101",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "%24%7Bwiredchests.log_details.type%7D"
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
                                    "id": "0.0.0.1",
                                    "type": "text",
                                    "attributes": {
                                        "x": "103",
                                        "y": "0",
                                        "width": "8",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "-"
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
                            "id": "0.0.1",
                            "type": "itemlist_horizontal",
                            "attributes": {
                                "x": "0",
                                "y": "22",
                                "width": "77",
                                "height": "20",
                                "params": "16",
                                "style": "3",
                                "name": "timestamp_pair"
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
                                    "type": "text",
                                    "attributes": {
                                        "x": "0",
                                        "y": "0",
                                        "width": "67",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "%24%7Bwiredchests.log_details.timestamp%7D"
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
                                    "type": "text",
                                    "attributes": {
                                        "x": "69",
                                        "y": "0",
                                        "width": "8",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "-"
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
                            "id": "0.0.2",
                            "type": "itemlist_horizontal",
                            "attributes": {
                                "x": "0",
                                "y": "44",
                                "width": "61",
                                "height": "20",
                                "params": "16",
                                "style": "3",
                                "name": "room_id_pair"
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
                                    "id": "0.0.2.0",
                                    "type": "text",
                                    "attributes": {
                                        "x": "0",
                                        "y": "0",
                                        "width": "51",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "%24%7Bwiredchests.log_details.room_id%7D"
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
                                    "id": "0.0.2.1",
                                    "type": "text",
                                    "attributes": {
                                        "x": "53",
                                        "y": "0",
                                        "width": "8",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "-"
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
                            "id": "0.0.3",
                            "type": "itemlist_horizontal",
                            "attributes": {
                                "x": "0",
                                "y": "66",
                                "width": "78",
                                "height": "20",
                                "params": "16",
                                "style": "3",
                                "name": "chest_ids_pair"
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
                                    "id": "0.0.3.0",
                                    "type": "text",
                                    "attributes": {
                                        "x": "0",
                                        "y": "0",
                                        "width": "68",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "%24%7Bwiredchests.log_details.chest_ids%7D"
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
                                    "id": "0.0.3.1",
                                    "type": "text",
                                    "attributes": {
                                        "x": "70",
                                        "y": "0",
                                        "width": "8",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "-"
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
                            "id": "0.0.4",
                            "type": "itemlist_horizontal",
                            "attributes": {
                                "x": "0",
                                "y": "88",
                                "width": "74",
                                "height": "20",
                                "params": "16",
                                "style": "3",
                                "name": "username_pair"
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
                                    "id": "0.0.4.0",
                                    "type": "text",
                                    "attributes": {
                                        "x": "0",
                                        "y": "0",
                                        "width": "64",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "%24%7Bwiredchests.log_details.username%7D"
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
                                    "type": "text",
                                    "attributes": {
                                        "x": "66",
                                        "y": "0",
                                        "width": "8",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "-"
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
                            "id": "0.0.5",
                            "type": "widget",
                            "attributes": {
                                "x": "0",
                                "y": "110",
                                "width": "380",
                                "height": "5",
                                "params": "144",
                                "style": "3"
                            },
                            "variables": [
                                {
                                    "key": "widget_type",
                                    "value": "separator",
                                    "type": "String"
                                }
                            ],
                            "children": []
                        },
                        {
                            "id": "0.0.6",
                            "type": "itemlist_horizontal",
                            "attributes": {
                                "x": "0",
                                "y": "117",
                                "width": "89",
                                "height": "20",
                                "params": "16",
                                "style": "3",
                                "name": "furni_transactions_pair"
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
                                    "id": "0.0.6.0",
                                    "type": "text",
                                    "attributes": {
                                        "x": "0",
                                        "y": "0",
                                        "width": "79",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "%24%7Bwiredchests.log_details.transactions%7D"
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
                                    "id": "0.0.6.1",
                                    "type": "text",
                                    "attributes": {
                                        "x": "81",
                                        "y": "0",
                                        "width": "8",
                                        "height": "17",
                                        "params": "16",
                                        "style": "3",
                                        "caption": "-",
                                        "blend": "0"
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
                            "id": "0.0.7",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "139",
                                "width": "380",
                                "height": "161",
                                "params": "16",
                                "style": "3",
                                "name": "furni_details"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.0.7.0",
                                    "type": "itemlist_horizontal",
                                    "attributes": {
                                        "x": "18",
                                        "y": "0",
                                        "width": "345",
                                        "height": "161",
                                        "params": "786640",
                                        "style": "3"
                                    },
                                    "variables": [
                                        {
                                            "key": "spacing",
                                            "value": "15",
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
                                            "id": "0.0.7.0.0",
                                            "type": "container",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "165",
                                                "height": "161",
                                                "params": "16",
                                                "style": "3",
                                                "name": "withdrawals_container"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.0.7.0.0.0",
                                                    "type": "text",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "0",
                                                        "width": "165",
                                                        "height": "17",
                                                        "params": "144",
                                                        "style": "3",
                                                        "caption": "%24%7Bwiredchests.log_details.transactions.withdrawn%7D"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "auto_size",
                                                            "value": "center",
                                                            "type": "String"
                                                        },
                                                        {
                                                            "key": "mouse_wheel_enabled",
                                                            "value": "false",
                                                            "type": "Boolean"
                                                        },
                                                        {
                                                            "key": "underline",
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
                                                    "id": "0.0.7.0.0.1",
                                                    "type": "border",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "20",
                                                        "width": "165",
                                                        "height": "141",
                                                        "params": "16",
                                                        "style": "4",
                                                        "color": "0x0e2e2e2"
                                                    },
                                                    "variables": [],
                                                    "children": [
                                                        {
                                                            "id": "0.0.7.0.0.1.0",
                                                            "type": "scrollable_itemgrid_vertical",
                                                            "attributes": {
                                                                "x": "5",
                                                                "y": "5",
                                                                "width": "155",
                                                                "height": "131",
                                                                "params": "2192",
                                                                "style": "3",
                                                                "name": "item_grid"
                                                            },
                                                            "variables": [
                                                                {
                                                                    "key": "spacing",
                                                                    "value": "3",
                                                                    "type": "int"
                                                                },
                                                                {
                                                                    "key": "scale_to_fit_items",
                                                                    "value": "true",
                                                                    "type": "Boolean"
                                                                }
                                                            ],
                                                            "children": [
                                                                {
                                                                    "id": "0.0.7.0.0.1.0.0",
                                                                    "type": "region",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "42",
                                                                        "height": "42",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "furni_template",
                                                                        "treshold": "0"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "tool_tip_delay",
                                                                            "value": "200",
                                                                            "type": "uint"
                                                                        }
                                                                    ],
                                                                    "children": [
                                                                        {
                                                                            "id": "0.0.7.0.0.1.0.0.0",
                                                                            "type": "border",
                                                                            "attributes": {
                                                                                "x": "1",
                                                                                "y": "1",
                                                                                "width": "40",
                                                                                "height": "40",
                                                                                "params": "16",
                                                                                "style": "5",
                                                                                "name": "border",
                                                                                "color": "0x0cbcbcb"
                                                                            },
                                                                            "variables": [],
                                                                            "children": [
                                                                                {
                                                                                    "id": "0.0.7.0.0.1.0.0.0.0",
                                                                                    "type": "static_bitmap",
                                                                                    "attributes": {
                                                                                        "x": "7",
                                                                                        "y": "11",
                                                                                        "width": "25",
                                                                                        "height": "18",
                                                                                        "params": "16",
                                                                                        "style": "3",
                                                                                        "name": "coins_icon",
                                                                                        "visible": "false"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "asset_uri",
                                                                                            "value": "clove-export:TransactionDetailsView:0",
                                                                                            "type": "String"
                                                                                        },
                                                                                        {
                                                                                            "key": "pivot_point",
                                                                                            "value": "center",
                                                                                            "type": "String"
                                                                                        },
                                                                                        {
                                                                                            "key": "stretched_x",
                                                                                            "value": "false",
                                                                                            "type": "Boolean"
                                                                                        },
                                                                                        {
                                                                                            "key": "stretched_y",
                                                                                            "value": "false",
                                                                                            "type": "Boolean"
                                                                                        },
                                                                                        {
                                                                                            "key": "fit_size_to_contents",
                                                                                            "value": "true",
                                                                                            "type": "Boolean"
                                                                                        }
                                                                                    ],
                                                                                    "children": []
                                                                                },
                                                                                {
                                                                                    "id": "0.0.7.0.0.1.0.0.0.1",
                                                                                    "type": "static_bitmap",
                                                                                    "attributes": {
                                                                                        "x": "2",
                                                                                        "y": "2",
                                                                                        "width": "36",
                                                                                        "height": "36",
                                                                                        "params": "16",
                                                                                        "style": "3",
                                                                                        "name": "unique_item_background_bitmap",
                                                                                        "visible": "false"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "asset_uri",
                                                                                            "value": "clove-export:TransactionDetailsView:1",
                                                                                            "type": "String"
                                                                                        },
                                                                                        {
                                                                                            "key": "stretched_x",
                                                                                            "value": "false",
                                                                                            "type": "Boolean"
                                                                                        },
                                                                                        {
                                                                                            "key": "stretched_y",
                                                                                            "value": "false",
                                                                                            "type": "Boolean"
                                                                                        },
                                                                                        {
                                                                                            "key": "fit_size_to_contents",
                                                                                            "value": "true",
                                                                                            "type": "Boolean"
                                                                                        }
                                                                                    ],
                                                                                    "children": []
                                                                                },
                                                                                {
                                                                                    "id": "0.0.7.0.0.1.0.0.0.2",
                                                                                    "type": "widget",
                                                                                    "attributes": {
                                                                                        "x": "0",
                                                                                        "y": "0",
                                                                                        "width": "40",
                                                                                        "height": "40",
                                                                                        "params": "16",
                                                                                        "style": "3",
                                                                                        "name": "furni_icon"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "widget_type",
                                                                                            "value": "product_icon",
                                                                                            "type": "String"
                                                                                        }
                                                                                    ],
                                                                                    "children": []
                                                                                },
                                                                                {
                                                                                    "id": "0.0.7.0.0.1.0.0.0.3",
                                                                                    "type": "container",
                                                                                    "attributes": {
                                                                                        "x": "27",
                                                                                        "y": "2",
                                                                                        "width": "13",
                                                                                        "height": "16",
                                                                                        "params": "278672",
                                                                                        "style": "0",
                                                                                        "name": "number_container",
                                                                                        "color": "0xffff2f6982",
                                                                                        "visible": "false",
                                                                                        "background": "true"
                                                                                    },
                                                                                    "variables": [],
                                                                                    "children": [
                                                                                        {
                                                                                            "id": "0.0.7.0.0.1.0.0.0.3.0",
                                                                                            "type": "container",
                                                                                            "attributes": {
                                                                                                "x": "1",
                                                                                                "y": "1",
                                                                                                "width": "11",
                                                                                                "height": "14",
                                                                                                "params": "4194320",
                                                                                                "style": "3",
                                                                                                "name": "number_container_inner_border",
                                                                                                "color": "0xffffffffff",
                                                                                                "background": "true"
                                                                                            },
                                                                                            "variables": [],
                                                                                            "children": [
                                                                                                {
                                                                                                    "id": "0.0.7.0.0.1.0.0.0.3.0.0",
                                                                                                    "type": "text",
                                                                                                    "attributes": {
                                                                                                        "x": "1",
                                                                                                        "y": "1",
                                                                                                        "width": "10",
                                                                                                        "height": "13",
                                                                                                        "params": "4194320",
                                                                                                        "style": "3",
                                                                                                        "name": "furni_quantity",
                                                                                                        "caption": "0"
                                                                                                    },
                                                                                                    "variables": [
                                                                                                        {
                                                                                                            "key": "antialias_type",
                                                                                                            "value": "advanced",
                                                                                                            "type": "String"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "auto_size",
                                                                                                            "value": "left",
                                                                                                            "type": "String"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "text_color",
                                                                                                            "value": "0x2f6982",
                                                                                                            "type": "hex"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "text_style",
                                                                                                            "value": "regular",
                                                                                                            "type": "String"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "mouse_wheel_enabled",
                                                                                                            "value": "false",
                                                                                                            "type": "Boolean"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "sharpness",
                                                                                                            "value": "0",
                                                                                                            "type": "Number"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "thickness",
                                                                                                            "value": "0",
                                                                                                            "type": "Number"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "kerning",
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
                                                                                    "id": "0.0.7.0.0.1.0.0.0.4",
                                                                                    "type": "widget",
                                                                                    "attributes": {
                                                                                        "x": "2",
                                                                                        "y": "2",
                                                                                        "width": "36",
                                                                                        "height": "36",
                                                                                        "params": "16",
                                                                                        "style": "3",
                                                                                        "name": "unique_item_overlay_container",
                                                                                        "visible": "false"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "widget_type",
                                                                                            "value": "limited_item_overlay_grid",
                                                                                            "type": "String"
                                                                                        }
                                                                                    ],
                                                                                    "children": []
                                                                                },
                                                                                {
                                                                                    "id": "0.0.7.0.0.1.0.0.0.5",
                                                                                    "type": "widget",
                                                                                    "attributes": {
                                                                                        "x": "2",
                                                                                        "y": "2",
                                                                                        "width": "36",
                                                                                        "height": "36",
                                                                                        "params": "16",
                                                                                        "style": "3",
                                                                                        "name": "rarity_item_overlay_container",
                                                                                        "visible": "false"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "widget_type",
                                                                                            "value": "rarity_item_overlay_grid",
                                                                                            "type": "String"
                                                                                        }
                                                                                    ],
                                                                                    "children": []
                                                                                },
                                                                                {
                                                                                    "id": "0.0.7.0.0.1.0.0.0.6",
                                                                                    "type": "text",
                                                                                    "attributes": {
                                                                                        "x": "3",
                                                                                        "y": "9",
                                                                                        "width": "34",
                                                                                        "height": "21",
                                                                                        "params": "3088",
                                                                                        "style": "3",
                                                                                        "name": "incomplete_text",
                                                                                        "caption": "+5",
                                                                                        "visible": "false"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "auto_size",
                                                                                            "value": "center",
                                                                                            "type": "String"
                                                                                        },
                                                                                        {
                                                                                            "key": "font_size",
                                                                                            "value": "16",
                                                                                            "type": "uint"
                                                                                        },
                                                                                        {
                                                                                            "key": "text_color",
                                                                                            "value": "0x666666",
                                                                                            "type": "hex"
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
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "id": "0.0.7.0.0.1.0.0.1",
                                                                            "type": "static_bitmap",
                                                                            "attributes": {
                                                                                "x": "0",
                                                                                "y": "0",
                                                                                "width": "42",
                                                                                "height": "42",
                                                                                "params": "16",
                                                                                "style": "3",
                                                                                "name": "outline_focus",
                                                                                "visible": "false"
                                                                            },
                                                                            "variables": [
                                                                                {
                                                                                    "key": "asset_uri",
                                                                                    "value": "clove-export:TransactionDetailsView:2",
                                                                                    "type": "String"
                                                                                },
                                                                                {
                                                                                    "key": "stretched_x",
                                                                                    "value": "false",
                                                                                    "type": "Boolean"
                                                                                },
                                                                                {
                                                                                    "key": "stretched_y",
                                                                                    "value": "false",
                                                                                    "type": "Boolean"
                                                                                },
                                                                                {
                                                                                    "key": "fit_size_to_contents",
                                                                                    "value": "true",
                                                                                    "type": "Boolean"
                                                                                }
                                                                            ],
                                                                            "children": []
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.0.7.0.0.1.1",
                                                            "type": "text",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "61",
                                                                "width": "165",
                                                                "height": "17",
                                                                "params": "144",
                                                                "style": "3",
                                                                "name": "empty_text",
                                                                "caption": "%24%7Bwiredchests.log_details.transactions.none_placeholder%7D",
                                                                "blend": "0.5"
                                                            },
                                                            "variables": [
                                                                {
                                                                    "key": "auto_size",
                                                                    "value": "center",
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
                                            "id": "0.0.7.0.1",
                                            "type": "container",
                                            "attributes": {
                                                "x": "180",
                                                "y": "0",
                                                "width": "165",
                                                "height": "161",
                                                "params": "16",
                                                "style": "3",
                                                "name": "deposits_container"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.0.7.0.1.0",
                                                    "type": "text",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "0",
                                                        "width": "165",
                                                        "height": "17",
                                                        "params": "144",
                                                        "style": "3",
                                                        "caption": "%24%7Bwiredchests.log_details.transactions.deposit%7D"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "auto_size",
                                                            "value": "center",
                                                            "type": "String"
                                                        },
                                                        {
                                                            "key": "mouse_wheel_enabled",
                                                            "value": "false",
                                                            "type": "Boolean"
                                                        },
                                                        {
                                                            "key": "underline",
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
                                                    "id": "0.0.7.0.1.1",
                                                    "type": "border",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "20",
                                                        "width": "165",
                                                        "height": "141",
                                                        "params": "16",
                                                        "style": "4",
                                                        "color": "0x0e2e2e2"
                                                    },
                                                    "variables": [],
                                                    "children": [
                                                        {
                                                            "id": "0.0.7.0.1.1.0",
                                                            "type": "scrollable_itemgrid_vertical",
                                                            "attributes": {
                                                                "x": "5",
                                                                "y": "5",
                                                                "width": "155",
                                                                "height": "132",
                                                                "params": "2192",
                                                                "style": "3",
                                                                "name": "item_grid"
                                                            },
                                                            "variables": [
                                                                {
                                                                    "key": "spacing",
                                                                    "value": "3",
                                                                    "type": "int"
                                                                },
                                                                {
                                                                    "key": "scale_to_fit_items",
                                                                    "value": "true",
                                                                    "type": "Boolean"
                                                                }
                                                            ],
                                                            "children": [
                                                                {
                                                                    "id": "0.0.7.0.1.1.0.0",
                                                                    "type": "region",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "42",
                                                                        "height": "42",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "furni_template",
                                                                        "treshold": "0"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "tool_tip_delay",
                                                                            "value": "200",
                                                                            "type": "uint"
                                                                        }
                                                                    ],
                                                                    "children": [
                                                                        {
                                                                            "id": "0.0.7.0.1.1.0.0.0",
                                                                            "type": "border",
                                                                            "attributes": {
                                                                                "x": "1",
                                                                                "y": "1",
                                                                                "width": "40",
                                                                                "height": "40",
                                                                                "params": "16",
                                                                                "style": "5",
                                                                                "name": "border",
                                                                                "color": "0x0cbcbcb"
                                                                            },
                                                                            "variables": [],
                                                                            "children": [
                                                                                {
                                                                                    "id": "0.0.7.0.1.1.0.0.0.0",
                                                                                    "type": "static_bitmap",
                                                                                    "attributes": {
                                                                                        "x": "7",
                                                                                        "y": "11",
                                                                                        "width": "25",
                                                                                        "height": "18",
                                                                                        "params": "16",
                                                                                        "style": "3",
                                                                                        "name": "coins_icon",
                                                                                        "visible": "false"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "asset_uri",
                                                                                            "value": "clove-export:TransactionDetailsView:3",
                                                                                            "type": "String"
                                                                                        },
                                                                                        {
                                                                                            "key": "stretched_x",
                                                                                            "value": "false",
                                                                                            "type": "Boolean"
                                                                                        },
                                                                                        {
                                                                                            "key": "stretched_y",
                                                                                            "value": "false",
                                                                                            "type": "Boolean"
                                                                                        },
                                                                                        {
                                                                                            "key": "fit_size_to_contents",
                                                                                            "value": "true",
                                                                                            "type": "Boolean"
                                                                                        }
                                                                                    ],
                                                                                    "children": []
                                                                                },
                                                                                {
                                                                                    "id": "0.0.7.0.1.1.0.0.0.1",
                                                                                    "type": "static_bitmap",
                                                                                    "attributes": {
                                                                                        "x": "2",
                                                                                        "y": "2",
                                                                                        "width": "36",
                                                                                        "height": "36",
                                                                                        "params": "16",
                                                                                        "style": "3",
                                                                                        "name": "unique_item_background_bitmap",
                                                                                        "visible": "false"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "asset_uri",
                                                                                            "value": "clove-export:TransactionDetailsView:4",
                                                                                            "type": "String"
                                                                                        },
                                                                                        {
                                                                                            "key": "stretched_x",
                                                                                            "value": "false",
                                                                                            "type": "Boolean"
                                                                                        },
                                                                                        {
                                                                                            "key": "stretched_y",
                                                                                            "value": "false",
                                                                                            "type": "Boolean"
                                                                                        },
                                                                                        {
                                                                                            "key": "fit_size_to_contents",
                                                                                            "value": "true",
                                                                                            "type": "Boolean"
                                                                                        }
                                                                                    ],
                                                                                    "children": []
                                                                                },
                                                                                {
                                                                                    "id": "0.0.7.0.1.1.0.0.0.2",
                                                                                    "type": "widget",
                                                                                    "attributes": {
                                                                                        "x": "0",
                                                                                        "y": "0",
                                                                                        "width": "40",
                                                                                        "height": "40",
                                                                                        "params": "16",
                                                                                        "style": "3",
                                                                                        "name": "furni_icon"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "widget_type",
                                                                                            "value": "product_icon",
                                                                                            "type": "String"
                                                                                        }
                                                                                    ],
                                                                                    "children": []
                                                                                },
                                                                                {
                                                                                    "id": "0.0.7.0.1.1.0.0.0.3",
                                                                                    "type": "container",
                                                                                    "attributes": {
                                                                                        "x": "27",
                                                                                        "y": "2",
                                                                                        "width": "13",
                                                                                        "height": "16",
                                                                                        "params": "278672",
                                                                                        "style": "0",
                                                                                        "name": "number_container",
                                                                                        "color": "0xffff2f6982",
                                                                                        "visible": "false",
                                                                                        "background": "true"
                                                                                    },
                                                                                    "variables": [],
                                                                                    "children": [
                                                                                        {
                                                                                            "id": "0.0.7.0.1.1.0.0.0.3.0",
                                                                                            "type": "container",
                                                                                            "attributes": {
                                                                                                "x": "1",
                                                                                                "y": "1",
                                                                                                "width": "11",
                                                                                                "height": "14",
                                                                                                "params": "4194320",
                                                                                                "style": "3",
                                                                                                "name": "number_container_inner_border",
                                                                                                "color": "0xffffffffff",
                                                                                                "background": "true"
                                                                                            },
                                                                                            "variables": [],
                                                                                            "children": [
                                                                                                {
                                                                                                    "id": "0.0.7.0.1.1.0.0.0.3.0.0",
                                                                                                    "type": "text",
                                                                                                    "attributes": {
                                                                                                        "x": "1",
                                                                                                        "y": "1",
                                                                                                        "width": "10",
                                                                                                        "height": "13",
                                                                                                        "params": "4194320",
                                                                                                        "style": "3",
                                                                                                        "name": "furni_quantity",
                                                                                                        "caption": "0"
                                                                                                    },
                                                                                                    "variables": [
                                                                                                        {
                                                                                                            "key": "antialias_type",
                                                                                                            "value": "advanced",
                                                                                                            "type": "String"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "auto_size",
                                                                                                            "value": "left",
                                                                                                            "type": "String"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "text_color",
                                                                                                            "value": "0x2f6982",
                                                                                                            "type": "hex"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "text_style",
                                                                                                            "value": "regular",
                                                                                                            "type": "String"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "mouse_wheel_enabled",
                                                                                                            "value": "false",
                                                                                                            "type": "Boolean"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "sharpness",
                                                                                                            "value": "0",
                                                                                                            "type": "Number"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "thickness",
                                                                                                            "value": "0",
                                                                                                            "type": "Number"
                                                                                                        },
                                                                                                        {
                                                                                                            "key": "kerning",
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
                                                                                    "id": "0.0.7.0.1.1.0.0.0.4",
                                                                                    "type": "widget",
                                                                                    "attributes": {
                                                                                        "x": "2",
                                                                                        "y": "2",
                                                                                        "width": "36",
                                                                                        "height": "36",
                                                                                        "params": "16",
                                                                                        "style": "3",
                                                                                        "name": "unique_item_overlay_container",
                                                                                        "visible": "false"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "widget_type",
                                                                                            "value": "limited_item_overlay_grid",
                                                                                            "type": "String"
                                                                                        }
                                                                                    ],
                                                                                    "children": []
                                                                                },
                                                                                {
                                                                                    "id": "0.0.7.0.1.1.0.0.0.5",
                                                                                    "type": "widget",
                                                                                    "attributes": {
                                                                                        "x": "2",
                                                                                        "y": "2",
                                                                                        "width": "36",
                                                                                        "height": "36",
                                                                                        "params": "16",
                                                                                        "style": "3",
                                                                                        "name": "rarity_item_overlay_container",
                                                                                        "visible": "false"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "widget_type",
                                                                                            "value": "rarity_item_overlay_grid",
                                                                                            "type": "String"
                                                                                        }
                                                                                    ],
                                                                                    "children": []
                                                                                },
                                                                                {
                                                                                    "id": "0.0.7.0.1.1.0.0.0.6",
                                                                                    "type": "text",
                                                                                    "attributes": {
                                                                                        "x": "3",
                                                                                        "y": "9",
                                                                                        "width": "34",
                                                                                        "height": "21",
                                                                                        "params": "3088",
                                                                                        "style": "3",
                                                                                        "name": "incomplete_text",
                                                                                        "caption": "+5",
                                                                                        "visible": "false"
                                                                                    },
                                                                                    "variables": [
                                                                                        {
                                                                                            "key": "auto_size",
                                                                                            "value": "center",
                                                                                            "type": "String"
                                                                                        },
                                                                                        {
                                                                                            "key": "font_size",
                                                                                            "value": "16",
                                                                                            "type": "uint"
                                                                                        },
                                                                                        {
                                                                                            "key": "text_color",
                                                                                            "value": "0x666666",
                                                                                            "type": "hex"
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
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "id": "0.0.7.0.1.1.0.0.1",
                                                                            "type": "static_bitmap",
                                                                            "attributes": {
                                                                                "x": "0",
                                                                                "y": "0",
                                                                                "width": "42",
                                                                                "height": "42",
                                                                                "params": "16",
                                                                                "style": "3",
                                                                                "name": "outline_focus",
                                                                                "visible": "false"
                                                                            },
                                                                            "variables": [
                                                                                {
                                                                                    "key": "asset_uri",
                                                                                    "value": "clove-export:TransactionDetailsView:5",
                                                                                    "type": "String"
                                                                                },
                                                                                {
                                                                                    "key": "stretched_x",
                                                                                    "value": "false",
                                                                                    "type": "Boolean"
                                                                                },
                                                                                {
                                                                                    "key": "stretched_y",
                                                                                    "value": "false",
                                                                                    "type": "Boolean"
                                                                                },
                                                                                {
                                                                                    "key": "fit_size_to_contents",
                                                                                    "value": "true",
                                                                                    "type": "Boolean"
                                                                                }
                                                                            ],
                                                                            "children": []
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.0.7.0.1.1.1",
                                                            "type": "text",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "61",
                                                                "width": "165",
                                                                "height": "17",
                                                                "params": "144",
                                                                "style": "3",
                                                                "name": "empty_text",
                                                                "caption": "%24%7Bwiredchests.log_details.transactions.none_placeholder%7D",
                                                                "blend": "0.5",
                                                                "visible": "false"
                                                            },
                                                            "variables": [
                                                                {
                                                                    "key": "auto_size",
                                                                    "value": "center",
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
                        },
                        {
                            "id": "0.0.8",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "302",
                                "width": "380",
                                "height": "5",
                                "params": "144",
                                "style": "3",
                                "name": "spacing"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.0.9",
                            "type": "widget",
                            "attributes": {
                                "x": "0",
                                "y": "309",
                                "width": "380",
                                "height": "5",
                                "params": "144",
                                "style": "3"
                            },
                            "variables": [
                                {
                                    "key": "widget_type",
                                    "value": "separator",
                                    "type": "String"
                                }
                            ],
                            "children": []
                        },
                        {
                            "id": "0.0.10",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "316",
                                "width": "380",
                                "height": "20",
                                "params": "144",
                                "style": "3",
                                "name": "extra_container"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.0.10.0",
                                    "type": "itemlist_horizontal",
                                    "attributes": {
                                        "x": "0",
                                        "y": "0",
                                        "width": "47",
                                        "height": "20",
                                        "params": "16",
                                        "style": "3",
                                        "name": "extra_pair"
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
                                            "id": "0.0.10.0.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "37",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "caption": "%24%7Bwiredchests.log_details.extra%7D"
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
                                            "id": "0.0.10.0.1",
                                            "type": "text",
                                            "attributes": {
                                                "x": "39",
                                                "y": "0",
                                                "width": "8",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "caption": "-"
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
                                    "id": "0.0.10.1",
                                    "type": "region",
                                    "attributes": {
                                        "x": "357",
                                        "y": "0",
                                        "width": "20",
                                        "height": "20",
                                        "params": "81",
                                        "style": "3",
                                        "name": "extra_info_button",
                                        "treshold": "0"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.0.10.1.0",
                                            "type": "static_bitmap",
                                            "attributes": {
                                                "x": "1",
                                                "y": "1",
                                                "width": "18",
                                                "height": "18",
                                                "params": "16",
                                                "style": "3"
                                            },
                                            "variables": [
                                                {
                                                    "key": "asset_uri",
                                                    "value": "clove-export:TransactionDetailsView:6",
                                                    "type": "String"
                                                },
                                                {
                                                    "key": "stretched_x",
                                                    "value": "false",
                                                    "type": "Boolean"
                                                },
                                                {
                                                    "key": "stretched_y",
                                                    "value": "false",
                                                    "type": "Boolean"
                                                },
                                                {
                                                    "key": "fit_size_to_contents",
                                                    "value": "true",
                                                    "type": "Boolean"
                                                }
                                            ],
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "id": "0.0.10.2",
                                    "type": "bubble",
                                    "attributes": {
                                        "x": "379",
                                        "y": "-79",
                                        "width": "325",
                                        "height": "179",
                                        "params": "1",
                                        "style": "7",
                                        "name": "extra_info_bubble",
                                        "visible": "false"
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
                                        },
                                        {
                                            "key": "direction",
                                            "value": "left",
                                            "type": "String"
                                        }
                                    ],
                                    "children": [
                                        {
                                            "id": "0.0.10.2.0",
                                            "type": "itemlist_vertical",
                                            "attributes": {
                                                "x": "8",
                                                "y": "8",
                                                "width": "293",
                                                "height": "147",
                                                "params": "8388752",
                                                "style": "3",
                                                "name": "extra_info_bubble_texts"
                                            },
                                            "variables": [
                                                {
                                                    "key": "spacing",
                                                    "value": "1",
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
                                                    "id": "0.0.10.2.0.0",
                                                    "type": "text",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "0",
                                                        "width": "123",
                                                        "height": "19",
                                                        "params": "16",
                                                        "style": "3",
                                                        "name": "title",
                                                        "caption": "%24%7Bwiredchests.log_details.extra.title%7D"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "auto_size",
                                                            "value": "left",
                                                            "type": "String"
                                                        },
                                                        {
                                                            "key": "font_size",
                                                            "value": "14",
                                                            "type": "uint"
                                                        },
                                                        {
                                                            "key": "text_style",
                                                            "value": "u_bold",
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
                                                    "id": "0.0.10.2.0.1",
                                                    "type": "container",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "20",
                                                        "width": "30",
                                                        "height": "7",
                                                        "params": "16",
                                                        "style": "3",
                                                        "name": "spacer"
                                                    },
                                                    "variables": [],
                                                    "children": []
                                                },
                                                {
                                                    "id": "0.0.10.2.0.2",
                                                    "type": "html",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "28",
                                                        "width": "293",
                                                        "height": "30",
                                                        "params": "129",
                                                        "style": "3",
                                                        "name": "desc1",
                                                        "caption": "%24%7Bwiredchests.log_details.extra.desc.1%7D",
                                                        "width_min": "293",
                                                        "width_max": "293"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "auto_size",
                                                            "value": "left",
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
                                                            "value": "0",
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
                                                    "id": "0.0.10.2.0.3",
                                                    "type": "html",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "59",
                                                        "width": "293",
                                                        "height": "57",
                                                        "params": "129",
                                                        "style": "3",
                                                        "name": "desc2",
                                                        "caption": "%24%7Bwiredchests.log_details.extra.desc.2%7D",
                                                        "width_min": "293",
                                                        "width_max": "293"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "auto_size",
                                                            "value": "left",
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
                                                            "value": "0",
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
                                                    "id": "0.0.10.2.0.4",
                                                    "type": "html",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "117",
                                                        "width": "293",
                                                        "height": "30",
                                                        "params": "129",
                                                        "style": "3",
                                                        "name": "desc3",
                                                        "caption": "%24%7Bwiredchests.log_details.extra.desc.3%7D",
                                                        "width_min": "293",
                                                        "width_max": "293"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "auto_size",
                                                            "value": "left",
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
                                                            "value": "0",
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

const registryExtension: SkinRegistryExtension = {
    "assets": {
        "clove-export:TransactionDetailsView:0": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAASCAYAAACuLnWgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGM0M3RTA2RkIxNTQxMUU1Qjg4OUZFNTNCNUE5MzQzRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGM0M3RTA3MEIxNTQxMUU1Qjg4OUZFNTNCNUE5MzQzRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYzQzdFMDZEQjE1NDExRTVCODg5RkU1M0I1QTkzNDNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYzQzdFMDZFQjE1NDExRTVCODg5RkU1M0I1QTkzNDNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+EpbslAAAAhZJREFUeNqsVcFOwkAQnS2NIQQwIQU8GL8Co54Evfo3mih+gOBBv8artNw08eoPqIkKDYlKjDFx153Z3Xa7lIjGCbSwnX3z5s3OlAkhwDbGWHbBMunL4A/mu+A8XpNgXC7QR5uX8cFgvyHjm80vFw0obyxBeBLLBZ4AK3SMrgh4wR35L0omkwkGGPYn0NopazoAla0igSZ2nv7G9cv94lwyb1cfFIyyRjhcDHsxtDpVuAlfyX/37B1+ks8QQB9jCH4zmEK7W4NC/YGy0ZlwYm5AMMCi8iEoBhsclJLHGCCSqnyNVykbP2HmnJt58tmMkQAC0mOuwIenE10X/Hpp4QXSokJxyiJPPtzUlkGifpzLGKXhx4H29QiLZDYaMHNJssnK1+kGYNoJ920f1qy+ShkromndzLqnldAXq7COfAhGWVigLmNShEH6X99Vn1BUdXflM8HaR4HTcLOMaT9uxfYQVk2azYBOB49XZSEnMCOfBot6KgtBAWu5jEPtwzyRIes9PY2ZOi2f0NGFs+UzqgmTDZ/PGGuHBEJ5GBCrEDwAJuHnzSJbPi51Ub2S9sg8xsYPA+ERR8MkmDuFV1bq4vk5TuRb36nqzLjskyWqhSl4JHuic6TkRsaPtyXpJqDQuM8Mypkg9sCsbBYl6xFSVvLY2mnG0+tPWN4b/TyF80a1O/qV7lzje4px/X6h90xuJv/9EvsWYAAvck9EpeJRKQAAAABJRU5ErkJggg==",
        "clove-export:TransactionDetailsView:1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAD1BMVEX///8xaGP///+15ODg8esh8wFFAAAAAXRSTlMAQObYZgAAADdJREFUeF7tyMENABAQRcFHBcgWgBa2gk30X5P7j6OTmOOQqijYEoG5eKZ+TRE0rUHW6lcLLQ4208Jv5maazbsAAAAASUVORK5CYII=",
        "clove-export:TransactionDetailsView:2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqBAMAAAA37dRoAAAAD1BMVEX///8AAAAAAAD///8AAAChngBBAAAAA3RSTlMAfwBS0aHnAAAASklEQVR4Xu3SwQmAQAxE0XHdAhQsIGwFwqSASLb/mrxnsABh3/GfP0afVQxYsvKGThVIoqIjb6n7r+uqq369TuW4qB5sUx2wU7UXfCszmsWstbgAAAAASUVORK5CYII=",
        "clove-export:TransactionDetailsView:3": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAASCAYAAACuLnWgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGM0M3RTA2RkIxNTQxMUU1Qjg4OUZFNTNCNUE5MzQzRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGM0M3RTA3MEIxNTQxMUU1Qjg4OUZFNTNCNUE5MzQzRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYzQzdFMDZEQjE1NDExRTVCODg5RkU1M0I1QTkzNDNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYzQzdFMDZFQjE1NDExRTVCODg5RkU1M0I1QTkzNDNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+EpbslAAAAhZJREFUeNqsVcFOwkAQnS2NIQQwIQU8GL8Co54Evfo3mih+gOBBv8artNw08eoPqIkKDYlKjDFx153Z3Xa7lIjGCbSwnX3z5s3OlAkhwDbGWHbBMunL4A/mu+A8XpNgXC7QR5uX8cFgvyHjm80vFw0obyxBeBLLBZ4AK3SMrgh4wR35L0omkwkGGPYn0NopazoAla0igSZ2nv7G9cv94lwyb1cfFIyyRjhcDHsxtDpVuAlfyX/37B1+ks8QQB9jCH4zmEK7W4NC/YGy0ZlwYm5AMMCi8iEoBhsclJLHGCCSqnyNVykbP2HmnJt58tmMkQAC0mOuwIenE10X/Hpp4QXSokJxyiJPPtzUlkGifpzLGKXhx4H29QiLZDYaMHNJssnK1+kGYNoJ920f1qy+ShkromndzLqnldAXq7COfAhGWVigLmNShEH6X99Vn1BUdXflM8HaR4HTcLOMaT9uxfYQVk2azYBOB49XZSEnMCOfBot6KgtBAWu5jEPtwzyRIes9PY2ZOi2f0NGFs+UzqgmTDZ/PGGuHBEJ5GBCrEDwAJuHnzSJbPi51Ub2S9sg8xsYPA+ERR8MkmDuFV1bq4vk5TuRb36nqzLjskyWqhSl4JHuic6TkRsaPtyXpJqDQuM8Mypkg9sCsbBYl6xFSVvLY2mnG0+tPWN4b/TyF80a1O/qV7lzje4px/X6h90xuJv/9EvsWYAAvck9EpeJRKQAAAABJRU5ErkJggg==",
        "clove-export:TransactionDetailsView:4": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAD1BMVEX///8xaGP///+15ODg8esh8wFFAAAAAXRSTlMAQObYZgAAADdJREFUeF7tyMENABAQRcFHBcgWgBa2gk30X5P7j6OTmOOQqijYEoG5eKZ+TRE0rUHW6lcLLQ4208Jv5maazbsAAAAASUVORK5CYII=",
        "clove-export:TransactionDetailsView:5": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqBAMAAAA37dRoAAAAD1BMVEX///8AAAAAAAD///8AAAChngBBAAAAA3RSTlMAfwBS0aHnAAAASklEQVR4Xu3SwQmAQAxE0XHdAhQsIGwFwqSASLb/mrxnsABh3/GfP0afVQxYsvKGThVIoqIjb6n7r+uqq369TuW4qB5sUx2wU7UXfCszmsWstbgAAAAASUVORK5CYII=",
        "clove-export:TransactionDetailsView:6": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURaioqP///wAAACFWwrUAAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABLSURBVChTldBBEgAQDENR7f0PTb+mWJghC9K3MGhOGsnOUhExmLFNotoIJYiyaIAOkhQ8Zp1V+af7vQ6aVsQbMVH+xPYEpliE0dw7duYAtQAONPIAAAAASUVORK5CYII="
    },
    "skins": {}
};

setSkinRegistryExtension("TransactionDetailsView", registryExtension);

const localizeCaption = (caption: string) => caption.replace(/\$\{([^}]+)\}/g, (_match, key: string) => LocalizeText(key));

export const TransactionDetailsView: FC<TransactionDetailsViewProps> = props =>
{
    const { className = '', slots = {}, visibility = {}, captions = {}, itemListOrder = {}, initialActiveTabs = {}, resolveCaption = localizeCaption, onAction, onTabChange, onClose } = props;

    return <HabboLayoutView
        layout={ layout }
        className={ `generated-transaction-details-view ${ className }` }
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
