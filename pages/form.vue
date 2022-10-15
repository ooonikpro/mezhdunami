<template>
    <NuxtLayout>
        <template #title>Записаться</template>

        <form @submit.prevent="onSubmit">
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

            <ProcedureInput v-model="form.procedures" :disabled="!form.phone" />

            <DateInput
                v-model="form.date"
                :selectedProcedures="form.procedures"
            />

            <Checkbox v-if="false" class="mb-16" v-model="form.notify">
                Напомнить за 2 часа до
            </Checkbox>

            <NotificationSwitcher
                v-if="form.notify"
                v-model="form.typeOfNotify"
                class="mb-24"
            />

            <Button type="submit" class="mb-16" :disabled="isDisabledSubmitBtn">
                Записаться
            </Button>
            <Button type="button" outline small @click="goBack">
                Отмена
            </Button>
        </form>

        <FormFinalStepModal
            :formData="formData"
            :isOpen="isOpenFinalModal"
            @close="isOpenFinalModal = false"
            @after-leave="goBack"
        />
    </NuxtLayout>
</template>

<script lang="ts" setup>
interface FormState {
    name: string;
    phone: string;
    procedures: number[];
    date: Date;
    notify: boolean;
    typeOfNotify: 1 | 2;
}

const router = useAnimatedRouter();

const formData = ref({
    name: "Елена",
    phone: "+7 999 888 77 66",
    procedures: [1, 2, 3],
    date: new Date(),
    notify: false,
    typeOfNotify: 1,
});
const form = reactive<FormState>({
    name: "",
    phone: "",
    procedures: [],
    date: null,
    notify: false,
    typeOfNotify: 1,
});

const isDisabledSubmitBtn = computed(() => {
    return (
        !form.name || !form.phone || form.procedures.length === 0 || !form.date
    );
});

const isOpenFinalModal = ref(false);

const onSubmit = () => {
    formData.value = {
        ...form,
        procedures: form.procedures.slice(),
    };
    isOpenFinalModal.value = true;
};

const goBack = () => router.pushBack("/");
</script>
