<template>
    <div class="question-area">
        <div class="question">{{ question.question }}</div>
        <div class="question-description" v-show="question.description">{{ question.description }}</div>
        <Response v-bind:response_type="question.response_type" v-bind:choices="question.choices"></Response>
        <br />
    </div>
</template>

<script>
import Response from '@/components/Response'

export default {
    name: "Question",
    props: {
        question: Object
    },
    components: {
        Response
    }
};
</script>

<style scoped lang="scss">
.question {
    font-size: 1.2em;
}

.question-description {
    font-size: .8em;
    color: #999;
}
</style>
