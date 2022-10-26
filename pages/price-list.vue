<template>
    <NuxtLayout>
        <template #title>Процедуры и цены</template>

        <div
            v-for="category in priceList"
            :key="category.title"
            class="category mb-32"
        >
            <h2 :class="[!category.description && 'mb-16', 'category-title']">
                {{ category.title }}
            </h2>
            <div v-if="category.description" class="description h5 mb-16">
                {{ category.description }}
            </div>

            <div
                v-for="(brand, $index) in category.data"
                :key="$index"
                class="brand mb-16"
            >
                <h3 v-if="brand.title" class="brand-title mb-12">
                    {{ brand.title }}
                </h3>
                <div
                    v-for="procedure in brand.data"
                    :key="procedure.label"
                    class="row mb-16"
                >
                    <div class="label">
                        <h4>{{ procedure.label }}</h4>
                        <span
                            v-if="procedure.description"
                            class="description h5"
                        >
                            {{ procedure.description }}
                        </span>
                    </div>
                    <div class="price">{{ procedure.price }}</div>
                </div>
            </div>
        </div>

        <br />

        <Button type="button" @click="goTo('/form')" class="mb-16">
            Хочу записаться
        </Button>
        <Button outline @click="goToBack('/')">Назад</Button>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { goTo, goToBack } = useAnimatedRouter();

const priceList = computed(() => [
    {
        title: "Пилинг",
        data: [
            {
                title: "GIGI",
                data: [
                    {
                        label: "Мультипилинг Acnon",
                        price: "1 700",
                    },
                    {
                        label: "Молочный Nutri-Peptide",
                        price: "2 000",
                    },
                    {
                        label: "Миндальный Ester C",
                        price: "2 500",
                    },
                    {
                        label: "Срединный отбеливающий",
                        price: "3 000",
                    },
                    {
                        label: "Срединный Акнепил",
                        price: "3 000",
                    },
                    {
                        label: "Срединный Дермапил",
                        price: "3 000",
                    },
                ],
            },
            {
                title: "Renew System",
                data: [
                    {
                        label: "Salicylic Peel",
                        description: "Салициловый, анти-акне",
                        price: "1 500",
                    },
                    {
                        label: "M-Peel",
                        description: "Миндальный, для жирной кожи",
                        price: "1 500",
                    },
                    {
                        label: "L-Peel",
                        description: "Молочная кислота, увлажнение",
                        price: "1 600",
                    },
                    {
                        label: "Pyruvic Peel",
                        description: "Пировиноградный, увлажнение и обновление",
                        price: "1 600",
                    },
                    {
                        label: "Age-stop Peel",
                        description: "Антивозрастной",
                        price: "1 600",
                    },
                    {
                        label: "Jess Peel",
                        description: "Пилинг Джесснера",
                        price: "1 700",
                    },
                ],
            },
        ],
    },
    {
        title: "Чистка комбинированная",
        data: [
            {
                data: [
                    {
                        label: "Лицо",
                        price: "3 000",
                    },
                    {
                        label: "Спина",
                        price: "4 000",
                    },
                ],
            },
        ],
    },
    {
        title: "Биоревитализация",
        data: [
            {
                title: "REVI",
                data: [
                    {
                        label: "Silk 1мл / 2мл",
                        price: "9 000 / 11 000",
                    },
                    {
                        label: "Strong 1мл / 2мл",
                        price: "10 500 / 12 000",
                    },
                    {
                        label: "Eye 1мл",
                        price: "8 000",
                    },
                ],
            },
            {
                title: "HYALUAL",
                data: [
                    {
                        label: "1мл / 2мл",
                        price: "10 000 / 12 000",
                    },
                ],
            },
            {
                title: "Bellarti",
                data: [
                    {
                        label: "Hydrate 1мл / 2мл",
                        price: "8 000 / 10 000",
                    },
                    {
                        label: "Lift 1мл / 2мл",
                        price: "8 000 / 10 000",
                    },
                ],
            },
            {
                title: "Belotero",
                data: [
                    {
                        label: "Hydro 1мл",
                        price: "8 000",
                    },
                ],
            },
        ],
    },
    {
        title: "Мезотерапия",
        description:
            "Индивидуальный коктейль, анестезия и постпроцедурный уход включены в стоимость.",
        data: [
            {
                data: [
                    {
                        label: "Лицо",
                        price: "2 000",
                    },
                    {
                        label: "Голова",
                        description: "Волосистая часть головы",
                        price: "2 000 / 2 500",
                    },
                    {
                        label: "Липолитики",
                        price: "от 1 500",
                    },
                ],
            },
        ],
    },
    {
        title: "Контурная пластика губ",
        description: "Анестезия включена в стоимость.",
        data: [
            {
                data: [
                    {
                        label: "Belotero Lips 0.6мл",
                        description: "Германия",
                        price: "9 000",
                    },
                    {
                        label: "Neuramis Deep 1мл",
                        description: "Южная Корея",
                        price: "10 000",
                    },
                    {
                        label: "Stylage M 1мл",
                        description: "Франция",
                        price: "13 000",
                    },

                    {
                        label: "Juvederm Ultra 3 1мл",
                        description: "США",
                        price: "13 000",
                    },
                    {
                        label: "Juvederm Volift 1мл",
                        description: "США",
                        price: "14 000",
                    },
                ],
            },
        ],
    },
    {
        title: "Контурная пластика лица",
        data: [
            {
                data: [
                    {
                        label: "Скулы, углы нижней челюсти, подбородок",
                        price: "от 10 000",
                    },
                ],
            },
        ],
    },
]);
</script>

<style lang="scss" scoped>
.brand {
    padding-bottom: 1.6rem;
    border-bottom: 1px solid rgba($color-pink-700, 0.5);
}

.brand-title {
    font-weight: 400;
}

.row {
    display: flex;
    align-items: flex-start;
}

.label {
    flex: 1 1 50%;
}
</style>
