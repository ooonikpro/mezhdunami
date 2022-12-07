<template>
  <div class="calendar" :class="{ 'full-width': fullWidth }">
    <div class="calendar-container">
      <div class="calendar-content">
        <div v-for="date in calendar" :key="date.getTime()" class="calendar-date">
          <div class="calendar-date-label" @click="$emit('click:day', date)">
            <span class="h4">
              <b>{{ getLocalizedWeekday(date) }}</b>
            </span>

            <span class="h4">
              {{ getLocalizedDate(date) }}
            </span>
          </div>

          <div v-for="hour in hours" :key="hour" class="calendar-date-time" @click="$emit('click:hour', { date, hour })">
            <div class="calendar-date-time-label">{{ hour }}</div>

            <div class="calendar-date-time-content">
                <slot v-bind="{ date, hour, isSelected: isSelect(date, hour) }"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, ref, toRef, watch,
} from 'vue';
import {
  timeSlots as hours, getLocalizedWeekday, getLocalizedDate, getCalendarDates, createDate,
  today, getNextMonth,
} from '@/utils';
import { DateNumber } from '@/types';

export default defineComponent({
  props: {
    from: {
      type: Date,
      default: today,
    },

    until: {
      type: Date,
      default: getNextMonth(),
    },

    selectedDates: {
      type: Array as () => Array<DateNumber>,
      default: () => [],
    },

    excludedDates: {
      type: Array as () => Array<DateNumber>,
      default: () => [],
    },

    fullWidth: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click:day', 'click:hour'],

  setup(props) {
    const from = toRef(props, 'from');
    const until = toRef(props, 'until');
    const calendarDates = ref<Date[]>([]);

    watch([from, until], () => {
      calendarDates.value = getCalendarDates(new Date(props.from), new Date(props.until));
    }, {
      immediate: true,
    });

    const calendar = computed(() => calendarDates.value.filter((item) => !props.excludedDates.includes(item.getTime())));

    const isSelect = (day: Date, hour?: number) => {
      for (let i = 0; i < props.selectedDates.length; i++) {
        const dayWithTime = createDate(day, hour).getTime();

        if ([day.getTime(), dayWithTime].includes(props.selectedDates[i])) {
          return true;
        }
      }

      return false;
    };

    return {
      hours,
      calendar,
      isSelect,
      getLocalizedWeekday,
      getLocalizedDate,
    };
  },
});
</script>

<style lang="scss" scoped>
  $calendar-time-label-width: 4rem;
  $calendar-column-width: 30rem;
  $calendar-row-height: 10rem;
  $calendar-border-color: rgba($color-pink-700, .25);

  .calendar {
    position: relative;

    &.full-width {
      .calendar-date-time {
        height: $calendar-row-height;
      }
    }
  }

  .calendar-container {
    height: calc(100% + 17px);
    padding-bottom: 17px;
    overflow-x: scroll;
    margin-left: -1.2rem;
    margin-right: -1.2rem;
  }

  .calendar-content {
    padding-left: 1.2rem;
    display: flex;
    gap: 1rem;
  }

  .calendar-date {
    flex: 0 0 auto;
    width: $calendar-column-width;
  }

  .calendar-date-label {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-bottom: 0.8rem;
  }

  .calendar-date-label + .calendar-date-time {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .calendar-date-time {
    position: relative;
    display: flex;
    height: 5rem;
    border: 1px solid $calendar-border-color;

    @include transition;

    &:not(:last-child) {
      border-bottom: 0;
    }

    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  .calendar-date-time-label {
    flex: 0 0 auto;
    display: flex;
    align-items: flex-end;
    padding: 0.8rem;
    width: $calendar-time-label-width;
  }

  .calendar-date-time-content {
    $padding: 0.4rem;

    display: flex;
    flex: 1 0 auto;
    background-color: rgba($color-pink-700, 0.1);

    @include transition;

    ::v-deep {
      .patient-sticker {
        position: absolute;
        top: 0;
        left: $calendar-time-label-width;
        right: 0;
        z-index: 1;
      }
    }
  }
</style>
