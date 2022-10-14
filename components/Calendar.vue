<template>
    <div class="calendar">
        <div class="calendar-container">
            <div class="calendar-content">
                <div
                    v-for="day in calendar"
                    :key="day.date"
                    class="calendar-column"
                >
                    <span class="h4">
                        <b>{{ day.label }}</b>
                    </span>
                    <span class="h4 mb-8">{{ day.date }}</span>

                    <div class="calendar-slots">
                        <div
                            v-for="(item, $j) in timeIntervals"
                            :key="$j"
                            class="calendar-slot"
                        >
                            <div class="calendar-slot-time h4">{{ item }}</div>
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
    </div>
</template>

<script lang="ts" setup>
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

const getDateFor = (index: number) => new Date(year, month, day + index);

const getUppercase = (str: string) => str[0].toUpperCase() + str.slice(1);
const getDayOfWeek = (date: Date) =>
    getUppercase(
        date.toLocaleDateString("ru", {
            weekday: "long",
        })
    );

const getMonth = (date: Date) =>
    getUppercase(date.toLocaleDateString("ru", { month: "long" }))
        .replace(/(ь|й)$/, "я")
        .replace(/[т]$/, "та");

const getDay = (date: Date) =>
    date.toLocaleDateString("ru", { day: "numeric" });

const calendar = readonly(
    new Array(7).fill(undefined).map((_, index) => {
        const date = getDateFor(index);

        return {
            label: index ? getDayOfWeek(date) : "Завтра",
            date: `${getDay(date)} ${getMonth(date)}`,
        };
    })
);

const timeIntervals = readonly([10, 11, 12, 13, 14, 15, 16, 17, 18]);
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
    background-color: rgba($color-pink-700, 0.1);
    padding: 0.4rem;
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
}
</style>
