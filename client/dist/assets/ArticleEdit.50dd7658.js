import { _ as _sfc_main$1 } from "./ArticleTpl.93ff35a0.js";
import { _ as _sfc_main$2 } from "./ArticleDelete.c1e6b54b.js";
import { e as editArticle } from "./article.93dd708f.js";
import { aP as toRefs, o as openBlock, f as createBlock, w as withCtx, Y as unref, V as createVNode, i as createBaseVNode } from "./vendor.cde5035b.js";
import "./QCard.ada68c8f.js";
import "./default.303b1b83.js";
import "./index.ce202132.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h2", { class: "q-ml-xl text-primary" }, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u044C\u0438", -1);
const _sfc_main = {
  props: {
    slug: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    let { article, category, saveArticle, submitting } = toRefs(editArticle(props.slug));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        key: unref(article),
        article: unref(article),
        category: unref(category),
        submit: unref(saveArticle)
      }, {
        header: withCtx(() => [
          _hoisted_1
        ]),
        delete: withCtx(() => {
          var _a;
          return [
            createVNode(_sfc_main$2, {
              id: (_a = unref(article)) == null ? void 0 : _a.id
            }, null, 8, ["id"])
          ];
        }),
        _: 1
      }, 8, ["article", "category", "submit"]);
    };
  }
};
export { _sfc_main as default };