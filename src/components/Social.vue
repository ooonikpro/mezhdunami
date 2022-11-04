<template>
  <div class="social">
    <a
      href="https://t.me/lensem"
      class="h-64 social-btn telegram"
      :class="{ bordered }"
      rel="noreferrer noopener"
    />
    <a
      href="https://www.instagram.com/cosmo.kld"
      class="h-64 instagram social-btn"
      :class="{ bordered }"
      rel="noreferrer noopener"
    />
    <a
      href="https://wa.me/79141939603"
      class="h-64 social-btn whats-app"
      :class="{ bordered }"
      rel="noreferrer noopener"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      bordered: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>

<style lang="scss" scoped>
  .social {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .social-btn {
    height: 6.4rem;
    flex: 1 1 auto;
    border-radius: 4px;
    background-color: rgba($color-white, 0.3);
    border: 1px solid rgba($color-pink-300, 0.6);
    outline: none;
    text-decoration: none;
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0.8rem 1.2rem;
    background-repeat: no-repeat;
    background-position: calc(100% - 0.8rem) 0.8rem;

    &.telegram,
    &.instagram,
    &.whats-app {
      background-position: center;
      background-size: 5rem;
    }

    &.telegram {
      background-image: url("@/assets/img/telegram.svg");
    }

    &.instagram {
      background-image: url("@/assets/img/instagram.svg");
    }

    &.whats-app {
      background-image: url("@/assets/img/whats-app.svg");
    }

    &.bordered {
      border-color: $color-pink-700;
    }
  }
</style>
