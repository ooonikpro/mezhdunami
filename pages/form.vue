<template>
  <NuxtLayout>
    <Container class="form-page">
      <div class="head">
        <img src="@/assets/img/mezhdunami-pink.svg" alt="Между нами" />
      </div>

      <h2>Записаться</h2>

      <Input label="Твое имя" placeholder="Например, Зоя" />
      <Input
        type="phone"
        label="Номер телефона"
        placeholder="+7 9XX XXX XXXX"
      />
      <Input
        type="select"
        label="Процедуры"
        placeholder="Выберите процедуру"
        disabled
      />
      <Input
        type="select"
        label="Дата и время"
        placeholder="Выберите удобное время"
        disabled
      />

      <Button>Записаться</Button>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
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
