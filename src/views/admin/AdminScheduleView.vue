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
      Мое расписание
    </template>

    <Switcher v-model="calendarType" :options="calendarTypeOptions" class="mb-24"/>

    <CalendarWithPatients v-if="calendarType === 0"/>

    <CalendarWithNonWorkingDates v-else/>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Layout from '@/layouts/Layout.vue';
import CalendarWithPatients from '@/components/admin/CalendarWithPatients.vue';
import CalendarWithNonWorkingDates from '@/components/admin/CalendarWithNonWorkingDates.vue';
import { createDate } from '@/utils';
import Switcher from '@/components/Switcher.vue';
import Button from '@/components/Button.vue';
import { useAnimatedRouter } from '@/composables/useAnimatedRouter';

export default defineComponent({
  components: {
    Layout,
    Button,
    CalendarWithPatients,
    CalendarWithNonWorkingDates,
    Switcher,
  },

  setup() {
    const { goToBack } = useAnimatedRouter();

    const toDate = (str: string) => createDate(new Date(str));

    const calendarType = ref(0);
    const calendarTypeOptions = [{
      label: 'Пациенты',
      value: 0,
    }, {
      label: 'Рабочие дни',
      value: 1,
    }];

    return {
      calendarType,
      calendarTypeOptions,
      toDate,
      goToBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
}
</style>
