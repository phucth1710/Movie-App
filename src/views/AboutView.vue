<script>
export default {
    name: "AboutView",
};
</script>

<template>
    <main>
        <div class="about-view">
            <h1>About This Website</h1>
            <p>Hello, my name is <strong>Phuc Ta</strong>.</p>
            <p>
                If you have any questions or feedback, feel free to reach out to me at:
                <a href="mailto:tahongphuc@gmail.com">tahongphuc@gmail.com</a>
            </p>
            <p>Thank you for using this website! Your support means a lot.</p>
        </div>
    </main>
</template>

<style scoped>
.about-view {
    text-align: center;
    margin: 2em;
    font-family: Arial, sans-serif;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
