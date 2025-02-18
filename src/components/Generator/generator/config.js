// 表单属性【右面板】
export const formConf = {
  formRef: "elForm",
  formModel: "dataForm",
  size: "small",
  labelPosition: "right",
  labelWidth: 100,
  formRules: "rules",
  popupType: "general",
  generalWidth: "600px",
  fullScreenWidth: "100%",
  drawerWidth: "600px",
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: false,
  hasCancelBtn: true,
  cancelButtonText: "取 消",
  hasConfirmBtn: true,
  confirmButtonText: "确 定",
  hasPrintBtn: false,
  printButtonText: "打 印",
  printId: "",
  formStyle: "",
  funcs: {
    onLoad:
      "({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
    beforeSubmit:
      "({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    return new Promise((resolve, reject) => {\n        // 在此编写代码\n        \n        // 继续执行\n        resolve()\n    })\n}",
    afterSubmit:
      "({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
  },
  idGlobal: 100
};

// 基础控件 【左面板】
export const inputComponents = [
  {
    __config__: {
      hongan4dKey: "comInput",
      label: "单行输入",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-input",
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false,
      regList: [],
      trigger: "blur"
    },
    __slot__: {
      prepend: "",
      append: ""
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请输入",
    style: { width: "100%" },
    clearable: true,
    "prefix-icon": "",
    "suffix-icon": "",
    maxlength: null,
    "show-word-limit": false,
    "show-password": false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "textarea",
      label: "多行输入",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-textarea",
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "blur"
    },
    type: "textarea",
    placeholder: "请输入",
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: "100%" },
    maxlength: null,
    "show-word-limit": true,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "numInput",
      label: "数字输入",
      showLabel: true,
      labelWidth: undefined,
      tag: "el-input-number",
      tagIcon: "icon-ym icon-ym-generator-number",
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: ["blur", "change"]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "数字文本",
    min: undefined,
    max: undefined,
    step: 1,
    "step-strictly": false,
    precision: undefined,
    "controls-position": "",
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "switch",
      label: "开关",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-switch",
      tagIcon: "icon-ym icon-ym-generator-switch",
      defaultValue: false,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    activeTxt: "开",
    inactiveTxt: "关",
    "active-color": null,
    "inactive-color": null,
    "active-value": 1,
    "inactive-value": 0
  },
  {
    __config__: {
      hongan4dKey: "radio",
      label: "单选框组",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-radio-group",
      tagIcon: "icon-ym icon-ym-generator-radio",
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change",
      optionType: "default",
      border: false,
      dataType: "static",
      dictionaryType: "",
      propsUrl: "",
      props: {
        label: "fullName",
        value: "id"
      }
    },
    __slot__: {
      options: [
        {
          fullName: "选项一",
          id: "1"
        },
        {
          fullName: "选项二",
          id: "2"
        }
      ]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    style: {},
    size: "small",
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "checkbox",
      label: "多选框组",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-checkbox-group",
      tagIcon: "icon-ym icon-ym-generator-checkbox",
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change",
      optionType: "default",
      border: false,
      dataType: "static",
      dictionaryType: "",
      propsUrl: "",
      props: {
        label: "fullName",
        value: "id"
      }
    },
    __slot__: {
      options: [
        {
          fullName: "选项一",
          id: "1"
        },
        {
          fullName: "选项二",
          id: "2"
        }
      ]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    style: {},
    size: "small",
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "select",
      label: "下拉选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-select",
      tagIcon: "icon-ym icon-ym-generator-select",
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change",
      dataType: "static",
      dictionaryType: "",
      propsUrl: "",
      props: {
        label: "fullName",
        value: "id"
      }
    },
    __slot__: {
      options: [
        {
          fullName: "选项一",
          id: "1"
        },
        {
          fullName: "选项二",
          id: "2"
        }
      ]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    style: { width: "100%" },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false
  },
  {
    __config__: {
      hongan4dKey: "cascader",
      label: "级联选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-cascader",
      tagIcon: "icon-ym icon-ym-generator-cascader",
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change",
      dataType: "static",
      propsUrl: "",
      dictionaryType: ""
    },
    options: [
      {
        id: "1",
        fullName: "选项1",
        children: [
          {
            id: "2",
            fullName: "选项1-1"
          }
        ]
      }
    ],
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    style: { width: "100%" },
    props: {
      props: {
        multiple: false,
        value: "id",
        label: "fullName",
        children: "children"
      }
    },
    "show-all-levels": true,
    disabled: false,
    clearable: true,
    filterable: false,
    separator: "/"
  },
  {
    __config__: {
      hongan4dKey: "date",
      label: "日期选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-date-picker",
      tagIcon: "icon-ym icon-ym-generator-date",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    type: "date",
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    format: "yyyy-MM-dd",
    "value-format": "timestamp",
    readonly: false
  },
  {
    __config__: {
      hongan4dKey: "time",
      label: "时间选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-time-picker",
      tagIcon: "icon-ym icon-ym-generator-time",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    readonly: false,
    "picker-options": {
      selectableRange: "00:00:00-23:59:59"
    },
    format: "HH:mm:ss",
    "value-format": "HH:mm:ss"
  },
  {
    __config__: {
      hongan4dKey: "uploadFz",
      label: "文件上传",
      labelWidth: undefined,
      showLabel: true,
      tag: "HONGAN4D-UploadFz",
      tagIcon: "icon-ym icon-ym-generator-upload",
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "click"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    accept: "",
    fileSize: 5,
    sizeUnit: "MB",
    buttonText: "点击上传",
    showTip: false,
    limit: 9
  },
  {
    __config__: {
      hongan4dKey: "uploadImg",
      label: "图片上传",
      labelWidth: undefined,
      showLabel: true,
      tag: "HONGAN4D-UploadImg",
      tagIcon: "icon-ym icon-ym-generator-upload",
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "click"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    accept: "",
    showTip: false,
    fileSize: 5,
    sizeUnit: "MB",
    limit: 9
  },
  {
    __config__: {
      hongan4dKey: "colorPicker",
      label: "颜色选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-color-picker",
      tagIcon: "icon-ym icon-ym-generator-color",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    "show-alpha": false,
    "color-format": "",
    disabled: false,
    size: "small"
  },
  {
    __config__: {
      hongan4dKey: "rate",
      label: "评分",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-rate",
      tagIcon: "icon-ym icon-ym-generator-rate",
      defaultValue: 0,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    style: {},
    max: 5,
    "allow-half": false,
    "show-text": false,
    "show-score": false,
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "slider",
      label: "滑块",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-slider",
      tagIcon: "icon-ym icon-ym-generator-slider",
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    "show-stops": false,
    range: false
  },
  {
    __config__: {
      hongan4dKey: "divider",
      label: "分割线",
      labelWidth: undefined,
      showLabel: false,
      tag: "el-divider",
      tagIcon: "icon-ym icon-ym-generator-divider",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    __slot__: {
      default: "我是分割线"
    },
    "content-position": "center"
  },
  {
    __config__: {
      hongan4dKey: "HONGAN4DText",
      label: "文本",
      labelWidth: undefined,
      showLabel: false,
      tag: "HONGAN4D-Text",
      tagIcon: "icon-ym icon-ym-generator-textarea",
      defaultValue: "这是一段文字",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    style: { width: "100%" },
    textStyle: {
      color: "#000000",
      "text-align": "left",
      "font-weight": "normal",
      "font-style": "normal",
      "text-decoration": "none",
      "line-height": 32,
      "font-size": 12
    }
  },
  {
    __config__: {
      hongan4dKey: "editor",
      label: "富文本",
      labelWidth: undefined,
      showLabel: true,
      tag: "HONGAN4D-Quill",
      tagIcon: "icon-ym icon-ym-generator-rich-text",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "blur"
    },
    placeholder: "请输入内容..."
  },
  {
    __config__: {
      hongan4dKey: "button",
      label: "按钮",
      labelWidth: undefined,
      showLabel: false,
      tag: "hongan4d-button",
      tagIcon: "icon-ym icon-ym-generator-button",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      regList: [],
      trigger: "click"
    },
    on: {
      click:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    align: "left",
    buttonText: "按钮",
    type: "",
    disabled: false
  }
];

// 高级控件 【左面板】
export const selectComponents = [
  {
    __config__: {
      hongan4dKey: "comSelect",
      label: "组织选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "com-select",
      tagIcon: "icon-ym icon-ym-generator-company",
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    multiple: false,
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "depSelect",
      label: "部门选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "dep-select",
      tagIcon: "icon-ym icon-ym-generator-department",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    multiple: false,
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "posSelect",
      label: "岗位选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "pos-select",
      tagIcon: "icon-ym icon-ym-generator-jobs",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    multiple: false,
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "userSelect",
      label: "用户选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "user-select",
      tagIcon: "icon-ym icon-ym-generator-user",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "click"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    multiple: false,
    clearable: true,
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "treeSelect",
      label: "下拉树形",
      labelWidth: undefined,
      showLabel: true,
      tag: "HONGAN4DTreeSelect",
      tagIcon: "icon-ym icon-ym-generator-tree",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change",
      dataType: "static",
      dictionaryType: "",
      propsUrl: ""
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    props: {
      props: {
        value: "id",
        label: "fullName",
        children: "children"
      }
    },
    options: [
      {
        id: "1",
        fullName: "选项1",
        children: [
          {
            id: "2",
            fullName: "选项1-1"
          }
        ]
      }
    ],
    multiple: false,
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "billRule",
      label: "单据组件",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      defaultValue: "",
      tagIcon: "icon-ym icon-ym-generator-documents",
      defaultValue: null,
      layout: "colFormItem",
      required: false,
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false,
      trigger: "change",
      rule: ""
    },
    readonly: true,
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      hongan4dKey: "table",
      label: "设计子表",
      showLabel: false,
      tagIcon: "icon-ym icon-ym-generator-table",
      tag: "HONGAN4D-InputTable",
      defaultValue: [],
      layout: "rowFormItem",
      dragDisabled: false,
      visibility: ["pc", "app"],
      showTitle: true,
      type: "table",
      rowType: "table",
      children: [],
      tableName: ""
    },
    disabled: false,
    actionText: "添加",
    "show-summary": false,
    summaryField: [],
    tableConf: {},
    defaultValue: []
  },
  {
    __config__: {
      hongan4dKey: "address",
      label: "省市区域",
      labelWidth: undefined,
      showLabel: true,
      tag: "HONGAN4D-Address",
      tagIcon: "icon-ym icon-ym-generator-Provinces",
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    disabled: false,
    clearable: true,
    filterable: false,
    multiple: false,
    level: 2
  },
  {
    __config__: {
      hongan4dKey: "relationForm",
      label: "关联表单",
      labelWidth: undefined,
      showLabel: true,
      tag: "relationForm",
      tagIcon: "icon-ym icon-ym-generator-menu",
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    modelId: "",
    relationField: "",
    hasPage: false,
    pageSize: 20,
    columnOptions: [],
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      hongan4dKey: "popupSelect",
      label: "弹窗选择",
      labelWidth: undefined,
      showLabel: true,
      required: false,
      tag: "popupSelect",
      tagIcon: "icon-ym icon-ym-generator-popup",
      defaultValue: "",
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    interfaceId: "",
    hasPage: false,
    pageSize: 20,
    columnOptions: [],
    propsValue: "id",
    relationField: "fullName",
    popupType: "dialog",
    popupTitle: "选择数据",
    popupWidth: "800px",
    disabled: false,
    clearable: true
  },
  {
    __config__: {
      hongan4dKey: "relationFormAttr",
      label: "关联表单属性",
      labelWidth: undefined,
      showLabel: true,
      tag: "relationFormAttr",
      tagIcon: "icon-ym icon-ym-generator-nature",
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    showField: "",
    relationField: ""
  },
  {
    __config__: {
      hongan4dKey: "popupAttr",
      label: "弹窗选择属性",
      labelWidth: undefined,
      showLabel: true,
      tag: "popupAttr",
      tagIcon: "icon-ym icon-ym-generator-popup-attr",
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    showField: "",
    relationField: ""
  }
];

// 系统控件 【左面板】
export const systemComponents = [
  {
    __config__: {
      hongan4dKey: "createUser",
      label: "创建人员",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-founder",
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    readonly: true,
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      hongan4dKey: "createTime",
      label: "创建时间",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-createtime",
      defaultValue: "",
      layout: "colFormItem",
      required: false,
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    readonly: true,
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      hongan4dKey: "modifyUser",
      label: "修改人员",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-modifier",
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    readonly: true,
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      hongan4dKey: "modifyTime",
      label: "修改时间",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-modifytime",
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    readonly: true,
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      hongan4dKey: "currOrganize",
      label: "所属组织",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-company",
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    readonly: true,
    showLevel: "last",
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      hongan4dKey: "currPosition",
      label: "所属岗位",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-station",
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    readonly: true,
    placeholder: "系统自动生成"
  }
];

// 布局控件 【左面板】
export const layoutComponents = [
  {
    __config__: {
      hongan4dKey: "groupTitle",
      label: "分组标题",
      labelWidth: undefined,
      showLabel: false,
      tag: "groupTitle",
      tagIcon: "icon-ym icon-ym-generator-group",
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    content: "分组标题",
    "content-position": "left"
  },
  {
    __config__: {
      hongan4dKey: "card",
      label: "卡片容器",
      showLabel: false,
      tag: "el-card",
      tagIcon: "icon-ym icon-ym-generator-card",
      defaultValue: [],
      layout: "rowFormItem",
      span: "24",
      dragDisabled: false,
      visibility: ["pc", "app"],
      children: []
    },
    header: "卡片容器",
    shadow: "always"
  },
  {
    __config__: {
      hongan4dKey: "row",
      label: "栅格容器",
      tagIcon: "icon-ym icon-ym-generator-layout",
      layout: "rowFormItem",
      span: "24",
      dragDisabled: false,
      visibility: ["pc", "app"],
      layoutTree: true,
      rowType: "layout"
    },
    type: "default",
    justify: "start",
    align: "top"
  },
  {
    __config__: {
      hongan4dKey: "tab",
      label: "标签面板",
      showLabel: false,
      tag: "el-tab",
      tagIcon: "icon-ym icon-ym-generator-label",
      layout: "rowFormItem",
      span: "24",
      dragDisabled: false,
      visibility: ["pc", "app"],
      children: [
        {
          title: "Tab 1",
          __config__: {
            children: []
          }
        },
        {
          title: "Tab 2",
          __config__: {
            children: []
          }
        }
      ],
      active: 0
    },
    on: {
      "tab-click":
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    type: "",
    "tab-position": "top"
  },
  {
    __config__: {
      hongan4dKey: "collapse",
      label: "折叠面板",
      showLabel: false,
      tag: "el-collapse",
      tagIcon: "icon-ym icon-ym-generator-fold",
      layout: "rowFormItem",
      span: "24",
      dragDisabled: false,
      visibility: ["pc", "app"],
      children: [
        {
          title: "面板1",
          name: "1",
          __config__: {
            children: []
          }
        },
        {
          title: "面板2",
          name: "2",
          __config__: {
            children: []
          }
        }
      ],
      active: ["1"]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    accordion: false
  }
];
