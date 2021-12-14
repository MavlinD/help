import { bc as defineComponent, o as openBlock, aw as createElementBlock, i as createBaseVNode, V as createVNode, W as QBtn } from "./vendor.cde5035b.js";
import { s as setTitle } from "./index.dc0058ce.js";
const _hoisted_1 = { class: "fullscreen bg-blue text-white text-center q-pa-md flex flex-center" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "30vh" } }, " 404 ", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", {
  class: "text-h2",
  style: { "opacity": ".4" }
}, " Oops. Nothing here... ", -1);
const _sfc_main = {
  setup(__props) {
    setTitle(`404 page`);
    defineComponent({
      name: "Error404"
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", null, [
          _hoisted_2,
          _hoisted_3,
          createVNode(QBtn, {
            class: "q-mt-xl",
            color: "white",
            "text-color": "blue",
            unelevated: "",
            to: "/",
            label: "Go Home",
            "no-caps": ""
          })
        ])
      ]);
    };
  }
};
export { _sfc_main as default };
