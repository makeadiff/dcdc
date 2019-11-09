<template>
    <!-- <Choice v-for="choice in choices" v-bind:key="choice.id" v-bind:choice="choice"></Choice> -->
    <div class="choice">
        <label>{{ choice.name }}</label>
        <input type="radio" value="choice.id" />
    </div>
</template>

<script>
export default {
    name: "Choice",
    data() {
        return {
            input: ""
        };
    },
    props: {
        choice: Object
    }
};
</script>

<style scoped lang="scss"></style>
