<template>
  <Modal :is-open="isOpen">
    <template #title>
      Выберите процедуру
    </template>

    <div class="mb-24">
      <div
        v-for="option in procedures"
        :key="option.id"
        class="procedure mb-24"
        @click="toggle(option.id)"
      >
        <div class="procedure-checkbox">
          <Checkbox
            :model-value="isActive(option.id)"
            @update:modelValue="toggle(option.id)"
            @click.stop
          />
        </div>
        <div class="procedure-head mb-24">
          <h3 class="procedure-name mb-16">
            {{ option.name }}
          </h3>

          <div class="procedure-duration h4">
            <span>Продолжительность:</span> {{ option.duration }}
          </div>
        </div>
      </div>
    </div>

    <StickyBottom :is-sticky="isSticky">
      <Button
        type="button"
        :disabled="selected.length === 0"
        @click="confirm"
      >
        Подтвердить
      </Button>
    </StickyBottom>

    <Button outline small @click="close">
      Отмена
    </Button>
  </Modal>
</template>

<script lang="ts" setup>
const props = defineProps<{ isOpen: boolean; modelValue: number[] | null }>();
const emit = defineEmits(['close', 'update:modelValue']);
const { procedures } = useProcedures();

const selected = ref([]);
const isSticky = ref(false);

watch(
  props.modelValue,
  () => {
    selected.value = props.modelValue || [];
  },
  { immediate: true }
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
    selected.value = selected.value.filter(item => item !== id);
  } else {
    selected.value.push(id);
  }

  isSticky.value = true;
};
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
