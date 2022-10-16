<template>
    <NuxtLayout>
        <template #title>Обо мне</template>

        <Button outline @click="goToBack('/')">Назад</Button>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { goToBack } = useAnimatedRouter();
</script>
