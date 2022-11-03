<template>
  <div class="calendar">
    <div class="calendar-loader"></div>

    <div class="calendar-container">
      <div class="calendar-content">
        <CalendarSkeleton v-if="isLoading" />

        <template v-else>
          <div
            v-for="item in schedule"
            :key="item.date"
            class="calendar-column"
          >
            <span class="h4">
              <b>{{ getLocalizedWeekday(item.date) }}</b>
            </span>
            <span class="h4 mb-8">
              {{ getLocalizedDate(item.date) }}
            </span>

            <div class="calendar-slots">
              <CalendarSlot
                v-for="(slot, $j) in item.slots"
                :key="$j"
                :isFree="isFree(slot, item.slots)"
                :isSelected="isSelected(slot.date)"
                @select="select(slot.date)"
              >
                {{ slot.time }}
              </CalendarSlot>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useSchedules } from '@/composables/useSchedules';
import { useCalendar } from '@/composables/useCalendar';
import { useProcedures } from '@/composables/useProcedures';

export default defineComponent({
    props: {
        disabledDates: {
            type: Array,
            default: () => [] as number[]
        },

        selectedProcedures: {
            type: Array,
            required: true
        },

        modelValue: {
            type: Number,
            required: true
        }
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const { schedule, isLoading, refreshSchedule } = useSchedules();
        const { getLocalizedWeekday, getLocalizedDate } = useCalendar();
        const { getTotalDuration, getReservedTimeSlots } = useProcedures();

        const selectedProceduresDuration = computed(() => {
            if (Array.isArray(props.selectedProcedures)) {
                return getTotalDuration(props.selectedProcedures);
            }

            return 0;
        });

        const isFree = (
            slot: Tech.ScheduleTimeSlot,
            slotList: Tech.ScheduleTimeSlot[]
        ) => {
            if (!slot.isFree) return false;

            const hour = new Date(slot.date).getHours();

            // Если продолжительность больше 1 часа в последний слот
            if (18 === hour && selectedProceduresDuration.value / 3600 / 1000 > 1) {
                return false;
            }

            const availableSlots = slotList.reduce((obj, { date, isFree }) => {
                if (isFree) {
                    obj[date] = isFree;
                }

                return obj;
            }, {});

            const neededSlots = getReservedTimeSlots(
                slot.date,
                props.selectedProcedures
            );

            return neededSlots.every((s) => availableSlots[s]);
        };

        const selectedSlot = ref(props.modelValue);

        const isSelected = (date: number) => {
            return selectedSlot.value === date;
        };

        const select = (date: number) => {
            selectedSlot.value = date;
            emit("update:modelValue", date);
        };

        onMounted(refreshSchedule);

        return {
            isFree,
            isSelected,
            schedule,
            isLoading,
            select,
            getLocalizedWeekday,
            getLocalizedDate,
        }
    }
})
</script>


<style lang="scss" scoped>
  .calender {
    position: relative;
  }

  .calendar-container {
    width: auto;
    height: calc(100% + 17px);
    padding-bottom: 17px;
    overflow-x: scroll;
    margin-right: -1.2rem;
  }

  .calendar-content {
    display: flex;
    gap: 1.2rem;
  }

  .calendar-column {
    flex: 0 0 auto;
    width: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: content-box;

    &:last-child {
      margin-right: 10rem;
      padding-right: 2rem;
    }
  }

  .calendar-slots {
    border-radius: 4px;
    border: 1px solid rgba($color-pink-700, 0.25);
  }

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

      .slide-left-enter-active,
      .slide-left-leave-active {
        @include transition;
      }

      .slide-left-leave-to {
        opacity: 0;
        transform: translateY(-100%);
      }

      .slide-left-enter-from {
        opacity: 0;
        transform: translateY(100%);
      }
    }
  }
</style>
