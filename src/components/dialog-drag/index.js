export default {
  install(Vue) {
    Vue.directive("draggable", {
      bind(el, binding, vnode) {
        const dlg = el.getElementsByClassName("el-dialog")[0];
        let header = el.getElementsByClassName("el-dialog__header")[0];
        let methodName = binding.expression;
        header.style.userSelect = "none";
        header.style["-ms-user-select"] = "none";
        header.style["-moz-user-select"] = "none";
        header.style.cursor = "move";

        dlg.offsetX = 0;
        dlg.offsetY = 0;

        const move = e => {
          dlg.style.left = e.pageX - dlg.offsetX + "px";
          dlg.style.top = e.pageY - dlg.offsetY + "px";
        };

        const up = () => {
          removeEventListener("mousemove", move);
          removeEventListener("mouseup", up);
        };

        const down = e => {
          methodName && vnode.context[methodName]();
          dlg.offsetX = e.pageX - dlg.offsetLeft;
          dlg.offsetY = e.pageY - dlg.offsetTop;

          addEventListener("mousemove", move);
          addEventListener("mouseup", up);
        };

        header.addEventListener("mousedown", down);
      }
    });
  }
};
