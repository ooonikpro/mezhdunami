import { onBeforeMount, ref, computed } from 'vue';
import { Patient } from '@/types';
import { fetchAllPatients } from '@/providers/admin/patients.provider';

export const useAdminPatients = () => {
  const searchQuery = ref('');
  const allPatients = ref<Patient[]>([]);
  const isFetching = ref(false);

  const patients = computed(() => allPatients.value.filter(({ name, phone, lastName = '' }) => new RegExp(searchQuery.value, 'i').test([lastName, name, phone].join(''))));

  const fetchPatients = async () => {
    isFetching.value = true;

    allPatients.value = await fetchAllPatients();

    isFetching.value = false;
  };

  onBeforeMount(fetchPatients);

  return {
    searchQuery,
    patients,
    isFetching,
  };
};
