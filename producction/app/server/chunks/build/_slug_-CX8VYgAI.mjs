import { computed, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { u as useRaffles } from './useRaffles-BeUz1zg4.mjs';
import { u as useRaffleTickets } from './useRaffleTickets-jPaQCXpN.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const paymentMethods = [
      {
        value: "pagoMovil",
        label: "Pago M\xF3vil",
        image: "/images/pago-movil.png"
      },
      {
        value: "zelle",
        label: "Zelle",
        image: "/images/zelle.png"
      },
      {
        value: "binance",
        label: "Binance",
        image: "/images/binance.png"
      }
    ];
    useRouter();
    const route = useRoute();
    const { raffles } = useRaffles();
    useRaffleTickets();
    const slug = route.params.slug;
    const quantity = Number(route.query.quantity || 0);
    const total = Number(route.query.total || 0);
    route.query.orderId;
    const raffle = computed(() => raffles.value.find((r) => r.slug === slug));
    const userData = ref({
      fullName: ""
      // Inicializa con un valor por defecto o nulo
      // otras propiedades que esperes en checkoutUser
    });
    const isFormValid = computed(() => {
      return form.value.paymentMethod && form.value.extraInfo !== null && String(form.value.extraInfo).trim().length > 0;
    });
    const pinValue = ref("");
    const isValid = computed(() => {
      return pinValue.value && pinValue.value.toString().length === 4 && parseInt(pinValue.value) >= 0 && parseInt(pinValue.value) <= 9999;
    });
    computed(() => {
      return pinValue.value && pinValue.value.toString().length === 4 && !isValid.value;
    });
    const form = ref({
      paymentMethod: "",
      extraInfo: ""
    });
    const isSubmitting = ref(false);
    computed(() => {
      return form.value.paymentMethod && String(form.value.extraInfo || "").trim() !== "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-container" }, _attrs))} data-v-4ad21011><h1 class="title" data-v-4ad21011>Finalizar Compra</h1><form class="form" data-v-4ad21011><div class="section" data-v-4ad21011><h2 class="section-title" data-v-4ad21011>Datos del comprador</h2><input${ssrRenderAttr("value", userData.value.fullName)} type="text" disabled data-v-4ad21011><input${ssrRenderAttr("value", userData.value.cedula)} type="text" disabled data-v-4ad21011><input${ssrRenderAttr("value", userData.value.phone)} type="text" disabled data-v-4ad21011><input${ssrRenderAttr("value", userData.value.email)} type="text" disabled data-v-4ad21011></div><div class="section" data-v-4ad21011><h2 class="section-title" data-v-4ad21011>M\xE9todo de pago</h2><div class="payment-methods" data-v-4ad21011><!--[-->`);
      ssrRenderList(paymentMethods, (method) => {
        _push(`<label class="${ssrRenderClass([{ selected: form.value.paymentMethod === method.value }, "payment-option"])}" data-v-4ad21011><input type="radio" name="paymentMethod"${ssrRenderAttr("value", method.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(form.value.paymentMethod, method.value)) ? " checked" : ""} hidden data-v-4ad21011><img${ssrRenderAttr("src", method.image)}${ssrRenderAttr("alt", method.label)} data-v-4ad21011>`);
        if (form.value.paymentMethod === method.value) {
          _push(`<div class="check-icon" data-v-4ad21011>\u2714</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      });
      _push(`<!--]--></div>`);
      if (form.value.paymentMethod) {
        _push(`<div class="payment-info-card" data-v-4ad21011>`);
        if (form.value.paymentMethod === "pagoMovil") {
          _push(`<div data-v-4ad21011><h3 data-v-4ad21011>\u{1F4F2} Pago M\xF3vil</h3><p data-v-4ad21011><b data-v-4ad21011>Banco:</b> Banesco - 0134</p><p data-v-4ad21011><b data-v-4ad21011>Tel\xE9fono:</b> 0424-8362674</p><p data-v-4ad21011><b data-v-4ad21011>C.I:</b> 19.939.353</p><button data-v-4ad21011>\u{1F4CB} Copiar datos</button></div>`);
        } else if (form.value.paymentMethod === "zelle") {
          _push(`<div data-v-4ad21011><h3 data-v-4ad21011>\u{1F3E6} Zelle</h3><p data-v-4ad21011><b data-v-4ad21011>Correo:</b> topCapsphoenix@gmail.com</p><p data-v-4ad21011><b data-v-4ad21011>Titular:</b> Topcapsphoenix LLC</p></div>`);
        } else if (form.value.paymentMethod === "binance") {
          _push(`<div data-v-4ad21011><h3 data-v-4ad21011>\u{1FA99} Binance</h3><p data-v-4ad21011><b data-v-4ad21011>Correo:</b> aquilitoo12@gmail.com</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (form.value.paymentMethod === "pagoMovil") {
          _push(`<input${ssrRenderAttr("value", form.value.extraInfo)} type="number" min="0" max="9999" step="1" placeholder="Ingrese los \xFAltimos 4 d\xEDgitos" required data-v-4ad21011>`);
        } else {
          _push(`<input${ssrRenderAttr("value", form.value.extraInfo)} type="email" placeholder="Correo desde el que pagaste" required data-v-4ad21011>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="summary" data-v-4ad21011><h2 class="section-title" data-v-4ad21011>Resumen</h2><p data-v-4ad21011>Rifa: ${ssrInterpolate((_a = raffle.value) == null ? void 0 : _a.title)}</p><p data-v-4ad21011>Boletos: ${ssrInterpolate(unref(quantity))}</p><p data-v-4ad21011>Precio por boleto: Bs. ${ssrInterpolate((_b = raffle.value) == null ? void 0 : _b.price)}</p><p data-v-4ad21011>Total: Bs. ${ssrInterpolate(unref(total))}</p></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(isSubmitting.value || !isFormValid.value) ? " disabled" : ""} data-v-4ad21011>${ssrInterpolate(isSubmitting.value ? "Enviando..." : "Verificar Pago")}</button>`);
      if (!isFormValid.value) {
        _push(`<p class="warning-text" data-v-4ad21011> Por favor selecciona un m\xE9todo de pago y completa los datos requeridos. </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4ad21011"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-CX8VYgAI.mjs.map
