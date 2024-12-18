<script>
import MovieCard from "../components/MovieCard.vue";
import MovieDetail from "../components/MovieDetail.vue";
import { where, query, collection, getDocs, orderBy } from "firebase/firestore";
import db from "../firebase/init";
import { mapState } from "pinia";
import { userStore } from "../stores/userStore";

export default {
    name: "AllMovieView",
    components: {
        MovieCard,
        MovieDetail,
    },
    data() {
        return {
            movies: [],
            selectedMovieId: null,
        };
    },
    computed: {
        selectedMovie() {
            return this.movies.find((movie) => movie.id === this.selectedMovieId);
        },
        anyMovieSelected() {
            return this.selectedMovieId == null;
        },
        ...mapState(userStore, ["getUserId"]),
    },
    methods: {
        setSelectedMovie(selected) {
            this.selectedMovieId = selected;
        },
        unselectMovie() {
            this.selectedMovieId = null;
        },
        async getMovies() {
            const movieQuery = query(collection(db, "movies"), orderBy("name"));
            const movieQuerySnap = await getDocs(movieQuery);
            const movies = [];
            movieQuerySnap.forEach((doc) => {
                movies.push({ ...doc.data(), id: doc.id, averageRating: null, countRating: 0 });
            });
            this.movies = movies;

            const ratingQuery = query(collection(db, "ratings"));
            const ratingQuerySnap = await getDocs(ratingQuery);
            let ratingData = [];
            ratingQuerySnap.forEach((doc) => ratingData.push(doc.data()));

            this.movies = this.movies.map((movie) => {
                const movieId = movie.id;
                const thisMovieRating = ratingData.filter((e) => e["movie_id"] === movieId);
                if (thisMovieRating.length === 0) {
                    return movie;
                }
                if (this.getUserId != null) {
                    const myRating = thisMovieRating.find((e) => e["user_id"] === this.getUserId);
                    movie["myRating"] = myRating?.rating;
                }
                movie["countRating"] = thisMovieRating.length;
                movie["averageRating"] = thisMovieRating.map((e) => e["rating"]).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / thisMovieRating.length;
                return movie;
            });
        },
    },
    created() {
        this.getMovies();
    },
    // watch: {
    //     getUserId(newVal, oldVal) {
    //         if (newVal !== oldVal) {
    //             this.getMovies();
    //         }
    //     },
    // },
};
</script>

<template>
    <main>
        <div v-if="anyMovieSelected">
            <div class="watching-movie-list">
                <div class="movie-list">
                    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" :onMovieSelected="setSelectedMovie" />
                </div>
            </div>
        </div>
        <div v-else>
            <MovieDetail :movie="selectedMovie" :onMovieUnselected="unselectMovie" :refetchMovieData="getMovies" />
        </div>
    </main>
</template>

<style scoped>
.watching-movie-list {
    margin: 0 auto;
    padding: 16px;
    text-align: center;
}
.movie-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
