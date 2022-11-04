<template>
  <Input
    type="select"
    label="Процедуры"
    placeholder="Выберите процедуры"
    :model-value="procedureLabel"
    :disabled="disabled"
    class="mb-16"
    @click="isOpenProcedureModal = !disabled"
  />

  <ProcedureListModal
    v-model="selectedProcedures"
    :is-open="isOpenProcedureModal"
    @close="isOpenProcedureModal = false"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from "vue";
  import Input from "@/components/Input.vue";
  import ProcedureListModal from "@/components/ProcedureListModal.vue";
  import { useProcedures } from "@/composables/useProcedures";

  export default defineComponent({
    components: {
      Input,
      ProcedureListModal,
    },

    props: {
      modelValue: {
        type: Array as () => Cosmo.Procedure[],
        required: true,
      },

      disabled: {
        type: Boolean,
        default: false,
      },
    },

    emits: ["update:modelValue"],

    setup(props, { emit }) {
      const { getNames } = useProcedures();

      const isOpenProcedureModal = ref(false);

      const selectedProcedures = computed<Cosmo.Procedure[]>({
        get() {
          return (props.modelValue || []) as Cosmo.Procedure[];
        },

        set(val: Cosmo.Procedure[]) {
          emit("update:modelValue", val);
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
