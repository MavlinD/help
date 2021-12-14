var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value2) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
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
import { j as createComponent, k as inject, l as layoutKey, p as pageContainerKey, m as computed, n as h, s as hSlot, t as getCurrentInstance, u as provide, v as watch, x as onMounted, y as onBeforeUnmount, z as noop, A as getScrollTarget, B as listenOpts, C as getVerticalScrollPosition, D as getHorizontalScrollPosition, E as ref, F as isRuntimeSsrPreHydration, H as nextTick, I as getScrollbarWidth, J as reactive, K as hMergeSlot, M as useDarkProps, O as useDark, R as hUniqueSlot, S as useRouter, T as useStore, U as useQuasar, r as resolveComponent, o as openBlock, f as createBlock, w as withCtx, V as createVNode, W as QBtn, X as createCommentVNode, Y as unref, Z as QIcon, i as createBaseVNode, _ as withKeys, $ as isRef, a0 as QTooltip, a1 as QAvatar, a2 as QMenu, a3 as QItem, a4 as QItemSection, a5 as toDisplayString, a6 as createTextVNode, a7 as withModifiers, a8 as createDirective, a9 as client, aa as leftClick, ab as addEvt, ac as preventDraggable, ad as prevent, ae as stop, af as position, ag as cleanEvt, ah as stopAndPrevent, ai as clearSelection, aj as between, ak as debounce, al as withDirectives, am as setVerticalScrollPosition, an as setHorizontalScrollPosition, ao as History, ap as getEventPath, aq as hasScrollbar, ar as useModelToggleProps, as as useModelToggleEmits, at as useTimeout, au as useModelToggle, av as hDir, aw as createElementBlock, ax as renderList, ay as Ripple, az as Fragment, aA as Transition, aB as shallowReactive, aC as useRouterLinkProps, aD as vShow, aE as renderSlot } from "./vendor.cde5035b.js";
import { Q as QInput, u as uid$1, a as QCard, b as QCardSection } from "./QCard.ada68c8f.js";
import { i as isStaff, l as logout, a as isAuth } from "./index.dc0058ce.js";
var QPage = createComponent({
  name: "QPage",
  props: {
    padding: Boolean,
    styleFn: Function
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey);
    inject(pageContainerKey, () => {
      console.error("QPage needs to be child of QPageContainer");
    });
    const style = computed(() => {
      const offset = ($layout.header.space === true ? $layout.header.size : 0) + ($layout.footer.space === true ? $layout.footer.size : 0);
      if (typeof props.styleFn === "function") {
        const height = $layout.isContainer.value === true ? $layout.containerHeight.value : $q.screen.height;
        return props.styleFn(offset, height);
      }
      return {
        minHeight: $layout.isContainer.value === true ? $layout.containerHeight.value - offset + "px" : $q.screen.height === 0 ? offset !== 0 ? `calc(100vh - ${offset}px)` : "100vh" : $q.screen.height - offset + "px"
      };
    });
    const classes = computed(() => `q-page ${props.padding === true ? " q-layout-padding" : ""}`);
    return () => h("main", {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
var QPageContainer = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, () => {
      console.error("QPageContainer needs to be child of QLayout");
    });
    provide(pageContainerKey, true);
    const style = computed(() => {
      const css = {};
      if ($layout.header.space === true) {
        css.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css;
    });
    return () => h("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
const { passive } = listenOpts;
const axisValues = ["both", "horizontal", "vertical"];
var QScrollObserver = createComponent({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (v) => axisValues.includes(v),
      default: "vertical"
    },
    debounce: [String, Number],
    scrollTarget: {
      default: void 0
    }
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const scroll = {
      position: {
        top: 0,
        left: 0
      },
      direction: "down",
      directionChanged: false,
      delta: {
        top: 0,
        left: 0
      },
      inflectionPoint: {
        top: 0,
        left: 0
      }
    };
    let timer = null, localScrollTarget, parentEl;
    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function emitEvent() {
      timer = null;
      const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
      const left = getHorizontalScrollPosition(localScrollTarget);
      const delta = {
        top: top - scroll.position.top,
        left: left - scroll.position.left
      };
      if (props.axis === "vertical" && delta.top === 0 || props.axis === "horizontal" && delta.left === 0) {
        return;
      }
      const curDir = Math.abs(delta.top) >= Math.abs(delta.left) ? delta.top < 0 ? "up" : "down" : delta.left < 0 ? "left" : "right";
      scroll.position = { top, left };
      scroll.directionChanged = scroll.direction !== curDir;
      scroll.delta = delta;
      if (scroll.directionChanged === true) {
        scroll.direction = curDir;
        scroll.inflectionPoint = scroll.position;
      }
      emit("scroll", __spreadValues({}, scroll));
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
      localScrollTarget.addEventListener("scroll", trigger, passive);
      trigger(true);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", trigger, passive);
        localScrollTarget = void 0;
      }
    }
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (timer === null) {
        timer = props.debounce ? setTimeout(emitEvent, props.debounce) : requestAnimationFrame(emitEvent);
      }
    }
    const vm = getCurrentInstance();
    onMounted(() => {
      parentEl = vm.proxy.$el.parentNode;
      configureScrollTarget();
    });
    onBeforeUnmount(() => {
      clearTimeout(timer);
      cancelAnimationFrame(timer);
      unconfigureScrollTarget();
    });
    Object.assign(vm.proxy, {
      trigger,
      getPosition: () => scroll
    });
    return noop;
  }
});
function useCanRender() {
  const canRender = ref(!isRuntimeSsrPreHydration.value);
  if (canRender.value === false) {
    onMounted(() => {
      canRender.value = true;
    });
  }
  return canRender;
}
const hasObserver = typeof ResizeObserver !== "undefined";
const resizeProps = hasObserver === true ? {} : {
  style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
  url: "about:blank"
};
var QResizeObserver = createComponent({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    let timer, targetEl, size = { width: -1, height: -1 };
    function trigger(now) {
      if (now === true || props.debounce === 0 || props.debounce === "0") {
        onResize();
      } else if (!timer) {
        timer = setTimeout(onResize, props.debounce);
      }
    }
    function onResize() {
      timer = void 0;
      if (targetEl) {
        const { offsetWidth: width, offsetHeight: height } = targetEl;
        if (width !== size.width || height !== size.height) {
          size = { width, height };
          emit("resize", size);
        }
      }
    }
    const vm = getCurrentInstance();
    Object.assign(vm.proxy, { trigger });
    if (hasObserver === true) {
      let observer;
      onMounted(() => {
        nextTick(() => {
          targetEl = vm.proxy.$el.parentNode;
          if (targetEl) {
            observer = new ResizeObserver(trigger);
            observer.observe(targetEl);
            onResize();
          }
        });
      });
      onBeforeUnmount(() => {
        clearTimeout(timer);
        if (observer !== void 0) {
          if (observer.disconnect !== void 0) {
            observer.disconnect();
          } else if (targetEl) {
            observer.unobserve(targetEl);
          }
        }
      });
      return noop;
    } else {
      let cleanup = function() {
        clearTimeout(timer);
        if (curDocView !== void 0) {
          if (curDocView.removeEventListener !== void 0) {
            curDocView.removeEventListener("resize", trigger, listenOpts.passive);
          }
          curDocView = void 0;
        }
      }, onObjLoad = function() {
        cleanup();
        if (targetEl && targetEl.contentDocument) {
          curDocView = targetEl.contentDocument.defaultView;
          curDocView.addEventListener("resize", trigger, listenOpts.passive);
          onResize();
        }
      };
      const canRender = useCanRender();
      let curDocView;
      onMounted(() => {
        nextTick(() => {
          targetEl = vm.proxy.$el;
          targetEl && onObjLoad();
        });
      });
      onBeforeUnmount(cleanup);
      return () => {
        if (canRender.value === true) {
          return h("object", {
            style: resizeProps.style,
            tabindex: -1,
            type: "text/html",
            data: resizeProps.url,
            "aria-hidden": "true",
            onLoad: onObjLoad
          });
        }
      };
    }
  }
});
var QLayout = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());
    const classes = computed(() => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard"));
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scroll-height", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let timer;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (timer !== void 0) {
          clearTimeout(timer);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        timer = setTimeout(() => {
          document.body.classList.remove("q-body--layout-animate");
          timer = void 0;
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
var QToolbarTitle = createComponent({
  name: "QToolbarTitle",
  props: {
    shrink: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(() => "q-toolbar__title ellipsis" + (props.shrink === true ? " col-shrink" : ""));
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const space = h("div", { class: "q-space" });
var QSpace = createComponent({
  name: "QSpace",
  setup() {
    return () => space;
  }
});
const insetMap = {
  true: "inset",
  item: "item-inset",
  "item-thumbnail": "item-thumbnail-inset"
};
const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};
var QSeparator = createComponent({
  name: "QSeparator",
  props: __spreadProps(__spreadValues({}, useDarkProps), {
    spaced: [Boolean, String],
    inset: [Boolean, String],
    vertical: Boolean,
    color: String,
    size: String
  }),
  setup(props) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const orientation = computed(() => props.vertical === true ? "vertical" : "horizontal");
    const orientClass = computed(() => ` q-separator--${orientation.value}`);
    const insetClass = computed(() => props.inset !== false ? `${orientClass.value}-${insetMap[props.inset]}` : "");
    const classes = computed(() => `q-separator${orientClass.value}${insetClass.value}` + (props.color !== void 0 ? ` bg-${props.color}` : "") + (isDark.value === true ? " q-separator--dark" : ""));
    const style = computed(() => {
      const acc = {};
      if (props.size !== void 0) {
        acc[props.vertical === true ? "width" : "height"] = props.size;
      }
      if (props.spaced !== false) {
        const size = props.spaced === true ? `${margins.md}px` : props.spaced in margins ? `${margins[props.spaced]}px` : props.spaced;
        const dir = props.vertical === true ? ["Left", "Right"] : ["Top", "Bottom"];
        acc[`margin${dir[0]}`] = acc[`margin${dir[1]}`] = size;
      }
      return acc;
    });
    return () => h("hr", {
      class: classes.value,
      style: style.value,
      "aria-orientation": orientation.value
    });
  }
});
var QList = createComponent({
  name: "QList",
  props: __spreadProps(__spreadValues({}, useDarkProps), {
    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean
  }),
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(() => "q-list" + (props.bordered === true ? " q-list--bordered" : "") + (props.dense === true ? " q-list--dense" : "") + (props.separator === true ? " q-list--separator" : "") + (isDark.value === true ? " q-list--dark" : "") + (props.padding === true ? " q-list--padding" : ""));
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QToolbar = createComponent({
  name: "QToolbar",
  props: {
    inset: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(() => "q-toolbar row no-wrap items-center" + (props.inset === true ? " q-toolbar--inset" : ""));
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QHeader = createComponent({
  name: "QHeader",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, () => {
      console.error("QHeader needs to be child of QLayout");
    });
    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const fixed = computed(() => props.reveal === true || $layout.view.value.indexOf("H") > -1 || $layout.isContainer.value === true);
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0;
      }
      const offset2 = size.value - $layout.scroll.value.position;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(() => props.modelValue !== true || fixed.value === true && revealed.value !== true);
    const revealOnFocus = computed(() => props.modelValue === true && hidden.value === true && props.reveal === true);
    const classes = computed(() => "q-header q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-top" + (props.bordered === true ? " q-header--bordered" : "") + (hidden.value === true ? " q-header--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" : ""));
    const style = computed(() => {
      const view = $layout.rows.value.top, css = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css;
    });
    function updateLayout(prop, val) {
      $layout.update("header", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size, height);
      updateLayout("size", height);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch($layout.scroll, (scroll) => {
      props.reveal === true && updateLocal(revealed, scroll.direction === "up" || scroll.position <= props.revealOffset || scroll.position - scroll.inflectionPoint < 100);
    });
    const instance = {};
    $layout.instances.header = instance;
    props.modelValue === true && updateLayout("size", size.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.header === instance) {
        $layout.instances.header = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hUniqueSlot(slots.default, []);
      props.elevated === true && child.push(h("div", {
        class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
      }));
      child.push(h(QResizeObserver, {
        debounce: 0,
        onResize
      }));
      return h("header", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
const fasBomb = "M440.5 88.5l-52 52L415 167c9.4 9.4 9.4 24.6 0 33.9l-17.4 17.4c11.8 26.1 18.4 55.1 18.4 85.6 0 114.9-93.1 208-208 208S0 418.9 0 304 93.1 96 208 96c30.5 0 59.5 6.6 85.6 18.4L311 97c9.4-9.4 24.6-9.4 33.9 0l26.5 26.5 52-52 17.1 17zM500 60h-24c-6.6 0-12 5.4-12 12s5.4 12 12 12h24c6.6 0 12-5.4 12-12s-5.4-12-12-12zM440 0c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12s12-5.4 12-12V12c0-6.6-5.4-12-12-12zm33.9 55l17-17c4.7-4.7 4.7-12.3 0-17-4.7-4.7-12.3-4.7-17 0l-17 17c-4.7 4.7-4.7 12.3 0 17 4.8 4.7 12.4 4.7 17 0zm-67.8 0c4.7 4.7 12.3 4.7 17 0 4.7-4.7 4.7-12.3 0-17l-17-17c-4.7-4.7-12.3-4.7-17 0-4.7 4.7-4.7 12.3 0 17l17 17zm67.8 34c-4.7-4.7-12.3-4.7-17 0-4.7 4.7-4.7 12.3 0 17l17 17c4.7 4.7 12.3 4.7 17 0 4.7-4.7 4.7-12.3 0-17l-17-17zM112 272c0-35.3 28.7-64 64-64 8.8 0 16-7.2 16-16s-7.2-16-16-16c-52.9 0-96 43.1-96 96 0 8.8 7.2 16 16 16s16-7.2 16-16z|0 0 512 512";
const fasPlusCircle = "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z|0 0 512 512";
const _hoisted_1$2 = /* @__PURE__ */ createTextVNode(" FAQ MacroBank v.3 ");
const _hoisted_2 = { class: "YL__toolbar-input-container row no-wrap" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("span", { class: "text-body2" }, "ctrl + ", -1);
const _hoisted_4 = { class: "q-gutter-sm row items-center no-wrap" };
const _hoisted_5 = /* @__PURE__ */ createTextVNode("\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E");
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/boy-avatar.png" }, null, -1);
const _hoisted_7 = /* @__PURE__ */ createTextVNode("\u041E\u043F\u043E\u0437\u043D\u0430\u043D \u043A\u0430\u043A ");
const _hoisted_8 = /* @__PURE__ */ createTextVNode(" \u0412\u044B\u0439\u0442\u0438 ");
const _hoisted_9 = /* @__PURE__ */ createTextVNode("\u0412\u043E\u0439\u0442\u0438");
const _sfc_main$5 = {
  props: {
    leftSidebar: {
      type: Boolean,
      default: true
    },
    rightSidebar: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    var _a, _b, _c;
    let router = useRouter();
    let store = useStore();
    const $q = useQuasar();
    const search = ref((_c = (_b = (_a = router.currentRoute) == null ? void 0 : _a.value) == null ? void 0 : _b.query) == null ? void 0 : _c.q);
    const user = computed({
      get: () => $q.localStorage.getItem("user")
    });
    let search_field = ref();
    function searchFocus() {
      search_field.value.focus();
    }
    let filter = async () => {
      await store.dispatch("articles/filterArticles", search.value);
      await router.push({ name: "search", query: { q: search.value } });
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_GlobalEvents = resolveComponent("GlobalEvents");
      return openBlock(), createBlock(QHeader, {
        elevated: "",
        class: "bg-white text-grey-8 q-py-xs",
        "height-hint": "58"
      }, {
        default: withCtx(() => [
          createVNode(QToolbar, null, {
            default: withCtx(() => {
              var _a2;
              return [
                __props.leftSidebar ? (openBlock(), createBlock(QBtn, {
                  key: 0,
                  flat: "",
                  dense: "",
                  round: "",
                  "aria-label": "Menu",
                  icon: "menu",
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggle-left"))
                })) : createCommentVNode("", true),
                createVNode(_component_router_link, {
                  to: { name: "home" },
                  class: "text-decoration-none"
                }, {
                  default: withCtx(() => [
                    unref($q).screen.gt.xs ? (openBlock(), createBlock(QBtn, {
                      key: 0,
                      flat: "",
                      "no-caps": "",
                      "no-wrap": "",
                      class: "q-ml-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(QIcon, {
                          name: unref(fasBomb),
                          color: "accent",
                          size: "28px"
                        }, null, 8, ["name"]),
                        createVNode(QToolbarTitle, {
                          shrink: "",
                          class: "text-weight-bold"
                        }, {
                          default: withCtx(() => [
                            _hoisted_1$2
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(QSpace),
                createVNode(QSpace),
                createBaseVNode("div", _hoisted_2, [
                  createVNode(_component_GlobalEvents, {
                    onKeyup: withKeys(withModifiers(searchFocus, ["ctrl"]), ["enter"])
                  }, null, 8, ["onKeyup"]),
                  createVNode(QInput, {
                    ref: (_value, _refs) => {
                      _refs["search_field"] = _value;
                      isRef(search_field) ? search_field.value = _value : search_field = _value;
                    },
                    modelValue: search.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => search.value = $event),
                    dense: "",
                    outlined: "",
                    square: "",
                    placeholder: "\u041F\u043E\u0438\u0441\u043A <Enter>",
                    class: "bg-white col",
                    clearable: "",
                    onKeypress: withKeys(unref(filter), ["enter"])
                  }, {
                    append: withCtx(() => [
                      _hoisted_3,
                      createVNode(QIcon, {
                        name: "keyboard_return",
                        size: "xs"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onKeypress"]),
                  createVNode(QBtn, {
                    class: "YL__toolbar-input-btn",
                    color: "grey-3",
                    "text-color": "grey-8",
                    icon: "search",
                    disable: ((_a2 = search.value) == null ? void 0 : _a2.length) < 3 || !search.value,
                    onClick: unref(filter),
                    unelevated: ""
                  }, null, 8, ["disable", "onClick"])
                ]),
                createVNode(QSpace),
                createVNode(QSpace),
                createVNode(QSpace),
                createBaseVNode("div", _hoisted_4, [
                  unref($q).screen.gt.sm && unref(isStaff)() ? (openBlock(), createBlock(QBtn, {
                    key: 0,
                    round: "",
                    dense: "",
                    flat: "",
                    color: "grey-8",
                    icon: unref(fasPlusCircle),
                    to: { name: "article-add" }
                  }, {
                    default: withCtx(() => [
                      createVNode(QTooltip, null, {
                        default: withCtx(() => [
                          _hoisted_5
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["icon"])) : createCommentVNode("", true),
                  createVNode(QBtn, {
                    dense: "",
                    flat: "",
                    "no-wrap": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(QAvatar, {
                        rounded: "",
                        size: "25px"
                      }, {
                        default: withCtx(() => [
                          _hoisted_6
                        ]),
                        _: 1
                      }),
                      createVNode(QIcon, {
                        name: "arrow_drop_down",
                        size: "20px"
                      }),
                      createVNode(QMenu, { "auto-close": "" }, {
                        default: withCtx(() => {
                          var _a3;
                          return [
                            ((_a3 = unref(user)) == null ? void 0 : _a3.username) ? (openBlock(), createBlock(QList, {
                              key: 0,
                              dense: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(QItem, { class: "GL__menu-link-signed-in" }, {
                                  default: withCtx(() => [
                                    createVNode(QItemSection, null, {
                                      default: withCtx(() => {
                                        var _a4;
                                        return [
                                          createBaseVNode("div", null, [
                                            _hoisted_7,
                                            createBaseVNode("strong", null, toDisplayString((_a4 = unref(user)) == null ? void 0 : _a4.username), 1)
                                          ])
                                        ];
                                      }),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QSeparator),
                                createVNode(QItem, {
                                  clickable: "",
                                  class: "GL__menu-link",
                                  onClick: unref(logout)
                                }, {
                                  default: withCtx(() => [
                                    _hoisted_8
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(QList, {
                              key: 1,
                              dense: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(QItem, {
                                  clickable: "",
                                  class: "GL__menu-link"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_router_link, { to: { name: "login" } }, {
                                      default: withCtx(() => [
                                        _hoisted_9
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }))
                          ];
                        }),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                __props.rightSidebar ? (openBlock(), createBlock(QBtn, {
                  key: 1,
                  flat: "",
                  dense: "",
                  round: "",
                  "aria-label": "Menu",
                  icon: "menu",
                  onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("toggle-right"))
                })) : createCommentVNode("", true)
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
const modifiersAll = {
  left: true,
  right: true,
  up: true,
  down: true,
  horizontal: true,
  vertical: true
};
const directionList = Object.keys(modifiersAll);
modifiersAll.all = true;
function getModifierDirections(mod) {
  const dir = {};
  for (const direction of directionList) {
    if (mod[direction] === true) {
      dir[direction] = true;
    }
  }
  if (Object.keys(dir).length === 0) {
    return modifiersAll;
  }
  if (dir.horizontal === true) {
    dir.left = dir.right = true;
  } else if (dir.left === true && dir.right === true) {
    dir.horizontal = true;
  }
  if (dir.vertical === true) {
    dir.up = dir.down = true;
  } else if (dir.up === true && dir.down === true) {
    dir.vertical = true;
  }
  if (dir.horizontal === true && dir.vertical === true) {
    dir.all = true;
  }
  return dir;
}
function shouldStart(evt, ctx) {
  return ctx.event === void 0 && evt.target !== void 0 && evt.target.draggable !== true && typeof ctx.handler === "function" && evt.target.nodeName.toUpperCase() !== "INPUT" && (evt.qClonedBy === void 0 || evt.qClonedBy.indexOf(ctx.uid) === -1);
}
function getChanges(evt, ctx, isFinal) {
  const pos = position(evt);
  let dir, distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y, absX = Math.abs(distX), absY = Math.abs(distY);
  const direction = ctx.direction;
  if (direction.horizontal === true && direction.vertical !== true) {
    dir = distX < 0 ? "left" : "right";
  } else if (direction.horizontal !== true && direction.vertical === true) {
    dir = distY < 0 ? "up" : "down";
  } else if (direction.up === true && distY < 0) {
    dir = "up";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.down === true && distY > 0) {
    dir = "down";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.left === true && distX < 0) {
    dir = "left";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  } else if (direction.right === true && distX > 0) {
    dir = "right";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  }
  let synthetic = false;
  if (dir === void 0 && isFinal === false) {
    if (ctx.event.isFirst === true || ctx.event.lastDir === void 0) {
      return {};
    }
    dir = ctx.event.lastDir;
    synthetic = true;
    if (dir === "left" || dir === "right") {
      pos.left -= distX;
      absX = 0;
      distX = 0;
    } else {
      pos.top -= distY;
      absY = 0;
      distY = 0;
    }
  }
  return {
    synthetic,
    payload: {
      evt,
      touch: ctx.event.mouse !== true,
      mouse: ctx.event.mouse === true,
      position: pos,
      direction: dir,
      isFirst: ctx.event.isFirst,
      isFinal: isFinal === true,
      duration: Date.now() - ctx.event.time,
      distance: {
        x: absX,
        y: absY
      },
      offset: {
        x: distX,
        y: distY
      },
      delta: {
        x: pos.left - ctx.event.lastX,
        y: pos.top - ctx.event.lastY
      }
    }
  };
}
let uid = 0;
var TouchPan = createDirective({
  name: "touch-pan",
  beforeMount(el, { value: value2, modifiers }) {
    if (modifiers.mouse !== true && client.has.touch !== true) {
      return;
    }
    function handleEvent(evt, mouseEvent) {
      if (modifiers.mouse === true && mouseEvent === true) {
        stopAndPrevent(evt);
      } else {
        modifiers.stop === true && stop(evt);
        modifiers.prevent === true && prevent(evt);
      }
    }
    const ctx = {
      uid: "qvtp_" + uid++,
      handler: value2,
      modifiers,
      direction: getModifierDirections(modifiers),
      noop,
      mouseStart(evt) {
        if (shouldStart(evt, ctx) && leftClick(evt)) {
          addEvt(ctx, "temp", [
            [document, "mousemove", "move", "notPassiveCapture"],
            [document, "mouseup", "end", "passiveCapture"]
          ]);
          ctx.start(evt, true);
        }
      },
      touchStart(evt) {
        if (shouldStart(evt, ctx)) {
          const target = evt.target;
          addEvt(ctx, "temp", [
            [target, "touchmove", "move", "notPassiveCapture"],
            [target, "touchcancel", "end", "passiveCapture"],
            [target, "touchend", "end", "passiveCapture"]
          ]);
          ctx.start(evt);
        }
      },
      start(evt, mouseEvent) {
        client.is.firefox === true && preventDraggable(el, true);
        ctx.lastEvt = evt;
        if (mouseEvent === true || modifiers.stop === true) {
          if (ctx.direction.all !== true && (mouseEvent !== true || ctx.modifiers.mouseAllDir !== true)) {
            const clone = evt.type.indexOf("mouse") > -1 ? new MouseEvent(evt.type, evt) : new TouchEvent(evt.type, evt);
            evt.defaultPrevented === true && prevent(clone);
            evt.cancelBubble === true && stop(clone);
            Object.assign(clone, {
              qKeyEvent: evt.qKeyEvent,
              qClickOutside: evt.qClickOutside,
              qAnchorHandled: evt.qAnchorHandled,
              qClonedBy: evt.qClonedBy === void 0 ? [ctx.uid] : evt.qClonedBy.concat(ctx.uid)
            });
            ctx.initialEvent = {
              target: evt.target,
              event: clone
            };
          }
          stop(evt);
        }
        const { left, top } = position(evt);
        ctx.event = {
          x: left,
          y: top,
          time: Date.now(),
          mouse: mouseEvent === true,
          detected: false,
          isFirst: true,
          isFinal: false,
          lastX: left,
          lastY: top
        };
      },
      move(evt) {
        if (ctx.event === void 0) {
          return;
        }
        const pos = position(evt), distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y;
        if (distX === 0 && distY === 0) {
          return;
        }
        ctx.lastEvt = evt;
        const isMouseEvt = ctx.event.mouse === true;
        const start = () => {
          handleEvent(evt, isMouseEvt);
          if (modifiers.preserveCursor !== true) {
            document.documentElement.style.cursor = "grabbing";
          }
          isMouseEvt === true && document.body.classList.add("no-pointer-events--children");
          document.body.classList.add("non-selectable");
          clearSelection();
          ctx.styleCleanup = (withDelayedFn) => {
            ctx.styleCleanup = void 0;
            if (modifiers.preserveCursor !== true) {
              document.documentElement.style.cursor = "";
            }
            document.body.classList.remove("non-selectable");
            if (isMouseEvt === true) {
              const remove = () => {
                document.body.classList.remove("no-pointer-events--children");
              };
              if (withDelayedFn !== void 0) {
                setTimeout(() => {
                  remove();
                  withDelayedFn();
                }, 50);
              } else {
                remove();
              }
            } else if (withDelayedFn !== void 0) {
              withDelayedFn();
            }
          };
        };
        if (ctx.event.detected === true) {
          ctx.event.isFirst !== true && handleEvent(evt, ctx.event.mouse);
          const { payload, synthetic } = getChanges(evt, ctx, false);
          if (payload !== void 0) {
            if (ctx.handler(payload) === false) {
              ctx.end(evt);
            } else {
              if (ctx.styleCleanup === void 0 && ctx.event.isFirst === true) {
                start();
              }
              ctx.event.lastX = payload.position.left;
              ctx.event.lastY = payload.position.top;
              ctx.event.lastDir = synthetic === true ? void 0 : payload.direction;
              ctx.event.isFirst = false;
            }
          }
          return;
        }
        if (ctx.direction.all === true || isMouseEvt === true && ctx.modifiers.mouseAllDir === true) {
          start();
          ctx.event.detected = true;
          ctx.move(evt);
          return;
        }
        const absX = Math.abs(distX), absY = Math.abs(distY);
        if (absX !== absY) {
          if (ctx.direction.horizontal === true && absX > absY || ctx.direction.vertical === true && absX < absY || ctx.direction.up === true && absX < absY && distY < 0 || ctx.direction.down === true && absX < absY && distY > 0 || ctx.direction.left === true && absX > absY && distX < 0 || ctx.direction.right === true && absX > absY && distX > 0) {
            ctx.event.detected = true;
            ctx.move(evt);
          } else {
            ctx.end(evt, true);
          }
        }
      },
      end(evt, abort) {
        if (ctx.event === void 0) {
          return;
        }
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        if (abort === true) {
          ctx.styleCleanup !== void 0 && ctx.styleCleanup();
          if (ctx.event.detected !== true && ctx.initialEvent !== void 0) {
            ctx.initialEvent.target.dispatchEvent(ctx.initialEvent.event);
          }
        } else if (ctx.event.detected === true) {
          ctx.event.isFirst === true && ctx.handler(getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx).payload);
          const { payload } = getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx, true);
          const fn = () => {
            ctx.handler(payload);
          };
          if (ctx.styleCleanup !== void 0) {
            ctx.styleCleanup(fn);
          } else {
            fn();
          }
        }
        ctx.event = void 0;
        ctx.initialEvent = void 0;
        ctx.lastEvt = void 0;
      }
    };
    el.__qtouchpan = ctx;
    modifiers.mouse === true && addEvt(ctx, "main", [
      [el, "mousedown", "mouseStart", `passive${modifiers.mouseCapture === true ? "Capture" : ""}`]
    ]);
    client.has.touch === true && addEvt(ctx, "main", [
      [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
      [el, "touchmove", "noop", "notPassiveCapture"]
    ]);
  },
  updated(el, bindings) {
    const ctx = el.__qtouchpan;
    if (ctx !== void 0) {
      if (bindings.oldValue !== bindings.value) {
        typeof value !== "function" && ctx.end();
        ctx.handler = bindings.value;
      }
      ctx.direction = getModifierDirections(bindings.modifiers);
    }
  },
  beforeUnmount(el) {
    const ctx = el.__qtouchpan;
    if (ctx !== void 0) {
      ctx.event !== void 0 && ctx.end();
      cleanEvt(ctx, "main");
      cleanEvt(ctx, "temp");
      client.is.firefox === true && preventDraggable(el, false);
      ctx.styleCleanup !== void 0 && ctx.styleCleanup();
      delete el.__qtouchpan;
    }
  }
});
const axisList = ["vertical", "horizontal"];
const dirProps = {
  vertical: { offset: "offsetY", scroll: "scrollTop", dir: "down", dist: "y" },
  horizontal: { offset: "offsetX", scroll: "scrollLeft", dir: "right", dist: "x" }
};
const panOpts = {
  prevent: true,
  mouse: true,
  mouseAllDir: true
};
var QScrollArea = createComponent({
  name: "QScrollArea",
  props: __spreadProps(__spreadValues({}, useDarkProps), {
    thumbStyle: Object,
    verticalThumbStyle: Object,
    horizontalThumbStyle: Object,
    barStyle: [Array, String, Object],
    verticalBarStyle: [Array, String, Object],
    horizontalBarStyle: [Array, String, Object],
    contentStyle: [Array, String, Object],
    contentActiveStyle: [Array, String, Object],
    delay: {
      type: [String, Number],
      default: 1e3
    },
    visible: {
      type: Boolean,
      default: null
    },
    tabindex: [String, Number],
    onScroll: Function
  }),
  setup(props, { slots, emit }) {
    const tempShowing = ref(false);
    const panning = ref(false);
    const hover = ref(false);
    const container = {
      vertical: ref(0),
      horizontal: ref(0)
    };
    const scroll = {
      vertical: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      },
      horizontal: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      }
    };
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    let timer, panRefPos;
    const targetRef = ref(null);
    const classes = computed(() => "q-scrollarea" + (isDark.value === true ? " q-scrollarea--dark" : ""));
    scroll.vertical.percentage = computed(() => {
      const diff = scroll.vertical.size.value - container.vertical.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(scroll.vertical.position.value / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.vertical.thumbHidden = computed(() => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.vertical.size.value <= container.vertical.value + 1);
    scroll.vertical.thumbSize = computed(() => Math.round(between(container.vertical.value * container.vertical.value / scroll.vertical.size.value, 50, container.vertical.value)));
    scroll.vertical.style = computed(() => {
      const thumbSize = scroll.vertical.thumbSize.value;
      const pos = scroll.vertical.percentage.value * (container.vertical.value - thumbSize);
      return __spreadProps(__spreadValues(__spreadValues({}, props.thumbStyle), props.verticalThumbStyle), {
        top: `${pos}px`,
        height: `${thumbSize}px`
      });
    });
    scroll.vertical.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : ""));
    scroll.vertical.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
    scroll.horizontal.percentage = computed(() => {
      const diff = scroll.horizontal.size.value - container.horizontal.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(scroll.horizontal.position.value / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.horizontal.thumbHidden = computed(() => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.horizontal.size.value <= container.horizontal.value + 1);
    scroll.horizontal.thumbSize = computed(() => Math.round(between(container.horizontal.value * container.horizontal.value / scroll.horizontal.size.value, 50, container.horizontal.value)));
    scroll.horizontal.style = computed(() => {
      const thumbSize = scroll.horizontal.thumbSize.value;
      const pos = scroll.horizontal.percentage.value * (container.horizontal.value - thumbSize);
      return __spreadProps(__spreadValues(__spreadValues({}, props.thumbStyle), props.horizontalThumbStyle), {
        left: `${pos}px`,
        width: `${thumbSize}px`
      });
    });
    scroll.horizontal.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : ""));
    scroll.horizontal.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
    const mainStyle = computed(() => scroll.vertical.thumbHidden.value === true && scroll.horizontal.thumbHidden.value === true ? props.contentStyle : props.contentActiveStyle);
    const thumbVertDir = [[
      TouchPan,
      (e) => {
        onPanThumb(e, "vertical");
      },
      void 0,
      __spreadValues({ vertical: true }, panOpts)
    ]];
    const thumbHorizDir = [[
      TouchPan,
      (e) => {
        onPanThumb(e, "horizontal");
      },
      void 0,
      __spreadValues({ horizontal: true }, panOpts)
    ]];
    function getScroll() {
      const info = {};
      axisList.forEach((axis) => {
        const data = scroll[axis];
        info[axis + "Position"] = data.position.value;
        info[axis + "Percentage"] = data.percentage.value;
        info[axis + "Size"] = data.size.value;
        info[axis + "ContainerSize"] = container[axis].value;
      });
      return info;
    }
    const emitScroll = debounce(() => {
      const info = getScroll();
      info.ref = vm.proxy;
      emit("scroll", info);
    }, 0);
    function localSetScrollPosition(axis, offset, duration2) {
      if (axisList.includes(axis) === false) {
        console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
        return;
      }
      const fn = axis === "vertical" ? setVerticalScrollPosition : setHorizontalScrollPosition;
      fn(targetRef.value, offset, duration2);
    }
    function updateContainer({ height, width }) {
      let change = false;
      if (container.vertical.value !== height) {
        container.vertical.value = height;
        change = true;
      }
      if (container.horizontal.value !== width) {
        container.horizontal.value = width;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScroll({ position: position2 }) {
      let change = false;
      if (scroll.vertical.position.value !== position2.top) {
        scroll.vertical.position.value = position2.top;
        change = true;
      }
      if (scroll.horizontal.position.value !== position2.left) {
        scroll.horizontal.position.value = position2.left;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScrollSize({ height, width }) {
      if (scroll.horizontal.size.value !== width) {
        scroll.horizontal.size.value = width;
        startTimer();
      }
      if (scroll.vertical.size.value !== height) {
        scroll.vertical.size.value = height;
        startTimer();
      }
    }
    function onPanThumb(e, axis) {
      const data = scroll[axis];
      if (e.isFirst === true) {
        if (data.thumbHidden.value === true) {
          return;
        }
        panRefPos = data.position.value;
        panning.value = true;
      } else if (panning.value !== true) {
        return;
      }
      if (e.isFinal === true) {
        panning.value = false;
      }
      const dProp = dirProps[axis];
      const containerSize = container[axis].value;
      const multiplier = (data.size.value - containerSize) / (containerSize - data.thumbSize.value);
      const distance = e.distance[dProp.dist];
      const pos = panRefPos + (e.direction === dProp.dir ? 1 : -1) * distance * multiplier;
      setScroll(pos, axis);
    }
    function onMousedown(evt, axis) {
      const data = scroll[axis];
      if (data.thumbHidden.value !== true) {
        const pos = evt[dirProps[axis].offset] - data.thumbSize.value / 2;
        setScroll(pos / container[axis].value * data.size.value, axis);
        if (data.ref.value !== null) {
          data.ref.value.dispatchEvent(new MouseEvent(evt.type, evt));
        }
      }
    }
    function onVerticalMousedown(evt) {
      onMousedown(evt, "vertical");
    }
    function onHorizontalMousedown(evt) {
      onMousedown(evt, "horizontal");
    }
    function startTimer() {
      if (tempShowing.value === true) {
        clearTimeout(timer);
      } else {
        tempShowing.value = true;
      }
      timer = setTimeout(() => {
        tempShowing.value = false;
      }, props.delay);
      props.onScroll !== void 0 && emitScroll();
    }
    function setScroll(offset, axis) {
      targetRef.value[dirProps[axis].scroll] = offset;
    }
    function onMouseenter() {
      hover.value = true;
    }
    function onMouseleave() {
      hover.value = false;
    }
    Object.assign(vm.proxy, {
      getScrollTarget: () => targetRef.value,
      getScroll,
      getScrollPosition: () => ({
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      }),
      getScrollPercentage: () => ({
        top: scroll.vertical.percentage.value,
        left: scroll.horizontal.percentage.value
      }),
      setScrollPosition: localSetScrollPosition,
      setScrollPercentage(axis, percentage, duration2) {
        localSetScrollPosition(axis, percentage * (scroll[axis].size.value - container[axis].value), duration2);
      }
    });
    return () => {
      return h("div", {
        class: classes.value,
        onMouseenter,
        onMouseleave
      }, [
        h("div", {
          ref: targetRef,
          class: "q-scrollarea__container scroll relative-position fit hide-scrollbar",
          tabindex: props.tabindex !== void 0 ? props.tabindex : void 0
        }, [
          h("div", {
            class: "q-scrollarea__content absolute",
            style: mainStyle.value
          }, hMergeSlot(slots.default, [
            h(QResizeObserver, {
              onResize: updateScrollSize
            })
          ])),
          h(QScrollObserver, {
            axis: "both",
            onScroll: updateScroll
          })
        ]),
        h(QResizeObserver, { onResize: updateContainer }),
        h("div", {
          class: scroll.vertical.barClass.value,
          style: [props.barStyle, props.verticalBarStyle],
          "aria-hidden": "true",
          onMousedown: onVerticalMousedown
        }),
        h("div", {
          class: scroll.horizontal.barClass.value,
          style: [props.barStyle, props.horizontalBarStyle],
          "aria-hidden": "true",
          onMousedown: onHorizontalMousedown
        }),
        withDirectives(h("div", {
          ref: scroll.vertical.ref,
          class: scroll.vertical.thumbClass.value,
          style: scroll.vertical.style.value,
          "aria-hidden": "true"
        }), thumbVertDir),
        withDirectives(h("div", {
          ref: scroll.horizontal.ref,
          class: scroll.horizontal.thumbClass.value,
          style: scroll.horizontal.style.value,
          "aria-hidden": "true"
        }), thumbHorizDir)
      ]);
    };
  }
});
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
let registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, closeTimer;
function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) {
    return true;
  }
  const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
  for (let index = 0; index < path.length; index++) {
    const el = path[index];
    if (hasScrollbar(el, scrollY)) {
      return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }
  return true;
}
function onAppleScroll(e) {
  if (e.target === document) {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
  }
}
function onAppleResize(evt) {
  if (vpPendingUpdate === true) {
    return;
  }
  vpPendingUpdate = true;
  requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}
function apply(action) {
  const body = document.body, hasViewport = window.visualViewport !== void 0;
  if (action === "add") {
    const { overflowY, overflowX } = window.getComputedStyle(body);
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;
    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) {
      body.classList.add("q-body--force-scrollbar-x");
    }
    if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) {
      body.classList.add("q-body--force-scrollbar-y");
    }
    body.classList.add("q-body--prevent-scroll");
    document.qScrollPrevented = true;
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }
  if (client.is.desktop === true && client.is.mac === true) {
    window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
  }
  if (action === "remove") {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
    body.classList.remove("q-body--prevent-scroll");
    body.classList.remove("q-body--force-scrollbar-x");
    body.classList.remove("q-body--force-scrollbar-y");
    document.qScrollPrevented = false;
    body.style.left = bodyLeft;
    body.style.top = bodyTop;
    window.scrollTo(scrollPositionX, scrollPositionY);
    maxScrollTop = void 0;
  }
}
function preventScroll(state) {
  let action = "add";
  if (state === true) {
    registered++;
    if (closeTimer !== void 0) {
      clearTimeout(closeTimer);
      closeTimer = void 0;
      return;
    }
    if (registered > 1) {
      return;
    }
  } else {
    if (registered === 0) {
      return;
    }
    registered--;
    if (registered > 0) {
      return;
    }
    action = "remove";
    if (client.is.ios === true && client.is.nativeMobile === true) {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = void 0;
      }, 100);
      return;
    }
  }
  apply(action);
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
const duration = 150;
var QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: __spreadProps(__spreadValues(__spreadValues({}, useModelToggleProps), useDarkProps), {
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  }),
  emits: [
    ...useModelToggleEmits,
    "on-layout",
    "mini-state"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout } = useTimeout();
    const $layout = inject(layoutKey, () => {
      console.error("QDrawer needs to be child of QLayout");
    });
    let lastDesktopState, timerMini, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    const isMini = computed(() => props.mini === true && belowBreakpoint.value !== true);
    const size = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true);
    const hideOnRouteChange = computed(() => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true));
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if (otherInstance !== void 0 && otherInstance.belowBreakpoint === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size.value);
      cleanup();
      noEvent !== true && registerTimeout(() => {
        emit("hide", evt);
      }, duration);
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(() => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1));
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(size.value * stateDirection.value);
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size.value : 0);
    const fixed = computed(() => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") > -1 || $q.platform.is.ios === true && $layout.isContainer.value === true);
    const onLayout = computed(() => props.overlay === false && showing.value === true && belowBreakpoint.value === false);
    const onScreenOverlay = computed(() => props.overlay === true && showing.value === true && belowBreakpoint.value === false);
    const backdropClass = computed(() => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : ""));
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css.bottom = `${$layout.footer.size}px`;
        }
      }
      return css;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(() => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto"));
    const classes = computed(() => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : "")));
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch($layout.totalWidth, (val) => {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && val <= props.breakpoint);
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance;
      $layout[newSide].size = size.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch(() => props.behavior + props.breakpoint, updateBelowBreakpoint);
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("on-layout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("mini-state", val);
    });
    function applyPosition(position2) {
      if (position2 === void 0) {
        nextTick(() => {
          position2 = showing.value === true ? 0 : size.value;
          applyPosition(stateDirection.value * position2);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position2) === size.value)) {
          position2 += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position2;
      }
    }
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        flagMiniAnimate.value = false;
        if (vm && vm.proxy && vm.proxy.$el) {
          vm.proxy.$el.classList.remove("q-drawer--mini-animate");
        }
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size.value, position2 = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position2 >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position2, 0) : Math.min(0, position2 - width));
      applyBackdrop(between(position2 / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size.value, dir = evt.direction === props.side, position2 = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position2) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position2);
      applyBackdrop(between(1 - position2 / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size2) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size2);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("on-layout", onLayout.value);
      emit("mini-state", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher !== void 0 && layoutTotalWidthWatcher();
      clearTimeout(timerMini);
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(withDirectives(h("div", {
          key: "open",
          class: `q-drawer__opener fixed-${props.side}`,
          "aria-hidden": "true"
        }), openDirective.value));
        child.push(hDir("div", {
          ref: "backdrop",
          class: backdropClass.value,
          style: backdropStyle.value,
          "aria-hidden": "true",
          onClick: hide
        }, void 0, "backdrop", props.noSwipeBackdrop !== true && showing.value === true, () => backdropCloseDirective.value));
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h("div", __spreadProps(__spreadValues({}, attrs), {
          key: "" + mini,
          class: [
            contentClass.value,
            attrs.class
          ]
        }), mini === true ? slots.mini() : hSlot(slots.default))
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        }));
      }
      child.push(hDir("aside", { ref: "content", class: classes.value, style: style.value }, content, "contentclose", props.noSwipeClose !== true && belowBreakpoint.value === true, () => contentCloseDirective.value));
      return h("div", { class: "q-drawer-container" }, child);
    };
  }
});
const _hoisted_1$1 = ["href"];
const _sfc_main$4 = {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { VITE_api_ext_port } = { "VITE_api_ext_port": "9250", "VITE_api_server_name": "77.223.101.127", "VITE_debugging": "0", "VITE_token_name": "base_token", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true };
    let { protocol, hostname } = document.location;
    const state = reactive({
      links1: [
        { icon: "home", text: "\u0412 \u043C\u0430\u043A\u0440\u043E\u0431\u0430\u043D\u043A", path: "#" }
      ],
      links2: [
        {
          icon: "door_back",
          auth: () => isAuth(),
          text: `\u0411\u0435\u043A\u0435\u043D\u0434`,
          path: `${protocol}//${hostname}:${VITE_api_ext_port}/`
        },
        {
          icon: "admin_panel_settings",
          auth: () => isAuth(),
          text: `\u0410\u0434\u043C\u0438\u043D\u043A\u043E`,
          path: `${protocol}//${hostname}:${VITE_api_ext_port}/admin-help/`
        },
        {
          icon: "insert_emoticon",
          auth: () => true,
          text: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0438\u043A\u043E\u043D\u043A\u0438",
          path: "https://fonts.google.com/icons"
        }
      ]
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createBlock(QDrawer, {
        "model-value": __props.isOpen,
        "show-if-above": "",
        bordered: "",
        side: "right",
        class: "bg-grey-2",
        width: 300
      }, {
        default: withCtx(() => [
          createVNode(QScrollArea, { class: "fit" }, {
            default: withCtx(() => [
              createVNode(QList, { padding: "" }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(state).links1, (link) => {
                    return withDirectives((openBlock(), createBlock(QItem, {
                      key: link.text,
                      clickable: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, { avatar: "" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, {
                              color: "grey",
                              name: link.icon
                            }, null, 8, ["name"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createVNode(_component_router_link, {
                              class: "text-body1",
                              to: link.path
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(link.text), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1536)), [
                      [Ripple]
                    ]);
                  }), 128)),
                  createVNode(QSeparator, { class: "q-my-md" }),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(state).links2, (link) => {
                    return withDirectives((openBlock(), createBlock(QItem, {
                      key: link.text,
                      clickable: ""
                    }, {
                      default: withCtx(() => [
                        link.auth() ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          createVNode(QItemSection, { avatar: "" }, {
                            default: withCtx(() => [
                              createVNode(QIcon, {
                                color: "grey",
                                name: link.icon
                              }, null, 8, ["name"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemSection, null, {
                            default: withCtx(() => [
                              createBaseVNode("a", {
                                href: link.path,
                                target: "_blank"
                              }, toDisplayString(link.text), 9, _hoisted_1$1)
                            ]),
                            _: 2
                          }, 1024)
                        ], 64)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1536)), [
                      [Ripple]
                    ]);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model-value"]);
    };
  }
};
var QItemLabel = createComponent({
  name: "QItemLabel",
  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String]
  },
  setup(props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));
    const classes = computed(() => "q-item__label" + (props.overline === true ? " q-item__label--overline text-overline" : "") + (props.caption === true ? " q-item__label--caption text-caption" : "") + (props.header === true ? " q-item__label--header" : "") + (parsedLines.value === 1 ? " ellipsis" : ""));
    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1 ? {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": parsedLines.value
      } : null;
    });
    return () => h("div", {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default));
  }
});
var QSlideTransition = createComponent({
  name: "QSlideTransition",
  props: {
    appear: Boolean,
    duration: {
      type: Number,
      default: 300
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit }) {
    let animating = false, doneFn, element;
    let timer, timerFallback, animListener, lastEvent;
    function cleanup() {
      doneFn && doneFn();
      doneFn = null;
      animating = false;
      clearTimeout(timer);
      clearTimeout(timerFallback);
      element !== void 0 && element.removeEventListener("transitionend", animListener);
      animListener = null;
    }
    function begin(el, height, done) {
      el.style.overflowY = "hidden";
      if (height !== void 0) {
        el.style.height = `${height}px`;
      }
      el.style.transition = `height ${props.duration}ms cubic-bezier(.25, .8, .50, 1)`;
      animating = true;
      doneFn = done;
    }
    function end(el, event) {
      el.style.overflowY = null;
      el.style.height = null;
      el.style.transition = null;
      cleanup();
      event !== lastEvent && emit(event);
    }
    function onEnter(el, done) {
      let pos = 0;
      element = el;
      if (animating === true) {
        cleanup();
        pos = el.offsetHeight === el.scrollHeight ? 0 : void 0;
      } else {
        lastEvent = "hide";
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        el.style.height = `${el.scrollHeight}px`;
        animListener = (ev) => {
          if (Object(ev) !== ev || ev.target === el) {
            end(el, "show");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    function onLeave(el, done) {
      let pos;
      element = el;
      if (animating === true) {
        cleanup();
      } else {
        lastEvent = "show";
        pos = el.scrollHeight;
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        el.style.height = 0;
        animListener = (ev) => {
          if (Object(ev) !== ev || ev.target === el) {
            end(el, "hide");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    onBeforeUnmount(() => {
      animating === true && cleanup();
    });
    return () => h(Transition, {
      css: false,
      appear: props.appear,
      onEnter,
      onLeave
    }, slots.default);
  }
});
const itemGroups = shallowReactive({});
const LINK_PROPS = Object.keys(useRouterLinkProps);
var QExpansionItem = createComponent({
  name: "QExpansionItem",
  props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useRouterLinkProps), useModelToggleProps), useDarkProps), {
    icon: String,
    label: String,
    labelLines: [Number, String],
    caption: String,
    captionLines: [Number, String],
    dense: Boolean,
    expandIcon: String,
    expandedIcon: String,
    expandIconClass: [Array, String, Object],
    duration: Number,
    headerInsetLevel: Number,
    contentInsetLevel: Number,
    expandSeparator: Boolean,
    defaultOpened: Boolean,
    expandIconToggle: Boolean,
    switchToggleSide: Boolean,
    denseToggle: Boolean,
    group: String,
    popup: Boolean,
    headerStyle: [Array, String, Object],
    headerClass: [Array, String, Object]
  }),
  emits: [
    ...useModelToggleEmits,
    "click",
    "after-show",
    "after-hide"
  ],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const showing = ref(props.modelValue !== null ? props.modelValue : props.defaultOpened);
    const blurTargetRef = ref(null);
    const { hide, toggle } = useModelToggle({ showing });
    let uniqueId, exitGroup;
    const classes = computed(() => `q-expansion-item q-item-type q-expansion-item--${showing.value === true ? "expanded" : "collapsed"} q-expansion-item--${props.popup === true ? "popup" : "standard"}`);
    const contentStyle = computed(() => {
      if (props.contentInsetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: props.contentInsetLevel * 56 + "px"
      };
    });
    const hasLink = computed(() => props.disable !== true && props.to !== void 0 && props.to !== null && props.to !== "");
    const linkProps = computed(() => {
      const acc = {};
      LINK_PROPS.forEach((key) => {
        acc[key] = props[key];
      });
      return acc;
    });
    const isClickable = computed(() => hasLink.value === true || props.expandIconToggle !== true);
    const expansionIcon = computed(() => props.expandedIcon !== void 0 && showing.value === true ? props.expandedIcon : props.expandIcon || $q.iconSet.expansionItem[props.denseToggle === true ? "denseIcon" : "icon"]);
    const activeToggleIcon = computed(() => props.disable !== true && (hasLink.value === true || props.expandIconToggle === true));
    watch(() => props.group, (name) => {
      exitGroup !== void 0 && exitGroup();
      name !== void 0 && enterGroup();
    });
    function onHeaderClick(e) {
      hasLink.value !== true && toggle(e);
      emit("click", e);
    }
    function toggleIconKeyboard(e) {
      e.keyCode === 13 && toggleIcon(e, true);
    }
    function toggleIcon(e, keyboard) {
      keyboard !== true && blurTargetRef.value !== null && blurTargetRef.value.focus();
      toggle(e);
      stopAndPrevent(e);
    }
    function onShow() {
      emit("after-show");
    }
    function onHide() {
      emit("after-hide");
    }
    function enterGroup() {
      if (uniqueId === void 0) {
        uniqueId = uid$1();
      }
      if (showing.value === true) {
        itemGroups[props.group] = uniqueId;
      }
      const show = watch(showing, (val) => {
        if (val === true) {
          itemGroups[props.group] = uniqueId;
        } else if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
      });
      const group = watch(() => itemGroups[props.group], (val, oldVal) => {
        if (oldVal === uniqueId && val !== void 0 && val !== uniqueId) {
          hide();
        }
      });
      exitGroup = () => {
        show();
        group();
        if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
        exitGroup = void 0;
      };
    }
    function getToggleIcon() {
      const data = {
        class: [
          `q-focusable relative-position cursor-pointer${props.denseToggle === true && props.switchToggleSide === true ? " items-end" : ""}`,
          props.expandIconClass
        ],
        side: props.switchToggleSide !== true,
        avatar: props.switchToggleSide
      };
      const child = [
        h(QIcon, {
          class: "q-expansion-item__toggle-icon" + (props.expandedIcon === void 0 && showing.value === true ? " q-expansion-item__toggle-icon--rotated" : ""),
          name: expansionIcon.value
        })
      ];
      if (activeToggleIcon.value === true) {
        Object.assign(data, {
          tabindex: 0,
          onClick: toggleIcon,
          onKeyup: toggleIconKeyboard
        });
        child.unshift(h("div", {
          ref: blurTargetRef,
          class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
          tabindex: -1
        }));
      }
      return h(QItemSection, data, () => child);
    }
    function getHeaderChild() {
      let child;
      if (slots.header !== void 0) {
        child = [].concat(slots.header());
      } else {
        child = [
          h(QItemSection, () => [
            h(QItemLabel, { lines: props.labelLines }, () => props.label || ""),
            props.caption ? h(QItemLabel, { lines: props.captionLines, caption: true }, () => props.caption) : null
          ])
        ];
        props.icon && child[props.switchToggleSide === true ? "push" : "unshift"](h(QItemSection, {
          side: props.switchToggleSide === true,
          avatar: props.switchToggleSide !== true
        }, () => h(QIcon, { name: props.icon })));
      }
      props.disable !== true && child[props.switchToggleSide === true ? "unshift" : "push"](getToggleIcon());
      return child;
    }
    function getHeader() {
      const data = {
        ref: "item",
        style: props.headerStyle,
        class: props.headerClass,
        dark: isDark.value,
        disable: props.disable,
        dense: props.dense,
        insetLevel: props.headerInsetLevel
      };
      if (isClickable.value === true) {
        data.clickable = true;
        data.onClick = onHeaderClick;
        hasLink.value === true && Object.assign(data, linkProps.value);
      }
      return h(QItem, data, getHeaderChild);
    }
    function getTransitionChild() {
      return withDirectives(h("div", {
        key: "e-content",
        class: "q-expansion-item__content relative-position",
        style: contentStyle.value
      }, hSlot(slots.default)), [[
        vShow,
        showing.value
      ]]);
    }
    function getContent() {
      const node = [
        getHeader(),
        h(QSlideTransition, {
          duration: props.duration,
          onShow,
          onHide
        }, getTransitionChild)
      ];
      if (props.expandSeparator === true) {
        node.push(h(QSeparator, {
          class: "q-expansion-item__border q-expansion-item__border--top absolute-top",
          dark: isDark.value
        }), h(QSeparator, {
          class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
          dark: isDark.value
        }));
      }
      return node;
    }
    props.group !== void 0 && enterGroup();
    onBeforeUnmount(() => {
      exitGroup !== void 0 && exitGroup();
    });
    return () => h("div", { class: classes.value }, [
      h("div", { class: "q-expansion-item__container relative-position" }, getContent())
    ]);
  }
});
const _sfc_main$3 = {
  props: {
    data: Object,
    insertLevel: Number
  },
  setup(__props) {
    const props = __props;
    useStore();
    return (_ctx, _cache) => {
      var _a, _b, _c;
      const _component_tree_item = resolveComponent("tree-item", true);
      return openBlock(), createBlock(QExpansionItem, {
        "expand-separator": "",
        "default-opened": "",
        "header-inset-level": unref(props).insertLevel * 0.25 - 0.15,
        icon: (_a = unref(props).data) == null ? void 0 : _a.icon,
        label: (_b = unref(props).data) == null ? void 0 : _b.label,
        to: { name: "category", params: { slug: (_c = unref(props).data) == null ? void 0 : _c.slug } }
      }, {
        default: withCtx(() => {
          var _a2, _b2, _c2;
          return [
            (openBlock(true), createElementBlock(Fragment, null, renderList((_b2 = (_a2 = unref(props)) == null ? void 0 : _a2.data) == null ? void 0 : _b2.articles, (article) => {
              return openBlock(), createBlock(QCard, {
                key: article.id
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, {
                    innerHTML: article == null ? void 0 : article.title
                  }, null, 8, ["innerHTML"])
                ]),
                _: 2
              }, 1024);
            }), 128)),
            (openBlock(true), createElementBlock(Fragment, null, renderList((_c2 = unref(props).data) == null ? void 0 : _c2.children, (sub) => {
              return openBlock(), createBlock(_component_tree_item, {
                key: sub.id,
                data: sub,
                "insert-level": sub.level
              }, null, 8, ["data", "insert-level"]);
            }), 128))
          ];
        }),
        _: 1
      }, 8, ["header-inset-level", "icon", "label", "to"]);
    };
  }
};
const _hoisted_1 = { class: "q-gutter-sm" };
const _sfc_main$2 = {
  setup(__props) {
    let store = useStore();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(QList, {
          bordered: "",
          class: "rounded-borders"
        }, {
          default: withCtx(() => {
            var _a, _b;
            return [
              (openBlock(true), createElementBlock(Fragment, null, renderList((_b = (_a = unref(store).state) == null ? void 0 : _a.categories) == null ? void 0 : _b.list, (item) => {
                return openBlock(), createBlock(_sfc_main$3, {
                  key: item.id,
                  data: item,
                  "insert-level": item.level
                }, null, 8, ["data", "insert-level"]);
              }), 128))
            ];
          }),
          _: 1
        })
      ]);
    };
  }
};
const _sfc_main$1 = {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    useStore();
    const state = reactive({
      links1: [
        { icon: "home", text: "\u0412 \u043C\u0430\u043A\u0440\u043E\u0431\u0430\u043D\u043A", path: "#" }
      ],
      links2: [
        { icon: "home", text: "\u0414\u043E\u043C\u043E\u0439", path: "home" },
        { icon: "verified", text: "\u041E \u043D\u0430\u0441", path: "about" },
        { icon: "pages", text: "\u0421\u0442\u0430\u0442\u044C\u0438", path: "articles" }
      ]
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createBlock(QDrawer, {
        "model-value": __props.isOpen,
        "show-if-above": "",
        bordered: "",
        side: "left",
        class: "bg-grey-2",
        width: 300
      }, {
        default: withCtx(() => [
          createVNode(QScrollArea, { class: "fit" }, {
            default: withCtx(() => [
              createVNode(QList, { padding: "" }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(state).links1, (link) => {
                    return openBlock(), createBlock(_component_router_link, {
                      key: link.text,
                      class: "text-body1",
                      to: link.path
                    }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(QItem, { clickable: "" }, {
                          default: withCtx(() => [
                            createVNode(QItemSection, { avatar: "" }, {
                              default: withCtx(() => [
                                createVNode(QIcon, {
                                  color: "grey",
                                  name: link.icon
                                }, null, 8, ["name"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(QItemSection, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(link.text), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1536), [
                          [Ripple]
                        ])
                      ]),
                      _: 2
                    }, 1032, ["to"]);
                  }), 128)),
                  createVNode(QSeparator, { class: "q-my-md" }),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(state).links2, (link) => {
                    return openBlock(), createBlock(_component_router_link, {
                      key: link.text,
                      to: { name: link.path }
                    }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(QItem, { clickable: "" }, {
                          default: withCtx(() => [
                            createVNode(QItemSection, { avatar: "" }, {
                              default: withCtx(() => [
                                createVNode(QIcon, {
                                  color: "grey",
                                  name: link.icon
                                }, null, 8, ["name"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(QItemSection, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(link.text), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1536), [
                          [Ripple]
                        ])
                      ]),
                      _: 2
                    }, 1032, ["to"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_sfc_main$2)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model-value"]);
    };
  }
};
var default_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  setup(__props) {
    const state = reactive({
      rightDrawerOpen: true,
      leftDrawerOpen: true
    });
    function toggleLeftDrawer() {
      state.leftDrawerOpen = !state.leftDrawerOpen;
    }
    function toggleRightDrawer() {
      state.rightDrawerOpen = !state.rightDrawerOpen;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QLayout, {
        view: "hHh LpR fFf",
        class: "bg-grey-1"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "header", {}, () => [
            createVNode(_sfc_main$5, {
              onToggleLeft: toggleLeftDrawer,
              onToggleRight: toggleRightDrawer
            })
          ]),
          renderSlot(_ctx.$slots, "leftSidebar", {}, () => [
            createVNode(_sfc_main$1, {
              "is-open": unref(state).leftDrawerOpen
            }, null, 8, ["is-open"])
          ]),
          createVNode(QPageContainer, null, {
            default: withCtx(() => [
              createVNode(QPage, { class: "q-pt-sm" }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              })
            ]),
            _: 3
          }),
          renderSlot(_ctx.$slots, "rightSidebar", {
            isOpen: unref(state).rightDrawerOpen
          }, () => [
            createVNode(_sfc_main$4, {
              "is-open": unref(state).rightDrawerOpen
            }, null, 8, ["is-open"])
          ])
        ]),
        _: 3
      });
    };
  }
};
export { QPage as Q, TouchPan as T, _sfc_main as _, QList as a, usePreventScroll as b, QItemLabel as c, _sfc_main$5 as d, QPageContainer as e, QLayout as f, QResizeObserver as g, getModifierDirections as h, shouldStart as s, useHistory as u };
