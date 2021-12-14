import { T as useStore, S as useRouter, r as resolveComponent, o as openBlock, aw as createElementBlock, ax as renderList, f as createBlock, w as withCtx, V as createVNode, a4 as QItemSection, i as createBaseVNode, a6 as createTextVNode, a5 as toDisplayString, Y as unref, aL as moment, a3 as QItem, az as Fragment } from "./vendor.cde5035b.js";
import { a as QList } from "./default.303b1b83.js";
const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("span", null, "\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430", -1);
const _sfc_main = {
  props: {
    list: Array
  },
  setup(__props) {
    useStore();
    useRouter();
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(true), createElementBlock(Fragment, null, renderList(__props.list, (item) => {
        return openBlock(), createBlock(QList, {
          key: item == null ? void 0 : item.id
        }, {
          default: withCtx(() => [
            createVNode(QItem, null, {
              default: withCtx(() => [
                createVNode(QItemSection, null, {
                  default: withCtx(() => [
                    createVNode(_component_router_link, {
                      to: { name: "article", params: { slug: item == null ? void 0 : item.slug } }
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("span", {
                          innerHTML: item == null ? void 0 : item.title
                        }, null, 8, _hoisted_1)
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ]),
                  _: 2
                }, 1024),
                createVNode(QItemSection, {
                  side: "",
                  top: ""
                }, {
                  default: withCtx(() => [
                    _hoisted_2,
                    createTextVNode(" " + toDisplayString(unref(moment)(item.updated).format("DD MMM YYYY")), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1024);
      }), 128);
    };
  }
};
export { _sfc_main as _ };
