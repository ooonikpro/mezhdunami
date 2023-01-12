<template>
  <Layout withGradient>
    <nav>
      <Social />

      <a
        :href="$routes.priceList"
        class="full-width h-64 media-btn"
        @click.prevent="goTo($routes.priceList)"
      >
        <span class="h3">Прайс-лист</span>
        <span class="h5">Цены</span>
      </a>

      <a
        :href="$routes.form"
        class="action-btn full-width h-64 i-calendar media-btn"
        @click.prevent="goTo($routes.form)"
      >
        <span class="h2">Записаться</span>
      </a>

      <a
        :href="$routes.recommendations"
        class="full-width h-64 media-btn"
        @click.prevent="goTo($routes.recommendations)"
      >
        <span class="h3">Рекомендации</span>
        <span class="h5">До и после процедур</span>
      </a>

      <a
        :href="$routes.orderPage"
        class="full-width h-128 media-btn i-catalog"
        @click.prevent="goTo($routes.orderPage)"
      >
        <span class="h3">Заказать <br>домашний уход</span>
      </a>

      <a
        :href="$routes.about"
        class="full-width h-64 media-btn"
        @click.prevent="goTo($routes.about)"
      >
        <span class="h3">Обо мне</span>
        <span class="h5">Дипломы Контакты</span>
      </a>
    </nav>

    <div class="profile">
      <img
        src="@/assets/img/doctor.webp"
        loading="lazy"
        alt="Овечкина Елена Максимовна"
        class="photo"
      >

      <DoctorDetails reverted />
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Social from '@/components/Social.vue';
import DoctorDetails from '@/components/DoctorDetails.vue';

import { useAnimatedRouter } from '@/composables/useAnimatedRouter';

export default defineComponent({
  components: {
    Layout,
    Social,
    DoctorDetails,
  },

  setup() {
    const { goTo } = useAnimatedRouter();

    return {
      goTo,
    };
  },
});
</script>

<style lang="scss" scoped>
  .home-page {
    padding: 3.5rem 2.7rem 10rem 2.7rem;

    @include fullscreen {
      padding-top: 2rem;
      padding-bottom: 3.5rem;
    }
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 2.4rem;
  }

  .media-btn {
    flex: 1 1 auto;
    border-radius: 8px;
    box-shadow: 1px 1px rgba($color-pink-700, .1);
    outline: none;
    text-decoration: none;
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0.8rem 1.2rem;
    background-repeat: no-repeat;
    background-position: calc(100% - 0.8rem) 0.8rem;
    background-color: rgba($color-white, .5);

    &.action-btn {
      background-color: $color-white;
    }

    &.i-calendar {
      background-image: url("@/assets/img/i-calendar.svg");
    }

    &.i-catalog {
      background-image: url("@/assets/img/i-catalog.svg");
    }

    &.full-width {
      width: 100%;
    }

    &.h-80 {
      height: 8rem;
    }
    &.h-64 {
      height: 6.4rem;
    }

    &.h-128 {
      height: 12.8rem;
    }
  }

  .h6 {
    font-size: 1.1rem;
  }

  .h5 {
    @media screen and (max-width: 375px) {
      font-size: 1.2rem;
    }
  }

  .profile {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .photo {
    width: 12.8rem;
    height: 12.8rem;
    border-radius: 12.8rem;
  }
</style>
