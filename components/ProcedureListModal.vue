<template>
    <Modal :is-open="isOpen">
        <Head />
        <Button class="mb-24" outline small @click="close"> Назад </Button>

        <h2 class="mb-24">Выберите процедуру</h2>

        <div class="mb-24">
            <div
                v-for="option in options"
                :key="option.key"
                class="procedure mb-24"
                @click="toggle(option.id)"
            >
                <div class="procedure-checkbox">
                    <Checkbox :value="isActive(option.id)" />
                </div>
                <div class="procedure-head mb-24">
                    <h3 class="procedure-name mb-16">{{ option.name }}</h3>
                    <span class="h4">{{ option.footnote }}</span>
                    <span class="h4">{{ option.duration }}</span>
                </div>
                <div class="procedure-body h4 mb-24">
                    <span v-for="desc in option.description" :key="desc">
                        {{ desc }}
                    </span>
                </div>
                <div class="procedure-footer">
                    <span class="h2">{{ option.price }}</span>
                    <span class="h4">рублей</span>
                </div>
            </div>
        </div>

        <Button
            class="mb-16"
            :disabled="selected.length === 0"
            @click="confirm"
        >
            Подтвердить
        </Button>

        <Button outline small @click="close">Отмена</Button>
    </Modal>
</template>

<script lang="ts" setup>
interface Emits {
    (event: "close"): void;
    (event: "confirm", ids: Array<number>): void;
}

const { isOpen } = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<Emits>();

const selected = ref([]);

const options = readonly([
    {
        id: 1,
        name: "Пилинг",
        footnote: "GIGI или Renew System",
        price: "1 500 — 3 000",
        duration: "от 1 часа",
        description: [
            "Мультипиллинг Acnon",
            "Молочный Nutri-Peptide",
            "Миндальный Ester C",
            "Срединный отбеливающий",
            "Срединный Акнепил",
            "Срединный Дермапил",
        ],
    },
    {
        id: 2,
        name: "Пилинг",
        footnote: "GIGI или Renew System",
        price: "1 500 — 3 000",
        duration: "от 1 часа",
        description: [
            "Мультипиллинг Acnon",
            "Молочный Nutri-Peptide",
            "Миндальный Ester C",
            "Срединный отбеливающий",
            "Срединный Акнепил",
            "Срединный Дермапил",
        ],
    },
]);

const close = () => emit("close");
const confirm = () => emit("confirm", selected);

const isActive = (id: number) => selected.value.includes(id);

const toggle = (procedure: typeof options[0]) => {
    const isSelected = isActive(procedure.id);

    if (isSelected) {
        selected.value = selected.value.filter((item) => item !== procedure.id);
    } else {
        selected.value.push(procedure.id);
    }
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
        "checkbox footer";
    padding-bottom: 0.8rem;

    &:not(:last-child) {
        border-bottom: 1px solid $color-pink-700;
    }
}

.procedure-checkbox {
    grid-area: checkbox;
}

.procedure-head {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2.4rem;
    justify-content: space-between;
    grid-area: head;
}

.procedure-name {
    width: 100%;
}

.procedure-body {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    grid-area: body;
    padding-right: 10rem;
}

.procedure-footer {
    display: flex;
    flex-direction: column;
    grid-area: footer;
    text-align: right;
}
</style>
