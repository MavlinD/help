import { Q as QPage, _ as _sfc_main$2 } from "./default.1dd637dd.js";
import { _ as _sfc_main$1 } from "./ArticlesList.93ac4db0.js";
import { T as useStore, o as openBlock, f as createBlock, w as withCtx, V as createVNode, Y as unref, i as createBaseVNode } from "./vendor.cde5035b.js";
import { s as setTitle } from "./index.dc0058ce.js";
import "./QCard.ada68c8f.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h2", { class: "q-ml-xl text-primary" }, "\u0421\u0442\u0430\u0442\u044C\u0438", -1);
const _sfc_main = {
  setup(__props) {
    const store = useStore();
    setTitle(`\u0421\u0442\u0430\u0442\u044C\u0438`);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$2, null, {
        default: withCtx(() => [
          createVNode(QPage, { class: "q-px-lg" }, {
            default: withCtx(() => {
              var _a, _b;
              return [
                _hoisted_1,
                createVNode(_sfc_main$1, {
                  list: (_b = (_a = unref(store).state) == null ? void 0 : _a.articles) == null ? void 0 : _b.items
                }, null, 8, ["list"])
              ];
            }),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
