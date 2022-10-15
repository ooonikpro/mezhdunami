<template>
    <div class="calendar-container">
        <div class="calendar-content">
            <div v-for="date in calendar" :key="date" class="calendar-column">
                <span class="h4">
                    <b>{{ getLocalizedWeekday(date) }}</b>
                </span>
                <span class="h4 mb-8">
                    {{ getLocalizedDate(date) }}
                </span>

                <div class="calendar-slots">
                    <div
                        v-for="(slot, $j) in timeSlots"
                        :key="$j"
                        class="calendar-slot"
                        :class="{
                            selected: isSelected(date, slot),
                        }"
                    >
                        <div class="calendar-slot-time h4">{{ slot }}:00</div>
                        <div class="calendar-slot-status">
                            <CalendarSlotBtn
                                v-if="isFree(date, slot)"
                                :isSelected="isSelected(date, slot)"
                                @click="select(date, slot)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface CalendarOfDayProps {
    disabledDates?: Array<Date>;
    selectedProcedures: Array<Cosmo.Procedure>;
    modelValue: Date | null;
}

const { getCalendarMonth, getLocalizedWeekday, getLocalizedDate, createDate } =
    useCalendar();
const timeSlots = readonly([10, 11, 12, 13, 14, 15, 16, 17, 18]);
const calendar = computed(() => getCalendarMonth());
const props = defineProps<CalendarOfDayProps>();
const refProps = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const isFree = (date: Date, hour: number) => {
    const slotDate = createDate(date, hour);

    return true;
};

const selectedValue = ref(props.modelValue);

const isSelected = (date: Date, hour: number) => {
    return selectedValue.value?.getTime() === createDate(date, hour).getTime();
};

const select = (date: Date, hour: number) => {
    selectedValue.value = createDate(date, hour);
    emit("update:modelValue", selectedValue.value);
};
</script>


<style lang="scss" scoped>
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

    &:not(:first-child) {
        border-top: 1px solid rgba($color-pink-700, 0.25);
    }

    &:not(:last-child) {
        border-bottom: 1px solid rgba($color-pink-700, 0.25);
    }

    &.selected {
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
