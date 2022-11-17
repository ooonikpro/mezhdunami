import { reactive, onBeforeMount } from 'vue';
import { useSchedules } from '@/composables/useSchedules';
import { useStore } from '@/composables/useStore';
import { PatientFormData, NotificationType } from '@/types';

const getInitialFormState = (): PatientFormData => ({
  name: '',
  phone: '',
  procedures: [],
  date: 0,
  notify: false,
  notificationType: NotificationType.SMS,
  comment: '',
});

const form = {
  state: reactive(getInitialFormState()),
};

export const usePatientForm = () => {
  const { insertOneSchedule } = useSchedules();
  const { set, get } = useStore();

  const init = () => {
    form.state = reactive(getInitialFormState());
  };

  const restorePatient = () => {
    form.state.name = get('name') || '';
    form.state.phone = get('phone') || '';
  };

  const submit = (save: boolean) => {
    if (save) {
      set('name', form.state.name);
      set('phone', form.state.phone);
    }

    return insertOneSchedule(form.state);
  };

  onBeforeMount(restorePatient);

  return {
    state: form.state as PatientFormData,
    reset: init,
    submit,
  };
};
