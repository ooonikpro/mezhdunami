<template>
    <NuxtLayout>
        <template #title>Записаться</template>

        <form @submit.prevent="onSubmit">
            <Input
                label="Твое имя"
                placeholder="Например, Зоя"
                v-model="form.name"
                :validator="isValidName"
                class="mb-16"
            />
            <Input
                type="tel"
                label="Номер телефона"
                placeholder="+7 9XX XXX XX XX"
                :maxlength="16"
                :validator="isValidPhone"
                :transform="toPhoneNumber"
                v-model="form.phone"
                class="mb-16"
            />

            <InputProcedure v-model="form.procedures" />

            <InputDate
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
            <Button type="button" outline small @click="cancel">
                Отмена
            </Button>
        </form>

        <FormFinalStepModal
            :formData="form"
            :isOpen="isOpenFinalModal"
            @close="close"
        />
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { goToBack } = useAnimatedRouter();
const { addToSchedule, refresh: refreshSchedule } = useSchedules();
const { isValidName, isValidPhone, toPhoneNumber } = useValidation();
const { state: form, reset: resetForm, savePatient } = usePatientForm();

const isDisabledSubmitBtn = computed(() => {
    return (
        !isValidName(form.name || "") ||
        !isValidPhone(form.phone || "") ||
        form.procedures.length === 0 ||
        !form.date
    );
});

const isOpenFinalModal = ref(false);

const onSubmit = async () => {
    try {
        isOpenFinalModal.value = await addToSchedule(form);
        savePatient();
    } catch (e) {
        refreshSchedule();
        alert(e.message);
    }
};

const confirm = () => {
    const hasChanges = Object.entries(form).some(([key, val]) => {
        if (key !== "typeOfNotify") {
            return !!val;
        }

        return false;
    });

    return hasChanges
        ? window.confirm(
              "Вы действительно хотите уйти?\nВесь процесс будет потерян"
          )
        : true;
};

const close = () => goToBack("/");
const cancel = () => confirm() && close();

onUnmounted(resetForm);
</script>
