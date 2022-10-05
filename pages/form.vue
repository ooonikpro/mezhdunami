<template>
  <NuxtLayout>
    <Container class="form-page">
      <div class="head">
        <img src="@/assets/img/mezhdunami-pink.svg" alt="Между нами" />
      </div>

      <h2>Записаться</h2>

      <Input label="Твое имя" placeholder="Например, Зоя" v-model="form.name" />
      <Input
        type="tel"
        label="Номер телефона"
        placeholder="+7 9XX XXX XXXX"
        v-model="form.phone"
      />
      <Input
        type="select"
        label="Процедуры"
        placeholder="Выберите процедуру"
        disabled
        v-model="form.procedure"
      />
      <Input
        type="select"
        label="Дата и время"
        placeholder="Выберите удобное время"
        v-model="form.date"
      />

      <Button>Записаться</Button>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const form = reactive({
  name: "",
  phone: "",
  procedure: "",
  date: "",
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

img {
  width: 30rem;
}

h2 {
  margin-bottom: 2.4rem;
}
</style>
