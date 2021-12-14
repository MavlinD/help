import { Q as QPage, _ as _sfc_main$2 } from "./default.20a2ccec.js";
import { s as setTitle } from "./index.03372a61.js";
import { _ as _sfc_main$1 } from "./ArticlesList.9bca4a30.js";
import { T as useStore, S as useRouter, x as onMounted, o as openBlock, f as createBlock, w as withCtx, V as createVNode, Y as unref, i as createBaseVNode } from "./vendor.cde5035b.js";
import "./QCard.ada68c8f.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h2", { class: "text-primary" }, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430", -1);
const _sfc_main = {
  props: {
    query: String
  },
  setup(__props) {
    setTitle("\u041F\u043E\u0438\u0441\u043A");
    let store = useStore();
    let router = useRouter();
    onMounted(async () => {
      var _a, _b;
      let queryStr = (_b = (_a = router.currentRoute.value) == null ? void 0 : _a.query) == null ? void 0 : _b.q;
      if (queryStr) {
        await store.dispatch("articles/filterArticles", queryStr);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$2, null, {
        default: withCtx(() => [
          createVNode(QPage, { class: "q-pl-xl" }, {
            default: withCtx(() => {
              var _a, _b;
              return [
                _hoisted_1,
                createVNode(_sfc_main$1, {
                  list: (_b = (_a = unref(store).state) == null ? void 0 : _a.articles) == null ? void 0 : _b.saveSearchResult
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
