<template>
    <div class="star-rating">
        <span v-for="star in 5" :key="star" :class="{ filled: star <= rating }" class="star" @click="setRating(star)"> ★ </span>
    </div>
</template>

<script>
export default {
    name: "StarRating",
    props: {
        rating: {
            type: Number,
            default: 0,
            required: true,
        },
        setRating: {
            type: Function,
            required: true,
        },
    },
};
</script>

<style scoped>
.star-rating {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 24px;
    cursor: pointer;
}

.star {
    color: #ddd;
    transition: color 0.2s;
}

.star.filled {
    color: #f5c518; /* Gold color for filled stars */
}
</style>
