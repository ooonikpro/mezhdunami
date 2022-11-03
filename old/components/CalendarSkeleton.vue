<template>
    <div class="calendar-skeleton">
        <div v-for="item in 3" :key="item" class="calendar-skeleton-column">
            <div class="calendar-skeleton-slots">
                <div
                    v-for="slot in 8"
                    :key="slot"
                    class="calendar-skeleton-slot"
                >
                    <div class="calendar-skeleton-slot-time"></div>
                    <div class="calendar-skeleton-slot-status"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.calendar-skeleton {
    display: flex;
    gap: 1.2rem;
    animation: skeleton 3s ease infinite;
}

.calendar-skeleton-column {
    flex: 0 0 auto;
    width: 20rem;
    padding-top: 5.2rem;
}

.calendar-skeleton-slots {
    border-radius: 4px;
    border: 1px solid rgba($color-pink-700, 0.25);
}

.calendar-skeleton-slot {
    display: flex;
    height: 5rem;
    border-top: 1px solid transparent;

    &:not(:last-child) {
        border-bottom: 1px solid rgba($color-pink-700, 0.25);
    }
}

.calendar-skeleton-slot-time {
    display: flex;
    align-items: flex-end;
    flex: 0 0 auto;
    width: 6rem;
    height: 5rem;
    color: rgba($color-pink-700, 0.5);
    padding: 0.4rem;
    @include transition;
}

.calendar-skeleton-slot-status {
    flex: 1 1 auto;
    padding: 0.4rem;
    background-color: rgba($color-pink-700, 0.1);
}

@keyframes skeleton {
    50% {
        opacity: 0.5;
    }
}
</style>
