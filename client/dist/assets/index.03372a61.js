import { P as Plugin, a as Plugin$1, c as createRouter, b as createWebHistory, N as Notify, L as LoadingBar, d as axios, e as createStore, r as resolveComponent, o as openBlock, f as createBlock, g as createApp, Q as Quasar, h as QEditor, q as quasarLang, G as GlobalEvents } from "./vendor.cde5035b.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations2) => {
    for (const mutation of mutations2) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
const scriptRel = "modulepreload";
const seen = {};
const base = "/";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", rej);
      });
    }
  })).then(() => baseModule());
};
const { VITE_token_name: VITE_token_name$2 } = { "VITE_api_ext_port": "9250", "VITE_erp_ext_port": "8093", "VITE_ksb_ext_port": "8053", "VITE_api_server_name": "77.223.101.127", "VITE_debugging": "0", "VITE_token_name": "base_token", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true };
function isAuth() {
  return Plugin$1.has(VITE_token_name$2);
}
function isStaff() {
  var _a;
  return (_a = Plugin.getItem("user")) == null ? void 0 : _a.is_staff;
}
function canUserAccess(to, from) {
  if (to.meta.requiresAuth) {
    return isAuth();
  }
  if (to.meta.requiresStaff) {
    return isStaff();
  }
  return to.name === "login";
}
function middlewarePipeline(context, middleware, index2 = 0) {
  const nextMiddleware = middleware == null ? void 0 : middleware[index2];
  if (!nextMiddleware) {
    return;
  }
  nextMiddleware(context);
  middlewarePipeline(context, middleware, index2 + 1);
}
const getCommonData = async ({ store: store2 }) => {
  await store2.dispatch("categories/fetchCategories");
  await store2.dispatch("articles/fetchArticles");
};
const setTitle = (title) => {
  const brand = "FAQ \u041C\u0430\u043A\u0440\u043E\u0431\u0430\u043D\u043A";
  document.title = `${title ? title : brand}`;
};
const pages = { "./pages/auto/About.vue": () => true ? __vitePreload(() => import("./About.51e735c4.js"), ["assets/About.51e735c4.js","assets/default.20a2ccec.js","assets/default.532363f2.css","assets/vendor.cde5035b.js","assets/QCard.ada68c8f.js"]) : null, "./pages/auto/Articles.vue": () => true ? __vitePreload(() => import("./Articles.cb8b057d.js"), ["assets/Articles.cb8b057d.js","assets/default.20a2ccec.js","assets/default.532363f2.css","assets/vendor.cde5035b.js","assets/QCard.ada68c8f.js","assets/ArticlesList.9bca4a30.js"]) : null, "./pages/auto/Home.vue": () => true ? __vitePreload(() => import("./Home.40d883f9.js"), ["assets/Home.40d883f9.js","assets/default.20a2ccec.js","assets/default.532363f2.css","assets/vendor.cde5035b.js","assets/QCard.ada68c8f.js"]) : null, "./pages/auto/Search.vue": () => true ? __vitePreload(() => import("./Search.b590dc43.js"), ["assets/Search.b590dc43.js","assets/default.20a2ccec.js","assets/default.532363f2.css","assets/vendor.cde5035b.js","assets/QCard.ada68c8f.js","assets/ArticlesList.9bca4a30.js"]) : null, "./pages/auto/login.vue": () => true ? __vitePreload(() => import("./login.fd6c2be4.js"), ["assets/login.fd6c2be4.js","assets/QCard.ada68c8f.js","assets/vendor.cde5035b.js"]) : null };
let meta = {
  home: {
    requiresAuth: true,
    middleware: [getCommonData]
  },
  about: {
    requiresAuth: true
  },
  search: {
    requiresAuth: true,
    props: true
  },
  articles: {
    requiresAuth: true,
    middleware: [getCommonData]
  }
};
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase().slice(1).split("/")[1];
  return {
    path: name === "home" ? "/" : "/" + name,
    name,
    component: pages[path],
    meta: meta[name]
  };
});
routes.push({
  name: "article",
  path: "/article/:slug",
  props: true,
  meta: {
    requiresAuth: true
  },
  component: () => __vitePreload(() => import("./Article.5b7f7edd.js"), true ? ["assets/Article.5b7f7edd.js","assets/vendor.cde5035b.js","assets/default.20a2ccec.js","assets/default.532363f2.css","assets/QCard.ada68c8f.js","assets/ArticleDelete.4bc929e6.js","assets/article.c2c2b760.js"] : void 0)
}, {
  name: "category",
  path: "/category/:slug",
  props: true,
  meta: {
    requiresAuth: true
  },
  component: () => __vitePreload(() => import("./Category.7975a274.js"), true ? ["assets/Category.7975a274.js","assets/vendor.cde5035b.js","assets/default.20a2ccec.js","assets/default.532363f2.css","assets/QCard.ada68c8f.js","assets/ArticlesList.9bca4a30.js"] : void 0)
}, {
  name: "article-edit",
  path: "/article/edit/:slug",
  props: true,
  meta: {
    requiresStaff: true
  },
  component: () => __vitePreload(() => import("./ArticleEdit.30f7476a.js"), true ? ["assets/ArticleEdit.30f7476a.js","assets/ArticleTpl.1bb5b193.js","assets/QCard.ada68c8f.js","assets/vendor.cde5035b.js","assets/default.20a2ccec.js","assets/default.532363f2.css","assets/article.c2c2b760.js","assets/ArticleDelete.4bc929e6.js"] : void 0)
}, {
  name: "article-add",
  path: "/article/add",
  meta: {
    requiresStaff: true
  },
  component: () => __vitePreload(() => import("./ArticleAdd.ce20bc3f.js"), true ? ["assets/ArticleAdd.ce20bc3f.js","assets/ArticleTpl.1bb5b193.js","assets/QCard.ada68c8f.js","assets/vendor.cde5035b.js","assets/default.20a2ccec.js","assets/default.532363f2.css","assets/article.c2c2b760.js"] : void 0)
}, {
  path: "/:catchAll(.*)*",
  meta: {
    requiresAuth: true
  },
  component: () => __vitePreload(() => import("./Error404.afd9f5dc.js"), true ? ["assets/Error404.afd9f5dc.js","assets/vendor.cde5035b.js"] : void 0)
});
function routerGuard(router2, store2) {
  router2.beforeEach((to, from, next) => {
    var _a;
    const middleware = (_a = to.meta) == null ? void 0 : _a.middleware;
    const context = { to, from, next, store: store2 };
    const canAccess = canUserAccess(to);
    if (canAccess) {
      middlewarePipeline(context, middleware);
      next();
    } else {
      next({ name: "login", query: { from: to.fullPath } });
    }
  });
}
function router$1() {
  return createRouter({
    history: createWebHistory(),
    routes
  });
}
function state$2() {
  return {
    user: {
      username: {}
    }
  };
}
function saveUser(state2, payload) {
  state2.user = payload;
}
var mutations$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  saveUser
});
function someAction() {
}
var actions$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  someAction
});
function someGetter$1() {
}
var getters$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  someGetter: someGetter$1
});
function state$1() {
  return {
    items: [],
    current_article: {},
    saveSearchResult: [],
    current_articles_by_category: [],
    settings: []
  };
}
function someGetter() {
}
var getters$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  someGetter
});
function saveSearchResult(state2, payload) {
  console.log(payload);
  state2.saveSearchResult = payload;
}
function saveSettings(state2, payload) {
  console.log(payload.response);
  state2.settings = payload.response;
}
function saveArticlesByCategory(state2, payload) {
  console.log(payload);
  state2.current_articles_by_category = payload.response;
}
function saveArticles(state2, payload) {
  console.log(payload);
  state2.items = payload;
}
function saveArticle$1(state2, payload) {
  console.log(payload);
  state2.current_article = payload.response;
}
var mutations$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  saveSearchResult,
  saveSettings,
  saveArticlesByCategory,
  saveArticles,
  saveArticle: saveArticle$1
});
function tryCatch(handler) {
  return (target, propertyKey, propertyDescriptor) => {
    const originalMethod = propertyDescriptor.value;
    const $propertyDescriptor = propertyDescriptor;
    if (originalMethod) {
      $propertyDescriptor.value = async function setDesc(arg) {
        try {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return await originalMethod.apply(this, args);
        } catch (err) {
          return handler(err);
        }
      };
    }
    return $propertyDescriptor;
  };
}
const { VITE_token_name: VITE_token_name$1 } = { "VITE_api_ext_port": "9250", "VITE_erp_ext_port": "8093", "VITE_ksb_ext_port": "8053", "VITE_api_server_name": "77.223.101.127", "VITE_debugging": "0", "VITE_token_name": "base_token", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true };
function goToArticle(router2, slug) {
  router2.push({ name: "article", params: { slug } });
}
const logout = () => {
  Plugin$1.remove(VITE_token_name$1);
  Plugin.remove("user");
  document.location.reload();
};
const myNotify = (error) => {
  var _a, _b;
  console.log(error.response.data);
  console.log(error.response.status);
  let { data, status } = error.response;
  let errorRequest = error.request;
  if (error.response) {
    Notify.create({
      message: (_a = JSON.stringify(data)) != null ? _a : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"
    });
    loadingBarStop();
  } else if (errorRequest) {
    Notify.create({
      message: (_b = JSON.stringify(data)) != null ? _b : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"
    });
    loadingBarStop();
    console.log(errorRequest);
  } else {
    Notify.create({
      message: JSON.stringify(error)
    });
    console.log("Error", error.message);
    loadingBarStop();
  }
  console.log(error.config);
  loadingBarStop();
  if (status == 401) {
    logout();
  }
};
function loadingBarStop() {
  LoadingBar.stop();
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const { VITE_token_name, VITE_api_server_name, VITE_api_ext_port } = { "VITE_api_ext_port": "9250", "VITE_erp_ext_port": "8093", "VITE_ksb_ext_port": "8053", "VITE_api_server_name": "77.223.101.127", "VITE_debugging": "0", "VITE_token_name": "base_token", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true };
class Transport {
  constructor() {
    this.token = Plugin$1.get(VITE_token_name);
    this.transport = axios.create({
      baseURL: `http://${VITE_api_server_name}:${VITE_api_ext_port}/api/`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  authorize() {
    this.transport.defaults.headers.Authorization = `token ${this.token}`;
  }
  before() {
    LoadingBar.start();
  }
  after() {
    LoadingBar.stop();
  }
  async get(arg) {
    this.before();
    let resp = await this.transport.get(arg);
    this.after();
    return resp;
  }
  async post(arg, params) {
    this.before();
    let resp = await this.transport.post(arg, params);
    this.after();
    return resp;
  }
  async put(arg, params) {
    this.authorize();
    this.before();
    let resp = await this.transport.put(arg, params);
    this.after();
    return resp;
  }
  async patch(arg, params) {
    this.authorize();
    this.before();
    let resp = await this.transport.patch(arg, params);
    this.after();
    return resp;
  }
  async delete(arg) {
    this.authorize();
    this.before();
    let resp = await this.transport.delete(arg);
    this.after();
    return resp;
  }
}
__decorateClass([
  tryCatch(myNotify)
], Transport.prototype, "get", 1);
__decorateClass([
  tryCatch(myNotify)
], Transport.prototype, "post", 1);
__decorateClass([
  tryCatch(myNotify)
], Transport.prototype, "put", 1);
__decorateClass([
  tryCatch(myNotify)
], Transport.prototype, "patch", 1);
__decorateClass([
  tryCatch(myNotify)
], Transport.prototype, "delete", 1);
async function filterArticles(context, str) {
  let transport = new Transport();
  transport.authorize();
  let response = await transport.get(`articles/filter/?body__in=${str}`);
  context.commit("saveSearchResult", response.data);
}
async function fetchArticles(context) {
  let transport = new Transport();
  transport.authorize();
  let response = await transport.get(`articles`);
  context.commit("saveArticles", response.data);
}
async function fetchArticle(context, slug) {
  let transport = new Transport();
  transport.authorize();
  let response = await transport.get(`articles/${slug}/`);
  context.commit("saveArticle", response.data);
}
async function saveArticle(context, article) {
  let transport = new Transport();
  return await transport.patch(`articles/update/${article.id}/`, article);
}
async function createArticle(context, article) {
  let transport = new Transport();
  return await transport.put(`articles/create/`, article);
}
async function deleteArticle(context, id) {
  let transport = new Transport();
  return await transport.delete(`articles/delete/${id}/`);
}
async function fetchSettings(context) {
  let transport = new Transport();
  transport.authorize();
  let response = await transport.get(`articles/settings/`);
  context.commit("saveSettings", response.data);
  return response;
}
var actions$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  filterArticles,
  fetchArticles,
  fetchArticle,
  saveArticle,
  createArticle,
  deleteArticle,
  fetchSettings
});
var articles = {
  namespaced: true,
  getters: getters$1,
  mutations: mutations$1,
  actions: actions$1,
  state: state$1
};
function state() {
  return {
    list: [],
    currCategory: {},
    fullPath: []
  };
}
const brCrumbs = (store2) => () => {
  var _a;
  let category = store2.state.categories.fullPath;
  let arr = [];
  (_a = category.ancestors) == null ? void 0 : _a.forEach((el) => {
    arr.push(el);
  });
  arr.push(category);
  return arr;
};
var getters = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  brCrumbs
});
function saveCategories(state2, payload) {
  console.log(payload);
  state2.list = payload.response;
}
function saveCategory(state2, payload) {
  console.log(payload);
  state2.currCategory = payload.response;
}
function saveCategoryBrCrumbs(state2, payload) {
  console.log(payload);
  state2.fullPath = payload.response;
}
var mutations = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  saveCategories,
  saveCategory,
  saveCategoryBrCrumbs
});
async function fetchCategories(context) {
  let transport = new Transport();
  transport.authorize();
  let response = await transport.get(`categories/list/`);
  context.commit("saveCategories", response.data);
}
async function fetchArticlesByCategory(context, slug) {
  let transport = new Transport();
  transport.authorize();
  let response = await transport.get(`categories/${slug}/`);
  context.commit("articles/saveArticlesByCategory", response.data, { root: true });
  return response.data;
}
async function fetchCategory(context, slug) {
  let transport = new Transport();
  transport.authorize();
  let response = await transport.get(`categories/only/${slug}/`);
  context.commit("saveCategory", response.data);
  return response.data;
}
async function fetchCategoryBrCrumbs(context, slug) {
  let transport = new Transport();
  transport.authorize();
  let response = await transport.get(`categories/slug/${slug}/`);
  context.commit("saveCategoryBrCrumbs", response.data);
  return response.data;
}
var actions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  fetchCategories,
  fetchArticlesByCategory,
  fetchCategory,
  fetchCategoryBrCrumbs
});
var categories = {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
};
const { VITE_debugging } = { "VITE_api_ext_port": "9250", "VITE_erp_ext_port": "8093", "VITE_ksb_ext_port": "8053", "VITE_api_server_name": "77.223.101.127", "VITE_debugging": "0", "VITE_token_name": "base_token", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true };
function Store() {
  return createStore({
    mutations: mutations$2,
    state: state$2,
    actions: actions$2,
    getters: getters$2,
    modules: {
      articles,
      categories
    },
    strict: VITE_debugging
  });
}
var robotoFontLatinExt = "";
var materialIcons = "";
var fadeIn = "";
var fadeOut = "";
var index = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(_component_router_view);
}
var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const app = createApp(App);
app.use(Quasar, {
  plugins: {
    Cookies: Plugin$1,
    LoadingBar,
    LocalStorage: Plugin,
    QEditor,
    Notify
  },
  config: {
    loadingBar: {},
    notify: {}
  },
  lang: quasarLang
});
const store = Store();
const router = router$1();
routerGuard(router, store);
app.use(router);
app.use(store);
app.component("GlobalEvents", GlobalEvents);
router.isReady().then(() => {
  app.mount("#app");
});
export { Transport as T, _export_sfc as _, isAuth as a, brCrumbs as b, goToArticle as g, isStaff as i, logout as l, setTitle as s };
