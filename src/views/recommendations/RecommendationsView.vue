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

    <section>
      <Post v-for="(post, $index) in posts" :key="$index" v-bind="post" class="mb-24"/>
    </section>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Button from '@/components/Button.vue';
import Post from '@/components/Post.vue';

import { useAnimatedRouter } from '@/composables/useAnimatedRouter';
import { CLIENT_ROUTES } from '@/constants/clientRoutes';

export default defineComponent({
  components: {
    Layout,
    Button,
    Post,
  },

  setup() {
    const { goToBack } = useAnimatedRouter();

    const posts = [
      {
        title: 'Как подготовиться к процедуре?',
        // eslint-disable-next-line
        image: require('@/assets/img/pero-1.webp'),
        link: CLIENT_ROUTES.howToPrepareToProcedure,
      },
      {
        title: 'Рекомендации после процедуры',
        // eslint-disable-next-line
        image: require('@/assets/img/pero-2.webp'),
        link: CLIENT_ROUTES.recommendationsAfterProcedures,
      },
    ];

    return {
      goToBack,
      posts,
    };
  },
});
</script>
