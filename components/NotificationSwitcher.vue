<template>
    <Switcher :options="options" />
</template>

<script lang="ts" setup>
const options = computed(() => [
    {
        label: "SMS",
        value: 1,
    },
    {
        label: "Мессенжер",
        value: 2,
    },
]);
</script>
