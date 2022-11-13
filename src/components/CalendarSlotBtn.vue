<template>
  <button
    ref="button"
    type="button"
    class="calendar-slot-btn h4"
    :class="{ active: isSelected }"
  >
    <span v-if="isSelected">Выбрано</span>
    <span v-else>Свободно</span>
  </button>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, watch, toRef,
} from 'vue';

export default defineComponent({
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const button = ref<HTMLButtonElement | null>(null);
    const isMounted = ref(true);
    const isSelected = toRef(props, 'isSelected');

    const intoScroll = (options = {}) => {
      button.value?.scrollIntoView({
        inline: 'nearest',
        block: 'nearest',
        behavior: 'smooth',
        ...options,
      });
    };

    onMounted(() => {
      isMounted.value = true;

      if (props.isSelected) {
        setTimeout(intoScroll, 250);
      }
    });

    watch(isSelected, (newVal: boolean) => {
      if (newVal && isMounted.value) {
        intoScroll({
          block: 'center',
        });
      }
    });

    return {
      button,
    };
  },
});
</script>

<style lang="scss" scoped>
  .calendar-slot-btn {
    width: 14rem;
    height: 100%;
    background-color: $color-pink-700;
    border: 1px solid $color-pink-700;
    border-radius: 4px;
    text-align: left;
    display: flex;
    align-items: flex-end;
    padding: 0.4rem 0.8rem;
    opacity: 1;
    cursor: pointer;
    @include transition;
    overflow: hidden;

    span {
      color: $color-white;
    }

    &.active {
      background-color: $color-white;

      span {
        color: $color-pink-700;
      }
    }
  }
</style>
