import {
  reactive, onBeforeMount, ref, watch, readonly,
} from 'vue';
import { useSchedules } from '@/composables/useSchedules';
import { useStore } from '@/composables/useStore';
import { PatientFormData, NotificationType } from '@/types';
import { confirmPhone, sendOneTimeCodeFor } from '@/providers/guest/confirm.provider';
import { STORE_KEY } from '@/constants';

const getInitialFormState = (): PatientFormData => ({
  name: '',
  phone: '',
  procedures: [],
  date: 0,
  notify: true,
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
    isConfirmed.value = phone === restoredPhone;
  }
});

interface UsePatientFormPayload {
  restoreUser?: boolean
}

export const usePatientForm = ({ restoreUser = false }: UsePatientFormPayload = {}) => {
  const { insertOneSchedule } = useSchedules();
  const { set, get, remove } = useStore();

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
    } else {
      remove(STORE_KEY.name);
      remove(STORE_KEY.phone);
      remove(STORE_KEY.isConfirmed);
    }

    return insertOneSchedule(form.state);
  };

  if (restoreUser) {
    onBeforeMount(restorePatient);
  }

  return {
    state: form.state as PatientFormData,
    reset: init,
    submit,
    isConfirmed,
    confirmPhone,
    sendOneTimeCodeFor,
  };
};
