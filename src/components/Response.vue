<template>
    <div class="response">
        <template v-if="response_type === 'choice'">
            <div
                class="choice"
                v-for="choice in choices"
                v-bind:key="choice.id"
                v-bind:choice="choice"
            >
                <label>
                    <input
                        type="radio"
                        v-bind:value="choice.id"
                        v-bind:key="choice.id"
                        v-model="answer"
                        v-bind:name="question.id"
                    />
                    {{ choice.name }}
                </label>
            </div>
        </template>
        <template v-else-if="this.response_type === 'longtext'">
            <textarea
                class="form-control"
                v-bind:key="question.id"
                v-model="answer"
            ></textarea>
        </template>
        <template v-else-if="this.response_type === 'text'">
            <input
                type="text"
                class="form-control"
                v-bind:key="question.id"
                v-model="answer"
            />
        </template>
    </div>
</template>

<script>
export default {
    name: "Response",
    data() {
        return {
            input: {}
        };
    },
    props: {
        response_type: String,
        choices: Array,
        question: Object
    },
    computed: {
        answer: {
            get() {
                let value = null;

                return value;
            },
            set(input_value) {
                var survey = this.$store.getters.getSurvey();
                var student = this.$store.getters.getStudent();
                let response = {
                    survey_id: survey.id,
                    response: "",
                    question_id: this.question.id,
                    choice_id: 0,
                    responder_id: student.id,
                    added_by_user_id: current_user.id
                };
                if (this.response_type === "choice") {
                    response["choice_id"] = input_value;
                } else {
                    response["response"] = input_value;
                }
                this.$store.commit("SET_RESPONSE", response);
            }
        }
    }
};
</script>

<style scoped lang="scss">
label {
    font-weight: normal;
}
</style>
