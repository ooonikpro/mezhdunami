<template>
    <div class="carousel">
        <div class="carousel-container mb-8">
            <div class="carousel-content">
                <img src="@/assets/img/diploma-1.jpg" alt="" loading="lazy" />
            </div>
            <div class="carousel-prev-btn" @click="setPrev"></div>
            <div class="carousel-next-btn" @click="setNext"></div>
        </div>

        <div class="carousel-dots">
            <div
                v-for="(slide, $index) in props.slides"
                :key="slide.src"
                :class="{ active: $index === activeSlideIndex }"
                class="carousel-dot"
                @click="setActive($index)"
            ></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface CarouselProps {
    slides: string[];
}

const props = defineProps<CarouselProps>();

const activeSlideIndex = ref<number>(0);
const activeSlide = computed(() => props.slides?.[activeSlideIndex.value]);

const setActive = (index: number) => {
    activeSlideIndex.value = index;
};
const setPrev = () => {
    if (activeSlide.value > 0) {
        return setActive(activeSlideIndex.value - 1);
    }

    setActive(props.slides.length - 1);
};
const setNext = () => {
    if (activeSlideIndex.value < props.slides.length - 1) {
        return setActive(activeSlideIndex.value + 1);
    }

    setActive(0);
};
</script>

<style lang="scss" scoped>
.carousel {
    position: relative;
    width: 100%;
}

.carousel-container {
    position: relative;
    width: 100%;
    padding-top: 60%;
    border-radius: 4px;
    border: 1px solid rgba($color-pink-700, 0.25);
    overflow: hidden;
}

.carousel-prev-btn,
.carousel-content,
.carousel-next-btn {
    position: absolute;
    top: 0;
    bottom: 0;
}

.carousel-prev-btn {
    left: 0;
    width: 50%;
}

.carousel-next-btn {
    right: 0;
    width: 50%;
}

.carousel-content {
    left: 0;
    right: 0;
    border: 1px solid $color-white;
    border-radius: 4px;
    background-color: rgba($color-pink-700, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

img {
    max-width: 100%;
    max-height: 100%;
}

.carousel-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
}

.carousel-dot {
    width: 1.6rem;
    height: 0.4rem;
    background-color: $color-pink-700;
    opacity: 0.25;
    border-radius: 4px;
    @include transition;

    &.active {
        width: 12rem;
        opacity: 0.5;
    }
}
</style>
