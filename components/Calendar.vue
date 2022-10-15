<template>
    <div class="calendar">
        <CalendarOfDay />
    </div>
</template>

<script lang="ts" setup>
const calendarTypes = computed(() => [
    {
        label: "День",
        value: 1,
    },
    {
        label: "Неделя",
        value: 2,
    },
    {
        label: "Месяц",
        value: 3,
    },
]);
</script>


<style lang="scss" scoped>
.calendar {
    width: 100%;
}
</style>
