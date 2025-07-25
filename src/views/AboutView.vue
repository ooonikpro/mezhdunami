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
      Обо мне
    </template>

    <section class="head mb-16">
      <img
        src="@/assets/img/doctor-1.webp"
        alt="Овечкина Елена Максимовна"
        class="doctor-picture"
        loading="lazy"
      />
      <DoctorDetails class="mb-8" />
    </section>

    <section class="body mb-16">
      <p class="color-black mb-16">
        С детства любая женщина мечтает быть красивой и хорошо выглядеть
        и до самого зрелого возраста хочет оставаться молодой, красивой
        и сексуальной.
      </p>

      <p class="mb-16">
        <i>Косметология - территория красоты.</i>
      </p>

      <p class="color-black mb-16">
        Мне трудно представить себя в другой сфере медицины. Мне всегда
        хотелось помочь людям устранить эстетические недостатки,
        повысить самооценку, помочь полюбить себя.
      </p>

      <p class="color-black mb-16">
        Еще один огромный плюс косметологии - бесконечное развитие.
        Каждый год появляются новые методы сохранения молодости и
        красоты. Это дает стимул совершенствовать свои знания.
      </p>

      <p class="mb-16">
        <i>
          Как бы я себя охарактеризовала? <br>
          Я — врач-косметолог с чувством меры.
        </i>
      </p>

      <p class="color-black mb-16">
        Принцип моей работы - честность и чуткость по отношению к
        пациенту.
      </p>

      <p class="color-black mb-24">
        Я внимательно выслушаю все Ваши пожелания и предложу самый
        безопасный и эффективный метод решения проблемы.
      </p>
    </section>

    <section class="mb-16">
      <h3 class="mb-16">
        Дипломы и сертификаты
      </h3>

      <Carousel class="mb-16" />
    </section>

    <section class="mb-16">
      <h3 id="route" class="mb-24">
        Как найти?
      </h3>

      <address class="mb-16">
        <p>{{ address.city }}</p>
        <p class="h2">
          {{ address.street }}
        </p>
        <p>{{ address.office }}</p>
      </address>

      <div class="map mb-16">
        <a
          href="https://2gis.ru/kaliningrad/firm/70000001059187465?m=20.537715%2C54.709361%2F19.62"
          class="map-btn"
          target="_blank"
          rel="noreferrer noopener"
        >
          Открыть карту
        </a>
      </div>
    </section>

    <section class="mb-32">
      <h3 class="mb-24">
        Как связаться со мной?
      </h3>
      <Social
        class="mb-16"
        bordered
      />
    </section>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import DoctorDetails from '@/components/DoctorDetails.vue';
import Carousel from '@/components/Carousel.vue';
import Social from '@/components/Social.vue';
import Button from '@/components/Button.vue';

import { useAnimatedRouter } from '@/composables/useAnimatedRouter';
import { ADDRESS } from '@/constants';

export default defineComponent({
  components: {
    Layout,
    DoctorDetails,
    Carousel,
    Social,
    Button,
  },

  setup() {
    const { goToBack } = useAnimatedRouter();

    return {
      goToBack,
      address: ADDRESS,
    };
  },
});
</script>

<style lang="scss" scoped>
  section {
    border-bottom: 1px solid rgba($color-pink-700, 0.25);
  }

  .head {
    position: relative;
    height: 14rem;
    display: flex;
    align-items: flex-end;
  }

  .body {
    font-weight: 400;
  }

  .doctor-picture {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: scale(0.6);
    transform-origin: bottom right;
  }

  .map {
    width: 100%;
    height: 24rem;
    background: url("@/assets/img/map.webp");
    background-position: center;
    background-size: cover;
    border-radius: 4px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 0.8rem;
  }

  .map-btn {
    padding: 0.8rem 1.6rem;
    background-color: $color-white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
