<template>
  <Modal
    :is-open="props.isOpen"
    @close="close"
    @after-leave="emit('after-leave')"
  >
    <template #title>
      Спасибо, вы записаны.
    </template>

    <div class="form-summary mb-32">
      <div class="h3">
        {{ props.formData.name }},
      </div>
      <div class="h3 mb-24">
        {{ props.formData.phone }}
      </div>

      <div class="label h4 mb-8">
        День записи:
      </div>
      <div class="h3 mb-24">
        {{ getLocalizedFullDate(props.formData.date) }}
      </div>

      <div class="label h4 mb-8">
        Процедуры:
      </div>
      <div class="h3 mb-24">
        {{ getNames(props.formData.procedures) }}
      </div>

      <div class="label h4 mb-8">
        Время {{ procedureLabel }}:
      </div>
      <div class="h3 mb-24">
        {{ getTotalDurationLocalized(props.formData.procedures) }}
      </div>

      <div class="label h4 mb-8">
        Ориентировочная стоимость:
      </div>
      <div class="h3">
        {{ getTotalPrice(props.formData.procedures) }} рублей
      </div>
    </div>

    <Button @click="close">
      Хорошо
    </Button>
  </Modal>
</template>

<script lang="ts" setup>
interface FormFinalStepModalProps {
    isOpen: boolean;
    formData: PatientFormData;
}

const { getLocalizedFullDate } = useCalendar();
const { getNames, getTotalDurationLocalized, getTotalPrice } = useProcedures();
const props = defineProps<FormFinalStepModalProps>();
const emit = defineEmits(['close', 'after-leave']);

const close = () => emit('close');

const procedureLabel = computed(() => {
  let label = 'процедур';

  if (props.formData.procedures.length === 1) {
    label += 'ы';
  }

  return label;
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
