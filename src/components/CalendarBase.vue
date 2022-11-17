<template>
  <div class="calendar" :class="{ 'full-width': fullWidth }">
    <div class="calendar-container">
      <div class="calendar-content">
        <div class="calendar-row">
          <div
            v-for="date in calendar"
            :key="date.getTime()"
            :class="['calendar-column', isSelect(date) && 'selected']"
            @click="$emit('click:day', date)"
          >
            <div class="calendar-date">
              <span class="h4">
                <b>{{ getLocalizedWeekday(date) }}</b>
              </span>

              <span class="h4">
                {{ getLocalizedDate(date) }}
              </span>
            </div>
          </div>
        </div>

        <div v-for="hour in hours" :key="hour" class="calendar-row">
          <div
            v-for="date in calendar"
            :key="date.getTime()"
            :class="['calendar-column calendar-date-slot', isSelect(date, hour) && 'selected']"
            @click="$emit('click:hour', { date, hour })"
          >
            <div class="calendar-date-slot-time">{{ hour }}</div>

            <div class="calendar-date-slot-content">
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
  $calendar-date-slot-width: 22rem;
  $calendar-row-height: 5rem;
  $calendar-border-color: rgba($color-pink-700, .25);

  .calendar {
    position: relative;

    &.full-width {
      .calendar-column {
        width: 30rem;
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
  }

  .calendar-row {
    display: flex;
    gap: 1rem;
  }

  .calendar-column {
    flex: 0 0 auto;
    width: $calendar-date-slot-width;
    min-height: $calendar-row-height;
    border: 1px solid transparent;
    @include transition;

    @media screen and (min-width: 480px) {
      width: 30rem;
    }
  }

  .calendar-date-slot-time {
    display: flex;
    align-items: flex-end;
    flex: 0 0 auto;
    padding: 0.4rem;
    width: $calendar-time-label-width;
    color: $color-pink-700;
  }

  .calendar-date-slot-content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 0.4rem;

    &:empty {
      background-color: rgba($color-pink-700, 0.1);
    }
  }

  .calendar-date-slot {
    display: flex;
    flex-direction: row;
    border: 1px solid $calendar-border-color;

    &.selected {
      border-top-color: $color-pink-700;
      border-bottom-color: $color-pink-700;
      background-color: rgba($color-pink-700, 0.25);
    }
  }

  .calendar-row:nth-child(1) .calendar-date-slot,
  .calendar-row:nth-child(2) .calendar-date-slot {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .calendar-row:last-child .calendar-date-slot {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .calendar-date {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }
</style>
