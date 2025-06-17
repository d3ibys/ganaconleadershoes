import { ref, onServerPrefetch, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { H as HeaderTop, M as MenuDrawer } from './MenuDrawer-DJxXWJ0R.mjs';
import { _ as _export_sfc } from './server.mjs';
import { useRouter } from 'vue-router';
import { N as NavbarBottom } from './NavbarBottom-Dz_Xz7xT.mjs';
import { u as useAuth } from './useAuth-BO25TtCz.mjs';
import { u as useRaffles } from './useRaffles-BeUz1zg4.mjs';
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
import './virtual_public-3Fh-jQka.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@heroicons/vue/24/outline';

const _sfc_main$2 = {
  __name: "CarouselBanners",
  __ssrInlineRender: true,
  setup(__props) {
    const carousel = ref(null);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "carousel",
        ref: carousel,
        class: "carousel",
        tabindex: "0"
      }, _attrs))} data-v-89c7ef6d><div class="banner" data-v-89c7ef6d>\xA1Gana una moto 0KM!</div><div class="banner" data-v-89c7ef6d>Participa desde $1</div><div class="banner" data-v-89c7ef6d>Invita y gana m\xE1s</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CarouselBanners.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CarouselBanners = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-89c7ef6d"]]);
const _sfc_main$1 = {
  __name: "FeaturedCard",
  __ssrInlineRender: true,
  props: {
    img: String,
    icon: String,
    text: String,
    progress: Number,
    progressLabel: String,
    cost: [Number, String],
    slug: String
  },
  setup(__props) {
    useRouter();
    function formatCurrency(val) {
      if (val === void 0 || val === null) return "";
      return new Intl.NumberFormat("es-VE", {
        style: "currency",
        currency: "VES",
        maximumFractionDigits: 2
      }).format(val);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "featured-card" }, _attrs))} data-v-58583831><button class="buy-btn full-card-btn" data-v-58583831>`);
      if (__props.img) {
        _push(`<div class="icon" align="center" data-v-58583831><img${ssrRenderAttr("src", __props.img)} alt="Rifa" style="${ssrRenderStyle({ "width": "70%" })}" data-v-58583831></div>`);
      } else if (__props.icon) {
        _push(`<div class="icon" data-v-58583831><i class="${ssrRenderClass(__props.icon)}" data-v-58583831></i></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text" data-v-58583831>${ssrInterpolate(__props.text)}</div><div class="progress-bar" data-v-58583831><div class="progress" style="${ssrRenderStyle({ width: __props.progress + "%" })}" data-v-58583831></div></div><div class="progress-label" data-v-58583831>${ssrInterpolate(__props.progressLabel)}</div><div class="footer" data-v-58583831>`);
      if (__props.cost !== void 0 && __props.cost !== null) {
        _push(`<div class="raffle-cost" data-v-58583831>${ssrInterpolate(formatCurrency(__props.cost))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="buy-btn-label" data-v-58583831>Comprar n\xFAmero</span></div></button></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FeaturedCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const FeaturedCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-58583831"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const drawer = ref(false);
    const { isLoggedIn, user } = useAuth();
    const { raffles, loading, error, fetchRaffles } = useRaffles();
    onServerPrefetch(async () => {
      await fetchRaffles();
    });
    function initials(fullName) {
      if (!fullName) return "LS";
      return fullName.split(" ").map((n) => {
        var _a;
        return (_a = n[0]) == null ? void 0 : _a.toUpperCase();
      }).join("").substring(0, 2);
    }
    function firstName(fullName) {
      if (!fullName) return "";
      return fullName.split(" ")[0];
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-1f0535f7>`);
      _push(ssrRenderComponent(HeaderTop, {
        open: drawer.value,
        onToggleDrawer: ($event) => drawer.value = !drawer.value
      }, null, _parent));
      _push(ssrRenderComponent(MenuDrawer, {
        open: drawer.value,
        onClose: ($event) => drawer.value = false
      }, null, _parent));
      _push(`<div class="user-greeting" data-v-1f0535f7>`);
      if (unref(isLoggedIn) && unref(user) && unref(user).fullName) {
        _push(`<!--[--><div class="avatar" data-v-1f0535f7>${ssrInterpolate(initials(unref(user).fullName))}</div><div data-v-1f0535f7> Hola, ${ssrInterpolate(firstName(unref(user).fullName))} \u{1F44B} </div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(CarouselBanners, null, null, _parent));
      _push(`<div class="section-title" data-v-1f0535f7>Rifas destacadas</div>`);
      if (unref(loading)) {
        _push(`<div class="loading" data-v-1f0535f7>Cargando rifas...</div>`);
      } else if (unref(error)) {
        _push(`<div class="error" data-v-1f0535f7>Error al cargar rifas</div>`);
      } else {
        _push(`<div style="${ssrRenderStyle({ "max-width": "600px", "margin": "auto", "padding": "0px 20px 0px 20px" })}" data-v-1f0535f7><!--[-->`);
        ssrRenderList(unref(raffles), (r) => {
          _push(ssrRenderComponent(FeaturedCard, {
            key: r.id,
            slug: r.slug,
            img: r.imageMain,
            cost: r.price,
            text: r.description,
            progress: r.percentSold,
            "progress-label": `${r.percentSold}% vendido`
          }, null, _parent));
        });
        _push(`<!--]-->`);
        if (!unref(raffles).length) {
          _push(`<div class="empty" data-v-1f0535f7>No hay rifas disponibles</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(ssrRenderComponent(NavbarBottom, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1f0535f7"]]);

export { index as default };
//# sourceMappingURL=index-BWk7jg3W.mjs.map
