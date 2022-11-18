<template>
  <Modal
    :is-open="isOpen"
    @close="close"
    @after-leave="$emit('after-leave')"
  >
    <template #title>
      Подтверждение телефона
    </template>

    <form ref="form" @submit.prevent="onSubmit">
      <Input
        v-model="code"
        label="Код подтверждения"
        aria-label="Код подтверждения"
        placeholder="ХХХХ"
        autocomplete="one-time-code"
        name="code"
        :maxlength="4"
        :disabled="isLoading"
      />

      <div class="after-input mb-24">
        <span class="error">{{ errorText }}</span>

        <a v-if="count > 1" href="#" @click.prevent>Отправить еще раз через {{ count }} cек</a>
        <a v-else href="#" @click.prevent="sendAgain">Отправить еще раз</a>
      </div>

      <Button type="submit" :disabled="isLoading && code.length != 4">
        Подтвердить
      </Button>
    </form>
  </Modal>
</template>

<script lang="ts">
import {
  defineComponent, ref, toRef, watch,
} from 'vue';
import Modal from '@/components/Modal.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import { useStore } from '@/composables/useStore';
import { STORE_KEY } from '@/constants';
import { usePatientForm } from '@/composables/usePatientForm';

export default defineComponent({
  components: {
    Modal,
    Input,
    Button,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },

    phone: {
      type: String,
      required: true,
    },

    save: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close', 'after-leave'],

  setup(props, { emit }) {
    const isOpen = toRef(props, 'isOpen');

    const { set } = useStore();
    const { isConfirmed, confirmPhone, sendOneTimeCodeFor } = usePatientForm();

    const close = () => emit('close');

    const code = ref('');
    const form = ref<HTMLFormElement>();
    const errorText = ref('');
    const count = ref(30);
    const isLoading = ref(false);

    const tick = () => {
      if (count.value > 0) {
        count.value--;

        setTimeout(tick, 1000);
      }
    };

    const onSubmit = async () => {
      if (code.value.length === 4) {
        isLoading.value = true;

        try {
          isConfirmed.value = await confirmPhone(props.phone, code.value);

          set(STORE_KEY.isConfirmed, props.save && isConfirmed.value);

          close();
        } catch (e) {
          errorText.value = (e as Error).message;
        }

        isLoading.value = false;
      }
    };

    const sendAgain = async () => {
      count.value = 30;
      errorText.value = '';

      tick();

      try {
        await sendOneTimeCodeFor(props.phone);
      } catch (e) {
        console.error(e);
      }
    };

    watch(isOpen, (val) => {
      if (val) {
        sendAgain();

        setTimeout(() => {
          tick();

          const input = form.value?.elements[0];

          (input as HTMLInputElement)?.focus();
          (input as HTMLInputElement)?.click();
        }, 500);
      }
    });

    watch(code, () => {
      errorText.value = '';
    });

    return {
      code,
      form,
      errorText,
      count,
      isLoading,
      onSubmit,
      close,
      sendAgain,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

form {
  margin: auto;
}

.after-input {
  margin-top: -2rem;
  display: flex;
  justify-content: space-between;
}

.error {
  color: red;
}
</style>
