<template>
    <Modal :isOpen="props.isOpen">
        <template #title>Выберите удобные день и время</template>

        <Calendar
            :modelValue="props.modelValue"
            :selectedProcedures="props.selectedProcedures"
            @update:modelValue="updateDate"
            class="mb-24"
        />

        <StickyBottom :isSticky="isSticky">
            <Button :disabled="isDisabledBtn" @click="confirm">
                Подтвердить
            </Button>
        </StickyBottom>
        <Button outline small @click="close">Закрыть</Button>
    </Modal>
</template>

<script lang="ts" setup>
interface Calendar {
    modelValue: number | null;
    selectedProcedures: Array<Cosmo.Procedure> | null;
    isOpen: boolean;
}

const selectedDate = ref(props.modelValue);

const props = defineProps<Calendar>();
const emit = defineEmits(["update:modeValue", "close"]);

const close = () => emit("close");

const isSticky = ref(false);
const isDisabledBtn = computed(() => !isSticky.value || !selectedDate.value);

const updateDate = (date: Date) => {
    selectedDate.value = date;
    isSticky.value = true;
};

const confirm = () => {
    emit("update:modelValue", selectedDate.value);

    close();

    isSticky.value = false;
};

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
