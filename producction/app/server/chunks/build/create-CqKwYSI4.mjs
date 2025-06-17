import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const raffle = ref({
      title: "",
      slug: "",
      description: "",
      details: "",
      totalNumbers: 0,
      price: 0,
      firstPrize: "",
      secondPrize: "",
      thirdPrize: "",
      imageMain: "",
      imageFirstPrize: "",
      imageSecondPrize: "",
      imageThirdPrize: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 bg-gray-900 text-white rounded-lg shadow-md max-w-4xl mx-auto" }, _attrs))} data-v-95ce9831><h1 class="text-2xl font-bold mb-6" data-v-95ce9831>Crear Nueva Rifa</h1><form class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-95ce9831><input${ssrRenderAttr("value", raffle.value.title)} type="text" placeholder="T\xEDtulo de la rifa" required class="input" data-v-95ce9831><input${ssrRenderAttr("value", raffle.value.slug)} type="text" placeholder="Slug (\xFAnico)" required class="input" data-v-95ce9831><input${ssrRenderAttr("value", raffle.value.totalNumbers)} type="number" placeholder="Cantidad total de n\xFAmeros" required class="input" data-v-95ce9831><input${ssrRenderAttr("value", raffle.value.price)} type="number" placeholder="Precio por n\xFAmero" required class="input" data-v-95ce9831><textarea placeholder="Descripci\xF3n" required class="textarea col-span-1 md:col-span-2" data-v-95ce9831>${ssrInterpolate(raffle.value.description)}</textarea><textarea placeholder="Detalles adicionales" class="textarea col-span-1 md:col-span-2" data-v-95ce9831>${ssrInterpolate(raffle.value.details)}</textarea><input${ssrRenderAttr("value", raffle.value.firstPrize)} type="text" placeholder="Primer premio" class="input" data-v-95ce9831><input${ssrRenderAttr("value", raffle.value.secondPrize)} type="text" placeholder="Segundo premio" class="input" data-v-95ce9831><input${ssrRenderAttr("value", raffle.value.thirdPrize)} type="text" placeholder="Tercer premio" class="input" data-v-95ce9831><input${ssrRenderAttr("value", raffle.value.imageMain)} type="text" placeholder="URL de imagen principal" class="input col-span-1 md:col-span-2" data-v-95ce9831><input${ssrRenderAttr("value", raffle.value.imageFirstPrize)} type="text" placeholder="Imagen del primer premio" class="input" data-v-95ce9831><input${ssrRenderAttr("value", raffle.value.imageSecondPrize)} type="text" placeholder="Imagen del segundo premio" class="input" data-v-95ce9831><input${ssrRenderAttr("value", raffle.value.imageThirdPrize)} type="text" placeholder="Imagen del tercer premio" class="input" data-v-95ce9831><button type="submit" class="col-span-1 md:col-span-2 bg-yellow-400 text-black py-2 rounded font-bold hover:bg-yellow-300 transition" data-v-95ce9831> Crear Rifa </button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/raffles/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-95ce9831"]]);

export { create as default };
//# sourceMappingURL=create-CqKwYSI4.mjs.map
