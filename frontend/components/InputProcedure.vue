<template>
  <Input
    type="select"
    label="Процедуры"
    placeholder="Выберите процедуры"
    :model-value="procedureLabel"
    :disabled="props.disabled"
    class="mb-16"
    @click="isOpenProcedureModal = !props.disabled"
  />

  <ProcedureListModal
    v-model="selectedProcedures"
    :is-open="isOpenProcedureModal"
    @close="isOpenProcedureModal = false"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{ modelValue: Procedure[] | null }>();
const emit = defineEmits(['update:modelValue']);
const { getNames, procedures } = useProcedures();

const isOpenProcedureModal = ref(false);

const selectedProcedures = computed<Procedure[]>({
  get () {
    return props.modelValue || [];
  },

  set (val: number[]) {
    emit('update:modelValue', val);
  }
});

const procedureLabel = computed(() =>
  getNames(selectedProcedures.value, procedures.value)
);
</script>
