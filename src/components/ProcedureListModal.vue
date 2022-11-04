<template>
  <Modal :is-open="isOpen">
    <template #title>
      Выберите процедуру
    </template>

    <div class="mb-24">
      <div
        v-for="option in procedures"
        :key="option.id"
        class="mb-24 procedure"
        @click="toggle(option.id)"
      >
        <div class="procedure-checkbox">
          <Checkbox
            :model-value="isActive(option.id)"
            @update:modelValue="toggle(option.id)"
            @click.stop
          />
        </div>
        <div class="mb-24 procedure-head">
          <h3 class="mb-16 procedure-name">
            {{ option.name }}
          </h3>
          <span class="h4 procedure-footnote">
            {{ option.footnote }}
          </span>
          <span class="h4 procedure-duration">
            {{ option.duration }}
          </span>
        </div>
        <div class="h4 mb-24 procedure-body">
          <span
            v-for="(item, $index) in getDescription(option.data)"
            :key="$index"
          >
            {{ item }}
          </span>
        </div>
        <div class="procedure-footer">
          <span class="h2">{{ option.price }}</span>
          <span class="h4">рублей</span>
        </div>
      </div>
    </div>

    <StickyBottom :is-sticky="isSticky">
      <Button
        type="button"
        :disabled="isDisabledConfirmBtn"
        @click="confirm"
      >
        Подтвердить
      </Button>
    </StickyBottom>

    <Button
      outline
      small
      @click="close"
    >
      Отмена
    </Button>
  </Modal>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch, computed,
} from 'vue';
import Modal from '@/components/Modal.vue';
import Checkbox from '@/components/Checkbox.vue';
import StickyBottom from '@/components/StickyBottom.vue';
import Button from '@/components/Button.vue';
import { useProcedures } from '@/composables/useProcedures';

export default defineComponent({
  components: {
    Modal,
    Checkbox,
    StickyBottom,
    Button,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: Array as () => Procedure[],
      required: true,
    },
  },

  emits: ['close', 'update:modelValue'],

  setup(props, { emit }) {
    const { procedures } = useProcedures();

    const selected = ref<Procedure[]>([]);
    const isSticky = ref(false);

    watch(
      props.modelValue,
      () => {
        selected.value = (props.modelValue || []) as Procedure[];
      },
      { immediate: true },
    );

    const close = () => emit('close');
    const confirm = () => {
      emit('update:modelValue', selected.value);
      close();
      isSticky.value = false;
    };

    const isActive = (id: number) => (selected.value || []).includes(id);

    const toggle = (id: number) => {
      if (isActive(id)) {
        selected.value = selected.value.filter((item) => item !== id);
      } else {
        selected.value.push(id);
      }

      isSticky.value = true;
    };

    const getDescription = (arr: Array<{ data: Array<{ label: string }> }>) => arr.reduce((desc, { data }) => {
      data.forEach(({ label }) => desc.push(label));
      return desc;
    }, [] as string[]);

    const isDisabledConfirmBtn = computed(() => selected.value.length === 0);

    return {
      procedures,
      isSticky,
      isDisabledConfirmBtn,
      isActive,
      close,
      confirm,
      toggle,
      getDescription,
    };
  },
});
</script>

<style lang="scss" scoped>
  .procedure {
    cursor: pointer;
    display: grid;
    grid-template-areas:
      "checkbox head"
      "checkbox body"
      "checkbox body"
      "footer footer";
    grid-template-columns: 4.4rem 1fr;
    padding-bottom: 0.8rem;

    &:not(:last-child) {
      border-bottom: 1px solid $color-pink-700;
    }
  }

  .procedure-checkbox {
    width: 4.4rem;
    grid-area: checkbox;
  }

  .procedure-head {
    display: grid;
    justify-content: space-between;
    grid-area: head;
    grid-template-areas:
      "name name"
      "footnote duration";
    grid-template-columns: 1fr 1fr;
  }

  .procedure-footnote {
    grid-area: footnote;
  }

  .procedure-name {
    grid-area: name;
  }

  .procedure-duration {
    grid-area: duration;
    text-align: right;
  }

  .procedure-body {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    grid-area: body;
  }

  .procedure-footer {
    display: flex;
    flex-direction: column;
    grid-area: footer;
    text-align: right;
  }
</style>
