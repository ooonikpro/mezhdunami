<template>
  <Layout hideHead>
    <template #title>
      Мое расписание
    </template>

    <div class="form-group">
      <Input
        v-model="from"
        type="date"
        label="Показать с"
        placeholder="Показать с"
        :transform="toDate"
      />

      <Input
        v-model="until"
        type="date"
        label="Показать до"
        placeholder="Показать до"
        :transform="toDate"
      />
    </div>

    <Switcher v-model="calendarType" :options="calendarTypeOptions" class="mb-24"/>

    <CalendarWithPatients
      v-if="calendarType === 0"
      :from="from"
      :until="until"
    />

    <CalendarWithNonWorkingDates
      v-else
      :from="from"
      :until="until"
    />
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Layout from '@/layouts/Layout.vue';
import CalendarWithPatients from '@/components/admin/CalendarWithPatients.vue';
import CalendarWithNonWorkingDates from '@/components/admin/CalendarWithNonWorkingDates.vue';
import Input from '@/components/Input.vue';
import { createDate, getNextMonth, today } from '@/utils';
import Switcher from '@/components/Switcher.vue';
import { useAdminCalendar } from '@/composables/useAdminCalendar';

export default defineComponent({
  components: {
    Layout,
    Input,
    CalendarWithPatients,
    CalendarWithNonWorkingDates,
    Switcher,
  },

  setup() {
    const { from, until } = useAdminCalendar();

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
      from,
      until,
      calendarType,
      calendarTypeOptions,
      toDate,
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
