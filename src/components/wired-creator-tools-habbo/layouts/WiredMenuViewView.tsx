/* eslint-disable quotes */
import { FC, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { LocalizeText } from '@/api';
import { HabboLayoutDefinition, HabboLayoutView, setSkinRegistryExtension, SkinRegistryExtension } from '@/common/habbo';

export type WiredMenuViewViewSlot = "-10" | "-20" | "#icon" | "1" | "2" | "3" | "add_var_btn" | "body_container" | "button_row" | "buttons" | "chest_controls_container" | "chests_container" | "clear_log_btn" | "context_option" | "create_var_btn" | "create_var_bubble" | "delete_var_btn" | "discord_region" | "furni_option" | "global_option" | "global_placeholder" | "header_border" | "header_container" | "header_detail" | "header_inner" | "header_title" | "highlight_holders_button" | "highlight_wired_btn" | "image_container" | "info_container" | "inspection_container" | "loading_view" | "lock_all_button" | "lock_own_button" | "log_container" | "log_overview_btn" | "log_table_container" | "logs_container" | "logs_table_container" | "manage_button" | "modify_1_checkbox" | "modify_2_checkbox" | "modify_3_checkbox" | "modify_settings_container" | "monitor_container" | "monitor_image_1" | "monitor_image_2" | "option_box" | "option_container" | "pin_checkbox" | "pin_option_container" | "preference_all_notifications_checkbox" | "preference_inspect_button_checkbox" | "preference_playtest_checkbox" | "preference_toolbar_checkbox" | "preferences_border" | "preferences_container" | "preview_avatar" | "preview_border" | "preview_container" | "preview_image_bitmap" | "preview_instruction_furni" | "preview_instruction_user" | "preview_pet" | "read_0_checkbox" | "read_1_checkbox" | "read_2_checkbox" | "read_3_checkbox" | "read_settings_container" | "reload_room_btn" | "roll_back_btn" | "room_settings_border" | "room_settings_container" | "settings_container" | "statistics_container" | "statistics_contents" | "statistics_floorfurni_html" | "statistics_heavy_html" | "statistics_perm_vars_furni_html" | "statistics_perm_vars_global_html" | "statistics_perm_vars_user_html" | "statistics_usage_html" | "statistics_wallfurni_html" | "tab_context" | "timezone_container" | "timezone_picker" | "title" | "title_extra" | "top_view_chests_button" | "top_view_info_button" | "top_view_inspection_button" | "top_view_monitor_button" | "top_view_settings_button" | "top_view_variable_overview_button" | "type_context_button" | "type_furni_button" | "type_global_button" | "type_options" | "type_picker_container" | "type_user_button" | "unlock_own_button" | "user_option" | "value_input" | "value_input_border" | "value_setting" | "var_picker_container" | "variable_list_container" | "variable_overview_container" | "variable_picker_container" | "variable_properties_container" | "variable_properties_table_container" | "variable_setting" | "variable_texts_container" | "variable_texts_table_container" | "variable_values_container" | "variable_values_table_container" | "view_in_detail_button" | "wired_style_border" | "wired_style_picker" | "wiredmenu_frame" | "wored_style_container";

export interface WiredMenuViewViewProps
{
    className?: string;
    slots?: Partial<Record<WiredMenuViewViewSlot, ReactNode>>;
    visibility?: Partial<Record<WiredMenuViewViewSlot, boolean>>;
    captions?: Partial<Record<WiredMenuViewViewSlot, string>>;
    itemListOrder?: Partial<Record<WiredMenuViewViewSlot, WiredMenuViewViewSlot[]>>;
    initialActiveTabs?: Record<string, string>;
    resolveCaption?: (caption: string) => string;
    onAction?: (name: string, event: ReactMouseEvent<HTMLElement>) => void;
    onTabChange?: (contextName: string, tabName: string) => void;
    onClose?: () => void;
}

const layout: HabboLayoutDefinition = {
    "name": "wired_menu_view",
    "width": 500,
    "height": 500,
    "nodes": [
        {
            "id": "0",
            "type": "frame",
            "attributes": {
                "x": "36",
                "y": "35",
                "width": "500",
                "height": "500",
                "params": "1073774593",
                "style": "3",
                "name": "wiredmenu_frame",
                "caption": "%24%7Bwiredmenu.title%7D",
                "color": "0xff418db0"
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
                    "type": "tab_context",
                    "attributes": {
                        "x": "0",
                        "y": "2",
                        "width": "500",
                        "height": "30",
                        "params": "16",
                        "style": "3",
                        "name": "tab_context"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.0.0",
                            "type": "tab_button",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "70",
                                "height": "32",
                                "params": "17",
                                "style": "3",
                                "name": "top_view_monitor_button",
                                "caption": "%24%7Bwiredmenu.monitor.tab%7D"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.0.1",
                            "type": "tab_button",
                            "attributes": {
                                "x": "70",
                                "y": "0",
                                "width": "74",
                                "height": "32",
                                "params": "17",
                                "style": "3",
                                "name": "top_view_variable_overview_button",
                                "caption": "%24%7Bwiredmenu.variable_overview.tab%7D"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.0.2",
                            "type": "tab_button",
                            "attributes": {
                                "x": "144",
                                "y": "0",
                                "width": "82",
                                "height": "32",
                                "params": "17",
                                "style": "3",
                                "name": "top_view_inspection_button",
                                "caption": "%24%7Bwiredmenu.inspection.tab%7D"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.0.3",
                            "type": "tab_button",
                            "attributes": {
                                "x": "226",
                                "y": "0",
                                "width": "109",
                                "height": "32",
                                "params": "17",
                                "style": "3",
                                "name": "top_view_chests_button",
                                "caption": "%24%7Bwiredmenu.chests.tab%7D"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.0.4",
                            "type": "tab_button",
                            "attributes": {
                                "x": "335",
                                "y": "0",
                                "width": "70",
                                "height": "32",
                                "params": "17",
                                "style": "3",
                                "name": "top_view_settings_button",
                                "caption": "%24%7Bwiredmenu.settings.tab%7D"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.0.5",
                            "type": "tab_button",
                            "attributes": {
                                "x": "405",
                                "y": "0",
                                "width": "46",
                                "height": "32",
                                "params": "17",
                                "style": "3",
                                "name": "top_view_info_button",
                                "caption": "%24%7Bwiredmenu.info.tab%7D"
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
                        "y": "32",
                        "width": "498",
                        "height": "50",
                        "params": "16",
                        "style": "3",
                        "name": "header_container"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.1.0",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "498",
                                "height": "50",
                                "params": "16",
                                "style": "3",
                                "name": "header_border",
                                "color": "0xffff486f81",
                                "background": "true"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.1.0.0",
                                    "type": "container",
                                    "attributes": {
                                        "x": "2",
                                        "y": "2",
                                        "width": "494",
                                        "height": "46",
                                        "params": "16",
                                        "style": "3",
                                        "name": "header_inner",
                                        "color": "0xffff235061",
                                        "background": "true"
                                    },
                                    "variables": [],
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": "0.1.1",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "500",
                                "height": "50",
                                "params": "16",
                                "style": "3",
                                "name": "header_detail"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.1.1.0",
                                    "type": "static_bitmap",
                                    "attributes": {
                                        "x": "8",
                                        "y": "20",
                                        "width": "64",
                                        "height": "51",
                                        "params": "16",
                                        "style": "3",
                                        "blend": "0.3"
                                    },
                                    "variables": [
                                        {
                                            "key": "asset_uri",
                                            "value": "clove-export:WiredMenuViewView:0",
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
                                    "id": "0.1.1.1",
                                    "type": "static_bitmap",
                                    "attributes": {
                                        "x": "78",
                                        "y": "-20",
                                        "width": "64",
                                        "height": "51",
                                        "params": "16",
                                        "style": "3",
                                        "blend": "0.3"
                                    },
                                    "variables": [
                                        {
                                            "key": "asset_uri",
                                            "value": "clove-export:WiredMenuViewView:1",
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
                                    "id": "0.1.1.2",
                                    "type": "static_bitmap",
                                    "attributes": {
                                        "x": "148",
                                        "y": "20",
                                        "width": "64",
                                        "height": "51",
                                        "params": "16",
                                        "style": "3",
                                        "blend": "0.3"
                                    },
                                    "variables": [
                                        {
                                            "key": "asset_uri",
                                            "value": "clove-export:WiredMenuViewView:2",
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
                                    "id": "0.1.1.3",
                                    "type": "static_bitmap",
                                    "attributes": {
                                        "x": "218",
                                        "y": "-20",
                                        "width": "64",
                                        "height": "51",
                                        "params": "16",
                                        "style": "3",
                                        "blend": "0.3"
                                    },
                                    "variables": [
                                        {
                                            "key": "asset_uri",
                                            "value": "clove-export:WiredMenuViewView:3",
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
                                    "id": "0.1.1.4",
                                    "type": "static_bitmap",
                                    "attributes": {
                                        "x": "288",
                                        "y": "20",
                                        "width": "64",
                                        "height": "51",
                                        "params": "16",
                                        "style": "3",
                                        "blend": "0.3"
                                    },
                                    "variables": [
                                        {
                                            "key": "asset_uri",
                                            "value": "clove-export:WiredMenuViewView:4",
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
                                    "id": "0.1.1.5",
                                    "type": "static_bitmap",
                                    "attributes": {
                                        "x": "358",
                                        "y": "-20",
                                        "width": "64",
                                        "height": "51",
                                        "params": "16",
                                        "style": "3",
                                        "blend": "0.3"
                                    },
                                    "variables": [
                                        {
                                            "key": "asset_uri",
                                            "value": "clove-export:WiredMenuViewView:5",
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
                                    "id": "0.1.1.6",
                                    "type": "static_bitmap",
                                    "attributes": {
                                        "x": "428",
                                        "y": "20",
                                        "width": "64",
                                        "height": "51",
                                        "params": "16",
                                        "style": "3",
                                        "blend": "0.3"
                                    },
                                    "variables": [
                                        {
                                            "key": "asset_uri",
                                            "value": "clove-export:WiredMenuViewView:6",
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
                            "id": "0.1.2",
                            "type": "text",
                            "attributes": {
                                "x": "0",
                                "y": "14",
                                "width": "500",
                                "height": "21",
                                "params": "16",
                                "style": "3",
                                "name": "header_title",
                                "caption": "Header%20Title"
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
                                    "value": "0xffffff",
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
                        },
                        {
                            "id": "0.1.3",
                            "type": "region",
                            "attributes": {
                                "x": "473",
                                "y": "3",
                                "width": "22",
                                "height": "25",
                                "params": "1",
                                "style": "3",
                                "dynamic_style": "brightness_and_shadow_under_gentle",
                                "name": "discord_region",
                                "treshold": "0"
                            },
                            "variables": [
                                {
                                    "key": "tool_tip_caption",
                                    "value": "${wiredmenu.discord_region.tooltip}",
                                    "type": "String"
                                }
                            ],
                            "children": [
                                {
                                    "id": "0.1.3.0",
                                    "type": "static_bitmap",
                                    "attributes": {
                                        "x": "0",
                                        "y": "1",
                                        "width": "22",
                                        "height": "23",
                                        "params": "16",
                                        "style": "3",
                                        "tags": "%23icon"
                                    },
                                    "variables": [
                                        {
                                            "key": "asset_uri",
                                            "value": "clove-export:WiredMenuViewView:7",
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
                                            "key": "etching_color",
                                            "value": "0x48000000",
                                            "type": "hex"
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
                    "id": "0.2",
                    "type": "container",
                    "attributes": {
                        "x": "0",
                        "y": "82",
                        "width": "500",
                        "height": "382",
                        "params": "16",
                        "style": "3",
                        "name": "body_container"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.2.0",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "500",
                                "height": "382",
                                "params": "12582928",
                                "style": "3",
                                "name": "monitor_container"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.2.0.0",
                                    "type": "container",
                                    "attributes": {
                                        "x": "14",
                                        "y": "18",
                                        "width": "215",
                                        "height": "123",
                                        "params": "16",
                                        "style": "3",
                                        "name": "statistics_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.0.0.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "106",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.monitor.statistics%7D"
                                            },
                                            "variables": [
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
                                            "id": "0.2.0.0.1",
                                            "type": "border",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "204",
                                                "height": "99",
                                                "params": "16",
                                                "style": "3",
                                                "name": "statistics_contents",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.0.0.1.0",
                                                    "type": "scrollable_itemlist_vertical",
                                                    "attributes": {
                                                        "x": "5",
                                                        "y": "5",
                                                        "width": "197",
                                                        "height": "89",
                                                        "params": "16",
                                                        "style": "3"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "spacing",
                                                            "value": "2",
                                                            "type": "int"
                                                        }
                                                    ],
                                                    "children": [
                                                        {
                                                            "id": "0.2.0.0.1.0.0",
                                                            "type": "html",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "68",
                                                                "height": "16",
                                                                "params": "1073758352",
                                                                "style": "3",
                                                                "name": "statistics_usage_html",
                                                                "caption": "Wired%20usage%3A"
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
                                                            "id": "0.2.0.0.1.0.1",
                                                            "type": "html",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "18",
                                                                "width": "48",
                                                                "height": "16",
                                                                "params": "1073758352",
                                                                "style": "3",
                                                                "name": "statistics_heavy_html",
                                                                "caption": "Is%20heavy%3A"
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
                                                            "id": "0.2.0.0.1.0.2",
                                                            "type": "html",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "36",
                                                                "width": "60",
                                                                "height": "16",
                                                                "params": "1073758352",
                                                                "style": "3",
                                                                "name": "statistics_floorfurni_html",
                                                                "caption": "Floor%20furni%3A"
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
                                                            "id": "0.2.0.0.1.0.3",
                                                            "type": "html",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "54",
                                                                "width": "57",
                                                                "height": "16",
                                                                "params": "1073758352",
                                                                "style": "3",
                                                                "name": "statistics_wallfurni_html",
                                                                "caption": "Wall%20furni%3A"
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
                                                            "id": "0.2.0.0.1.0.4",
                                                            "type": "html",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "72",
                                                                "width": "114",
                                                                "height": "16",
                                                                "params": "1073758352",
                                                                "style": "3",
                                                                "name": "statistics_perm_vars_furni_html",
                                                                "caption": "Permanent%20furni%20vars%3A"
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
                                                            "id": "0.2.0.0.1.0.5",
                                                            "type": "html",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "90",
                                                                "width": "113",
                                                                "height": "16",
                                                                "params": "1073758352",
                                                                "style": "3",
                                                                "name": "statistics_perm_vars_user_html",
                                                                "caption": "Permanent%20user%20vars%3A"
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
                                                            "id": "0.2.0.0.1.0.6",
                                                            "type": "html",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "108",
                                                                "width": "122",
                                                                "height": "16",
                                                                "params": "1073758352",
                                                                "style": "3",
                                                                "name": "statistics_perm_vars_global_html",
                                                                "caption": "Permanent%20global%20vars%3A"
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
                                },
                                {
                                    "id": "0.2.0.1",
                                    "type": "container",
                                    "attributes": {
                                        "x": "230",
                                        "y": "4",
                                        "width": "256",
                                        "height": "145",
                                        "params": "16",
                                        "style": "3",
                                        "name": "image_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.0.1.0",
                                            "type": "static_bitmap",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "256",
                                                "height": "145",
                                                "params": "16",
                                                "style": "3",
                                                "name": "monitor_image_1",
                                                "visible": "false"
                                            },
                                            "variables": [
                                                {
                                                    "key": "asset_uri",
                                                    "value": "clove-export:WiredMenuViewView:8",
                                                    "type": "String"
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
                                            "id": "0.2.0.1.1",
                                            "type": "static_bitmap",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "256",
                                                "height": "145",
                                                "params": "17",
                                                "style": "3",
                                                "name": "monitor_image_2",
                                                "treshold": "0"
                                            },
                                            "variables": [
                                                {
                                                    "key": "asset_uri",
                                                    "value": "clove-export:WiredMenuViewView:9",
                                                    "type": "String"
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
                                    "id": "0.2.0.2",
                                    "type": "container",
                                    "attributes": {
                                        "x": "14",
                                        "y": "152",
                                        "width": "472",
                                        "height": "218",
                                        "params": "16",
                                        "style": "3",
                                        "name": "log_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.0.2.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "106",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.monitor.log%7D"
                                            },
                                            "variables": [
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
                                            "id": "0.2.0.2.1",
                                            "type": "container",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "472",
                                                "height": "156",
                                                "params": "16",
                                                "style": "3",
                                                "name": "log_table_container"
                                            },
                                            "variables": [],
                                            "children": []
                                        },
                                        {
                                            "id": "0.2.0.2.2",
                                            "type": "button",
                                            "attributes": {
                                                "x": "0",
                                                "y": "185",
                                                "width": "110",
                                                "height": "30",
                                                "params": "131089",
                                                "style": "5",
                                                "name": "clear_log_btn",
                                                "caption": "%24%7Bwiredmenu.monitor.clear_all%7D",
                                                "color": "0x0e33934",
                                                "width_min": "110",
                                                "width_max": "110"
                                            },
                                            "variables": [
                                                {
                                                    "key": "text_style",
                                                    "value": "button_shiny_regular",
                                                    "type": "String"
                                                }
                                            ],
                                            "children": []
                                        },
                                        {
                                            "id": "0.2.0.2.3",
                                            "type": "button",
                                            "attributes": {
                                                "x": "361",
                                                "y": "185",
                                                "width": "110",
                                                "height": "30",
                                                "params": "393233",
                                                "style": "3",
                                                "name": "log_overview_btn",
                                                "caption": "%24%7Bwiredmenu.monitor.log_overview%7D",
                                                "width_min": "110",
                                                "width_max": "110"
                                            },
                                            "variables": [
                                                {
                                                    "key": "text_style",
                                                    "value": "button_shiny_regular",
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
                            "id": "0.2.1",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "500",
                                "height": "382",
                                "params": "12582928",
                                "style": "3",
                                "name": "variable_overview_container",
                                "visible": "false"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.2.1.0",
                                    "type": "container",
                                    "attributes": {
                                        "x": "14",
                                        "y": "18",
                                        "width": "197",
                                        "height": "70",
                                        "params": "16",
                                        "style": "3",
                                        "name": "type_picker_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.1.0.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "165",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.variable_overview.type%7D"
                                            },
                                            "variables": [
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
                                            "id": "0.2.1.0.1",
                                            "type": "border",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "188",
                                                "height": "47",
                                                "params": "16",
                                                "style": "3",
                                                "name": "type_options",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.1.0.1.0",
                                                    "type": "itemlist_horizontal",
                                                    "attributes": {
                                                        "x": "5",
                                                        "y": "5",
                                                        "width": "183",
                                                        "height": "37",
                                                        "params": "16",
                                                        "style": "3",
                                                        "name": "buttons"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "spacing",
                                                            "value": "10",
                                                            "type": "int"
                                                        }
                                                    ],
                                                    "children": [
                                                        {
                                                            "id": "0.2.1.0.1.0.0",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "37",
                                                                "height": "37",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "furni_option"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.1.0.1.0.0.0",
                                                                    "type": "button",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "36",
                                                                        "params": "131089",
                                                                        "style": "3",
                                                                        "name": "type_furni_button"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "tool_tip_caption",
                                                                            "value": "${wiredfurni.params.sourcetype.furni}",
                                                                            "type": "String"
                                                                        },
                                                                        {
                                                                            "key": "text_style",
                                                                            "value": "button_shiny_regular",
                                                                            "type": "String"
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.1.0.1.0.0.1",
                                                                    "type": "static_bitmap",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "37",
                                                                        "params": "16",
                                                                        "style": "3"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "asset_uri",
                                                                            "value": "clove-export:WiredMenuViewView:10",
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
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.1.0.1.0.1",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "47",
                                                                "y": "0",
                                                                "width": "37",
                                                                "height": "37",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "user_option"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.1.0.1.0.1.0",
                                                                    "type": "button",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "36",
                                                                        "params": "131089",
                                                                        "style": "3",
                                                                        "name": "type_user_button",
                                                                        "id": "1"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "tool_tip_caption",
                                                                            "value": "${wiredfurni.params.sourcetype.users}",
                                                                            "type": "String"
                                                                        },
                                                                        {
                                                                            "key": "text_style",
                                                                            "value": "button_shiny_regular",
                                                                            "type": "String"
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.1.0.1.0.1.1",
                                                                    "type": "static_bitmap",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "37",
                                                                        "params": "16",
                                                                        "style": "3"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "asset_uri",
                                                                            "value": "clove-export:WiredMenuViewView:11",
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
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.1.0.1.0.2",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "94",
                                                                "y": "0",
                                                                "width": "37",
                                                                "height": "37",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "global_option"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.1.0.1.0.2.0",
                                                                    "type": "button",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "36",
                                                                        "params": "131089",
                                                                        "style": "3",
                                                                        "name": "type_global_button",
                                                                        "id": "-10"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "tool_tip_caption",
                                                                            "value": "${wiredfurni.params.sourcetype.global}",
                                                                            "type": "String"
                                                                        },
                                                                        {
                                                                            "key": "text_style",
                                                                            "value": "button_shiny_regular",
                                                                            "type": "String"
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.1.0.1.0.2.1",
                                                                    "type": "static_bitmap",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "37",
                                                                        "params": "16",
                                                                        "style": "3"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "asset_uri",
                                                                            "value": "clove-export:WiredMenuViewView:12",
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
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.1.0.1.0.3",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "141",
                                                                "y": "0",
                                                                "width": "37",
                                                                "height": "37",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "context_option"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.1.0.1.0.3.0",
                                                                    "type": "button",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "36",
                                                                        "params": "131089",
                                                                        "style": "3",
                                                                        "name": "type_context_button",
                                                                        "id": "-20"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "tool_tip_caption",
                                                                            "value": "${wiredfurni.params.sourcetype.context}",
                                                                            "type": "String"
                                                                        },
                                                                        {
                                                                            "key": "text_style",
                                                                            "value": "button_shiny_regular",
                                                                            "type": "String"
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.1.0.1.0.3.1",
                                                                    "type": "static_bitmap",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "37",
                                                                        "params": "16",
                                                                        "style": "3"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "asset_uri",
                                                                            "value": "clove-export:WiredMenuViewView:13",
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
                                    "id": "0.2.1.1",
                                    "type": "container",
                                    "attributes": {
                                        "x": "14",
                                        "y": "94",
                                        "width": "188",
                                        "height": "239",
                                        "params": "144",
                                        "style": "3",
                                        "name": "variable_picker_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.1.1.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "165",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.variable_overview.picker%7D"
                                            },
                                            "variables": [
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
                                            "id": "0.2.1.1.1",
                                            "type": "container",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "188",
                                                "height": "219",
                                                "params": "2192",
                                                "style": "3",
                                                "name": "variable_list_container"
                                            },
                                            "variables": [],
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "id": "0.2.1.2",
                                    "type": "itemlist_horizontal",
                                    "attributes": {
                                        "x": "14",
                                        "y": "342",
                                        "width": "188",
                                        "height": "25",
                                        "params": "16",
                                        "style": "3",
                                        "name": "button_row",
                                        "width_min": "188",
                                        "width_max": "188"
                                    },
                                    "variables": [
                                        {
                                            "key": "spacing",
                                            "value": "10",
                                            "type": "int"
                                        }
                                    ],
                                    "children": [
                                        {
                                            "id": "0.2.1.2.0",
                                            "type": "button",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "89",
                                                "height": "25",
                                                "params": "131089",
                                                "style": "3",
                                                "name": "highlight_holders_button",
                                                "caption": "%24%7Bwiredmenu.variable_overview.highlight_holders%7D",
                                                "width_min": "89",
                                                "width_max": "89"
                                            },
                                            "variables": [
                                                {
                                                    "key": "tool_tip_caption",
                                                    "value": "${wiredmenu.variable_overview.highlight_holders.tooltip}",
                                                    "type": "String"
                                                },
                                                {
                                                    "key": "text_style",
                                                    "value": "button_shiny_regular",
                                                    "type": "String"
                                                }
                                            ],
                                            "children": []
                                        },
                                        {
                                            "id": "0.2.1.2.1",
                                            "type": "button",
                                            "attributes": {
                                                "x": "99",
                                                "y": "0",
                                                "width": "89",
                                                "height": "25",
                                                "params": "131089",
                                                "style": "3",
                                                "name": "manage_button",
                                                "caption": "%24%7Bwiredmenu.variable_overview.manage%7D",
                                                "width_min": "89",
                                                "width_max": "89"
                                            },
                                            "variables": [
                                                {
                                                    "key": "tool_tip_caption",
                                                    "value": "${wiredmenu.variable_overview.manage.tooltip}",
                                                    "type": "String"
                                                },
                                                {
                                                    "key": "text_style",
                                                    "value": "button_shiny_regular",
                                                    "type": "String"
                                                }
                                            ],
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "id": "0.2.1.3",
                                    "type": "container",
                                    "attributes": {
                                        "x": "230",
                                        "y": "17",
                                        "width": "256",
                                        "height": "208",
                                        "params": "16",
                                        "style": "3",
                                        "name": "variable_properties_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.1.3.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "188",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.variable_overview.properties%7D"
                                            },
                                            "variables": [
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
                                            "id": "0.2.1.3.1",
                                            "type": "container",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "256",
                                                "height": "188",
                                                "params": "2192",
                                                "style": "3",
                                                "name": "variable_properties_table_container"
                                            },
                                            "variables": [],
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "id": "0.2.1.4",
                                    "type": "container",
                                    "attributes": {
                                        "x": "230",
                                        "y": "233",
                                        "width": "256",
                                        "height": "135",
                                        "params": "16",
                                        "style": "3",
                                        "name": "variable_texts_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.1.4.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "188",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.variable_overview.text_values%7D"
                                            },
                                            "variables": [
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
                                            "id": "0.2.1.4.1",
                                            "type": "container",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "256",
                                                "height": "115",
                                                "params": "2192",
                                                "style": "3",
                                                "name": "variable_texts_table_container"
                                            },
                                            "variables": [],
                                            "children": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "0.2.2",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "500",
                                "height": "382",
                                "params": "12582929",
                                "style": "3",
                                "name": "inspection_container",
                                "visible": "false",
                                "treshold": "0"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.2.2.0",
                                    "type": "container",
                                    "attributes": {
                                        "x": "14",
                                        "y": "18",
                                        "width": "150",
                                        "height": "70",
                                        "params": "16",
                                        "style": "3",
                                        "name": "type_picker_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.2.0.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "165",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.inspection.type%7D"
                                            },
                                            "variables": [
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
                                            "id": "0.2.2.0.1",
                                            "type": "border",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "141",
                                                "height": "47",
                                                "params": "16",
                                                "style": "3",
                                                "name": "type_options",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.2.0.1.0",
                                                    "type": "itemlist_horizontal",
                                                    "attributes": {
                                                        "x": "5",
                                                        "y": "5",
                                                        "width": "131",
                                                        "height": "37",
                                                        "params": "16",
                                                        "style": "3",
                                                        "name": "buttons"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "spacing",
                                                            "value": "10",
                                                            "type": "int"
                                                        }
                                                    ],
                                                    "children": [
                                                        {
                                                            "id": "0.2.2.0.1.0.0",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "37",
                                                                "height": "37",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "furni_option"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.2.0.1.0.0.0",
                                                                    "type": "button",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "36",
                                                                        "params": "131089",
                                                                        "style": "3",
                                                                        "name": "type_furni_button"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "tool_tip_caption",
                                                                            "value": "${wiredfurni.params.sourcetype.furni}",
                                                                            "type": "String"
                                                                        },
                                                                        {
                                                                            "key": "text_style",
                                                                            "value": "button_shiny_regular",
                                                                            "type": "String"
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.2.0.1.0.0.1",
                                                                    "type": "static_bitmap",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "37",
                                                                        "params": "16",
                                                                        "style": "3"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "asset_uri",
                                                                            "value": "clove-export:WiredMenuViewView:14",
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
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.2.0.1.0.1",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "47",
                                                                "y": "0",
                                                                "width": "37",
                                                                "height": "37",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "user_option"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.2.0.1.0.1.0",
                                                                    "type": "button",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "36",
                                                                        "params": "131089",
                                                                        "style": "3",
                                                                        "name": "type_user_button",
                                                                        "id": "1"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "tool_tip_caption",
                                                                            "value": "${wiredfurni.params.sourcetype.users}",
                                                                            "type": "String"
                                                                        },
                                                                        {
                                                                            "key": "text_style",
                                                                            "value": "button_shiny_regular",
                                                                            "type": "String"
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.2.0.1.0.1.1",
                                                                    "type": "static_bitmap",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "37",
                                                                        "params": "16",
                                                                        "style": "3"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "asset_uri",
                                                                            "value": "clove-export:WiredMenuViewView:15",
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
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.2.0.1.0.2",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "94",
                                                                "y": "0",
                                                                "width": "37",
                                                                "height": "37",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "global_option"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.2.0.1.0.2.0",
                                                                    "type": "button",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "36",
                                                                        "params": "131089",
                                                                        "style": "3",
                                                                        "name": "type_global_button",
                                                                        "id": "-10"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "tool_tip_caption",
                                                                            "value": "${wiredfurni.params.sourcetype.global}",
                                                                            "type": "String"
                                                                        },
                                                                        {
                                                                            "key": "text_style",
                                                                            "value": "button_shiny_regular",
                                                                            "type": "String"
                                                                        }
                                                                    ],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.2.0.1.0.2.1",
                                                                    "type": "static_bitmap",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "0",
                                                                        "width": "37",
                                                                        "height": "37",
                                                                        "params": "16",
                                                                        "style": "3"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "asset_uri",
                                                                            "value": "clove-export:WiredMenuViewView:16",
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
                                    "id": "0.2.2.1",
                                    "type": "container",
                                    "attributes": {
                                        "x": "183",
                                        "y": "17",
                                        "width": "303",
                                        "height": "351",
                                        "params": "16",
                                        "style": "3",
                                        "name": "variable_values_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.2.1.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "188",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.inspection.variables%7D"
                                            },
                                            "variables": [
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
                                            "id": "0.2.2.1.1",
                                            "type": "container",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "303",
                                                "height": "297",
                                                "params": "2192",
                                                "style": "3",
                                                "name": "variable_values_table_container"
                                            },
                                            "variables": [],
                                            "children": []
                                        },
                                        {
                                            "id": "0.2.2.1.2",
                                            "type": "itemlist_horizontal",
                                            "attributes": {
                                                "x": "0",
                                                "y": "326",
                                                "width": "303",
                                                "height": "30",
                                                "params": "1168",
                                                "style": "3"
                                            },
                                            "variables": [
                                                {
                                                    "key": "spacing",
                                                    "value": "13",
                                                    "type": "int"
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "id": "0.2.2.1.2.0",
                                                    "type": "button",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "0",
                                                        "width": "145",
                                                        "height": "25",
                                                        "params": "131089",
                                                        "style": "3",
                                                        "name": "delete_var_btn",
                                                        "caption": "%24%7Bwiredmenu.inspection.delete%7D",
                                                        "width_min": "145",
                                                        "width_max": "145"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "text_style",
                                                            "value": "button_shiny_regular",
                                                            "type": "String"
                                                        }
                                                    ],
                                                    "children": []
                                                },
                                                {
                                                    "id": "0.2.2.1.2.1",
                                                    "type": "button",
                                                    "attributes": {
                                                        "x": "158",
                                                        "y": "0",
                                                        "width": "145",
                                                        "height": "25",
                                                        "params": "131089",
                                                        "style": "3",
                                                        "name": "add_var_btn",
                                                        "caption": "%24%7Bwiredmenu.inspection.add%7D",
                                                        "width_min": "145",
                                                        "width_max": "145"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "text_style",
                                                            "value": "button_shiny_regular",
                                                            "type": "String"
                                                        }
                                                    ],
                                                    "children": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "0.2.2.1.3",
                                            "type": "bubble",
                                            "attributes": {
                                                "x": "122",
                                                "y": "181",
                                                "width": "186",
                                                "height": "145",
                                                "params": "1",
                                                "style": "7",
                                                "name": "create_var_bubble",
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
                                                    "key": "pointer_offset",
                                                    "value": "5",
                                                    "type": "int"
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "id": "0.2.2.1.3.0",
                                                    "type": "container",
                                                    "attributes": {
                                                        "x": "6",
                                                        "y": "6",
                                                        "width": "158",
                                                        "height": "42",
                                                        "params": "144",
                                                        "style": "3",
                                                        "name": "variable_setting"
                                                    },
                                                    "variables": [],
                                                    "children": [
                                                        {
                                                            "id": "0.2.2.1.3.0.0",
                                                            "type": "text",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "55",
                                                                "height": "17",
                                                                "params": "16",
                                                                "style": "3",
                                                                "caption": "%24%7Bwiredmenu.inspection.select_variable%7D"
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
                                                            "id": "0.2.2.1.3.0.1",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "20",
                                                                "width": "158",
                                                                "height": "22",
                                                                "params": "144",
                                                                "style": "3",
                                                                "name": "var_picker_container"
                                                            },
                                                            "variables": [],
                                                            "children": []
                                                        }
                                                    ]
                                                },
                                                {
                                                    "id": "0.2.2.1.3.1",
                                                    "type": "container",
                                                    "attributes": {
                                                        "x": "6",
                                                        "y": "52",
                                                        "width": "158",
                                                        "height": "42",
                                                        "params": "144",
                                                        "style": "3",
                                                        "name": "value_setting"
                                                    },
                                                    "variables": [],
                                                    "children": [
                                                        {
                                                            "id": "0.2.2.1.3.1.0",
                                                            "type": "text",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "40",
                                                                "height": "17",
                                                                "params": "16",
                                                                "style": "3",
                                                                "caption": "%24%7Bwiredmenu.inspection.select_value%7D"
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
                                                            "id": "0.2.2.1.3.1.1",
                                                            "type": "border",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "20",
                                                                "width": "80",
                                                                "height": "22",
                                                                "params": "16",
                                                                "style": "4",
                                                                "name": "value_input_border"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.2.1.3.1.1.0",
                                                                    "type": "input",
                                                                    "attributes": {
                                                                        "x": "5",
                                                                        "y": "3",
                                                                        "width": "71",
                                                                        "height": "17",
                                                                        "params": "2177",
                                                                        "style": "3",
                                                                        "name": "value_input",
                                                                        "caption": "0"
                                                                    },
                                                                    "variables": [
                                                                        {
                                                                            "key": "restrict",
                                                                            "value": "0-9\\-",
                                                                            "type": "String"
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
                                                    "id": "0.2.2.1.3.2",
                                                    "type": "button",
                                                    "attributes": {
                                                        "x": "6",
                                                        "y": "100",
                                                        "width": "158",
                                                        "height": "25",
                                                        "params": "132241",
                                                        "style": "3",
                                                        "name": "create_var_btn",
                                                        "caption": "%24%7Bwiredmenu.inspection.create%7D",
                                                        "width_min": "158",
                                                        "width_max": "158"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "text_style",
                                                            "value": "button_shiny_regular",
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
                                    "id": "0.2.2.2",
                                    "type": "container",
                                    "attributes": {
                                        "x": "14",
                                        "y": "94",
                                        "width": "150",
                                        "height": "274",
                                        "params": "16",
                                        "style": "3",
                                        "name": "preview_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.2.2.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "165",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.inspection.preview%7D"
                                            },
                                            "variables": [
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
                                            "id": "0.2.2.2.1",
                                            "type": "border",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "141",
                                                "height": "225",
                                                "params": "144",
                                                "style": "3",
                                                "name": "preview_border",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.2.2.1.0",
                                                    "type": "text",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "104",
                                                        "width": "141",
                                                        "height": "17",
                                                        "params": "144",
                                                        "style": "3",
                                                        "name": "preview_instruction_furni",
                                                        "caption": "%24%7Bwiredmenu.inspection.preview_furni_instruction%7D",
                                                        "blend": "0.6",
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
                                                },
                                                {
                                                    "id": "0.2.2.2.1.1",
                                                    "type": "text",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "104",
                                                        "width": "141",
                                                        "height": "17",
                                                        "params": "144",
                                                        "style": "3",
                                                        "name": "preview_instruction_user",
                                                        "caption": "%24%7Bwiredmenu.inspection.preview_user_instruction%7D",
                                                        "blend": "0.6",
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
                                                },
                                                {
                                                    "id": "0.2.2.2.1.2",
                                                    "type": "widget",
                                                    "attributes": {
                                                        "x": "53",
                                                        "y": "70",
                                                        "width": "34",
                                                        "height": "84",
                                                        "params": "3932368",
                                                        "style": "3",
                                                        "name": "preview_avatar",
                                                        "visible": "false"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "widget_type",
                                                            "value": "avatar_image",
                                                            "type": "String"
                                                        },
                                                        {
                                                            "key": "avatar_image:cropped",
                                                            "value": "true",
                                                            "type": "Boolean"
                                                        }
                                                    ],
                                                    "children": []
                                                },
                                                {
                                                    "id": "0.2.2.2.1.3",
                                                    "type": "widget",
                                                    "attributes": {
                                                        "x": "46",
                                                        "y": "93",
                                                        "width": "49",
                                                        "height": "38",
                                                        "params": "1077674128",
                                                        "style": "3",
                                                        "name": "preview_pet",
                                                        "visible": "false"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "widget_type",
                                                            "value": "pet_image",
                                                            "type": "String"
                                                        }
                                                    ],
                                                    "children": []
                                                },
                                                {
                                                    "id": "0.2.2.2.1.4",
                                                    "type": "bitmap",
                                                    "attributes": {
                                                        "x": "45",
                                                        "y": "87",
                                                        "width": "50",
                                                        "height": "50",
                                                        "params": "3932368",
                                                        "style": "3",
                                                        "name": "preview_image_bitmap",
                                                        "visible": "false"
                                                    },
                                                    "variables": [
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
                                                    "id": "0.2.2.2.1.5",
                                                    "type": "static_bitmap",
                                                    "attributes": {
                                                        "x": "10",
                                                        "y": "64",
                                                        "width": "120",
                                                        "height": "97",
                                                        "params": "208",
                                                        "style": "3",
                                                        "name": "global_placeholder",
                                                        "visible": "false"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "asset_uri",
                                                            "value": "clove-export:WiredMenuViewView:17",
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
                                                    "id": "0.2.2.2.1.6",
                                                    "type": "container_button",
                                                    "attributes": {
                                                        "x": "110",
                                                        "y": "6",
                                                        "width": "25",
                                                        "height": "26",
                                                        "params": "81",
                                                        "style": "7",
                                                        "name": "highlight_wired_btn"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "tool_tip_caption",
                                                            "value": "${wiredmenu.inspection.highlight_wireds}",
                                                            "type": "String"
                                                        },
                                                        {
                                                            "key": "tool_tip_delay",
                                                            "value": "250",
                                                            "type": "uint"
                                                        }
                                                    ],
                                                    "children": [
                                                        {
                                                            "id": "0.2.2.2.1.6.0",
                                                            "type": "static_bitmap",
                                                            "attributes": {
                                                                "x": "4",
                                                                "y": "6",
                                                                "width": "16",
                                                                "height": "14",
                                                                "params": "16",
                                                                "style": "3"
                                                            },
                                                            "variables": [
                                                                {
                                                                    "key": "asset_uri",
                                                                    "value": "${image.library.url}catalogue/icon_80.png",
                                                                    "type": "String"
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
                                            "id": "0.2.2.2.2",
                                            "type": "container",
                                            "attributes": {
                                                "x": "0",
                                                "y": "254",
                                                "width": "197",
                                                "height": "18",
                                                "params": "16",
                                                "style": "3",
                                                "name": "pin_option_container"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.2.2.2.0",
                                                    "type": "checkbox",
                                                    "attributes": {
                                                        "x": "0",
                                                        "y": "1",
                                                        "width": "17",
                                                        "height": "17",
                                                        "params": "17",
                                                        "style": "3",
                                                        "name": "pin_checkbox"
                                                    },
                                                    "variables": [],
                                                    "children": []
                                                },
                                                {
                                                    "id": "0.2.2.2.2.1",
                                                    "type": "text",
                                                    "attributes": {
                                                        "x": "20",
                                                        "y": "0",
                                                        "width": "82",
                                                        "height": "17",
                                                        "params": "16",
                                                        "style": "3",
                                                        "caption": "%24%7Bwiredmenu.inspection.pin%7D",
                                                        "height_min": "17"
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
                        },
                        {
                            "id": "0.2.3",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "500",
                                "height": "382",
                                "params": "12582928",
                                "style": "3",
                                "name": "chests_container",
                                "visible": "false"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.2.3.0",
                                    "type": "container",
                                    "attributes": {
                                        "x": "14",
                                        "y": "18",
                                        "width": "472",
                                        "height": "110",
                                        "params": "16",
                                        "style": "3",
                                        "name": "chest_controls_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.3.0.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "84",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.chests.chest_control%7D"
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
                                            "id": "0.2.3.0.1",
                                            "type": "border",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "472",
                                                "height": "90",
                                                "params": "2192",
                                                "style": "3",
                                                "name": "preferences_border",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.3.0.1.0",
                                                    "type": "itemlist_horizontal",
                                                    "attributes": {
                                                        "x": "10",
                                                        "y": "10",
                                                        "width": "452",
                                                        "height": "30",
                                                        "params": "16",
                                                        "style": "3"
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
                                                            "id": "0.2.3.0.1.0.0",
                                                            "type": "button",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "221",
                                                                "height": "30",
                                                                "params": "131089",
                                                                "style": "3",
                                                                "name": "lock_own_button",
                                                                "caption": "%24%7Bwiredmenu.chests.chest_control.lock_own%7D",
                                                                "width_min": "221",
                                                                "width_max": "221"
                                                            },
                                                            "variables": [
                                                                {
                                                                    "key": "text_style",
                                                                    "value": "button_shiny_regular",
                                                                    "type": "String"
                                                                }
                                                            ],
                                                            "children": []
                                                        },
                                                        {
                                                            "id": "0.2.3.0.1.0.1",
                                                            "type": "button",
                                                            "attributes": {
                                                                "x": "231",
                                                                "y": "0",
                                                                "width": "221",
                                                                "height": "30",
                                                                "params": "131089",
                                                                "style": "3",
                                                                "name": "unlock_own_button",
                                                                "caption": "%24%7Bwiredmenu.chests.chest_control.unlock_own%7D",
                                                                "width_min": "221",
                                                                "width_max": "221"
                                                            },
                                                            "variables": [
                                                                {
                                                                    "key": "text_style",
                                                                    "value": "button_shiny_regular",
                                                                    "type": "String"
                                                                }
                                                            ],
                                                            "children": []
                                                        }
                                                    ]
                                                },
                                                {
                                                    "id": "0.2.3.0.1.1",
                                                    "type": "itemlist_horizontal",
                                                    "attributes": {
                                                        "x": "10",
                                                        "y": "50",
                                                        "width": "221",
                                                        "height": "30",
                                                        "params": "16",
                                                        "style": "3"
                                                    },
                                                    "variables": [
                                                        {
                                                            "key": "resize_on_item_update",
                                                            "value": "true",
                                                            "type": "Boolean"
                                                        }
                                                    ],
                                                    "children": [
                                                        {
                                                            "id": "0.2.3.0.1.1.0",
                                                            "type": "button",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "221",
                                                                "height": "30",
                                                                "params": "131089",
                                                                "style": "3",
                                                                "name": "lock_all_button",
                                                                "caption": "%24%7Bwiredmenu.chests.chest_control.lock_all%7D",
                                                                "width_min": "221",
                                                                "width_max": "221"
                                                            },
                                                            "variables": [
                                                                {
                                                                    "key": "text_style",
                                                                    "value": "button_shiny_regular",
                                                                    "type": "String"
                                                                }
                                                            ],
                                                            "children": []
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "0.2.3.1",
                                    "type": "container",
                                    "attributes": {
                                        "x": "14",
                                        "y": "139",
                                        "width": "472",
                                        "height": "228",
                                        "params": "16",
                                        "style": "3",
                                        "name": "logs_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.3.1.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "136",
                                                "height": "17",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.chests.room_logs%7D"
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
                                            "id": "0.2.3.1.1",
                                            "type": "text",
                                            "attributes": {
                                                "x": "272",
                                                "y": "0",
                                                "width": "197",
                                                "height": "17",
                                                "params": "262160",
                                                "style": "3",
                                                "name": "title_extra",
                                                "caption": "%24%7Bwiredmenu.chests.room_logs.extra%7D",
                                                "blend": "0.5"
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
                                            "id": "0.2.3.1.2",
                                            "type": "container",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "472",
                                                "height": "168",
                                                "params": "2192",
                                                "style": "3",
                                                "name": "logs_table_container"
                                            },
                                            "variables": [],
                                            "children": []
                                        },
                                        {
                                            "id": "0.2.3.1.3",
                                            "type": "button",
                                            "attributes": {
                                                "x": "0",
                                                "y": "197",
                                                "width": "114",
                                                "height": "30",
                                                "params": "131089",
                                                "style": "3",
                                                "name": "view_in_detail_button",
                                                "caption": "%24%7Bwiredmenu.chests.room_logs.view_detail%7D"
                                            },
                                            "variables": [
                                                {
                                                    "key": "text_style",
                                                    "value": "button_shiny_regular",
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
                            "id": "0.2.4",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "500",
                                "height": "382",
                                "params": "12582928",
                                "style": "3",
                                "name": "settings_container",
                                "visible": "false"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.2.4.0",
                                    "type": "container",
                                    "attributes": {
                                        "x": "14",
                                        "y": "18",
                                        "width": "472",
                                        "height": "220",
                                        "params": "16",
                                        "style": "3",
                                        "name": "room_settings_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.4.0.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "208",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.settings.room_settings%29"
                                            },
                                            "variables": [
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
                                            "id": "0.2.4.0.1",
                                            "type": "border",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "227",
                                                "height": "111",
                                                "params": "144",
                                                "style": "3",
                                                "name": "room_settings_border",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.4.0.1.0",
                                                    "type": "container",
                                                    "attributes": {
                                                        "x": "10",
                                                        "y": "8",
                                                        "width": "212",
                                                        "height": "102",
                                                        "params": "16",
                                                        "style": "3",
                                                        "name": "modify_settings_container"
                                                    },
                                                    "variables": [],
                                                    "children": [
                                                        {
                                                            "id": "0.2.4.0.1.0.0",
                                                            "type": "text",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "205",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "caption": "%24%7Bwiredmenu.settings.room_settings.modify_rights%7D"
                                                            },
                                                            "variables": [
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
                                                            "id": "0.2.4.0.1.0.1",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "20",
                                                                "width": "214",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_box"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.0.1.0.1.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "20",
                                                                        "height": "20",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "modify_1_checkbox",
                                                                        "id": "1"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.0.1.0.1.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "210",
                                                                        "height": "19",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.permission_level.1%7D"
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
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.4.0.1.0.2",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "39",
                                                                "width": "214",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_box"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.0.1.0.2.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "20",
                                                                        "height": "20",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "modify_2_checkbox",
                                                                        "id": "2"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.0.1.0.2.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "210",
                                                                        "height": "19",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.permission_level.2%7D"
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
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.4.0.1.0.3",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "58",
                                                                "width": "214",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_box"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.0.1.0.3.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "20",
                                                                        "height": "20",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "modify_3_checkbox",
                                                                        "id": "3"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.0.1.0.3.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "210",
                                                                        "height": "19",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.permission_level.3%7D"
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
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "id": "0.2.4.0.2",
                                            "type": "border",
                                            "attributes": {
                                                "x": "245",
                                                "y": "20",
                                                "width": "227",
                                                "height": "111",
                                                "params": "144",
                                                "style": "3",
                                                "name": "room_settings_border",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.4.0.2.0",
                                                    "type": "container",
                                                    "attributes": {
                                                        "x": "10",
                                                        "y": "8",
                                                        "width": "233",
                                                        "height": "102",
                                                        "params": "16",
                                                        "style": "3",
                                                        "name": "read_settings_container"
                                                    },
                                                    "variables": [],
                                                    "children": [
                                                        {
                                                            "id": "0.2.4.0.2.0.0",
                                                            "type": "text",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "195",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "caption": "%24%7Bwiredmenu.settings.room_settings.read_rights%7D"
                                                            },
                                                            "variables": [
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
                                                            "id": "0.2.4.0.2.0.1",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "20",
                                                                "width": "214",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_box"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.0.2.0.1.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "20",
                                                                        "height": "20",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "read_0_checkbox"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.0.2.0.1.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "210",
                                                                        "height": "19",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.permission_level.0%7D"
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
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.4.0.2.0.2",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "39",
                                                                "width": "214",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_box"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.0.2.0.2.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "20",
                                                                        "height": "20",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "read_1_checkbox",
                                                                        "id": "1"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.0.2.0.2.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "210",
                                                                        "height": "19",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.permission_level.1%7D"
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
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.4.0.2.0.3",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "58",
                                                                "width": "214",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_box"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.0.2.0.3.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "20",
                                                                        "height": "20",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "read_2_checkbox",
                                                                        "id": "2"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.0.2.0.3.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "210",
                                                                        "height": "19",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.permission_level.2%7D"
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
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.4.0.2.0.4",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "77",
                                                                "width": "214",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_box"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.0.2.0.4.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "20",
                                                                        "height": "20",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "read_3_checkbox",
                                                                        "id": "3"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.0.2.0.4.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "210",
                                                                        "height": "19",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.permission_level.3%7D"
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
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "id": "0.2.4.0.3",
                                            "type": "border",
                                            "attributes": {
                                                "x": "0",
                                                "y": "143",
                                                "width": "227",
                                                "height": "64",
                                                "params": "144",
                                                "style": "3",
                                                "name": "room_settings_border",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.4.0.3.0",
                                                    "type": "container",
                                                    "attributes": {
                                                        "x": "10",
                                                        "y": "8",
                                                        "width": "212",
                                                        "height": "50",
                                                        "params": "16",
                                                        "style": "3",
                                                        "name": "timezone_container"
                                                    },
                                                    "variables": [],
                                                    "children": [
                                                        {
                                                            "id": "0.2.4.0.3.0.0",
                                                            "type": "text",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "205",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "caption": "%24%7Bwiredmenu.settings.room_settings.timezone%7D"
                                                            },
                                                            "variables": [
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
                                                            "id": "0.2.4.0.3.0.1",
                                                            "type": "dropmenu",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "21",
                                                                "width": "206",
                                                                "height": "25",
                                                                "params": "17",
                                                                "style": "3",
                                                                "name": "timezone_picker"
                                                            },
                                                            "variables": [],
                                                            "children": []
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "id": "0.2.4.0.4",
                                            "type": "border",
                                            "attributes": {
                                                "x": "245",
                                                "y": "143",
                                                "width": "227",
                                                "height": "64",
                                                "params": "144",
                                                "style": "3",
                                                "name": "room_settings_border",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.4.0.4.0",
                                                    "type": "container",
                                                    "attributes": {
                                                        "x": "10",
                                                        "y": "8",
                                                        "width": "212",
                                                        "height": "50",
                                                        "params": "16",
                                                        "style": "3",
                                                        "name": "timezone_container"
                                                    },
                                                    "variables": [],
                                                    "children": [
                                                        {
                                                            "id": "0.2.4.0.4.0.0",
                                                            "type": "text",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "205",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "caption": "%24%7Bwiredmenu.settings.room_settings.room_state%7D"
                                                            },
                                                            "variables": [
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
                                                            "id": "0.2.4.0.4.0.1",
                                                            "type": "button",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "21",
                                                                "width": "98",
                                                                "height": "28",
                                                                "params": "131089",
                                                                "style": "3",
                                                                "name": "reload_room_btn",
                                                                "caption": "%24%7Bwiredmenu.settings.room_state.reload%7D",
                                                                "width_min": "98",
                                                                "width_max": "98"
                                                            },
                                                            "variables": [
                                                                {
                                                                    "key": "text_style",
                                                                    "value": "button_shiny_regular",
                                                                    "type": "String"
                                                                }
                                                            ],
                                                            "children": []
                                                        },
                                                        {
                                                            "id": "0.2.4.0.4.0.2",
                                                            "type": "button",
                                                            "attributes": {
                                                                "x": "109",
                                                                "y": "21",
                                                                "width": "98",
                                                                "height": "28",
                                                                "params": "131089",
                                                                "style": "5",
                                                                "name": "roll_back_btn",
                                                                "caption": "%24%7Bwiredmenu.settings.room_state.roll_back%7D",
                                                                "color": "0x0e33934",
                                                                "width_min": "98",
                                                                "width_max": "98"
                                                            },
                                                            "variables": [
                                                                {
                                                                    "key": "text_style",
                                                                    "value": "button_shiny_regular",
                                                                    "type": "String"
                                                                }
                                                            ],
                                                            "children": []
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "0.2.4.1",
                                    "type": "container",
                                    "attributes": {
                                        "x": "14",
                                        "y": "237",
                                        "width": "472",
                                        "height": "131",
                                        "params": "16",
                                        "style": "3",
                                        "name": "preferences_container"
                                    },
                                    "variables": [],
                                    "children": [
                                        {
                                            "id": "0.2.4.1.0",
                                            "type": "text",
                                            "attributes": {
                                                "x": "0",
                                                "y": "0",
                                                "width": "208",
                                                "height": "19",
                                                "params": "16",
                                                "style": "3",
                                                "name": "title",
                                                "caption": "%24%7Bwiredmenu.settings.preferences%7D"
                                            },
                                            "variables": [
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
                                            "id": "0.2.4.1.1",
                                            "type": "border",
                                            "attributes": {
                                                "x": "0",
                                                "y": "20",
                                                "width": "227",
                                                "height": "111",
                                                "params": "2192",
                                                "style": "3",
                                                "name": "preferences_border",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.4.1.1.0",
                                                    "type": "container",
                                                    "attributes": {
                                                        "x": "10",
                                                        "y": "8",
                                                        "width": "213",
                                                        "height": "101",
                                                        "params": "2192",
                                                        "style": "3",
                                                        "name": "preferences_container"
                                                    },
                                                    "variables": [],
                                                    "children": [
                                                        {
                                                            "id": "0.2.4.1.1.0.0",
                                                            "type": "text",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "205",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "caption": "%24%7Bwiredmenu.settings.preferences.general%7D"
                                                            },
                                                            "variables": [
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
                                                            "id": "0.2.4.1.1.0.1",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "20",
                                                                "width": "450",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_container"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.1.1.0.1.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "19",
                                                                        "height": "18",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "preference_toolbar_checkbox"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.1.1.0.1.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "390",
                                                                        "height": "17",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.preferences.toolbar%7D"
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
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.4.1.1.0.2",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "39",
                                                                "width": "450",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_container"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.1.1.0.2.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "19",
                                                                        "height": "18",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "preference_inspect_button_checkbox"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.1.1.0.2.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "390",
                                                                        "height": "17",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.preferences.inspect_button%7D"
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
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.4.1.1.0.3",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "58",
                                                                "width": "450",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_container"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.1.1.0.3.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "19",
                                                                        "height": "18",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "preference_playtest_checkbox"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.1.1.0.3.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "430",
                                                                        "height": "17",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.preferences.playtest%7D"
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
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "id": "0.2.4.1.1.0.4",
                                                            "type": "container",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "77",
                                                                "width": "450",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "name": "option_container"
                                                            },
                                                            "variables": [],
                                                            "children": [
                                                                {
                                                                    "id": "0.2.4.1.1.0.4.0",
                                                                    "type": "checkbox",
                                                                    "attributes": {
                                                                        "x": "0",
                                                                        "y": "1",
                                                                        "width": "19",
                                                                        "height": "18",
                                                                        "params": "17",
                                                                        "style": "3",
                                                                        "name": "preference_all_notifications_checkbox"
                                                                    },
                                                                    "variables": [],
                                                                    "children": []
                                                                },
                                                                {
                                                                    "id": "0.2.4.1.1.0.4.1",
                                                                    "type": "text",
                                                                    "attributes": {
                                                                        "x": "20",
                                                                        "y": "0",
                                                                        "width": "430",
                                                                        "height": "17",
                                                                        "params": "16",
                                                                        "style": "3",
                                                                        "caption": "%24%7Bwiredmenu.settings.preferences.show_all_errors%7D"
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
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "id": "0.2.4.1.2",
                                            "type": "border",
                                            "attributes": {
                                                "x": "245",
                                                "y": "20",
                                                "width": "227",
                                                "height": "64",
                                                "params": "144",
                                                "style": "3",
                                                "name": "wired_style_border",
                                                "color": "0x0dadada"
                                            },
                                            "variables": [],
                                            "children": [
                                                {
                                                    "id": "0.2.4.1.2.0",
                                                    "type": "container",
                                                    "attributes": {
                                                        "x": "10",
                                                        "y": "8",
                                                        "width": "212",
                                                        "height": "50",
                                                        "params": "16",
                                                        "style": "3",
                                                        "name": "wored_style_container"
                                                    },
                                                    "variables": [],
                                                    "children": [
                                                        {
                                                            "id": "0.2.4.1.2.0.0",
                                                            "type": "text",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "0",
                                                                "width": "205",
                                                                "height": "20",
                                                                "params": "16",
                                                                "style": "3",
                                                                "caption": "%24%7Bwiredmenu.settings.preferences.wired_style%7D"
                                                            },
                                                            "variables": [
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
                                                            "id": "0.2.4.1.2.0.1",
                                                            "type": "dropmenu",
                                                            "attributes": {
                                                                "x": "0",
                                                                "y": "21",
                                                                "width": "206",
                                                                "height": "25",
                                                                "params": "17",
                                                                "style": "3",
                                                                "name": "wired_style_picker"
                                                            },
                                                            "variables": [],
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
                            "id": "0.2.5",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "500",
                                "height": "382",
                                "params": "12582928",
                                "style": "3",
                                "name": "info_container",
                                "visible": "false"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.2.6",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "500",
                                "height": "382",
                                "params": "12582937",
                                "style": "3",
                                "name": "loading_view",
                                "color": "0x9999e9e9e1",
                                "visible": "false",
                                "background": "true"
                            },
                            "variables": [],
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]
};

const registryExtension: SkinRegistryExtension = {
    "assets": {
        "clove-export:WiredMenuViewView:0": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAzCAMAAAAQAf6DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURf///wAAAFXC034AAAACdFJOU/8A5bcwSgAAAAlwSFlzAAAOwgAADsIBFShKgAAAAXRJREFUSEuVkwuSwyAMQ5v7X7qRjD+AbYjagLH8FKY7+3t6/X6Hid4m3Ud0ppJtQu0Bi0+hylFk3Tfl/QwrIrJu9dY0Yu9VOJT01k6HQ1t/Pp9waPHi6QaHJt/rWxwKM1p9wSH7H5HtO64LAzTtE86CD4763CjM4s2KfcG5j3rc/iv+ykheg62j4mu0Zk40amW4BFzdIMUB83AMKHEGHG9Q4Yxgow0ocWzngA6/COjxY4CYogw/BMDR6RwHWAcEtMIxhAB8djlU4hrgw1EDnPAt4nCD14w4Nq4mwFuoSmIHp0PTMLvMkPOigeLxgTBqONbQN/kNgmvlwN91fM0xSQdr8EY5cJ6tRBElZ9qsKJaOu5tEDMMqSsfCvLpbhNuhKz/XNOvuEiEV1nkknxNNluxYrcPDuwTcXVGw1z9jjqvrshExWFlLi6j1HOf1SX46196ZRrF2uEzssvFhl7hNbBoI7QavAxxr8S7gCu8DLvBTwBF/nj++bgrkaNJsfQAAAABJRU5ErkJggg==",
        "clove-export:WiredMenuViewView:1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAzCAMAAAAQAf6DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURf///wAAAFXC034AAAACdFJOU/8A5bcwSgAAAAlwSFlzAAAOwgAADsIBFShKgAAAAXRJREFUSEuVkwuSwyAMQ5v7X7qRjD+AbYjagLH8FKY7+3t6/X6Hid4m3Ud0ppJtQu0Bi0+hylFk3Tfl/QwrIrJu9dY0Yu9VOJT01k6HQ1t/Pp9waPHi6QaHJt/rWxwKM1p9wSH7H5HtO64LAzTtE86CD4763CjM4s2KfcG5j3rc/iv+ykheg62j4mu0Zk40amW4BFzdIMUB83AMKHEGHG9Q4Yxgow0ocWzngA6/COjxY4CYogw/BMDR6RwHWAcEtMIxhAB8djlU4hrgw1EDnPAt4nCD14w4Nq4mwFuoSmIHp0PTMLvMkPOigeLxgTBqONbQN/kNgmvlwN91fM0xSQdr8EY5cJ6tRBElZ9qsKJaOu5tEDMMqSsfCvLpbhNuhKz/XNOvuEiEV1nkknxNNluxYrcPDuwTcXVGw1z9jjqvrshExWFlLi6j1HOf1SX46196ZRrF2uEzssvFhl7hNbBoI7QavAxxr8S7gCu8DLvBTwBF/nj++bgrkaNJsfQAAAABJRU5ErkJggg==",
        "clove-export:WiredMenuViewView:2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAzCAMAAAAQAf6DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURf///wAAAFXC034AAAACdFJOU/8A5bcwSgAAAAlwSFlzAAAOwgAADsIBFShKgAAAAXRJREFUSEuVkwuSwyAMQ5v7X7qRjD+AbYjagLH8FKY7+3t6/X6Hid4m3Ud0ppJtQu0Bi0+hylFk3Tfl/QwrIrJu9dY0Yu9VOJT01k6HQ1t/Pp9waPHi6QaHJt/rWxwKM1p9wSH7H5HtO64LAzTtE86CD4763CjM4s2KfcG5j3rc/iv+ykheg62j4mu0Zk40amW4BFzdIMUB83AMKHEGHG9Q4Yxgow0ocWzngA6/COjxY4CYogw/BMDR6RwHWAcEtMIxhAB8djlU4hrgw1EDnPAt4nCD14w4Nq4mwFuoSmIHp0PTMLvMkPOigeLxgTBqONbQN/kNgmvlwN91fM0xSQdr8EY5cJ6tRBElZ9qsKJaOu5tEDMMqSsfCvLpbhNuhKz/XNOvuEiEV1nkknxNNluxYrcPDuwTcXVGw1z9jjqvrshExWFlLi6j1HOf1SX46196ZRrF2uEzssvFhl7hNbBoI7QavAxxr8S7gCu8DLvBTwBF/nj++bgrkaNJsfQAAAABJRU5ErkJggg==",
        "clove-export:WiredMenuViewView:3": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAzCAMAAAAQAf6DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURf///wAAAFXC034AAAACdFJOU/8A5bcwSgAAAAlwSFlzAAAOwgAADsIBFShKgAAAAXRJREFUSEuVkwuSwyAMQ5v7X7qRjD+AbYjagLH8FKY7+3t6/X6Hid4m3Ud0ppJtQu0Bi0+hylFk3Tfl/QwrIrJu9dY0Yu9VOJT01k6HQ1t/Pp9waPHi6QaHJt/rWxwKM1p9wSH7H5HtO64LAzTtE86CD4763CjM4s2KfcG5j3rc/iv+ykheg62j4mu0Zk40amW4BFzdIMUB83AMKHEGHG9Q4Yxgow0ocWzngA6/COjxY4CYogw/BMDR6RwHWAcEtMIxhAB8djlU4hrgw1EDnPAt4nCD14w4Nq4mwFuoSmIHp0PTMLvMkPOigeLxgTBqONbQN/kNgmvlwN91fM0xSQdr8EY5cJ6tRBElZ9qsKJaOu5tEDMMqSsfCvLpbhNuhKz/XNOvuEiEV1nkknxNNluxYrcPDuwTcXVGw1z9jjqvrshExWFlLi6j1HOf1SX46196ZRrF2uEzssvFhl7hNbBoI7QavAxxr8S7gCu8DLvBTwBF/nj++bgrkaNJsfQAAAABJRU5ErkJggg==",
        "clove-export:WiredMenuViewView:4": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAzCAMAAAAQAf6DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURf///wAAAFXC034AAAACdFJOU/8A5bcwSgAAAAlwSFlzAAAOwgAADsIBFShKgAAAAXRJREFUSEuVkwuSwyAMQ5v7X7qRjD+AbYjagLH8FKY7+3t6/X6Hid4m3Ud0ppJtQu0Bi0+hylFk3Tfl/QwrIrJu9dY0Yu9VOJT01k6HQ1t/Pp9waPHi6QaHJt/rWxwKM1p9wSH7H5HtO64LAzTtE86CD4763CjM4s2KfcG5j3rc/iv+ykheg62j4mu0Zk40amW4BFzdIMUB83AMKHEGHG9Q4Yxgow0ocWzngA6/COjxY4CYogw/BMDR6RwHWAcEtMIxhAB8djlU4hrgw1EDnPAt4nCD14w4Nq4mwFuoSmIHp0PTMLvMkPOigeLxgTBqONbQN/kNgmvlwN91fM0xSQdr8EY5cJ6tRBElZ9qsKJaOu5tEDMMqSsfCvLpbhNuhKz/XNOvuEiEV1nkknxNNluxYrcPDuwTcXVGw1z9jjqvrshExWFlLi6j1HOf1SX46196ZRrF2uEzssvFhl7hNbBoI7QavAxxr8S7gCu8DLvBTwBF/nj++bgrkaNJsfQAAAABJRU5ErkJggg==",
        "clove-export:WiredMenuViewView:5": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAzCAMAAAAQAf6DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURf///wAAAFXC034AAAACdFJOU/8A5bcwSgAAAAlwSFlzAAAOwgAADsIBFShKgAAAAXRJREFUSEuVkwuSwyAMQ5v7X7qRjD+AbYjagLH8FKY7+3t6/X6Hid4m3Ud0ppJtQu0Bi0+hylFk3Tfl/QwrIrJu9dY0Yu9VOJT01k6HQ1t/Pp9waPHi6QaHJt/rWxwKM1p9wSH7H5HtO64LAzTtE86CD4763CjM4s2KfcG5j3rc/iv+ykheg62j4mu0Zk40amW4BFzdIMUB83AMKHEGHG9Q4Yxgow0ocWzngA6/COjxY4CYogw/BMDR6RwHWAcEtMIxhAB8djlU4hrgw1EDnPAt4nCD14w4Nq4mwFuoSmIHp0PTMLvMkPOigeLxgTBqONbQN/kNgmvlwN91fM0xSQdr8EY5cJ6tRBElZ9qsKJaOu5tEDMMqSsfCvLpbhNuhKz/XNOvuEiEV1nkknxNNluxYrcPDuwTcXVGw1z9jjqvrshExWFlLi6j1HOf1SX46196ZRrF2uEzssvFhl7hNbBoI7QavAxxr8S7gCu8DLvBTwBF/nj++bgrkaNJsfQAAAABJRU5ErkJggg==",
        "clove-export:WiredMenuViewView:6": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAzCAMAAAAQAf6DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURf///wAAAFXC034AAAACdFJOU/8A5bcwSgAAAAlwSFlzAAAOwgAADsIBFShKgAAAAXRJREFUSEuVkwuSwyAMQ5v7X7qRjD+AbYjagLH8FKY7+3t6/X6Hid4m3Ud0ppJtQu0Bi0+hylFk3Tfl/QwrIrJu9dY0Yu9VOJT01k6HQ1t/Pp9waPHi6QaHJt/rWxwKM1p9wSH7H5HtO64LAzTtE86CD4763CjM4s2KfcG5j3rc/iv+ykheg62j4mu0Zk40amW4BFzdIMUB83AMKHEGHG9Q4Yxgow0ocWzngA6/COjxY4CYogw/BMDR6RwHWAcEtMIxhAB8djlU4hrgw1EDnPAt4nCD14w4Nq4mwFuoSmIHp0PTMLvMkPOigeLxgTBqONbQN/kNgmvlwN91fM0xSQdr8EY5cJ6tRBElZ9qsKJaOu5tEDMMqSsfCvLpbhNuhKz/XNOvuEiEV1nkknxNNluxYrcPDuwTcXVGw1z9jjqvrshExWFlLi6j1HOf1SX46196ZRrF2uEzssvFhl7hNbBoI7QavAxxr8S7gCu8DLvBTwBF/nj++bgrkaNJsfQAAAABJRU5ErkJggg==",
        "clove-export:WiredMenuViewView:7": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG6SURBVEhLrZU9SCNBFIC/EW20EAtB2wSCSI5oYbaK2KjYxMLOxquuOLGyFUSw1iKokEJik04hNoFUaip/CsVDRIjlKViIxZ2F4lq4M77ZnUSJfjDw9r033+7ODjsQoJTyga+OMePT0pX1J51rmvnfbbz4/jhQUVJ6VfPDvZ8mEVcg5C268BUpjvmt1pWgXMyZeGJ67sN8GKe4XMwxu5RgZmoEgHTyXXb05xcAW9t7rC3m6sojYint7uoAIZPom9aTmzWWSOnd/b9w2aDlLixxuZijUMpCIGwk1RRKWWvdNZEn7o/3mDidzJNO5q16OCf7JRGxZNQbYdSzX9eVc2E+3u3fRwAuaremmN8ZBGD/pNYwRzA/EW831w2feP+kFhG4ci4i4uPTSxP/nNy1ahqZl/0Sax/HUh6by1VYgKGBPgqlrFOud87x6SVri1fEUl64BfMTOqj+B+Dh/pybi6pp6O3PiPY3rs8OTRxLeXR2/QBgONNufkIRMYFcoydJ6tWlOLLGBM16uPiojvx4w5n3rdIM4flKKeX7vs/qxrNVaIZgGQDGAca+6bzTw5x73ym3D1MtF3GzVHTwCuck4xUz5920AAAAAElFTkSuQmCC",
        "clove-export:WiredMenuViewView:8": "data:image/png;base64,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",
        "clove-export:WiredMenuViewView:9": "data:image/png;base64,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",
        "clove-export:WiredMenuViewView:10": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAZCAMAAAAL146mAAAAYFBMVEX///8AAAD5+fnMzMwyd5fw8PDg3NnLy8uWzODCwL3Cv7zj4+N5uN6RxeTNzc3CwLzh3dvCv7vi4uJXpcXh3NqPw+Pk5OTi3drg3dnx8fHg3drCvrvCv73v7+/Cvrzh3drCmwO1AAAAAXRSTlMAQObYZgAAAJlJREFUeF59y8cOAzEIBNAMuGwv6T3//5cBvFYsHzIXRg/N7l8A1BK8rxDXy71CLDEu4TYXhiPHGHxFHMPrXdJHyXc/AsCRCwKGYQCEVmQ4aAT90yjBhjaEG8dNxhNaIzjXNAbOYTWihI0A6GHUk6IBzV0iTIIK09QnOrcAExEzpBvt5QDyh3Ub6lHKXSzPc9fkeZE8r62UOl/V0gcVawCPUgAAAABJRU5ErkJggg==",
        "clove-export:WiredMenuViewView:11": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAMAAACzvE1FAAAAJFBMVEX///8AAAA/Pz9qamrUml7+ypf62bgKExkyd5dQOgBXpcWWzOC3figOAAAAAXRSTlMAQObYZgAAAFNJREFUeNqtikESgCAMxCi0tur//+tScOXA0QwDJLNljySL19oEhw5puLjpX1HFw4UaUC7gBzBlsBFst2ABn3ucSfjrV3Tw+HQSPsOd/BdQFgohD2HhBTD1+l3mAAAAAElFTkSuQmCC",
        "clove-export:WiredMenuViewView:12": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAG1BMVEX///8AAAD////C1uAyd5dXpcXN5O7g8PaWzOB+Vnm+AAAAAXRSTlMAQObYZgAAAIhJREFUeNqd0lEOhCAMRdFxakv3v2IvdSpGpTHzDB9wUlKBz7ssex7luwe9i8jKJ1dFWF9/Az1TrKmaanhikmo3kjjMDrNhkIgYaT1GmINZ1ivcvTF6dRZCYR5GwsAsU/PDnD1eWXTSRqKb//es+iz+rzqX4jzn9yDL7P6g6b1DxXsp31n9PutsOEwIRy67ux0AAAAASUVORK5CYII=",
        "clove-export:WiredMenuViewView:13": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAMAAABVlYYBAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkUExURQAAAP///9bW1p3G1ytunvD3+jY2Nk+XuCtSchZvohgYGAAAAIGagMkAAAAMdFJOU///////////////ABLfzs4AAAAJcEhZcwAADsMAAA7DAcdvqGQAAACQSURBVChTXc6BEoQgCARQCjjs/P//vV1AbY5JqyezInMK1l/JlOuiy/sQel/03Bqh6ErHo8vzRYeaqxbX/qFbqHtx640QM3pya9rhUiRHjFF89Hjwxq3pDxnNbN/Ti5DRDNc1JeorAxno08A6QWCnMuTNW8nLpRLyF+n4Zrla3lYMd5SG1WQd2r2MIuzIrjl/KR8KdRWOn08AAAAASUVORK5CYII=",
        "clove-export:WiredMenuViewView:14": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAZCAMAAAAL146mAAAAYFBMVEX///8AAAD5+fnMzMwyd5fw8PDg3NnLy8uWzODCwL3Cv7zj4+N5uN6RxeTNzc3CwLzh3dvCv7vi4uJXpcXh3NqPw+Pk5OTi3drg3dnx8fHg3drCvrvCv73v7+/Cvrzh3drCmwO1AAAAAXRSTlMAQObYZgAAAJlJREFUeF59y8cOAzEIBNAMuGwv6T3//5cBvFYsHzIXRg/N7l8A1BK8rxDXy71CLDEu4TYXhiPHGHxFHMPrXdJHyXc/AsCRCwKGYQCEVmQ4aAT90yjBhjaEG8dNxhNaIzjXNAbOYTWihI0A6GHUk6IBzV0iTIIK09QnOrcAExEzpBvt5QDyh3Ub6lHKXSzPc9fkeZE8r62UOl/V0gcVawCPUgAAAABJRU5ErkJggg==",
        "clove-export:WiredMenuViewView:15": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAMAAACzvE1FAAAAJFBMVEX///8AAAA/Pz9qamrUml7+ypf62bgKExkyd5dQOgBXpcWWzOC3figOAAAAAXRSTlMAQObYZgAAAFNJREFUeNqtikESgCAMxCi0tur//+tScOXA0QwDJLNljySL19oEhw5puLjpX1HFw4UaUC7gBzBlsBFst2ABn3ucSfjrV3Tw+HQSPsOd/BdQFgohD2HhBTD1+l3mAAAAAElFTkSuQmCC",
        "clove-export:WiredMenuViewView:16": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAG1BMVEX///8AAAD////C1uAyd5dXpcXN5O7g8PaWzOB+Vnm+AAAAAXRSTlMAQObYZgAAAIhJREFUeNqd0lEOhCAMRdFxakv3v2IvdSpGpTHzDB9wUlKBz7ssex7luwe9i8jKJ1dFWF9/Az1TrKmaanhikmo3kjjMDrNhkIgYaT1GmINZ1ivcvTF6dRZCYR5GwsAsU/PDnD1eWXTSRqKb//es+iz+rzqX4jzn9yDL7P6g6b1DxXsp31n9PutsOEwIRy67ux0AAAAASUVORK5CYII=",
        "clove-export:WiredMenuViewView:17": "data:image/png;base64,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"
    },
    "skins": {}
};

setSkinRegistryExtension("WiredMenuViewView", registryExtension);

const localizeCaption = (caption: string) => caption.replace(/\$\{([^}]+)\}/g, (_match, key: string) => LocalizeText(key));

export const WiredMenuViewView: FC<WiredMenuViewViewProps> = props =>
{
    const { className = '', slots = {}, visibility = {}, captions = {}, itemListOrder = {}, initialActiveTabs = {}, resolveCaption = localizeCaption, onAction, onTabChange, onClose } = props;

    return <HabboLayoutView
        layout={ layout }
        className={ `generated-wired-menu-view-view ${ className }` }
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
