<template>
    <NuxtLayout>
        <Head />

        <h2 class="mb-24">Записаться</h2>

        <Input
            label="Твое имя"
            placeholder="Например, Зоя"
            v-model="form.name"
            class="mb-16"
        />
        <Input
            type="tel"
            label="Номер телефона"
            placeholder="+7 9XX XXX XXXX"
            v-model="form.phone"
            class="mb-16"
        />
        <Input
            type="select"
            label="Процедуры"
            placeholder="Выберите процедуру"
            v-model="form.procedure"
            class="mb-16"
        />
        <Input
            type="select"
            label="Дата и время"
            placeholder="Выберите удобное время"
            v-model="form.date"
            class="mb-16"
        />

        <Checkbox class="mb-16" v-model="form.notify">
            Напомнить за 2 часа до
        </Checkbox>

        <Switcher
            v-model="form.typeOfNotify"
            :options="options"
            class="mb-24"
        />

        <Button class="mb-16" @click="isOpenModal = true">Записаться</Button>
        <Button outline small @click="router.push('/')">Отмена</Button>

        <ProcedureListModal
            :is-open="isOpenModal"
            @close="isOpenModal = false"
        />
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
