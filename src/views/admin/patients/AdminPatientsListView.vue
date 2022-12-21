<template>
  <Layout>
    <template #before-title>
      <Button
        outline
        small
        @click="goToBack('/')"
        class="mb-24"
      >
        Назад
      </Button>
    </template>

    <template #title>
      База пациентов
    </template>

    <div class="search-panel">
      <input
        type="search"
        v-model="searchQuery"
        class="search-input mb-32"
        placeholder="Поиск по имени или телефону"
      />
    </div>

    <div v-if="isShowNotFound" class="not-found">Ничего не найдено</div>

    <section v-else class="mb-32">
      <PatientCardMini
        v-for="patient in patients"
        :key="patient._id"
        :name="patient.name"
        :phone="patient.phone"
        :gender="patient.gender"
        :created-at="patient.createdAt"
        class="mb-16"
        @click="openPatientCard(patient._id)"
      />

      <p>Всего: {{ patients.length }}</p>
    </section>

    <div v-if="isFetching" class="loader">Поиск...</div>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Button from '@/components/Button.vue';
import PatientCardMini from '@/views/admin/patients/components/PatientCardMini.vue';
import { useAdminPatients } from '@/composables/useAdminPatients';
import { useAnimatedRouter } from '@/composables/useAnimatedRouter';
import { Patient } from '@/types';
import { ADMIN_ROUTES } from '@/constants/adminRoutes';

export default defineComponent({
  components: {
    Layout,
    Button,
    PatientCardMini,
  },

  setup() {
    const {
      searchQuery,
      patients,
      isFetching,
    } = useAdminPatients();
    const { goToBack, goTo } = useAnimatedRouter();

    const isShowNotFound = computed(() => !isFetching.value && searchQuery.value && patients.value.length === 0);

    const openPatientCard = (id: Patient['_id']) => {
      goTo(`${ADMIN_ROUTES.patients}/${id}`);
    };

    return {
      searchQuery,
      patients,
      isFetching,
      isShowNotFound,

      goToBack,
      openPatientCard,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgba($color-pink-700, .25);
  height: 5rem;
  outline: none;
  padding: 0 1.2rem;
}
</style>
