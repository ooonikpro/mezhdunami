<template>
    <div class="calendar">
        <div class="calendar-container">
            <div class="calendar-content">
                <div
                    v-for="day in calendar"
                    :key="day.date"
                    class="calendar-column"
                >
                    <span>{{ day.label }}</span>
                    <span>{{ day.date }}</span>

                    <div class="calendar-intervals">
                        <div
                            v-for="(item, $j) in timeIntervals"
                            :key="$j"
                            class="calendar-time"
                        >
                            <div>{{ item }}</div>
                            <div>Free</div>
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
}

.calendar-content {
    display: flex;
}

.calendar-column {
    flex: 0 0 auto;
    width: 20rem;
}
</style>
