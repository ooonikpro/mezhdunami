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

      <Checkbox
        v-model="agree"
        class="mb-16"
      >
        Даю свое согласие на обработку персональных данных
      </Checkbox>

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
import {
  defineComponent, computed, ref, onBeforeUnmount, onMounted,
} from 'vue';
import Layout from '@/layouts/Layout.vue';
import Input from '@/components/Input.vue';
import InputProcedure from '@/components/InputProcedure.vue';
import InputDate from '@/components/InputDate.vue';
import Checkbox from '@/components/Checkbox.vue';
import NotificationSwitcher from '@/components/NotificationSwitcher.vue';
import Button from '@/components/Button.vue';
import FormFinalStepModal from '@/components/FormFinalStepModal.vue';

import { useAnimatedRouter } from '@/composables/useAnimatedRouter';
import { useSchedules } from '@/composables/useSchedules';
import { useValidation } from '@/composables/useValidation';
import { usePatientForm } from '@/composables/usePatientForm';

export default defineComponent({
  components: {
    Layout,
    Input,
    InputProcedure,
    InputDate,
    Checkbox,
    NotificationSwitcher,
    Button,
    FormFinalStepModal,
  },

  setup() {
    const { goToBack } = useAnimatedRouter();
    const { fetchData } = useSchedules();
    const {
      isValidName, isValidPhone, toPhoneNumber,
    } = useValidation();
    const {
      state: form,
      reset: resetForm,
      submit: submitForm,
    } = usePatientForm();

    const agree = ref(false);

    const isDisabledSubmitBtn = computed(
      () => !agree.value
          || !isValidName(form.name || '')
          || !isValidPhone(form.phone || '')
          || form.procedures?.length === 0
          || !form.date,
    );

    const isOpenFinalModal = ref(false);

    const onSubmit = async () => {
      try {
        isOpenFinalModal.value = await submitForm();
      } catch (e) {
        fetchData();
        alert(e);
      }
    };

    const close = () => goToBack('/');
    const cancel = () => close();

    onMounted(fetchData);
    onBeforeUnmount(resetForm);

    return {
      close,
      cancel,
      onSubmit,
      isValidName,
      isValidPhone,
      toPhoneNumber,
      form,
      agree,
      resetForm,
      isOpenFinalModal,
      isDisabledSubmitBtn,
    };
  },
});
</script>
