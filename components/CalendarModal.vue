<template>
    <Modal :isOpen="props.isOpen">
        <template #before-title>
            <Button outline small class="mb-24" @click="emit('close')"
                >Назад</Button
            >
        </template>

        <template #title>Выберите удобные день и время</template>

        <Calendar class="mb-24" />

        <Button class="mb-16" @click="confirm">Подтвердить</Button>
        <Button outline small @click="emit('close')">Закрыть</Button>
    </Modal>
</template>

<script lang="ts" setup>
const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close"]);
</script>
