import { Q as QPage, _ as _sfc_main$1 } from "./default.2a98e496.js";
import { s as setTitle } from "./index.2a47d4c3.js";
import { o as openBlock, f as createBlock, w as withCtx, V as createVNode, i as createBaseVNode } from "./vendor.cde5035b.js";
import "./QCard.ada68c8f.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h2", { class: "text-primary q-pl-lg" }, "\u0414\u043E\u043C\u0430\u0448\u043D\u044F\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430", -1);
const _sfc_main = {
  setup(__props) {
    setTitle("\u041D\u0430\u0447\u0430\u043B\u043E");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, null, {
        default: withCtx(() => [
          createVNode(QPage, { class: "q-pa-lg" }, {
            default: withCtx(() => [
              _hoisted_1
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
