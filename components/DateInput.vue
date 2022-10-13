<template>
    <Input
        type="select"
        label="Дата и время"
        placeholder="Выберите удобное время"
        class="mb-16"
        @click="isOpenCalendarModal = true"
    />

    <CalendarModal
        :isOpen="isOpenCalendarModal"
        @close="isOpenCalendarModal = false"
    />
</template>

<script lang="ts" setup>
const isOpenCalendarModal = ref(false);
</script>
