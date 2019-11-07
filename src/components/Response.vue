<template>
    <div class="response">
        <template v-if="response_type === 'choice'">
            <div class="choice" v-for="choice in choices" v-bind:key="choice.id" v-bind:choice="choice">
                <label>
                    <input type="radio" v-bind:value="choice.id" v-model="input" />
                    {{ choice.name }}
                </label>
            </div>
        </template>
        <template v-else-if="this.response_type === 'textarea'">
            <textarea class="form-control" v-model="input"></textarea>
        </template> 
    </div>
</template>

<script>
export default {
    name: "Response",
    data () {
        return {
            input: ""
        }
    },
    props: {
        response_type: String,
        choices: Array
    }
};
</script>

<style scoped lang="scss">
label {
    font-weight: normal;
}
</style>
