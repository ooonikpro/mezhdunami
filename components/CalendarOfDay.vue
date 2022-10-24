<template>
    <div class="calendar-container">
        <div class="calendar-content">
            <div
                v-for="item in calendar"
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
                        :isFree="isFree(slot.date)"
                        :isSelected="isSelected(slot.date)"
                        @select="select(slot.date)"
                    >
                        {{ slot.time }}
                    </CalendarSlot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface CalendarOfDayProps {
    disabledDates?: Array<number>;
    selectedProcedures: Array<Cosmo.Procedure>;
    modelValue: number | null;
}

const { getCalendarMonth, getLocalizedWeekday, getLocalizedDate, createDate } =
    useCalendar();

const { getTotalDuration } = useProcedures();

const { data: schedule } = useSchedules();

const calendar = computed(() => getCalendarMonth());
const props = defineProps<CalendarOfDayProps>();
const refProps = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const slotDuration = computed(() => getTotalDuration(props.selectedProcedures));

const isFree = (slot: number) => {
    const slotStart = slot;
    const hour = new Date(slot).getHours();

    const slotEnd = slotStart + slotDuration.value;

    // Если продолжительность больше 1 часа в последний слот
    if (18 === hour && slotDuration.value / 3600 / 1000 > 1) {
        return false;
    }

    if (Array.isArray(schedule.value)) {
        for (let i = 0; i < schedule.value.length; i++) {
            const item = schedule.value[i];
            const itemStart = item.date;
            const itemEnd = itemStart + getTotalDuration(item.procedures);

            // Если время начала слота пересекается со временем другого пациента
            if (slotStart >= itemStart && slotStart <= itemEnd) {
                return false;
            }

            const nextItem = schedule.value[i + 1];

            if (!nextItem) continue;

            const nextItemStart = nextItem.date;
            const nextItemEnd =
                nextItemStart + getTotalDuration(nextItem.procedures);

            // Если время конца слота пересекается со временем другого пациента
            if (slotEnd >= nextItemStart && slotEnd <= nextItemEnd) {
                return false;
            }
        }

        return true;
    }

    return false;
};

const selectedValue = ref(props.modelValue);

const isSelected = (date: number) => {
    return selectedValue.value === date;
};

const select = (date: number) => {
    selectedValue.value = date;
    emit("update:modelValue", date);
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
</style>
