<template>
    <main class="main">
        <div class="error">
            <div class="error__title">
                <h2 class="heading-secondary heading-secondary--error">Something went wrong</h2>
            </div>
            <div class="error__msg">{{err}}</div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'Error',
    props: ['err'],
    data() {
        return {

        }
    }
}
</script>