<script>
import { userStore } from "../stores/userStore";
import { mapState, mapActions } from "pinia";

export default {
    name: "LoginView",
    data() {
        return {
            username: "",
        };
    },
    computed: {
        ...mapState(userStore, ["getUserId", "getUsername"]),
    },
    methods: {
        ...mapActions(userStore, ["login", "logout", "signup"]),
        handleLogin() {
            if (this.username.trim()) {
                this.login(this.username.trim());
                this.username = "";
            } else {
                alert("Please enter a User ID.");
            }
        },
        handleSignup() {
            if (this.username.trim()) {
                this.signup(this.username.trim());
                this.username = "";
            } else {
                alert("Please enter a User ID.");
            }
        },
    },
};
</script>

<template>
    <main>
        <div class="login-container">
            <div v-if="getUserId != null" class="welcome-section">
                <p class="welcome-text">Welcome, {{ getUsername }}</p>
                <button class="logout-button" @click="logout">Logout</button>
            </div>
            <div v-else class="login-section">
                <input type="text" v-model="username" placeholder="Enter User Name" class="input-field" />
                <button class="login-button" @click="handleLogin">Login</button>
                <button class="signup-button" @click="handleSignup">Sign Up</button>
            </div>
        </div>
    </main>
</template>

<style scoped>
.login-container {
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
}

.login-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input-field {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
}

.login-button,
.signup-button {
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

.login-button {
    background-color: #4caf50;
}

.login-button:hover {
    background-color: #45a049;
}

.signup-button {
    background-color: #007bff;
}

.signup-button:hover {
    background-color: #0056b3;
}

.welcome-section {
    text-align: center;
}

.welcome-text {
    font-size: 18px;
    margin-bottom: 20px;
}

.logout-button {
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

.logout-button:hover {
    background-color: #d32f2f;
}
</style>
