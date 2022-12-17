<template>
  <Modal :is-open="isOpen">
    <template #before-title>
      <Button
        outline
        small
        @click="close"
        class="mb-24"
      >
        Закрыть
      </Button>
    </template>

    <template #title>
      Выберите <br> день и время
    </template>

    <Calendar
      :from-hour="fromHour"
      :model-value="modelValue"
      :selected-procedures="selectedProcedures"
      class="mb-24"
      @update:modelValue="updateDate"
    />

    <StickyBottom :is-sticky="isSticky">
      <Button
        :disabled="isDisabledBtn"
        @click="confirm"
      >
        Подтвердить
      </Button>
    </StickyBottom>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Modal from '@/components/Modal.vue';
import Calendar from '@/components/Calendar.vue';
import StickyBottom from '@/components/StickyBottom.vue';
import Button from '@/components/Button.vue';
import type { DateNumber, Procedure } from '@/types';

export default defineComponent({
  components: {
    Modal,
    Calendar,
    StickyBottom,
    Button,
  },

  props: {
    modelValue: {
      type: Number as () => DateNumber,
      required: true,
    },

    selectedProcedures: {
      type: Array as () => Procedure[],
      required: true,
    },

    isOpen: {
      type: Boolean,
      default: false,
    },

    fromHour: {
      type: Number,
      default: 10,
    },
  },

  emits: ['update:modelValue', 'close'],

  setup(props, { emit }) {
    const selectedDate = ref(props.modelValue);

    const close = () => emit('close');

    const isSticky = ref(false);
    const isDisabledBtn = computed(
      () => !isSticky.value || !selectedDate.value,
    );

    const updateDate = (date: DateNumber) => {
      selectedDate.value = date;
      isSticky.value = true;
    };

    const confirm = () => {
      emit('update:modelValue', selectedDate.value);

      close();

      isSticky.value = false;
    };

    return {
      close,
      isSticky,
      isDisabledBtn,
      updateDate,
      confirm,
    };
  },
});
</script>
