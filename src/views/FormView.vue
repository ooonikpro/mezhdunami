<template>
  <Layout>
    <template #title>
      Записаться
    </template>

    <form @submit.prevent="onSubmit">
      <Input
        v-model="form.name"
        label="Твое имя"
        aria-label="Твое имя"
        placeholder="Например, Зоя"
        :validator="isValidName"
        class="mb-16"
      />
      <Input
        v-model="form.phone"
        type="tel"
        label="Номер телефона"
        aria-label="Номер телефона"
        placeholder="+7 9XX XXX XX XX"
        :maxlength="16"
        :validator="isValidPhone"
        :transform="toPhoneNumber"
        class="mb-16"
      />

      <InputProcedure v-model="form.procedures" />

      <InputDate
        v-model="form.date"
        :selected-procedures="form.procedures"
      />

      <Checkbox
        v-if="false"
        v-model="form.notify"
        class="mb-16"
      >
        Напомнить за 2 часа до
      </Checkbox>

      <NotificationSwitcher
        v-if="form.notify"
        v-model="form.typeOfNotify"
        class="mb-24"
      />

      <Button
        type="submit"
        class="mb-16"
        :disabled="isDisabledSubmitBtn"
      >
        Записаться
      </Button>
      <Button
        type="button"
        outline
        small
        @click="cancel"
      >
        Отмена
      </Button>
    </form>

    <FormFinalStepModal
      :form-data="form"
      :is-open="isOpenFinalModal"
      @close="close"
    />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const { goToBack } = useAnimatedRouter();
    const { refresh: refreshSchedule } = useSchedules();
    const { isValidName, isValidPhone, toPhoneNumber } = useValidation();
    const { state: form, reset: resetForm, submit: submitForm } = usePatientForm();

    const isDisabledSubmitBtn = computed(() => (
      !isValidName(form.name || '')
        || !isValidPhone(form.phone || '')
        || form.procedures?.length === 0
        || !form.date
    ));

    const isOpenFinalModal = ref(false);

    const onSubmit = async () => {
      try {
        isOpenFinalModal.value = await submitForm();
      } catch (e) {
        refreshSchedule();
        alert(e.message);
      }
    };

    const close = () => goToBack('/');
    const cancel = () => close();

    onUnmounted(resetForm);
  },
});
</script>
