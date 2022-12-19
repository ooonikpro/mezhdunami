<template>
  <div class="input-procedure">
    <Input
      type="select"
      label="Процедуры"
      placeholder="Выберите процедуры"
      :modelValue="procedureLabel"
      :disabled="disabled"
      class="mb-16"
      @click="isOpenProcedureModal = !disabled"
    />

    <ProcedureListModal
      v-model="selectedProcedures"
      :is-open="isOpenProcedureModal"
      @close="isOpenProcedureModal = false"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, computed, PropType,
} from 'vue';
import Input from '@/components/Input.vue';
import ProcedureListModal from '@/components/ProcedureListModal.vue';
import { useProcedures } from '@/composables/useProcedures';
import { Procedure } from '@/constants';

export default defineComponent({
  components: {
    Input,
    ProcedureListModal,
  },

  props: {
    modelValue: {
      type: Array as PropType<Procedure[]>,
      required: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { getNames } = useProcedures();

    const isOpenProcedureModal = ref(false);

    const selectedProcedures = computed<Procedure[]>({
      get() {
        return (props.modelValue || null) as Procedure[];
      },

      set(val: Procedure[]) {
        emit('update:modelValue', val);
      },
    });

    const procedureLabel = computed(() => getNames(selectedProcedures.value));

    return {
      isOpenProcedureModal,
      selectedProcedures,
      procedureLabel,
    };
  },
});
</script>
