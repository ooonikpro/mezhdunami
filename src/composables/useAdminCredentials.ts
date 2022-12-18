import { reactive } from 'vue';
import { login } from '@/providers/admin/user.provider';

export const useAdminCredentials = () => {
  const form = reactive({
    login: '',
    password: '',
  });

  const submit = async () => {
    if (form.login && form.password && await login(form)) {
      window.location.href = '/';
    }
  };

  return {
    form,
    submit,
  };
};
