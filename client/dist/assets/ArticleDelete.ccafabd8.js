import { d as deleteArticle, Q as QSpinnerFacebook } from "./article.6046ca39.js";
import { S as useRouter, aP as toRefs, Y as unref, o as openBlock, f as createBlock, w as withCtx, V as createVNode, W as QBtn, X as createCommentVNode } from "./vendor.cde5035b.js";
import { i as isStaff } from "./index.bee85546.js";
const _sfc_main = {
  props: {
    id: Number
  },
  setup(__props) {
    const props = __props;
    let router = useRouter();
    let { article, category, removeArticle, submitting } = toRefs(deleteArticle(router));
    return (_ctx, _cache) => {
      return unref(isStaff)() ? (openBlock(), createBlock(QBtn, {
        key: 0,
        class: "col-md-2",
        push: "",
        icon: "delete",
        loading: unref(submitting),
        style: { "background": "goldenrod", "color": "white" },
        label: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
        onClick: _cache[0] || (_cache[0] = ($event) => unref(removeArticle)(unref(props).id))
      }, {
        loading: withCtx(() => [
          createVNode(QSpinnerFacebook)
        ]),
        _: 1
      }, 8, ["loading"])) : createCommentVNode("", true);
    };
  }
};
export { _sfc_main as _ };
