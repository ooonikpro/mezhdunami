import { onBeforeMount, ref, computed } from 'vue';
import { Patient } from '@/types';
import { fetchAllPatients } from '@/providers/admin/patients.provider';

export const useAdminPatients = () => {
  const searchQuery = ref('');
  const allPatients = ref<Patient[]>([]);
  const isFetching = ref(false);

  const patients = computed(() => allPatients.value.filter(({ name, phone }) => name.includes(searchQuery.value) || phone.includes(searchQuery.value)));

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
