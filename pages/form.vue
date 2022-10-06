<template>
  <NuxtLayout>
    <Container class="form-page">
      <div class="head">
        <img src="@/assets/img/mezhdunami-pink.svg" alt="Между нами" />
      </div>

      <h2>Записаться</h2>

      <Input
        label="Твое имя"
        placeholder="Например, Зоя"
        v-model="form.name"
        class="control"
      />
      <Input
        type="tel"
        label="Номер телефона"
        placeholder="+7 9XX XXX XXXX"
        v-model="form.phone"
        class="control"
      />
      <Input
        type="select"
        label="Процедуры"
        placeholder="Выберите процедуру"
        disabled
        v-model="form.procedure"
        class="control"
      />
      <Input
        type="select"
        label="Дата и время"
        placeholder="Выберите удобное время"
        v-model="form.date"
        class="control"
      />

      <Checkbox class="control" v-model="form.notify">
        Напомнить за 2 часа до
      </Checkbox>

      <Switcher v-model="form.typeOfNotify" />

      <Button class="button" disabled>Записаться</Button>
      <Button outline small>Отмена</Button>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const form = reactive({
  name: "",
  phone: "",
  procedure: "",
  date: "",
  notify: false,
  typeOfNotify: 1,
});
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7.2rem;
  margin-bottom: 2.4rem;
  border-bottom: 1px solid $color-pink-700;
}

.control {
  margin-bottom: 2.4rem;
}

.button {
  margin-bottom: 1.6rem;
}

img {
  width: 30rem;
}

h2 {
  margin-bottom: 2.4rem;
}
</style>
