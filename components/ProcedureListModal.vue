<template>
    <Modal :is-open="isOpen">
        <template #before-title>
            <Button class="mb-24" outline small @click="close"> Назад </Button>
        </template>

        <template #title>Выберите процедуру</template>

        <div class="mb-24">
            <div
                v-for="option in procedures"
                :key="option.id"
                class="procedure mb-24"
                @click="toggle(option.id)"
            >
                <div class="procedure-checkbox">
                    <Checkbox
                        :modelValue="isActive(option.id)"
                        @update:modelValue="toggle(option.id)"
                        @click.stop
                    />
                </div>
                <div class="procedure-head mb-24">
                    <h3 class="procedure-name mb-16">{{ option.name }}</h3>
                    <span class="procedure-footnote h4">
                        {{ option.footnote }}
                    </span>
                    <span class="procedure-duration h4">
                        {{ option.duration }}
                    </span>
                </div>
                <div class="procedure-body h4 mb-24">
                    <span
                        v-for="(item, $index) in option.description"
                        :key="$index"
                    >
                        {{ item }}
                    </span>
                </div>
                <div class="procedure-footer">
                    <span class="h2">{{ option.price }}</span>
                    <span class="h4">рублей</span>
                </div>
            </div>
        </div>

        <StickyBottom :isSticky="isSticky">
            <Button
                type="button"
                :disabled="selected.length === 0"
                @click="confirm"
            >
                Подтвердить
            </Button>
        </StickyBottom>

        <Button outline small @click="close">Отмена</Button>
    </Modal>
</template>

<script lang="ts" setup>
const props = defineProps<{ isOpen: boolean; modelValue: number[] }>();
const emit = defineEmits(["close", "update:modelValue"]);
const { procedures } = useProcedures();

const selected = ref();
const isSticky = ref(false);

watch(
    props.modelValue,
    () => {
        selected.value = props.modelValue;
    },
    { immediate: true }
);

const close = () => emit("close");
const confirm = () => {
    emit("update:modelValue", selected.value);
    close();
    isSticky.value = false;
};

const isActive = (id: number) => selected.value.includes(id);

const toggle = (id: number) => {
    if (isActive(id)) {
        selected.value = selected.value.filter((item) => item !== id);
    } else {
        selected.value.push(id);
    }

    isSticky.value = true;
};
</script>

<style lang="scss" scoped>
.procedure {
    cursor: pointer;
    display: grid;
    grid-template-areas:
        "checkbox head"
        "checkbox body"
        "checkbox body"
        "footer footer";
    grid-template-columns: 4.4rem 1fr;
    padding-bottom: 0.8rem;

    &:not(:last-child) {
        border-bottom: 1px solid $color-pink-700;
    }
}

.procedure-checkbox {
    width: 4.4rem;
    grid-area: checkbox;
}

.procedure-head {
    display: grid;
    justify-content: space-between;
    grid-area: head;
    grid-template-areas:
        "name name"
        "footnote duration";
    grid-template-columns: 1fr 1fr;
}

.procedure-footnote {
    grid-area: footnote;
}

.procedure-name {
    grid-area: name;
}

.procedure-duration {
    grid-area: duration;
    text-align: right;
}

.procedure-body {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    grid-area: body;
}

.procedure-footer {
    display: flex;
    flex-direction: column;
    grid-area: footer;
    text-align: right;
}
</style>
