import { _ as __nuxt_component_0 } from './nuxt-link-BODWDF0r.mjs';
import { defineComponent, reactive, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useAuth();
    const form = reactive({
      fullName: "",
      nationalId: "",
      phone: "",
      email: "",
      password: ""
    });
    const { loading } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-page" }, _attrs))} data-v-163aec37><div class="auth-card" data-v-163aec37><div class="logo-wrap" data-v-163aec37><img${ssrRenderAttr("src", _imports_0)} alt="Logo" data-v-163aec37></div><h2 class="auth-title" data-v-163aec37>Crear cuenta</h2><form data-v-163aec37><div class="input-group" data-v-163aec37><i class="fas fa-user" data-v-163aec37></i><input${ssrRenderAttr("value", unref(form).fullName)} type="text" placeholder="Nombre completo" required autocomplete="name" data-v-163aec37></div><div class="input-group" data-v-163aec37><i class="fas fa-address-card" data-v-163aec37></i><input${ssrRenderAttr("value", unref(form).nationalId)} type="text" placeholder="C\xE9dula" required autocomplete="off" data-v-163aec37></div><div class="input-group" data-v-163aec37><i class="fas fa-phone" data-v-163aec37></i><input${ssrRenderAttr("value", unref(form).phone)} type="tel" placeholder="Tel\xE9fono" required autocomplete="tel" data-v-163aec37></div><div class="input-group" data-v-163aec37><i class="fas fa-envelope" data-v-163aec37></i><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="Correo electr\xF3nico" required autocomplete="email" data-v-163aec37></div><div class="input-group" data-v-163aec37><i class="fas fa-lock" data-v-163aec37></i><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="Contrase\xF1a" required autocomplete="new-password" data-v-163aec37></div><button class="auth-btn"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-163aec37>`);
      if (!unref(loading)) {
        _push(`<span data-v-163aec37>Registrarse</span>`);
      } else {
        _push(`<span data-v-163aec37><i class="fas fa-spinner fa-spin" data-v-163aec37></i> Registrando...</span>`);
      }
      _push(`</button></form><div class="auth-links" data-v-163aec37>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\xBFYa tienes cuenta? Inicia sesi\xF3n`);
          } else {
            return [
              createTextVNode("\xBFYa tienes cuenta? Inicia sesi\xF3n")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-163aec37"]]);

export { register as default };
//# sourceMappingURL=register-DrJ55FDd.mjs.map
