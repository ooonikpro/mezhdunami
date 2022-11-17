import {
  reactive, onBeforeMount, ref, watch, readonly,
} from 'vue';
import { useSchedules } from '@/composables/useSchedules';
import { useStore } from '@/composables/useStore';
import { PatientFormData, NotificationType } from '@/types';
import { STORE_KEY } from '../constants/index';

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

let restoredPhone = '';
const isConfirmed = ref(false);

watch(form.state, ({ phone }) => {
  if (restoredPhone) {
    isConfirmed.value = phone !== restoredPhone;
  }
});

export const usePatientForm = () => {
  const { insertOneSchedule } = useSchedules();
  const { set, get } = useStore();

  const init = () => {
    form.state = reactive(getInitialFormState());
  };

  const restorePatient = async () => {
    form.state.name = await get(STORE_KEY.name) || '';

    restoredPhone = await get(STORE_KEY.phone) || '';

    form.state.phone = restoredPhone;

    isConfirmed.value = await get(STORE_KEY.isConfirmed) || false;
  };

  const submit = (save: boolean) => {
    if (save) {
      set(STORE_KEY.name, form.state.name);
      set(STORE_KEY.phone, form.state.phone);
    }

    return insertOneSchedule(form.state);
  };

  onBeforeMount(restorePatient);

  return {
    state: form.state as PatientFormData,
    reset: init,
    submit,
    isConfirmed,
  };
};
