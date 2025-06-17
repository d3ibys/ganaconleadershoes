import { _ as __nuxt_component_0 } from './nuxt-link-BODWDF0r.mjs';
import { computed, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useAuth } from './useAuth-BO25TtCz.mjs';
import { HomeIcon, TicketIcon, ReceiptPercentIcon, UserCircleIcon, UserPlusIcon, ArrowRightStartOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "NavbarBottom",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { isLoggedIn } = useAuth();
    const menu = computed(
      () => isLoggedIn.value ? [
        { label: "Inicio", icon: HomeIcon, path: "/" },
        { label: "Rifas", icon: TicketIcon, path: "/raffles" },
        { label: "Mis Tickets", icon: ReceiptPercentIcon, path: "/my-tickets" },
        { label: "Panel", icon: UserCircleIcon, path: "/dashboard" }
      ] : [
        { label: "Inicio", icon: HomeIcon, path: "/" },
        { label: "Rifas", icon: TicketIcon, path: "/raffles" },
        { label: "Registrarse", icon: UserPlusIcon, path: "/register" },
        { label: "Iniciar sesi\xF3n", icon: ArrowRightStartOnRectangleIcon, path: "/login" }
      ]
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "nav-bottom" }, _attrs))} data-v-101d5a2b><!--[-->`);
      ssrRenderList(unref(menu), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.label,
          to: item.path,
          class: ["nav-item", { active: unref(route).path === item.path }],
          "aria-label": item.label,
          title: item.label
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "nav-icon" }, null), _parent2, _scopeId);
              _push2(`<span class="nav-label" data-v-101d5a2b${_scopeId}>${ssrInterpolate(item.label)}</span>`);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "nav-icon" })),
                createVNode("span", { class: "nav-label" }, toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (unref(isLoggedIn)) {
        _push(`<button class="nav-item nav-logout" aria-label="Cerrar sesi\xF3n" title="Cerrar sesi\xF3n" data-v-101d5a2b>`);
        _push(ssrRenderComponent(unref(ArrowRightOnRectangleIcon), { class: "nav-icon" }, null, _parent));
        _push(`<span class="nav-label" data-v-101d5a2b>Salir</span></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavbarBottom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NavbarBottom = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-101d5a2b"]]);

export { NavbarBottom as N };
//# sourceMappingURL=NavbarBottom-Dz_Xz7xT.mjs.map
