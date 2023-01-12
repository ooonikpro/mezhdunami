<template>
  <Layout>
    <template #before-title>
      <Button
        outline
        small
        @click="goToBack($routes.recommendations)"
        class="mb-24"
      >
        Назад
      </Button>
    </template>

    <template #title>
      Как подготовиться к процедуре?
    </template>

    <section class="mb-32">
      <h3 class="mb-16">Общие рекомендации:</h3>

      <ol>
        <li class="mb-16">Не пить кофе, не курить в день процедуры (минимум за 2 часа до процедуры).</li>
        <li class="mb-16">Накануне и в день процедуры не употреблять алкоголь.</li>
      </ol>

      <p class="mb-16">За 2 недели до пилинга и чистки ограничить времяпрепровождение на солнце, откажитесь от солярия; за 4-5 дней не используйте в домашнем уходе скрабы и средства с кислотами.</p>
    </section>

    <section class="mb-32">
      <h3 class="mb-16">Рекомендации перед контурной пластикой губ:</h3>

      <ol>
        <li class="mb-16">Если есть склонность к герпес вирусной инфекции - за 2 дня начать прием: Ацикловир 200 мг х 4 раза в день в течение 7 дней, или Валацикловир 500 мг х 2 раза в день в течение 7 дней, либо Валтрекс 500 мг х 1 раз в день в течение 7 дней.</li>
        <li class="mb-16">Если принимаете антикоагулянты, антиагреганты по возможности отменить (если не отменить, то синяки и гематомы будут сильнее).</li>
        <li class="mb-16">Не планировать в начале цикла.</li>
      </ol>
    </section>

    <section class="mb-32">
      <h3 class="mb-16">Рекомендации перед ботулинотерапией:</h3>

      <ol>
        <li class="mb-16">За 2 недели прекратить приём антибактериальных препаратов.</li>
        <li class="mb-16">За 7 дней до процедуры можно начать курс препаратов содержащих Цинк (не обязательно).</li>
      </ol>
    </section>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Button from '@/components/Button.vue';

import { useAnimatedRouter } from '@/composables/useAnimatedRouter';

export default defineComponent({
  components: {
    Layout,
    Button,
  },

  setup() {
    const { goToBack } = useAnimatedRouter();

    return {
      goToBack,
    };
  },
});
</script>
