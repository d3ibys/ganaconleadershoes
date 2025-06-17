import { _ as __nuxt_component_0 } from './nuxt-link-BODWDF0r.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const raffles = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-676bcf72><div class="flex justify-between items-center mb-4" data-v-676bcf72><h2 data-v-676bcf72>Lista de Rifas</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/raffles/create",
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`+ Nueva Rifa`);
          } else {
            return [
              createTextVNode("+ Nueva Rifa")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (raffles.value.length === 0) {
        _push(`<div data-v-676bcf72>No hay rifas a\xFAn.</div>`);
      } else {
        _push(`<ul class="raffle-list" data-v-676bcf72><!--[-->`);
        ssrRenderList(raffles.value, (raffle) => {
          _push(`<li data-v-676bcf72><strong data-v-676bcf72>${ssrInterpolate(raffle.title)}</strong> - ${ssrInterpolate(raffle.status)}</li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/raffles/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-676bcf72"]]);

export { index as default };
//# sourceMappingURL=index-BY0DegYB.mjs.map
