<template>
    <Input
        type="select"
        label="Дата и время"
        placeholder="Выберите удобное время"
        class="mb-16"
        :disabled="isDisabled"
        :modelValue="localizedDate"
        @click="isOpenCalendarModal = !isDisabled"
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
    modelValue: number | null;
    selectedProcedures: Array<Cosmo.Procedure> | null;
    disabled?: boolean;
}

const { getLocalizedFullDate } = useCalendar();

const props = defineProps<DateInputProps>();
const emit = defineEmits(["update:modelValue"]);
const isOpenCalendarModal = ref(false);

const value = computed({
    get() {
        return props.modelValue;
    },

    set(val: number) {
        emit("update:modelValue", val);
    },
});

const localizedDate = computed(() => {
    if (value.value) {
        return getLocalizedFullDate(new Date(value.value));
    }

    return "";
});

const isDisabled = computed(() => {
    if (props.disabled) {
        return true;
    }

    if (props.selectedProcedures == null) {
        return true;
    }

    if (Array.isArray(props.selectedProcedures) && props.selectedProcedures.length === 0) {
        return true;
    }

    return false;
});
</script>
