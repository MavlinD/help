var __defProp = Object.defineProperty;
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
import { n as h, j as createComponent, aQ as useSpinnerProps, aR as useSpinner, J as reactive, x as onMounted, N as Notify, T as useStore, E as ref, m as computed } from "./vendor.cde5035b.js";
import { s as setTitle, g as goToArticle } from "./index.2a47d4c3.js";
const svg = [
  h("g", {
    transform: "translate(20 50)"
  }, [
    h("rect", {
      x: "-10",
      y: "-30",
      width: " 20",
      height: "60",
      fill: "currentColor",
      opacity: "0.6"
    }, [
      h("animateTransform", {
        attributeName: "transform",
        type: "scale",
        from: "2",
        to: "1",
        begin: "0s",
        repeatCount: "indefinite",
        dur: "1s",
        calcMode: "spline",
        keySplines: "0.1 0.9 0.4 1",
        keyTimes: "0;1",
        values: "2;1"
      })
    ])
  ]),
  h("g", {
    transform: "translate(50 50)"
  }, [
    h("rect", {
      x: "-10",
      y: "-30",
      width: " 20",
      height: "60",
      fill: "currentColor",
      opacity: "0.8"
    }, [
      h("animateTransform", {
        attributeName: "transform",
        type: "scale",
        from: "2",
        to: "1",
        begin: "0.1s",
        repeatCount: "indefinite",
        dur: "1s",
        calcMode: "spline",
        keySplines: "0.1 0.9 0.4 1",
        keyTimes: "0;1",
        values: "2;1"
      })
    ])
  ]),
  h("g", {
    transform: "translate(80 50)"
  }, [
    h("rect", {
      x: "-10",
      y: "-30",
      width: " 20",
      height: "60",
      fill: "currentColor",
      opacity: "0.9"
    }, [
      h("animateTransform", {
        attributeName: "transform",
        type: "scale",
        from: "2",
        to: "1",
        begin: "0.2s",
        repeatCount: "indefinite",
        dur: "1s",
        calcMode: "spline",
        keySplines: "0.1 0.9 0.4 1",
        keyTimes: "0;1",
        values: "2;1"
      })
    ])
  ])
];
var QSpinnerFacebook = createComponent({
  name: "QSpinnerFacebook",
  props: useSpinnerProps,
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value,
      width: cSize.value,
      height: cSize.value,
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid"
    }, svg);
  }
});
function scope() {
  let store = useStore();
  let article = ref();
  let category = ref();
  let submitting = ref();
  let categories = computed(() => {
    var _a;
    return (_a = store.state.categories) == null ? void 0 : _a.list;
  });
  return {
    store,
    article,
    category,
    categories,
    submitting
  };
}
const editArticle = (slug) => {
  let { store, article, category, categories, submitting } = scope();
  onMounted(async () => {
    var _a, _b;
    await store.dispatch("articles/fetchArticle", slug);
    await store.dispatch("categories/fetchCategories");
    article.value = (_a = store.state) == null ? void 0 : _a.articles.current_article;
    category.value = categories.value.find((el) => el.id === article.value.category);
    setTitle(`\u0421\u0442\u0430\u0442\u044C\u044F \u2116${(_b = article.value) == null ? void 0 : _b.id} | Up`);
  });
  async function saveArticle(state, btnStateChange) {
    submitting.value = true;
    let response = await store.dispatch("articles/saveArticle", __spreadValues({ id: article.value.id }, state));
    submitting.value = false;
    if ((response == null ? void 0 : response.status) === 200) {
      if (btnStateChange instanceof Function) {
        btnStateChange(false);
      }
      Notify.create({
        message: "\u0421\u0442\u0430\u0442\u044C\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",
        color: "green",
        textColor: "white",
        timeout: 3 * 1e3
      });
    }
  }
  return reactive({
    article,
    category,
    saveArticle,
    submitting
  });
};
const addArticle = (router) => {
  let { store, article, category, submitting } = scope();
  onMounted(async () => {
    await store.dispatch("categories/fetchCategories");
    setTitle(`\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E`);
  });
  async function createArticle(state, btnStateChange) {
    submitting.value = true;
    let response = await store.dispatch("articles/createArticle", state);
    submitting.value = false;
    if ((response == null ? void 0 : response.status) === 201) {
      if (btnStateChange instanceof Function) {
        btnStateChange(false);
      }
      Notify.create({
        message: "\u0421\u0442\u0430\u0442\u044C\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",
        color: "brown",
        textColor: "white",
        actions: [
          {
            label: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0441\u0442\u0430\u0442\u044C\u0435",
            icon: "article",
            color: "white",
            handler: () => {
              goToArticle(router, response.data.slug);
            }
          },
          {
            icon: "close",
            color: "white"
          }
        ],
        timeout: 5 * 1e3
      });
    }
  }
  return reactive({
    article,
    category,
    submitting,
    createArticle
  });
};
const deleteArticle = (router) => {
  let { store, article, category, submitting } = scope();
  async function removeArticle(id) {
    submitting.value = true;
    let response = await store.dispatch("articles/deleteArticle", id);
    submitting.value = false;
    if ((response == null ? void 0 : response.status) === 204) {
      await router.push({ name: "articles" });
      Notify.create({
        message: "\u0421\u0442\u0430\u0442\u044C\u044F \u0443\u0434\u0430\u043B\u0435\u043D\u0430",
        color: "brown",
        textColor: "white",
        timeout: 3 * 1e3
      });
    }
  }
  return reactive({
    article,
    category,
    submitting,
    removeArticle
  });
};
export { QSpinnerFacebook as Q, addArticle as a, deleteArticle as d, editArticle as e };
