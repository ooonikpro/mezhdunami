<template>
  <Layout>
    <template #before-title>
      <Button
        outline
        small
        @click="goToBack($routes.main)"
        class="mb-24"
      >
        Назад
      </Button>
    </template>
    <template #title>
      Почему так важен правильный домашний уход? 🌿
    </template>

    <section class="mb-46">
      <p class="color-black mb-16">
        Ошибочно думать, что для поддержания хорошего внешнего вида
        необходимо лишь регулярно посещать косметолога, а в остальное
        время достаточно умывания и простого крема 💁🏼‍♀️
      </p>

      <p class="color-black mb-16">
        Уход за лицом является целым ритуалом, важность которого
        невозможно переоценить. При наличии грамотно выстроенной системы
        ежедневный уход превращается в 10-минутное удовольствие по утрам
        и вечерам, а результат не заставит себя долго ждать 🤩
      </p>

      <p class="color-black mb-16">
        Правильный подход к уходу за лицом всегда начинается с
        определения своего типа кожи. Это необходимо для того, чтобы
        выбрать подходящие косметические средства.
      </p>

      <p class="color-black mb-16">
        Например, средства при жирной и сухой кожи существенно
        отличаются, и неправильный подход может привести к негативным
        последствиям.
      </p>

      <p class="color-pink mb-16">
        Всего выделяют четыре типа кожи -
        <b>нормальная, жирная, сухая и комбинированная.</b>
      </p>

      <p class="color-black">
        Этапы по уходу за кожей лица одинаковы для всех типов,
        индивидуальны лишь косметические средства для этих процедур, для
        подбора которых изначально лучше обратиться к косметологу 👩🏼‍⚕️
      </p>
    </section>

    <Button class="mb-16" outline @click="openModal" >Определить тип кожи</Button>

    <a href="https://t.me/lensem">
      <Button class="mb-16">Заказать домашний уход</Button>
    </a>

    <TypeOfSkinModal :is-open="isOpenTypeOfSkinModal" @close="closeModal"/>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Button from '@/components/Button.vue';
import TypeOfSkinModal from '@/components/TypeOfSkinModal.vue';

import { useAnimatedRouter } from '@/composables/useAnimatedRouter';

export default defineComponent({
  components: {
    Layout,
    Button,
    TypeOfSkinModal,
  },

  setup() {
    const { goToBack } = useAnimatedRouter();
    const isOpenTypeOfSkinModal = ref(false);

    const openModal = () => {
      isOpenTypeOfSkinModal.value = true;
    };

    const closeModal = () => {
      isOpenTypeOfSkinModal.value = false;
    };

    return {
      goToBack,
      isOpenTypeOfSkinModal,
      openModal,
      closeModal,
    };
  },
});
</script>
