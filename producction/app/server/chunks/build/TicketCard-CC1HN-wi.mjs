import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-3Fh-jQka.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "TicketCard",
  __ssrInlineRender: true,
  props: {
    nombre: String,
    cedula: String,
    titulo: String,
    tituloResaltado: String,
    detalle: String,
    uuid: String,
    numero: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ticket-container" }, _attrs))} data-v-fa3b94b5><div class="ticket" data-v-fa3b94b5><div class="ticket-header" data-v-fa3b94b5><div class="user-info" data-v-fa3b94b5><h2 data-v-fa3b94b5>${ssrInterpolate(__props.nombre)}</h2><p data-v-fa3b94b5>${ssrInterpolate(__props.cedula)}</p></div><div class="logo-section" data-v-fa3b94b5><div class="logo-circle" data-v-fa3b94b5><img${ssrRenderAttr("src", _imports_0)} alt="Logo" data-v-fa3b94b5></div><p class="brand-text" data-v-fa3b94b5>Juega y gana con Leader Shoes</p></div><div class="highlight-number" data-v-fa3b94b5><div class="number-box" data-v-fa3b94b5>${ssrInterpolate(__props.numero)}</div><p class="number-label" data-v-fa3b94b5>N\xFAmero destacado</p></div></div><div class="raffle-info" data-v-fa3b94b5><h3 data-v-fa3b94b5>${ssrInterpolate(__props.titulo)}</h3><h3 data-v-fa3b94b5><span data-v-fa3b94b5>${ssrInterpolate(__props.tituloResaltado)}</span></h3><p data-v-fa3b94b5>${ssrInterpolate(__props.detalle)}</p></div><div class="number-list" data-v-fa3b94b5><!--[-->`);
      ssrRenderList(5, (n) => {
        _push(`<div class="number-item" data-v-fa3b94b5>${ssrInterpolate(String(n).padStart(4, "0"))}</div>`);
      });
      _push(`<!--]--></div><div class="uuid-section" data-v-fa3b94b5><p data-v-fa3b94b5>UUID: ${ssrInterpolate(__props.uuid)}</p><div class="uuid-bar" data-v-fa3b94b5></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TicketCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa3b94b5"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=TicketCard-CC1HN-wi.mjs.map
