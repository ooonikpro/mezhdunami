<template>
    <label :class="{ disabled: props.disabled, focused, select: isSelect }" class="input">
        <span class="label h5">{{ props.label }}</span>

        <IconTriangle v-if="isSelect" class="triangle"/>

        <input
            :type="inputType"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            :readonly="isSelect"
            :maxlength="props.maxlength"
            @focus="onFocus"
            @blur="onBlur"
            v-model="value"
        />

        <IconValid v-if="!props.disabled && isValid" class="status-valid"/>
    </label>
</template>

<script lang="ts" setup>
interface InputProps {
    type?: "text" | "select" | "tel";
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    modelValue?: string;
    maxlength?: number;
    validator?: (value: string) => boolean;
    transform?: (value: string) => any;
}

const props = defineProps<InputProps>();
const emit = defineEmits(["update:modelValue", "focus", "blur"]);

const isSelect = computed(() => props.type === "select");
const focused = ref(false);
const isValid = computed(() => {
    const validator = props.validator || ((v) => !!v);

    return validator(value.value);
})

const value = computed({
    get() {
        return props.modelValue;
    },

    set(val: string) {
        const transform = props.transform || ((v) => v);

        emit("update:modelValue", transform(val));
    },
});

const onFocus = () => {
    focused.value = true;
    emit('focus');
};

const onBlur = () => {
    focused.value = false;

    emit('blur');
};

const inputType = computed(() => {
    if (props.type === "select") return "text";

    return props.type;
});
</script>

<style lang="scss" scoped>
.input {
    position: relative;
    width: 100%;
    height: 8rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid rgba($color-pink-700, 0.25);
    border-radius: 4px;
    background-color: rgba($color-white, 0.2);
    margin-bottom: 2.4rem;
    @include transition;

    &.focused {
        border-color: $color-pink-700;
    }

    &.select {
        &,
        * {
            cursor: pointer;
        }

        input {
            padding-left: 3.2rem;
        }
    }

    &.disabled {
        opacity: 0.5;

        &,
        * {
            cursor: not-allowed;
        }
    }
}

.label {
    position: absolute;
    top: 1rem;
    left: 1.2rem;
    width: 100%;
    font-weight: 300;
    margin-bottom: 1.2rem;
}

input {
    display: flex;
    align-items: flex-end;
    flex: 1 1 auto;
    height: 100%;
    border: 0;
    outline: none;
    color: $color-pink-700;
    background: none;
    font-size: 1.8rem;
    padding: 4.5rem 4rem 1rem 1.2rem;
    text-overflow: ellipsis;

    &::placeholder {
        color: rgba($color-pink-700, 0.5);
    }
}

.triangle {
    position: absolute;
    bottom: 1.6rem;
    left: 1.2rem;
    width: 1.2rem;
    height: 0.8rem;
    margin-right: 0.8rem;
}

.status-valid {
    position: absolute;
    bottom: 1.6rem;
    right: 1.2rem;
}
</style>
