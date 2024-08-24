<script setup>
import {ref, watch, defineEmits, computed} from "vue";

defineOptions({
  name: 'QPreloadedSelect'
})

const props = defineProps({
  optionLabel: {
    type: String,
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'value'
  },
  label: {
    type: String,
    default: null,
  },
  required: {
    type: Boolean,
    default: true
  },
  errors: {
    type: Array,
  },
  options: {
    type: Array,
  },
  modelValue: null
})

const modelValue = ref(props.value);

const emit = defineEmits([
  'input',
  'filter',
  'blur',
  'update: modelValue',
])
const emitSelectedValue = (value) => {
  emit('input', value);
};

const emitBlur = (value) => {
  emit('blur', value)
}

const emitFilter = (val, update, abort) => {
  emit('filter',val, update, abort)
}

const model = computed({
  get:() => props.modelValue,
  set:(val) => emit('update: modelValue',val)
})

watch(
  () => props.value,
  (newValue) => {modelValue.value = newValue}
)

</script>

<template>
  <label class="q-my-sm">{{props.label}}<span v-if="props.required" class="text-red">*</span></label>
  <q-select
    use-input
    clearable
    outlined dense
    lazy-rules
    v-model="model"
    :options="props.options"
    map-options
    emit-value
    :option-label="props.optionLabel"
    :option-value="props.optionValue"
    :error="props.errors.length > 0"
    @filter="emitFilter"
    @blur="emitBlur"
    v-bind="{...$attrs, ...$slots}"
  >
    <template v-slot:error>
      <div v-for="err in props.errors" :key="err.$uid">
        {{ err?.$message }}
      </div>
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

