<template>
  <a :href="link" class="post" @click.prevent="goTo(link)">
    <img :src="image" alt="" class="post-image"/>

    <h2 class="post-title">
      {{ title }}
    </h2>
  </a>
</template>

<script lang="ts">import { useAnimatedRouter } from '@/composables/useAnimatedRouter';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Post',

  props: {
    title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
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
.post {
  display: block;
  position: relative;
  width: 100%;
  background-color: $color-white;
  border-radius: 4px;
}

.post-title {
  position: relative;
  aspect-ratio: 2 / 1;
  padding: 1.2rem 1.2rem 2.4rem 2.4rem;
  display: flex;
  align-items: flex-end;
  z-index: 1;
}

.post-image {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: .7;
  z-index: 0;
}
</style>
