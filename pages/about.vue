<template>
    <NuxtLayout>
        <template #title>Обо мне</template>

        <section class="head mb-16">
            <img
                src="@/assets/img/doctor-1.png"
                alt="Овечкина Елена Максимовна"
                class="doctor-picture"
                loading="lazy"
            />
            <DoctorDetails class="mb-8" />
        </section>

        <section class="body mb-16">
            <p class="color-black mb-16">
                С детства любая женщина мечтает быть красивой и хорошо выглядеть
                и до самого зрелого возраста хочет оставаться молодой, красивой
                и сексуальной.
            </p>

            <p class="mb-16"><i>Косметология - территория красоты.</i></p>

            <p class="color-black mb-16">
                Мне трудно представить себя в другой сфере медицины. Мне всегда
                хотелось помочь людям устранить эстетические недостатки,
                повысить самооценку, помочь полюбить себя.
            </p>

            <p class="color-black mb-16">
                Еще один огромный плюс косметологии - бесконечное развитие.
                Каждый год появляются новые методы сохранения молодости и
                красоты. Это дает стимул совершенствовать свои знания.
            </p>

            <p class="mb-16">
                <i>
                    Как бы я себя охарактеризовала? <br />
                    Я — врач-косметолог с чувством меры.
                </i>
            </p>

            <p class="color-black mb-16">
                Принцип моей работы - честность и чуткость по отношению к
                пациенту.
            </p>

            <p class="color-black mb-24">
                Я внимательно выслушаю все Ваши пожелания и предложу самый
                безопасный и эффективный метод решения проблемы.
            </p>
        </section>

        <section>
            <h3 class="mb-16">Дипломы и сертификаты</h3>

            <Carousel :slides="diplomas" class="mb-16" />
        </section>

        <Button outline small @click="goToBack('/')">Назад</Button>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { goToBack } = useAnimatedRouter();

const diplomas = [];
</script>

<style lang="scss" scoped>
section {
    border-bottom: 1px solid rgba($color-pink-700, 0.25);
}

.head {
    position: relative;
    height: 14rem;
    display: flex;
    align-items: flex-end;
}

.body {
    font-weight: 400;
}

.doctor-picture {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: scale(0.6);
    transform-origin: bottom right;
}
</style>
