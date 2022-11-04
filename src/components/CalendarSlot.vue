<template>
  <div
    class="calendar-slot"
    :class="rootClasses"
  >
    <div class="calendar-slot-time h4">
      <slot />
    </div>
    <div class="calendar-slot-status">
      <CalendarSlotBtn
        v-if="isFree"
        :is-selected="isSelected"
        @click="select"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import CalendarSlotBtn from '@/components/CalendarSlotBtn.vue';

export default defineComponent({
  components: {
    CalendarSlotBtn,
  },

  props: {
    isFree: {
      type: Boolean,
      default: false,
    },

    isSelected: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['select'],
  setup(props, { emit }) {
    const rootClasses = computed(() => ({
      selected: props.isSelected,
    }));

    const select = () => emit('select');

    return {
      rootClasses,
      select,
    };
  },
});
</script>

<style lang="scss" scoped>
  .calendar-slot {
    display: flex;
    height: 5rem;
    border-top: 1px solid transparent;

    &:not(:last-child) {
      border-bottom: 1px solid rgba($color-pink-700, 0.25);
    }

    &.selected {
      border-top: 1px solid $color-pink-700;
      border-bottom: 1px solid $color-pink-700;
      background-color: rgba($color-pink-700, 0.25);
    }
  }

  .calendar-slot-time {
    display: flex;
    align-items: flex-end;
    flex: 0 0 auto;
    width: 6rem;
    height: 5rem;
    color: rgba($color-pink-700, 0.5);
    padding: 0.4rem;
    @include transition;
  }

  .calendar-slot-status {
    flex: 1 1 auto;
    padding: 0.4rem;

    &:empty {
      cursor: not-allowed;
      background-color: rgba($color-pink-700, 0.1);
    }
  }
</style>
