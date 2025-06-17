import { withAsyncContext, computed, unref, reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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

const _sfc_main$1 = {
  __name: "BuyCard",
  __ssrInlineRender: true,
  props: {
    raffle: {
      type: Object,
      required: true
    },
    ticketOptions: { type: Array, default: () => [2, 5, 10, 20, 30, 50] },
    popularAmount: { type: Number, default: 5 }
  },
  setup(__props) {
    const props = __props;
    const userData = reactive({
      fullName: "",
      email: "",
      phone: "",
      whatsapp: "",
      cedula: ""
    });
    const {
      quantity,
      selectedOption,
      isProcessing,
      total,
      tooltip,
      remaining
    } = useRaffleTickets(props.raffle.price, 2, props.raffle.totalNumbers - props.raffle.soldNumbers);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-d9fbe7cf><div class="card" data-v-d9fbe7cf><img${ssrRenderAttr("src", __props.raffle.imageMain)}${ssrRenderAttr("alt", __props.raffle.title)} data-v-d9fbe7cf><div class="card-header" data-v-d9fbe7cf><span class="badge" data-v-d9fbe7cf>${ssrInterpolate((_a = __props.raffle.createdAt) == null ? void 0 : _a.split("T")[0])}</span><span data-v-d9fbe7cf>Boleto ${ssrInterpolate(__props.raffle.price ? `Bs. ${__props.raffle.price}` : "-")}</span></div><div class="title" data-v-d9fbe7cf>${ssrInterpolate(__props.raffle.title)}</div><div class="progress-bar"${ssrRenderAttr("title", unref(tooltip))} data-v-d9fbe7cf><div class="progress-bar-inner" style="${ssrRenderStyle({ width: __props.raffle.percentSold + "%" })}" data-v-d9fbe7cf></div></div></div><div class="ticket-section" data-v-d9fbe7cf><h3 data-v-d9fbe7cf>Compra aqu\xED tus boletos</h3><div class="options" data-v-d9fbe7cf><!--[-->`);
      ssrRenderList(__props.ticketOptions, (amount, index) => {
        _push(`<div class="${ssrRenderClass([{ active: unref(selectedOption) === amount }, "option"])}" data-v-d9fbe7cf> +${ssrInterpolate(amount)}`);
        if (amount === __props.popularAmount) {
          _push(`<br data-v-d9fbe7cf>`);
        } else {
          _push(`<!---->`);
        }
        if (amount === __props.popularAmount) {
          _push(`<small data-v-d9fbe7cf>M\xE1s popular</small>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="counter" data-v-d9fbe7cf><button data-v-d9fbe7cf>-</button><span class="count" style="${ssrRenderStyle({ "width": "250px !important" })}" data-v-d9fbe7cf>${ssrInterpolate(unref(quantity))}</span><button data-v-d9fbe7cf>+</button></div><div class="total" data-v-d9fbe7cf>\u{1F4B0} Total: Bs. ${ssrInterpolate(unref(total))}</div>`);
      if (unref(quantity) < 2) {
        _push(`<p class="warning" data-v-d9fbe7cf>\u26A0\uFE0F M\xEDnimo 2 boletos requeridos</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(quantity) > unref(remaining)) {
        _push(`<p class="warning" data-v-d9fbe7cf>\u26A0\uFE0F Solo quedan ${ssrInterpolate(unref(remaining))} disponibles</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form data-v-d9fbe7cf><input class="form_input"${ssrRenderAttr("value", userData.fullName)} placeholder="Nombre completo" required data-v-d9fbe7cf><input class="form_input"${ssrRenderAttr("value", userData.email)} placeholder="Correo electr\xF3nico" type="email" required data-v-d9fbe7cf><input class="form_input"${ssrRenderAttr("value", userData.phone)} placeholder="Tel\xE9fono" type="number" required data-v-d9fbe7cf><input class="form_input"${ssrRenderAttr("value", userData.cedula)} placeholder="C\xE9dula" type="number" required data-v-d9fbe7cf><button class="btn"${ssrIncludeBooleanAttr(unref(quantity) < 2 || unref(quantity) > unref(remaining) || unref(isProcessing)) ? " disabled" : ""} data-v-d9fbe7cf>${ssrInterpolate(unref(isProcessing) ? "Procesando..." : "Comprar boletos")}</button></form><button class="btn btn-outline"${ssrIncludeBooleanAttr(unref(isProcessing)) ? " disabled" : ""} data-v-d9fbe7cf>Limpiar</button><button class="btn btn-outline"${ssrIncludeBooleanAttr(unref(isProcessing)) ? " disabled" : ""} data-v-d9fbe7cf>Ver detalle</button></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BuyCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BuyCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d9fbe7cf"]]);
const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    const { raffles, loading, error, fetchRaffles } = useRaffles();
    [__temp, __restore] = withAsyncContext(() => fetchRaffles()), await __temp, __restore();
    const raffle = computed(() => raffles.value.find((r) => r.slug === slug));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-381c586e>`);
      if (!raffle.value && !unref(loading) && !unref(error)) {
        _push(`<div class="not-found" data-v-381c586e>Rifa no encontrada.</div>`);
      } else if (unref(loading)) {
        _push(`<div class="loading" data-v-381c586e>Cargando rifa...</div>`);
      } else if (unref(error)) {
        _push(`<div class="error" data-v-381c586e>${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<div data-v-381c586e>`);
        _push(ssrRenderComponent(BuyCard, { raffle: raffle.value }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/buy-tickets/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-381c586e"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-OJpsiVO6.mjs.map
