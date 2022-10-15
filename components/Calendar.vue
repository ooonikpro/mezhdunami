<template>
    <div class="calendar">
        <Switcher
            v-model="typeOfCalendar"
            :options="calendarTypes"
            small
            class="mb-24"
        />
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

const typeOfCalendar = ref(calendarTypes.value[0].value);
</script>


<style lang="scss" scoped>
.calendar {
    width: 100%;
}
</style>
