<template>
  <Layout>
    <template #title>
      Записаться
    </template>

    <form @submit.prevent="onSubmit">
      <Input
        v-model="form.name"
        autocomplete="given-name"
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
        placeholder="+79XXXXXXXXX"
        autocomplete="tel"
        :maxlength="12"
        :validator="isValidPhone"
        :transform="toPhoneNumber"
        class="mb-16"
      />

      <Checkbox
        v-model="rememberMe"
        class="mb-24"
      >
        Запомнить мои данные на этом устройстве
      </Checkbox>

      <InputProcedure v-model="form.procedures" />

      <InputDate
        v-model="form.date"
        :selected-procedures="form.procedures"
      />

      <Input
        v-model="form.comment"
        type="textarea"
        label="Комментарий"
        aria-label="Комментарий"
        placeholder="Например, есть аллергия или мне нет 18"
        class="mb-16"
      />

      <Checkbox
        v-model="form.notify"
        class="mb-16"
      >
        Напомнить за сутки до
      </Checkbox>

      <NotificationSwitcher
        v-if="form.notify"
        v-model="form.notificationType"
        class="mb-32"
      />

      <Checkbox
        v-model="agree"
        class="mb-24"
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
    const rememberMe = ref(false);

    const isDisabledSubmitBtn = computed(() => !agree.value
          || !isValidName(form.name || '')
          || !isValidPhone(form.phone || '')
          || form.procedures?.length === 0
          || !form.date);

    const isOpenFinalModal = ref(false);

    const onSubmit = async () => {
      try {
        isOpenFinalModal.value = await submitForm(rememberMe.value);
      } catch (e) {
        fetchData();
        alert((e! as Error).message);
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
      rememberMe,
      form,
      agree,
      resetForm,
      isOpenFinalModal,
      isDisabledSubmitBtn,
    };
  },
});
</script>
