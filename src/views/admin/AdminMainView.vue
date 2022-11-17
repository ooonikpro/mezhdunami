<template>
  <Layout withGradient>
    <template #title>Администратор</template>

    <nav>
      <a
        href="/order-page"
        class="action-btn full-width h-128 i-calendar media-btn"
        @click.prevent="goTo('/admin/schedule')"
      >
        <span class="h2">Мое расписание</span>
      </a>

      <a
        href="/form"
        class="action-btn full-width h-64 i-catalog media-btn"
        @click.prevent="goTo('/admin/patients')"
      >
        <span class="h2">База пациентов</span>
      </a>
    </nav>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';

import { useAnimatedRouter } from '@/composables/useAnimatedRouter';

export default defineComponent({
  components: {
    Layout,
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
    border-radius: 4px;
    border: 1px solid rgba($color-pink-700, 0.1);
    outline: none;
    text-decoration: none;
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0.8rem 1.2rem;
    background-repeat: no-repeat;
    background-position: calc(100% - 0.8rem) 0.8rem;

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
