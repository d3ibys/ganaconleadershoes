import { _ as __nuxt_component_0 } from './nuxt-link-BODWDF0r.mjs';
import { mergeProps, withCtx, createVNode, computed, watch, unref, resolveDynamicComponent, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-3Fh-jQka.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useAuth } from './useAuth-BO25TtCz.mjs';
import { HomeIcon, TicketIcon, UserCircleIcon, ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const _sfc_main$1 = {
  __name: "HeaderTop",
  __ssrInlineRender: true,
  props: {
    open: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header-top" }, _attrs))} data-v-8c79639f><button class="hamburger-btn" aria-label="Men\xFA"${ssrRenderAttr("aria-expanded", __props.open)} data-v-8c79639f><span class="${ssrRenderClass([{ open: __props.open }, "hamburger-icon"])}" data-v-8c79639f><span data-v-8c79639f></span><span data-v-8c79639f></span><span data-v-8c79639f></span></span></button><div class="header-logo" data-v-8c79639f>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="Logo" height="34" data-v-8c79639f${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "Logo",
                height: "34"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button class="help-btn" aria-label="Ayuda" data-v-8c79639f><svg width="28" height="28" viewBox="0 0 24 24" data-v-8c79639f><circle cx="12" cy="12" r="12" fill="#f3cc23" data-v-8c79639f></circle><text x="12" y="17" text-anchor="middle" font-size="16" fill="#181818" font-family="Arial" font-weight="bold" data-v-8c79639f>?</text></svg></button></header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderTop.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const HeaderTop = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8c79639f"]]);
const _sfc_main = {
  __name: "MenuDrawer",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { isLoggedIn } = useAuth();
    const menu = computed(
      () => isLoggedIn.value ? [
        { label: "Inicio", icon: HomeIcon, path: "/" },
        { label: "Rifas", icon: TicketIcon, path: "/raffles" },
        { label: "Panel", icon: UserCircleIcon, path: "/dashboard" },
        { label: "Salir", icon: ArrowRightOnRectangleIcon, path: "/logout" }
      ] : [
        { label: "Inicio", icon: HomeIcon, path: "/" },
        { label: "Rifas", icon: TicketIcon, path: "/raffles" },
        { label: "Iniciar sesi\xF3n", icon: UserCircleIcon, path: "/login" },
        { label: "Registrarse", icon: ArrowRightOnRectangleIcon, path: "/register" }
      ]
    );
    function emitClose() {
      emit("close");
    }
    watch(
      () => props.open,
      (val) => {
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      if (__props.open) {
        _push(`<div class="drawer-overlay" aria-label="Cerrar men\xFA lateral" tabindex="-1" data-v-8ed9da12></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.open) {
        _push(`<aside class="drawer" role="navigation" aria-label="Men\xFA principal" data-v-8ed9da12><button class="drawer-close" aria-label="Cerrar men\xFA" data-v-8ed9da12>`);
        _push(ssrRenderComponent(unref(XMarkIcon), { class: "icon-close" }, null, _parent));
        _push(`</button><nav class="drawer-nav" data-v-8ed9da12><!--[-->`);
        ssrRenderList(menu.value, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.label,
            to: item.path,
            class: "drawer-link",
            onClick: emitClose
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "drawer-link-icon" }, null), _parent2, _scopeId);
                _push2(`<span data-v-8ed9da12${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "drawer-link-icon" })),
                  createVNode("span", null, toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></nav></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MenuDrawer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MenuDrawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8ed9da12"]]);

export { HeaderTop as H, MenuDrawer as M };
//# sourceMappingURL=MenuDrawer-DJxXWJ0R.mjs.map
