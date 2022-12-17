<template>
  <Modal
    :is-open="isOpen"
    @close="close"
    @after-leave="$emit('after-leave')"
  >
    <template #title>
      Запись
    </template>

    <div class="form-summary mb-32">
      <div class="h4 label mb-8">
        Имя:
      </div>
      <div class="h3 mb-24">
        {{ formData.name }}
      </div>

      <div class="h4 label mb-8">
        Телефон:
      </div>
      <div class="h3 mb-24">
        {{ formData.phone }}
      </div>

      <div class="h4 label mb-8">
        День записи:
      </div>
      <InputDate
        v-model="date"
        :selectedProcedures="formData.procedures"
      />

      <div class="h4 label mb-8">
        Процедуры:
      </div>
      <div class="h3 mb-24">
        {{ getNames(formData.procedures) }}
      </div>
    </div>

    <Button @click="saveFormData" class="mb-16" :disabled="!hasChanges">
      Сохранить
    </Button>

    <Button outline @click="close" class="mb-46">
        Назад
    </Button>

    <Button outline small color="red" @click="deleteFormData">
      Удалить
    </Button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import InputDate from '@/components/InputDate.vue';
import Button from '@/components/Button.vue';

import { useCalendar } from '@/composables/useCalendar';
import { useProcedures } from '@/composables/useProcedures';
import type { PatientFormData } from '@/types';

export default defineComponent({
  components: {
    Modal,
    InputDate,
    Button,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },

    formData: {
      type: Object as () => PatientFormData,
      required: true,
    },
  },

  emits: ['close', 'after-leave', 'update:formData', 'delete:formData'],

  setup(props, { emit }) {
    const { getLocalizedFullDate } = useCalendar();
    const { getNames, getTotalDurationLocalized } = useProcedures();
    const close = () => emit('close');

    const procedureLabel = computed(() => {
      let label = 'процедур';

      if (props.formData.procedures.length === 1) {
        label += 'ы';
      }

      return label;
    });

    const date = ref(props.formData?.date);
    const hasChanges = computed(() => date.value !== props.formData?.date);

    const saveFormData = () => {
      close();

      emit('update:formData', {
        ...props.formData,
        date: date.value,
      });
    };

    const deleteFormData = () => {
      if (window.confirm('Действительно удалить?')) {
        close();
        emit('delete:formData', props.formData);
      }
    };

    return {
      date,
      hasChanges,
      saveFormData,
      deleteFormData,
      getLocalizedFullDate,
      getNames,
      getTotalDurationLocalized,
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
