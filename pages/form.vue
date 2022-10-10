<template>
    <NuxtLayout>
        <Head />

        <h2>Записаться</h2>

        <Input
            label="Твое имя"
            placeholder="Например, Зоя"
            v-model="form.name"
            class="control"
        />
        <Input
            type="tel"
            label="Номер телефона"
            placeholder="+7 9XX XXX XXXX"
            v-model="form.phone"
            class="control"
        />
        <Input
            type="select"
            label="Процедуры"
            placeholder="Выберите процедуру"
            v-model="form.procedure"
            class="control"
        />
        <Input
            type="select"
            label="Дата и время"
            placeholder="Выберите удобное время"
            v-model="form.date"
            class="control"
        />

        <Checkbox class="control" v-model="form.notify">
            Напомнить за 2 часа до
        </Checkbox>

        <Switcher
            v-model="form.typeOfNotify"
            :options="options"
            class="control"
        />

        <Button class="button" @click="isOpenModal = true">Записаться</Button>
        <Button outline small @click="router.push('/')">Отмена</Button>

        <Modal :is-open="isOpenModal">
            <Head />
            <Button outline small @click="isOpenModal = false">Закрыть</Button>
        </Modal>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const router = useRouter();

const form = reactive({
    name: "",
    phone: "",
    procedure: "",
    date: "",
    notify: false,
    typeOfNotify: 1,
});

const isOpenModal = ref(false);

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

<style lang="scss" scoped>
.control {
    margin-bottom: 2.4rem;
}

.button {
    margin-bottom: 1.6rem;
}

h2 {
    margin-bottom: 2.4rem;
}
</style>
