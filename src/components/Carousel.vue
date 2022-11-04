<template>
  <div class="carousel">
    <div class="carousel-container mb-8">
      <div class="carousel-content">
        <transition
          name="fade-in"
          mode="out-in"
        >
          <img
            v-for="slide in slidesCount"
            :key="slide"
            :src="require(`@/assets/img/diploma-${slide}.jpg`)"
            alt=""
            loading="lazy"
          >
        </transition>
      </div>
      <div
        class="carousel-prev-btn"
        @click="setPrev"
      />
      <div
        class="carousel-next-btn"
        @click="setNext"
      />
    </div>

    <div class="carousel-dots">
      <div
        v-for="$index in slidesCount"
        :key="$index"
        :class="{ active: $index === activeSlideIndex }"
        class="carousel-dot"
        @click="setActive($index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    setup() {
      const activeSlideIndex = ref<number>(1);
      const slidesCount = 9;

      const setActive = (index: number) => {
        activeSlideIndex.value = index;
      };
      const setPrev = () => {
        if (activeSlideIndex.value > 2) {
          return setActive(activeSlideIndex.value - 1);
        }

        setActive(9);
      };
      const setNext = () => {
        if (activeSlideIndex.value < 9) {
          return setActive(activeSlideIndex.value + 1);
        }

        setActive(1);
      };

      return {
        slidesCount,
        activeSlideIndex,
        setPrev,
        setNext,
        setActive,
      };
    },
  });
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
    cursor: pointer;
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
    cursor: pointer;
    @include transition;
    transform-origin: center;

    &.active {
      width: 12rem;
      opacity: 0.5;
    }
  }

  .fade-in-enter-active,
  .fade-in-leave-active {
    @include transition;
  }

  .fade-in-enter-from,
  .fade-in-leave-to {
    opacity: 0;
  }
</style>
