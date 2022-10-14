<template>
    <NuxtLayout>
        <template #title>Редактирование прайс листа</template>

        <form @submit.prevent="onSubmit">
            <Input label="Name" placeholder="Пилинг" v-model="form.name" />
            <Input
                label="Footnote"
                placeholder="GiGi"
                v-model="form.footnote"
            />
            <Input
                label="Duration"
                placeholder="1 час"
                v-model="form.duration"
            />
            <Input
                label="Price"
                placeholder="1500 - 3000"
                v-model="form.price"
            />

            <Input
                type="textarea"
                label="Description"
                placeholder="Классные масочки и все такое"
                v-model="form.description"
            />

            <Button type="submit">Добавить</Button>
        </form>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const form = reactive({
    name: "",
    footnote: "",
    duration: "",
    price: "",
    description: "",
});

const onSubmit = async () => {
    const keys = Object.keys(form);
    const isValid = Object.values(form).every(Boolean);

    if (isValid) {
        await fetch("/api/procedures", {
            method: "POST",
            headers: {
                ContentType: "application/json",
            },
            body: JSON.stringify(form),
        });

        alert("Процедура успешно добавлена!");
    }

    keys.forEach((key) => (form[key] = ""));
};
</script>
