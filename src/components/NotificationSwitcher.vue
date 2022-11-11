<template>
  <Switcher
    v-model="value"
    :options="options"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Switcher from '@/components/Switcher.vue';
import { NotificationType } from '@/types';

export default defineComponent({
  components: {
    Switcher,
  },

  props: {
    modelValue: {
      type: Number as () => NotificationType,
      required: true,
    },
  },

  setup(props, { emit }) {
    const options = computed(() => [
      {
        label: 'SMS',
        value: NotificationType.SMS,
      },
      {
        label: 'WhatsApp',
        value: NotificationType.WhatsApp,
      },
      {
        label: 'Viber',
        value: NotificationType.Viber,
      },
    ]);

    const value = computed({
      get() {
        return props.modelValue;
      },

      set(val: number) {
        emit('update:modelValue', val);
      },
    });

    return {
      options,
      value,
    };
  },
});
</script>
