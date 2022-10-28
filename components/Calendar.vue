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
                                :isFree="slot.isFree"
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

<script lang="ts" setup>
interface CalendarOfDayProps {
    disabledDates?: Array<number>;
    selectedProcedures: Array<Cosmo.Procedure> | null;
    modelValue: number | null;
}
const props = defineProps<CalendarOfDayProps>();
const emit = defineEmits(["update:modelValue"]);

const { fetchSchedule } = useSchedules();
const { getLocalizedWeekday, getLocalizedDate } = useCalendar();

const response = fetchSchedule();

const schedule = computed(() => response.data.value.data);
const isLoading = computed(() => response.pending.value);

// const slotDuration = computed(() => {
//     if (Array.isArray(props.selectedProcedures)) {
//         return getTotalDuration(props.selectedProcedures);
//     }

//     return 0;
// });

// const isFree = (slot: number) => {
//     const slotStart = slot;
//     const hour = new Date(slot).getHours();

//     const slotEnd = slotStart + slotDuration.value;

//     // Если продолжительность больше 1 часа в последний слот
//     if (18 === hour && slotDuration.value / 3600 / 1000 > 1) {
//         return false;
//     }

//     if (Array.isArray(schedule.value)) {
//         for (let i = 0; i < schedule.value.length; i++) {
//             const item = schedule.value[i];
//             const itemStart = item.date;
//             const itemEnd = itemStart + getTotalDuration(item.procedures);

//             // Если время начала слота пересекается со временем другого пациента
//             if (slotStart >= itemStart && slotStart <= itemEnd) {
//                 return false;
//             }

//             const nextItem = schedule.value[i + 1];

//             if (!nextItem) continue;

//             const nextItemStart = nextItem.date;
//             const nextItemEnd =
//                 nextItemStart + getTotalDuration(nextItem.procedures);

//             // Если время конца слота пересекается со временем другого пациента
//             if (slotEnd >= nextItemStart && slotEnd <= nextItemEnd) {
//                 return false;
//             }
//         }

//         return true;
//     }

//     return false;
// };

const selectedValue = ref(props.modelValue);

const isSelected = (date: number) => {
    return selectedValue.value === date;
};

const select = (date: number) => {
    selectedValue.value = date;
    emit("update:modelValue", date);
};

onMounted(response.refresh);
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
