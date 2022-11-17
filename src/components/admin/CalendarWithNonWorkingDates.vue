<template>
  <CalendarBase
    :from="from"
    :until="until"
    fullWidth
    :selectedDates="selectedDates"
    class="mb-24"
    @click:day="onClickDay"
    @click:hour="onClickHour"
  >
    <template v-slot="{ date, hour, isSelected }">
      <span v-if="isSelected && isNonWork(date, hour)" class="non-working-time unselected">Рабочий час</span>

      <span v-else-if="isSelected" class="non-working-time selected">Не рабочий час</span>

      <span v-else-if="isNonWork(date, hour)" class="non-working-time">Не рабочий час</span>

      <span v-else class="working-time">Рабочий час</span>
    </template>
  </CalendarBase>

  <Button @click="save" :disabled="selectedDates.length === 0">Сохранить</Button>
</template>

<script lang="ts">
import {
  defineComponent, ref,
} from 'vue';
import CalendarBase from '@/components/CalendarBase.vue';
import Button from '@/components/Button.vue';
import { DateNumber } from '@/types';
import { createDate } from '@/utils';
import { useAdminCalendar } from '@/composables/useAdminCalendar';

export default defineComponent({
  name: 'CalendarWithNonWorkingDates',

  components: {
    CalendarBase,
    Button,
  },

  setup() {
    const {
      from, until, nonWorkingDates, onUpdateNonWorkingDates,
    } = useAdminCalendar();
    const selectedDates = ref<DateNumber[]>([]);

    const addToSelectDates = (date: Date) => {
      const time = date.getTime();

      if (selectedDates.value.find((item) => item === time)) {
        selectedDates.value = selectedDates.value.filter((item) => item !== time);
      } else {
        selectedDates.value.push(time);
      }
    };

    const onClickDay = (day: Date) => addToSelectDates(day);
    const onClickHour = ({ date, hour }: { date: Date, hour: number }) => addToSelectDates(createDate(date, hour));

    const isNonWork = (date: Date, hour: number) => {
      const day = createDate(date).getTime();
      const time = createDate(date, hour).getTime();

      return nonWorkingDates.value[day] || nonWorkingDates.value[time];
    };

    const save = async () => {
      const success = await onUpdateNonWorkingDates(selectedDates.value);

      if (success) {
        selectedDates.value = [];
      }
    };

    return {
      from,
      until,
      selectedDates,
      onClickDay,
      onClickHour,
      isNonWork,
      save,
    };
  },
});
</script>

<style lang="scss" scoped>
.non-working-time {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: $color-white;
  background-color: $color-pink-700;
  @include transition;

  &.unselected {
    background-color: $color-green-400;
  }

  &.selected {
    color: $color-pink-700;
    background-color: $color-white;
  }
}

.working-time {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: $color-pink-300;
}
</style>
