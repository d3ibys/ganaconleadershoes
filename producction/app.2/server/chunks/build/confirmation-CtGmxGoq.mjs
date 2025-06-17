import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
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
  __name: "confirmation",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    const user = ref({ fullName: "", email: "", phone: "" });
    const quantity = ref(0);
    const total = ref(0);
    const paymentMethod = ref("");
    const paymentMethodLabel = computed(() => {
      switch (paymentMethod.value) {
        case "pagoMovil":
          return "Pago M\xF3vil";
        case "zelle":
          return "Zelle";
        case "binance":
          return "Binance";
        default:
          return "No especificado";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "confirmation-container" }, _attrs))} data-v-e45a8a50><h1 class="title" data-v-e45a8a50>\u2705 \xA1Compra completada!</h1><div class="card" data-v-e45a8a50><h2 data-v-e45a8a50>\xA1Gracias por tu compra, ${ssrInterpolate(user.value.fullName)}!</h2><p data-v-e45a8a50><strong data-v-e45a8a50>Cantidad de boletos:</strong> ${ssrInterpolate(quantity.value)}</p><p data-v-e45a8a50><strong data-v-e45a8a50>Total pagado:</strong> Bs. ${ssrInterpolate(total.value)}</p><p data-v-e45a8a50><strong data-v-e45a8a50>M\xE9todo de pago:</strong> ${ssrInterpolate(paymentMethodLabel.value)}</p><div class="notice" data-v-e45a8a50><p data-v-e45a8a50> Tu pago est\xE1 siendo verificado. <br data-v-e45a8a50> Recibir\xE1s tus n\xFAmeros en un lapso de <strong data-v-e45a8a50>12 a 24 horas</strong> por <strong data-v-e45a8a50>correo electr\xF3nico</strong> y <strong data-v-e45a8a50>WhatsApp</strong>. </p></div><button data-v-e45a8a50>Volver al inicio</button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/confirmation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const confirmation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e45a8a50"]]);

export { confirmation as default };
//# sourceMappingURL=confirmation-CtGmxGoq.mjs.map
