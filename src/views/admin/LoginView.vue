<template>
  <Layout withGradient>
    <template #title>
      Администратор
    </template>

    <form @submit.prevent="submit">
      <Input v-model="form.login" class="mb-16" label="Логин" placeholder="Не знаю" />
      <Input type="password" v-model="form.password" class="mb-16" label="Пароль" placeholder="Не знаю тем более"/>
      <Button type="submit">Войти</Button>
    </form>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import { useAdminCredentials } from '@/composables/useAdminCredentials';

export default defineComponent({
  components: {
    Layout,
    Input,
    Button,
  },

  setup() {
    const { form, submit } = useAdminCredentials();

    return {
      form,
      submit,
    };
  },
});
</script>
