import { reactive, onBeforeMount } from 'vue';
import { useSchedules } from '@/composables/useSchedules';
import { useStore } from '@/composables/useStore';

const getInitialFormState = (): Tech.PatientFormData => ({
  name: '',
  phone: '',
  procedures: [],
  date: 0,
  notify: false,
  typeOfNotify: 1,
});

const form = {
  state: reactive(getInitialFormState()),
};

export const usePatientForm = () => {
  const { addToSchedule } = useSchedules();
  const { set, get } = useStore();

  const init = () => {
    form.state = reactive(getInitialFormState());
  };

  const restorePatient = () => {
    form.state.name = get('name') || '';
    form.state.phone = get('phone') || '';
  };

  const submit = () => {
    set('name', form.state.name);
    set('phone', form.state.phone);

    return addToSchedule(form.state);
  };

  onBeforeMount(restorePatient);

  return {
    state: form.state as Tech.PatientFormData,
    reset: init,
    submit,
  };
};
