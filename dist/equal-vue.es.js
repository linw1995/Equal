import { ref, toRef, computed, nextTick, defineComponent, resolveComponent, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, createElementBlock, createVNode, createCommentVNode, toDisplayString, renderSlot, vShow, inject, normalizeStyle, onUpdated, provide, h, createTextVNode, mergeProps, getCurrentInstance, onUnmounted, watch, unref, toRefs, Teleport, withModifiers, resolveDirective, toHandlers, createApp, onMounted, withKeys, onBeforeUpdate, Fragment, renderList } from "vue";
var Colors = /* @__PURE__ */ ((Colors2) => {
  Colors2["NEUTRAL"] = "neutral";
  Colors2["PRIMARY"] = "primary";
  Colors2["SUCCESS"] = "success";
  Colors2["DANGER"] = "danger";
  Colors2["WARNING"] = "warning";
  Colors2["BLACK"] = "black";
  return Colors2;
})(Colors || {});
var Positions = /* @__PURE__ */ ((Positions2) => {
  Positions2["B"] = "bottom";
  Positions2["BL"] = "bottom-left";
  Positions2["BR"] = "bottom-right";
  Positions2["L"] = "left";
  Positions2["LT"] = "left-top";
  Positions2["LB"] = "left-bottom";
  Positions2["R"] = "right";
  Positions2["RT"] = "right-top";
  Positions2["RB"] = "right-bottom";
  Positions2["T"] = "top";
  Positions2["TL"] = "top-left";
  Positions2["TR"] = "top-right";
  return Positions2;
})(Positions || {});
var Sizes = /* @__PURE__ */ ((Sizes2) => {
  Sizes2["BIG"] = "big";
  Sizes2["NORMAL"] = "normal";
  Sizes2["SMALL"] = "small";
  return Sizes2;
})(Sizes || {});
var EDirections = /* @__PURE__ */ ((EDirections2) => {
  EDirections2["UP"] = "up";
  EDirections2["DOWN"] = "down";
  return EDirections2;
})(EDirections || {});
const useCheckSlot = (slots, name) => {
  return name in slots ? ref(slots[name]) : null;
};
const usePopover = (props) => {
  const show = ref(false);
  const placement = ref(
    props.placement || Positions.T
  );
  const disabled = toRef(props, "disabled") || ref(false);
  const clickable = toRef(props, "hoverable") || ref(false);
  const transition = computed(() => `fade-${placement.value.split("-")[0]}`);
  const visionTimer = ref(null);
  const permanent = ref(props.permanent);
  const autoPosition = ref(props.autoposition);
  const popover = ref(null);
  const trigger = ref(null);
  const position = {
    x: 0,
    y: 0
  };
  function handleMouseEnter(e) {
    if (disabled.value) {
      return;
    }
    if (e.target.isSameNode(popover.value) && !clickable.value) {
      return;
    }
    showPopover();
    clearTimeout(visionTimer.value);
  }
  function handleMouseLeave() {
    if (!permanent.value) {
      visionTimer.value = setTimeout(() => {
        hidePopover();
      }, 200);
    }
  }
  function hidePopover() {
    show.value = false;
  }
  function showPopover() {
    if (!show.value && !disabled.value) {
      show.value = true;
      setPopoverPosition();
    }
  }
  async function setPopoverPosition() {
    await nextTick();
    const popoverTemp = popover.value;
    const triggerTemp = trigger.value;
    if (!popoverTemp) {
      return;
    }
    if (autoPosition.value) {
      const preferredPos = props.placement;
      const predefPositions = [
        .../* @__PURE__ */ new Set([
          preferredPos,
          Positions.T,
          Positions.B,
          Positions.R,
          Positions.L,
          ...Object.values(Positions)
        ])
      ];
      const triggerTempGBCR = triggerTemp.getBoundingClientRect().toJSON();
      const popoverTempGBCR = popoverTemp.getBoundingClientRect();
      for (const pos of predefPositions) {
        const posSide = pos.split("-")[0];
        const PosIsVertical = [Positions.T, Positions.B].includes(
          posSide
        );
        let searchPredicate = triggerTempGBCR[posSide];
        if (posSide === Positions.B) {
          searchPredicate = window.innerHeight - triggerTempGBCR[posSide];
        }
        if (posSide === Positions.R) {
          searchPredicate = window.innerWidth - triggerTempGBCR[posSide];
        }
        if (searchPredicate >= popoverTempGBCR[PosIsVertical ? "height" : "width"] + 24) {
          placement.value = pos;
          break;
        }
      }
    }
    switch (placement.value) {
      case "top":
        position.x = triggerTemp.offsetLeft - popoverTemp.offsetWidth / 2 + triggerTemp.offsetWidth / 2;
        position.y = triggerTemp.offsetTop - popoverTemp.offsetHeight;
        break;
      case "top-left":
        position.x = triggerTemp.offsetLeft;
        position.y = triggerTemp.offsetTop - popoverTemp.offsetHeight;
        break;
      case "top-right":
        position.x = triggerTemp.offsetLeft + triggerTemp.offsetWidth - popoverTemp.offsetWidth;
        position.y = triggerTemp.offsetTop - popoverTemp.offsetHeight;
        break;
      case "left":
        position.x = triggerTemp.offsetLeft - popoverTemp.offsetWidth;
        position.y = triggerTemp.offsetTop + triggerTemp.offsetHeight / 2 - popoverTemp.offsetHeight / 2;
        break;
      case "left-top":
        position.x = triggerTemp.offsetLeft - popoverTemp.offsetWidth;
        position.y = triggerTemp.offsetTop;
        break;
      case "left-bottom":
        position.x = triggerTemp.offsetLeft - popoverTemp.offsetWidth;
        position.y = triggerTemp.offsetTop + triggerTemp.offsetHeight - popoverTemp.offsetHeight;
        break;
      case "right":
        position.x = triggerTemp.offsetLeft + triggerTemp.offsetWidth;
        position.y = triggerTemp.offsetTop + triggerTemp.offsetHeight / 2 - popoverTemp.offsetHeight / 2;
        break;
      case "right-top":
        position.x = triggerTemp.offsetLeft + triggerTemp.offsetWidth;
        position.y = triggerTemp.offsetTop;
        break;
      case "right-bottom":
        position.x = triggerTemp.offsetLeft + triggerTemp.offsetWidth;
        position.y = triggerTemp.offsetTop + triggerTemp.offsetHeight - popoverTemp.offsetHeight;
        break;
      case "bottom":
        position.x = triggerTemp.offsetLeft - popoverTemp.offsetWidth / 2 + triggerTemp.offsetWidth / 2;
        position.y = triggerTemp.offsetTop + triggerTemp.offsetHeight;
        break;
      case "bottom-left":
        position.x = triggerTemp.offsetLeft;
        position.y = triggerTemp.offsetTop + triggerTemp.offsetHeight;
        break;
      case "bottom-right":
        position.x = triggerTemp.offsetLeft + triggerTemp.offsetWidth - popoverTemp.offsetWidth;
        position.y = triggerTemp.offsetTop + triggerTemp.offsetHeight;
        break;
      default:
        position.x = triggerTemp.offsetLeft - popoverTemp.offsetWidth / 2 + triggerTemp.offsetWidth / 2;
        position.y = triggerTemp.offsetTop - popoverTemp.offsetHeight;
        break;
    }
    popoverTemp.style.top = `${position.y}px`;
    popoverTemp.style.left = `${position.x}px`;
  }
  return {
    show,
    placement,
    disabled,
    clickable,
    transition,
    visionTimer,
    popover,
    trigger,
    position,
    permanent,
    handleMouseEnter,
    handleMouseLeave,
    hidePopover,
    showPopover,
    setPopoverPosition
  };
};
const ICON_NAME_BY_COLOR = {
  [Colors.PRIMARY]: "info_outline",
  [Colors.SUCCESS]: "done",
  [Colors.WARNING]: "error_outline",
  [Colors.DANGER]: "clear"
};
const ALLOWED_TYPES = [
  Colors.PRIMARY,
  Colors.SUCCESS,
  Colors.DANGER,
  Colors.WARNING
];
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$C = defineComponent({
  name: "it-alert",
  props: {
    type: {
      type: String,
      default: Colors.PRIMARY,
      validator: (value) => ALLOWED_TYPES.includes(value)
    },
    showIcon: { type: Boolean, default: true },
    closable: { type: Boolean, default: false },
    iconbox: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    title: { type: String, default: null },
    body: { type: String, default: null }
  },
  emits: ["on-close"],
  setup(props, { emit, slots }) {
    const defaultSlot = useCheckSlot(slots, "default");
    const clickCross = () => emit("on-close");
    const iconType = computed(() => ICON_NAME_BY_COLOR[props.type]);
    const rootClasses = computed(() => [
      "it-alert",
      `it-alert--${props.type}`,
      !props.body && !(defaultSlot == null ? void 0 : defaultSlot.value) && "it-alert--small"
    ]);
    return {
      defaultSlot,
      clickCross,
      iconType,
      rootClasses
    };
  }
});
const _hoisted_1$t = {
  key: 0,
  class: "it-alert-iconbox"
};
const _hoisted_2$l = { class: "it-alert-title" };
const _hoisted_3$e = {
  key: 0,
  class: "it-alert-slot"
};
const _hoisted_4$9 = {
  key: 1,
  class: "it-alert-slot"
};
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_icon = resolveComponent("it-icon");
  return openBlock(), createBlock(Transition, { name: "fade" }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        class: normalizeClass(_ctx.rootClasses)
      }, [
        _ctx.showIcon ? (openBlock(), createElementBlock("div", _hoisted_1$t, [
          createVNode(_component_it_icon, {
            box: _ctx.iconbox,
            class: "it-alert-icon",
            name: _ctx.iconType
          }, null, 8, ["box", "name"])
        ])) : createCommentVNode("", true),
        createElementVNode("div", null, [
          createElementVNode("p", _hoisted_2$l, toDisplayString(_ctx.title), 1),
          !_ctx.defaultSlot && _ctx.body ? (openBlock(), createElementBlock("p", _hoisted_3$e, toDisplayString(_ctx.body), 1)) : createCommentVNode("", true),
          _ctx.defaultSlot ? (openBlock(), createElementBlock("p", _hoisted_4$9, [
            renderSlot(_ctx.$slots, "default")
          ])) : createCommentVNode("", true)
        ]),
        _ctx.closable ? (openBlock(), createBlock(_component_it_icon, {
          key: 1,
          name: "clear",
          class: "it-alert-close",
          onClick: _ctx.clickCross
        }, null, 8, ["onClick"])) : createCommentVNode("", true)
      ], 2), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 3
  });
}
var Alert = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B]]);
Alert.install = (Vue) => {
  Vue.component(Alert.name, Alert);
};
const getUpperFirstLettersWords = (text = "", wordCount = 1) => {
  if (!text)
    return "";
  const words = text.split(" ");
  return words.splice(0, wordCount).reduce((str, word) => str += word[0], "").toUpperCase();
};
const _sfc_main$B = defineComponent({
  name: "it-avatar",
  props: {
    src: { type: String, default: null },
    text: { type: String, default: null },
    color: { type: String, default: null },
    size: { type: String, default: "40px" },
    square: { type: Boolean }
  },
  setup(props) {
    const squaredGroup = inject("square", null);
    const groupSize = inject("size", null);
    const avatarText = computed(() => getUpperFirstLettersWords(props.text, 2));
    const totalSize = computed(() => groupSize || props.size);
    const rootClasses = computed(() => ({
      "it-avatar--square": squaredGroup || props.square
    }));
    const rootStyles = computed(() => ({
      "background-color": props.color || "",
      "line-height": totalSize.value,
      width: totalSize.value,
      height: totalSize.value
    }));
    return { rootClasses, rootStyles, avatarText };
  }
});
const _hoisted_1$s = ["src"];
const _hoisted_2$k = {
  key: 1,
  class: "it-avatar-text"
};
const _hoisted_3$d = {
  key: 2,
  class: "it-avatar-icon",
  viewBox: "64 64 896 896"
};
const _hoisted_4$8 = /* @__PURE__ */ createElementVNode("path", { d: "M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" }, null, -1);
const _hoisted_5$4 = [
  _hoisted_4$8
];
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", {
    class: normalizeClass(["it-avatar", _ctx.rootClasses]),
    style: normalizeStyle(_ctx.rootStyles)
  }, [
    _ctx.src ? (openBlock(), createElementBlock("img", {
      key: 0,
      class: "it-avatar-img",
      src: _ctx.src,
      alt: ""
    }, null, 8, _hoisted_1$s)) : _ctx.text ? (openBlock(), createElementBlock("span", _hoisted_2$k, toDisplayString(_ctx.avatarText), 1)) : (openBlock(), createElementBlock("svg", _hoisted_3$d, _hoisted_5$4))
  ], 6);
}
var Avatar = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A]]);
Avatar.install = (Vue) => {
  Vue.component(Avatar.name, Avatar);
};
const getChildrenVNodesFromSlot = (slot) => {
  return slot().reduce((list, child) => {
    var _a;
    const resultChildren = ((_a = child.children) == null ? void 0 : _a.length) ? child.children : [child];
    return [...list, ...resultChildren];
  }, []);
};
const useAvatarGroup = (props, slots) => {
  const childrenVNodes = ref(
    slots.default ? getChildrenVNodesFromSlot(slots.default) : []
  );
  onUpdated(() => {
    const newAvatars = slots.default ? getChildrenVNodesFromSlot(slots.default) : [];
    if (newAvatars.length !== childrenVNodes.value.length) {
      childrenVNodes.value = newAvatars;
    }
  });
  const totalChildrenVNodes = computed(
    () => childrenVNodes.value.slice(0, props.max || childrenVNodes.value.length)
  );
  const label = computed(() => ({
    show: props.max ? childrenVNodes.value.length > props.max : false,
    count: props.max ? childrenVNodes.value.length - props.max : 0
  }));
  return {
    totalChildrenVNodes,
    label
  };
};
const _sfc_main$A = defineComponent({
  name: "it-avatar-group",
  props: {
    vertical: { type: Boolean },
    square: { type: Boolean },
    max: { type: Number, default: null },
    size: { type: String, default: "40px" }
  },
  setup(props, { slots }) {
    provide("square", props.square);
    provide("size", props.size);
    const { totalChildrenVNodes, label } = useAvatarGroup(
      props,
      slots
    );
    const classes = computed(() => ({
      "it-avatar-group": true,
      "it-avatar-group--vertical": props.vertical,
      "it-avatar-group--horizontal": !props.vertical
    }));
    return () => h(
      "div",
      {
        class: classes.value
      },
      [
        totalChildrenVNodes.value,
        label.value.show ? h(
          "div",
          {
            class: ["it-avatar-group-max"],
            style: { width: props.size, height: props.size }
          },
          [h("span", `+${label.value.count}`)]
        ) : null
      ]
    );
  }
});
_sfc_main$A.install = (Vue) => {
  Vue.component(_sfc_main$A.name, _sfc_main$A);
};
const _sfc_main$z = defineComponent({
  name: "it-icon",
  props: {
    name: { type: String, required: true },
    color: { type: String, default: null },
    outlined: { type: Boolean, default: false },
    box: { type: Boolean, default: false },
    boxColor: { type: String, default: null }
  }
});
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("i", {
    class: normalizeClass(["material-icons it-icon", [_ctx.outlined && "material-icons-outlined", _ctx.box && "it-icon--box"]]),
    style: normalizeStyle({
      color: _ctx.color,
      "background-color": _ctx.box && _ctx.boxColor ? _ctx.boxColor : ""
    })
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createTextVNode(toDisplayString(_ctx.name ? _ctx.name : ""), 1)
    ])
  ], 6);
}
var Icon = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z]]);
Icon.install = (Vue) => {
  Vue.component(Icon.name, Icon);
};
const _sfc_main$y = defineComponent({
  name: "it-loading",
  props: {
    stroke: { default: 6, type: Number },
    radius: { default: 32, type: Number },
    color: { default: "#3051ff", type: String }
  },
  setup(props) {
    const normalizedRadius = computed(() => props.radius - props.stroke / 2);
    return { normalizedRadius };
  }
});
const _hoisted_1$r = ["stroke", "stroke-width", "r", "cx", "cy"];
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", {
    class: "it-loading",
    style: normalizeStyle({
      "max-width": `${_ctx.radius * 2}px`,
      "max-height": `${_ctx.radius * 2}px`
    })
  }, [
    createElementVNode("circle", {
      class: "it-loading-circle",
      stroke: _ctx.color,
      "stroke-width": _ctx.stroke,
      "stroke-linecap": "round",
      fill: "none",
      r: _ctx.normalizedRadius,
      cx: _ctx.radius,
      cy: _ctx.radius,
      pathLength: "100"
    }, null, 8, _hoisted_1$r)
  ], 4);
}
var Loading$1 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y]]);
Loading$1.install = (Vue) => {
  Vue.component(Loading$1.name, Loading$1);
};
const _sfc_main$x = defineComponent({
  name: "it-button",
  components: {
    ItIcon: Icon,
    ItLoading: Loading$1
  },
  props: {
    type: {
      type: String,
      default: Colors.NEUTRAL,
      validator: (value) => Object.values(Colors).includes(value)
    },
    size: {
      type: String,
      default: Sizes.NORMAL,
      validator: (value) => Object.values(Sizes).includes(value)
    },
    iconAfter: { type: Boolean },
    disabled: { type: Boolean },
    outlined: { type: Boolean },
    round: { type: Boolean },
    pulse: { type: Boolean },
    loading: { type: Boolean },
    block: { type: Boolean },
    text: { type: Boolean },
    icon: { type: String, default: null }
  },
  setup(props, { slots }) {
    const rootClasses = computed(() => [
      {
        pulse: props.pulse,
        "it-btn--empty": !slots.default,
        "it-btn--outlined": props.outlined,
        "it-btn--round": props.round,
        "it-btn--block": props.block,
        "it-btn--text": props.text,
        "it-btn--loading": props.loading,
        [`it-btn--${props.size}`]: props.size,
        ...props.type ? { [`it-btn--${props.type}`]: true } : { "it-btn--neutral": true },
        ...props.icon ? {
          [props.iconAfter ? "it-btn--icon-right" : "it-btn--icon-left"]: true
        } : null
      }
    ]);
    return { rootClasses };
  }
});
const _hoisted_1$q = ["disabled"];
const _hoisted_2$j = {
  key: 1,
  class: "it-btn-text"
};
const _hoisted_3$c = { class: "it-btn-wrap-loading" };
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_icon = resolveComponent("it-icon");
  const _component_it_loading = resolveComponent("it-loading");
  return openBlock(), createElementBlock("button", {
    class: normalizeClass(["it-btn", _ctx.rootClasses]),
    disabled: _ctx.disabled
  }, [
    _ctx.icon ? (openBlock(), createBlock(_component_it_icon, {
      key: 0,
      class: "it-btn-icon",
      name: _ctx.icon
    }, null, 8, ["name"])) : createCommentVNode("", true),
    _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_2$j, [
      renderSlot(_ctx.$slots, "default")
    ])) : createCommentVNode("", true),
    createElementVNode("span", _hoisted_3$c, [
      _ctx.loading ? (openBlock(), createBlock(_component_it_loading, {
        key: 0,
        color: "#fff",
        radius: 10,
        stroke: 3
      })) : createCommentVNode("", true)
    ])
  ], 10, _hoisted_1$q);
}
var Button = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x]]);
Button.install = (Vue) => {
  Vue.component(Button.name, Button);
};
const _sfc_main$w = defineComponent({
  name: "it-button-group",
  props: {
    vertical: { type: Boolean }
  }
});
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([
      "it-button-group",
      _ctx.vertical ? "it-button-group--vertical" : "it-button-group--horizontal"
    ])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w]]);
ButtonGroup.install = (Vue) => {
  Vue.component(ButtonGroup.name, ButtonGroup);
};
const ALLOWED_POSITIONS = [
  Positions.TL,
  Positions.TR,
  Positions.BL,
  Positions.BR
];
const ALLOWED_COLORS = [
  Colors.PRIMARY,
  Colors.SUCCESS,
  Colors.DANGER,
  Colors.WARNING
];
const _sfc_main$v = defineComponent({
  name: "it-badge",
  props: {
    type: {
      type: String,
      default: Colors.DANGER,
      validator: (value) => ALLOWED_COLORS.includes(value)
    },
    position: {
      type: String,
      default: Positions.TR,
      validator: (value) => ALLOWED_POSITIONS.includes(value)
    },
    value: { type: [String, Number], default: null },
    maxValue: { type: Number, default: null },
    show: { type: Boolean, default: true },
    point: { type: Boolean },
    square: { type: Boolean }
  },
  setup(props, { slots }) {
    const contentValue = computed(() => {
      if (props.point || !props.value)
        return;
      return props.maxValue !== null ? Number(props.value) > props.maxValue ? `${props.maxValue}+` : props.value : props.value;
    });
    const rootClasses = computed(() => ({
      "it-badge--square": props.square
    }));
    const bodyClasses = computed(() => ({
      ...slots.default ? { [`it-badge-body--corner-${props.position}`]: true } : null,
      "it-badge-body--square": props.square,
      "it-badge-body--point": props.point,
      [`it-badge-body--${props.type}`]: true
    }));
    return { contentValue, rootClasses, bodyClasses };
  }
});
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", {
    class: normalizeClass(["it-badge", _ctx.rootClasses])
  }, [
    renderSlot(_ctx.$slots, "default"),
    _ctx.show ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: normalizeClass(["it-badge-body", _ctx.bodyClasses])
    }, toDisplayString(_ctx.contentValue), 3)) : createCommentVNode("", true)
  ], 2);
}
var Badge = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v]]);
Badge.install = (Vue) => {
  Vue.component(Badge.name, Badge);
};
const _sfc_main$u = defineComponent({
  name: "it-checkbox",
  inheritAttrs: false,
  props: {
    type: {
      default: Colors.PRIMARY,
      type: String,
      validator: (value) => [
        Colors.PRIMARY,
        Colors.SUCCESS,
        Colors.DANGER,
        Colors.WARNING,
        Colors.BLACK,
        Colors.NEUTRAL
      ].includes(value)
    },
    label: { type: String },
    subLabel: { type: String },
    pulse: { type: Boolean },
    disabled: { type: Boolean },
    lineThrough: { type: Boolean },
    icon: { type: String, default: "check" },
    color: { type: String },
    modelValue: {}
  },
  setup(props, { emit }) {
    function toggle() {
      if (props.disabled) {
        return;
      }
      const newValue = !props.modelValue;
      emit("update:modelValue", newValue);
    }
    return { toggle };
  }
});
const _hoisted_1$p = { class: "it-checkbox-wrapper" };
const _hoisted_2$i = ["disabled"];
const _hoisted_3$b = { class: "it-checkbox-label-group" };
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_icon = resolveComponent("it-icon");
  return openBlock(), createElementBlock("label", _hoisted_1$p, [
    createElementVNode("span", {
      class: normalizeClass(["it-checkbox-check-wrapper", [_ctx.pulse && !_ctx.disabled && "pulse"]])
    }, [
      createElementVNode("input", mergeProps({ type: "checkbox" }, _ctx.$attrs, {
        class: "it-checkbox-input",
        disabled: _ctx.disabled,
        onChange: _cache[0] || (_cache[0] = (...args) => _ctx.toggle && _ctx.toggle(...args))
      }), null, 16, _hoisted_2$i),
      createElementVNode("span", {
        class: normalizeClass(["it-checkbox", [
          `it-checkbox--${_ctx.type}`,
          _ctx.modelValue && `it-checkbox--${_ctx.type}--checked`,
          _ctx.disabled && "it-checkbox--disabled"
        ]])
      }, [
        createVNode(_component_it_icon, {
          style: { "font-size": "16px" },
          name: _ctx.icon
        }, null, 8, ["name"])
      ], 2)
    ], 2),
    createElementVNode("span", _hoisted_3$b, [
      _ctx.label && !_ctx.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["it-checkbox-label", [
          _ctx.lineThrough && _ctx.modelValue && "it-checkbox-label--linethrough",
          _ctx.disabled && "it-checkbox-label--disabled"
        ]])
      }, toDisplayString(_ctx.label), 3)) : createCommentVNode("", true),
      _ctx.subLabel && !_ctx.$slots.sublabel ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass(["it-checkbox-label it-checkbox-label--sub", [_ctx.disabled && "it-checkbox-label--disabled"]])
      }, toDisplayString(_ctx.subLabel), 3)) : createCommentVNode("", true),
      _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: normalizeClass(["it-checkbox-label", [
          _ctx.lineThrough && _ctx.modelValue && "it-checkbox-label--linethrough",
          _ctx.disabled && "it-checkbox-label--disabled"
        ]])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2)) : createCommentVNode("", true),
      _ctx.$slots.sublabel ? (openBlock(), createElementBlock("span", {
        key: 3,
        class: normalizeClass(["it-checkbox-label it-checkbox-label--sub", [_ctx.disabled && "it-checkbox-label--disabled"]])
      }, [
        renderSlot(_ctx.$slots, "sublabel")
      ], 2)) : createCommentVNode("", true)
    ])
  ]);
}
var Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u]]);
Checkbox.install = (Vue) => {
  Vue.component(Checkbox.name, Checkbox);
};
const _sfc_main$t = defineComponent({
  name: "it-collapse"
});
const _hoisted_1$o = { class: "it-collapse" };
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$o, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var Collapse = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t]]);
Collapse.install = (Vue) => {
  Vue.component(Collapse.name, Collapse);
};
const _sfc_main$s = defineComponent({
  name: "it-collapse-item",
  props: {
    title: { type: String },
    opened: { type: Boolean }
  },
  setup(props) {
    const active = ref(props.opened);
    return { active };
  }
});
const _hoisted_1$n = ["aria-expanded"];
const _hoisted_2$h = { class: "it-collapse-item-body" };
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_icon = resolveComponent("it-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["it-collapse-item", [_ctx.active && "it-collapse-item--expanded"]])
  }, [
    createElementVNode("button", {
      class: "it-collapse-item-title",
      "aria-expanded": _ctx.active,
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.active = !_ctx.active)
    }, [
      createElementVNode("span", null, toDisplayString(_ctx.title), 1),
      createVNode(_component_it_icon, {
        class: "it-collapse-item-title-icon",
        name: "unfold_more"
      })
    ], 8, _hoisted_1$n),
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", _hoisted_2$h, [
          renderSlot(_ctx.$slots, "default")
        ], 512), [
          [vShow, _ctx.active]
        ])
      ]),
      _: 3
    })
  ], 2);
}
var CollapseItem = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s]]);
CollapseItem.install = (Vue) => {
  Vue.component(CollapseItem.name, CollapseItem);
};
var tinycolor$1 = { exports: {} };
(function(module) {
  (function(Math2) {
    var trimLeft = /^\s+/, trimRight = /\s+$/, tinyCounter = 0, mathRound = Math2.round, mathMin = Math2.min, mathMax = Math2.max, mathRandom = Math2.random;
    function tinycolor2(color, opts) {
      color = color ? color : "";
      opts = opts || {};
      if (color instanceof tinycolor2) {
        return color;
      }
      if (!(this instanceof tinycolor2)) {
        return new tinycolor2(color, opts);
      }
      var rgb = inputToRGB(color);
      this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
      this._gradientType = opts.gradientType;
      if (this._r < 1) {
        this._r = mathRound(this._r);
      }
      if (this._g < 1) {
        this._g = mathRound(this._g);
      }
      if (this._b < 1) {
        this._b = mathRound(this._b);
      }
      this._ok = rgb.ok;
      this._tc_id = tinyCounter++;
    }
    tinycolor2.prototype = {
      isDark: function() {
        return this.getBrightness() < 128;
      },
      isLight: function() {
        return !this.isDark();
      },
      isValid: function() {
        return this._ok;
      },
      getOriginalInput: function() {
        return this._originalInput;
      },
      getFormat: function() {
        return this._format;
      },
      getAlpha: function() {
        return this._a;
      },
      getBrightness: function() {
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
      },
      getLuminance: function() {
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r / 255;
        GsRGB = rgb.g / 255;
        BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
          R = RsRGB / 12.92;
        } else {
          R = Math2.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
          G = GsRGB / 12.92;
        } else {
          G = Math2.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
          B = BsRGB / 12.92;
        } else {
          B = Math2.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
      },
      setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100 * this._a) / 100;
        return this;
      },
      toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
      },
      toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h2 = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return this._a == 1 ? "hsv(" + h2 + ", " + s + "%, " + v + "%)" : "hsva(" + h2 + ", " + s + "%, " + v + "%, " + this._roundA + ")";
      },
      toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
      },
      toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h2 = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return this._a == 1 ? "hsl(" + h2 + ", " + s + "%, " + l + "%)" : "hsla(" + h2 + ", " + s + "%, " + l + "%, " + this._roundA + ")";
      },
      toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
      },
      toHexString: function(allow3Char) {
        return "#" + this.toHex(allow3Char);
      },
      toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
      },
      toHex8String: function(allow4Char) {
        return "#" + this.toHex8(allow4Char);
      },
      toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
      },
      toRgbString: function() {
        return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
      },
      toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
      },
      toPercentageRgbString: function() {
        return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
      },
      toName: function() {
        if (this._a === 0) {
          return "transparent";
        }
        if (this._a < 1) {
          return false;
        }
        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
      },
      toFilter: function(secondColor) {
        var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";
        if (secondColor) {
          var s = tinycolor2(secondColor);
          secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }
        return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
      },
      toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;
        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
        if (needsAlphaFormat) {
          if (format === "name" && this._a === 0) {
            return this.toName();
          }
          return this.toRgbString();
        }
        if (format === "rgb") {
          formattedString = this.toRgbString();
        }
        if (format === "prgb") {
          formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
          formattedString = this.toHexString();
        }
        if (format === "hex3") {
          formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
          formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
          formattedString = this.toHex8String();
        }
        if (format === "name") {
          formattedString = this.toName();
        }
        if (format === "hsl") {
          formattedString = this.toHslString();
        }
        if (format === "hsv") {
          formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
      },
      clone: function() {
        return tinycolor2(this.toString());
      },
      _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
      },
      lighten: function() {
        return this._applyModification(lighten, arguments);
      },
      brighten: function() {
        return this._applyModification(brighten, arguments);
      },
      darken: function() {
        return this._applyModification(darken, arguments);
      },
      desaturate: function() {
        return this._applyModification(desaturate, arguments);
      },
      saturate: function() {
        return this._applyModification(saturate, arguments);
      },
      greyscale: function() {
        return this._applyModification(greyscale, arguments);
      },
      spin: function() {
        return this._applyModification(spin, arguments);
      },
      _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
      },
      analogous: function() {
        return this._applyCombination(analogous, arguments);
      },
      complement: function() {
        return this._applyCombination(complement, arguments);
      },
      monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
      },
      splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
      },
      triad: function() {
        return this._applyCombination(triad, arguments);
      },
      tetrad: function() {
        return this._applyCombination(tetrad, arguments);
      }
    };
    tinycolor2.fromRatio = function(color, opts) {
      if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
          if (color.hasOwnProperty(i)) {
            if (i === "a") {
              newColor[i] = color[i];
            } else {
              newColor[i] = convertToPercentage(color[i]);
            }
          }
        }
        color = newColor;
      }
      return tinycolor2(color, opts);
    };
    function inputToRGB(color) {
      var rgb = { r: 0, g: 0, b: 0 };
      var a = 1;
      var s = null;
      var v = null;
      var l = null;
      var ok = false;
      var format = false;
      if (typeof color == "string") {
        color = stringInputToObject(color);
      }
      if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
          rgb = rgbToRgb(color.r, color.g, color.b);
          ok = true;
          format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
          s = convertToPercentage(color.s);
          v = convertToPercentage(color.v);
          rgb = hsvToRgb(color.h, s, v);
          ok = true;
          format = "hsv";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
          s = convertToPercentage(color.s);
          l = convertToPercentage(color.l);
          rgb = hslToRgb(color.h, s, l);
          ok = true;
          format = "hsl";
        }
        if (color.hasOwnProperty("a")) {
          a = color.a;
        }
      }
      a = boundAlpha(a);
      return {
        ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a
      };
    }
    function rgbToRgb(r, g, b) {
      return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
      };
    }
    function rgbToHsl(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = mathMax(r, g, b), min = mathMin(r, g, b);
      var h2, s, l = (max + min) / 2;
      if (max == min) {
        h2 = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h2 = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h2 = (b - r) / d + 2;
            break;
          case b:
            h2 = (r - g) / d + 4;
            break;
        }
        h2 /= 6;
      }
      return { h: h2, s, l };
    }
    function hslToRgb(h2, s, l) {
      var r, g, b;
      h2 = bound01(h2, 360);
      s = bound01(s, 100);
      l = bound01(l, 100);
      function hue2rgb(p2, q2, t) {
        if (t < 0)
          t += 1;
        if (t > 1)
          t -= 1;
        if (t < 1 / 6)
          return p2 + (q2 - p2) * 6 * t;
        if (t < 1 / 2)
          return q2;
        if (t < 2 / 3)
          return p2 + (q2 - p2) * (2 / 3 - t) * 6;
        return p2;
      }
      if (s === 0) {
        r = g = b = l;
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h2 + 1 / 3);
        g = hue2rgb(p, q, h2);
        b = hue2rgb(p, q, h2 - 1 / 3);
      }
      return { r: r * 255, g: g * 255, b: b * 255 };
    }
    function rgbToHsv(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = mathMax(r, g, b), min = mathMin(r, g, b);
      var h2, s, v = max;
      var d = max - min;
      s = max === 0 ? 0 : d / max;
      if (max == min) {
        h2 = 0;
      } else {
        switch (max) {
          case r:
            h2 = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h2 = (b - r) / d + 2;
            break;
          case b:
            h2 = (r - g) / d + 4;
            break;
        }
        h2 /= 6;
      }
      return { h: h2, s, v };
    }
    function hsvToRgb(h2, s, v) {
      h2 = bound01(h2, 360) * 6;
      s = bound01(s, 100);
      v = bound01(v, 100);
      var i = Math2.floor(h2), f = h2 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
      return { r: r * 255, g: g * 255, b: b * 255 };
    }
    function rgbToHex(r, g, b, allow3Char) {
      var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
      ];
      if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
      }
      return hex.join("");
    }
    function rgbaToHex(r, g, b, a, allow4Char) {
      var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
      ];
      if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
      }
      return hex.join("");
    }
    function rgbaToArgbHex(r, g, b, a) {
      var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
      ];
      return hex.join("");
    }
    tinycolor2.equals = function(color1, color2) {
      if (!color1 || !color2) {
        return false;
      }
      return tinycolor2(color1).toRgbString() == tinycolor2(color2).toRgbString();
    };
    tinycolor2.random = function() {
      return tinycolor2.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
      });
    };
    function desaturate(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor2(hsl);
    }
    function saturate(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor2(hsl);
    }
    function greyscale(color) {
      return tinycolor2(color).desaturate(100);
    }
    function lighten(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor2(hsl);
    }
    function brighten(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var rgb = tinycolor2(color).toRgb();
      rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
      rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
      rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
      return tinycolor2(rgb);
    }
    function darken(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor2(hsl);
    }
    function spin(color, amount) {
      var hsl = tinycolor2(color).toHsl();
      var hue2 = (hsl.h + amount) % 360;
      hsl.h = hue2 < 0 ? 360 + hue2 : hue2;
      return tinycolor2(hsl);
    }
    function complement(color) {
      var hsl = tinycolor2(color).toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return tinycolor2(hsl);
    }
    function triad(color) {
      var hsl = tinycolor2(color).toHsl();
      var h2 = hsl.h;
      return [
        tinycolor2(color),
        tinycolor2({ h: (h2 + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h2 + 240) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function tetrad(color) {
      var hsl = tinycolor2(color).toHsl();
      var h2 = hsl.h;
      return [
        tinycolor2(color),
        tinycolor2({ h: (h2 + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h2 + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h2 + 270) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function splitcomplement(color) {
      var hsl = tinycolor2(color).toHsl();
      var h2 = hsl.h;
      return [
        tinycolor2(color),
        tinycolor2({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function analogous(color, results, slices) {
      results = results || 6;
      slices = slices || 30;
      var hsl = tinycolor2(color).toHsl();
      var part = 360 / slices;
      var ret = [tinycolor2(color)];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor2(hsl));
      }
      return ret;
    }
    function monochromatic(color, results) {
      results = results || 6;
      var hsv = tinycolor2(color).toHsv();
      var h2 = hsv.h, s = hsv.s, v = hsv.v;
      var ret = [];
      var modification = 1 / results;
      while (results--) {
        ret.push(tinycolor2({ h: h2, s, v }));
        v = (v + modification) % 1;
      }
      return ret;
    }
    tinycolor2.mix = function(color1, color2, amount) {
      amount = amount === 0 ? 0 : amount || 50;
      var rgb1 = tinycolor2(color1).toRgb();
      var rgb2 = tinycolor2(color2).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return tinycolor2(rgba);
    };
    tinycolor2.readability = function(color1, color2) {
      var c1 = tinycolor2(color1);
      var c2 = tinycolor2(color2);
      return (Math2.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math2.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
    };
    tinycolor2.isReadable = function(color1, color2, wcag2) {
      var readability = tinycolor2.readability(color1, color2);
      var wcag2Parms, out;
      out = false;
      wcag2Parms = validateWCAG2Parms(wcag2);
      switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
          out = readability >= 4.5;
          break;
        case "AAlarge":
          out = readability >= 3;
          break;
        case "AAAsmall":
          out = readability >= 7;
          break;
      }
      return out;
    };
    tinycolor2.mostReadable = function(baseColor, colorList, args) {
      var bestColor = null;
      var bestScore = 0;
      var readability;
      var includeFallbackColors, level, size;
      args = args || {};
      includeFallbackColors = args.includeFallbackColors;
      level = args.level;
      size = args.size;
      for (var i = 0; i < colorList.length; i++) {
        readability = tinycolor2.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
          bestScore = readability;
          bestColor = tinycolor2(colorList[i]);
        }
      }
      if (tinycolor2.isReadable(baseColor, bestColor, { "level": level, "size": size }) || !includeFallbackColors) {
        return bestColor;
      } else {
        args.includeFallbackColors = false;
        return tinycolor2.mostReadable(baseColor, ["#fff", "#000"], args);
      }
    };
    var names = tinycolor2.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32"
    };
    var hexNames = tinycolor2.hexNames = flip(names);
    function flip(o) {
      var flipped = {};
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          flipped[o[i]] = i;
        }
      }
      return flipped;
    }
    function boundAlpha(a) {
      a = parseFloat(a);
      if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
      }
      return a;
    }
    function bound01(n, max) {
      if (isOnePointZero(n)) {
        n = "100%";
      }
      var processPercent = isPercentage(n);
      n = mathMin(max, mathMax(0, parseFloat(n)));
      if (processPercent) {
        n = parseInt(n * max, 10) / 100;
      }
      if (Math2.abs(n - max) < 1e-6) {
        return 1;
      }
      return n % max / parseFloat(max);
    }
    function clamp01(val) {
      return mathMin(1, mathMax(0, val));
    }
    function parseIntFromHex(val) {
      return parseInt(val, 16);
    }
    function isOnePointZero(n) {
      return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
    }
    function isPercentage(n) {
      return typeof n === "string" && n.indexOf("%") != -1;
    }
    function pad2(c) {
      return c.length == 1 ? "0" + c : "" + c;
    }
    function convertToPercentage(n) {
      if (n <= 1) {
        n = n * 100 + "%";
      }
      return n;
    }
    function convertDecimalToHex(d) {
      return Math2.round(parseFloat(d) * 255).toString(16);
    }
    function convertHexToDecimal(h2) {
      return parseIntFromHex(h2) / 255;
    }
    var matchers = function() {
      var CSS_INTEGER = "[-\\+]?\\d+%?";
      var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
      var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
      var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
      };
    }();
    function isValidCSSUnit(color) {
      return !!matchers.CSS_UNIT.exec(color);
    }
    function stringInputToObject(color) {
      color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
      var named = false;
      if (names[color]) {
        color = names[color];
        named = true;
      } else if (color == "transparent") {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
      }
      var match;
      if (match = matchers.rgb.exec(color)) {
        return { r: match[1], g: match[2], b: match[3] };
      }
      if (match = matchers.rgba.exec(color)) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
      }
      if (match = matchers.hsl.exec(color)) {
        return { h: match[1], s: match[2], l: match[3] };
      }
      if (match = matchers.hsla.exec(color)) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
      }
      if (match = matchers.hsv.exec(color)) {
        return { h: match[1], s: match[2], v: match[3] };
      }
      if (match = matchers.hsva.exec(color)) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
      }
      if (match = matchers.hex8.exec(color)) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          a: convertHexToDecimal(match[4]),
          format: named ? "name" : "hex8"
        };
      }
      if (match = matchers.hex6.exec(color)) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          format: named ? "name" : "hex"
        };
      }
      if (match = matchers.hex4.exec(color)) {
        return {
          r: parseIntFromHex(match[1] + "" + match[1]),
          g: parseIntFromHex(match[2] + "" + match[2]),
          b: parseIntFromHex(match[3] + "" + match[3]),
          a: convertHexToDecimal(match[4] + "" + match[4]),
          format: named ? "name" : "hex8"
        };
      }
      if (match = matchers.hex3.exec(color)) {
        return {
          r: parseIntFromHex(match[1] + "" + match[1]),
          g: parseIntFromHex(match[2] + "" + match[2]),
          b: parseIntFromHex(match[3] + "" + match[3]),
          format: named ? "name" : "hex"
        };
      }
      return false;
    }
    function validateWCAG2Parms(parms) {
      var level, size;
      parms = parms || { "level": "AA", "size": "small" };
      level = (parms.level || "AA").toUpperCase();
      size = (parms.size || "small").toLowerCase();
      if (level !== "AA" && level !== "AAA") {
        level = "AA";
      }
      if (size !== "small" && size !== "large") {
        size = "small";
      }
      return { "level": level, "size": size };
    }
    if (module.exports) {
      module.exports = tinycolor2;
    } else {
      window.tinycolor = tinycolor2;
    }
  })(Math);
})(tinycolor$1);
var tinycolor = tinycolor$1.exports;
function _colorChange(data) {
  const alpha2 = data && data.a;
  const color = tinycolor(data);
  if (color && (color.getAlpha() === void 0 || color.getAlpha() === null)) {
    color.setAlpha(alpha2 || 1);
  }
  const hsl = color.toHsl();
  const hsv = color.toHsv();
  if (hsl.s === 0) {
    hsv.h = hsl.h = data.h || data.hsl && data.hsl.h || 0;
  }
  if (hsv.v < 0.0164) {
    hsv.h = data.h || data.hsv && data.hsv.h || 0;
    hsv.s = data.s || data.hsv && data.hsv.s || 0;
  }
  if (hsl.l < 0.01) {
    hsl.h = data.h || data.hsl && data.hsl.h || 0;
    hsl.s = data.s || data.hsl && data.hsl.s || 0;
  }
  return {
    hsl,
    hex: color.toHexString().toUpperCase(),
    hex8: color.toHex8String().toUpperCase(),
    rgba: color.toRgb(),
    hsv,
    a: data.a || color.getAlpha()
  };
}
const clamp = (number, min = 0, max = 1) => {
  return number > max ? max : number < min ? min : number;
};
const colorpicker = (props, emit) => {
  const val = ref(_colorChange(props.value));
  const colors = computed({
    get: () => {
      return val.value;
    },
    set: (newVal) => {
      val.value = newVal;
      emit("change", newVal);
    }
  });
  function colorChange(data) {
    colors.value = _colorChange(data);
  }
  return {
    val,
    colors,
    colorChange
  };
};
const saturation$1 = (props, emit) => {
  const showTooltip = ref(false);
  const colors = computed(() => props.modelValue);
  const container = ref(null);
  function handleChange(e, skip) {
    !skip && e.preventDefault();
    if (!container.value) {
      return;
    }
    if (props.tooltip && !showTooltip.value) {
      showTooltip.value = true;
    }
    const { clientWidth, clientHeight } = container.value;
    const xOffset = container.value.getBoundingClientRect().left + window.pageXOffset;
    const yOffset = container.value.getBoundingClientRect().top + window.pageYOffset;
    const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
    const left = clamp(pageX - xOffset, 0, clientWidth);
    const top = clamp(pageY - yOffset, 0, clientHeight);
    const saturation2 = left / clientWidth;
    const bright = clamp(-(top / clientHeight) + 1, 0, 1);
    emit("change", {
      h: colors.value.hsv.h,
      s: saturation2,
      v: bright,
      a: colors.value.hsv.a,
      source: "hsva"
    });
  }
  function handleMouseDown() {
    window.addEventListener("mousemove", handleChange);
    window.addEventListener("mouseup", handleChange);
    window.addEventListener("touchstart", handleChange);
    window.addEventListener("mouseup", handleMouseUp);
  }
  function handleMouseUp() {
    unbindEventListeners();
    showTooltip.value = false;
  }
  function unbindEventListeners() {
    window.removeEventListener("mousemove", handleChange);
    window.removeEventListener("mouseup", handleChange);
    window.removeEventListener("mouseup", handleMouseUp);
  }
  return {
    showTooltip,
    colors,
    container,
    handleChange,
    handleMouseDown,
    handleMouseUp
  };
};
const alpha$1 = (props, emit) => {
  const colors = computed(() => props.modelValue);
  const container = ref(null);
  function handleChange(e, skip) {
    !skip && e.preventDefault();
    if (!container.value) {
      return;
    }
    const containerWidth = container.value.clientWidth;
    const xOffset = container.value.getBoundingClientRect().left + window.pageXOffset;
    const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    const left = pageX - xOffset;
    let a;
    if (left < 0) {
      a = 0;
    } else if (left > containerWidth) {
      a = 1;
    } else {
      a = Math.round(left * 100 / containerWidth) / 100;
    }
    if (colors.value.a !== a) {
      emit("change", {
        h: colors.value.hsl.h,
        s: colors.value.hsl.s,
        l: colors.value.hsl.l,
        a,
        source: "rgba"
      });
    }
  }
  function handleMouseDown(e) {
    handleChange(e, true);
    window.addEventListener("mousemove", handleChange);
    window.addEventListener("mouseup", handleMouseUp);
  }
  function handleMouseUp() {
    unbindEventListeners();
  }
  function unbindEventListeners() {
    window.removeEventListener("mousemove", handleChange);
    window.removeEventListener("mouseup", handleMouseUp);
  }
  return {
    colors,
    container,
    handleChange,
    handleMouseDown,
    handleMouseUp
  };
};
const hue$1 = (props, emit) => {
  const oldHue = ref(0);
  const pullDirection = ref("");
  const container = ref(null);
  const colors = computed(() => {
    const h2 = props.modelValue.hsl.h;
    if (h2 !== 0 && h2 - oldHue.value > 0)
      pullDirection.value = Positions.R;
    if (h2 !== 0 && h2 - oldHue.value < 0)
      pullDirection.value = Positions.L;
    oldHue.value = h2;
    return props.modelValue;
  });
  function handleChange(e, skip) {
    !skip && e.preventDefault();
    if (!container.value) {
      return;
    }
    const containerWidth = container.value.clientWidth;
    const xOffset = container.value.getBoundingClientRect().left + window.pageXOffset;
    const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    const left = pageX - xOffset;
    let h2, percent;
    if (left < 0) {
      h2 = 0;
    } else if (left > containerWidth) {
      h2 = 360;
    } else {
      percent = left * 100 / containerWidth;
      h2 = 360 * percent / 100;
    }
    if (colors.value.hsl.h !== h2) {
      emit("change", {
        h: h2,
        s: colors.value.hsl.s,
        l: colors.value.hsl.l,
        a: colors.value.hsl.a,
        source: "hsl"
      });
    }
  }
  function handleMouseDown(e) {
    handleChange(e, true);
    window.addEventListener("mousemove", handleChange);
    window.addEventListener("mouseup", handleMouseUp);
  }
  function handleMouseUp(e) {
    unbindEventListeners();
  }
  function unbindEventListeners() {
    window.removeEventListener("mousemove", handleChange);
    window.removeEventListener("mouseup", handleMouseUp);
  }
  return {
    container,
    colors,
    pullDirection,
    handleChange,
    handleMouseDown
  };
};
const _sfc_main$r = defineComponent({
  name: "saturation",
  props: {
    modelValue: { type: Object, required: true },
    tooltip: Boolean
  },
  setup(props, { emit }) {
    const {
      showTooltip,
      colors,
      container,
      handleChange,
      handleMouseDown,
      handleMouseUp
    } = saturation$1(props, emit);
    const bgColor = computed(() => `hsl(${colors.value.hsv.h}, 100%, 50%)`);
    const pointerTop = computed(() => -(colors.value.hsv.v * 100) + 100);
    const pointerLeft = computed(() => colors.value.hsv.s * 100);
    return {
      showTooltip,
      colors,
      container,
      bgColor,
      pointerTop,
      pointerLeft,
      handleChange,
      handleMouseDown,
      handleMouseUp
    };
  }
});
const _hoisted_1$m = /* @__PURE__ */ createElementVNode("div", { class: "it-saturation--white" }, null, -1);
const _hoisted_2$g = /* @__PURE__ */ createElementVNode("div", { class: "it-saturation--black" }, null, -1);
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    ref: "container",
    class: "it-saturation",
    style: normalizeStyle({ background: _ctx.bgColor }),
    onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.handleMouseDown && _ctx.handleMouseDown(...args)),
    onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
    onTouchstart: _cache[2] || (_cache[2] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
    onTouchend: _cache[3] || (_cache[3] = (...args) => _ctx.handleMouseUp && _ctx.handleMouseUp(...args))
  }, [
    _hoisted_1$m,
    _hoisted_2$g,
    createVNode(Transition, { name: "drop-top" }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          class: "it-color-tooltip",
          style: normalizeStyle({
            top: _ctx.pointerTop - 60 + "%",
            left: _ctx.pointerLeft - 14 + "%",
            "background-color": _ctx.colors.hex
          })
        }, null, 4), [
          [vShow, _ctx.showTooltip]
        ])
      ]),
      _: 1
    }),
    createElementVNode("div", {
      class: "it-saturation-pointer",
      style: normalizeStyle({ top: _ctx.pointerTop + "%", left: _ctx.pointerLeft + "%" })
    }, [
      createElementVNode("div", {
        class: "it-saturation-circle",
        style: normalizeStyle({ "background-color": _ctx.colors.hex })
      }, null, 4)
    ], 4)
  ], 36);
}
var saturation = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r]]);
const _sfc_main$q = defineComponent({
  name: "hue",
  props: {
    modelValue: Object
  },
  setup(props, { emit }) {
    const { container, colors, pullDirection, handleChange, handleMouseDown } = hue$1(props, emit);
    const pointerLeft = computed(() => {
      if (colors.value.hsl.h === 0 && pullDirection.value === "right") {
        return "100%";
      }
      return colors.value.hsl.h * 100 / 360 + "%";
    });
    const cursorColor = computed(() => `hsl(${colors.value.hsv.h}, 100%, 50%)`);
    return {
      container,
      colors,
      handleChange,
      handleMouseDown,
      cursorColor,
      pointerLeft
    };
  }
});
const _hoisted_1$l = { class: "it-hue it-hue--horizontal" };
const _hoisted_2$f = ["aria-valuenow"];
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$l, [
    createElementVNode("div", {
      ref: "container",
      class: "it-hue-container",
      role: "slider",
      "aria-valuenow": _ctx.colors.hsl.h,
      "aria-valuemin": "0",
      "aria-valuemax": "360",
      onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.handleMouseDown && _ctx.handleMouseDown(...args)),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onTouchstart: _cache[2] || (_cache[2] = (...args) => _ctx.handleChange && _ctx.handleChange(...args))
    }, [
      createElementVNode("div", {
        class: "it-hue-pointer",
        style: normalizeStyle({ left: _ctx.pointerLeft }),
        role: "presentation"
      }, [
        createElementVNode("div", {
          class: "it-hue-picker",
          style: normalizeStyle({ "background-color": _ctx.cursorColor })
        }, null, 4)
      ], 4)
    ], 40, _hoisted_2$f)
  ]);
}
var hue = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q]]);
const _sfc_main$p = defineComponent({
  name: "checkboard",
  computed: {
    bgStyle() {
      return {
        "background-image": `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`
      };
    }
  }
});
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "it-checkerboard",
    style: normalizeStyle(_ctx.bgStyle)
  }, null, 4);
}
var checkboard = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p]]);
const _sfc_main$o = defineComponent({
  name: "alpha",
  components: {
    checkboard
  },
  props: {
    modelValue: Object
  },
  setup(props, { emit }) {
    const { colors, container, handleChange, handleMouseDown, handleMouseUp } = alpha$1(props, emit);
    const gradientColor = computed(() => {
      const { r, g, b } = colors.value.rgba;
      const rgbStr = [r, g, b].join(",");
      return "linear-gradient(to right, rgba(" + rgbStr + ", 0) 0%, rgba(" + rgbStr + ", 1) 100%)";
    });
    return {
      colors,
      gradientColor,
      container,
      handleChange,
      handleMouseDown,
      handleMouseUp
    };
  }
});
const _hoisted_1$k = { class: "it-alpha" };
const _hoisted_2$e = { class: "it-alpha-checkboard-wrap" };
const _hoisted_3$a = /* @__PURE__ */ createElementVNode("div", { class: "it-alpha-picker" }, null, -1);
const _hoisted_4$7 = [
  _hoisted_3$a
];
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_checkboard = resolveComponent("checkboard");
  return openBlock(), createElementBlock("div", _hoisted_1$k, [
    createElementVNode("div", _hoisted_2$e, [
      createVNode(_component_checkboard)
    ]),
    createElementVNode("div", {
      class: "it-alpha-gradient",
      style: normalizeStyle({ background: _ctx.gradientColor })
    }, null, 4),
    createElementVNode("div", {
      ref: "container",
      class: "it-alpha-container",
      onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.handleMouseDown && _ctx.handleMouseDown(...args)),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onTouchstart: _cache[2] || (_cache[2] = (...args) => _ctx.handleChange && _ctx.handleChange(...args))
    }, [
      createElementVNode("div", {
        class: "it-alpha-pointer",
        style: normalizeStyle({ left: _ctx.colors.a * 100 + "%" })
      }, _hoisted_4$7, 4)
    ], 544)
  ]);
}
var alpha = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o]]);
const _sfc_main$n = defineComponent({
  name: "it-colorpicker",
  components: {
    saturation,
    hue,
    alpha
  },
  props: {
    disableAlpha: {
      type: Boolean,
      default: false
    },
    showTooltip: {
      type: Boolean,
      default: false
    },
    value: {
      default: "#000",
      type: [Object, String]
    }
  },
  setup(props, { emit }) {
    const { colors, colorChange } = colorpicker(props, emit);
    return {
      colors,
      colorChange
    };
  }
});
const _hoisted_1$j = {
  "aria-label": "Color picker",
  class: "it-colorpicker"
};
const _hoisted_2$d = { class: "it-colorpicker-saturation-wrap" };
const _hoisted_3$9 = { class: "it-colorpicker-controls" };
const _hoisted_4$6 = { class: "it-colorpicker-sliders" };
const _hoisted_5$3 = { class: "it-colorpicker-hue-wrap" };
const _hoisted_6$3 = {
  key: 0,
  class: "it-colorpicker-alpha-wrap"
};
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_saturation = resolveComponent("saturation");
  const _component_hue = resolveComponent("hue");
  const _component_alpha = resolveComponent("alpha");
  return openBlock(), createElementBlock("div", _hoisted_1$j, [
    createElementVNode("div", _hoisted_2$d, [
      createVNode(_component_saturation, {
        modelValue: _ctx.colors,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.colors = $event),
        tooltip: _ctx.showTooltip,
        onChange: _ctx.colorChange
      }, null, 8, ["modelValue", "tooltip", "onChange"])
    ]),
    createElementVNode("div", _hoisted_3$9, [
      createElementVNode("div", _hoisted_4$6, [
        createElementVNode("div", _hoisted_5$3, [
          createVNode(_component_hue, {
            modelValue: _ctx.colors,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.colors = $event),
            class: normalizeClass({ "it-colorpicker-bottom": _ctx.disableAlpha }),
            onChange: _ctx.colorChange
          }, null, 8, ["modelValue", "class", "onChange"])
        ]),
        !_ctx.disableAlpha ? (openBlock(), createElementBlock("div", _hoisted_6$3, [
          createVNode(_component_alpha, {
            modelValue: _ctx.colors,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.colors = $event),
            onChange: _ctx.colorChange
          }, null, 8, ["modelValue", "onChange"])
        ])) : createCommentVNode("", true)
      ])
    ])
  ]);
}
var Colorpicker = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n]]);
Colorpicker.install = (Vue) => {
  Vue.component(Colorpicker.name, Colorpicker);
};
const _sfc_main$m = defineComponent({
  name: "it-divider",
  props: { vertical: { type: Boolean } }
});
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["it-divider", {
      "it-divider--horizontal": !_ctx.vertical,
      "it-divider--vertical": _ctx.vertical
    }]),
    role: "separator"
  }, null, 2);
}
var Divider = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m]]);
Divider.install = (Vue) => {
  Vue.component(Divider.name, Divider);
};
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
var hasPassiveEvents = false;
if (typeof window !== "undefined") {
  var passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return void 0;
    }
  };
  window.addEventListener("testPassive", null, passiveTestOptions);
  window.removeEventListener("testPassive", null, passiveTestOptions);
}
var isIosDevice = typeof window !== "undefined" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
var locks = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting = void 0;
var previousBodyPaddingRight = void 0;
var allowTouchMove = function allowTouchMove2(el) {
  return locks.some(function(lock) {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true;
    }
    return false;
  });
};
var preventDefault = function preventDefault2(rawEvent) {
  var e = rawEvent || window.event;
  if (allowTouchMove(e.target)) {
    return true;
  }
  if (e.touches.length > 1)
    return true;
  if (e.preventDefault)
    e.preventDefault();
  return false;
};
var setOverflowHidden = function setOverflowHidden2(options) {
  if (previousBodyPaddingRight === void 0) {
    var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
    if (_reserveScrollBarGap && scrollBarGap > 0) {
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = scrollBarGap + "px";
    }
  }
  if (previousBodyOverflowSetting === void 0) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
};
var restoreOverflowSetting = function restoreOverflowSetting2() {
  if (previousBodyPaddingRight !== void 0) {
    document.body.style.paddingRight = previousBodyPaddingRight;
    previousBodyPaddingRight = void 0;
  }
  if (previousBodyOverflowSetting !== void 0) {
    document.body.style.overflow = previousBodyOverflowSetting;
    previousBodyOverflowSetting = void 0;
  }
};
var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled2(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};
var handleScroll = function handleScroll2(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;
  if (allowTouchMove(event.target)) {
    return false;
  }
  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    return preventDefault(event);
  }
  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    return preventDefault(event);
  }
  event.stopPropagation();
  return true;
};
var disableBodyScroll = function disableBodyScroll2(targetElement, options) {
  if (!targetElement) {
    console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
    return;
  }
  if (locks.some(function(lock2) {
    return lock2.targetElement === targetElement;
  })) {
    return;
  }
  var lock = {
    targetElement,
    options: options || {}
  };
  locks = [].concat(_toConsumableArray(locks), [lock]);
  if (isIosDevice) {
    targetElement.ontouchstart = function(event) {
      if (event.targetTouches.length === 1) {
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    targetElement.ontouchmove = function(event) {
      if (event.targetTouches.length === 1) {
        handleScroll(event, targetElement);
      }
    };
    if (!documentListenerAdded) {
      document.addEventListener("touchmove", preventDefault, hasPassiveEvents ? { passive: false } : void 0);
      documentListenerAdded = true;
    }
  } else {
    setOverflowHidden(options);
  }
};
var enableBodyScroll = function enableBodyScroll2(targetElement) {
  if (!targetElement) {
    console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
    return;
  }
  locks = locks.filter(function(lock) {
    return lock.targetElement !== targetElement;
  });
  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;
    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener("touchmove", preventDefault, hasPassiveEvents ? { passive: false } : void 0);
      documentListenerAdded = false;
    }
  } else if (!locks.length) {
    restoreOverflowSetting();
  }
};
function tryOnUnmounted(fn) {
  if (getCurrentInstance())
    onUnmounted(fn);
}
/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ["input", "select", "textarea", "a[href]", "button", "[tabindex]:not(slot)", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  return element.getRootNode();
} : function(element) {
  return element.ownerDocument;
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scope: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !options.shadowRootFilter || options.shadowRootFilter(element);
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scope: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var getTabindex = function getTabindex2(node, isScope) {
  if (node.tabIndex < 0) {
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute("tabindex"), 10))) {
      return 0;
    }
  }
  return node.tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  var nodeRootHost = getRootNode(node).host;
  var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);
  if (!displayCheck || displayCheck === "full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (nodeIsAttached) {
      return !node.getClientRects().length;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scope;
    var element = isScope ? item.scope : item;
    var candidateTabindex = getTabindex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};
/*!
* focus-trap 6.9.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var activeFocusTraps = function() {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];
        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }
      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }
      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent2(e) {
  return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
};
var isTabEvent = function isTabEvent2(e) {
  return e.key === "Tab" || e.keyCode === 9;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var findIndex = function findIndex2(arr, fn) {
  var idx = -1;
  arr.every(function(value, i) {
    if (fn(value)) {
      idx = i;
      return false;
    }
    return true;
  });
  return idx;
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var createFocusTrap = function createFocusTrap2(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);
  var state = {
    containers: [],
    containerGroups: [],
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    delayInitialFocusTimer: void 0
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  var findContainerIndex = function findContainerIndex2(element) {
    return state.containerGroups.findIndex(function(_ref) {
      var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || tabbableNodes.find(function(node) {
        return node === element;
      });
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var optionValue = config[optionName];
    if (typeof optionValue === "function") {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      optionValue = optionValue.apply(void 0, params);
    }
    if (optionValue === true) {
      optionValue = void 0;
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue;
      }
      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue;
    if (typeof optionValue === "string") {
      node = doc.querySelector(optionValue);
      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node = getNodeForOption("initialFocus");
    if (node === false) {
      return false;
    }
    if (node === void 0) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
        node = firstTabbableNode || getNodeForOption("fallbackFocus");
      }
    }
    if (!node) {
      throw new Error("Your focus-trap needs to have at least one focusable element");
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map(function(container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions);
      var focusableNodes = focusable(container, config.tabbableOptions);
      return {
        container,
        tabbableNodes,
        focusableNodes,
        firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
        lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var nodeIdx = focusableNodes.findIndex(function(n) {
            return n === node;
          });
          if (nodeIdx < 0) {
            return void 0;
          }
          if (forward) {
            return focusableNodes.slice(nodeIdx + 1).find(function(n) {
              return isTabbable(n, config.tabbableOptions);
            });
          }
          return focusableNodes.slice(0, nodeIdx).reverse().find(function(n) {
            return isTabbable(n, config.tabbableOptions);
          });
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function(group) {
      return group.tabbableNodes.length > 0;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    }
  };
  var tryFocus = function tryFocus2(node) {
    if (node === false) {
      return;
    }
    if (node === doc.activeElement) {
      return;
    }
    if (!node || !node.focus) {
      tryFocus2(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption("setReturnFocus", previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  };
  var checkPointerDown = function checkPointerDown2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      trap.deactivate({
        returnFocus: config.returnFocusOnDeactivate && !isFocusable(target, config.tabbableOptions)
      });
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(e) {
    var target = getActualTarget(e);
    var targetContained = findContainerIndex(target) >= 0;
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  };
  var checkTab = function checkTab2(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findContainerIndex(target);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
      if (containerIndex < 0) {
        if (e.shiftKey) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        var startOfGroupIndex = findIndex(state.tabbableGroups, function(_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function(_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      destinationNode = getNodeForOption("fallbackFocus");
    }
    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    }
  };
  var checkKey = function checkKey2(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }
    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };
  var checkClick = function checkClick2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trap);
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkKey, true);
    return trap;
  };
  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, "onActivate");
      var onPostActivate = getOption(activateOptions, "onPostActivate");
      var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      if (onActivate) {
        onActivate();
      }
      var finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        if (onPostActivate) {
          onPostActivate();
        }
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(options, "onDeactivate");
      var onPostDeactivate = getOption(options, "onPostDeactivate");
      var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
      var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
      if (onDeactivate) {
        onDeactivate();
      }
      var finishDeactivation = function finishDeactivation2() {
        delay(function() {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }
      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }
      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function(element) {
        return typeof element === "string" ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      return this;
    }
  };
  trap.updateContainerElements(elements);
  return trap;
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function unrefElement(elRef) {
  var _a, _b;
  const plain = unref(elRef);
  return (_b = (_a = plain) === null || _a === void 0 ? void 0 : _a.$el) !== null && _b !== void 0 ? _b : plain;
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
function useFocusTrap(target, options = {}) {
  let trap;
  const { immediate } = options, focusTrapOptions = __rest(options, ["immediate"]);
  const hasFocus = ref(false);
  const isPaused = ref(false);
  const activate = (opts) => trap && trap.activate(opts);
  const deactivate = (opts) => trap && trap.deactivate(opts);
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.value = true;
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.value = false;
    }
  };
  watch(() => unrefElement(target), (el) => {
    trap = createFocusTrap(el, Object.assign(Object.assign({}, focusTrapOptions), {
      onActivate() {
        hasFocus.value = true;
        if (options.onActivate)
          options.onActivate();
      },
      onDeactivate() {
        hasFocus.value = false;
        if (options.onDeactivate)
          options.onDeactivate();
      }
    }));
    if (immediate)
      activate();
  }, { flush: "post" });
  tryOnUnmounted(() => deactivate());
  return {
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause
  };
}
const _sfc_main$l = defineComponent({
  name: "it-drawer",
  props: {
    modelValue: { type: Boolean, default: false },
    width: { type: String, default: "500px" },
    closableMask: { type: Boolean, default: true },
    hideMask: Boolean,
    placement: {
      type: String,
      default: Positions.R,
      validator: (value) => [Positions.L, Positions.R].includes(value)
    }
  },
  setup(props, { emit }) {
    let { modelValue } = toRefs(props);
    const Equal = getCurrentInstance();
    const drawerRef = ref();
    const focusRef = ref();
    const { activate, deactivate } = useFocusTrap(focusRef);
    watch(
      () => modelValue.value,
      async (active) => {
        const drawersList = Equal.appContext.config.globalProperties.$Equal.drawers;
        if (active) {
          drawersList.push(drawerRef.value);
          drawersList.slice(0, drawersList.indexOf(drawerRef.value)).forEach((drawerEl) => {
            var _a;
            if (drawerEl.style.transform !== "") {
              const scaleAndTranslate = (_a = drawerEl.style.transform.match(/[-+]?[0-9]*\.?[0-9]+/g)) == null ? void 0 : _a.map((ittt) => parseFloat(ittt));
              drawerEl.style.transform = `scale(${scaleAndTranslate[0] - 0.05}) translateX(${scaleAndTranslate[1] - (props.placement === Positions.R ? 10 : -10)}%)`;
            } else {
              drawerEl.style.transform = `scale(0.9) translateX(${props.placement === Positions.R ? -15 : 15}%)`;
            }
          });
          await nextTick();
          if (!props.hideMask) {
            disableBodyScroll(focusRef.value, { reserveScrollBarGap: true });
            activate();
          }
        } else {
          drawersList.splice(drawersList.indexOf(drawerRef.value), 1);
          drawersList.forEach((drawerEl, i) => {
            var _a;
            if (i === drawersList.length - 1) {
              drawerEl.style.transform = "";
              return;
            }
            const scaleAndTranslate = (_a = drawerEl.style.transform.match(/[-+]?[0-9]*\.?[0-9]+/g)) == null ? void 0 : _a.map((val) => parseFloat(val));
            drawerEl.style.transform = `scale(${scaleAndTranslate[0] + 0.05}) translateX(${scaleAndTranslate[1] + (props.placement === Positions.R ? 10 : -10)}%)`;
          });
          drawerRef.value.style.transform = "";
          if (!props.hideMask) {
            enableBodyScroll(focusRef.value);
            deactivate();
          }
        }
      }
    );
    function maskClick() {
      if (props.closableMask) {
        close();
      }
    }
    function close() {
      emit("update:modelValue", false);
    }
    const transitionSide = computed(() => {
      return props.placement === Positions.R ? Positions.L : Positions.R;
    });
    return {
      maskClick,
      transitionSide,
      drawerRef,
      focusRef
    };
  }
});
const _hoisted_1$i = {
  class: "it-drawer",
  ref: "focusRef"
};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createElementVNode("div", _hoisted_1$i, [
      createVNode(Transition, { name: "fade" }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: "it-drawer-mask",
            tabindex: "0",
            style: normalizeStyle({ cursor: _ctx.closableMask ? "pointer" : "default" }),
            onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.maskClick && _ctx.maskClick(...args), ["self"]))
          }, null, 4), [
            [vShow, _ctx.modelValue && !_ctx.hideMask]
          ])
        ]),
        _: 1
      }),
      createVNode(Transition, {
        name: `drop-${_ctx.transitionSide}`
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            ref: "drawerRef",
            style: normalizeStyle({ width: _ctx.width }),
            class: normalizeClass(["it-drawer-body", `it-drawer-body--${_ctx.placement}`])
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 6), [
            [vShow, _ctx.modelValue]
          ])
        ]),
        _: 3
      }, 8, ["name"])
    ], 512)
  ]);
}
var Drawer = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l]]);
Drawer.install = (Vue) => {
  Vue.component(Drawer.name, Drawer);
};
const clickOutside = {
  beforeMount(elem, binding) {
    let startedSource = false;
    elem.clickStarted = (e) => {
      if (elem.contains(e.target)) {
        startedSource = true;
      }
    };
    elem.clickOutsideHandler = (e) => {
      if (!elem.contains(e.target) && binding.value && !startedSource) {
        binding.value(e);
      }
      startedSource = false;
    };
    document.addEventListener("mousedown", elem.clickStarted);
    document.addEventListener("mouseup", elem.clickOutsideHandler);
  },
  unmounted(elem) {
    document.removeEventListener("mouseup", elem.clickOutsideHandler);
    document.removeEventListener("mousedown", elem.clickOutsideHandler);
  }
};
const _sfc_main$k = defineComponent({
  name: "it-dropdown",
  directives: {
    clickoutside: clickOutside
  },
  props: {
    placement: {
      default: Positions.B,
      type: String,
      validator: (value) => [
        Positions.B,
        Positions.BL,
        Positions.BR,
        Positions.L,
        Positions.LT,
        Positions.LB,
        Positions.R,
        Positions.RT,
        Positions.RB,
        Positions.T,
        Positions.TL,
        Positions.TR
      ].includes(value)
    },
    clickable: Boolean
  },
  setup(props) {
    const {
      show,
      placement,
      disabled,
      popover,
      trigger,
      handleMouseEnter,
      handleMouseLeave,
      hidePopover,
      showPopover
    } = usePopover(props);
    function toggleDropdown() {
      if (disabled.value) {
        return;
      }
      if (show.value) {
        hidePopover();
      } else {
        showPopover();
      }
    }
    const transition = computed(() => `drop-${placement.value}`);
    const placementSide = computed(() => placement.value.split("-")[0]);
    const listeners = computed(() => {
      return props.clickable ? {
        click: toggleDropdown
      } : {
        mouseenter: handleMouseEnter,
        mouseleave: handleMouseLeave
      };
    });
    return {
      toggleDropdown,
      transition,
      placementSide,
      listeners,
      show,
      hidePopover,
      placement,
      popover,
      trigger
    };
  }
});
const _hoisted_1$h = {
  ref: "trigger",
  class: "it-dropdown-trigger"
};
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_clickoutside = resolveDirective("clickoutside");
  return withDirectives((openBlock(), createElementBlock("div", mergeProps({ class: "it-dropdown" }, toHandlers(_ctx.listeners, true)), [
    createElementVNode("div", _hoisted_1$h, [
      renderSlot(_ctx.$slots, "default")
    ], 512),
    createVNode(Transition, { name: _ctx.transition }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          ref: "popover",
          class: normalizeClass(["it-dropdown-slot", [_ctx.placement && `it-dropdown-slot--${_ctx.placementSide}`]])
        }, [
          renderSlot(_ctx.$slots, "menu")
        ], 2), [
          [vShow, _ctx.show]
        ])
      ]),
      _: 3
    }, 8, ["name"])
  ], 16)), [
    [_directive_clickoutside, _ctx.hidePopover]
  ]);
}
var Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
const _sfc_main$j = defineComponent({
  name: "it-dropdown-menu"
});
const _hoisted_1$g = { class: "it-dropdown-menu" };
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ul", _hoisted_1$g, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var DropdownMenu = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j]]);
const _sfc_main$i = defineComponent({
  name: "it-dropdown-item",
  props: {
    disabled: Boolean,
    divided: Boolean,
    icon: String
  }
});
const _hoisted_1$f = { class: "it-dropdown-text" };
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_icon = resolveComponent("it-icon");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["it-dropdown-item", [
      _ctx.disabled && "it-dropdown-item--disabled",
      _ctx.divided && "it-dropdown-item--divided"
    ]])
  }, [
    _ctx.icon ? (openBlock(), createBlock(_component_it_icon, {
      key: 0,
      class: "it-dropdown-icon",
      name: _ctx.icon
    }, null, 8, ["name"])) : createCommentVNode("", true),
    createElementVNode("span", _hoisted_1$f, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 2);
}
var DropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
const dropdown = {
  Dropdown,
  DropdownMenu,
  DropdownItem
};
for (const elem in dropdown) {
  if (dropdown.hasOwnProperty(elem)) {
    const element = dropdown[elem];
    element.install = (Vue) => {
      Vue.component(element.name, element);
    };
  }
}
const _sfc_main$h = defineComponent({
  name: "it-input",
  inheritAttrs: false,
  props: {
    status: {
      type: String,
      validator: (value) => [Colors.SUCCESS, Colors.WARNING, Colors.DANGER].includes(value)
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    labelTop: String,
    prefix: String,
    suffix: String,
    message: String,
    mask: Boolean,
    suffixIcon: String,
    prefixIcon: String,
    disabled: Boolean,
    readonly: Boolean,
    modelValue: [String, Number]
  },
  setup(props, { emit }) {
    const focus = ref(false);
    function input(e) {
      emit("update:modelValue", e.target.value);
    }
    return { input, focus };
  }
});
const _hoisted_1$e = { class: "it-input-mask" };
const _hoisted_2$c = {
  key: 0,
  class: "it-input-label"
};
const _hoisted_3$8 = {
  key: 0,
  class: "it-input-prefix"
};
const _hoisted_4$5 = {
  key: 0,
  class: "it-input-icon-wrapper"
};
const _hoisted_5$2 = ["type", "disabled", "readonly", "value", "placeholder"];
const _hoisted_6$2 = {
  key: 1,
  class: "it-input-icon-wrapper"
};
const _hoisted_7$1 = {
  key: 1,
  class: "it-input-suffix"
};
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_icon = resolveComponent("it-icon");
  return openBlock(), createElementBlock("div", null, [
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", _hoisted_1$e, null, 512), [
          [vShow, _ctx.focus && _ctx.mask]
        ])
      ]),
      _: 1
    }),
    _ctx.labelTop ? (openBlock(), createElementBlock("span", _hoisted_2$c, toDisplayString(_ctx.labelTop), 1)) : createCommentVNode("", true),
    createElementVNode("div", {
      class: "it-input-prefix-wrapper",
      style: normalizeStyle({ "z-index": _ctx.mask ? "100" : null })
    }, [
      _ctx.prefix ? (openBlock(), createElementBlock("div", _hoisted_3$8, toDisplayString(_ctx.prefix), 1)) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass(["it-input-wrapper", [
          _ctx.status && `it-input-wrapper--${_ctx.status}`,
          _ctx.disabled && `it-input-wrapper--disabled`
        ]])
      }, [
        _ctx.prefixIcon ? (openBlock(), createElementBlock("span", _hoisted_4$5, [
          createVNode(_component_it_icon, {
            class: "it-input-icon",
            name: _ctx.prefixIcon
          }, null, 8, ["name"])
        ])) : createCommentVNode("", true),
        createElementVNode("input", mergeProps(_ctx.$attrs, {
          type: _ctx.type,
          class: "it-input",
          disabled: _ctx.disabled,
          readonly: _ctx.readonly,
          value: _ctx.modelValue,
          placeholder: _ctx.placeholder,
          onInput: _cache[0] || (_cache[0] = (...args) => _ctx.input && _ctx.input(...args)),
          onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.focus = true),
          onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.focus = false)
        }), null, 16, _hoisted_5$2),
        _ctx.suffixIcon ? (openBlock(), createElementBlock("span", _hoisted_6$2, [
          createVNode(_component_it_icon, {
            class: "it-input-icon",
            name: _ctx.suffixIcon
          }, null, 8, ["name"])
        ])) : createCommentVNode("", true)
      ], 2),
      _ctx.suffix ? (openBlock(), createElementBlock("div", _hoisted_7$1, toDisplayString(_ctx.suffix), 1)) : createCommentVNode("", true)
    ], 4),
    createVNode(Transition, { name: "fade-bottom" }, {
      default: withCtx(() => [
        _ctx.message ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(["it-input-message", [
            _ctx.status && `it-input-message--${_ctx.status}`,
            _ctx.disabled && `it-input-message--disabled`
          ]])
        }, toDisplayString(_ctx.message), 3)) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ]);
}
var Input = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
Input.install = (Vue) => {
  Vue.component(Input.name, Input);
};
const _sfc_main$g = defineComponent({
  name: "it-loading-bar",
  data() {
    return {
      progress: 0,
      height: 2,
      start: false
    };
  },
  watch: {
    progress(newValue) {
      if (newValue === 100) {
        setTimeout(() => {
          this.progress = 0;
          this.height = 2;
        }, 600);
      }
    }
  }
});
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["it-loadingbar", {
      "it-loadingbar--start": _ctx.start
    }]),
    style: normalizeStyle({
      width: _ctx.progress + "%",
      height: _ctx.height + "px"
    })
  }, null, 6);
}
var LoadingVue = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
class Loading {
  constructor() {
    this.loadingInstance = createApp(LoadingVue);
    const el = this.loadingInstance.mount(document.createElement("div"));
    document.body.appendChild(el.$el);
    this.loadEl = el;
  }
  start() {
    this.loadEl.$data.start = true;
    this.loadEl.$data.progress = 90;
  }
  update(value) {
    this.loadEl.$data.start = false;
    this.loadEl.$data.progress = value;
  }
  finish() {
    this.loadEl.$data.start = false;
    this.loadEl.$data.progress = 100;
    this.loadEl.$data.height = 0;
  }
}
const instance = new Loading();
const typeIcon$1 = {
  [Colors.PRIMARY]: "info_outline",
  [Colors.SUCCESS]: "done",
  [Colors.WARNING]: "error_outline",
  [Colors.DANGER]: "clear"
};
const _sfc_main$f = defineComponent({
  name: "it-message",
  components: {
    "it-icon": Icon
  },
  data() {
    return {
      id: null,
      show: false,
      text: "",
      icon: "",
      duration: 4e3,
      onClose: () => {
      },
      top: 6,
      type: Colors.PRIMARY,
      timer: null
    };
  },
  computed: {
    computedIcon() {
      return typeIcon$1[this.type];
    }
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    destroy() {
      this.$el.parentNode.removeChild(this.$el);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.show = false;
          if (this.onClose) {
            this.onClose();
          }
        }, this.duration);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    }
  }
});
const _hoisted_1$d = { class: "it-message-text" };
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_icon = resolveComponent("it-icon");
  return openBlock(), createBlock(Transition, {
    name: "fade-bottom",
    onAfterLeave: _ctx.destroy
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        style: normalizeStyle({ top: `${_ctx.top}px` }),
        class: normalizeClass(["it-message", [`it-message--${_ctx.type}`]]),
        onMouseleave: _cache[0] || (_cache[0] = (...args) => _ctx.startTimer && _ctx.startTimer(...args)),
        onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args))
      }, [
        createVNode(_component_it_icon, {
          class: "it-message-icon",
          name: _ctx.icon || _ctx.computedIcon
        }, null, 8, ["name"]),
        createElementVNode("span", _hoisted_1$d, toDisplayString(_ctx.text), 1)
      ], 38), [
        [vShow, _ctx.show]
      ])
    ]),
    _: 1
  }, 8, ["onAfterLeave"]);
}
var MessageVue = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
const messageTypes = [
  Colors.PRIMARY,
  Colors.SUCCESS,
  Colors.DANGER,
  Colors.WARNING
];
const messages = [];
let idStart$1 = 0;
const Message = (options = {}) => {
  const onClose = options.onClose;
  const id = idStart$1++;
  options.onClose = () => {
    Message.close(id, onClose);
  };
  const tempDiv = document.createElement("div");
  const instance2 = createApp(MessageVue).mount(tempDiv);
  const newData = Object.assign(options, { id });
  for (const [key, value] of Object.entries(newData)) {
    instance2.$data[key] = value;
  }
  document.body.appendChild(instance2.$el);
  instance2.$data.show = true;
  let topDist = 0;
  messages.forEach((el) => {
    topDist += el.$el.offsetHeight + 6;
  });
  instance2.$data.top = topDist + 6;
  messages.push(instance2);
  return instance2;
};
Message.close = (id, onClose) => {
  const index2 = messages.findIndex((el) => el.$data.id === id);
  const height = messages[index2].$el.offsetHeight;
  messages.splice(index2, 1);
  if (onClose) {
    onClose();
  }
  messages.forEach((el) => {
    if (el.$data.id > id) {
      el.top -= height + 6;
    }
  });
};
messageTypes.forEach((type) => {
  Message[type] = (options) => Message({ type, ...options });
});
const _sfc_main$e = defineComponent({
  name: "it-modal",
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    width: { type: String, default: "500px" },
    closableMask: { type: Boolean, default: true },
    closeOnEsc: { type: Boolean, default: true }
  },
  setup(props, { emit, slots }) {
    const modalRef = ref();
    const itHasHeader = useCheckSlot(slots, "header") !== null;
    const itHasBody = useCheckSlot(slots, "body") !== null;
    const itHasActions = useCheckSlot(slots, "actions") !== null;
    const itHasImage = useCheckSlot(slots, "image") !== null;
    const modalBody = ref();
    const Equal = getCurrentInstance();
    const { hasFocus, activate, deactivate } = useFocusTrap(modalRef);
    function close() {
      emit("update:modelValue", false);
    }
    function maskClick() {
      if (props.closableMask) {
        close();
      }
    }
    function pressEsc(e) {
      e.code === "Escape" && close();
    }
    watch(
      () => props.modelValue,
      async (active) => {
        await nextTick();
        const modalsList = Equal.appContext.config.globalProperties.$Equal.modals;
        if (modalRef.value) {
          if (active) {
            modalsList.push(modalBody.value);
            modalsList.slice(0, modalsList.indexOf(modalBody.value)).forEach((modalEl) => {
              var _a;
              if (modalEl.style.transform !== "") {
                const scaleAndTranslate = (_a = modalEl.style.transform.match(/[-+]?[0-9]*\.?[0-9]+/g)) == null ? void 0 : _a.map((ittt) => parseFloat(ittt));
                modalEl.style.transform = `scale(${scaleAndTranslate[0] - 0.05}) translateY(${scaleAndTranslate[1] - 5}%)`;
              } else {
                modalEl.style.transform = `scale(0.9) translateY(5%)`;
              }
            });
            disableBodyScroll(modalRef.value, { reserveScrollBarGap: true });
            if (props.closeOnEsc) {
              document.addEventListener("keydown", pressEsc);
            }
            activate();
          } else {
            modalsList.splice(modalsList.indexOf(modalBody.value), 1);
            modalsList.forEach((modalEl, i) => {
              var _a;
              if (i === modalsList.length - 1) {
                modalEl.style.transform = "";
                return;
              }
              const scaleAndTranslate = (_a = modalEl.style.transform.match(/[-+]?[0-9]*\.?[0-9]+/g)) == null ? void 0 : _a.map((val) => parseFloat(val));
              modalEl.style.transform = `scale(${scaleAndTranslate[0] + 0.05}) translateY(${scaleAndTranslate[1] + 5}%)`;
            });
            modalBody.value.style.transform = "";
            deactivate();
            setTimeout(enableBodyScroll.bind(this, modalRef.value), 500);
            document.removeEventListener("keydown", pressEsc);
          }
        }
      }
    );
    const onlyImageSlot = computed(() => {
      return itHasImage && !itHasHeader && !itHasBody && !itHasActions;
    });
    return {
      modalRef,
      modalBody,
      maskClick,
      hasFocus,
      itHasHeader,
      itHasBody,
      itHasActions,
      close,
      onlyImageSlot
    };
  }
});
const _hoisted_1$c = { class: "it-modal-wrap" };
const _hoisted_2$b = {
  key: 0,
  class: "it-modal-header"
};
const _hoisted_3$7 = {
  key: 1,
  class: "it-modal-content"
};
const _hoisted_4$4 = {
  key: 2,
  class: "it-modal-footer"
};
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", mergeProps(_ctx.$attrs, {
          ref: "modalRef",
          class: "it-modal-mask",
          style: { cursor: _ctx.closableMask ? "pointer" : "default" }
        }), [
          createVNode(Transition, { name: "drop-top" }, {
            default: withCtx(() => [
              withDirectives(createElementVNode("div", _hoisted_1$c, [
                createElementVNode("div", {
                  class: "it-modal-wrap-inner",
                  tabindex: "0",
                  onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.maskClick && _ctx.maskClick(...args), ["self"]))
                }, [
                  createElementVNode("div", {
                    class: normalizeClass(["it-modal-body", { "it-modal-body--has-image": _ctx.onlyImageSlot }]),
                    ref: "modalBody",
                    style: normalizeStyle(!_ctx.onlyImageSlot ? { maxWidth: _ctx.width } : null)
                  }, [
                    renderSlot(_ctx.$slots, "image"),
                    renderSlot(_ctx.$slots, "default"),
                    _ctx.itHasHeader ? (openBlock(), createElementBlock("div", _hoisted_2$b, [
                      renderSlot(_ctx.$slots, "header")
                    ])) : createCommentVNode("", true),
                    _ctx.itHasBody ? (openBlock(), createElementBlock("div", _hoisted_3$7, [
                      renderSlot(_ctx.$slots, "body")
                    ])) : createCommentVNode("", true),
                    _ctx.itHasActions ? (openBlock(), createElementBlock("div", _hoisted_4$4, [
                      renderSlot(_ctx.$slots, "actions")
                    ])) : createCommentVNode("", true)
                  ], 6)
                ])
              ], 512), [
                [vShow, _ctx.modelValue]
              ])
            ]),
            _: 3
          })
        ], 16), [
          [vShow, _ctx.modelValue]
        ])
      ]),
      _: 3
    })
  ]);
}
var Modal = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
Modal.install = (Vue) => {
  Vue.component(Modal.name, Modal);
};
const typeIcon = {
  [Colors.PRIMARY]: "info_outline",
  [Colors.SUCCESS]: "done",
  [Colors.WARNING]: "error_outline",
  [Colors.DANGER]: "clear"
};
const colorTypes = {
  [Colors.PRIMARY]: "#3051ff",
  [Colors.SUCCESS]: "#07d85b",
  [Colors.DANGER]: "#F93155",
  [Colors.WARNING]: "#ffba00"
};
const _sfc_main$d = defineComponent({
  name: "it-notification",
  components: {
    "it-icon": Icon
  },
  data() {
    return {
      id: null,
      show: false,
      text: "",
      title: "",
      icon: "",
      emoji: "",
      image: "",
      duration: 5e3,
      position: {},
      placement: Positions.TR,
      type: Colors.PRIMARY,
      timer: null,
      onClose: () => {
      }
    };
  },
  computed: {
    backgroundImage() {
      return this.image ? `url(${this.image})` : "";
    },
    typeColor() {
      if (this.emoji) {
        return "#fbfbfb";
      }
      return colorTypes[this.type];
    },
    positionPx() {
      const posPx = {};
      for (const key in this.position) {
        if (this.position.hasOwnProperty(key)) {
          posPx[key] = this.position[key] + "px";
        }
      }
      return posPx;
    },
    typeIcon() {
      return typeIcon[this.type];
    }
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    destroy() {
      this.$el.parentNode.removeChild(this.$el);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.show = false;
          if (this.onClose) {
            this.onClose();
          }
        }, this.duration);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    }
  }
});
const _hoisted_1$b = {
  key: 1,
  class: "it-notification-emoji"
};
const _hoisted_2$a = { class: "it-notification-text-block" };
const _hoisted_3$6 = {
  key: 0,
  class: "it-notification-text-block-title"
};
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_icon = resolveComponent("it-icon");
  return openBlock(), createBlock(Transition, {
    name: "fade-bottom",
    onAfterLeave: _ctx.destroy
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        style: normalizeStyle(_ctx.positionPx),
        class: normalizeClass(["it-notification", [`it-notification--${_ctx.type}`]]),
        onMouseleave: _cache[0] || (_cache[0] = (...args) => _ctx.startTimer && _ctx.startTimer(...args)),
        onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args))
      }, [
        createElementVNode("div", {
          class: "it-notification-left",
          style: normalizeStyle({
            "background-image": _ctx.backgroundImage,
            "background-color": _ctx.emoji || _ctx.image ? "#fdfdfd" : _ctx.typeColor,
            "border-right": (_ctx.emoji || _ctx.image) && "1px solid #dfdfdf"
          })
        }, [
          !_ctx.image && !_ctx.emoji ? (openBlock(), createBlock(_component_it_icon, {
            key: 0,
            class: "it-notification-icon",
            name: _ctx.icon || _ctx.typeIcon
          }, null, 8, ["name"])) : createCommentVNode("", true),
          _ctx.emoji && !_ctx.image ? (openBlock(), createElementBlock("span", _hoisted_1$b, toDisplayString(_ctx.emoji), 1)) : createCommentVNode("", true)
        ], 4),
        createElementVNode("div", _hoisted_2$a, [
          _ctx.title ? (openBlock(), createElementBlock("span", _hoisted_3$6, toDisplayString(_ctx.title), 1)) : createCommentVNode("", true),
          createElementVNode("span", null, toDisplayString(_ctx.text), 1)
        ])
      ], 38), [
        [vShow, _ctx.show]
      ])
    ]),
    _: 1
  }, 8, ["onAfterLeave"]);
}
var NotificationVue = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
const notifications = [];
let idStart = 0;
const Notification = (options = {}) => {
  options.placement = options.placement || Positions.TR;
  const onClose = options.onClose;
  const id = idStart++;
  options.onClose = () => {
    Notification.close(id, onClose);
  };
  const tempDiv = document.createElement("div");
  const instance2 = createApp(NotificationVue).mount(tempDiv);
  const newData = Object.assign(options, { id });
  for (const [key, value] of Object.entries(newData)) {
    instance2.$data[key] = value;
  }
  document.body.appendChild(instance2.$el);
  instance2.$data.show = true;
  const offsets = {
    [Positions.TR]: 0,
    [Positions.TL]: 0,
    [Positions.BR]: 0,
    [Positions.BL]: 0
  };
  notifications.filter(
    (el) => el.$data.placement === options.placement
  ).forEach((el) => {
    offsets[options.placement] += el.$el.offsetHeight + 6;
  });
  instance2.$data.position = {
    [options.placement.split("-")[0]]: offsets[options.placement] + 6,
    [options.placement.split("-")[1]]: 10
  };
  notifications.push(instance2);
  return instance2;
};
Notification.close = (id, onClose) => {
  const index2 = notifications.findIndex(
    (el) => el.$data.id === id
  );
  const height = notifications[index2].$el.offsetHeight;
  if (onClose) {
    onClose();
  }
  notifications.filter(
    (el) => el.$data.placement === notifications[index2].$data.placement
  ).forEach((el) => {
    const data = el.$data;
    if (data.id > id) {
      const elPlacement = data.placement.split("-");
      data.position = {
        [elPlacement[0]]: data.position[elPlacement[0]] - (height + 6),
        [elPlacement[1]]: 10
      };
    }
  });
  notifications.splice(index2, 1);
};
[Colors.PRIMARY, Colors.SUCCESS, Colors.DANGER, Colors.WARNING].forEach(
  (type) => {
    Notification[type] = (options) => Notification({ ...options, type });
  }
);
const _sfc_main$c = defineComponent({
  name: "it-number-input",
  inheritAttrs: false,
  props: {
    resizeOnWrite: Boolean,
    disabled: Boolean,
    min: { type: Number, default: -Infinity },
    max: { type: Number, default: Infinity },
    step: { type: Number, default: 1 },
    hideControls: Boolean,
    labelTop: String,
    modelValue: { type: [Number, String], default: 0 }
  },
  setup(props, { emit }) {
    const width = ref(null);
    const buffer = ref(null);
    onMounted(() => {
      width.value = buffer.value.clientWidth;
    });
    watch(
      () => props.modelValue,
      async () => {
        if (props.resizeOnWrite) {
          await nextTick();
          width.value = buffer.value.clientWidth;
        }
      }
    );
    const interval = ref(null);
    function press(type) {
      if (props.disabled || disableController(type))
        return;
      const handler = type === "plus" ? increase : decrease;
      interval.value = setInterval(handler, 140);
      window.addEventListener(
        "mouseup",
        () => {
          clearInterval(interval.value);
        },
        { once: true }
      );
    }
    function disableController(type) {
      if (props.modelValue <= props.min && type === "minus") {
        return true;
      }
      if (props.modelValue >= props.max && type === "plus") {
        return true;
      }
      return false;
    }
    function calculateStep(stepType) {
      if (props.disabled)
        return;
      let value = Number(props.modelValue);
      const step = Number(props.step);
      switch (stepType) {
        case "plus":
          value += step;
          break;
        case "minus":
          value -= step;
          break;
      }
      if (value > props.max) {
        value = props.max;
      }
      if (value < props.min) {
        value = props.min;
      }
      emit("update:modelValue", Number(value.toFixed(10)));
    }
    function increase() {
      if (props.disabled || props.modelValue >= props.max)
        return;
      calculateStep("plus");
    }
    function decrease() {
      if (props.disabled || props.modelValue <= props.min)
        return;
      calculateStep("minus");
    }
    function onInput(e, watchVal) {
      const newVal = watchVal != null ? watchVal : Number(e.target.value);
      if (newVal > props.max) {
        emit("update:modelValue", props.max);
        return;
      } else if (newVal < props.min) {
        emit("update:modelValue", props.min);
        return;
      }
      emit("update:modelValue", newVal);
    }
    return {
      onInput,
      increase,
      decrease,
      disableController,
      press,
      width,
      buffer
    };
  }
});
const _hoisted_1$a = { class: "it-input-label" };
const _hoisted_2$9 = { class: "it-number-field" };
const _hoisted_3$5 = ["value", "disabled", "max", "min"];
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_button = resolveComponent("it-button");
  return openBlock(), createElementBlock("div", null, [
    createElementVNode("span", _hoisted_1$a, toDisplayString(_ctx.labelTop), 1),
    createElementVNode("div", _hoisted_2$9, [
      !_ctx.hideControls ? (openBlock(), createBlock(_component_it_button, {
        key: 0,
        disabled: this.disabled || _ctx.disableController("minus"),
        type: "primary",
        icon: "remove",
        onClick: _ctx.decrease,
        onMousedown: _cache[0] || (_cache[0] = ($event) => _ctx.press("minus"))
      }, null, 8, ["disabled", "onClick"])) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass(["it-number-input", [
          _ctx.disabled && "it-number-input--disabled",
          _ctx.hideControls && "it-number-input-original--nocontrols"
        ]])
      }, [
        createElementVNode("input", mergeProps({
          ref: "input",
          type: "number",
          value: _ctx.modelValue,
          class: "it-number-input-original",
          disabled: _ctx.disabled,
          max: _ctx.max,
          min: _ctx.min,
          style: { width: _ctx.width + "px" }
        }, _ctx.$attrs, {
          onInput: _cache[1] || (_cache[1] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
          onKeydown: [
            _cache[2] || (_cache[2] = withKeys(withModifiers((...args) => _ctx.increase && _ctx.increase(...args), ["stop", "prevent"]), ["up"])),
            _cache[3] || (_cache[3] = withKeys(withModifiers((...args) => _ctx.decrease && _ctx.decrease(...args), ["stop", "prevent"]), ["down"]))
          ]
        }), null, 16, _hoisted_3$5),
        createElementVNode("div", {
          ref: "buffer",
          class: "it-number-input-buffer"
        }, toDisplayString(_ctx.modelValue), 513)
      ], 2),
      !_ctx.hideControls ? (openBlock(), createBlock(_component_it_button, {
        key: 1,
        disabled: this.disabled || _ctx.disableController("plus"),
        type: "primary",
        icon: "add",
        onClick: _ctx.increase,
        onMousedown: _cache[4] || (_cache[4] = ($event) => _ctx.press("plus"))
      }, null, 8, ["disabled", "onClick"])) : createCommentVNode("", true)
    ])
  ]);
}
var NumberInput = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
NumberInput.install = (Vue) => {
  Vue.component(NumberInput.name, NumberInput);
};
const _sfc_main$b = defineComponent({
  name: "it-popover",
  directives: {
    clickoutside: clickOutside
  },
  props: {
    disabled: Boolean,
    borderless: Boolean,
    placement: {
      type: String,
      default: Positions.T,
      validator: (value) => [Positions.B, Positions.L, Positions.R, Positions.T].includes(value)
    },
    autoposition: { type: Boolean, default: true }
  },
  setup(props) {
    const {
      show,
      placement,
      disabled,
      clickable,
      transition,
      popover,
      trigger,
      position,
      hidePopover,
      showPopover,
      setPopoverPosition
    } = usePopover(props);
    return {
      show,
      placement,
      disabled,
      clickable,
      transition,
      popover,
      trigger,
      position,
      hidePopover,
      showPopover,
      setPopoverPosition
    };
  }
});
const _hoisted_1$9 = { class: "it-tooltip" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_clickoutside = resolveDirective("clickoutside");
  return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$9, [
    createElementVNode("span", {
      ref: "trigger",
      class: "it-tooltip-trigger",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.showPopover && _ctx.showPopover(...args))
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 512),
    createVNode(Transition, { name: _ctx.transition }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          ref: "popover",
          class: normalizeClass(["it-tooltip-popper", [_ctx.placement && `it-tooltip--${_ctx.placement}`]])
        }, [
          createElementVNode("div", {
            class: normalizeClass(["it-tooltip-content", {
              "it-tooltip-content--borderless": _ctx.borderless
            }])
          }, [
            renderSlot(_ctx.$slots, "content")
          ], 2)
        ], 2), [
          [vShow, _ctx.show && !_ctx.disabled]
        ])
      ]),
      _: 3
    }, 8, ["name"])
  ])), [
    [_directive_clickoutside, _ctx.hidePopover]
  ]);
}
var Popover = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
Popover.install = (Vue) => {
  Vue.component(Popover.name, Popover);
};
const _sfc_main$a = defineComponent({
  name: "it-progressbar",
  props: {
    infinite: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0 && val <= 100
    },
    height: { type: Number, default: 7, validator: (val) => val > 0 },
    tooltip: {
      default: Positions.T,
      validator: (val) => [Positions.T, Positions.B].includes(val)
    },
    showTooltip: {
      type: Boolean,
      default: true
    }
  }
});
const _hoisted_1$8 = { class: "it-progress-wrapper" };
const _hoisted_2$8 = ["innerHTML"];
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    createElementVNode("div", {
      class: normalizeClass(["it-progress-bar", [_ctx.infinite && "it-progress-bar--infinite"]]),
      style: normalizeStyle({ height: `${_ctx.height}px` })
    }, [
      createElementVNode("div", {
        class: "it-progress-line",
        style: normalizeStyle(!_ctx.infinite && { width: `${_ctx.progress}%` })
      }, [
        _ctx.showTooltip && !_ctx.infinite ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(["it-progress-tooltip", [`it-progress-tooltip--${_ctx.tooltip}`]]),
          innerHTML: `${_ctx.progress}%`
        }, null, 10, _hoisted_2$8)) : createCommentVNode("", true)
      ], 4)
    ], 6)
  ]);
}
var Progressbar = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
Progressbar.install = (Vue) => {
  Vue.component(Progressbar.name, Progressbar);
};
const _sfc_main$9 = defineComponent({
  name: "it-radio",
  inheritAttrs: false,
  props: {
    type: {
      default: Colors.PRIMARY,
      type: String,
      validator: (value) => [
        Colors.PRIMARY,
        Colors.SUCCESS,
        Colors.DANGER,
        Colors.WARNING,
        Colors.BLACK
      ].includes(value)
    },
    label: { type: String },
    subLabel: { type: String },
    pulse: { type: Boolean },
    disabled: { type: Boolean },
    modelValue: {},
    value: {}
  },
  setup(props, { emit }) {
    function check() {
      if (props.disabled) {
        return;
      }
      emit("update:modelValue", props.value);
    }
    const isChecked = computed(() => props.modelValue === props.value);
    return { check, isChecked };
  }
});
const _hoisted_1$7 = ["disabled", "checked", "value"];
const _hoisted_2$7 = /* @__PURE__ */ createElementVNode("span", { class: "it-radio-circle" }, null, -1);
const _hoisted_3$4 = [
  _hoisted_2$7
];
const _hoisted_4$3 = { class: "it-radio-label-group" };
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["it-radio-wrapper", [
      _ctx.isChecked && `it-radio-wrapper--${_ctx.type}--checked`,
      `it-radio-wrapper--${_ctx.type}`,
      _ctx.disabled && "it-radio-wrapper--disabled"
    ]])
  }, [
    createElementVNode("input", mergeProps({
      class: "it-radio-input",
      disabled: _ctx.disabled,
      type: "radio",
      checked: _ctx.isChecked,
      value: _ctx.modelValue
    }, _ctx.$attrs, {
      onChange: _cache[0] || (_cache[0] = (...args) => _ctx.check && _ctx.check(...args))
    }), null, 16, _hoisted_1$7),
    createElementVNode("span", {
      class: normalizeClass(["it-radio-border", _ctx.pulse && !_ctx.disabled && "pulse"])
    }, _hoisted_3$4, 2),
    createElementVNode("span", _hoisted_4$3, [
      _ctx.label && !_ctx.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["it-radio-label", [_ctx.disabled && "it-radio-label--disabled"]])
      }, toDisplayString(_ctx.label), 3)) : createCommentVNode("", true),
      _ctx.subLabel && !_ctx.$slots.sublabel ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass(["it-radio-label it-radio-label--sub", [_ctx.disabled && "it-radio-label--disabled"]])
      }, toDisplayString(_ctx.subLabel), 3)) : createCommentVNode("", true),
      _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: normalizeClass(["it-radio-label", [_ctx.disabled && "it-radio-label--disabled"]])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2)) : createCommentVNode("", true),
      _ctx.$slots.sublabel ? (openBlock(), createElementBlock("span", {
        key: 3,
        class: normalizeClass(["it-radio-label it-radio-label--sub", [_ctx.disabled && "it-radio-label--disabled"]])
      }, [
        renderSlot(_ctx.$slots, "sublabel")
      ], 2)) : createCommentVNode("", true)
    ])
  ], 2);
}
var Radio = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
Radio.install = (Vue) => {
  Vue.component(Radio.name, Radio);
};
const getArrayIndexByDuration = ({
  duration,
  array,
  curIndex
}) => {
  const resultMap = {
    [EDirections.UP]: curIndex <= 0 ? array.length - 1 : curIndex - 1,
    [EDirections.DOWN]: curIndex === array.length - 1 ? 0 : curIndex + 1
  };
  return resultMap[duration];
};
const ALLOWED_POSITION = [
  Positions.T,
  Positions.B,
  Positions.L,
  Positions.R,
  Positions.TL,
  Positions.TR,
  Positions.BL,
  Positions.BR
];
const CLASS_SELECTED_OPTION = "it-select-option--focused";
const useSelect = (props, emit) => {
  const indexFocusedOption = ref(-1);
  const optionsRefs = ref([]);
  const selectListRef = ref(void 0);
  let selectedOptionIndex = -1;
  const show = ref(false);
  onBeforeUpdate(() => optionsRefs.value = []);
  const scrollToSelectedOption = () => {
    const selectedOption = optionsRefs.value[selectedOptionIndex];
    if (selectListRef.value !== void 0)
      selectListRef.value.scrollTop = selectedOption == null ? void 0 : selectedOption.offsetTop;
  };
  const getOptionName = (option) => typeof option === "object" ? option.name : option;
  const getOptionValue = (option) => typeof option === "object" ? option[props.trackBy] : option;
  const setOptionRef = (el, i) => {
    if (el) {
      optionsRefs.value[i] = el;
    }
  };
  const setSelectListRef = (dropdown2) => {
    if (dropdown2) {
      selectListRef.value = dropdown2;
    }
  };
  const setOpen = (state = false) => show.value = state;
  const toggleDropdown = async () => {
    if (props.disabled) {
      setOpen(false);
      return;
    } else if (show.value) {
      setOpen(false);
    } else {
      unfocusOption();
      setOpen(true);
      await nextTick();
      if (props.modelValue)
        scrollToSelectedOption();
    }
  };
  const selectOption = (optionIndex) => {
    const option = props.options[optionIndex];
    selectedOptionIndex = optionIndex;
    emit("update:modelValue", option);
  };
  const unfocusOption = () => {
    if (indexFocusedOption.value === -1)
      return;
    indexFocusedOption.value = -1;
  };
  const handleKey = async (duration) => {
    if (!show.value || !props.options.length)
      return;
    indexFocusedOption.value = getArrayIndexByDuration({
      duration,
      array: props.options,
      curIndex: indexFocusedOption.value
    });
    await nextTick();
    const selectedEl = optionsRefs.value.find(
      (r) => r.className.includes(CLASS_SELECTED_OPTION)
    );
    selectedEl == null ? void 0 : selectedEl.scrollIntoView({ block: "nearest", inline: "start" });
  };
  const handleEnterKey = () => {
    if (!show.value || indexFocusedOption.value === -1) {
      toggleDropdown();
      return;
    }
    selectOption(indexFocusedOption.value);
    setOpen(false);
  };
  const wrappedValue = computed(() => {
    const result = { name: "", [props.trackBy]: "" };
    if (props.modelValue === null) {
      return result;
    }
    if (typeof props.modelValue === "object") {
      return props.modelValue;
    }
    result.name = props.modelValue;
    result[props.trackBy] = props.modelValue;
    return result;
  });
  return {
    wrappedValue,
    getOptionValue,
    getOptionName,
    setOptionRef,
    indexFocusedOption,
    optionsRefs,
    show,
    handleEnterKey,
    setOpen,
    toggleDropdown,
    selectOption,
    setSelectListRef,
    handleKey
  };
};
const _sfc_main$8 = defineComponent({
  name: "it-select",
  directives: {
    clickoutside: clickOutside
  },
  props: {
    placement: {
      type: String,
      default: Positions.B,
      validator: (value) => ALLOWED_POSITION.includes(value)
    },
    disabled: { type: Boolean, default: false },
    divided: { type: Boolean, default: false },
    trackBy: { type: String, default: "value" },
    labelTop: { type: String, default: null },
    placeholder: { type: String, default: "Select option" },
    options: { type: Array, default: () => [] },
    modelValue: { type: [String, Number, Object], default: null }
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const labelTopSlotExist = useCheckSlot(slots, "label-top") !== null;
    const {
      wrappedValue,
      getOptionName,
      getOptionValue,
      setOptionRef,
      indexFocusedOption,
      optionsRefs,
      show,
      handleEnterKey,
      setOpen,
      setSelectListRef,
      toggleDropdown,
      selectOption,
      handleKey
    } = useSelect(props, emit);
    const selectionClasses = computed(() => ({
      "it-select-selection--disabled": props.disabled,
      "it-select-selection--active": show.value
    }));
    const dropdownClasses = computed(() => ({
      [props.placement ? `it-select-dropdown--${props.placement}` : `it-select-dropdown--${Positions.B}`]: true,
      "it-select-dropdown--divided": props.divided
    }));
    return {
      labelTopSlotExist,
      CLASS_SELECTED_OPTION,
      wrappedValue,
      getOptionName,
      getOptionValue,
      setOptionRef,
      indexFocusedOption,
      optionsRefs,
      show,
      handleEnterKey,
      setOpen,
      setSelectListRef,
      toggleDropdown,
      selectOption,
      handleKey,
      selectionClasses,
      dropdownClasses,
      props,
      EDirections
    };
  }
});
const _hoisted_1$6 = { class: "it-select" };
const _hoisted_2$6 = {
  key: 0,
  class: "it-input-label"
};
const _hoisted_3$3 = { class: "it-select-inner" };
const _hoisted_4$2 = ["tabindex"];
const _hoisted_5$1 = {
  key: 0,
  class: "it-select-selected"
};
const _hoisted_6$1 = {
  key: 1,
  class: "it-select-placeholder"
};
const _hoisted_7 = ["onClick"];
const _hoisted_8 = {
  key: 0,
  class: "it-select-option-check"
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_clickoutside = resolveDirective("clickoutside");
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    _ctx.labelTop || _ctx.labelTopSlotExist ? (openBlock(), createElementBlock("span", _hoisted_2$6, [
      renderSlot(_ctx.$slots, "label-top", { props: _ctx.props }, () => [
        createTextVNode(toDisplayString(_ctx.labelTop), 1)
      ])
    ])) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_3$3, [
      withDirectives((openBlock(), createElementBlock("div", {
        ref: "trigger",
        tabindex: _ctx.disabled ? -1 : 0,
        class: normalizeClass(["it-select-selection", _ctx.selectionClasses]),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleDropdown && _ctx.toggleDropdown(...args)),
        onKeydown: [
          _cache[1] || (_cache[1] = withKeys(() => _ctx.setOpen(false), ["tab"])),
          _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => _ctx.handleKey(_ctx.EDirections.DOWN), ["stop", "prevent"]), ["down"])),
          _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.handleKey(_ctx.EDirections.UP), ["stop", "prevent"]), ["up"])),
          _cache[4] || (_cache[4] = withKeys(withModifiers(() => _ctx.setOpen(false), ["stop", "prevent"]), ["esc"])),
          _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => _ctx.handleEnterKey && _ctx.handleEnterKey(...args), ["stop", "prevent"]), ["enter"]))
        ]
      }, [
        _ctx.wrappedValue[_ctx.trackBy] ? (openBlock(), createElementBlock("span", _hoisted_5$1, [
          renderSlot(_ctx.$slots, "selected-option", { props: _ctx.props }, () => [
            createTextVNode(toDisplayString(_ctx.wrappedValue.name), 1)
          ])
        ])) : (openBlock(), createElementBlock("span", _hoisted_6$1, [
          renderSlot(_ctx.$slots, "placeholder", { props: _ctx.props }, () => [
            createTextVNode(toDisplayString(_ctx.placeholder), 1)
          ])
        ])),
        renderSlot(_ctx.$slots, "icon", { props: _ctx.props }, () => [
          createElementVNode("i", {
            class: normalizeClass(["it-select-arrow material-icons", _ctx.show && "it-select-arrow--active"])
          }, " unfold_more ", 2)
        ])
      ], 42, _hoisted_4$2)), [
        [_directive_clickoutside, () => _ctx.setOpen(false)]
      ]),
      createVNode(Transition, { name: "drop-bottom" }, {
        default: withCtx(() => [
          _ctx.show ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["it-select-dropdown", _ctx.dropdownClasses])
          }, [
            createElementVNode("ul", {
              class: "it-select-list",
              ref: (dropdown2) => _ctx.setSelectListRef(dropdown2)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option, optionIndex) => {
                return openBlock(), createElementBlock("li", {
                  key: optionIndex,
                  ref_for: true,
                  ref: (el) => _ctx.setOptionRef(el, optionIndex),
                  class: normalizeClass([
                    "it-select-option",
                    _ctx.indexFocusedOption === optionIndex && _ctx.CLASS_SELECTED_OPTION
                  ]),
                  onClick: ($event) => _ctx.selectOption(optionIndex)
                }, [
                  renderSlot(_ctx.$slots, "option", {
                    props: _ctx.props,
                    option
                  }, () => [
                    createTextVNode(toDisplayString(_ctx.getOptionName(option)) + " ", 1),
                    createVNode(Transition, { name: "fade-right" }, {
                      default: withCtx(() => [
                        _ctx.wrappedValue[_ctx.trackBy] === _ctx.getOptionValue(option) ? (openBlock(), createElementBlock("span", _hoisted_8)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ], 10, _hoisted_7);
              }), 128))
            ], 512)
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 3
      })
    ])
  ]);
}
var Select = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
Select.install = (Vue) => {
  Vue.component(Select.name, Select);
};
const DEFAULT_STEP_POINT_HEIGHT = 8;
const DEFAULT_PROPS = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
  VALUE: 0
};
const getTotalPosition = ({
  value,
  min,
  max
}) => (value - min) * 100 / (max - min);
const getCoordsByEvent = ({
  changedTouches,
  clientX,
  clientY
}) => {
  const firstTouch = changedTouches ? changedTouches[0] : null;
  return firstTouch ? { clientX: firstTouch.clientX, clientY: firstTouch.clientY } : { clientX, clientY };
};
const useStepsPoints = (startValue, { max, min, step, valuePosition }) => computed(() => {
  const resultStepsPoints = [...startValue];
  const countPoints = (max - min) / step;
  let accumulatedLeft = 0;
  const distanceBetweenPoints = 100 / (max / step);
  for (let i = 0; i < countPoints; i++) {
    accumulatedLeft += distanceBetweenPoints;
    const active = accumulatedLeft <= valuePosition.value;
    resultStepsPoints.push({ left: accumulatedLeft, active });
  }
  return resultStepsPoints;
});
const useValuePosition = (props, emit) => {
  const startValue = getTotalPosition({
    value: props.modelValue,
    min: props.min,
    max: props.max
  });
  const valuePosition = ref(startValue);
  const setValuePosition = (newValue) => {
    newValue = clamp(newValue, DEFAULT_PROPS.MIN, DEFAULT_PROPS.MAX);
    const lengthPerStep = 100 / ((props.max - props.min) / props.step);
    const steps = Math.round(newValue / lengthPerStep);
    let totalValue = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min;
    totalValue = parseFloat(totalValue.toFixed(0));
    totalValue = totalValue > props.max ? props.max : totalValue;
    emit("update:modelValue", totalValue);
    valuePosition.value = getTotalPosition({
      value: totalValue,
      min: props.min,
      max: props.max
    });
  };
  return [valuePosition, setValuePosition];
};
const _sfc_main$7 = defineComponent({
  name: "it-tooltip",
  props: {
    content: [String, Number],
    disabled: Boolean,
    hoverable: Boolean,
    placement: {
      type: String,
      default: Positions.T,
      validator: (value) => Object.values(Positions).includes(value)
    },
    permanent: Boolean,
    autoposition: { type: Boolean, default: true }
  },
  setup(props) {
    const {
      show,
      placement,
      disabled,
      clickable,
      transition,
      visionTimer,
      popover,
      trigger,
      permanent,
      position,
      handleMouseEnter,
      handleMouseLeave,
      hidePopover,
      showPopover,
      setPopoverPosition
    } = usePopover(props);
    onMounted(() => {
      if (permanent.value) {
        showPopover();
      }
    });
    return {
      show,
      placement,
      disabled,
      clickable,
      transition,
      visionTimer,
      popover,
      trigger,
      position,
      handleMouseEnter,
      handleMouseLeave,
      hidePopover,
      showPopover,
      setPopoverPosition
    };
  }
});
const _hoisted_1$5 = { class: "it-tooltip" };
const _hoisted_2$5 = { class: "it-tooltip-content" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    createElementVNode("span", {
      ref: "trigger",
      class: "it-tooltip-trigger",
      onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.handleMouseEnter && _ctx.handleMouseEnter(...args)),
      onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.handleMouseLeave && _ctx.handleMouseLeave(...args))
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 544),
    createVNode(Transition, { name: _ctx.transition }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          ref: "popover",
          class: normalizeClass(["it-tooltip-popper", [_ctx.placement && `it-tooltip--${_ctx.placement.split("-")[0]}`]]),
          onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.handleMouseEnter && _ctx.handleMouseEnter(...args)),
          onMouseleave: _cache[3] || (_cache[3] = (...args) => _ctx.handleMouseLeave && _ctx.handleMouseLeave(...args))
        }, [
          createElementVNode("div", _hoisted_2$5, [
            renderSlot(_ctx.$slots, "content", {}, () => [
              createElementVNode("div", null, toDisplayString(_ctx.content), 1)
            ])
          ])
        ], 34), [
          [vShow, _ctx.show]
        ])
      ]),
      _: 3
    }, 8, ["name"])
  ]);
}
var Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const _sfc_main$6 = defineComponent({
  name: "it-slider",
  components: {
    "it-tooltip": Tooltip
  },
  props: {
    labelTop: String,
    disabled: Boolean,
    stepPoints: Boolean,
    numbers: Boolean,
    min: { type: Number, default: DEFAULT_PROPS.MIN },
    max: { type: Number, default: DEFAULT_PROPS.MAX },
    step: { type: Number, default: DEFAULT_PROPS.STEP },
    modelValue: { type: Number, default: DEFAULT_PROPS.VALUE }
  },
  setup(props, { emit }) {
    const sliderLineRef = ref(null);
    const tooltipRef = ref(null);
    const startX = ref(0);
    const currentX = ref(0);
    const startPos = ref(0);
    const newPos = ref(0);
    const dragging = ref(false);
    const [valuePosition, setValuePosition] = useValuePosition(props, emit);
    const stepsPoints = useStepsPoints(
      [{ left: 0, active: true }],
      {
        min: props.min,
        max: props.max,
        step: props.step,
        valuePosition
      }
    );
    watch(
      () => props.modelValue,
      (newVal) => {
        if (props.disabled)
          return;
        const newValue = getTotalPosition({
          value: newVal,
          min: props.min,
          max: props.max
        });
        setValuePosition(newValue);
      }
    );
    function keyEvent(key) {
      if (props.disabled)
        return;
      tooltipRef.value.showPopover();
      const moreValue = [Positions.T, Positions.R].includes(key);
      const lessValue = [Positions.B, Positions.L].includes(key);
      const newValue = moreValue ? props.modelValue + props.step : lessValue ? props.modelValue - props.step : props.modelValue;
      if (moreValue) {
        emit("update:modelValue", newValue);
      } else if (lessValue) {
        emit("update:modelValue", newValue);
      }
    }
    function onMouseOrTouchDown(e) {
      if (props.disabled)
        return;
      onDragStart(e);
      window.addEventListener("mousemove", onDragging);
      window.addEventListener("mouseup", onDragEnd);
      window.addEventListener("touchmove", onDragging);
      window.addEventListener("touchend", onDragEnd);
    }
    function onDragStart(e) {
      dragging.value = true;
      startX.value = getCoordsByEvent(e).clientX;
      startPos.value = valuePosition.value;
      tooltipRef.value.showPopover();
    }
    function onDragging(e) {
      if (dragging.value) {
        let diff = 0;
        currentX.value = getCoordsByEvent(e).clientX;
        diff = (currentX.value - startX.value) * 100 / sliderLineRef.value.offsetWidth;
        newPos.value = startPos.value + diff;
        setValuePosition(newPos.value);
      }
    }
    function onDragEnd() {
      if (dragging.value) {
        dragging.value = false;
        setValuePosition(newPos.value);
        window.removeEventListener("mousemove", onDragging);
        window.removeEventListener("mouseup", onDragEnd);
        window.removeEventListener("touchmove", onDragging);
        window.removeEventListener("touchend", onDragEnd);
      }
    }
    function onSliderClick(e) {
      if (props.disabled || dragging.value)
        return;
      const sliderOffsetLeft = sliderLineRef.value.getBoundingClientRect().left;
      const clientX = getCoordsByEvent(e).clientX;
      const newValue = (clientX - sliderOffsetLeft) / sliderLineRef.value.offsetWidth * 100;
      setValuePosition(newValue);
    }
    function handleMouseEnter(e) {
      tooltipRef.value.handleMouseEnter(e);
    }
    function handleMouseLeave() {
      if (dragging.value)
        return;
      tooltipRef.value.handleMouseLeave();
    }
    function getStepPointStyles({
      step,
      index: index2
    }) {
      const styles = {
        left: `${step.left}%`,
        height: null
      };
      if (index2 === 0 || index2 === stepsPoints.value.length - 1) {
        styles.height = `${DEFAULT_STEP_POINT_HEIGHT}px`;
      }
      return styles;
    }
    return {
      valuePosition,
      stepsPoints,
      sliderLineRef,
      tooltipRef,
      keyEvent,
      onMouseOrTouchDown,
      onSliderClick,
      handleMouseEnter,
      handleMouseLeave,
      getStepPointStyles,
      Positions
    };
  }
});
const _hoisted_1$4 = ["tabindex"];
const _hoisted_2$4 = {
  key: 0,
  class: "it-slider-label"
};
const _hoisted_3$2 = /* @__PURE__ */ createElementVNode("div", { class: "it-slider-controller" }, null, -1);
const _hoisted_4$1 = {
  key: 1,
  class: "it-slider-wrap-points"
};
const _hoisted_5 = {
  key: 2,
  class: "it-slider-numbers"
};
const _hoisted_6 = { style: { "left": "100%" } };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_tooltip = resolveComponent("it-tooltip");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["it-slider", { "it-slider--disabled": _ctx.disabled }]),
    tabindex: _ctx.disabled ? -1 : 0,
    onKeydown: [
      _cache[6] || (_cache[6] = withKeys(withModifiers(($event) => _ctx.keyEvent(_ctx.Positions.L), ["stop", "prevent"]), ["down", "left"])),
      _cache[7] || (_cache[7] = withKeys(withModifiers(($event) => _ctx.keyEvent(_ctx.Positions.R), ["stop", "prevent"]), ["up", "right"]))
    ]
  }, [
    _ctx.labelTop ? (openBlock(), createElementBlock("span", _hoisted_2$4, toDisplayString(_ctx.labelTop), 1)) : createCommentVNode("", true),
    createElementVNode("div", {
      ref: "sliderLineRef",
      class: "it-slider-line",
      onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.handleMouseEnter && _ctx.handleMouseEnter(...args)),
      onMouseleave: _cache[3] || (_cache[3] = (...args) => _ctx.handleMouseLeave && _ctx.handleMouseLeave(...args)),
      onClick: _cache[4] || (_cache[4] = (...args) => _ctx.onSliderClick && _ctx.onSliderClick(...args)),
      onTouchend: _cache[5] || (_cache[5] = (...args) => _ctx.onSliderClick && _ctx.onSliderClick(...args))
    }, [
      createElementVNode("div", {
        class: "it-slider-bar",
        style: normalizeStyle({ width: `${_ctx.valuePosition}%` })
      }, null, 4),
      createElementVNode("div", {
        class: "it-slider-controller-wrapper",
        style: normalizeStyle({ left: `${_ctx.valuePosition}%` }),
        onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.onMouseOrTouchDown && _ctx.onMouseOrTouchDown(...args)),
        onTouchstart: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.onMouseOrTouchDown && _ctx.onMouseOrTouchDown(...args), ["prevent"]))
      }, [
        createVNode(_component_it_tooltip, {
          ref: "tooltipRef",
          content: _ctx.modelValue
        }, {
          default: withCtx(() => [
            _hoisted_3$2
          ]),
          _: 1
        }, 8, ["content"])
      ], 36)
    ], 544),
    _ctx.stepPoints && _ctx.stepsPoints.length ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.stepsPoints, (step, index2) => {
        return openBlock(), createElementBlock("div", {
          key: step.left,
          class: normalizeClass(["it-slider-point", { "it-slider-point--active": step.active }]),
          style: normalizeStyle(_ctx.getStepPointStyles({ step, index: index2 }))
        }, null, 6);
      }), 128))
    ])) : createCommentVNode("", true),
    _ctx.numbers ? (openBlock(), createElementBlock("div", _hoisted_5, [
      createElementVNode("div", null, toDisplayString(_ctx.min), 1),
      createElementVNode("div", _hoisted_6, toDisplayString(_ctx.max), 1)
    ])) : createCommentVNode("", true)
  ], 42, _hoisted_1$4);
}
var Slider = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
Slider.install = (Vue) => {
  Vue.component(Slider.name, Slider);
};
const _sfc_main$5 = defineComponent({
  name: "it-switch",
  inheritAttrs: false,
  props: {
    type: {
      default: Colors.PRIMARY,
      type: String,
      validator: (value) => [
        Colors.PRIMARY,
        Colors.SUCCESS,
        Colors.DANGER,
        Colors.WARNING,
        Colors.BLACK
      ].includes(value)
    },
    label: { type: String },
    subLabel: { type: String },
    pulse: { type: Boolean },
    disabled: { type: Boolean },
    modelValue: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    function toggle() {
      if (props.disabled) {
        return;
      }
      const newValue = !props.modelValue;
      emit("update:modelValue", newValue);
    }
    return { toggle };
  }
});
const _hoisted_1$3 = { class: "it-switch-wrapper" };
const _hoisted_2$3 = ["disabled"];
const _hoisted_3$1 = /* @__PURE__ */ createElementVNode("span", { class: "it-switch-circle" }, null, -1);
const _hoisted_4 = { class: "it-switch-label-group" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", _hoisted_1$3, [
    createElementVNode("span", {
      class: normalizeClass(["it-switch", [
        `it-switch--${_ctx.type}`,
        _ctx.modelValue && `it-switch--${_ctx.type}--checked`,
        _ctx.disabled && `it-switch--${_ctx.type}--disabled`,
        _ctx.pulse && !_ctx.disabled && "pulse"
      ]])
    }, [
      createElementVNode("input", mergeProps({
        type: "checkbox",
        class: "it-switch-input",
        disabled: _ctx.disabled,
        style: { "z-index": "10" }
      }, _ctx.$attrs, {
        onChange: _cache[0] || (_cache[0] = (...args) => _ctx.toggle && _ctx.toggle(...args))
      }), null, 16, _hoisted_2$3),
      _hoisted_3$1
    ], 2),
    createElementVNode("span", _hoisted_4, [
      _ctx.label && !_ctx.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["it-switch-label", [_ctx.disabled && "it-switch-label--disabled"]])
      }, toDisplayString(_ctx.label), 3)) : createCommentVNode("", true),
      _ctx.subLabel && !_ctx.$slots.sublabel ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass(["it-switch-label it-switch-label--sub", [_ctx.disabled && "it-switch-label--disabled"]])
      }, toDisplayString(_ctx.subLabel), 3)) : createCommentVNode("", true),
      _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: normalizeClass(["it-switch-label", [_ctx.disabled && "it-switch-label--disabled"]])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2)) : createCommentVNode("", true),
      _ctx.$slots.sublabel ? (openBlock(), createElementBlock("span", {
        key: 3,
        class: normalizeClass(["it-switch-label it-switch-label--sub", [_ctx.disabled && "it-switch-label--disabled"]])
      }, [
        renderSlot(_ctx.$slots, "sublabel")
      ], 2)) : createCommentVNode("", true)
    ])
  ]);
}
var Switch = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
Switch.install = (Vue) => {
  Vue.component(Switch.name, Switch);
};
const _sfc_main$4 = defineComponent({
  name: "it-tabs",
  props: {
    initialTab: Number,
    vertical: Boolean,
    box: Boolean
  },
  setup(props, { slots }) {
    const selectedIndex = ref(0);
    const tabs = ref([]);
    const tabsRefs = ref([]);
    provide("tabs", tabs);
    onMounted(async () => {
      await nextTick();
      selectTab(props.initialTab || selectedIndex.value);
    });
    function selectTab(i) {
      if (tabs.value[i].disabled)
        return;
      selectedIndex.value = i;
      tabs.value.forEach((tab, index2) => {
        tab.isActive = index2 === i;
      });
    }
    function focusNextTab(i) {
      if (!tabs.value[i]) {
        focusNextTab(0);
        return;
      }
      if (tabs.value[i].disabled) {
        focusNextTab(i + 1);
        return;
      }
      tabsRefs.value[i].focus();
    }
    function focusPrevTab(i) {
      if (!tabs.value[i]) {
        focusPrevTab(tabsRefs.value.length - 1);
        return;
      }
      if (tabs.value[i].disabled) {
        focusPrevTab(i - 1);
        return;
      }
      tabsRefs.value[i].focus();
    }
    return {
      selectedIndex,
      tabs,
      selectTab,
      tabsRefs,
      focusNextTab,
      focusPrevTab
    };
  }
});
const _hoisted_1$2 = ["aria-orientation"];
const _hoisted_2$2 = ["aria-selected", "tabindex", "disabled", "data-content", "onKeydown", "onClick"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    role: "tablist",
    class: normalizeClass(["it-tabs", { "it-tabs--vertical": _ctx.vertical, "it-tabs--boxed": _ctx.box }])
  }, [
    createElementVNode("div", {
      class: normalizeClass(["it-tabs-header", { "it-tabs-header--vertical": _ctx.vertical }]),
      "aria-orientation": _ctx.vertical ? "vertical" : "horizontal"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, (tab, i) => {
        return openBlock(), createElementBlock("button", {
          ref_for: true,
          ref: (el) => {
            if (el)
              _ctx.tabsRefs[i] = el;
          },
          key: i,
          role: "tab",
          "aria-selected": _ctx.selectedIndex === i,
          tabindex: _ctx.selectedIndex === i ? null : -1,
          class: normalizeClass(["it-tabs-tab", {
            "it-tabs-tab--active": _ctx.selectedIndex === i,
            "it-tabs-tab--disabled": tab.disabled
          }]),
          disabled: tab.disabled,
          "data-content": tab.title,
          onKeydown: [
            withKeys(withModifiers(($event) => _ctx.vertical ? null : _ctx.focusNextTab(i + 1), ["prevent"]), ["right"]),
            withKeys(withModifiers(($event) => _ctx.vertical ? null : _ctx.focusPrevTab(i - 1), ["prevent"]), ["left"]),
            withKeys(withModifiers(($event) => _ctx.vertical ? _ctx.focusNextTab(i + 1) : null, ["prevent"]), ["down"]),
            withKeys(withModifiers(($event) => _ctx.vertical ? _ctx.focusPrevTab(i - 1) : null, ["prevent"]), ["up"])
          ],
          onClick: ($event) => _ctx.selectTab(i)
        }, toDisplayString(tab.title), 43, _hoisted_2$2);
      }), 128))
    ], 10, _hoisted_1$2),
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
Tabs.install = (Vue) => {
  Vue.component(Tabs.name, Tabs);
};
const _sfc_main$3 = defineComponent({
  name: "it-tab",
  props: {
    title: {
      type: String,
      default: ""
    },
    disabled: Boolean
  },
  setup(props) {
    const tabs = inject("tabs", []);
    const isActive = ref(false);
    tabs.value.push({ ...toRefs(props), isActive });
    return { isActive };
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", {
    key: _ctx.title,
    class: "it-tabs-body"
  }, [
    renderSlot(_ctx.$slots, "default")
  ])), [
    [vShow, _ctx.isActive]
  ]);
}
var Tab = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
Tab.install = (Vue) => {
  Vue.component(Tab.name, Tab);
};
const _sfc_main$2 = defineComponent({
  name: "it-tag",
  props: {
    type: {
      default: Colors.NEUTRAL,
      validator: (value) => [
        Colors.PRIMARY,
        Colors.SUCCESS,
        Colors.DANGER,
        Colors.WARNING,
        Colors.BLACK,
        Colors.NEUTRAL
      ].includes(value)
    },
    closable: { type: Boolean },
    filled: { type: Boolean }
  },
  emits: ["close"],
  setup(props, { emit }) {
    function close() {
      if (!props.closable) {
        return;
      }
      emit("close");
    }
    return { close };
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_icon = resolveComponent("it-icon");
  return openBlock(), createElementBlock("span", {
    class: normalizeClass([
      "it-tag",
      _ctx.type && `it-tag--${_ctx.type}`,
      _ctx.filled && `it-tag--${_ctx.type}--filled`
    ])
  }, [
    renderSlot(_ctx.$slots, "default"),
    _ctx.closable ? (openBlock(), createBlock(_component_it_icon, {
      key: 0,
      name: "clear",
      class: "it-tag-close",
      onClick: _ctx.close
    }, null, 8, ["onClick"])) : createCommentVNode("", true)
  ], 2);
}
var Tag = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
Tag.install = (Vue) => {
  Vue.component(Tag.name, Tag);
};
const _sfc_main$1 = defineComponent({
  name: "it-textarea",
  props: {
    placeholder: String,
    disabled: Boolean,
    resizable: Boolean,
    resizeOnWrite: Boolean,
    labelTop: String,
    rows: { type: Number, default: 4 },
    modelValue: String,
    mask: Boolean
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const textarea = ref(null);
    const focus = ref(false);
    const resize = computed(
      () => props.resizable === true ? "vertical" : "none"
    );
    function onInput(e) {
      const target = e.target;
      emit("update:modelValue", target.value);
      if (props.resizeOnWrite) {
        target.style.height = "auto";
        target.style.height = target.scrollHeight + "px";
      }
    }
    onMounted(async () => {
      if (props.resizeOnWrite) {
        await nextTick();
        textarea.value.style.height = textarea.value.scrollHeight + "px";
      }
    });
    return { textarea, onInput, resize, focus };
  }
});
const _hoisted_1$1 = { class: "it-textarea-mask" };
const _hoisted_2$1 = {
  key: 0,
  class: "it-input-label"
};
const _hoisted_3 = ["value", "disabled", "placeholder", "rows"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", _hoisted_1$1, null, 512), [
          [vShow, _ctx.focus && _ctx.mask]
        ])
      ]),
      _: 1
    }),
    _ctx.labelTop ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(_ctx.labelTop), 1)) : createCommentVNode("", true),
    createElementVNode("textarea", {
      ref: "textarea",
      value: _ctx.modelValue,
      style: normalizeStyle({ resize: _ctx.resize, "z-index": _ctx.mask ? "100" : null }),
      disabled: _ctx.disabled,
      class: "it-textarea",
      placeholder: _ctx.placeholder,
      rows: _ctx.rows,
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
      onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.focus = true),
      onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.focus = false)
    }, null, 44, _hoisted_3)
  ]);
}
var Textarea = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
Textarea.install = (Vue) => {
  Vue.component(Textarea.name, Textarea);
};
const _sfc_main = defineComponent({
  name: "it-toggle",
  components: {
    ItIcon: Icon
  },
  props: {
    options: { type: Array, default: [] },
    round: Boolean,
    icons: Boolean,
    modelValue: [String, Number]
  },
  setup(props, { emit }) {
    const activeIndex = ref(0);
    function selectValue(i) {
      activeIndex.value = i;
      emit("update:modelValue", props.options[i]);
    }
    function selectNext() {
      if (!props.options[activeIndex.value + 1]) {
        selectValue(0);
        return;
      }
      selectValue(activeIndex.value + 1);
    }
    function selectPrev() {
      if (!props.options[activeIndex.value - 1]) {
        selectValue(props.options.length - 1);
        return;
      }
      selectValue(activeIndex.value - 1);
    }
    const width = computed(() => (100 / props.options.length).toFixed(2));
    const opacity = computed(
      () => props.options.includes(props.modelValue) ? 1 : 0
    );
    const sliderPosition = computed(() => {
      const pos = props.options.findIndex((v) => v === props.modelValue);
      return (pos === -1 ? 0 : pos) * 100;
    });
    return {
      selectValue,
      selectNext,
      selectPrev,
      width,
      sliderPosition,
      opacity
    };
  }
});
const _hoisted_1 = ["onClick"];
const _hoisted_2 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_it_icon = resolveComponent("it-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["it-toggle", { "it-toggle--round": _ctx.round }]),
    tabindex: "0",
    onKeyup: [
      _cache[0] || (_cache[0] = withKeys(withModifiers((...args) => _ctx.selectPrev && _ctx.selectPrev(...args), ["prevent"]), ["left"])),
      _cache[1] || (_cache[1] = withKeys(withModifiers((...args) => _ctx.selectNext && _ctx.selectNext(...args), ["prevent"]), ["right"]))
    ]
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option, i) => {
      return openBlock(), createElementBlock("label", {
        key: i,
        class: normalizeClass(["it-toggle-value", {
          "it-toggle-value--selected": option === _ctx.modelValue
        }]),
        onClick: ($event) => _ctx.selectValue(i)
      }, [
        !_ctx.icons ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(option), 1)) : (openBlock(), createBlock(_component_it_icon, {
          key: 1,
          name: String(option)
        }, null, 8, ["name"]))
      ], 10, _hoisted_1);
    }), 128)),
    createElementVNode("div", {
      class: "it-toggle-slider",
      style: normalizeStyle({
        width: _ctx.width + "%",
        transform: `translateX(${_ctx.sliderPosition}%)`,
        opacity: _ctx.opacity
      })
    }, null, 4)
  ], 34);
}
var Toggle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
Toggle.install = (Vue) => {
  Vue.component(Toggle.name, Toggle);
};
Tooltip.install = (Vue) => {
  Vue.component(Tooltip.name, Tooltip);
};
var index$1 = "";
const components = {
  Alert,
  Avatar,
  AvatarGroup: _sfc_main$A,
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  Collapse,
  CollapseItem,
  ColorPicker: Colorpicker,
  Divider,
  Drawer,
  ...dropdown,
  Icon,
  Input,
  Loading: Loading$1,
  Modal,
  NumberInput,
  Popover,
  Progressbar,
  Radio,
  Select,
  Slider,
  Switch,
  Tabs,
  Tab,
  Tag,
  Textarea,
  Toggle,
  Tooltip
};
function install(Vue) {
  for (const component in components) {
    Vue.component(components[component].name, components[component]);
  }
  Vue.config.globalProperties.$Message = Message;
  Vue.config.globalProperties.$Notification = Notification;
  Vue.config.globalProperties.$Loading = instance;
  Vue.config.globalProperties.$Equal = {
    drawers: [],
    modals: []
  };
}
var index = { install };
export { Alert, Avatar, _sfc_main$A as AvatarGroup, Badge, Button, ButtonGroup, Checkbox, Collapse, CollapseItem, Colorpicker as ColorPicker, Divider, Drawer, dropdown as Dropdown, Icon, Input, Loading$1 as Loading, instance as Loadingbar, Message, Modal, Notification, NumberInput, Popover, Progressbar, Radio, Select, Slider, Switch, Tab, Tabs, Tag, Textarea, Toggle, Tooltip, index as default };
