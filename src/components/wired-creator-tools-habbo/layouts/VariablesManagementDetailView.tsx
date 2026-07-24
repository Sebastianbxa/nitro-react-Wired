/* eslint-disable quotes */
import { FC, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { LocalizeText } from '@/api';
import { HabboLayoutDefinition, HabboLayoutView } from '@/common/habbo';

export type VariablesManagementDetailViewSlot = "add_var_btn" | "avatar_preview" | "avatar_preview_region" | "create_var_btn" | "create_var_bubble" | "delete_var_btn" | "header" | "info_box" | "info_box_text" | "info_text" | "pet_preview" | "preview" | "refresh_btn" | "searching_icon" | "title" | "value_input" | "value_input_border" | "value_setting" | "var_picker_container" | "variable_setting" | "variable_values_container" | "variable_values_table_container" | "variablemanagement_detail";

export interface VariablesManagementDetailViewProps
{
    className?: string;
    slots?: Partial<Record<VariablesManagementDetailViewSlot, ReactNode>>;
    visibility?: Partial<Record<VariablesManagementDetailViewSlot, boolean>>;
    captions?: Partial<Record<VariablesManagementDetailViewSlot, string>>;
    itemListOrder?: Partial<Record<VariablesManagementDetailViewSlot, VariablesManagementDetailViewSlot[]>>;
    initialActiveTabs?: Record<string, string>;
    resolveCaption?: (caption: string) => string;
    onAction?: (name: string, event: ReactMouseEvent<HTMLElement>) => void;
    onTabChange?: (contextName: string, tabName: string) => void;
    onClose?: () => void;
}

const layout: HabboLayoutDefinition = {
    "name": "variables_management_detail",
    "width": 339,
    "height": 512,
    "nodes": [
        {
            "id": "0",
            "type": "frame",
            "attributes": {
                "x": "85",
                "y": "46",
                "width": "339",
                "height": "512",
                "params": "98305",
                "style": "3",
                "name": "variablemanagement_detail",
                "caption": "%24%7Bwiredmenu.variable_management_detail.title%7D",
                "color": "0xff418db0",
                "treshold": "0",
                "width_min": "339",
                "width_max": "339",
                "height_min": "400",
                "height_max": "650"
            },
            "variables": [
                {
                    "key": "help_page",
                    "value": "wct_uservars",
                    "type": "String"
                },
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
                        "x": "18",
                        "y": "7",
                        "width": "303",
                        "height": "57",
                        "params": "16",
                        "style": "3",
                        "name": "header"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.0.0",
                            "type": "border",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "228",
                                "height": "57",
                                "params": "2064",
                                "style": "4"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.0.0.0",
                                    "type": "html",
                                    "attributes": {
                                        "x": "5",
                                        "y": "5",
                                        "width": "218",
                                        "height": "46",
                                        "params": "2185",
                                        "style": "3",
                                        "name": "info_text",
                                        "caption": "Do%20not%20use%20this%20tool%20for%20users%20who%20are%20currently%20in%20the%20room/using%20the%20changed%20variable%20in%20another%20room.",
                                        "width_min": "218",
                                        "width_max": "218",
                                        "height_min": "46",
                                        "height_max": "46"
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
                            "type": "button",
                            "attributes": {
                                "x": "241",
                                "y": "13",
                                "width": "62",
                                "height": "30",
                                "params": "393297",
                                "style": "3",
                                "name": "refresh_btn",
                                "caption": "%24%7Bwiredmenu.list_view.refresh%7D"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.0.2",
                            "type": "icon",
                            "attributes": {
                                "x": "288",
                                "y": "48",
                                "width": "15",
                                "height": "15",
                                "params": "0",
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
                        "x": "18",
                        "y": "73",
                        "width": "303",
                        "height": "114",
                        "params": "16",
                        "style": "3",
                        "name": "info_box"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.1.0",
                            "type": "text",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "188",
                                "height": "19",
                                "params": "16",
                                "style": "3",
                                "name": "title",
                                "caption": "%24%7Bwiredmenu.variable_management_detail.holder_info%7D"
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
                            "id": "0.1.1",
                            "type": "border",
                            "attributes": {
                                "x": "0",
                                "y": "20",
                                "width": "94",
                                "height": "94",
                                "params": "16",
                                "style": "2",
                                "name": "preview",
                                "color": "0x0dadada"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.1.1.0",
                                    "type": "region",
                                    "attributes": {
                                        "x": "10",
                                        "y": "10",
                                        "width": "74",
                                        "height": "74",
                                        "params": "17",
                                        "style": "3",
                                        "name": "avatar_preview_region",
                                        "visible": "false",
                                        "treshold": "0"
                                    },
                                    "variables": [],
                                    "children": []
                                },
                                {
                                    "id": "0.1.1.1",
                                    "type": "widget",
                                    "attributes": {
                                        "x": "28",
                                        "y": "30",
                                        "width": "33",
                                        "height": "34",
                                        "params": "3932176",
                                        "style": "3",
                                        "name": "avatar_preview",
                                        "visible": "false"
                                    },
                                    "variables": [
                                        {
                                            "key": "widget_type",
                                            "value": "avatar_image",
                                            "type": "String"
                                        },
                                        {
                                            "key": "avatar_image:only_head",
                                            "value": "true",
                                            "type": "Boolean"
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
                                    "id": "0.1.1.2",
                                    "type": "widget",
                                    "attributes": {
                                        "x": "0",
                                        "y": "0",
                                        "width": "94",
                                        "height": "94",
                                        "params": "273",
                                        "style": "3",
                                        "name": "pet_preview",
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
                                }
                            ]
                        },
                        {
                            "id": "0.1.2",
                            "type": "border",
                            "attributes": {
                                "x": "109",
                                "y": "20",
                                "width": "194",
                                "height": "94",
                                "params": "16",
                                "style": "10"
                            },
                            "variables": [],
                            "children": [
                                {
                                    "id": "0.1.2.0",
                                    "type": "input",
                                    "attributes": {
                                        "x": "6",
                                        "y": "6",
                                        "width": "182",
                                        "height": "80",
                                        "params": "2049",
                                        "style": "3",
                                        "name": "info_box_text",
                                        "caption": "User%20type%3A%20Habbo%0DName%3A%20...........%0DUser%20id%3A%20...........%0D%5BOwner%20name%3A%20...%5D%0D%5BOwner%20id%3A%20..%5D%0D"
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
                                            "value": "0",
                                            "type": "Number"
                                        },
                                        {
                                            "key": "editable",
                                            "value": "false",
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
                        "x": "18",
                        "y": "196",
                        "width": "303",
                        "height": "265",
                        "params": "2064",
                        "style": "3",
                        "name": "variable_values_container"
                    },
                    "variables": [],
                    "children": [
                        {
                            "id": "0.2.0",
                            "type": "text",
                            "attributes": {
                                "x": "0",
                                "y": "0",
                                "width": "188",
                                "height": "19",
                                "params": "16",
                                "style": "3",
                                "name": "title",
                                "caption": "%24%7Bwiredmenu.variable_management_detail.variables%7D"
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
                            "id": "0.2.1",
                            "type": "container",
                            "attributes": {
                                "x": "0",
                                "y": "20",
                                "width": "303",
                                "height": "211",
                                "params": "2192",
                                "style": "3",
                                "name": "variable_values_table_container"
                            },
                            "variables": [],
                            "children": []
                        },
                        {
                            "id": "0.2.2",
                            "type": "itemlist_horizontal",
                            "attributes": {
                                "x": "0",
                                "y": "240",
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
                                    "id": "0.2.2.0",
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
                                    "variables": [],
                                    "children": []
                                },
                                {
                                    "id": "0.2.2.1",
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
                                    "variables": [],
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": "0.2.3",
                            "type": "bubble",
                            "attributes": {
                                "x": "122",
                                "y": "95",
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
                                    "id": "0.2.3.0",
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
                                            "id": "0.2.3.0.0",
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
                                            "id": "0.2.3.0.1",
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
                                    "id": "0.2.3.1",
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
                                            "id": "0.2.3.1.0",
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
                                            "id": "0.2.3.1.1",
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
                                                    "id": "0.2.3.1.1.0",
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
                                    "id": "0.2.3.2",
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
};

const localizeCaption = (caption: string) => caption.replace(/\$\{([^}]+)\}/g, (_match, key: string) => LocalizeText(key));

export const VariablesManagementDetailView: FC<VariablesManagementDetailViewProps> = props =>
{
    const { className = '', slots = {}, visibility = {}, captions = {}, itemListOrder = {}, initialActiveTabs = {}, resolveCaption = localizeCaption, onAction, onTabChange, onClose } = props;

    return <HabboLayoutView
        layout={ layout }
        className={ `generated-variables-management-detail-view ${ className }` }
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
