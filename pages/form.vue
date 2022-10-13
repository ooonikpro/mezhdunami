<template>
    <NuxtLayout>
        <template #title>Записаться</template>

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

        <ProcedureInput v-model="form.procedures" />

        <DateInput />

        <Checkbox class="mb-16" v-model="form.notify">
            Напомнить за 2 часа до
        </Checkbox>

        <NotificationSwitcher v-model="form.typeOfNotify" class="mb-24" />

        <Button class="mb-16">Записаться</Button>
        <Button outline small @click="router.push('/')">Отмена</Button>
    </NuxtLayout>
</template>

<script lang="ts" setup>
interface FormState {
    name: string;
    phone: string;
    procedures: number[];
    date: string;
    notify: boolean;
    typeOfNotify: 1 | 2;
}

const router = useRouter();

const form = reactive<FormState>({
    name: "",
    phone: "",
    procedures: [],
    date: "",
    notify: false,
    typeOfNotify: 1,
});
</script>
