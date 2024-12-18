<script>
import { where, query, collection, getDocs, orderBy, addDoc } from "firebase/firestore";
import db from "../firebase/init";

export default {
    name: "AddMovieView",
    data() {
        return {
            movieName: "",
            coverImageUrl: "",
            description: "",
        };
    },
    methods: {
        isValidURL(url) {
            try {
                new URL(url);
                return true;
            } catch (e) {
                return false;
            }
        },
        async saveMovie() {
            console.log("Movie Name:", this.movieName);
            console.log("Cover Image URL:", this.coverImageUrl);
            console.log("Description:", this.description);
            if (this.coverImageUrl == null || this.coverImageUrl == "" || !this.isValidURL(this.coverImageUrl)) {
                alert(
                    "Invalid Cover Image URL! The image cannot be empty and has to be valid, for example: \nhttps://m.media-amazon.com/images/M/MV5BZjgzY2QyNzItNDhhYi00ZWIwLWFjN2UtZDJkN2MxYWNjMmJjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
                );
                return;
            }
            if (this.movieName == null || this.movieName == "") {
                alert("Name cannot be empty");
                return;
            }
            const movie = {
                name: this.movieName,
                cover: this.coverImageUrl,
                description: this.description,
            };
            const docRef = await addDoc(collection(db, "movies"), movie);
            alert(`Movie with ref id ${docRef.id} added successfully. Redirecting you to home page`);
            // Redirects to the home page
            this.$router.push("/");
        },
    },
};
</script>

<template>
    <main>
        <div>
            <label for="movieName">Name:</label>
            <input type="text" id="movieName" v-model="movieName" placeholder="Enter movie name" />

            <label for="coverImageUrl">Cover Image URL:</label>
            <input type="text" id="coverImageUrl" v-model="coverImageUrl" placeholder="Enter cover image URL" />

            <label for="description">Description:</label>
            <textarea id="description" v-model="description" placeholder="Enter movie description"></textarea>

            <button @click="saveMovie">Save</button>
        </div>
    </main>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
    gap: 15px;
}

label {
    font-weight: bold;
}

input,
textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    width: 100%;
}

textarea {
    resize: vertical;
    height: 100px;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

button:hover {
    background-color: #0056b3;
}
</style>
