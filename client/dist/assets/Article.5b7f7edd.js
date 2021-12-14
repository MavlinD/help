import { T as useStore, v as watch, m as computed, x as onMounted, o as openBlock, f as createBlock, w as withCtx, V as createVNode, i as createBaseVNode, Y as unref, a5 as toDisplayString, aL as moment, W as QBtn, X as createCommentVNode } from "./vendor.cde5035b.js";
import { _ as _sfc_main$1, Q as QPage } from "./default.20a2ccec.js";
import { _ as _sfc_main$2 } from "./ArticleDelete.4bc929e6.js";
import { s as setTitle, i as isStaff } from "./index.03372a61.js";
import "./QCard.ada68c8f.js";
import "./article.c2c2b760.js";
const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { class: "row q-gutter-lg" };
const _hoisted_3 = ["innerHTML"];
const _sfc_main = {
  props: {
    slug: String
  },
  setup(__props) {
    const props = __props;
    let store = useStore();
    watch(() => props == null ? void 0 : props.slug, async (slug) => {
      await store.dispatch("articles/fetchArticle", slug);
    });
    let article = computed(() => {
      var _a;
      return (_a = store.state) == null ? void 0 : _a.articles.current_article;
    });
    onMounted(async () => {
      var _a, _b;
      await store.dispatch("articles/fetchArticle", props == null ? void 0 : props.slug);
      setTitle(`\u0421\u0442\u0430\u0442\u044C\u044F \u2116${(_b = (_a = store.state) == null ? void 0 : _a.articles.current_article) == null ? void 0 : _b.id}`);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, null, {
        default: withCtx(() => [
          createVNode(QPage, { class: "q-pa-lg" }, {
            default: withCtx(() => {
              var _a, _b, _c, _d;
              return [
                createBaseVNode("h2", {
                  class: "q-ml-xl text-brown",
                  innerHTML: (_a = unref(article)) == null ? void 0 : _a.title
                }, null, 8, _hoisted_1),
                createBaseVNode("p", null, toDisplayString(unref(moment)((_b = unref(article)) == null ? void 0 : _b.updated).format("DD MMMM YYYY")) + " \u0433\u043E\u0434\u0430", 1),
                createBaseVNode("div", _hoisted_2, [
                  unref(isStaff)() ? (openBlock(), createBlock(QBtn, {
                    key: 0,
                    class: "col-2",
                    to: { name: "article-edit", params: { slug: __props.slug } },
                    push: "",
                    icon: "edit",
                    color: "blue",
                    label: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
                  }, null, 8, ["to"])) : createCommentVNode("", true),
                  createVNode(_sfc_main$2, {
                    id: (_c = unref(article)) == null ? void 0 : _c.id,
                    class: "col-3"
                  }, null, 8, ["id"])
                ]),
                createBaseVNode("p", {
                  innerHTML: (_d = unref(article)) == null ? void 0 : _d.body
                }, null, 8, _hoisted_3)
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
