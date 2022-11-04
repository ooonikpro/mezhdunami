<template>
  <div class="input-date">
    <Input
      type="select"
      label="Дата и время"
      placeholder="Выберите удобное время"
      class="mb-16"
      :disabled="isDisabled"
      :model-value="localizedDate"
      @click="isOpenCalendarModal = !isDisabled"
    />

    <CalendarModal
      v-model="value"
      :selected-procedures="selectedProcedures"
      :is-open="isOpenCalendarModal"
      @close="isOpenCalendarModal = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Input from '@/components/Input.vue';
import CalendarModal from '@/components/CalendarModal.vue';
import { useCalendar } from '@/composables/useCalendar';

export default defineComponent({
  components: {
    Input,
    CalendarModal,
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

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { getLocalizedFullDate } = useCalendar();

    const isOpenCalendarModal = ref(false);

    const value = computed({
      get() {
        return props.modelValue;
      },

      set(val: number) {
        emit('update:modelValue', val);
      },
    });

    const localizedDate = computed(() => {
      if (value.value) {
        return getLocalizedFullDate(new Date(value.value));
      }

      return '';
    });

    const isDisabled = computed(() => {
      if (props.disabled) {
        return true;
      }

      if (props.selectedProcedures == null) {
        return true;
      }

      if (
        Array.isArray(props.selectedProcedures)
          && props.selectedProcedures.length === 0
      ) {
        return true;
      }

      return false;
    });

    return {
      isOpenCalendarModal,
      value,
      localizedDate,
      isDisabled,
    };
  },
});
</script>
