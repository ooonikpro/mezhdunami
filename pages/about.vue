<template>
    <NuxtLayout>
        <template #title>Обо мне</template>

        <div class="head mb-16">
            <img
                src="@/assets/img/doctor-1.png"
                alt="Овечкина Елена Максимовна"
                class="doctor-picture"
            />
            <DoctorDetails class="mb-8" />
        </div>

        <div class="body mb-24">
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
        </div>

        <Button outline @click="goToBack('/')">Назад</Button>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { goToBack } = useAnimatedRouter();
</script>

<style lang="scss" scoped>
.head {
    position: relative;
    height: 14rem;
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid rgba($color-pink-700, 0.25);
}

.body {
    font-weight: 400;
    border-bottom: 1px solid rgba($color-pink-700, 0.25);
}

.doctor-picture {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: scale(0.6);
    transform-origin: bottom right;
}
</style>
