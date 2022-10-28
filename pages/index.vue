<template>
    <NuxtLayout with-gradient>
        <nav>
            <a href="https:/t.me/lensem" class="media-btn h-64 telegram"></a>
            <a
                href="https://www.instagram.com/cosmo.kld"
                class="media-btn h-64 instagram"
            ></a>
            <a
                href="https://wa.me/79141939603"
                class="media-btn h-64 whats-app"
            ></a>

            <a
                href="/price-list"
                class="media-btn h-64 full-width"
                @click.prevent="goTo('/price-list')"
            >
                <span class="h3">Прайс-лист</span>
                <span class="h5">Цены</span>
            </a>

            <a
                href="/form"
                class="media-btn h-64 full-width action-btn i-calendar"
                @click.prevent="goTo('/form')"
            >
                <span class="h2">Записаться</span>
            </a>

            <a
                href="https:/t.me/lensem"
                class="media-btn h-128 full-width i-catalog"
            >
                <span class="h3">Заказать <br />домашний уход</span>
            </a>

            <a
                href="#"
                class="media-btn h-64 full-width"
                @click.prevent="goTo('/recommendations')"
            >
                <span class="h3">Рекомендации</span>
                <span class="h5">После процедур</span>
            </a>

            <a
                href="#"
                class="media-btn h-64 full-width"
                @click.prevent="goTo('/about')"
            >
                <span class="h3">Обо мне</span>
                <span class="h5">Дипломы Контакты</span>
            </a>
        </nav>

        <div class="profile">
            <img
                src="@/assets/img/doctor.png"
                loading="lazy"
                alt="Овечкина Елена Максимовна"
                class="photo"
            />

            <DoctorDetails />
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { goTo } = useAnimatedRouter();
</script>

<style lang="scss" scoped>
.home-page {
    padding: 3.5rem 2.7rem 10rem 2.7rem;

    @include fullscreen {
        padding-top: 2rem;
        padding-bottom: 3.5rem;
    }
}

nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 2.4rem;
}

.media-btn {
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

    &.action-btn {
        background-color: $color-white;
    }

    &.i-calendar {
        background-image: url("@/assets/img/i-calendar.svg");
    }

    &.i-catalog {
        background-image: url("@/assets/img/i-catalog.svg");
    }

    &.full-width {
        width: 100%;
    }

    &.h-80 {
        height: 8rem;
    }
    &.h-64 {
        height: 6.4rem;
    }

    &.h-128 {
        height: 12.8rem;
    }

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
}

.h6 {
    font-size: 1.1rem;
}

.profile {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}

.photo {
    width: 12.8rem;
    height: 12.8rem;
    border-radius: 12.8rem;
}
</style>
