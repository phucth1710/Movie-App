<script>
import { RouterLink, RouterView } from "vue-router";

export default {
    name: "App",
    components: {
        RouterLink,
        RouterView,
    },
};
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <!-- <RouterLink to="/my-movies">My Movies</RouterLink> -->
            <RouterLink to="/add-movie">Add Movie</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/login">Login/Signup</RouterLink>
        </nav>
    </header>
    <RouterView />
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f9f9f9;
    color: #333;
}

header {
    background-color: #4caf50;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
    display: flex;
    justify-content: center;
    gap: 20px;
}

nav a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

nav a:hover {
    background-color: white;
    color: #4caf50;
}

nav a.router-link-active {
    background-color: white;
    color: #4caf50;
    border: 2px solid #4caf50;
}

main {
    padding: 20px;
    max-width: 900px;
    margin: 0 auto;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
</style>
