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
import { c as useFieldProps, d as useFieldEmits, e as useField, f as useFieldState, g as useFormProps, h as useFormInputNameAttr, i as fieldValueIsFilled, j as useKeyComposition, k as useFormAttrs, l as useFormInject, t as testPattern } from "./QCard.ada68c8f.js";
import { j as createComponent, M as useDarkProps, aU as useSizeProps, O as useDark, aV as useSize, m as computed, av as hDir, ay as Ripple, t as getCurrentInstance, n as h, Z as QIcon, aW as hMergeSlotSafely, ah as stopAndPrevent, ar as useModelToggleProps, aX as useTransitionProps, as as useModelToggleEmits, E as ref, at as useTimeout, aY as useTick, aZ as usePortal, au as useModelToggle, v as watch, aH as addFocusFn, a_ as removeFocusout, a$ as removeEscapeKey, y as onBeforeUnmount, aA as Transition, s as hSlot, H as nextTick, b0 as addFocusout, b1 as addEscapeKey, b2 as childHasFocus, z as noop, ak as debounce, b3 as onBeforeMount, b4 as onActivated, b5 as onBeforeUpdate, b6 as onUpdated, a2 as QMenu, ad as prevent, b7 as normalizeToInterval, b8 as isKeyCode, ae as stop, aK as shouldIgnoreKey, a4 as QItemSection, a3 as QItem, K as hMergeSlot, r as resolveComponent, o as openBlock, f as createBlock, w as withCtx, aE as renderSlot, V as createVNode, aj as between, af as position, u as provide, b9 as tabsKey, k as inject, x as onMounted, al as withDirectives, a8 as createDirective, a9 as client, aa as leftClick, ab as addEvt, ac as preventDraggable, ai as clearSelection, ag as cleanEvt, ba as KeepAlive, aT as getNormalizedVNodes, bb as throttle, bc as defineComponent, J as reactive, Y as unref, $ as isRef, bd as QBtnDropdown, h as QEditor, U as useQuasar, T as useStore, i as createBaseVNode, W as QBtn, X as createCommentVNode, aw as createElementBlock, ax as renderList, az as Fragment, a5 as toDisplayString } from "./vendor.cde5035b.js";
import { u as useHistory, b as usePreventScroll, c as QItemLabel, d as _sfc_main$4, _ as _sfc_main$5, Q as QPage, e as QPageContainer, f as QLayout, T as TouchPan, g as QResizeObserver, h as getModifierDirections, s as shouldStart, a as QList } from "./default.1dd637dd.js";
import { Q as QSpinnerFacebook } from "./article.b65c451b.js";
import { _ as _export_sfc, i as isStaff } from "./index.dc0058ce.js";
var QField = createComponent({
  name: "QField",
  inheritAttrs: false,
  props: useFieldProps,
  emits: useFieldEmits,
  setup() {
    return useField(useFieldState());
  }
});
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
var QChip = createComponent({
  name: "QChip",
  props: __spreadProps(__spreadValues(__spreadValues({}, useDarkProps), useSizeProps), {
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  }),
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes);
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);
    const leftIcon = computed(() => props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
    const isClickable = computed(() => props.disable === false && (props.clickable === true || props.selected !== null));
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return "q-chip row inline no-wrap items-center" + (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable === true ? " disabled" : "") + (props.dense === true ? " q-chip--dense" : "") + (props.outline === true ? " q-chip--outline" : "") + (props.selected === true ? " q-chip--selected" : "") + (isClickable.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square === true ? " q-chip--square" : "") + (isDark.value === true ? " q-chip--dark q-dark" : "");
    });
    const attributes = computed(() => props.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: props.tabindex || 0 });
    function onKeyup(e) {
      e.keyCode === 13 && onClick(e);
    }
    function onClick(e) {
      if (!props.disable) {
        emit("update:selected", !props.selected);
        emit("click", e);
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit("update:modelValue", false);
          emit("remove");
        }
      }
    }
    function getContent() {
      const child = [];
      isClickable.value === true && child.push(h("div", { class: "q-focus-helper" }));
      hasLeftIcon.value === true && child.push(h(QIcon, {
        class: "q-chip__icon q-chip__icon--left",
        name: leftIcon.value
      }));
      const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
      child.push(h("div", {
        class: "q-chip__content col row no-wrap items-center q-anchor--skip"
      }, hMergeSlotSafely(slots.default, label)));
      props.iconRight && child.push(h(QIcon, {
        class: "q-chip__icon q-chip__icon--right",
        name: props.iconRight
      }));
      props.removable === true && child.push(h(QIcon, __spreadProps(__spreadValues({
        class: "q-chip__icon q-chip__icon--remove cursor-pointer",
        name: removeIcon.value
      }, attributes.value), {
        onClick: onRemove,
        onKeyup: onRemove
      })));
      return child;
    }
    return () => {
      if (props.modelValue === false) {
        return;
      }
      const data = {
        class: classes.value,
        style: sizeStyle.value
      };
      isClickable.value === true && Object.assign(data, attributes.value, { onClick, onKeyup });
      return hDir("div", data, getContent(), "ripple", props.ripple !== false && props.disable !== true, () => [[Ripple, props.ripple]]);
    };
  }
});
let maximizedModals = 0;
const positionClass = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
};
const transitions = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"]
};
var QDialog = createComponent({
  name: "QDialog",
  inheritAttrs: false,
  props: __spreadProps(__spreadValues(__spreadValues({}, useModelToggleProps), useTransitionProps), {
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    position: {
      type: String,
      default: "standard",
      validator: (val) => val === "standard" || ["top", "bottom", "left", "right"].includes(val)
    }
  }),
  emits: [
    ...useModelToggleEmits,
    "shake",
    "click",
    "escape-key"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const innerRef = ref(null);
    const showing = ref(false);
    const transitionState = ref(false);
    const animating = ref(false);
    let shakeTimeout, refocusTarget = null, isMaximized, avoidAutoClose;
    const hideOnRouteChange = computed(() => props.persistent !== true && props.noRouteDismiss !== true && props.seamless !== true);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const { registerTick, removeTick, prepareTick } = useTick();
    const { showPortal, hidePortal, portalIsActive, renderPortal } = usePortal(vm, innerRef, renderPortalContent, true);
    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const classes = computed(() => `q-dialog__inner flex no-pointer-events q-dialog__inner--${props.maximized === true ? "maximized" : "minimized"} q-dialog__inner--${props.position} ${positionClass[props.position]}` + (animating.value === true ? " q-dialog__inner--animating" : "") + (props.fullWidth === true ? " q-dialog__inner--fullwidth" : "") + (props.fullHeight === true ? " q-dialog__inner--fullheight" : "") + (props.square === true ? " q-dialog__inner--square" : ""));
    const transitionShow = computed(() => "q-transition--" + (props.transitionShow === void 0 ? transitions[props.position][0] : props.transitionShow));
    const transitionHide = computed(() => "q-transition--" + (props.transitionHide === void 0 ? transitions[props.position][1] : props.transitionHide));
    const transition = computed(() => transitionState.value === true ? transitionHide.value : transitionShow.value);
    const transitionStyle = computed(() => `--q-transition-duration: ${props.transitionDuration}ms`);
    const useBackdrop = computed(() => showing.value === true && props.seamless !== true);
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const rootClasses = computed(() => [
      `q-dialog fullscreen no-pointer-events q-dialog--${useBackdrop.value === true ? "modal" : "seamless"}`,
      attrs.class
    ]);
    watch(showing, (val) => {
      nextTick(() => {
        transitionState.value = val;
      });
    });
    watch(() => props.maximized, (state) => {
      showing.value === true && updateMaximized(state);
    });
    watch(useBackdrop, (val) => {
      preventBodyScroll(val);
      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      } else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });
    function handleShow(evt) {
      removeTimeout();
      removeTick();
      addToHistory();
      refocusTarget = props.noRefocus === false && document.activeElement !== null ? document.activeElement : null;
      updateMaximized(props.maximized);
      showPortal();
      animating.value = true;
      if (props.noFocus !== true) {
        document.activeElement !== null && document.activeElement.blur();
        registerTick(focus);
        prepareTick();
      }
      registerTimeout(() => {
        if (vm.proxy.$q.platform.is.ios === true) {
          if (props.seamless !== true && document.activeElement) {
            const { top, bottom } = document.activeElement.getBoundingClientRect(), { innerHeight } = window, height = window.visualViewport !== void 0 ? window.visualViewport.height : innerHeight;
            if (top > 0 && bottom > height / 2) {
              document.scrollingElement.scrollTop = Math.min(document.scrollingElement.scrollHeight - height, bottom >= innerHeight ? Infinity : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2));
            }
            document.activeElement.scrollIntoView();
          }
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }
        showPortal(true);
        animating.value = false;
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTimeout();
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      if (refocusTarget !== null) {
        refocusTarget.focus();
      }
      registerTimeout(() => {
        hidePortal();
        animating.value = false;
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function focus() {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node === null || node.contains(document.activeElement) === true) {
          return;
        }
        node = node.querySelector("[autofocus], [data-autofocus]") || node;
        node.focus();
      });
    }
    function shake() {
      focus();
      emit("shake");
      const node = innerRef.value;
      if (node !== null) {
        node.classList.remove("q-animate--scale");
        node.classList.add("q-animate--scale");
        clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          if (innerRef.value !== null) {
            node.classList.remove("q-animate--scale");
            focus();
          }
        }, 170);
      }
    }
    function onEscapeKey() {
      if (props.seamless !== true) {
        if (props.persistent === true || props.noEscDismiss === true) {
          props.maximized !== true && props.noShake !== true && shake();
        } else {
          emit("escape-key");
          hide();
        }
      }
    }
    function cleanup(hiding) {
      clearTimeout(shakeTimeout);
      if (hiding === true || showing.value === true) {
        updateMaximized(false);
        if (props.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }
    }
    function updateMaximized(active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add("q-body--dialog");
          maximizedModals++;
          isMaximized = true;
        }
      } else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove("q-body--dialog");
        }
        maximizedModals--;
        isMaximized = false;
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit("click", e);
      }
    }
    function onBackdropClick(e) {
      if (props.persistent !== true && props.noBackdropDismiss !== true) {
        hide(e);
      } else if (props.noShake !== true) {
        shake();
      }
    }
    function onFocusChange(evt) {
      if (showing.value === true && portalIsActive.value === true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus();
      }
    }
    Object.assign(vm.proxy, {
      focus,
      shake,
      __updateRefocusTarget(target) {
        refocusTarget = target || null;
      }
    });
    onBeforeUnmount(() => {
      cleanup();
    });
    function renderPortalContent() {
      return h("div", __spreadProps(__spreadValues({}, attrs), {
        class: rootClasses.value
      }), [
        h(Transition, {
          name: "q-transition--fade",
          appear: true
        }, () => useBackdrop.value === true ? h("div", {
          class: "q-dialog__backdrop fixed-full",
          style: transitionStyle.value,
          "aria-hidden": "true",
          onMousedown: onBackdropClick
        }) : null),
        h(Transition, { name: transition.value, appear: true }, () => showing.value === true ? h("div", __spreadValues({
          ref: innerRef,
          class: classes.value,
          style: transitionStyle.value,
          tabindex: -1
        }, onEvents.value), hSlot(slots.default)) : null)
      ]);
    }
    return renderPortal;
  }
});
let rtlHasScrollBug = false;
{
  const scroller = document.createElement("div");
  const spacer = document.createElement("div");
  scroller.setAttribute("dir", "rtl");
  scroller.style.width = "1px";
  scroller.style.height = "1px";
  scroller.style.overflow = "auto";
  spacer.style.width = "1000px";
  spacer.style.height = "1px";
  document.body.appendChild(scroller);
  scroller.appendChild(spacer);
  scroller.scrollLeft = -1e3;
  rtlHasScrollBug = scroller.scrollLeft >= 0;
  scroller.remove();
}
const aggBucketSize = 1e3;
const scrollToEdges = [
  "start",
  "center",
  "end",
  "start-force",
  "center-force",
  "end-force"
];
const slice = Array.prototype.slice;
let id = 1;
const setOverflowAnchor = window.getComputedStyle(document.body).overflowAnchor === void 0 ? noop : function(id2, index) {
  const ssId = id2 + "_ss";
  let styleSheet = document.getElementById(ssId);
  if (styleSheet === null) {
    styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.id = ssId;
    document.head.appendChild(styleSheet);
  }
  if (styleSheet.qChildIndex !== index) {
    styleSheet.qChildIndex = index;
    styleSheet.innerHTML = `#${id2} > *:nth-child(${index}) { overflow-anchor: auto }`;
  }
};
function sumFn(acc, h2) {
  return acc + h2;
}
function getScrollDetails(parent, child, beforeRef, afterRef, horizontal, rtl, stickyStart, stickyEnd) {
  const parentCalc = parent === window ? document.scrollingElement || document.documentElement : parent, propElSize = horizontal === true ? "offsetWidth" : "offsetHeight", details = {
    scrollStart: 0,
    scrollViewSize: -stickyStart - stickyEnd,
    scrollMaxSize: 0,
    offsetStart: -stickyStart,
    offsetEnd: -stickyEnd
  };
  if (horizontal === true) {
    if (parent === window) {
      details.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
      details.scrollViewSize += window.innerWidth;
    } else {
      details.scrollStart = parentCalc.scrollLeft;
      details.scrollViewSize += parentCalc.clientWidth;
    }
    details.scrollMaxSize = parentCalc.scrollWidth;
    if (rtl === true) {
      details.scrollStart = (rtlHasScrollBug === true ? details.scrollMaxSize - details.scrollViewSize : 0) - details.scrollStart;
    }
  } else {
    if (parent === window) {
      details.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
      details.scrollViewSize += window.innerHeight;
    } else {
      details.scrollStart = parentCalc.scrollTop;
      details.scrollViewSize += parentCalc.clientHeight;
    }
    details.scrollMaxSize = parentCalc.scrollHeight;
  }
  if (beforeRef !== null) {
    for (let el = beforeRef.previousElementSibling; el !== null; el = el.previousElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetStart += el[propElSize];
      }
    }
  }
  if (afterRef !== null) {
    for (let el = afterRef.nextElementSibling; el !== null; el = el.nextElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetEnd += el[propElSize];
      }
    }
  }
  if (child !== parent) {
    const parentRect = parentCalc.getBoundingClientRect(), childRect = child.getBoundingClientRect();
    if (horizontal === true) {
      details.offsetStart += childRect.left - parentRect.left;
      details.offsetEnd -= childRect.width;
    } else {
      details.offsetStart += childRect.top - parentRect.top;
      details.offsetEnd -= childRect.height;
    }
    if (parent !== window) {
      details.offsetStart += details.scrollStart;
    }
    details.offsetEnd += details.scrollMaxSize - details.offsetStart;
  }
  return details;
}
function setScroll(parent, scroll, horizontal, rtl) {
  if (parent === window) {
    if (horizontal === true) {
      if (rtl === true) {
        scroll = (rtlHasScrollBug === true ? document.body.scrollWidth - window.innerWidth : 0) - scroll;
      }
      window.scrollTo(scroll, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    } else {
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, scroll);
    }
  } else if (horizontal === true) {
    if (rtl === true) {
      scroll = (rtlHasScrollBug === true ? parent.scrollWidth - parent.offsetWidth : 0) - scroll;
    }
    parent.scrollLeft = scroll;
  } else {
    parent.scrollTop = scroll;
  }
}
function sumSize(sizeAgg, size, from, to) {
  if (from >= to) {
    return 0;
  }
  const lastTo = size.length, fromAgg = Math.floor(from / aggBucketSize), toAgg = Math.floor((to - 1) / aggBucketSize) + 1;
  let total = sizeAgg.slice(fromAgg, toAgg).reduce(sumFn, 0);
  if (from % aggBucketSize !== 0) {
    total -= size.slice(fromAgg * aggBucketSize, from).reduce(sumFn, 0);
  }
  if (to % aggBucketSize !== 0 && to !== lastTo) {
    total -= size.slice(to, toAgg * aggBucketSize).reduce(sumFn, 0);
  }
  return total;
}
const commonVirtScrollProps = {
  virtualScrollSliceSize: {
    type: [Number, String],
    default: null
  },
  virtualScrollSliceRatioBefore: {
    type: [Number, String],
    default: 1
  },
  virtualScrollSliceRatioAfter: {
    type: [Number, String],
    default: 1
  },
  virtualScrollItemSize: {
    type: [Number, String],
    default: 24
  },
  virtualScrollStickySizeStart: {
    type: [Number, String],
    default: 0
  },
  virtualScrollStickySizeEnd: {
    type: [Number, String],
    default: 0
  },
  tableColspan: [Number, String]
};
const useVirtualScrollProps = __spreadValues({
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function
}, commonVirtScrollProps);
function useVirtualScroll({
  virtualScrollLength,
  getVirtualScrollTarget,
  getVirtualScrollEl,
  virtualScrollItemSizeComputed
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  const { $q } = proxy;
  let prevScrollStart, prevToIndex, localScrollViewSize, virtualScrollSizesAgg = [], virtualScrollSizes;
  const vsId = "qvs_" + id++;
  const virtualScrollPaddingBefore = ref(0);
  const virtualScrollPaddingAfter = ref(0);
  const virtualScrollSliceSizeComputed = ref({});
  const beforeRef = ref(null);
  const afterRef = ref(null);
  const contentRef = ref(null);
  const virtualScrollSliceRange = ref({ from: 0, to: 0 });
  const colspanAttr = computed(() => props.tableColspan !== void 0 ? props.tableColspan : 100);
  if (virtualScrollItemSizeComputed === void 0) {
    virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize);
  }
  const needsReset = computed(() => virtualScrollItemSizeComputed.value + ";" + props.virtualScrollHorizontal);
  const needsSliceRecalc = computed(() => needsReset.value + ";" + props.virtualScrollSliceRatioBefore + ";" + props.virtualScrollSliceRatioAfter);
  watch(needsSliceRecalc, () => {
    setVirtualScrollSize();
  });
  watch(needsReset, reset);
  function reset() {
    localResetVirtualScroll(prevToIndex, true);
  }
  function refresh(toIndex) {
    localResetVirtualScroll(toIndex === void 0 ? prevToIndex : toIndex);
  }
  function scrollTo(toIndex, edge) {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) {
      return;
    }
    const scrollDetails = getScrollDetails(scrollEl, getVirtualScrollEl(), beforeRef.value, afterRef.value, props.virtualScrollHorizontal, $q.lang.rtl, props.virtualScrollStickySizeStart, props.virtualScrollStickySizeEnd);
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    setVirtualScrollSliceRange(scrollEl, scrollDetails, Math.min(virtualScrollLength.value - 1, Math.max(0, parseInt(toIndex, 10) || 0)), 0, scrollToEdges.indexOf(edge) > -1 ? edge : prevToIndex > -1 && toIndex > prevToIndex ? "end" : "start");
  }
  function localOnVirtualScrollEvt() {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) {
      return;
    }
    const scrollDetails = getScrollDetails(scrollEl, getVirtualScrollEl(), beforeRef.value, afterRef.value, props.virtualScrollHorizontal, $q.lang.rtl, props.virtualScrollStickySizeStart, props.virtualScrollStickySizeEnd), listLastIndex = virtualScrollLength.value - 1, listEndOffset = scrollDetails.scrollMaxSize - scrollDetails.offsetStart - scrollDetails.offsetEnd - virtualScrollPaddingAfter.value;
    if (prevScrollStart === scrollDetails.scrollStart) {
      return;
    }
    if (scrollDetails.scrollMaxSize <= 0) {
      setVirtualScrollSliceRange(scrollEl, scrollDetails, 0, 0);
      return;
    }
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
    const scrollMaxStart = Math.floor(scrollDetails.scrollMaxSize - Math.max(scrollDetails.scrollViewSize, scrollDetails.offsetEnd) - Math.min(virtualScrollSizes[listLastIndex], scrollDetails.scrollViewSize / 2));
    if (scrollMaxStart > 0 && Math.ceil(scrollDetails.scrollStart) >= scrollMaxStart) {
      setVirtualScrollSliceRange(scrollEl, scrollDetails, listLastIndex, scrollDetails.scrollMaxSize - scrollDetails.offsetEnd - virtualScrollSizesAgg.reduce(sumFn, 0));
      return;
    }
    let toIndex = 0, listOffset = scrollDetails.scrollStart - scrollDetails.offsetStart, offset = listOffset;
    if (listOffset <= listEndOffset && listOffset + scrollDetails.scrollViewSize >= virtualScrollPaddingBefore.value) {
      listOffset -= virtualScrollPaddingBefore.value;
      toIndex = virtualScrollSliceRange.value.from;
      offset = listOffset;
    } else {
      for (let j = 0; listOffset >= virtualScrollSizesAgg[j] && toIndex < listLastIndex; j++) {
        listOffset -= virtualScrollSizesAgg[j];
        toIndex += aggBucketSize;
      }
    }
    while (listOffset > 0 && toIndex < listLastIndex) {
      listOffset -= virtualScrollSizes[toIndex];
      if (listOffset > -scrollDetails.scrollViewSize) {
        toIndex++;
        offset = listOffset;
      } else {
        offset = virtualScrollSizes[toIndex] + listOffset;
      }
    }
    setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset);
  }
  function setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset, align) {
    const alignForce = typeof align === "string" && align.indexOf("-force") > -1;
    const alignEnd = alignForce === true ? align.replace("-force", "") : align;
    const alignRange = alignEnd !== void 0 ? alignEnd : "start";
    let from = Math.max(0, toIndex - virtualScrollSliceSizeComputed.value[alignRange]), to = from + virtualScrollSliceSizeComputed.value.total;
    if (to > virtualScrollLength.value) {
      to = virtualScrollLength.value;
      from = Math.max(0, to - virtualScrollSliceSizeComputed.value.total);
    }
    prevScrollStart = scrollDetails.scrollStart;
    const rangeChanged = from !== virtualScrollSliceRange.value.from || to !== virtualScrollSliceRange.value.to;
    if (rangeChanged === false && alignEnd === void 0) {
      emitScroll(toIndex);
      return;
    }
    const { activeElement } = document;
    if (rangeChanged === true && contentRef.value !== null && contentRef.value !== activeElement && contentRef.value.contains(activeElement) === true) {
      const onBlurFn = () => {
        contentRef.value.focus();
      };
      activeElement.addEventListener("blur", onBlurFn, true);
      requestAnimationFrame(() => {
        activeElement.removeEventListener("blur", onBlurFn, true);
      });
    }
    setOverflowAnchor(vsId, toIndex - from + 1);
    const sizeBefore = alignEnd !== void 0 ? virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0) : 0;
    if (rangeChanged === true) {
      const tempTo = to >= virtualScrollSliceRange.value.from && from <= virtualScrollSliceRange.value.to ? virtualScrollSliceRange.value.to : to;
      virtualScrollSliceRange.value = { from, to: tempTo };
      virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, from);
      virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
      requestAnimationFrame(() => {
        if (virtualScrollSliceRange.value.to !== to && prevScrollStart === scrollDetails.scrollStart) {
          virtualScrollSliceRange.value = { from: virtualScrollSliceRange.value.from, to };
          virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
        }
      });
    }
    requestAnimationFrame(() => {
      if (prevScrollStart !== scrollDetails.scrollStart) {
        return;
      }
      if (rangeChanged === true) {
        updateVirtualScrollSizes(from);
      }
      const sizeAfter = virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0), posStart = sizeAfter + scrollDetails.offsetStart + virtualScrollPaddingBefore.value, posEnd = posStart + virtualScrollSizes[toIndex];
      let scrollPosition = posStart + offset;
      if (alignEnd !== void 0) {
        const sizeDiff = sizeAfter - sizeBefore;
        const scrollStart = scrollDetails.scrollStart + sizeDiff;
        scrollPosition = alignForce !== true && scrollStart < posStart && posEnd < scrollStart + scrollDetails.scrollViewSize ? scrollStart : alignEnd === "end" ? posEnd - scrollDetails.scrollViewSize : posStart - (alignEnd === "start" ? 0 : Math.round((scrollDetails.scrollViewSize - virtualScrollSizes[toIndex]) / 2));
      }
      prevScrollStart = scrollPosition;
      setScroll(scrollEl, scrollPosition, props.virtualScrollHorizontal, $q.lang.rtl);
      emitScroll(toIndex);
    });
  }
  function updateVirtualScrollSizes(from) {
    const contentEl = contentRef.value;
    if (contentEl) {
      const children = slice.call(contentEl.children).filter((el) => el.classList.contains("q-virtual-scroll--skip") === false), childrenLength = children.length, sizeFn = props.virtualScrollHorizontal === true ? (el) => el.getBoundingClientRect().width : (el) => el.offsetHeight;
      let index = from, size, diff;
      for (let i = 0; i < childrenLength; ) {
        size = sizeFn(children[i]);
        i++;
        while (i < childrenLength && children[i].classList.contains("q-virtual-scroll--with-prev") === true) {
          size += sizeFn(children[i]);
          i++;
        }
        diff = size - virtualScrollSizes[index];
        if (diff !== 0) {
          virtualScrollSizes[index] += diff;
          virtualScrollSizesAgg[Math.floor(index / aggBucketSize)] += diff;
        }
        index++;
      }
    }
  }
  function localResetVirtualScroll(toIndex, fullReset) {
    const defaultSize = 1 * virtualScrollItemSizeComputed.value;
    if (fullReset === true || Array.isArray(virtualScrollSizes) === false) {
      virtualScrollSizes = [];
    }
    const oldVirtualScrollSizesLength = virtualScrollSizes.length;
    virtualScrollSizes.length = virtualScrollLength.value;
    for (let i = virtualScrollLength.value - 1; i >= oldVirtualScrollSizesLength; i--) {
      virtualScrollSizes[i] = defaultSize;
    }
    const jMax = Math.floor((virtualScrollLength.value - 1) / aggBucketSize);
    virtualScrollSizesAgg = [];
    for (let j = 0; j <= jMax; j++) {
      let size = 0;
      const iMax = Math.min((j + 1) * aggBucketSize, virtualScrollLength.value);
      for (let i = j * aggBucketSize; i < iMax; i++) {
        size += virtualScrollSizes[i];
      }
      virtualScrollSizesAgg.push(size);
    }
    prevToIndex = -1;
    prevScrollStart = void 0;
    if (toIndex >= 0) {
      updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
      nextTick(() => {
        scrollTo(toIndex);
      });
    } else {
      virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, virtualScrollSliceRange.value.from);
      virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, virtualScrollSliceRange.value.to, virtualScrollLength.value);
      onVirtualScrollEvt();
    }
  }
  function setVirtualScrollSize(scrollViewSize) {
    if (scrollViewSize === void 0 && typeof window !== "undefined") {
      const scrollEl = getVirtualScrollTarget();
      if (scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
        scrollViewSize = getScrollDetails(scrollEl, getVirtualScrollEl(), beforeRef.value, afterRef.value, props.virtualScrollHorizontal, $q.lang.rtl, props.virtualScrollStickySizeStart, props.virtualScrollStickySizeEnd).scrollViewSize;
      }
    }
    localScrollViewSize = scrollViewSize;
    const multiplier = 1 + props.virtualScrollSliceRatioBefore + props.virtualScrollSliceRatioAfter;
    const view = scrollViewSize === void 0 || scrollViewSize <= 0 ? 1 : Math.ceil(scrollViewSize / virtualScrollItemSizeComputed.value);
    const baseSize = Math.max(10, view, Math.ceil(props.virtualScrollSliceSize / multiplier));
    virtualScrollSliceSizeComputed.value = {
      total: Math.ceil(baseSize * multiplier),
      start: Math.ceil(baseSize * props.virtualScrollSliceRatioBefore),
      center: Math.ceil(baseSize * (0.5 + props.virtualScrollSliceRatioBefore)),
      end: Math.ceil(baseSize * (1 + props.virtualScrollSliceRatioBefore)),
      view
    };
  }
  function padVirtualScroll(tag, content) {
    const paddingSize = props.virtualScrollHorizontal === true ? "width" : "height";
    const style = {
      ["--q-virtual-scroll-item-" + paddingSize]: virtualScrollItemSizeComputed.value + "px"
    };
    return [
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef
      }, [
        h("tr", [
          h("td", {
            style: __spreadValues({ [paddingSize]: `${virtualScrollPaddingBefore.value}px` }, style),
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef,
        style: __spreadValues({ [paddingSize]: `${virtualScrollPaddingBefore.value}px` }, style)
      }),
      h(tag, {
        class: "q-virtual-scroll__content",
        key: "content",
        ref: contentRef,
        id: vsId,
        tabindex: -1
      }, content.flat()),
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef
      }, [
        h("tr", [
          h("td", {
            style: __spreadValues({ [paddingSize]: `${virtualScrollPaddingAfter.value}px` }, style),
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef,
        style: __spreadValues({ [paddingSize]: `${virtualScrollPaddingAfter.value}px` }, style)
      })
    ];
  }
  function emitScroll(index) {
    if (prevToIndex !== index) {
      props.onVirtualScroll !== void 0 && emit("virtual-scroll", {
        index,
        from: virtualScrollSliceRange.value.from,
        to: virtualScrollSliceRange.value.to - 1,
        direction: index < prevToIndex ? "decrease" : "increase",
        ref: proxy
      });
      prevToIndex = index;
    }
  }
  setVirtualScrollSize();
  const onVirtualScrollEvt = debounce(localOnVirtualScrollEvt, $q.platform.is.ios === true ? 120 : 35);
  onBeforeMount(() => {
    setVirtualScrollSize();
  });
  onActivated(() => {
    const scrollEl = getVirtualScrollTarget();
    if (prevScrollStart !== void 0 && scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
      setScroll(scrollEl, prevScrollStart, props.virtualScrollHorizontal, $q.lang.rtl);
    } else {
      scrollTo(prevToIndex);
    }
  });
  setOverflowAnchor !== noop && onBeforeUnmount(() => {
    const styleSheet = document.getElementById(vsId + "_ss");
    styleSheet !== null && styleSheet.remove();
  });
  Object.assign(proxy, { scrollTo, reset, refresh });
  return {
    virtualScrollSliceRange,
    virtualScrollSliceSizeComputed,
    setVirtualScrollSize,
    onVirtualScrollEvt,
    localResetVirtualScroll,
    padVirtualScroll,
    scrollTo,
    reset,
    refresh
  };
}
const hasMap = typeof Map === "function", hasSet = typeof Set === "function", hasArrayBuffer = typeof ArrayBuffer === "function";
function isDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor) {
      return false;
    }
    let length, i;
    if (a.constructor === Array) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (isDeepEqual(a[i], b[i]) !== true) {
          return false;
        }
      }
      return true;
    }
    if (hasMap === true && a.constructor === Map) {
      if (a.size !== b.size) {
        return false;
      }
      i = a.entries().next();
      while (i.done !== true) {
        if (b.has(i.value[0]) !== true) {
          return false;
        }
        i = i.next();
      }
      i = a.entries().next();
      while (i.done !== true) {
        if (isDeepEqual(i.value[1], b.get(i.value[0])) !== true) {
          return false;
        }
        i = i.next();
      }
      return true;
    }
    if (hasSet === true && a.constructor === Set) {
      if (a.size !== b.size) {
        return false;
      }
      i = a.entries().next();
      while (i.done !== true) {
        if (b.has(i.value[0]) !== true) {
          return false;
        }
        i = i.next();
      }
      return true;
    }
    if (hasArrayBuffer === true && a.buffer != null && a.buffer.constructor === ArrayBuffer) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }
    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf();
    }
    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString();
    }
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (isDeepEqual(a[key], b[key]) !== true) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function isNumber(v) {
  return typeof v === "number" && isFinite(v);
}
const validateNewValueMode = (v) => ["add", "add-unique", "toggle"].includes(v);
const reEscapeList = ".*+?^${}()|[]\\";
const fieldPropsList = Object.keys(useFieldProps);
var QSelect = createComponent({
  name: "QSelect",
  inheritAttrs: false,
  props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useVirtualScrollProps), useFormProps), useFieldProps), {
    modelValue: {
      required: true
    },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    autocomplete: String,
    transitionShow: String,
    transitionHide: String,
    transitionDuration: [String, Number],
    behavior: {
      type: String,
      validator: (v) => ["default", "menu", "dialog"].includes(v),
      default: "default"
    },
    virtualScrollItemSize: {
      type: [Number, String],
      default: void 0
    },
    onNewValue: Function,
    onFilter: Function
  }),
  emits: [
    ...useFieldEmits,
    "add",
    "remove",
    "input-value",
    "keyup",
    "keypress",
    "keydown",
    "filter-abort"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const menu = ref(false);
    const dialog = ref(false);
    const optionIndex = ref(-1);
    const inputValue = ref("");
    const dialogFieldFocused = ref(false);
    const innerLoadingIndicator = ref(false);
    let inputTimer, innerValueCache, hasDialog, userInputValue, filterId, defaultInputValue, transitionShowComputed, searchBuffer, searchBufferExp;
    const inputRef = ref(null);
    const targetRef = ref(null);
    const menuRef = ref(null);
    const dialogRef = ref(null);
    const menuContentRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const onComposition = useKeyComposition(onInput);
    const virtualScrollLength = computed(() => Array.isArray(props.options) ? props.options.length : 0);
    const virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize === void 0 ? props.dense === true ? 24 : 48 : props.virtualScrollItemSize);
    const {
      virtualScrollSliceRange,
      virtualScrollSliceSizeComputed,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
      scrollTo,
      setVirtualScrollSize
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl,
      virtualScrollItemSizeComputed
    });
    const state = useFieldState();
    const innerValue = computed(() => {
      const mapNull = props.mapOptions === true && props.multiple !== true, val = props.modelValue !== void 0 && (props.modelValue !== null || mapNull === true) ? props.multiple === true && Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] : [];
      if (props.mapOptions === true && Array.isArray(props.options) === true) {
        const cache = props.mapOptions === true && innerValueCache !== void 0 ? innerValueCache : [];
        const values = val.map((v) => getOption(v, cache));
        return props.modelValue === null && mapNull === true ? values.filter((v) => v !== null) : values;
      }
      return val;
    });
    const innerFieldProps = computed(() => {
      const acc = {};
      fieldPropsList.forEach((key) => {
        const val = props[key];
        if (val !== void 0) {
          acc[key] = val;
        }
      });
      return acc;
    });
    const isOptionsDark = computed(() => props.optionsDark === null ? state.isDark.value : props.optionsDark);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const computedInputClass = computed(() => {
      let cls = "q-field__input q-placeholder col";
      if (props.hideSelected === true || innerValue.value.length === 0) {
        return [cls, props.inputClass];
      }
      cls += " q-field__input--padding";
      return props.inputClass === void 0 ? cls : [cls, props.inputClass];
    });
    const menuContentClass = computed(() => (props.virtualScrollHorizontal === true ? "q-virtual-scroll--horizontal" : "") + (props.popupContentClass ? " " + props.popupContentClass : ""));
    const noOptions = computed(() => virtualScrollLength.value === 0);
    const selectedString = computed(() => innerValue.value.map((opt) => getOptionLabel.value(opt)).join(", "));
    const needsHtmlFn = computed(() => props.optionsHtml === true ? () => true : (opt) => opt !== void 0 && opt !== null && opt.html === true);
    const valueAsHtml = computed(() => props.displayValueHtml === true || props.displayValue === void 0 && (props.optionsHtml === true || innerValue.value.some(needsHtmlFn.value)));
    const tabindex = computed(() => state.focused.value === true ? props.tabindex : -1);
    const comboboxAttrs = computed(() => ({
      tabindex: props.tabindex,
      role: "combobox",
      "aria-label": props.label,
      "aria-autocomplete": props.useInput === true ? "list" : "none",
      "aria-expanded": menu.value === true ? "true" : "false",
      "aria-owns": `${state.targetUid.value}_lb`,
      "aria-controls": `${state.targetUid.value}_lb`
    }));
    const listboxAttrs = computed(() => {
      const attrs = {
        id: `${state.targetUid.value}_lb`,
        role: "listbox",
        "aria-multiselectable": props.multiple === true ? "true" : "false"
      };
      if (optionIndex.value >= 0) {
        attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
      }
      return attrs;
    });
    const selectedScope = computed(() => {
      return innerValue.value.map((opt, i) => ({
        index: i,
        opt,
        html: needsHtmlFn.value(opt),
        selected: true,
        removeAtIndex: removeAtIndexAndFocus,
        toggleOption,
        tabindex: tabindex.value
      }));
    });
    const optionScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const { from, to } = virtualScrollSliceRange.value;
      return props.options.slice(from, to).map((opt, i) => {
        const disable = isOptionDisabled.value(opt) === true;
        const index = from + i;
        const itemProps = {
          clickable: true,
          active: false,
          activeClass: computedOptionsSelectedClass.value,
          manualFocus: true,
          focused: false,
          disable,
          tabindex: -1,
          dense: props.optionsDense,
          dark: isOptionsDark.value,
          role: "option",
          id: `${state.targetUid.value}_${index}`,
          onClick: () => {
            toggleOption(opt);
          }
        };
        if (disable !== true) {
          isOptionSelected(opt) === true && (itemProps.active = true);
          optionIndex.value === index && (itemProps.focused = true);
          itemProps["aria-selected"] = itemProps.active === true ? "true" : "false";
          if ($q.platform.is.desktop === true) {
            itemProps.onMousemove = () => {
              setOptionIndex(index);
            };
          }
        }
        return {
          index,
          opt,
          html: needsHtmlFn.value(opt),
          label: getOptionLabel.value(opt),
          selected: itemProps.active,
          focused: itemProps.focused,
          toggleOption,
          setOptionIndex,
          itemProps
        };
      });
    });
    const dropdownArrowIcon = computed(() => props.dropdownIcon !== void 0 ? props.dropdownIcon : $q.iconSet.arrow.dropdown);
    const squaredMenu = computed(() => props.optionsCover === false && props.outlined !== true && props.standout !== true && props.borderless !== true && props.rounded !== true);
    const computedOptionsSelectedClass = computed(() => props.optionsSelectedClass !== void 0 ? props.optionsSelectedClass : props.color !== void 0 ? `text-${props.color}` : "");
    const getOptionValue = computed(() => getPropValueFn(props.optionValue, "value"));
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, "label"));
    const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, "disable"));
    const innerOptionsValue = computed(() => innerValue.value.map((opt) => getOptionValue.value(opt)));
    const inputControlEvents = computed(() => {
      const evt = {
        onInput,
        onChange: onComposition,
        onKeydown: onTargetKeydown,
        onKeyup: onTargetAutocomplete,
        onKeypress: onTargetKeypress,
        onFocus: selectInputText,
        onClick(e) {
          hasDialog === true && stop(e);
        }
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      return evt;
    });
    watch(innerValue, (val) => {
      innerValueCache = val;
      if (props.useInput === true && props.fillInput === true && props.multiple !== true && state.innerLoading.value !== true && (dialog.value !== true && menu.value !== true || hasValue.value !== true)) {
        userInputValue !== true && resetInputValue();
        if (dialog.value === true || menu.value === true) {
          filter("");
        }
      }
    }, { immediate: true });
    watch(() => props.fillInput, resetInputValue);
    watch(menu, updateMenu);
    function getEmittingOptionValue(opt) {
      return props.emitValue === true ? getOptionValue.value(opt) : opt;
    }
    function removeAtIndex(index) {
      if (index > -1 && index < innerValue.value.length) {
        if (props.multiple === true) {
          const model = props.modelValue.slice();
          emit("remove", { index, value: model.splice(index, 1)[0] });
          emit("update:modelValue", model);
        } else {
          emit("update:modelValue", null);
        }
      }
    }
    function removeAtIndexAndFocus(index) {
      removeAtIndex(index);
      state.focus();
    }
    function add(opt, unique) {
      const val = getEmittingOptionValue(opt);
      if (props.multiple !== true) {
        props.fillInput === true && updateInputValue(getOptionLabel.value(opt), true, true);
        emit("update:modelValue", val);
        return;
      }
      if (innerValue.value.length === 0) {
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      if (unique === true && isOptionSelected(opt) === true) {
        return;
      }
      if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) {
        return;
      }
      const model = props.modelValue.slice();
      emit("add", { index: model.length, value: val });
      model.push(val);
      emit("update:modelValue", model);
    }
    function toggleOption(opt, keepOpen) {
      if (state.editable.value !== true || opt === void 0 || isOptionDisabled.value(opt) === true) {
        return;
      }
      const optValue = getOptionValue.value(opt);
      if (props.multiple !== true) {
        if (keepOpen !== true) {
          updateInputValue(props.fillInput === true ? getOptionLabel.value(opt) : "", true, true);
          hidePopup();
        }
        targetRef.value !== null && targetRef.value.focus();
        if (isDeepEqual(getOptionValue.value(innerValue.value[0]), optValue) !== true) {
          emit("update:modelValue", props.emitValue === true ? optValue : opt);
        }
        return;
      }
      (hasDialog !== true || dialogFieldFocused.value === true) && state.focus();
      selectInputText();
      if (innerValue.value.length === 0) {
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      const model = props.modelValue.slice(), index = innerOptionsValue.value.findIndex((v) => isDeepEqual(v, optValue));
      if (index > -1) {
        emit("remove", { index, value: model.splice(index, 1)[0] });
      } else {
        if (props.maxValues !== void 0 && model.length >= props.maxValues) {
          return;
        }
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: model.length, value: val });
        model.push(val);
      }
      emit("update:modelValue", model);
    }
    function setOptionIndex(index) {
      if ($q.platform.is.desktop !== true) {
        return;
      }
      const val = index > -1 && index < virtualScrollLength.value ? index : -1;
      if (optionIndex.value !== val) {
        optionIndex.value = val;
      }
    }
    function moveOptionSelection(offset = 1, skipInputValue) {
      if (menu.value === true) {
        let index = optionIndex.value;
        do {
          index = normalizeToInterval(index + offset, -1, virtualScrollLength.value - 1);
        } while (index !== -1 && index !== optionIndex.value && isOptionDisabled.value(props.options[index]) === true);
        if (optionIndex.value !== index) {
          setOptionIndex(index);
          scrollTo(index);
          if (skipInputValue !== true && props.useInput === true && props.fillInput === true) {
            setInputValue(index >= 0 ? getOptionLabel.value(props.options[index]) : defaultInputValue);
          }
        }
      }
    }
    function getOption(value, valueCache) {
      const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value);
      return props.options.find(fn) || valueCache.find(fn) || value;
    }
    function getPropValueFn(propValue, defaultVal) {
      const val = propValue !== void 0 ? propValue : defaultVal;
      return typeof val === "function" ? val : (opt) => Object(opt) === opt && val in opt ? opt[val] : opt;
    }
    function isOptionSelected(opt) {
      const val = getOptionValue.value(opt);
      return innerOptionsValue.value.find((v) => isDeepEqual(v, val)) !== void 0;
    }
    function selectInputText() {
      if (props.useInput === true && targetRef.value !== null) {
        targetRef.value.select();
      }
    }
    function onTargetKeyup(e) {
      if (isKeyCode(e, 27) === true && menu.value === true) {
        stop(e);
        hidePopup();
        resetInputValue();
      }
      emit("keyup", e);
    }
    function onTargetAutocomplete(e) {
      const { value } = e.target;
      if (e.keyCode !== void 0) {
        onTargetKeyup(e);
        return;
      }
      e.target.value = "";
      clearTimeout(inputTimer);
      resetInputValue();
      if (typeof value === "string" && value.length > 0) {
        const needle = value.toLocaleLowerCase();
        let fn = (opt) => getOptionValue.value(opt).toLocaleLowerCase() === needle;
        let option = props.options.find(fn);
        if (option !== void 0) {
          if (innerValue.value.indexOf(option) === -1) {
            toggleOption(option);
          } else {
            hidePopup();
          }
        } else {
          fn = (opt) => getOptionLabel.value(opt).toLocaleLowerCase() === needle;
          option = props.options.find(fn);
          if (option !== void 0) {
            if (innerValue.value.indexOf(option) === -1) {
              toggleOption(option);
            } else {
              hidePopup();
            }
          } else {
            filter(value, true);
          }
        }
      } else {
        state.clearValue(e);
      }
    }
    function onTargetKeypress(e) {
      emit("keypress", e);
    }
    function onTargetKeydown(e) {
      emit("keydown", e);
      if (shouldIgnoreKey(e) === true) {
        return;
      }
      const newValueModeValid = inputValue.value.length > 0 && (props.newValueMode !== void 0 || props.onNewValue !== void 0);
      const tabShouldSelect = e.shiftKey !== true && props.multiple !== true && (optionIndex.value > -1 || newValueModeValid === true);
      if (e.keyCode === 27) {
        prevent(e);
        return;
      }
      if (e.keyCode === 9 && tabShouldSelect === false) {
        closeMenu();
        return;
      }
      if (e.target === void 0 || e.target.id !== state.targetUid.value) {
        return;
      }
      if (e.keyCode === 40 && state.innerLoading.value !== true && menu.value === false) {
        stopAndPrevent(e);
        showPopup();
        return;
      }
      if (e.keyCode === 8 && props.hideSelected !== true && inputValue.value.length === 0) {
        if (props.multiple === true && Array.isArray(props.modelValue) === true) {
          removeAtIndex(props.modelValue.length - 1);
        } else if (props.multiple !== true && props.modelValue !== null) {
          emit("update:modelValue", null);
        }
        return;
      }
      if ((e.keyCode === 35 || e.keyCode === 36) && (typeof inputValue.value !== "string" || inputValue.value.length === 0)) {
        stopAndPrevent(e);
        optionIndex.value = -1;
        moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple);
      }
      if ((e.keyCode === 33 || e.keyCode === 34) && virtualScrollSliceSizeComputed.value !== void 0) {
        stopAndPrevent(e);
        optionIndex.value = Math.max(-1, Math.min(virtualScrollLength.value, optionIndex.value + (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view));
        moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple);
      }
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);
        moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple);
      }
      const optionsLength = virtualScrollLength.value;
      if (searchBuffer === void 0 || searchBufferExp < Date.now()) {
        searchBuffer = "";
      }
      if (optionsLength > 0 && props.useInput !== true && e.key !== void 0 && e.key.length === 1 && e.altKey === e.ctrlKey && (e.keyCode !== 32 || searchBuffer.length > 0)) {
        menu.value !== true && showPopup(e);
        const char = e.key.toLocaleLowerCase(), keyRepeat = searchBuffer.length === 1 && searchBuffer[0] === char;
        searchBufferExp = Date.now() + 1500;
        if (keyRepeat === false) {
          stopAndPrevent(e);
          searchBuffer += char;
        }
        const searchRe = new RegExp("^" + searchBuffer.split("").map((l) => reEscapeList.indexOf(l) > -1 ? "\\" + l : l).join(".*"), "i");
        let index = optionIndex.value;
        if (keyRepeat === true || index < 0 || searchRe.test(getOptionLabel.value(props.options[index])) !== true) {
          do {
            index = normalizeToInterval(index + 1, -1, optionsLength - 1);
          } while (index !== optionIndex.value && (isOptionDisabled.value(props.options[index]) === true || searchRe.test(getOptionLabel.value(props.options[index])) !== true));
        }
        if (optionIndex.value !== index) {
          nextTick(() => {
            setOptionIndex(index);
            scrollTo(index);
            if (index >= 0 && props.useInput === true && props.fillInput === true) {
              setInputValue(getOptionLabel.value(props.options[index]));
            }
          });
        }
        return;
      }
      if (e.keyCode !== 13 && (e.keyCode !== 32 || props.useInput === true || searchBuffer !== "") && (e.keyCode !== 9 || tabShouldSelect === false)) {
        return;
      }
      e.keyCode !== 9 && stopAndPrevent(e);
      if (optionIndex.value > -1 && optionIndex.value < optionsLength) {
        toggleOption(props.options[optionIndex.value]);
        return;
      }
      if (newValueModeValid === true) {
        const done = (val, mode) => {
          if (mode) {
            if (validateNewValueMode(mode) !== true) {
              return;
            }
          } else {
            mode = props.newValueMode;
          }
          if (val === void 0 || val === null) {
            return;
          }
          updateInputValue("", props.multiple !== true, true);
          const fn = mode === "toggle" ? toggleOption : add;
          fn(val, mode === "add-unique");
          if (props.multiple !== true) {
            targetRef.value !== null && targetRef.value.focus();
            hidePopup();
          }
        };
        if (props.onNewValue !== void 0) {
          emit("new-value", inputValue.value, done);
        } else {
          done(inputValue.value);
        }
        if (props.multiple !== true) {
          return;
        }
      }
      if (menu.value === true) {
        closeMenu();
      } else if (state.innerLoading.value !== true) {
        showPopup();
      }
    }
    function getVirtualScrollEl() {
      return hasDialog === true ? menuContentRef.value : menuRef.value !== null && menuRef.value.__qPortalInnerRef.value !== null ? menuRef.value.__qPortalInnerRef.value : void 0;
    }
    function getVirtualScrollTarget() {
      return getVirtualScrollEl();
    }
    function getSelection() {
      if (props.hideSelected === true) {
        return [];
      }
      if (slots["selected-item"] !== void 0) {
        return selectedScope.value.map((scope) => slots["selected-item"](scope)).slice();
      }
      if (slots.selected !== void 0) {
        return [].concat(slots.selected());
      }
      if (props.useChips === true) {
        return selectedScope.value.map((scope, i) => h(QChip, {
          key: "option-" + i,
          removable: state.editable.value === true && isOptionDisabled.value(scope.opt) !== true,
          dense: true,
          textColor: props.color,
          tabindex: tabindex.value,
          onRemove() {
            scope.removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          [scope.html === true ? "innerHTML" : "textContent"]: getOptionLabel.value(scope.opt)
        })));
      }
      return [
        h("span", {
          [valueAsHtml.value === true ? "innerHTML" : "textContent"]: props.displayValue !== void 0 ? props.displayValue : selectedString.value
        })
      ];
    }
    function getAllOptions() {
      if (noOptions.value === true) {
        return slots["no-option"] !== void 0 ? slots["no-option"]({ inputValue: inputValue.value }) : void 0;
      }
      const fn = slots.option !== void 0 ? slots.option : (scope) => {
        return h(QItem, __spreadValues({
          key: scope.index
        }, scope.itemProps), () => {
          return h(QItemSection, () => h(QItemLabel, () => h("span", {
            [scope.html === true ? "innerHTML" : "textContent"]: scope.label
          })));
        });
      };
      let options = padVirtualScroll("div", optionScope.value.map(fn));
      if (slots["before-options"] !== void 0) {
        options = slots["before-options"]().concat(options);
      }
      return hMergeSlot(slots["after-options"], options);
    }
    function getInput(fromDialog, isTarget) {
      const data = __spreadValues(__spreadProps(__spreadValues(__spreadValues({
        ref: isTarget === true ? targetRef : void 0,
        key: "i_t",
        class: computedInputClass.value,
        style: props.inputStyle,
        value: inputValue.value !== void 0 ? inputValue.value : "",
        type: "search"
      }, comboboxAttrs.value), state.splitAttrs.attributes.value), {
        id: state.targetUid.value,
        maxlength: props.maxlength,
        autocomplete: props.autocomplete,
        "data-autofocus": fromDialog !== true && props.autofocus === true || void 0,
        disabled: props.disable === true,
        readonly: props.readonly === true
      }), inputControlEvents.value);
      if (fromDialog !== true && hasDialog === true) {
        if (Array.isArray(data.class) === true) {
          data.class[0] += " no-pointer-events";
        } else {
          data.class += " no-pointer-events";
        }
      }
      return h("input", data);
    }
    function onInput(e) {
      clearTimeout(inputTimer);
      if (e && e.target && e.target.composing === true) {
        return;
      }
      setInputValue(e.target.value || "");
      userInputValue = true;
      defaultInputValue = inputValue.value;
      if (state.focused.value !== true && (hasDialog !== true || dialogFieldFocused.value === true)) {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        inputTimer = setTimeout(() => {
          filter(inputValue.value);
        }, props.inputDebounce);
      }
    }
    function setInputValue(val) {
      if (inputValue.value !== val) {
        inputValue.value = val;
        emit("input-value", val);
      }
    }
    function updateInputValue(val, noFiltering, internal) {
      userInputValue = internal !== true;
      if (props.useInput === true) {
        setInputValue(val);
        if (noFiltering === true || internal !== true) {
          defaultInputValue = val;
        }
        noFiltering !== true && filter(val);
      }
    }
    function filter(val, keepClosed) {
      if (props.onFilter === void 0 || keepClosed !== true && state.focused.value !== true) {
        return;
      }
      if (state.innerLoading.value === true) {
        emit("filter-abort");
      } else {
        state.innerLoading.value = true;
        innerLoadingIndicator.value = true;
      }
      if (val !== "" && props.multiple !== true && innerValue.value.length > 0 && userInputValue !== true && val === getOptionLabel.value(innerValue.value[0])) {
        val = "";
      }
      const localFilterId = setTimeout(() => {
        menu.value === true && (menu.value = false);
      }, 10);
      clearTimeout(filterId);
      filterId = localFilterId;
      emit("filter", val, (fn, afterFn) => {
        if ((keepClosed === true || state.focused.value === true) && filterId === localFilterId) {
          clearTimeout(filterId);
          typeof fn === "function" && fn();
          innerLoadingIndicator.value = false;
          nextTick(() => {
            state.innerLoading.value = false;
            if (state.editable.value === true) {
              if (keepClosed === true) {
                menu.value === true && hidePopup();
              } else if (menu.value === true) {
                updateMenu(true);
              } else {
                menu.value = true;
              }
            }
            typeof afterFn === "function" && nextTick(() => {
              afterFn(proxy);
            });
          });
        }
      }, () => {
        if (state.focused.value === true && filterId === localFilterId) {
          clearTimeout(filterId);
          state.innerLoading.value = false;
          innerLoadingIndicator.value = false;
        }
        menu.value === true && (menu.value = false);
      });
    }
    function getMenu() {
      return h(QMenu, __spreadProps(__spreadValues({
        ref: menuRef,
        class: menuContentClass.value,
        style: props.popupContentStyle,
        modelValue: menu.value,
        fit: props.menuShrink !== true,
        cover: props.optionsCover === true && noOptions.value !== true && props.useInput !== true,
        anchor: props.menuAnchor,
        self: props.menuSelf,
        offset: props.menuOffset,
        dark: isOptionsDark.value,
        noParentEvent: true,
        noRefocus: true,
        noFocus: true,
        square: squaredMenu.value,
        transitionShow: props.transitionShow,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        separateClosePopup: true
      }, listboxAttrs.value), {
        onScrollPassive: onVirtualScrollEvt,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onMenuBeforeHide,
        onShow: onMenuShow
      }), getAllOptions);
    }
    function onMenuBeforeHide(e) {
      onControlPopupHide(e);
      closeMenu();
    }
    function onMenuShow() {
      setVirtualScrollSize();
    }
    function onDialogFieldFocus(e) {
      stop(e);
      targetRef.value !== null && targetRef.value.focus();
      dialogFieldFocused.value = true;
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }
    function onDialogFieldBlur(e) {
      stop(e);
      nextTick(() => {
        dialogFieldFocused.value = false;
      });
    }
    function getDialog() {
      const content = [
        h(QField, __spreadProps(__spreadValues(__spreadProps(__spreadValues({
          class: `col-auto ${state.fieldClass.value}`
        }, innerFieldProps.value), {
          for: state.targetUid.value,
          dark: isOptionsDark.value,
          square: true,
          loading: innerLoadingIndicator.value,
          itemAligned: false,
          filled: true,
          stackLabel: inputValue.value.length > 0
        }), state.splitAttrs.listeners.value), {
          onFocus: onDialogFieldFocus,
          onBlur: onDialogFieldBlur
        }), __spreadProps(__spreadValues({}, slots), {
          rawControl: () => state.getControl(true),
          before: void 0,
          after: void 0
        }))
      ];
      menu.value === true && content.push(h("div", __spreadProps(__spreadValues({
        ref: menuContentRef,
        class: menuContentClass.value + " scroll",
        style: props.popupContentStyle
      }, listboxAttrs.value), {
        onClick: prevent,
        onScrollPassive: onVirtualScrollEvt
      }), getAllOptions()));
      return h(QDialog, {
        ref: dialogRef,
        modelValue: dialog.value,
        position: props.useInput === true ? "top" : void 0,
        transitionShow: transitionShowComputed,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onDialogBeforeHide,
        onHide: onDialogHide,
        onShow: onDialogShow
      }, () => h("div", {
        class: "q-select__dialog" + (isOptionsDark.value === true ? " q-select__dialog--dark q-dark" : "") + (dialogFieldFocused.value === true ? " q-select__dialog--focused" : "")
      }, content));
    }
    function onDialogBeforeHide(e) {
      onControlPopupHide(e);
      if (dialogRef.value !== null) {
        dialogRef.value.__updateRefocusTarget(state.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child"));
      }
      state.focused.value = false;
    }
    function onDialogHide(e) {
      hidePopup();
      state.focused.value === false && emit("blur", e);
      resetInputValue();
    }
    function onDialogShow() {
      const el = document.activeElement;
      if ((el === null || el.id !== state.targetUid.value) && targetRef.value !== null && targetRef.value !== el) {
        targetRef.value.focus();
      }
      setVirtualScrollSize();
    }
    function closeMenu() {
      if (dialog.value === true) {
        return;
      }
      optionIndex.value = -1;
      if (menu.value === true) {
        menu.value = false;
      }
      if (state.focused.value === false) {
        clearTimeout(filterId);
        filterId = void 0;
        if (state.innerLoading.value === true) {
          emit("filter-abort");
          state.innerLoading.value = false;
          innerLoadingIndicator.value = false;
        }
      }
    }
    function showPopup(e) {
      if (state.editable.value !== true) {
        return;
      }
      if (hasDialog === true) {
        state.onControlFocusin(e);
        dialog.value = true;
        nextTick(() => {
          state.focus();
        });
      } else {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filter(inputValue.value);
      } else if (noOptions.value !== true || slots["no-option"] !== void 0) {
        menu.value = true;
      }
    }
    function hidePopup() {
      dialog.value = false;
      closeMenu();
    }
    function resetInputValue() {
      props.useInput === true && updateInputValue(props.multiple !== true && props.fillInput === true && innerValue.value.length > 0 ? getOptionLabel.value(innerValue.value[0]) || "" : "", true, true);
    }
    function updateMenu(show) {
      let optionIndex2 = -1;
      if (show === true) {
        if (innerValue.value.length > 0) {
          const val = getOptionValue.value(innerValue.value[0]);
          optionIndex2 = props.options.findIndex((v) => isDeepEqual(getOptionValue.value(v), val));
        }
        localResetVirtualScroll(optionIndex2);
      }
      setOptionIndex(optionIndex2);
    }
    function updateMenuPosition() {
      if (dialog.value === false && menuRef.value !== null) {
        menuRef.value.updatePosition();
      }
    }
    function onControlPopupShow(e) {
      e !== void 0 && stop(e);
      emit("popup-show", e);
      state.hasPopupOpen = true;
      state.onControlFocusin(e);
    }
    function onControlPopupHide(e) {
      e !== void 0 && stop(e);
      emit("popup-hide", e);
      state.hasPopupOpen = false;
      state.onControlFocusout(e);
    }
    function updatePreState() {
      hasDialog = $q.platform.is.mobile !== true && props.behavior !== "dialog" ? false : props.behavior !== "menu" && (props.useInput === true ? slots["no-option"] !== void 0 || props.onFilter !== void 0 || noOptions.value === false : true);
      transitionShowComputed = $q.platform.is.ios === true && hasDialog === true && props.useInput === true ? "fade" : props.transitionShow;
    }
    onBeforeUpdate(updatePreState);
    onUpdated(updateMenuPosition);
    updatePreState();
    onBeforeUnmount(() => {
      clearTimeout(inputTimer);
    });
    Object.assign(proxy, {
      showPopup,
      hidePopup,
      removeAtIndex,
      add,
      toggleOption,
      setOptionIndex,
      moveOptionSelection,
      filter,
      updateMenuPosition,
      updateInputValue,
      isOptionSelected,
      getEmittingOptionValue,
      isOptionDisabled: (...args) => isOptionDisabled.value.apply(null, args),
      getOptionValue: (...args) => getOptionValue.value.apply(null, args),
      getOptionLabel: (...args) => getOptionLabel.value.apply(null, args)
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(() => `q-select q-field--auto-height q-select--with${props.useInput !== true ? "out" : ""}-input q-select--with${props.useChips !== true ? "out" : ""}-chips q-select--${props.multiple === true ? "multiple" : "single"}`),
      inputRef,
      targetRef,
      hasValue,
      showPopup,
      floatingLabel: computed(() => (props.hideSelected === true ? inputValue.value.length > 0 : hasValue.value === true) || fieldValueIsFilled(props.displayValue)),
      getControlChild: () => {
        if (state.editable.value !== false && (dialog.value === true || noOptions.value !== true || slots["no-option"] !== void 0)) {
          return hasDialog === true ? getDialog() : getMenu();
        } else if (state.hasPopupOpen === true) {
          state.hasPopupOpen = false;
        }
      },
      controlEvents: {
        onFocusin(e) {
          state.onControlFocusin(e);
        },
        onFocusout(e) {
          state.onControlFocusout(e, () => {
            resetInputValue();
            closeMenu();
          });
        },
        onClick(e) {
          prevent(e);
          if (hasDialog !== true && menu.value === true) {
            closeMenu();
            targetRef.value !== null && targetRef.value.focus();
            return;
          }
          showPopup(e);
        }
      },
      getControl: (fromDialog) => {
        const child = getSelection();
        const isTarget = fromDialog === true || dialog.value !== true || hasDialog !== true;
        if (props.useInput === true) {
          child.push(getInput(fromDialog, isTarget));
        } else if (state.editable.value === true && isTarget === true) {
          child.push(h("div", __spreadProps(__spreadValues({
            ref: targetRef,
            key: "d_t",
            class: "no-outline",
            id: state.targetUid.value
          }, comboboxAttrs.value), {
            onKeydown: onTargetKeydown,
            onKeyup: onTargetKeyup,
            onKeypress: onTargetKeypress
          })));
          if (typeof props.autocomplete === "string" && props.autocomplete.length > 0) {
            child.push(h("input", {
              class: "q-select__autocomplete-input no-outline",
              autocomplete: props.autocomplete,
              onKeyup: onTargetAutocomplete
            }));
          }
        }
        if (nameProp.value !== void 0 && props.disable !== true && innerOptionsValue.value.length > 0) {
          const opts = innerOptionsValue.value.map((value) => h("option", { value, selected: true }));
          child.push(h("select", {
            class: "hidden",
            name: nameProp.value,
            multiple: props.multiple
          }, opts));
        }
        return h("div", __spreadValues({
          class: "q-field__native row items-center"
        }, state.splitAttrs.attributes.value), child);
      },
      getInnerAppend: () => props.loading !== true && innerLoadingIndicator.value !== true && props.hideDropdownIcon !== true ? [
        h(QIcon, {
          class: "q-select__dropdown-icon" + (menu.value === true ? " rotate-180" : ""),
          name: dropdownArrowIcon.value
        })
      ] : null
    });
    return useField(state);
  }
});
const _sfc_main$3 = {
  components: {
    Header: _sfc_main$4
  },
  extends: _sfc_main$5
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Header = resolveComponent("Header");
  return openBlock(), createBlock(QLayout, {
    view: "hHh LpR fFf",
    class: "bg-grey-1 row justify-center"
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "header", {}, () => [
        createVNode(_component_Header, {
          "left-sidebar": false,
          "right-sidebar": false
        })
      ]),
      createVNode(QPageContainer, { class: "col-8" }, {
        default: withCtx(() => [
          createVNode(QPage, { class: "q-pt-sm" }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
var Layout = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render]]);
const keyCodes = [34, 37, 40, 33, 39, 38];
function getRatio(evt, dragging, reverse, vertical) {
  const pos = position(evt), val = vertical === true ? between((pos.top - dragging.top) / dragging.height, 0, 1) : between((pos.left - dragging.left) / dragging.width, 0, 1);
  return reverse === true ? 1 - val : val;
}
function getModel(ratio, min, max, step, decimals) {
  let model = min + ratio * (max - min);
  if (step > 0) {
    const modulo = (model - min) % step;
    model += (Math.abs(modulo) >= step / 2 ? (modulo < 0 ? -1 : 1) * step : 0) - modulo;
  }
  if (decimals > 0) {
    model = parseFloat(model.toFixed(decimals));
  }
  return between(model, min, max);
}
const useSliderProps = __spreadProps(__spreadValues({}, useDarkProps), {
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1,
    validator: (v) => v >= 0
  },
  color: String,
  labelColor: String,
  labelTextColor: String,
  dense: Boolean,
  label: Boolean,
  labelAlways: Boolean,
  markers: [Boolean, Number],
  snap: Boolean,
  vertical: Boolean,
  reverse: Boolean,
  disable: Boolean,
  readonly: Boolean,
  tabindex: [String, Number],
  thumbPath: {
    type: String,
    default: "M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"
  }
});
const useSliderEmits = ["pan", "update:modelValue", "change"];
function useSlider({ updateValue, updatePosition, getDragging }) {
  const { props, emit, proxy: { $q } } = getCurrentInstance();
  const isDark = useDark(props, $q);
  const active = ref(false);
  const preventFocus = ref(false);
  const focus = ref(false);
  const dragging = ref(false);
  const axis = computed(() => props.vertical === true ? "--v" : "--h");
  const isReversed = computed(() => props.vertical === true ? props.reverse === true : props.reverse !== ($q.lang.rtl === true));
  const editable = computed(() => props.disable !== true && props.readonly !== true && props.min < props.max);
  const classes = computed(() => `q-slider q-slider${axis.value} q-slider--${active.value === true ? "" : "in"}active` + (isReversed.value === true ? " q-slider--reversed" : "") + (props.color !== void 0 ? ` text-${props.color}` : "") + (props.disable === true ? " disabled" : " q-slider--enabled" + (editable.value === true ? " q-slider--editable" : "")) + (focus.value === "both" ? " q-slider--focus" : "") + (props.label || props.labelAlways === true ? " q-slider--label" : "") + (props.labelAlways === true ? " q-slider--label-always" : "") + (isDark.value === true ? " q-slider--dark" : "") + (props.dense === true ? " q-slider--dense q-slider--dense" + axis.value : ""));
  const decimals = computed(() => (String(props.step).trim("0").split(".")[1] || "").length);
  const step = computed(() => props.step === 0 ? 1 : props.step);
  const minMaxDiff = computed(() => props.max - props.min);
  const markerStep = computed(() => isNumber(props.markers) === true ? props.markers : step.value);
  const markerStyle = computed(() => {
    if (minMaxDiff.value !== 0) {
      const size = 100 * markerStep.value / minMaxDiff.value;
      return {
        backgroundSize: props.vertical === true ? `2px ${size}%` : `${size}% 2px`
      };
    }
    return null;
  });
  const tabindex = computed(() => editable.value === true ? props.tabindex || 0 : -1);
  const positionProp = computed(() => props.vertical === true ? isReversed.value === true ? "bottom" : "top" : isReversed.value === true ? "right" : "left");
  const sizeProp = computed(() => props.vertical === true ? "height" : "width");
  const orientation = computed(() => props.vertical === true ? "vertical" : "horizontal");
  const attributes = computed(() => {
    const acc = {
      role: "slider",
      "aria-valuemin": props.min,
      "aria-valuemax": props.max,
      "aria-orientation": orientation.value,
      "data-step": props.step
    };
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  const panDirective = computed(() => {
    return [[
      TouchPan,
      onPan,
      void 0,
      {
        [orientation.value]: true,
        prevent: true,
        stop: true,
        mouse: true,
        mouseAllDir: true
      }
    ]];
  });
  function getThumbSvg() {
    return h("svg", {
      class: "q-slider__thumb absolute",
      viewBox: "0 0 20 20",
      width: "20",
      height: "20",
      "aria-hidden": "true"
    }, [
      h("path", { d: props.thumbPath })
    ]);
  }
  function getPinStyle(percent, ratio) {
    if (props.vertical === true) {
      return {};
    }
    const offset = `${Math.ceil(20 * Math.abs(0.5 - ratio))}px`;
    return {
      pin: {
        transformOrigin: `${$q.lang.rtl === true ? offset : `calc(100% - ${offset})`} 50%`
      },
      pinTextContainer: {
        [$q.lang.rtl === true ? "left" : "right"]: `${percent * 100}%`,
        transform: `translateX(${Math.ceil(($q.lang.rtl === true ? -1 : 1) * 20 * percent)}px)`
      }
    };
  }
  function onPan(event) {
    if (event.isFinal === true) {
      if (dragging.value !== void 0) {
        updatePosition(event.evt);
        event.touch === true && updateValue(true);
        dragging.value = void 0;
        emit("pan", "end");
      }
      active.value = false;
    } else if (event.isFirst === true) {
      dragging.value = getDragging(event.evt);
      updatePosition(event.evt);
      updateValue();
      active.value = true;
      emit("pan", "start");
    } else {
      updatePosition(event.evt);
      updateValue();
    }
  }
  function onBlur() {
    focus.value = false;
  }
  function onActivate(evt) {
    updatePosition(evt, getDragging(evt));
    updateValue();
    preventFocus.value = true;
    active.value = true;
    document.addEventListener("mouseup", onDeactivate, true);
  }
  function onDeactivate() {
    preventFocus.value = false;
    if (dragging.value === false) {
      active.value = false;
    }
    updateValue(true);
    onBlur();
    document.removeEventListener("mouseup", onDeactivate, true);
  }
  function onMobileClick(evt) {
    updatePosition(evt, getDragging(evt));
    updateValue(true);
  }
  function onKeyup(evt) {
    if (keyCodes.includes(evt.keyCode)) {
      updateValue(true);
    }
  }
  onBeforeUnmount(() => {
    document.removeEventListener("mouseup", onDeactivate, true);
  });
  return {
    state: {
      active,
      focus,
      preventFocus,
      dragging,
      axis,
      isReversed,
      editable,
      classes,
      decimals,
      step,
      minMaxDiff,
      markerStyle,
      tabindex,
      positionProp,
      sizeProp,
      attributes,
      panDirective
    },
    methods: {
      onActivate,
      onMobileClick,
      onBlur,
      onKeyup,
      getThumbSvg,
      getPinStyle
    }
  };
}
var QSlider = createComponent({
  name: "QSlider",
  props: __spreadProps(__spreadValues(__spreadValues({}, useSliderProps), useFormProps), {
    modelValue: {
      required: true,
      default: null,
      validator: (v) => typeof v === "number" || v === null
    },
    labelValue: [String, Number]
  }),
  emits: useSliderEmits,
  setup(props, { emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const formAttrs = useFormAttrs(props);
    const injectFormInput = useFormInject(formAttrs);
    const rootRef = ref(null);
    const model = ref(props.modelValue === null ? props.min : props.modelValue);
    const curRatio = ref(0);
    const { state, methods } = useSlider({
      updateValue,
      updatePosition,
      getDragging
    });
    const modelRatio = computed(() => state.minMaxDiff.value === 0 ? 0 : (model.value - props.min) / state.minMaxDiff.value);
    const ratio = computed(() => state.active.value === true ? curRatio.value : modelRatio.value);
    const trackStyle = computed(() => ({
      [state.positionProp.value]: 0,
      [state.sizeProp.value]: `${100 * ratio.value}%`
    }));
    const thumbStyle = computed(() => ({
      [state.positionProp.value]: `${100 * ratio.value}%`
    }));
    const thumbClass = computed(() => state.preventFocus.value === false && state.focus.value === true ? " q-slider--focus" : "");
    const pinClass = computed(() => props.labelColor !== void 0 ? `text-${props.labelColor}` : "");
    const pinTextClass = computed(() => "q-slider__pin-value-marker-text" + (props.labelTextColor !== void 0 ? ` text-${props.labelTextColor}` : ""));
    const events = computed(() => {
      if (state.editable.value !== true) {
        return {};
      }
      return $q.platform.is.mobile === true ? { onClick: methods.onMobileClick } : {
        onMousedown: methods.onActivate,
        onFocus,
        onBlur: methods.onBlur,
        onKeydown,
        onKeyup: methods.onKeyup
      };
    });
    const label = computed(() => props.labelValue !== void 0 ? props.labelValue : model.value);
    const pinStyle = computed(() => {
      const percent = props.reverse === true ? -ratio.value : ratio.value - 1;
      return methods.getPinStyle(percent, ratio.value);
    });
    watch(() => props.modelValue, (v) => {
      model.value = v === null ? 0 : between(v, props.min, props.max);
    });
    watch(() => props.min + props.max, () => {
      model.value = between(model.value, props.min, props.max);
    });
    function updateValue(change) {
      if (model.value !== props.modelValue) {
        emit("update:modelValue", model.value);
      }
      change === true && emit("change", model.value);
    }
    function getDragging() {
      return rootRef.value.getBoundingClientRect();
    }
    function updatePosition(event, dragging = state.dragging.value) {
      const ratio2 = getRatio(event, dragging, state.isReversed.value, props.vertical);
      model.value = getModel(ratio2, props.min, props.max, props.step, state.decimals.value);
      curRatio.value = props.snap !== true || props.step === 0 ? ratio2 : state.minMaxDiff.value === 0 ? 0 : (model.value - props.min) / state.minMaxDiff.value;
    }
    function onFocus() {
      state.focus.value = true;
    }
    function onKeydown(evt) {
      if (!keyCodes.includes(evt.keyCode)) {
        return;
      }
      stopAndPrevent(evt);
      const stepVal = ([34, 33].includes(evt.keyCode) ? 10 : 1) * state.step.value, offset = [34, 37, 40].includes(evt.keyCode) ? -stepVal : stepVal;
      model.value = between(parseFloat((model.value + offset).toFixed(state.decimals.value)), props.min, props.max);
      updateValue();
    }
    return () => {
      const child = [
        methods.getThumbSvg(),
        h("div", { class: "q-slider__focus-ring" })
      ];
      if (props.label === true || props.labelAlways === true) {
        child.push(h("div", {
          class: `q-slider__pin q-slider__pin${state.axis.value} absolute ` + pinClass.value,
          style: pinStyle.value.pin
        }, [
          h("div", {
            class: `q-slider__pin-text-container q-slider__pin-text-container${state.axis.value}`,
            style: pinStyle.value.pinTextContainer
          }, [
            h("span", {
              class: "q-slider__pin-text " + pinTextClass.value
            }, [
              label.value
            ])
          ])
        ]), h("div", {
          class: `q-slider__arrow q-slider__arrow${state.axis.value} ${pinClass.value}`
        }));
      }
      if (props.name !== void 0 && props.disable !== true) {
        injectFormInput(child, "push");
      }
      const track = [
        h("div", {
          class: `q-slider__track q-slider__track${state.axis.value} absolute`,
          style: trackStyle.value
        })
      ];
      props.markers !== false && track.push(h("div", {
        class: `q-slider__track-markers q-slider__track-markers${state.axis.value} absolute-full fit`,
        style: state.markerStyle.value
      }));
      const content = [
        h("div", {
          class: `q-slider__track-container q-slider__track-container${state.axis.value} absolute`
        }, track),
        h("div", {
          class: `q-slider__thumb-container q-slider__thumb-container${state.axis.value} absolute non-selectable` + thumbClass.value,
          style: thumbStyle.value
        }, child)
      ];
      const data = __spreadValues(__spreadProps(__spreadValues({
        ref: rootRef,
        class: state.classes.value + (props.modelValue === null ? " q-slider--no-value" : "")
      }, state.attributes.value), {
        "aria-valuenow": props.modelValue,
        tabindex: state.tabindex.value
      }), events.value);
      return hDir("div", data, content, "slide", state.editable.value, () => state.panDirective.value);
    };
  }
});
function getIndicatorClass(color, top, vertical) {
  const pos = vertical === true ? ["left", "right"] : ["top", "bottom"];
  return `absolute-${top === true ? pos[0] : pos[1]}${color ? ` text-${color}` : ""}`;
}
const alignValues = ["left", "center", "right", "justify"];
const emptyFn = () => {
};
var QTabs = createComponent({
  name: "QTabs",
  props: {
    modelValue: [Number, String],
    align: {
      type: String,
      default: "center",
      validator: (v) => alignValues.includes(v)
    },
    breakpoint: {
      type: [String, Number],
      default: 600
    },
    vertical: Boolean,
    shrink: Boolean,
    stretch: Boolean,
    activeClass: String,
    activeColor: String,
    activeBgColor: String,
    indicatorColor: String,
    leftIcon: String,
    rightIcon: String,
    outsideArrows: Boolean,
    mobileArrows: Boolean,
    switchIndicator: Boolean,
    narrowIndicator: Boolean,
    inlineLabel: Boolean,
    noCaps: Boolean,
    dense: Boolean,
    contentClass: String,
    "onUpdate:modelValue": [Function, Array]
  },
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const { registerTick, prepareTick } = useTick();
    const { registerTimeout } = useTimeout();
    const rootRef = ref(null);
    const contentRef = ref(null);
    const currentModel = ref(props.modelValue);
    const scrollable = ref(false);
    const leftArrow = ref(true);
    const rightArrow = ref(false);
    const justify = ref(false);
    const arrowsEnabled = computed(() => $q.platform.is.desktop === true || props.mobileArrows === true);
    const tabList = [];
    let localFromRoute = false, animateTimer, scrollTimer, unwatchRoute;
    let localUpdateArrows = arrowsEnabled.value === true ? updateArrowsFn : noop;
    const tabProps = computed(() => ({
      activeClass: props.activeClass,
      activeColor: props.activeColor,
      activeBgColor: props.activeBgColor,
      indicatorClass: getIndicatorClass(props.indicatorColor, props.switchIndicator, props.vertical),
      narrowIndicator: props.narrowIndicator,
      inlineLabel: props.inlineLabel,
      noCaps: props.noCaps
    }));
    const alignClass = computed(() => {
      const align = scrollable.value === true ? "left" : justify.value === true ? "justify" : props.align;
      return `q-tabs__content--align-${align}`;
    });
    const classes = computed(() => `q-tabs row no-wrap items-center q-tabs--${scrollable.value === true ? "" : "not-"}scrollable q-tabs--${props.vertical === true ? "vertical" : "horizontal"} q-tabs__arrows--${arrowsEnabled.value === true && props.outsideArrows === true ? "outside" : "inside"}` + (props.dense === true ? " q-tabs--dense" : "") + (props.shrink === true ? " col-shrink" : "") + (props.stretch === true ? " self-stretch" : ""));
    const innerClass = computed(() => "q-tabs__content row no-wrap items-center self-stretch hide-scrollbar " + alignClass.value + (props.contentClass !== void 0 ? ` ${props.contentClass}` : "") + ($q.platform.is.mobile === true ? " scroll" : ""));
    const domProps = computed(() => props.vertical === true ? { container: "height", content: "offsetHeight", scroll: "scrollHeight" } : { container: "width", content: "offsetWidth", scroll: "scrollWidth" });
    const isRTL = computed(() => props.vertical !== true && $q.lang.rtl === true);
    const rtlPosCorrection = computed(() => rtlHasScrollBug === false && isRTL.value === true);
    watch(isRTL, localUpdateArrows);
    watch(() => props.modelValue, (name) => {
      updateModel({ name, setCurrent: true, skipEmit: true });
    });
    watch(() => props.outsideArrows, () => {
      nextTick(recalculateScroll());
    });
    watch(arrowsEnabled, (v) => {
      localUpdateArrows = v === true ? updateArrowsFn : noop;
      nextTick(recalculateScroll());
    });
    function updateModel({ name, setCurrent, skipEmit, fromRoute }) {
      if (currentModel.value !== name) {
        skipEmit !== true && emit("update:modelValue", name);
        if (setCurrent === true || props["onUpdate:modelValue"] === void 0) {
          animate(currentModel.value, name);
          currentModel.value = name;
        }
      }
      if (fromRoute !== void 0) {
        localFromRoute = fromRoute;
      }
    }
    function recalculateScroll() {
      registerTick(() => {
        if (vm.isDeactivated !== true && vm.isUnmounted !== true) {
          updateContainer({
            width: rootRef.value.offsetWidth,
            height: rootRef.value.offsetHeight
          });
        }
      });
      prepareTick();
    }
    function updateContainer(domSize) {
      if (domProps.value === void 0 || contentRef.value === null) {
        return;
      }
      const size = domSize[domProps.value.container], scrollSize = Math.min(contentRef.value[domProps.value.scroll], Array.prototype.reduce.call(contentRef.value.children, (acc, el) => acc + el[domProps.value.content], 0)), scroll = size > 0 && scrollSize > size;
      if (scrollable.value !== scroll) {
        scrollable.value = scroll;
      }
      scroll === true && nextTick(localUpdateArrows);
      const localJustify = size < parseInt(props.breakpoint, 10);
      if (justify.value !== localJustify) {
        justify.value = localJustify;
      }
    }
    function animate(oldName, newName) {
      const oldTab = oldName !== void 0 && oldName !== null && oldName !== "" ? tabList.find((tab) => tab.name.value === oldName) : null, newTab = newName !== void 0 && newName !== null && newName !== "" ? tabList.find((tab) => tab.name.value === newName) : null;
      if (oldTab && newTab) {
        const oldEl = oldTab.tabIndicatorRef.value, newEl = newTab.tabIndicatorRef.value;
        clearTimeout(animateTimer);
        oldEl.style.transition = "none";
        oldEl.style.transform = "none";
        newEl.style.transition = "none";
        newEl.style.transform = "none";
        const oldPos = oldEl.getBoundingClientRect(), newPos = newEl.getBoundingClientRect();
        newEl.style.transform = props.vertical === true ? `translate3d(0,${oldPos.top - newPos.top}px,0) scale3d(1,${newPos.height ? oldPos.height / newPos.height : 1},1)` : `translate3d(${oldPos.left - newPos.left}px,0,0) scale3d(${newPos.width ? oldPos.width / newPos.width : 1},1,1)`;
        nextTick(() => {
          animateTimer = setTimeout(() => {
            newEl.style.transition = "transform .25s cubic-bezier(.4, 0, .2, 1)";
            newEl.style.transform = "none";
          }, 70);
        });
      }
      if (newTab && scrollable.value === true) {
        const { left, width, top, height } = contentRef.value.getBoundingClientRect(), newPos = newTab.rootRef.value.getBoundingClientRect();
        let offset = props.vertical === true ? newPos.top - top : newPos.left - left;
        if (offset < 0) {
          contentRef.value[props.vertical === true ? "scrollTop" : "scrollLeft"] += Math.floor(offset);
          localUpdateArrows();
          return;
        }
        offset += props.vertical === true ? newPos.height - height : newPos.width - width;
        if (offset > 0) {
          contentRef.value[props.vertical === true ? "scrollTop" : "scrollLeft"] += Math.ceil(offset);
          localUpdateArrows();
        }
      }
    }
    function updateArrowsFn() {
      const content = contentRef.value;
      if (content !== null) {
        const rect = content.getBoundingClientRect(), pos = props.vertical === true ? content.scrollTop : Math.abs(content.scrollLeft);
        if (isRTL.value === true) {
          leftArrow.value = Math.ceil(pos + rect.width) < content.scrollWidth - 1;
          rightArrow.value = pos > 0;
        } else {
          leftArrow.value = pos > 0;
          rightArrow.value = props.vertical === true ? Math.ceil(pos + rect.height) < content.scrollHeight : Math.ceil(pos + rect.width) < content.scrollWidth;
        }
      }
    }
    function animScrollTo(value) {
      stopAnimScroll();
      scrollTowards(value);
      scrollTimer = setInterval(() => {
        if (scrollTowards(value) === true) {
          stopAnimScroll();
        }
      }, 5);
    }
    function scrollToStart() {
      animScrollTo(rtlPosCorrection.value === true ? 9999 : 0);
    }
    function scrollToEnd() {
      animScrollTo(rtlPosCorrection.value === true ? 0 : 9999);
    }
    function stopAnimScroll() {
      clearInterval(scrollTimer);
    }
    const posFn = computed(() => rtlPosCorrection.value === true ? { get: (content) => Math.abs(content.scrollLeft), set: (content, pos) => {
      content.scrollLeft = -pos;
    } } : props.vertical === true ? { get: (content) => content.scrollTop, set: (content, pos) => {
      content.scrollTop = pos;
    } } : { get: (content) => content.scrollLeft, set: (content, pos) => {
      content.scrollLeft = pos;
    } });
    function scrollTowards(value) {
      const content = contentRef.value, { get, set } = posFn.value;
      let done = false, pos = get(content);
      const direction = value < pos ? -1 : 1;
      pos += direction * 5;
      if (pos < 0) {
        done = true;
        pos = 0;
      } else if (direction === -1 && pos <= value || direction === 1 && pos >= value) {
        done = true;
        pos = value;
      }
      set(content, pos);
      localUpdateArrows();
      return done;
    }
    function getRouteList() {
      return tabList.filter((tab) => tab.routerProps !== void 0 && tab.routerProps.hasLink.value === true);
    }
    function updateActiveRoute() {
      let name = null, wasActive = localFromRoute;
      const best = { matchedLen: 0, hrefLen: 0, exact: false, found: false }, { hash } = vm.proxy.$route, model = currentModel.value;
      let wasItActive = wasActive === true ? emptyFn : (tab) => {
        if (model === tab.name.value) {
          wasActive = true;
          wasItActive = emptyFn;
        }
      };
      const tabList2 = getRouteList();
      for (const tab of tabList2) {
        const exact = tab.routerProps.exact.value === true;
        if (tab.routerProps[exact === true ? "linkIsExactActive" : "linkIsActive"].value !== true || best.exact === true && exact !== true) {
          wasItActive(tab);
          continue;
        }
        const linkRoute = tab.routerProps.linkRoute.value, tabHash = linkRoute.hash;
        if (exact === true) {
          if (hash === tabHash) {
            name = tab.name.value;
            break;
          } else if (hash !== "" && tabHash !== "") {
            wasItActive(tab);
            continue;
          }
        }
        const matchedLen = linkRoute.matched.length, hrefLen = linkRoute.href.length - tabHash.length;
        if (matchedLen === best.matchedLen ? hrefLen > best.hrefLen : matchedLen > best.matchedLen) {
          name = tab.name.value;
          Object.assign(best, { matchedLen, hrefLen, exact });
          continue;
        }
        wasItActive(tab);
      }
      if (wasActive === true || name !== null) {
        updateModel({ name, setCurrent: true, fromRoute: true });
      }
    }
    function verifyRouteModel() {
      if ($tabs.avoidRouteWatcher !== true) {
        registerTimeout(updateActiveRoute);
      }
    }
    function registerTab(getTab) {
      tabList.push(getTab);
      const routeList = getRouteList();
      if (routeList.length > 0) {
        if (unwatchRoute === void 0) {
          unwatchRoute = watch(() => vm.proxy.$route, verifyRouteModel);
        }
        verifyRouteModel();
      }
    }
    function unregisterTab(tabData) {
      tabList.splice(tabList.indexOf(tabData), 1);
      if (unwatchRoute !== void 0) {
        const routeList = getRouteList();
        if (routeList.length === 0) {
          unwatchRoute();
          unwatchRoute = void 0;
        }
        verifyRouteModel();
      }
    }
    const $tabs = {
      currentModel,
      tabProps,
      registerTab,
      unregisterTab,
      verifyRouteModel,
      updateModel,
      recalculateScroll,
      avoidRouteWatcher: false
    };
    provide(tabsKey, $tabs);
    onBeforeUnmount(() => {
      clearTimeout(animateTimer);
      unwatchRoute !== void 0 && unwatchRoute();
    });
    onActivated(recalculateScroll);
    return () => {
      const child = [
        h(QResizeObserver, { onResize: updateContainer }),
        h("div", {
          ref: contentRef,
          class: innerClass.value,
          onScroll: localUpdateArrows
        }, hSlot(slots.default))
      ];
      arrowsEnabled.value === true && child.push(h(QIcon, {
        class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (leftArrow.value === true ? "" : " q-tabs__arrow--faded"),
        name: props.leftIcon || $q.iconSet.tabs[props.vertical === true ? "up" : "left"],
        onMousedown: scrollToStart,
        onTouchstartPassive: scrollToStart,
        onMouseup: stopAnimScroll,
        onMouseleave: stopAnimScroll,
        onTouchend: stopAnimScroll
      }), h(QIcon, {
        class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (rightArrow.value === true ? "" : " q-tabs__arrow--faded"),
        name: props.rightIcon || $q.iconSet.tabs[props.vertical === true ? "down" : "right"],
        onMousedown: scrollToEnd,
        onTouchstartPassive: scrollToEnd,
        onMouseup: stopAnimScroll,
        onMouseleave: stopAnimScroll,
        onTouchend: stopAnimScroll
      }));
      return h("div", {
        ref: rootRef,
        class: classes.value,
        role: "tablist"
      }, child);
    };
  }
});
let uid = 0;
const useTabEmits = ["click", "keyup"];
const useTabProps = {
  icon: String,
  label: [Number, String],
  alert: [Boolean, String],
  alertIcon: String,
  name: {
    type: [Number, String],
    default: () => `t_${uid++}`
  },
  noCaps: Boolean,
  tabindex: [String, Number],
  disable: Boolean,
  contentClass: String,
  ripple: {
    type: [Boolean, Object],
    default: true
  }
};
function useTab(props, slots, emit, routerProps) {
  const $tabs = inject(tabsKey, () => {
    console.error("QTab/QRouteTab component needs to be child of QTabs");
  });
  const blurTargetRef = ref(null);
  const rootRef = ref(null);
  const tabIndicatorRef = ref(null);
  const ripple = computed(() => props.disable === true ? false : props.ripple);
  const isActive = computed(() => $tabs.currentModel.value === props.name);
  const classes = computed(() => "q-tab relative-position self-stretch flex flex-center text-center" + (isActive.value === true ? " q-tab--active" + ($tabs.tabProps.value.activeClass ? " " + $tabs.tabProps.value.activeClass : "") + ($tabs.tabProps.value.activeColor ? ` text-${$tabs.tabProps.value.activeColor}` : "") + ($tabs.tabProps.value.activeBgColor ? ` bg-${$tabs.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (props.icon && props.label && $tabs.tabProps.value.inlineLabel === false ? " q-tab--full" : "") + (props.noCaps === true || $tabs.tabProps.value.noCaps === true ? " q-tab--no-caps" : "") + (props.disable === true ? " disabled" : " q-focusable q-hoverable cursor-pointer") + (routerProps !== void 0 && routerProps.linkClass.value !== "" ? ` ${routerProps.linkClass.value}` : ""));
  const innerClass = computed(() => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + ($tabs.tabProps.value.inlineLabel === true ? "row no-wrap q-tab__content--inline" : "column") + (props.contentClass !== void 0 ? ` ${props.contentClass}` : ""));
  const tabIndex = computed(() => props.disable === true || isActive.value === true ? -1 : props.tabindex || 0);
  function onClick(e, keyboard) {
    keyboard !== true && blurTargetRef.value !== null && blurTargetRef.value.focus();
    if (props.disable !== true) {
      let go;
      if (routerProps !== void 0) {
        if (routerProps.hasLink.value === true) {
          go = () => {
            e.__qNavigate = true;
            $tabs.avoidRouteWatcher = true;
            const res = routerProps.navigateToLink(e);
            if (res === false) {
              $tabs.avoidRouteWatcher = false;
            } else {
              res.then(() => {
                $tabs.avoidRouteWatcher = false;
                $tabs.updateModel({ name: props.name, fromRoute: true });
              });
            }
          };
        } else {
          emit("click", e);
          return;
        }
      } else {
        go = () => {
          $tabs.updateModel({ name: props.name, fromRoute: false });
        };
      }
      emit("click", e, go);
      e.defaultPrevented !== true && go();
    }
  }
  function onKeyup(e) {
    isKeyCode(e, 13) === true && onClick(e, true);
    emit("keyup", e);
  }
  function getContent() {
    const narrow = $tabs.tabProps.value.narrowIndicator, content = [], indicator = h("div", {
      ref: tabIndicatorRef,
      class: [
        "q-tab__indicator",
        $tabs.tabProps.value.indicatorClass
      ]
    });
    props.icon !== void 0 && content.push(h(QIcon, {
      class: "q-tab__icon",
      name: props.icon
    }));
    props.label !== void 0 && content.push(h("div", { class: "q-tab__label" }, props.label));
    props.alert !== false && content.push(props.alertIcon !== void 0 ? h(QIcon, {
      class: "q-tab__alert-icon",
      color: props.alert !== true ? props.alert : void 0,
      name: props.alertIcon
    }) : h("div", {
      class: "q-tab__alert" + (props.alert !== true ? ` text-${props.alert}` : "")
    }));
    narrow === true && content.push(indicator);
    const node = [
      h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef }),
      h("div", { class: innerClass.value }, hMergeSlot(slots.default, content))
    ];
    narrow === false && node.push(indicator);
    return node;
  }
  const tabData = {
    name: computed(() => props.name),
    rootRef,
    tabIndicatorRef,
    routerProps
  };
  onBeforeUnmount(() => {
    $tabs.unregisterTab(tabData);
    $tabs.recalculateScroll();
  });
  onMounted(() => {
    $tabs.registerTab(tabData);
    $tabs.recalculateScroll();
  });
  function renderTab(tag, customData) {
    const data = __spreadValues({
      ref: rootRef,
      class: classes.value,
      tabindex: tabIndex.value,
      role: "tab",
      "aria-selected": isActive.value,
      "aria-disabled": props.disable === true ? "true" : void 0,
      onClick,
      onKeyup
    }, customData);
    return withDirectives(h(tag, data, getContent()), [[Ripple, ripple.value]]);
  }
  return { renderTab, $tabs };
}
var QTab = createComponent({
  name: "QTab",
  props: useTabProps,
  emits: useTabEmits,
  setup(props, { slots, emit }) {
    const { renderTab } = useTab(props, slots, emit);
    return () => renderTab("div");
  }
});
function parseArg(arg) {
  const data = [0.06, 6, 50];
  if (typeof arg === "string" && arg.length) {
    arg.split(":").forEach((val, index) => {
      const v = parseFloat(val);
      v && (data[index] = v);
    });
  }
  return data;
}
var TouchSwipe = createDirective({
  name: "touch-swipe",
  beforeMount(el, { value, arg, modifiers }) {
    if (modifiers.mouse !== true && client.has.touch !== true) {
      return;
    }
    const mouseCapture = modifiers.mouseCapture === true ? "Capture" : "";
    const ctx = {
      handler: value,
      sensitivity: parseArg(arg),
      direction: getModifierDirections(modifiers),
      noop,
      mouseStart(evt) {
        if (shouldStart(evt, ctx) && leftClick(evt)) {
          addEvt(ctx, "temp", [
            [document, "mousemove", "move", `notPassive${mouseCapture}`],
            [document, "mouseup", "end", "notPassiveCapture"]
          ]);
          ctx.start(evt, true);
        }
      },
      touchStart(evt) {
        if (shouldStart(evt, ctx)) {
          const target = evt.target;
          addEvt(ctx, "temp", [
            [target, "touchmove", "move", "notPassiveCapture"],
            [target, "touchcancel", "end", "notPassiveCapture"],
            [target, "touchend", "end", "notPassiveCapture"]
          ]);
          ctx.start(evt);
        }
      },
      start(evt, mouseEvent) {
        client.is.firefox === true && preventDraggable(el, true);
        const pos = position(evt);
        ctx.event = {
          x: pos.left,
          y: pos.top,
          time: Date.now(),
          mouse: mouseEvent === true,
          dir: false
        };
      },
      move(evt) {
        if (ctx.event === void 0) {
          return;
        }
        if (ctx.event.dir !== false) {
          stopAndPrevent(evt);
          return;
        }
        const time = Date.now() - ctx.event.time;
        if (time === 0) {
          return;
        }
        const pos = position(evt), distX = pos.left - ctx.event.x, absX = Math.abs(distX), distY = pos.top - ctx.event.y, absY = Math.abs(distY);
        if (ctx.event.mouse !== true) {
          if (absX < ctx.sensitivity[1] && absY < ctx.sensitivity[1]) {
            ctx.end(evt);
            return;
          }
        } else if (absX < ctx.sensitivity[2] && absY < ctx.sensitivity[2]) {
          return;
        }
        const velX = absX / time, velY = absY / time;
        if (ctx.direction.vertical === true && absX < absY && absX < 100 && velY > ctx.sensitivity[0]) {
          ctx.event.dir = distY < 0 ? "up" : "down";
        }
        if (ctx.direction.horizontal === true && absX > absY && absY < 100 && velX > ctx.sensitivity[0]) {
          ctx.event.dir = distX < 0 ? "left" : "right";
        }
        if (ctx.direction.up === true && absX < absY && distY < 0 && absX < 100 && velY > ctx.sensitivity[0]) {
          ctx.event.dir = "up";
        }
        if (ctx.direction.down === true && absX < absY && distY > 0 && absX < 100 && velY > ctx.sensitivity[0]) {
          ctx.event.dir = "down";
        }
        if (ctx.direction.left === true && absX > absY && distX < 0 && absY < 100 && velX > ctx.sensitivity[0]) {
          ctx.event.dir = "left";
        }
        if (ctx.direction.right === true && absX > absY && distX > 0 && absY < 100 && velX > ctx.sensitivity[0]) {
          ctx.event.dir = "right";
        }
        if (ctx.event.dir !== false) {
          stopAndPrevent(evt);
          if (ctx.event.mouse === true) {
            document.body.classList.add("no-pointer-events--children");
            document.body.classList.add("non-selectable");
            clearSelection();
            ctx.styleCleanup = (withDelay) => {
              ctx.styleCleanup = void 0;
              document.body.classList.remove("non-selectable");
              const remove = () => {
                document.body.classList.remove("no-pointer-events--children");
              };
              if (withDelay === true) {
                setTimeout(remove, 50);
              } else {
                remove();
              }
            };
          }
          ctx.handler({
            evt,
            touch: ctx.event.mouse !== true,
            mouse: ctx.event.mouse,
            direction: ctx.event.dir,
            duration: time,
            distance: {
              x: absX,
              y: absY
            }
          });
        } else {
          ctx.end(evt);
        }
      },
      end(evt) {
        if (ctx.event === void 0) {
          return;
        }
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup !== void 0 && ctx.styleCleanup(true);
        evt !== void 0 && ctx.event.dir !== false && stopAndPrevent(evt);
        ctx.event = void 0;
      }
    };
    el.__qtouchswipe = ctx;
    modifiers.mouse === true && addEvt(ctx, "main", [
      [el, "mousedown", "mouseStart", `passive${mouseCapture}`]
    ]);
    client.has.touch === true && addEvt(ctx, "main", [
      [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
      [el, "touchmove", "noop", "notPassiveCapture"]
    ]);
  },
  updated(el, bindings) {
    const ctx = el.__qtouchswipe;
    if (ctx !== void 0) {
      if (bindings.oldValue !== bindings.value) {
        typeof bindings.value !== "function" && ctx.end();
        ctx.handler = bindings.value;
      }
      ctx.direction = getModifierDirections(bindings.modifiers);
    }
  },
  beforeUnmount(el) {
    const ctx = el.__qtouchswipe;
    if (ctx !== void 0) {
      cleanEvt(ctx, "main");
      cleanEvt(ctx, "temp");
      client.is.firefox === true && preventDraggable(el, false);
      ctx.styleCleanup !== void 0 && ctx.styleCleanup();
      delete el.__qtouchswipe;
    }
  }
});
function useCache() {
  const cache = new Map();
  return {
    getCache: function(key, obj) {
      return cache[key] === void 0 ? cache[key] = obj : cache[key];
    },
    getCacheWithFn: function(key, fn) {
      return cache[key] === void 0 ? cache[key] = fn() : cache[key];
    }
  };
}
const usePanelChildProps = {
  name: { required: true },
  disable: Boolean
};
const PanelWrapper = {
  setup(_, { slots }) {
    return () => h("div", {
      class: "q-panel scroll",
      role: "tabpanel"
    }, hSlot(slots.default));
  }
};
const usePanelProps = {
  modelValue: {
    required: true
  },
  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,
  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [String, Number],
    default: 300
  },
  keepAlive: Boolean,
  keepAliveInclude: [String, Array, RegExp],
  keepAliveExclude: [String, Array, RegExp],
  keepAliveMax: Number
};
const usePanelEmits = ["update:modelValue", "before-transition", "transition"];
function usePanel() {
  const { props, emit, proxy } = getCurrentInstance();
  const { getCacheWithFn } = useCache();
  let panels, forcedPanelTransition;
  const panelIndex = ref(null);
  const panelTransition = ref(null);
  function onSwipe(evt) {
    const dir = props.vertical === true ? "up" : "left";
    goToPanelByOffset((proxy.$q.lang.rtl === true ? -1 : 1) * (evt.direction === dir ? 1 : -1));
  }
  const panelDirectives = computed(() => {
    return [[
      TouchSwipe,
      onSwipe,
      void 0,
      {
        horizontal: props.vertical !== true,
        vertical: props.vertical,
        mouse: true
      }
    ]];
  });
  const transitionPrev = computed(() => props.transitionPrev || `slide-${props.vertical === true ? "down" : "right"}`);
  const transitionNext = computed(() => props.transitionNext || `slide-${props.vertical === true ? "up" : "left"}`);
  const transitionStyle = computed(() => `--q-transition-duration: ${props.transitionDuration}ms`);
  const contentKey = computed(() => typeof props.modelValue === "string" || typeof props.modelValue === "number" ? props.modelValue : String(props.modelValue));
  const keepAliveProps = computed(() => ({
    include: props.keepAliveInclude,
    exclude: props.keepAliveExclude,
    max: props.keepAliveMax
  }));
  const needsUniqueKeepAliveWrapper = computed(() => props.keepAliveInclude !== void 0 || props.keepAliveExclude !== void 0);
  watch(() => props.modelValue, (newVal, oldVal) => {
    const index = isValidPanelName(newVal) === true ? getPanelIndex(newVal) : -1;
    if (forcedPanelTransition !== true) {
      updatePanelTransition(index === -1 ? 0 : index < getPanelIndex(oldVal) ? -1 : 1);
    }
    if (panelIndex.value !== index) {
      panelIndex.value = index;
      emit("before-transition", newVal, oldVal);
      nextTick(() => {
        emit("transition", newVal, oldVal);
      });
    }
  });
  function nextPanel() {
    goToPanelByOffset(1);
  }
  function previousPanel() {
    goToPanelByOffset(-1);
  }
  Object.assign(proxy, {
    next: nextPanel,
    previous: previousPanel,
    goTo: goToPanel
  });
  function goToPanel(name) {
    emit("update:modelValue", name);
  }
  function isValidPanelName(name) {
    return name !== void 0 && name !== null && name !== "";
  }
  function getPanelIndex(name) {
    return panels.findIndex((panel) => {
      return panel.props.name === name && panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function getEnabledPanels() {
    return panels.filter((panel) => {
      return panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function updatePanelTransition(direction) {
    const val = direction !== 0 && props.animated === true && panelIndex.value !== -1 ? "q-transition--" + (direction === -1 ? transitionPrev.value : transitionNext.value) : null;
    if (panelTransition.value !== val) {
      panelTransition.value = val;
    }
  }
  function goToPanelByOffset(direction, startIndex = panelIndex.value) {
    let index = startIndex + direction;
    while (index > -1 && index < panels.length) {
      const opt = panels[index];
      if (opt !== void 0 && opt.props.disable !== "" && opt.props.disable !== true) {
        updatePanelTransition(direction);
        forcedPanelTransition = true;
        emit("update:modelValue", opt.props.name);
        setTimeout(() => {
          forcedPanelTransition = false;
        });
        return;
      }
      index += direction;
    }
    if (props.infinite === true && panels.length > 0 && startIndex !== -1 && startIndex !== panels.length) {
      goToPanelByOffset(direction, direction === -1 ? panels.length : -1);
    }
  }
  function updatePanelIndex() {
    const index = getPanelIndex(props.modelValue);
    if (panelIndex.value !== index) {
      panelIndex.value = index;
    }
    return true;
  }
  function getPanelContentChild() {
    const panel = isValidPanelName(props.modelValue) === true && updatePanelIndex() && panels[panelIndex.value];
    return props.keepAlive === true ? [
      h(KeepAlive, keepAliveProps.value, [
        h(needsUniqueKeepAliveWrapper.value === true ? getCacheWithFn(contentKey.value, () => __spreadProps(__spreadValues({}, PanelWrapper), { name: contentKey.value })) : PanelWrapper, { key: contentKey.value, style: transitionStyle.value }, () => panel)
      ])
    ] : [
      h("div", {
        class: "q-panel scroll",
        style: transitionStyle.value,
        key: contentKey.value,
        role: "tabpanel"
      }, [panel])
    ];
  }
  function getPanelContent() {
    if (panels.length === 0) {
      return;
    }
    return props.animated === true ? [h(Transition, { name: panelTransition.value }, getPanelContentChild)] : getPanelContentChild();
  }
  function updatePanelsList(slots) {
    panels = getNormalizedVNodes(hSlot(slots.default, [])).filter((panel) => panel.props !== null && panel.props.slot === void 0 && isValidPanelName(panel.props.name) === true);
    return panels.length;
  }
  function getPanels() {
    return panels;
  }
  return {
    panelIndex,
    panelDirectives,
    updatePanelsList,
    updatePanelIndex,
    getPanelContent,
    getEnabledPanels,
    getPanels,
    isValidPanelName,
    keepAliveProps,
    needsUniqueKeepAliveWrapper,
    goToPanelByOffset,
    goToPanel,
    nextPanel,
    previousPanel
  };
}
var QTabPanels = createComponent({
  name: "QTabPanels",
  props: __spreadValues(__spreadValues({}, usePanelProps), useDarkProps),
  emits: usePanelEmits,
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const { updatePanelsList, getPanelContent, panelDirectives } = usePanel();
    const classes = computed(() => "q-tab-panels q-panel-parent" + (isDark.value === true ? " q-tab-panels--dark q-dark" : ""));
    return () => {
      updatePanelsList(slots);
      return hDir("div", { class: classes.value }, getPanelContent(), "pan", props.swipeable, () => panelDirectives.value);
    };
  }
});
var QTabPanel = createComponent({
  name: "QTabPanel",
  props: usePanelChildProps,
  setup(_, { slots }) {
    return () => h("div", { class: "q-tab-panel" }, hSlot(slots.default));
  }
});
const reRGBA = /^rgb(a)?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?([01]?\.?\d*?)?\)$/;
function rgbToHex({ r, g, b, a }) {
  const alpha = a !== void 0;
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  if (r > 255 || g > 255 || b > 255 || alpha && a > 100) {
    throw new TypeError("Expected 3 numbers below 256 (and optionally one below 100)");
  }
  a = alpha ? (Math.round(255 * a / 100) | 1 << 8).toString(16).slice(1) : "";
  return "#" + (b | g << 8 | r << 16 | 1 << 24).toString(16).slice(1) + a;
}
function rgbToString({ r, g, b, a }) {
  return `rgb${a !== void 0 ? "a" : ""}(${r},${g},${b}${a !== void 0 ? "," + a / 100 : ""})`;
}
function hexToRgb(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("Expected a string");
  }
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  } else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  const num = parseInt(hex, 16);
  return hex.length > 6 ? { r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55) } : { r: num >> 16, g: num >> 8 & 255, b: num & 255 };
}
function hsvToRgb({ h: h2, s, v, a }) {
  let r, g, b;
  s = s / 100;
  v = v / 100;
  h2 = h2 / 360;
  const i = Math.floor(h2 * 6), f = h2 * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a
  };
}
function rgbToHsv({ r, g, b, a }) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, s = max === 0 ? 0 : d / max, v = max / 255;
  let h2;
  switch (max) {
    case min:
      h2 = 0;
      break;
    case r:
      h2 = g - b + d * (g < b ? 6 : 0);
      h2 /= 6 * d;
      break;
    case g:
      h2 = b - r + d * 2;
      h2 /= 6 * d;
      break;
    case b:
      h2 = r - g + d * 4;
      h2 /= 6 * d;
      break;
  }
  return {
    h: Math.round(h2 * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
    a
  };
}
function textToRgb(str) {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }
  const color = str.replace(/ /g, "");
  const m = reRGBA.exec(color);
  if (m === null) {
    return hexToRgb(color);
  }
  const rgb = {
    r: Math.min(255, parseInt(m[2], 10)),
    g: Math.min(255, parseInt(m[3], 10)),
    b: Math.min(255, parseInt(m[4], 10))
  };
  if (m[1]) {
    const alpha = parseFloat(m[5]);
    rgb.a = Math.min(1, isNaN(alpha) === true ? 1 : alpha) * 100;
  }
  return rgb;
}
function luminosity(color) {
  if (typeof color !== "string" && (!color || color.r === void 0)) {
    throw new TypeError("Expected a string or a {r, g, b} object as color");
  }
  const rgb = typeof color === "string" ? textToRgb(color) : color, r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255, R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4), G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4), B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
const palette = [
  "rgb(255,204,204)",
  "rgb(255,230,204)",
  "rgb(255,255,204)",
  "rgb(204,255,204)",
  "rgb(204,255,230)",
  "rgb(204,255,255)",
  "rgb(204,230,255)",
  "rgb(204,204,255)",
  "rgb(230,204,255)",
  "rgb(255,204,255)",
  "rgb(255,153,153)",
  "rgb(255,204,153)",
  "rgb(255,255,153)",
  "rgb(153,255,153)",
  "rgb(153,255,204)",
  "rgb(153,255,255)",
  "rgb(153,204,255)",
  "rgb(153,153,255)",
  "rgb(204,153,255)",
  "rgb(255,153,255)",
  "rgb(255,102,102)",
  "rgb(255,179,102)",
  "rgb(255,255,102)",
  "rgb(102,255,102)",
  "rgb(102,255,179)",
  "rgb(102,255,255)",
  "rgb(102,179,255)",
  "rgb(102,102,255)",
  "rgb(179,102,255)",
  "rgb(255,102,255)",
  "rgb(255,51,51)",
  "rgb(255,153,51)",
  "rgb(255,255,51)",
  "rgb(51,255,51)",
  "rgb(51,255,153)",
  "rgb(51,255,255)",
  "rgb(51,153,255)",
  "rgb(51,51,255)",
  "rgb(153,51,255)",
  "rgb(255,51,255)",
  "rgb(255,0,0)",
  "rgb(255,128,0)",
  "rgb(255,255,0)",
  "rgb(0,255,0)",
  "rgb(0,255,128)",
  "rgb(0,255,255)",
  "rgb(0,128,255)",
  "rgb(0,0,255)",
  "rgb(128,0,255)",
  "rgb(255,0,255)",
  "rgb(245,0,0)",
  "rgb(245,123,0)",
  "rgb(245,245,0)",
  "rgb(0,245,0)",
  "rgb(0,245,123)",
  "rgb(0,245,245)",
  "rgb(0,123,245)",
  "rgb(0,0,245)",
  "rgb(123,0,245)",
  "rgb(245,0,245)",
  "rgb(214,0,0)",
  "rgb(214,108,0)",
  "rgb(214,214,0)",
  "rgb(0,214,0)",
  "rgb(0,214,108)",
  "rgb(0,214,214)",
  "rgb(0,108,214)",
  "rgb(0,0,214)",
  "rgb(108,0,214)",
  "rgb(214,0,214)",
  "rgb(163,0,0)",
  "rgb(163,82,0)",
  "rgb(163,163,0)",
  "rgb(0,163,0)",
  "rgb(0,163,82)",
  "rgb(0,163,163)",
  "rgb(0,82,163)",
  "rgb(0,0,163)",
  "rgb(82,0,163)",
  "rgb(163,0,163)",
  "rgb(92,0,0)",
  "rgb(92,46,0)",
  "rgb(92,92,0)",
  "rgb(0,92,0)",
  "rgb(0,92,46)",
  "rgb(0,92,92)",
  "rgb(0,46,92)",
  "rgb(0,0,92)",
  "rgb(46,0,92)",
  "rgb(92,0,92)",
  "rgb(255,255,255)",
  "rgb(205,205,205)",
  "rgb(178,178,178)",
  "rgb(153,153,153)",
  "rgb(127,127,127)",
  "rgb(102,102,102)",
  "rgb(76,76,76)",
  "rgb(51,51,51)",
  "rgb(25,25,25)",
  "rgb(0,0,0)"
];
const thumbPath = "M5 5 h10 v10 h-10 v-10 z";
var QColor = createComponent({
  name: "QColor",
  props: __spreadProps(__spreadValues(__spreadValues({}, useDarkProps), useFormProps), {
    modelValue: String,
    defaultValue: String,
    defaultView: {
      type: String,
      default: "spectrum",
      validator: (v) => ["spectrum", "tune", "palette"].includes(v)
    },
    formatModel: {
      type: String,
      default: "auto",
      validator: (v) => ["auto", "hex", "rgb", "hexa", "rgba"].includes(v)
    },
    palette: Array,
    noHeader: Boolean,
    noHeaderTabs: Boolean,
    noFooter: Boolean,
    square: Boolean,
    flat: Boolean,
    bordered: Boolean,
    disable: Boolean,
    readonly: Boolean
  }),
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props, $q);
    const { getCache } = useCache();
    const spectrumRef = ref(null);
    const errorIconRef = ref(null);
    const forceHex = computed(() => props.formatModel === "auto" ? null : props.formatModel.indexOf("hex") > -1);
    const forceAlpha = computed(() => props.formatModel === "auto" ? null : props.formatModel.indexOf("a") > -1);
    const topView = ref(props.formatModel === "auto" ? props.modelValue === void 0 || props.modelValue === null || props.modelValue === "" || props.modelValue.startsWith("#") ? "hex" : "rgb" : props.formatModel.startsWith("hex") ? "hex" : "rgb");
    const view = ref(props.defaultView);
    const model = ref(parseModel(props.modelValue || props.defaultValue));
    const editable = computed(() => props.disable !== true && props.readonly !== true);
    const isHex = computed(() => props.modelValue === void 0 || props.modelValue === null || props.modelValue === "" || props.modelValue.startsWith("#"));
    const isOutputHex = computed(() => forceHex.value !== null ? forceHex.value : isHex.value);
    const formAttrs = computed(() => ({
      type: "hidden",
      name: props.name,
      value: model.value[isOutputHex.value === true ? "hex" : "rgb"]
    }));
    const injectFormInput = useFormInject(formAttrs);
    const hasAlpha = computed(() => forceAlpha.value !== null ? forceAlpha.value : model.value.a !== void 0);
    const currentBgColor = computed(() => ({
      backgroundColor: model.value.rgb || "#000"
    }));
    const headerClass = computed(() => {
      const light = model.value.a !== void 0 && model.value.a < 65 ? true : luminosity(model.value) > 0.4;
      return `q-color-picker__header-content q-color-picker__header-content--${light ? "light" : "dark"}`;
    });
    const spectrumStyle = computed(() => ({
      background: `hsl(${model.value.h},100%,50%)`
    }));
    const spectrumPointerStyle = computed(() => ({
      top: `${100 - model.value.v}%`,
      [$q.lang.rtl === true ? "right" : "left"]: `${model.value.s}%`
    }));
    const computedPalette = computed(() => props.palette !== void 0 && props.palette.length > 0 ? props.palette : palette);
    const classes = computed(() => "q-color-picker" + (props.bordered === true ? " q-color-picker--bordered" : "") + (props.square === true ? " q-color-picker--square no-border-radius" : "") + (props.flat === true ? " q-color-picker--flat no-shadow" : "") + (props.disable === true ? " disabled" : "") + (isDark.value === true ? " q-color-picker--dark q-dark" : ""));
    const attributes = computed(() => {
      if (props.disable === true) {
        return { "aria-disabled": "true" };
      }
      if (props.readonly === true) {
        return { "aria-readonly": "true" };
      }
      return {};
    });
    const spectrumDirective = computed(() => {
      return [[
        TouchPan,
        onSpectrumPan,
        void 0,
        { prevent: true, stop: true, mouse: true }
      ]];
    });
    watch(() => props.modelValue, (v) => {
      const localModel = parseModel(v || props.defaultValue);
      if (localModel.hex !== model.value.hex) {
        model.value = localModel;
      }
    });
    watch(() => props.defaultValue, (v) => {
      if (!props.modelValue && v) {
        const localModel = parseModel(v);
        if (localModel.hex !== model.value.hex) {
          model.value = localModel;
        }
      }
    });
    function updateModel(rgb, change) {
      model.value.hex = rgbToHex(rgb);
      model.value.rgb = rgbToString(rgb);
      model.value.r = rgb.r;
      model.value.g = rgb.g;
      model.value.b = rgb.b;
      model.value.a = rgb.a;
      const value = model.value[isOutputHex.value === true ? "hex" : "rgb"];
      emit("update:modelValue", value);
      change === true && emit("change", value);
    }
    function parseModel(v) {
      const alpha = forceAlpha.value !== void 0 ? forceAlpha.value : props.formatModel === "auto" ? null : props.formatModel.indexOf("a") > -1;
      if (typeof v !== "string" || v.length === 0 || testPattern.anyColor(v.replace(/ /g, "")) !== true) {
        return {
          h: 0,
          s: 0,
          v: 0,
          r: 0,
          g: 0,
          b: 0,
          a: alpha === true ? 100 : void 0,
          hex: void 0,
          rgb: void 0
        };
      }
      const model2 = textToRgb(v);
      if (alpha === true && model2.a === void 0) {
        model2.a = 100;
      }
      model2.hex = rgbToHex(model2);
      model2.rgb = rgbToString(model2);
      return Object.assign(model2, rgbToHsv(model2));
    }
    function changeSpectrum(left, top, change) {
      const panel = spectrumRef.value;
      if (panel === null) {
        return;
      }
      const width = panel.clientWidth, height = panel.clientHeight, rect = panel.getBoundingClientRect();
      let x = Math.min(width, Math.max(0, left - rect.left));
      if ($q.lang.rtl === true) {
        x = width - x;
      }
      const y = Math.min(height, Math.max(0, top - rect.top)), s = Math.round(100 * x / width), v = Math.round(100 * Math.max(0, Math.min(1, -(y / height) + 1))), rgb = hsvToRgb({
        h: model.value.h,
        s,
        v,
        a: hasAlpha.value === true ? model.value.a : void 0
      });
      model.value.s = s;
      model.value.v = v;
      updateModel(rgb, change);
    }
    function onHueChange(val, change) {
      const h2 = Math.round(val);
      const rgb = hsvToRgb({
        h: h2,
        s: model.value.s,
        v: model.value.v,
        a: hasAlpha.value === true ? model.value.a : void 0
      });
      model.value.h = h2;
      updateModel(rgb, change);
    }
    function onNumericChange(value, formatModel, max, evt, change) {
      evt !== void 0 && stop(evt);
      if (!/^[0-9]+$/.test(value)) {
        change === true && proxy.$forceUpdate();
        return;
      }
      const val = Math.floor(Number(value));
      if (val < 0 || val > max) {
        change === true && proxy.$forceUpdate();
        return;
      }
      const rgb = {
        r: formatModel === "r" ? val : model.value.r,
        g: formatModel === "g" ? val : model.value.g,
        b: formatModel === "b" ? val : model.value.b,
        a: hasAlpha.value === true ? formatModel === "a" ? val : model.value.a : void 0
      };
      if (formatModel !== "a") {
        const hsv = rgbToHsv(rgb);
        model.value.h = hsv.h;
        model.value.s = hsv.s;
        model.value.v = hsv.v;
      }
      updateModel(rgb, change);
      if (evt !== void 0 && change !== true && evt.target.selectionEnd !== void 0) {
        const index = evt.target.selectionEnd;
        nextTick(() => {
          evt.target.setSelectionRange(index, index);
        });
      }
    }
    function onEditorChange(evt, change) {
      let rgb;
      const inp = evt.target.value;
      stop(evt);
      if (topView.value === "hex") {
        if (inp.length !== (hasAlpha.value === true ? 9 : 7) || !/^#[0-9A-Fa-f]+$/.test(inp)) {
          return true;
        }
        rgb = hexToRgb(inp);
      } else {
        let model2;
        if (!inp.endsWith(")")) {
          return true;
        } else if (hasAlpha.value !== true && inp.startsWith("rgb(")) {
          model2 = inp.substring(4, inp.length - 1).split(",").map((n) => parseInt(n, 10));
          if (model2.length !== 3 || !/^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/.test(inp)) {
            return true;
          }
        } else if (hasAlpha.value === true && inp.startsWith("rgba(")) {
          model2 = inp.substring(5, inp.length - 1).split(",");
          if (model2.length !== 4 || !/^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/.test(inp)) {
            return true;
          }
          for (let i = 0; i < 3; i++) {
            const v2 = parseInt(model2[i], 10);
            if (v2 < 0 || v2 > 255) {
              return true;
            }
            model2[i] = v2;
          }
          const v = parseFloat(model2[3]);
          if (v < 0 || v > 1) {
            return true;
          }
          model2[3] = v;
        } else {
          return true;
        }
        if (model2[0] < 0 || model2[0] > 255 || model2[1] < 0 || model2[1] > 255 || model2[2] < 0 || model2[2] > 255 || hasAlpha.value === true && (model2[3] < 0 || model2[3] > 1)) {
          return true;
        }
        rgb = {
          r: model2[0],
          g: model2[1],
          b: model2[2],
          a: hasAlpha.value === true ? model2[3] * 100 : void 0
        };
      }
      const hsv = rgbToHsv(rgb);
      model.value.h = hsv.h;
      model.value.s = hsv.s;
      model.value.v = hsv.v;
      updateModel(rgb, change);
      if (change !== true) {
        const index = evt.target.selectionEnd;
        nextTick(() => {
          evt.target.setSelectionRange(index, index);
        });
      }
    }
    function onPalettePick(color) {
      const def = parseModel(color);
      const rgb = { r: def.r, g: def.g, b: def.b, a: def.a };
      if (rgb.a === void 0) {
        rgb.a = model.value.a;
      }
      model.value.h = def.h;
      model.value.s = def.s;
      model.value.v = def.v;
      updateModel(rgb, true);
    }
    function onSpectrumPan(evt) {
      if (evt.isFinal) {
        changeSpectrum(evt.position.left, evt.position.top, true);
      } else {
        onSpectrumChange(evt);
      }
    }
    const onSpectrumChange = throttle((evt) => {
      changeSpectrum(evt.position.left, evt.position.top);
    }, 20);
    function onSpectrumClick(evt) {
      changeSpectrum(evt.pageX - window.pageXOffset, evt.pageY - window.pageYOffset, true);
    }
    function onActivate(evt) {
      changeSpectrum(evt.pageX - window.pageXOffset, evt.pageY - window.pageYOffset);
    }
    function updateErrorIcon(val) {
      if (errorIconRef.value !== null) {
        errorIconRef.value.$el.style.opacity = val ? 1 : 0;
      }
    }
    function getHeader() {
      const child = [];
      props.noHeaderTabs !== true && child.push(h(QTabs, __spreadValues({
        class: "q-color-picker__header-tabs",
        modelValue: topView.value,
        dense: true,
        align: "justify"
      }, getCache("topVTab", {
        "onUpdate:modelValue": (val) => {
          topView.value = val;
        }
      })), () => [
        h(QTab, {
          label: "HEX" + (hasAlpha.value === true ? "A" : ""),
          name: "hex",
          ripple: false
        }),
        h(QTab, {
          label: "RGB" + (hasAlpha.value === true ? "A" : ""),
          name: "rgb",
          ripple: false
        })
      ]));
      child.push(h("div", {
        class: "q-color-picker__header-banner row flex-center no-wrap"
      }, [
        h("input", __spreadValues(__spreadValues({
          class: "fit",
          value: model.value[topView.value]
        }, editable.value !== true ? { readonly: true } : {}), getCache("topIn", {
          onInput: (evt) => {
            updateErrorIcon(onEditorChange(evt) === true);
          },
          onChange: stop,
          onBlur: (evt) => {
            onEditorChange(evt, true) === true && proxy.$forceUpdate();
            updateErrorIcon(false);
          }
        }))),
        h(QIcon, {
          ref: errorIconRef,
          class: "q-color-picker__error-icon absolute no-pointer-events",
          name: $q.iconSet.type.negative
        })
      ]));
      return h("div", {
        class: "q-color-picker__header relative-position overflow-hidden"
      }, [
        h("div", { class: "q-color-picker__header-bg absolute-full" }),
        h("div", {
          class: headerClass.value,
          style: currentBgColor.value
        }, child)
      ]);
    }
    function getContent() {
      return h(QTabPanels, {
        modelValue: view.value,
        animated: true
      }, () => [
        h(QTabPanel, {
          class: "q-color-picker__spectrum-tab overflow-hidden",
          name: "spectrum"
        }, getSpectrumTab),
        h(QTabPanel, {
          class: "q-pa-md q-color-picker__tune-tab",
          name: "tune"
        }, getTuneTab),
        h(QTabPanel, {
          class: "q-color-picker__palette-tab",
          name: "palette"
        }, getPaletteTab)
      ]);
    }
    function getFooter() {
      return h("div", {
        class: "q-color-picker__footer relative-position overflow-hidden"
      }, [
        h(QTabs, __spreadValues({
          class: "absolute-full",
          modelValue: view.value,
          dense: true,
          align: "justify"
        }, getCache("ftIn", {
          "onUpdate:modelValue": (val) => {
            view.value = val;
          }
        })), () => [
          h(QTab, {
            icon: $q.iconSet.colorPicker.spectrum,
            name: "spectrum",
            ripple: false
          }),
          h(QTab, {
            icon: $q.iconSet.colorPicker.tune,
            name: "tune",
            ripple: false
          }),
          h(QTab, {
            icon: $q.iconSet.colorPicker.palette,
            name: "palette",
            ripple: false
          })
        ])
      ]);
    }
    function getSpectrumTab() {
      const data = __spreadValues({
        ref: spectrumRef,
        class: "q-color-picker__spectrum non-selectable relative-position cursor-pointer" + (editable.value !== true ? " readonly" : ""),
        style: spectrumStyle.value
      }, editable.value === true ? {
        onClick: onSpectrumClick,
        onMousedown: onActivate
      } : {});
      const child = [
        h("div", { style: { paddingBottom: "100%" } }),
        h("div", { class: "q-color-picker__spectrum-white absolute-full" }),
        h("div", { class: "q-color-picker__spectrum-black absolute-full" }),
        h("div", {
          class: "absolute",
          style: spectrumPointerStyle.value
        }, [
          model.value.hex !== void 0 ? h("div", { class: "q-color-picker__spectrum-circle" }) : null
        ])
      ];
      const sliders = [
        h("div", { class: "q-color-picker__hue non-selectable" }, [
          h(QSlider, __spreadValues({
            modelValue: model.value.h,
            min: 0,
            max: 360,
            fillHandleAlways: true,
            readonly: editable.value !== true,
            thumbPath,
            "onUpdate:modelValue": onHueChange
          }, getCache("lazyhue", {
            onChange: (val) => onHueChange(val, true)
          })))
        ])
      ];
      hasAlpha.value === true && sliders.push(h("div", { class: "q-color-picker__alpha non-selectable" }, [
        h(QSlider, __spreadValues({
          modelValue: model.value.a,
          min: 0,
          max: 100,
          fillHandleAlways: true,
          readonly: editable.value !== true,
          thumbPath
        }, getCache("alphaSlide", {
          "onUpdate:modelValue": (value) => onNumericChange(value, "a", 100),
          onChange: (value) => onNumericChange(value, "a", 100, void 0, true)
        })))
      ]));
      return [
        hDir("div", data, child, "spec", editable.value, () => spectrumDirective.value),
        h("div", { class: "q-color-picker__sliders" }, sliders)
      ];
    }
    function getTuneTab() {
      return [
        h("div", { class: "row items-center no-wrap" }, [
          h("div", "R"),
          h(QSlider, __spreadValues({
            modelValue: model.value.r,
            min: 0,
            max: 255,
            color: "red",
            dark: isDark.value,
            readonly: editable.value !== true
          }, getCache("rSlide", {
            "onUpdate:modelValue": (value) => onNumericChange(value, "r", 255),
            onChange: (value) => onNumericChange(value, "r", 255, void 0, true)
          }))),
          h("input", __spreadValues({
            value: model.value.r,
            maxlength: 3,
            readonly: editable.value !== true,
            onChange: stop
          }, getCache("rIn", {
            onInput: (evt) => onNumericChange(evt.target.value, "r", 255, evt),
            onBlur: (evt) => onNumericChange(evt.target.value, "r", 255, evt, true)
          })))
        ]),
        h("div", { class: "row items-center no-wrap" }, [
          h("div", "G"),
          h(QSlider, __spreadValues({
            modelValue: model.value.g,
            min: 0,
            max: 255,
            color: "green",
            dark: isDark.value,
            readonly: editable.value !== true
          }, getCache("gSlide", {
            "onUpdate:modelValue": (value) => onNumericChange(value, "g", 255),
            onChange: (value) => onNumericChange(value, "g", 255, void 0, true)
          }))),
          h("input", __spreadValues({
            value: model.value.g,
            maxlength: 3,
            readonly: editable.value !== true,
            onChange: stop
          }, getCache("gIn", {
            onInput: (evt) => onNumericChange(evt.target.value, "g", 255, evt),
            onBlur: (evt) => onNumericChange(evt.target.value, "g", 255, evt, true)
          })))
        ]),
        h("div", { class: "row items-center no-wrap" }, [
          h("div", "B"),
          h(QSlider, __spreadValues({
            modelValue: model.value.b,
            min: 0,
            max: 255,
            color: "blue",
            readonly: editable.value !== true,
            dark: isDark.value
          }, getCache("bSlide", {
            "onUpdate:modelValue": (value) => onNumericChange(value, "b", 255),
            onChange: (value) => onNumericChange(value, "b", 255, void 0, true)
          }))),
          h("input", __spreadValues({
            value: model.value.b,
            maxlength: 3,
            readonly: editable.value !== true,
            onChange: stop
          }, getCache("bIn", {
            onInput: (evt) => onNumericChange(evt.target.value, "b", 255, evt),
            onBlur: (evt) => onNumericChange(evt.target.value, "b", 255, evt, true)
          })))
        ]),
        hasAlpha.value === true ? h("div", { class: "row items-center no-wrap" }, [
          h("div", "A"),
          h(QSlider, __spreadValues({
            modelValue: model.value.a,
            color: "grey",
            readonly: editable.value !== true,
            dark: isDark.value
          }, getCache("aSlide", {
            "onUpdate:modelValue": (value) => onNumericChange(value, "a", 100),
            onChange: (value) => onNumericChange(value, "a", 100, void 0, true)
          }))),
          h("input", __spreadValues({
            value: model.value.a,
            maxlength: 3,
            readonly: editable.value !== true,
            onChange: stop
          }, getCache("aIn", {
            onInput: (evt) => onNumericChange(evt.target.value, "a", 100, evt),
            onBlur: (evt) => onNumericChange(evt.target.value, "a", 100, evt, true)
          })))
        ]) : null
      ];
    }
    function getPaletteTab() {
      const fn = (color) => h("div", __spreadValues({
        class: "q-color-picker__cube col-auto",
        style: { backgroundColor: color }
      }, editable.value === true ? getCache("palette#" + color, {
        onClick: () => {
          onPalettePick(color);
        }
      }) : {}));
      return [
        h("div", {
          class: "row items-center q-color-picker__palette-rows" + (editable.value === true ? " q-color-picker__palette-rows--editable" : "")
        }, computedPalette.value.map(fn))
      ];
    }
    return () => {
      const child = [getContent()];
      if (props.name !== void 0 && props.disable !== true) {
        injectFormInput(child, "push");
      }
      props.noHeader !== true && child.unshift(getHeader());
      props.noFooter !== true && child.push(getFooter());
      return h("div", __spreadValues({
        class: classes.value
      }, attributes.value), child);
    };
  }
});
const _sfc_main$2 = {
  props: {
    reference: Object
  },
  setup(__props) {
    const props = __props;
    defineComponent({
      name: "TextColorSelect"
    });
    let state = reactive({
      paletteHighlight: [
        "#ffccccaa",
        "#ffe6ccaa",
        "#ffffccaa",
        "#ccffccaa",
        "#ccffe6aa",
        "#ccffffaa",
        "#cce6ffaa",
        "#ccccffaa",
        "#e6ccffaa",
        "#ffccffaa",
        "#ff0000aa",
        "#ff8000aa",
        "#ffff00aa",
        "#00ff00aa",
        "#00ff80aa",
        "#00ffffaa",
        "#0080ffaa",
        "#0000ffaa",
        "#8000ffaa",
        "#ff00ffaa"
      ],
      palletteFore: ["#000000", "#ff0000", "#ff8000", "#ffff00", "#00ff00", "#00ffff", "#0080ff", "#0000ff", "#8000ff", "#ff00ff"],
      foreColor: "#000000",
      highlight: "#ffff00aa"
    });
    let color = ref();
    let setColor = (cmd, name) => {
      let edit = props.reference;
      color.value.hide();
      edit.caret.restore();
      edit.runCmd(cmd, name);
      edit.focus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QBtnDropdown, {
        ref: (_value, _refs) => {
          _refs["color"] = _value;
          isRef(color) ? color.value = _value : color = _value;
        },
        dense: "",
        "no-caps": "",
        "no-wrap": "",
        unelevated: "",
        color: "white",
        "text-color": "black",
        label: "\u0426\u0432\u0435\u0442",
        size: "sm"
      }, {
        default: withCtx(() => [
          createVNode(QList, { dense: "" }, {
            default: withCtx(() => [
              createVNode(QItem, {
                tag: "label",
                clickable: "",
                onClick: _cache[1] || (_cache[1] = ($event) => {
                  var _a;
                  return unref(setColor)("backColor", (_a = unref(state)) == null ? void 0 : _a.highlight);
                })
              }, {
                default: withCtx(() => [
                  createVNode(QItemSection, { side: "" }, {
                    default: withCtx(() => [
                      createVNode(QIcon, { name: "highlight" })
                    ]),
                    _: 1
                  }),
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QColor, {
                        modelValue: unref(state).highlight,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(state).highlight = $event),
                        "default-view": "palette",
                        "no-header": "",
                        "no-footer": "",
                        palette: unref(state).paletteHighlight
                      }, null, 8, ["modelValue", "palette"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(QItem, {
                tag: "label",
                clickable: "",
                onClick: _cache[3] || (_cache[3] = ($event) => {
                  var _a;
                  return unref(setColor)("foreColor", (_a = unref(state)) == null ? void 0 : _a.foreColor);
                })
              }, {
                default: withCtx(() => [
                  createVNode(QItemSection, { side: "" }, {
                    default: withCtx(() => [
                      createVNode(QIcon, { name: "format_paint" })
                    ]),
                    _: 1
                  }),
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QColor, {
                        modelValue: unref(state).foreColor,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(state).foreColor = $event),
                        "no-header": "",
                        "no-footer": "",
                        "default-view": "palette",
                        palette: unref(state).palletteFore
                      }, null, 8, ["modelValue", "palette"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 512);
    };
  }
};
const _sfc_main$1 = {
  props: {
    content: {
      type: String,
      default: ""
    },
    editorBuild: Function
  },
  emits: ["saveContent", "input"],
  setup(__props, { emit }) {
    const props = __props;
    let state = reactive(props.editorBuild({ props, emit }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QEditor, {
        ref: (_value, _refs) => {
          _refs["editor"] = _value;
        },
        modelValue: unref(state).editor,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(state).editor = $event),
        definitions: unref(state).definitions,
        toolbar: unref(state).toolbar,
        fonts: unref(state).fonts,
        "min-height": "5rem",
        onBlur: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("saveContent", unref(state).editor)),
        onInput: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("input"))
      }, {
        color: withCtx(() => [
          createVNode(_sfc_main$2, {
            reference: _ctx.$refs.editor
          }, null, 8, ["reference"])
        ]),
        _: 1
      }, 8, ["modelValue", "definitions", "toolbar", "fonts"]);
    };
  }
};
function pad(hash, len) {
  while (hash.length < len) {
    hash = "0" + hash;
  }
  return hash;
}
function fold(hash, text) {
  var i;
  var chr;
  var len;
  if (text.length === 0) {
    return hash;
  }
  for (i = 0, len = text.length; i < len; i++) {
    chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash < 0 ? hash * -2 : hash;
}
function foldObject(hash, o, seen) {
  return Object.keys(o).sort().reduce(foldKey, hash);
  function foldKey(hash2, key) {
    return foldValue(hash2, o[key], key, seen);
  }
}
function foldValue(input, value, key, seen) {
  var hash = fold(fold(fold(input, key), toString(value)), typeof value);
  if (value === null) {
    return fold(hash, "null");
  }
  if (value === void 0) {
    return fold(hash, "undefined");
  }
  if (typeof value === "object" || typeof value === "function") {
    if (seen.indexOf(value) !== -1) {
      return fold(hash, "[Circular]" + key);
    }
    seen.push(value);
    var objHash = foldObject(hash, value, seen);
    if (!("valueOf" in value) || typeof value.valueOf !== "function") {
      return objHash;
    }
    try {
      return fold(objHash, String(value.valueOf()));
    } catch (err) {
      return fold(objHash, "[valueOf exception]" + (err.stack || err.message));
    }
  }
  return fold(hash, value.toString());
}
function toString(o) {
  return Object.prototype.toString.call(o);
}
function sum(o) {
  return pad(foldValue(0, o, "", []).toString(16), 8);
}
var hashSum = sum;
function titleEditor({ props, emit, $q = useQuasar() }) {
  let state = {
    editor: props.content,
    definitions: {},
    toolbar: [
      ["bold", "italic", "strike", "underline", "subscript", "superscript"],
      [
        {
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          list: "only-icons",
          options: ["left", "center", "right", "justify"]
        },
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: "no-icons",
          options: [
            "p",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "code"
          ]
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: "no-icons",
          options: [
            "size-1",
            "size-2",
            "size-3",
            "size-4",
            "size-5",
            "size-6",
            "size-7"
          ]
        },
        {
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
          fixedIcon: true,
          list: "no-icons",
          options: [
            "default_font",
            "arial",
            "arial_black",
            "comic_sans",
            "courier_new",
            "impact",
            "lucida_grande",
            "times_new_roman",
            "verdana"
          ]
        },
        "removeFormat"
      ],
      ["undo", "redo"],
      ["viewsource"]
    ],
    fonts: {
      arial: "Arial",
      arial_black: "Arial Black",
      comic_sans: "Comic Sans MS",
      courier_new: "Courier New",
      impact: "Impact",
      lucida_grande: "Lucida Grande",
      times_new_roman: "Times New Roman",
      verdana: "Verdana"
    }
  };
  return state;
}
function bodyEditor({ props, emit, $q = useQuasar() }) {
  let state = {
    editor: props.content,
    definitions: {},
    toolbar: [
      ["bold", "italic", "strike", "underline", "subscript", "superscript"],
      ["hr", "link", "color"],
      ["print", "fullscreen"],
      [
        {
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          list: "only-icons",
          options: ["left", "center", "right", "justify"]
        },
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: "no-icons",
          options: [
            "p",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "code"
          ]
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: "no-icons",
          options: [
            "size-1",
            "size-2",
            "size-3",
            "size-4",
            "size-5",
            "size-6",
            "size-7"
          ]
        },
        {
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
          fixedIcon: true,
          list: "no-icons",
          options: [
            "default_font",
            "arial",
            "arial_black",
            "comic_sans",
            "courier_new",
            "impact",
            "lucida_grande",
            "times_new_roman",
            "verdana"
          ]
        },
        "removeFormat"
      ],
      ["quote", "unordered", "ordered", "outdent", "indent"],
      ["undo", "redo"],
      ["viewsource"]
    ],
    fonts: {
      arial: "Arial",
      arial_black: "Arial Black",
      comic_sans: "Comic Sans MS",
      courier_new: "Courier New",
      impact: "Impact",
      lucida_grande: "Lucida Grande",
      times_new_roman: "Times New Roman",
      verdana: "Verdana"
    }
  };
  return state;
}
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h2", { class: "q-ml-xl text-primary" }, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u044C\u0438", -1);
const _hoisted_2 = { class: "q-pa-md q-gutter-sm" };
const _hoisted_3 = { class: "row q-gutter-md" };
const _hoisted_4 = { class: "q-pa-md q-gutter-sm" };
const _hoisted_5 = { class: "row" };
const _hoisted_6 = { class: "col" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("span", null, "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u043D\u044B\u0435 \u0430\u0442\u0440\u0438\u0431\u0443\u0442\u044B", -1);
const _hoisted_8 = { class: "col" };
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("span", null, "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u043D\u044B\u0435 \u0442\u0435\u0433\u0438", -1);
const _hoisted_10 = { class: "col" };
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("span", null, "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u043D\u044B\u0435 \u0441\u0442\u0438\u043B\u0438", -1);
const _sfc_main = {
  props: {
    category: Object,
    article: Object,
    submit: Function,
    submitting: Boolean
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    let store = useStore();
    let categories = computed(() => {
      var _a2;
      return (_a2 = store.state.categories) == null ? void 0 : _a2.list;
    });
    let title = ref((_a = props.article) == null ? void 0 : _a.title);
    let category = ref(props == null ? void 0 : props.category);
    let body = ref((_b = props.article) == null ? void 0 : _b.body);
    let btnState = ref(false);
    let settings = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = store.state) == null ? void 0 : _a2.articles) == null ? void 0 : _b2.settings;
    });
    let state = {};
    function btnStateChange(a) {
      btnState.value = a != null ? a : !!Object.keys(state);
    }
    function saveTitle(a) {
      if (a !== title.value)
        state.title = a;
    }
    function saveBody(a) {
      if (a !== body.value)
        state.body = a;
    }
    let categoryModel = computed({
      get() {
        return category.value;
      },
      set(a) {
        category.value = a;
        state.category = a.id;
        btnStateChange();
      }
    });
    onMounted(async () => {
      await store.dispatch("articles/fetchSettings");
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Layout, null, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "header", {}, () => [
            _hoisted_1
          ]),
          createBaseVNode("div", _hoisted_2, [
            createVNode(_sfc_main$1, {
              key: unref(hashSum)(unref(title)),
              "editor-build": unref(titleEditor),
              content: unref(title),
              onSaveContent: saveTitle,
              onInput: btnStateChange
            }, null, 8, ["editor-build", "content"])
          ]),
          createBaseVNode("div", _hoisted_3, [
            createVNode(QSelect, {
              class: "col-md-3 col-12",
              modelValue: unref(categoryModel),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(categoryModel) ? categoryModel.value = $event : categoryModel = $event),
              "transition-show": "jump-up",
              "transition-hide": "jump-up",
              filled: "",
              options: unref(categories),
              style: { "width": "250px" }
            }, null, 8, ["modelValue", "options"]),
            unref(isStaff)() ? (openBlock(), createBlock(QBtn, {
              key: 0,
              class: "col-md-2",
              push: "",
              icon: "save",
              loading: __props.submitting,
              color: "blue",
              label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
              disable: !unref(btnState),
              onClick: _cache[1] || (_cache[1] = ($event) => unref(props).submit(unref(state), btnStateChange))
            }, {
              loading: withCtx(() => [
                createVNode(QSpinnerFacebook)
              ]),
              _: 1
            }, 8, ["loading", "disable"])) : createCommentVNode("", true)
          ]),
          renderSlot(_ctx.$slots, "delete"),
          createBaseVNode("div", _hoisted_4, [
            createVNode(_sfc_main$1, {
              key: unref(hashSum)(unref(body)),
              "editor-build": unref(bodyEditor),
              content: unref(body),
              onSaveContent: saveBody,
              onInput: btnStateChange
            }, null, 8, ["editor-build", "content"])
          ]),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, [
              _hoisted_7,
              createBaseVNode("ol", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(settings).allowed_attributes, (item) => {
                  return openBlock(), createElementBlock("li", { key: item }, toDisplayString(item), 1);
                }), 128))
              ])
            ]),
            createBaseVNode("p", _hoisted_8, [
              _hoisted_9,
              createBaseVNode("ol", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(settings).allowed_tags, (item) => {
                  return openBlock(), createElementBlock("li", { key: item }, toDisplayString(item), 1);
                }), 128))
              ])
            ]),
            createBaseVNode("p", _hoisted_10, [
              _hoisted_11,
              createBaseVNode("ol", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(settings).allowed_styles, (item) => {
                  return openBlock(), createElementBlock("li", { key: item }, toDisplayString(item), 1);
                }), 128))
              ])
            ])
          ])
        ]),
        _: 3
      });
    };
  }
};
export { _sfc_main as _ };
