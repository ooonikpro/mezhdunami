<template>
  <NuxtLayout with-gradient>
    <div class="home-page">
      <Logo class="logo" />

      <nav>
        <a href="#" class="media-btn h-64 telegram"></a>
        <a href="#" class="media-btn h-64 instagram"></a>
        <a href="#" class="media-btn h-64 whats-app"></a>

        <a href="#" class="media-btn h-64 full-width">
          <span class="caption">Процедуры</span>
          <span class="footnotes">Цены</span>
        </a>

        <a href="#" class="media-btn h-64 full-width action-btn i-calendar">
          <span class="caption large">Записаться</span>
        </a>

        <a href="#" class="media-btn h-128 full-width action-btn i-catalog">
          <span class="caption">
            Профессиональная <br />
            косметика
          </span>
        </a>

        <a href="#" class="media-btn h-64 full-width">
          <span class="caption">Рекомендации</span>
          <span class="footnotes">После процедур</span>
        </a>

        <a href="#" class="media-btn h-64 full-width">
          <span class="caption">Обо мне</span>
          <span class="footnotes">Сертификаты Контакты</span>
        </a>
      </nav>

      <div class="profile">
        <img
          src="@/assets/img/doctor.png"
          loading="lazy"
          alt="Овечкина Елена Максимовна"
          class="photo"
        />

        <div class="profile-details">
          <span class="footnotes">Твой доктор</span>
          <p class="caption">Овечкина</p>
          <p>Елена Максимовна</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.home-page {
  padding: 3.5rem 2.7rem 10rem 2.7rem;
}

.logo {
  margin-bottom: 2.4rem;
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
  border: 1px solid rgba($color-pink-300, 0.5);
  outline: none;
  text-decoration: none;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0.8rem 1.2rem;

  &.action-btn {
    background-color: $color-white;
    background-repeat: no-repeat;
    background-position: calc(100% - 0.8rem) 0.8rem;

    &.i-calendar {
      background-image: url("@/assets/img/i-calendar.svg");
    }

    &.i-catalog {
      background-image: url("@/assets/img/i-catalog.svg");
    }
  }

  &.full-width {
    width: 100%;
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

.caption {
  &:not(.large) {
    font-size: 2.4rem;
    font-weight: 300;
    line-height: 1.1;
  }

  &.large {
    font-size: 3.2rem;
    font-weight: 300;
  }
}

.footnotes {
  font-size: 1.4rem;
  font-weight: 200;
  line-height: 1.1;
}

.profile {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.photo {
  width: 12.8rem;
}

.profile-details {
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 1.8rem;
  line-height: 1.1;
}
</style>
