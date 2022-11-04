<template>
  <Modal
    :is-open="isOpen"
    @close="close"
    @after-leave="$emit('after-leave')"
  >
    <template #title>
      Спасибо, вы записаны.
    </template>

    <div class="form-summary mb-32">
      <div class="h3">
        {{ formData.name }},
      </div>
      <div class="h3 mb-24">
        {{ formData.phone }}
      </div>

      <div class="h4 label mb-8">
        День записи:
      </div>
      <div class="h3 mb-24">
        {{ getLocalizedFullDate(formData.date) }}
      </div>

      <div class="h4 label mb-8">
        Процедуры:
      </div>
      <div class="h3 mb-24">
        {{ getNames(formData.procedures) }}
      </div>

      <div class="h4 label mb-8">
        Время {{ procedureLabel }}:
      </div>
      <div class="h3 mb-24">
        {{ getTotalDurationLocalized(formData.procedures) }}
      </div>

      <div class="h4 label mb-8">
        Ориентировочная стоимость:
      </div>
      <div class="h3">
        {{ getTotalPrice(formData.procedures) }} рублей
      </div>
    </div>

    <Button @click="close">
      Хорошо
    </Button>
  </Modal>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import Modal from "@/components/Modal.vue";
  import { useCalendar } from "@/composables/useCalendar";
  import { useProcedures } from "@/composables/useProcedures";

  export default defineComponent({
    components: {
      Modal,
    },

    props: {
      isOpen: {
        type: Boolean,
        default: false,
      },

      formData: {
        type: Object as () => Tech.PatientFormData,
        required: true,
      },
    },

    emits: ["close", "after-leave"],

    setup(props, { emit }) {
      const { getLocalizedFullDate } = useCalendar();
      const { getNames, getTotalDurationLocalized, getTotalPrice } =
        useProcedures();
      const close = () => emit("close");

      const procedureLabel = computed(() => {
        let label = "процедур";

        if (props.formData.procedures.length === 1) {
          label += "ы";
        }

        return label;
      });

      return {
        getLocalizedFullDate,
        getNames,
        getTotalDurationLocalized,
        getTotalPrice,
        close,
        procedureLabel,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .form-summary {
    padding: 1.6rem;
    border: 1px solid $color-pink-400;
  }

  .label {
    opacity: 0.5;
  }
</style>
