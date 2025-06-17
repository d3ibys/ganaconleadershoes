import { _ as __nuxt_component_0 } from './TicketCard-CC1HN-wi.mjs';
import { ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { N as NavbarBottom } from './NavbarBottom-Dz_Xz7xT.mjs';
import { u as useAuth } from './useAuth-BO25TtCz.mjs';
import { _ as _export_sfc } from './server.mjs';
import './virtual_public-3Fh-jQka.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './nuxt-link-BODWDF0r.mjs';
import 'vue-router';
import '@heroicons/vue/24/outline';

const _sfc_main = {
  __name: "my-tickets",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TicketCard = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-3b7cfecd><div data-v-3b7cfecd>`);
      _push(ssrRenderComponent(_component_TicketCard, {
        nombre: "user.fullName",
        cedula: "user.nationalId",
        titulo: "Ya est\xE1s participando en nuestro gran sorteo.",
        tituloResaltado: "4RUNNER 2022",
        detalle: "Participa para ganar una 4Runner 2022 + una moto EK 150 0KM + $1,000 en efectivo",
        uuid: "FTR567H76Y-KIJU789-0OLKJUII",
        numero: "2345"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(NavbarBottom, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-tickets.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const myTickets = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b7cfecd"]]);

export { myTickets as default };
//# sourceMappingURL=my-tickets-Datk7pHi.mjs.map
