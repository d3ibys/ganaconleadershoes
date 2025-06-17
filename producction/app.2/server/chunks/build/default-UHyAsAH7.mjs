import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { N as NavbarBottom } from './NavbarBottom-Dz_Xz7xT.mjs';
import { unref, mergeProps, useSSRContext } from 'vue';
import { _ as _export_sfc, e as defineStore } from './server.mjs';
import './nuxt-link-BODWDF0r.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import './useAuth-BO25TtCz.mjs';
import '@heroicons/vue/24/outline';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading: false
  }),
  actions: {
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    }
  }
});
const _sfc_main$1 = {
  __name: "GlobalLoader",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = useLoadingStore();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(loading).isLoading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "loader-overlay" }, _attrs))} data-v-6dfb2bca><div class="spinner" data-v-6dfb2bca></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GlobalLoader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const GlobalLoader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6dfb2bca"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(GlobalLoader, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(NavbarBottom, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-UHyAsAH7.mjs.map
