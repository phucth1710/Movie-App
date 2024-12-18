<template>
    <div class="movie-card">
        <img :src="movie.cover" :alt="movie.name" class="movie-cover" @click="handleClick" />
        <div class="movie-details">
            <h2 class="movie-title">{{ movie.name }}</h2>
            <p class="movie-rating">Average Rating: {{ movie.averageRating != null
                ? parseFloat(movie.averageRating.toFixed(2))
                : "N/A" }} ⭐</p>
            <p class="movie-rating">My Rating: {{ movie.myRating ?? "N/A" }} ⭐</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "MovieCard",
    props: {
        movie: {
            type: Object,
            required: true,
        },
        onMovieSelected: {
            type: Function,
            required: true,
        },
    },
    methods: {
        handleClick() {
            this.onMovieSelected(this.movie.id);
        },
    },
};
</script>

<style scoped>
.movie-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    width: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.movie-card:hover {
    transform: translateY(-5px);
    cursor: pointer;
}

.movie-cover {
    width: 100%;
    height: auto;
}

.movie-details {
    padding: 16px;
    text-align: center;
}

.movie-title {
    font-size: 18px;
    margin: 8px 0;
}

.movie-rating {
    font-size: 16px;
    color: #555;
}
</style>
