<template>
  <Modal :is-open="isOpen" @close="close">
    <template #before-title>
      <Button
        outline
        small
        @click="close"
        class="mb-24"
      >
        Закрыть
      </Button>
    </template>

    <template #title>
      Определение типа кожи
    </template>

    <Switcher v-model="test" :options="options" class="mb-24"/>

    <section v-if="test === 1" class="mb-46">
      <h3 class="mb-16">C помощью салфетки</h3>
      <p class="mb-16">Как понять, какая у тебя кожа, при помощи обычной бумажной салфетки? Для этого нужно выполнить несколько простых действий:</p>
      <ol class="mb-24">
        <li>Очистить кожу привычным для нее средством мягкого действия: гелем или пенкой для умывания.</li>
        <li>Бережно промокнуть лицо полотенцем или тканевой салфеткой, не растирая кожу.</li>
        <li>Подождать около часа – в это время нельзя пользоваться никакими косметическими средствами.</li>
        <li>Приложить к лицу тонкую бумажную салфетку и аккуратно прижать ее в области лба, носа, щек и подбородка.</li>
      </ol>

      <p class="mb-16">Подержать минуту и оценить результаты:</p>

      <ol class="mb-16">
        <li class="mb-24">Четкие, хорошо заметные жировые пятна по всей площади салфетки - <b class="h3">кожа жирная</b></li>
        <li class="mb-24">Легкие следы кожного жира едва заметны и распределены также по всей поверхности салфетки – <b class="h3">кожа нормальная</b>.</li>
        <li class="mb-24">Следы хорошо видны только в Т-зоне – <br/><b class="h3">кожа комбинированная</b>.</li>
        <li class="mb-24">Выделений на салфетке нет вообще, поверхность чистая – <br/><b class="h3">кожа сухая</b>.</li>
      </ol>
    </section>

    <section v-if="test === 2" class="mb-46">
      <h3 class="mb-16">Ответить на вопросы</h3>
      <p class="mb-12">Как определить тип кожи лица, если нет возможности сделать тест с помощью салфетки?</p>
      <p class="mb-24">Можно ответить на несколько простых вопросов, которые помогут оценить состояние кожи и ее тип.</p>

      <h3 class="mb-24">1. Опишите обычное состояние своей кожи</h3>
      <Radio v-model="answers.question1" name="question-1" value="A" class="mb-16">
        Вялая, упругость снижена, склонна к шелушениям, цвет лица тусклый, кожа выглядит тонкой.
      </Radio>

      <Radio v-model="answers.question1" name="question-1" value="B" class="mb-16">
        Обладает постоянным блеском, поры расширены, склонна к появлению черных точек, высыпаний.
      </Radio>

      <Radio v-model="answers.question1" name="question-1" value="C" class="mb-16">
        Блестит неравномерно (обычно в Т-зоне), могут появляться как черные точки, так и легкое шелушение.
      </Radio>

      <Radio v-model="answers.question1" name="question-1" value="D" class="mb-32">
        Матовая, приятная на ощупь, нет покраснений и черных точек, а также жирного блеска.
      </Radio>

      <h3 class="mb-24">2. Есть ли какие-то «привычные» проблемы с кожей, которые возникают регулярно?</h3>
      <Radio v-model="answers.question2" name="question-2" value="A" class="mb-16">
        После пребывания на улице (на солнце, ветре или морозе) или под воздействием других факторов кожа выглядит уставшей, начинает шелушиться, ярче видны первые морщинки.
      </Radio>

      <Radio v-model="answers.question2" name="question-2" value="B" class="mb-16">
        Кожа постоянно блестит и выглядит «неопрятной», поры расширены, часто появляются черные точки и высыпания.
      </Radio>

      <Radio v-model="answers.question2" name="question-2" value="C" class="mb-16">
        Даже при общем хорошем состоянии регулярно появляются высыпания в области подбородка или на крыльях носа.
      </Radio>

      <Radio v-model="answers.question2" name="question-2" value="D" class="mb-16">
        При регулярном уходе особых проблем нет.
      </Radio>

      <h3 class="mb-24">3. Как реагирует кожа на умывание водой и привычными для нее средствами?</h3>
      <Radio v-model="answers.question3" name="question-3" value="A" class="mb-16">
        Чистой водой умываться некомфортно, возникает ощущение стянутости – приходится каждый раз использовать пенку или мягкий гель.
      </Radio>

      <Radio v-model="answers.question3" name="question-3" value="B" class="mb-16">
        Такое ощущение, что кожа не замечает умываний – блеск и ощущение жирности возвращаются практически сразу.
      </Radio>

      <Radio v-model="answers.question3" name="question-3" value="C" class="mb-16">
        Не всегда удается подобрать подходящее средство – зоны лица реагируют по-разному, приходится пользоваться несколькими бьюти-продуктами.
      </Radio>

      <Radio v-model="answers.question3" name="question-3" value="D" class="mb-16">
        Кожа спокойно реагирует на любые средства, особых проблем замечено не было.
      </Radio>

      <h3 class="mb-24">4. Расскажите, по какому принципу подбираете уходовую косметику?</h3>
      <Radio v-model="answers.question4" name="question-4" value="A" class="mb-16">
        Лучше всего коже подходят густые, плотные, насыщенные средства – после них кожа будто оживает.
      </Radio>

      <Radio v-model="answers.question4" name="question-4" value="B" class="mb-16">
        Стараюсь выбирать средства с максимально легкой текстурой: гели, лосьоны, пенки, тоники…
      </Radio>

      <Radio v-model="answers.question4" name="question-4" value="C" class="mb-16">
        По принципу зонирования: каждой области лица – свое средство.
      </Radio>

      <Radio v-model="answers.question4" name="question-4" value="D" class="mb-32">
        Просто ориентируюсь по составу и желаемому воздействию на кожу, на текстуру и плотность внимания не обращаю.
      </Radio>

      <p>Ваша кожа <b class="h3">{{ typeOfSkin }}</b></p>
    </section>

    <a href="https://t.me/lensem">
      <Button class="mb-16">Заказать домашний уход</Button>
    </a>
  </Modal>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import Modal from '@/components/Modal.vue';
import Button from '@/components/Button.vue';
import Switcher from '@/components/Switcher.vue';
import Radio from '@/components/Radio.vue';

export default defineComponent({
  components: {
    Modal,
    Button,
    Switcher,
    Radio,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const options = [
      {
        label: 'Первый способ',
        value: 1,
      },
      {
        label: 'Второй способ',
        value: 2,
      },
    ];

    const test = ref(options[0].value);

    const close = () => {
      emit('close');
      test.value = options[0].value;
    };

    const answers = reactive<Record<string, 'A' | 'B' | 'C' | 'D' | ''>>({
      question1: '',
      question2: '',
      question3: '',
      question4: '',
    });

    const typeOfSkin = computed(() => {
      const results = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
      };

      let sum = 0;

      Object.values<keyof typeof results | ''>(answers).forEach((answer: keyof typeof results | '') => {
        if (answer) {
          results[answer]++;
          sum++;
        }
      });

      const isFull = sum === 4;

      if (isFull && results.A >= 2) {
        return 'Сухая';
      }

      if (isFull && results.B >= 2) {
        return 'Жирная';
      }

      if (isFull && results.C >= 2) {
        return 'Комбинированная';
      }

      if (isFull && results.D >= 2) {
        return 'Нормальная';
      }

      return 'Не определена';
    });

    return {
      close,
      test,
      options,
      answers,
      typeOfSkin,
    };
  },
});
</script>
