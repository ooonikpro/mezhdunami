<template>
  <Modal :is-open="isOpen">
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

          <div class="h4 procedure-duration">
            <span>Продолжительность:</span> {{ option.duration }}
          </div>
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
  </Modal>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch, computed, PropType,
} from 'vue';
import Modal from '@/components/Modal.vue';
import Checkbox from '@/components/Checkbox.vue';
import StickyBottom from '@/components/StickyBottom.vue';
import Button from '@/components/Button.vue';
import { useProcedures } from '@/composables/useProcedures';
import { Procedure } from '@/constants';

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
      type: Array as PropType<Procedure[]>,
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
    display: flex;
    padding: 0.8rem;

    &:not(:last-child) {
        border-bottom: 1px solid rgba($color-pink-700, .25);
    }
}

.procedure-checkbox {
    width: 4.4rem;
}

.procedure-head {
    display: flex;
    flex-direction: column;
}

.procedure-duration span {
  opacity: 0.75;
}
</style>
