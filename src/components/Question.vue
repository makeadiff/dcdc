<template>
    <div class="question-area">
        <div class="question">{{ question.question }}</div>
        <div class="question-description" v-show="question.description">
            {{ question.description }}
        </div>
        <Response
            v-bind:response_type="question.response_type"
            v-bind:choices="question.choices"
            v-bind:question="question"
        ></Response>
        <br />
    </div>
</template>

<script>
import Response from "@/components/Response";

export default {
    name: "Question",
    props: {
        question: Object,
        survey: Object
    },
    components: {
        Response
    }
};
</script>
