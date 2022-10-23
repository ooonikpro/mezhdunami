<template>
    <Input
        type="select"
        label="Дата и время"
        placeholder="Выберите удобное время"
        class="mb-16"
        :disabled="props.selectedProcedures.length === 0"
        :modelValue="localizedDate"
        @click="isOpenCalendarModal = true"
    />

    <CalendarModal
        v-model="value"
        :selectedProcedures="props.selectedProcedures"
        :isOpen="isOpenCalendarModal"
        @close="isOpenCalendarModal = false"
    />
</template>

<script lang="ts" setup>
interface DateInputProps {
    modelValue: Date | null;
    selectedProcedures: Array<Cosmo.Procedure>;
}

const { getLocalizedFullDate } = useCalendar();

const props = defineProps<DateInputProps>();
const emit = defineEmits(["update:modelValue"]);
const isOpenCalendarModal = ref(false);

const value = computed({
    get() {
        return props.modelValue ? new Date(props.modelValue) : null;
    },

    set(val: Date) {
        emit("update:modelValue", val.getTime());
    },
});

const localizedDate = computed(() => {
    if (value.value) {
        return getLocalizedFullDate(value.value);
    }

    return "";
});
</script>
