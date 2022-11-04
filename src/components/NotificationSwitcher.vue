<template>
  <Switcher
    v-model="value"
    :options="options"
  />
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import Switcher from "@/components/Switcher.vue";
  import { NOTIFICATION_TYPE } from "@/constants";

  export default defineComponent({
    components: {
      Switcher,
    },

    props: {
      modelValue: {
        type: Number as () => NOTIFICATION_TYPE,
        required: true,
      },
    },

    setup(props, { emit }) {
      const options = computed(() => [
        {
          label: "SMS",
          value: NOTIFICATION_TYPE.SMS,
        },
        {
          label: "WhatsApp",
          value: NOTIFICATION_TYPE.WhatsApp,
        },
        {
          label: "Viber",
          value: NOTIFICATION_TYPE.Viber,
        },
      ]);

      const value = computed({
        get() {
          return props.modelValue;
        },

        set(val: number) {
          emit("update:modelValue", val);
        },
      });

      return {
        options,
        value,
      };
    },
  });
</script>
