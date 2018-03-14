import Vue from "vue";

import Element from "element-ui";
import "element-ui/lib/theme-chalk/reset.css";
import "@/assets/theme-default/index.css";

import store from "./store";
import App from "./App";
import router from "./router";

import TreeSelect from "@/components/tree-select/tree-select";
import Table from "@/components/table";
import Icon from "@/components/icon/icon";
import QlSelect from "@/components/select";
import Tag from "@/components/tag";
import Search from "@/components/search";
import CardList from "@/components/card-list";
import SelectCity from "@/components/select-city";
import { DialogForm, Form } from "@/components/form";
import DialogResetPwd from "@/components/dialog-reset-pwd";
import DialogDrag from "@/components/dialog-drag";
import BadgeStatus from "@/components/badge-status";
import filters from "@/filters";

import confirmDelete from "@/mixins/confirm-delete";

const isDebug = process.env.NODE_ENV !== "production";
Vue.config.debug = isDebug;
Vue.config.devtools = isDebug;
Vue.config.productionTip = isDebug;

Vue.use(Element, { size: "medium" });
Vue.use(DialogDrag);
Vue.mixin(confirmDelete);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(DialogDrag);
Vue.use(Search);
Vue.use(Tag);
Vue.use(CardList);
Vue.use(SelectCity);
Vue.use(DialogForm);
Vue.use(Form);
Vue.use(DialogResetPwd);
Vue.use(BadgeStatus);

Vue.component(TreeSelect.name, TreeSelect);
Vue.component(Table.name, Table);
Vue.component(Icon.name, Icon);
Vue.component(QlSelect.name, QlSelect);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
