const config = [
  {
    label: "表单页",
    icon: "form",
    groupName: "form",
    children: [
      {
        name: "base",
        meta: {},
        label: "基础表单"
      },
      {
        name: "dialog",
        meta: {},
        label: "弹窗表单"
      }
    ]
  },
  {
    label: "列表页",
    groupName: "table",
    icon: "table",
    children: [
      {
        name: "search",
        icon: "search",
        meta: {},
        label: "查询表格"
      }
    ]
  }
];

export default config;
