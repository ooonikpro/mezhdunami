<template>
    <Modal :isOpen="props.isOpen">
        <template #before-title>
            <Button outline small @click="emit('close')">Назад</Button>
        </template>

        <template #title>Выберите удобные день и время</template>

        <Calendar />

        <Button @click="confirm">Подтвердить</Button>
        <Button outline small @click="emit('close')">Закрыть</Button>
    </Modal>
</template>

<script lang="ts" setup>
const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close"]);
</script>
