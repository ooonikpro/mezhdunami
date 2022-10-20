<template>
    <NuxtLayout>
        <template #title>Рекомендации после процедур</template>

        <div class="recommedation-list">
            <Accordion class="mb-24">
                <template #title>После легкого пилинга</template>

                <template #default>
                    <ol>
                        <li>
                            Воздерживаться от контактов с водой и прямых
                            солнечных лучей в течение суток.
                        </li>
                        <li>Избегать прикосновений к лицу.</li>
                        <li>
                            Сокращать время нахождения на улице и использовать
                            SPF защиту.
                        </li>
                        <li>Пить много жидкости.</li>
                        <li>
                            Можно использовать легкие муссы и пенки, а
                            декоративную косметику можно вводить уже на 4 день.
                        </li>
                        <li>
                            Лучше отказаться от физических нагрузок, посещения
                            бань и саун, а также сильных очищающих средств и
                            масок.
                        </li>
                    </ol>
                </template>
            </Accordion>
        </div>

        <Button outline @click="goToBack('/')">Назад</Button>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { goToBack } = useAnimatedRouter();
</script>
