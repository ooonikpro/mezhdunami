<template>
    <div class="calendar-container">
        <div class="calendar-content">
            <div v-for="date in calendar" :key="date" class="calendar-column">
                <span class="h4">
                    <b>{{ getLocalizedDayOfWeek(date) }}</b>
                </span>
                <span class="h4 mb-8">
                    {{ getNumericDate(date) }}
                    {{ getLocalizedMonth(date) }}
                </span>

                <div class="calendar-slots">
                    <div
                        v-for="(slot, $j) in timeSlots"
                        :key="$j"
                        class="calendar-slot"
                    >
                        <div class="calendar-slot-time h4">{{ slot }}</div>
                        <div class="calendar-slot-status">
                            <button class="calendar-slot-status-free h4">
                                Свободно
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const {
    getCalendarMonth,
    getLocalizedDayOfWeek,
    getLocalizedMonth,
    getNumericDate,
} = useCaledar();
const timeSlots = readonly([10, 11, 12, 13, 14, 15, 16, 17, 18]);
const calendar = computed(() => getCalendarMonth());
</script>


<style lang="scss" scoped>
.calendar {
    width: 100%;
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

    &:not(:last-child) {
        border-bottom: 1px solid rgba($color-pink-700, 0.25);
    }
}

.calendar-slot-time {
    display: flex;
    align-items: flex-end;
    flex: 0 0 auto;
    width: 5rem;
    height: 5rem;
    color: rgba($color-pink-700, 0.5);
    padding: 0.4rem;
}

.calendar-slot-status {
    flex: 1 1 auto;
    padding: 0.4rem;

    &:empty {
        background-color: rgba($color-pink-700, 0.1);
    }
}

.calendar-slot-status-free {
    width: calc(100% + 1rem);
    height: 100%;
    background-color: $color-pink-700;
    border: none;
    color: $color-white;
    border-radius: 4px;
    text-align: left;
    display: flex;
    align-items: flex-end;
    padding: 0.4rem 0.8rem;
    opacity: 0.8;
}
</style>
