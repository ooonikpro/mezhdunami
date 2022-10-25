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
            :formData="formData"
            :isOpen="isOpenFinalModal"
            @close="close"
        />
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { goToBack } = useAnimatedRouter();
const {
    addToSchedule,
    refresh: refreshSchedule,
    execute: fetchSchedule,
} = useSchedules();
const { init: initCalendar } = useCalendar();

const isValidName = (name: string) => /^[а-яА-ЯёЁ-]{3,}/.test(name);
const isValidPhone = (phone: string) => /^(\+?79\d{9}|\+7\s9\d{2}\s\d{3}\s\d{2}\s\d{2})/.test(phone);
const toPhoneNumber = (str: string) => {
    const numbers = str.replace(/\D/g, "").split("");

    if (numbers.length > 0) {
        return numbers.reduce((p, n, i, arr) => {
            let res = p.replace('x', n);

            if (i === arr.length - 1) {
                res = res.replaceAll('x', '');
            }

            return res;
        }, "+x xxx xxx xx xx").trim();
    }

    return numbers.join('').trim();
}

const getInitialFormState = (): Tech.PatientFormData => ({
    name: "",
    phone: "",
    procedures: null,
    date: null,
    notify: false,
    typeOfNotify: 1,
});
const formData = ref();
let form = reactive<Tech.PatientFormData>(getInitialFormState());

const isDisabledSubmitBtn = computed(() => {
    return (
        !isValidName(form.name || '') || !isValidPhone(form.phone || '') || form.procedures.length === 0 || !form.date
    );
});

const isOpenFinalModal = ref(false);

const onSubmit = async () => {
    formData.value = {
        ...form,
        procedures: form.procedures.slice(),
    };

    try {
        await addToSchedule(formData.value);

        isOpenFinalModal.value = true;
    } catch (e) {
        refreshSchedule();
        alert(e.message);
    }
};

const confirm = () => {
    const hasChanges = Object.entries(form).some(([key, val]) => {
        if (key !== 'typeOfNotify') {
            return !!val;
        }

        return false;
    });

    return hasChanges ? window.confirm('Вы действительно хотите уйти?\nВесь процесс будет потерян') : true;
}

const close = () => goToBack("/");
const cancel = () => confirm() && close();

onBeforeMount(fetchSchedule);
onMounted(initCalendar);
</script>
