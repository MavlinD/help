import { _ as _sfc_main$1 } from "./ArticleTpl.4dcd4fc7.js";
import { a as addArticle } from "./article.81512707.js";
import { S as useRouter, aP as toRefs, o as openBlock, f as createBlock, Y as unref } from "./vendor.cde5035b.js";
import "./QCard.ada68c8f.js";
import "./default.2881da31.js";
import "./index.af3c6d86.js";
const _sfc_main = {
  setup(__props) {
    let router = useRouter();
    let { article, createArticle, submitting } = toRefs(addArticle(router));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        key: unref(article),
        article: unref(article),
        submit: unref(createArticle),
        submitting: unref(submitting)
      }, null, 8, ["article", "submit", "submitting"]);
    };
  }
};
export { _sfc_main as default };