<template>
    <div class="movie-card">
        <img :src="movie.cover" :alt="movie.name" class="movie-cover" />
        <div class="movie-details">
            <h2 class="movie-title">{{ movie.name }}</h2>
            <p class="movie-rating">Average Rating: {{ movie.averageRating != null
                ? parseFloat(movie.averageRating.toFixed(2))
                : "N/A" }} ⭐</p>
            <StarRating :rating="myRating ?? 0" :setRating="setRating" />
            <p>Description: {{ movie.description }}</p>
            <button class="unselect-button" @click="onMovieUnselected">Back to all movies</button>
        </div>
    </div>
</template>

<script>
import StarRating from "./StarRating.vue";
import { mapState } from "pinia";
import { userStore } from "../stores/userStore";
import { where, query, collection, getDocs, orderBy, connectFirestoreEmulator, addDoc, updateDoc, doc } from "firebase/firestore";
import db from "../firebase/init";

export default {
    name: "MovieDetail",
    components: {
        StarRating,
    },
    props: {
        // TODO query movie from movie id instead
        movie: {
            type: Object,
            required: true,
        },
        onMovieUnselected: {
            type: Function,
            required: true,
        },
        onMovieUnselected: {
            type: Function,
            required: true,
        },
        refetchMovieData: {
            type: Function,
            required: true,
        },
    },
    computed: {
        ...mapState(userStore, ["getUserId"]),
    },
    data() {
        return {
            myRatingId: null,
            myRating: null,
        };
    },
    methods: {
        async setRating(rating) {
            if (this.getUserId == null) {
                alert("Please log in to rate!");
                return;
            }
            if (this.myRatingId == null || this.myRatingId == "") {
                // create
                const docRef = await addDoc(collection(db, "ratings"), {
                    user_id: this.getUserId,
                    movie_id: this.movie.id,
                    rating: rating,
                });
                this.myRatingId = docRef.id;
            } else {
                // update
                const ratingDocRef = doc(db, "ratings", this.myRatingId);
                await updateDoc(ratingDocRef, { rating: rating });
            }
            this.myRating = rating;
            await this.refetchMovieData();
        },
        async queryMyRating() {
            if (this.getUserId == null) {
                return;
            }
            const userid = this.getUserId;
            const movieid = this.movie.id;
            const myRatingQuery = query(collection(db, "ratings"), where("user_id", "==", userid), where("movie_id", "==", movieid));
            const myRatingSnap = await getDocs(myRatingQuery);
            if (myRatingSnap.empty) {
                return;
            }
            const myRatingDoc = myRatingSnap.docs[0];
            this.myRating = myRatingDoc.data()["rating"];
            this.myRatingId = myRatingDoc.id;
        },
    },
    created() {
        this.queryMyRating();
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
    margin: 0 auto;
    background-color: white;
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
    font-size: 22px;
    font-weight: bold;
    margin: 8px 0;
    color: #333;
}

.movie-rating {
    font-size: 18px;
    color: #555;
}

.unselect-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 12px 20px;
    cursor: pointer;
    margin-top: 16px;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.2s;
}

.unselect-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}
</style>
