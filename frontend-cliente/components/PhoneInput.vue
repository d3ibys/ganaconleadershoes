<template>
  <div>
  <div class="phone-input">
    <select v-model="selectedCode" class="area-code" @change="onCodeChange">
      <option v-for="code in codes" :key="code.value" :value="code.value">
        {{ code.label }}
      </option>
    </select>
    <input
      type="tel"
      v-model="phoneNumber"
      placeholder="Número de teléfono"
      class="phone-number"
      @input="onInput"
    />
  </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>


<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: [String, Number]
})
const emit = defineEmits(['update:modelValue'])

const selectedCode = ref('58')
const phoneNumber = ref('')
const errorMessage = ref('')

const codes = [
  { label: '🇻🇪 +58', value: '58' },
  { label: '🇺🇸 +1', value: '1' },
  { label: '🇨🇴 +57', value: '57' },
  { label: '🇪🇸 +34', value: '34' },
  { label: '🇲🇽 +52', value: '52' },
  { label: '🇨🇱 +56', value: '56' },
  { label: '🇦🇷 +54', value: '54' },
  { label: '🇧🇷 +55', value: '55' },
  { label: '🇧🇴 +591', value: '591' },
  { label: '🇨🇺 +53', value: '53' },
  { label: '🇩🇴 +1', value: '1' },
  { label: '🇪🇨 +593', value: '593' },
  { label: '🇵🇪 +51', value: '51' },
  { label: '🇺🇾 +598', value: '598' },
  { label: '🇮🇹 +39', value: '39' },
  { label: '🇵🇾 +595', value: '595' },
  { label: '🇲🇩 +373', value: '373' },
  { label: '🇳🇮 +505', value: '505' },
  { label: '🇰🇾 +1', value: '1' },
  { label: '🇮🇪 +353', value: '353' },
  { label: '🇧🇧 +1', value: '1' },
  { label: '🇪🇺 +49', value: '49' }
]

// Detecta código de país desde un número en cualquier formato
function detectCountryCode(input = '') {
  const val = input.toString().replace(/\D/g, '')
  const sorted = [...codes].sort((a, b) => b.value.length - a.value.length)

  for (const code of sorted) {
    if (val.startsWith(code.value)) {
      return {
        code: code.value,
        number: val.slice(code.value.length)
      }
    }
  }

  // Si no se encuentra código de país, asumimos 58 (Venezuela) y retornamos todo como número
  return {
    code: '58',
    number: val
  }
}

function validatePhoneNumber(value) {
  const cleaned = value.replace(/\D/g, '')

  if (selectedCode.value === '58') {
    const withoutZero = cleaned.startsWith('0') ? cleaned.slice(1) : cleaned

    if (!/^4\d{9}$/.test(withoutZero)) {
      errorMessage.value = 'Número inválido. Usa formato: 4121234567 (sin 0 inicial).'
    } else {
      errorMessage.value = ''
    }

    return withoutZero.slice(0, 10)
  }

  errorMessage.value = ''
  return cleaned
}

function onInput(event) {
  const cleaned = event.target.value.replace(/\D/g, '')
  phoneNumber.value = validatePhoneNumber(cleaned)
  emitPhone()
}

function emitPhone() {
  if (phoneNumber.value) {
    emit('update:modelValue', `${selectedCode.value}${phoneNumber.value}`)
  }
}

function onCodeChange() {
  phoneNumber.value = validatePhoneNumber(phoneNumber.value)
  emitPhone()
}

function initPhoneData(val) {
  const raw = val?.toString() || ''
  const parsed = detectCountryCode(raw)

  selectedCode.value = parsed.code
  phoneNumber.value = validatePhoneNumber(parsed.number)
}

onMounted(() => {
  initPhoneData(props.modelValue)
})

watch(() => props.modelValue, (newVal) => {
  initPhoneData(newVal)
})
</script>




<style scoped>
.phone-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 15px;
}

.area-code {
  background: #222;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  width: 110px;
  box-shadow: 0px 0px 1px 1px #cddc39;
}

.phone-number {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #333;
  color: #fff;
  font-size: 14px;
  box-shadow: 0px 0px 1px 1px #cddc39;
}
.error-message {
  color: red;
  font-size: 0.875em;
  padding-bottom: 5px;
}
</style>

