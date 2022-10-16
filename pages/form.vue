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
            <Button type="button" outline small @click="goToBack('/')">
                Отмена
            </Button>
        </form>

        <FormFinalStepModal
            :formData="formData"
            :isOpen="isOpenFinalModal"
            @close="isOpenFinalModal = false"
            @after-leave="afterLeave"
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

const { goToBack } = useAnimatedRouter();

const formData = ref();
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

const onSubmit = async () => {
    formData.value = {
        ...form,
        procedures: form.procedures.slice(),
    };

    isOpenFinalModal.value = true;
};

const afterLeave = () => setTimeout(() => goToBack("/"), 250);
</script>
