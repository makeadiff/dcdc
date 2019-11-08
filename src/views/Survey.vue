<template>
  <div class="survey container">
    <h2>Survey: {{ survey.name }}</h2>
    <h3>{{ student.name }}</h3>

    <div class="survey-area" v-show="student.id">
        <Question v-for="question in questions" v-bind:key="question.id" v-bind:question="question" v-bind:survey="survey"></Question>
    </div>

    <div class="action">
        <button v-on:click="saveSurvey" class="btn btn-primary">Save Responses</button>
    </div>
  </div>
</template>

<script>
import Question from '@/components/Question'

export default {
    name: 'Survey',
    created () {
        this.$store.subscribe((mutation) => {
            if(mutation.type == 'SET_SURVEY') {
                this.survey = this.$store.getters.getSurvey()
                this.$store.dispatch('LOAD_SURVEY_QUESTIONS', this.survey.template.id);

            } else if(mutation.type == 'SET_STUDENT') {
                this.student = this.$store.getters.getStudent();

            } else if(mutation.type == 'SET_QUESTIONS') {
                this.questions = this.$store.getters.getQuestions();
            }
        });

        this.survey = this.$store.getters.getSurvey();
        if(!this.survey.id) { // URL called directly - nothing in the entries library
            this.$store.dispatch('LOAD_SINGLE_SURVEY', this.$route.params.survey_id);
        }

        this.student = this.$store.getters.getStudent()
        if(!this.student.id) {
            this.$store.dispatch('SEARCH_STUDENT', {'id': this.$route.params.student_id });
        }

        this.questions = this.$store.getters.getQuestions()
        if(!this.questions.length && this.survey && this.survey.template) {
            this.$store.dispatch('LOAD_SURVEY_QUESTIONS', this.survey.template.id);
        }
    },
    data () {
        return {
            survey: {},
            student: {
                id: 0,
                name: ""
            },
            questions: []
        }
    },
    methods: {
        saveSurvey() {
            console.log("Saving...")
            this.$store.dispatch('SAVE_RESPONSES')
        }
    },
    components: {
        Question
    }
}
</script>
