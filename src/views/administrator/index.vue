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
        type="date"
        class="mb-16"
      />
      <Button type="submit">
        Добавить
      </Button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
const { createDate } = useCalendar();

const excludedDates = ref([new Date(), new Date(), new Date(0), new Date(1)]);
const formattedDates = computed(() => excludedDates.value
  .map((date) => new Date(date))
  .sort()
  .map((d) => d.toLocaleDateString('ru')));

const form = reactive({
  date: null,
});

const addDate = () => {
  if (!form.date) return;

  excludedDates.value.push(createDate(new Date(form.date)));

  form.date = null;
};
</script>

<style lang="scss" scoped>
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
  }
</style>
