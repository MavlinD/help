var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { j as createComponent, aC as useRouterLinkProps, aS as useRouterLink, m as computed, n as h, Z as QIcon, K as hMergeSlot, aM as useAlignProps, aN as useAlign, aT as getNormalizedVNodes, s as hSlot, T as useStore, v as watch, x as onMounted, o as openBlock, f as createBlock, w as withCtx, V as createVNode, aw as createElementBlock, ax as renderList, Y as unref, az as Fragment, i as createBaseVNode, a5 as toDisplayString } from "./vendor.cde5035b.js";
import { _ as _sfc_main$1 } from "./default.2a98e496.js";
import { _ as _sfc_main$2 } from "./ArticlesList.ac2cc564.js";
import { b as brCrumbs, s as setTitle } from "./index.2a47d4c3.js";
import "./QCard.ada68c8f.js";
var QBreadcrumbsEl = createComponent({
  name: "QBreadcrumbsEl",
  props: __spreadProps(__spreadValues({}, useRouterLinkProps), {
    label: String,
    icon: String,
    tag: {
      type: String,
      default: "span"
    }
  }),
  setup(props, { slots }) {
    const { linkTag, linkProps, hasLink, navigateToLink } = useRouterLink();
    const data = computed(() => {
      const acc = __spreadValues({}, linkProps.value);
      if (hasLink.value === true) {
        acc.onClick = navigateToLink;
      }
      return acc;
    });
    const iconClass = computed(() => "q-breadcrumbs__el-icon" + (props.label !== void 0 ? " q-breadcrumbs__el-icon--with-label" : ""));
    return () => {
      const child = [];
      props.icon !== void 0 && child.push(h(QIcon, {
        class: iconClass.value,
        name: props.icon
      }));
      props.label !== void 0 && child.push(props.label);
      return h(linkTag.value, __spreadValues({
        class: "q-breadcrumbs__el q-link flex inline items-center relative-position"
      }, data.value), hMergeSlot(slots.default, child));
    };
  }
});
var QBreadcrumbs = createComponent({
  name: "QBreadcrumbs",
  props: __spreadProps(__spreadValues({}, useAlignProps), {
    separator: {
      type: String,
      default: "/"
    },
    separatorColor: String,
    activeColor: {
      type: String,
      default: "primary"
    },
    gutter: {
      type: String,
      validator: (v) => ["none", "xs", "sm", "md", "lg", "xl"].includes(v),
      default: "sm"
    }
  }),
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(() => `flex items-center ${alignClass.value}${props.gutter === "none" ? "" : ` q-gutter-${props.gutter}`}`);
    const sepClass = computed(() => props.separatorColor ? ` text-${props.separatorColor}` : "");
    const activeClass = computed(() => `text-${props.activeColor}`);
    return () => {
      const vnodes = getNormalizedVNodes(hSlot(slots.default));
      if (vnodes === void 0) {
        return;
      }
      let els = 1;
      const child = [], len = vnodes.filter((c) => c.type !== void 0 && c.type.name === "QBreadcrumbsEl").length, separator = slots.separator !== void 0 ? slots.separator : () => props.separator;
      vnodes.forEach((comp) => {
        if (comp.type !== void 0 && comp.type.name === "QBreadcrumbsEl") {
          const middle = els < len;
          els++;
          child.push(h("div", {
            class: "flex items-center " + (middle === true ? activeClass.value : "q-breadcrumbs--last")
          }, [comp]));
          if (middle === true) {
            child.push(h("div", {
              class: "q-breadcrumbs__separator" + sepClass.value
            }, separator()));
          }
        } else {
          child.push(comp);
        }
      });
      return h("div", {
        class: "q-breadcrumbs"
      }, [
        h("div", { class: classes.value }, child)
      ]);
    };
  }
});
const _hoisted_1 = { class: "q-ml-xl text-primary" };
const _sfc_main = {
  props: {
    slug: String
  },
  setup(__props) {
    const props = __props;
    let store = useStore();
    let articles = computed(() => {
      var _a;
      return (_a = store.state) == null ? void 0 : _a.articles.current_articles_by_category;
    });
    let category = computed(() => {
      var _a;
      return (_a = store.state.categories) == null ? void 0 : _a.currCategory;
    });
    let categoryBrCrumb = computed(brCrumbs(store));
    async function getData(slug) {
      await store.dispatch("categories/fetchArticlesByCategory", slug);
      await store.dispatch("categories/fetchCategoryBrCrumbs", slug);
      await store.dispatch("categories/fetchCategory", slug);
      setTitle(`\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F ${category.value.id}`);
    }
    watch(() => props == null ? void 0 : props.slug, async (slug) => getData(slug));
    onMounted(async () => {
      await getData(props == null ? void 0 : props.slug);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, null, {
        default: withCtx(() => {
          var _a;
          return [
            createVNode(QBreadcrumbs, { class: "q-pt-lg q-ml-xl" }, {
              separator: withCtx(() => [
                createVNode(QIcon, {
                  size: "1.5em",
                  name: "chevron_right",
                  color: "primary"
                })
              ]),
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(categoryBrCrumb), (crumb) => {
                  return openBlock(), createBlock(QBreadcrumbsEl, {
                    key: crumb.id,
                    label: crumb.label,
                    icon: crumb.icon,
                    to: { name: "category", params: { slug: crumb.slug } }
                  }, null, 8, ["label", "icon", "to"]);
                }), 128))
              ]),
              _: 1
            }),
            createBaseVNode("h1", _hoisted_1, "\u0421\u0442\u0430\u0442\u044C\u0438 \u043F\u043E " + toDisplayString((_a = unref(category)) == null ? void 0 : _a.label), 1),
            createVNode(_sfc_main$2, { list: unref(articles) }, null, 8, ["list"])
          ];
        }),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
