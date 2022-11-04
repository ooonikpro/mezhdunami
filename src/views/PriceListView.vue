<template>
  <Layout>
    <template #title>
      Процедуры и цены
    </template>

    <div
      v-for="category in procedures"
      :key="category.name"
      class="category mb-32"
    >
      <h2 :class="[!category.footnotes && 'mb-16', 'category-title']">
        {{ category.name }}
      </h2>
      <div
        v-if="category.footnotes"
        class="description h5 mb-16"
      >
        {{ category.footnotes }}
      </div>

      <div
        v-for="(brand, $index) in category.data"
        :key="$index"
        class="brand mb-16"
      >
        <h3
          v-if="brand.name"
          class="brand-title mb-12"
        >
          {{ brand.name }}
        </h3>
        <div
          v-for="procedure in brand.data"
          :key="procedure.label"
          class="mb-16 row"
        >
          <div class="label">
            <h4>{{ procedure.label }}</h4>
            <span
              v-if="procedure.footnotes"
              class="description h5"
            >
              {{ procedure.footnotes }}
            </span>
          </div>
          <div class="price">
            {{ procedure.price }}
          </div>
        </div>
      </div>
    </div>

    <br>

    <Button
      type="button"
      class="mb-16"
      @click="goTo('/form')"
    >
      Хочу записаться
    </Button>
    <Button
      outline
      small
      @click="goToBack('/')"
    >
      Назад
    </Button>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Button from '@/components/Button.vue';

import { useAnimatedRouter } from '@/composables/useAnimatedRouter';
import { useProcedures } from '@/composables/useProcedures';

export default defineComponent({
  components: {
    Layout,
    Button,
  },

  setup() {
    const { goTo, goToBack } = useAnimatedRouter();
    const { procedures } = useProcedures();

    return {
      goTo,
      goToBack,
      procedures,
    };
  },
});
</script>

<style lang="scss" scoped>
  .brand {
    padding-bottom: 1.6rem;
    border-bottom: 1px solid rgba($color-pink-700, 0.5);
  }

  .brand-title {
    font-weight: 400;
  }

  .row {
    display: flex;
    align-items: flex-start;
  }

  .label {
    flex: 1 1 50%;
  }
</style>
