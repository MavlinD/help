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
import { b as QCardSection, Q as QInput, a as QCard } from "./QCard.ada68c8f.js";
import { j as createComponent, E as ref, u as provide, x as onMounted, n as h, s as hSlot, t as getCurrentInstance, ah as stopAndPrevent, H as nextTick, aH as addFocusFn, aF as formKey, aM as useAlignProps, aN as useAlign, m as computed, U as useQuasar, S as useRouter, aO as useRoute, J as reactive, o as openBlock, aw as createElementBlock, i as createBaseVNode, V as createVNode, w as withCtx, $ as isRef, Y as unref, Z as QIcon, W as QBtn } from "./vendor.cde5035b.js";
import { s as setTitle, T as Transport } from "./index.2a47d4c3.js";
var QForm = createComponent({
  name: "QForm",
  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,
    onSubmit: Function
  },
  emits: ["reset", "validation-success", "validation-error"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);
    let validateIndex = 0;
    const registeredComponents = [];
    function validate(shouldFocus) {
      const promises = [];
      const focus2 = typeof shouldFocus === "boolean" ? shouldFocus : props.noErrorFocus !== true;
      validateIndex++;
      const emitEvent = (res, ref2) => {
        emit("validation-" + (res === true ? "success" : "error"), ref2);
      };
      for (let i = 0; i < registeredComponents.length; i++) {
        const comp = registeredComponents[i];
        const valid = comp.validate();
        if (typeof valid.then === "function") {
          promises.push(valid.then((valid2) => ({ valid: valid2, comp }), (error) => ({ valid: false, comp, error })));
        } else if (valid !== true) {
          if (props.greedy === false) {
            emitEvent(false, comp);
            if (focus2 === true && typeof comp.focus === "function") {
              comp.focus();
            }
            return Promise.resolve(false);
          }
          promises.push({ valid: false, comp });
        }
      }
      if (promises.length === 0) {
        emitEvent(true);
        return Promise.resolve(true);
      }
      const index = validateIndex;
      return Promise.all(promises).then((res) => {
        if (index === validateIndex) {
          const errors = res.filter((r) => r.valid !== true);
          if (errors.length === 0) {
            emitEvent(true);
            return true;
          }
          const { valid, comp } = errors[0];
          emitEvent(false, comp);
          if (focus2 === true && valid !== true && typeof comp.focus === "function") {
            comp.focus();
          }
          return false;
        }
      });
    }
    function resetValidation() {
      validateIndex++;
      registeredComponents.forEach((comp) => {
        typeof comp.resetValidation === "function" && comp.resetValidation();
      });
    }
    function submit(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      validate().then((val) => {
        if (val === true) {
          if (props.onSubmit !== void 0) {
            emit("submit", evt);
          } else if (evt !== void 0 && evt.target !== void 0 && typeof evt.target.submit === "function") {
            evt.target.submit();
          }
        }
      });
    }
    function reset(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      emit("reset");
      nextTick(() => {
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }
    function focus() {
      addFocusFn(() => {
        if (rootRef.value === null) {
          return;
        }
        const target = rootRef.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(rootRef.value.querySelectorAll("[tabindex]"), (el) => el.tabIndex > -1);
        target !== null && target !== void 0 && target.focus();
      });
    }
    provide(formKey, {
      bindComponent(vmProxy) {
        registeredComponents.push(vmProxy);
      },
      unbindComponent(vmProxy) {
        const index = registeredComponents.indexOf(vmProxy);
        if (index > -1) {
          registeredComponents.splice(index, 1);
        }
      }
    });
    onMounted(() => {
      props.autofocus === true && focus();
    });
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });
    return () => h("form", {
      class: "q-form",
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default));
  }
});
var QCardActions = createComponent({
  name: "QCardActions",
  props: __spreadProps(__spreadValues({}, useAlignProps), {
    vertical: Boolean
  }),
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(() => `q-card__actions ${alignClass.value} q-card__actions--${props.vertical === true ? "vert column" : "horiz row"}`);
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const _hoisted_1 = { class: "fullscreen bg-blue text-white text-center q-pa-md flex flex-center" };
const _hoisted_2 = { class: "column q-pa-lg" };
const _hoisted_3 = { class: "row" };
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("h4", { class: "text-h5 text-white q-my-md" }, "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F", -1);
const _sfc_main = {
  setup(__props) {
    const $q = useQuasar();
    let router = useRouter();
    let route = useRoute();
    const {
      VITE_username: usernameDefault,
      VITE_token_name,
      VITE_password: passwordDefault
    } = { "VITE_api_ext_port": "9250", "VITE_api_server_name": "0.0.0.0", "VITE_debugging": "1", "VITE_token_name": "token", "VITE_username": "root", "VITE_password": "Macro3+%=()", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true };
    const state = reactive({
      username: usernameDefault,
      password: passwordDefault,
      passwordFieldType: "password",
      visibility: false,
      visibilityIcon: "visibility"
    });
    setTitle(`\u0412\u0445\u043E\u0434`);
    let required = (val) => val && val.length > 0 || "\u041F\u043E\u043B\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E";
    let short = (val) => val && val.length > 3 || "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435";
    let username = ref(0);
    let password = ref(0);
    let submit = async () => {
      password.value.validate();
      if (password.value.hasError) {
        console.warn("\u0432 \u043F\u0430\u0440\u043E\u043B\u0435 \u0435\u0441\u0442\u044C \u043E\u0448\u0438\u0431\u043A\u0438 (");
        return;
      }
      let transport = new Transport();
      let req = await transport.post("rest-auth/login/", {
        username: state.username,
        password: state.password
      });
      let resp = req.data;
      $q.cookies.set(VITE_token_name, resp.key, { expires: 10 });
      $q.localStorage.set("user", resp);
      await router.replace({ path: String(route.query.from) });
    };
    let switchVisibility = () => {
      state.visibility = !state.visibility;
      state.passwordFieldType = state.visibility ? "text" : "password";
      state.visibilityIcon = state.visibility ? "visibility_off" : "visibility";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QCard, {
              square: "",
              class: "shadow-24",
              style: { "width": "400px", "height": "450px" }
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "bg-deep-purple-7" }, {
                  default: withCtx(() => [
                    _hoisted_4
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QForm, { class: "q-px-sm q-pt-xl" }, {
                      default: withCtx(() => [
                        createVNode(QInput, {
                          ref: (_value, _refs) => {
                            _refs["username"] = _value;
                            isRef(username) ? username.value = _value : username = _value;
                          },
                          modelValue: unref(state).username,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(state).username = $event),
                          square: "",
                          clearable: "",
                          "lazy-rules": "",
                          rules: [unref(required), unref(short)],
                          type: "username",
                          label: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C"
                        }, {
                          prepend: withCtx(() => [
                            createVNode(QIcon, { name: "person" })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "rules"]),
                        createVNode(QInput, {
                          ref: (_value, _refs) => {
                            _refs["password"] = _value;
                            isRef(password) ? password.value = _value : password = _value;
                          },
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(state).password = $event),
                          square: "",
                          clearable: "",
                          type: unref(state).passwordFieldType,
                          "lazy-rules": "",
                          rules: [unref(required), unref(short)],
                          label: "\u041F\u0430\u0440\u043E\u043B\u044C"
                        }, {
                          prepend: withCtx(() => [
                            createVNode(QIcon, { name: "lock" })
                          ]),
                          append: withCtx(() => [
                            createVNode(QIcon, {
                              name: unref(state).visibilityIcon,
                              class: "cursor-pointer",
                              onClick: unref(switchVisibility)
                            }, null, 8, ["name", "onClick"])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "type", "rules"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, { class: "q-px-lg" }, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      unelevated: "",
                      size: "lg",
                      color: "secondary",
                      class: "full-width text-white q-mt-sm",
                      label: "\u0412\u0445\u043E\u0434",
                      onClick: unref(submit)
                    }, null, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
export { _sfc_main as default };
