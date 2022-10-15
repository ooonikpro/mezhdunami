<template>
    <Input
        type="select"
        label="Процедуры"
        placeholder="Выберите процедуры"
        :modelValue="procedureLabel"
        class="mb-16"
        @click="isOpenProcedureModal = true"
    />

    <ProcedureListModal
        :is-open="isOpenProcedureModal"
        v-model="selectedProcedures"
        @close="isOpenProcedureModal = false"
    />
</template>

<script lang="ts" setup>
const props = defineProps<{ modelValue: number[] }>();
const emit = defineEmits(["update:modelValue"]);
const { procedures, getNames } = useProcedures();

const isOpenProcedureModal = ref(false);

const selectedProcedures = computed({
    get() {
        return props.modelValue;
    },

    set(val: numbers[]) {
        emit("update:modelValue", val);
    },
});

const procedureLabel = computed(() => getNames(selectedProcedures.value));
</script>
