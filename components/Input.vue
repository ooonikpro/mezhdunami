<template>
    <label :class="{ disabled: props.disabled, focused, select: isSelect }">
        <span class="label h5">{{ props.label }}</span>

        <span v-if="isSelect" class="triangle" />

        <textarea
            v-if="inputType === 'textarea'"
            :placeholder="placeholder"
            :disabled="props.disabled"
            :readonly="isSelect"
            :maxlength="maxlength"
            @focus="onFocus"
            @blur="onBlur"
            v-model="value"
        />

        <input
            v-else
            :type="inputType"
            :placeholder="placeholder"
            :disabled="props.disabled"
            :readonly="isSelect"
            :maxlength="maxlength"
            @focus="onFocus"
            @blur="onBlur"
            v-model="value"
        />
    </label>
</template>

<script lang="ts" setup>
interface InputProps {
    type?: "text" | "select" | "tel";
    label: string;
    placeholder?: string;
    disabled?: boolean;
    modelValue?: string;
}

const props = defineProps<InputProps>();

const emit = defineEmits(["update:modelValue"]);

const isSelect = computed(() => props.type === "select");
const focused = ref(false);

const value = computed({
    get() {
        return props.modelValue;
    },

    set(val: string) {
        emit("update:modelValue", val);
    },
});

const onFocus = () => {
    focused.value = true;
};

const onBlur = () => {
    focused.value = false;

    if (props.type === "tel" && value.value) {
        value.value = value.value
            .replace(/\D/g, "")
            .split("")
            .reduce((p, n) => p.replace("x", n), "+x (xxx) xxx xx-xx");
    }
};

const inputType = computed(() => {
    if (props.type === "select") return "text";

    return props.type;
});

const maxlength = computed(() => {
    if (props.type === "tel") return 12;

    return null;
});
</script>

<style lang="scss" scoped>
label {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid rgba($color-pink-700, 0.25);
    border-radius: 4px;
    padding: 1rem 0 0 1.2rem;
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
    width: 100%;
    font-weight: 300;
    margin-bottom: 1.2rem;
}

textarea,
input {
    flex: 1 1 auto;
    border: 0;
    outline: none;
    color: $color-pink-700;
    background: none;
    font-size: 1.8rem;
    padding-bottom: 1rem;
    padding-right: 1.2rem;
    box-sizing: content-box;

    &::placeholder {
        color: rgba($color-pink-700, 0.5);
    }
}

input {
    height: 2.4rem;
    line-height: 2.4rem;
}

textarea {
    min-height: 2.4rem;
}

.triangle {
    width: 1.2rem;
    height: 0.8rem;
    margin-right: 0.8rem;
    background: url("@/assets/img/triangle.svg");
    background-repeat: no-repeat;
    background-size: contain;
}
</style>
