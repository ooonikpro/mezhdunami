<template>
  <Layout>
    <template #title>
      {{ title }}
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

      <InputProcedure v-model="form.procedures" />

      <InputDate
        v-model="form.date"
        :selected-procedures="form.procedures"
        :from-hour="fromHour"
        class="mb-24"
      />

      <Input
        v-model="form.comment"
        type="textarea"
        label="Комментарий"
        aria-label="Комментарий"
        placeholder="Например, есть аллергия или мне нет 18"
        class="mb-32"
      />

      <Checkbox
        v-if="!withoutConfirm"
        v-model="agree"
        class="mb-32"
      >
        Даю свое согласие на обработку персональных данных
      </Checkbox>

      <Button
        type="submit"
        class="mb-16"
        :disabled="isDisabledSubmitBtn"
      >
        {{ submitButtonText }}
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

    <ConfirmPhoneModal
      v-if="!withoutConfirm"
      :isOpen="isOpenConfirmModal"
      :phone="form.phone"
      :save="rememberMe"
      @success="sendForm"
      @close="isOpenConfirmModal = false"
    />

    <FormFinalStepModal
      :form-data="form"
      :is-open="isOpenFinalModal"
      @close="close"
    />
  </Layout>
</template>

<script lang="ts">
import {
  defineComponent, computed, ref, onBeforeUnmount, watch,
} from 'vue';
import Layout from '@/layouts/Layout.vue';
import Input from '@/components/Input.vue';
import InputProcedure from '@/components/InputProcedure.vue';
import InputDate from '@/components/InputDate.vue';
import Checkbox from '@/components/Checkbox.vue';
import Button from '@/components/Button.vue';
import FormFinalStepModal from '@/components/FormFinalStepModal.vue';

import { useAnimatedRouter } from '@/composables/useAnimatedRouter';
import { useSchedules } from '@/composables/useSchedules';
import { useValidation } from '@/composables/useValidation';
import { usePatientForm } from '@/composables/usePatientForm';
import ConfirmPhoneModal from '@/components/ConfirmPhoneModal.vue';
import { IS_PROD } from '@/constants/env';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Записаться',
    },

    restoreUser: {
      type: Boolean,
      default: false,
    },

    withoutConfirm: {
      type: Boolean,
      default: !IS_PROD,
    },

    backUrl: {
      type: String,
      default: '/',
    },

    submitButtonText: {
      type: String,
      default: 'Записаться',
    },

    fromHour: {
      type: Number,
      default: 10,
    },
  },

  components: {
    Layout,
    Input,
    InputProcedure,
    InputDate,
    Checkbox,
    Button,
    FormFinalStepModal,
    ConfirmPhoneModal,
  },

  setup(props) {
    const { goToBack } = useAnimatedRouter();
    const { fetchData } = useSchedules();
    const {
      isValidName, isValidPhone, toPhoneNumber,
    } = useValidation();
    const {
      state: form,
      reset: resetForm,
      submit: submitForm,
      isConfirmed,
    } = usePatientForm({ restoreUser: props.restoreUser });

    const agree = ref(props.withoutConfirm);
    const rememberMe = ref(props.restoreUser);

    const isDisabledSubmitBtn = computed(() => !agree.value
          || !isValidName(form.name || '')
          || !isValidPhone(form.phone || '')
          || form.procedures?.length === 0
          || !form.date);

    const isOpenFinalModal = ref(false);
    const isOpenConfirmModal = ref(false);

    const sendForm = async () => {
      try {
        isOpenFinalModal.value = await submitForm(rememberMe.value);
      } catch (e) {
        fetchData();
        alert((e! as Error).message);
      }
    };

    const onSubmit = async () => {
      if (isConfirmed.value || props.withoutConfirm) {
        sendForm();
      } else {
        isOpenConfirmModal.value = true;
      }
    };

    const close = () => goToBack(props.backUrl);
    const cancel = () => close();

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
      sendForm,
      isOpenFinalModal,
      isOpenConfirmModal,
      isDisabledSubmitBtn,
    };
  },
});
</script>
