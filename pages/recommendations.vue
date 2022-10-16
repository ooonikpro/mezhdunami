<template>
    <NuxtLayout>
        <template #title>Рекомендации после процедур</template>

        <Button outline @click="goToBack('/')">Назад</Button>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { goToBack } = useAnimatedRouter();
</script>
