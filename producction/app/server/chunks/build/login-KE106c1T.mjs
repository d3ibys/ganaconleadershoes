import { _ as __nuxt_component_0 } from './nuxt-link-BODWDF0r.mjs';
import { reactive, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-3Fh-jQka.mjs';
import { useRouter } from 'vue-router';
import { u as useAuth } from './useAuth-BO25TtCz.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useAuth();
    const form = reactive({ email: "", password: "" });
    const { loading } = useAuth();
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-page" }, _attrs))} data-v-a533d45b><div class="auth-card" data-v-a533d45b><div class="logo-wrap" data-v-a533d45b><img${ssrRenderAttr("src", _imports_0)} alt="Logo" data-v-a533d45b></div><h2 class="auth-title" data-v-a533d45b>Iniciar sesi\xF3n</h2><form data-v-a533d45b><div class="input-group" data-v-a533d45b><i class="fas fa-envelope" data-v-a533d45b></i><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="Correo electr\xF3nico" required autocomplete="username" data-v-a533d45b></div><div class="input-group" data-v-a533d45b><i class="fas fa-lock" data-v-a533d45b></i><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="Contrase\xF1a" required autocomplete="current-password" data-v-a533d45b></div><button class="auth-btn"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-a533d45b>`);
      if (!unref(loading)) {
        _push(`<span data-v-a533d45b>Entrar</span>`);
      } else {
        _push(`<span data-v-a533d45b><i class="fas fa-spinner fa-spin" data-v-a533d45b></i> Entrando...</span>`);
      }
      _push(`</button>`);
      if (error.value) {
        _push(`<p class="auth-error" data-v-a533d45b>${ssrInterpolate(error.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form><div class="auth-links" data-v-a533d45b>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/register" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\xBFNo tienes cuenta? Reg\xEDstrate`);
          } else {
            return [
              createTextVNode("\xBFNo tienes cuenta? Reg\xEDstrate")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a533d45b"]]);

export { login as default };
//# sourceMappingURL=login-KE106c1T.mjs.map
