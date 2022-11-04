<template>
  <Layout>
    <template #title>
      Нерабочие дни
    </template>

    <section class="mb-46">
      <ul>
        <li
          v-for="date in formattedDates"
          :key="date"
        >
          <Button small>
            {{ date }} &times;
          </Button>
        </li>
      </ul>
    </section>

    <form @submit.prevent="addDate">
      <Input
        v-model="form.date"
        label="Нерабочий день"
        aria-label="Нерабочий день"
        type="date"
        class="mb-16"
      />
      <Button type="submit">
        Добавить
      </Button>
    </form>
  </Layout>
</template>

<script lang="ts">
import {
  defineComponent, ref, reactive, computed,
} from 'vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

import { useCalendar } from '@/composables/useCalendar';
import Layout from '@/layouts/Layout.vue';

export default defineComponent({
  components: {
    Layout,
    Input,
    Button,
  },

  setup() {
    const { createDate } = useCalendar();

    const excludedDates = ref([
      new Date(),
      new Date(),
      new Date(0),
      new Date(1),
    ]);
    const formattedDates = computed(() => excludedDates.value
      .map((date) => new Date(date))
      .sort()
      .map((d) => d.toLocaleDateString('ru')));

    const form = reactive({
      date: '',
    });

    const addDate = () => {
      if (!form.date) return;

      excludedDates.value.push(createDate(new Date(form.date)));

      form.date = '';
    };

    return {
      form,
      formattedDates,
      addDate,
    };
  },
});
</script>

<style lang="scss" scoped>
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
  }
</style>
