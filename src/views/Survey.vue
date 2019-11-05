<template>
  <div class="survey container">
    <h2>Survey: {{ survey.name }}</h2>

    <div class="form" v-show="!student.id">
        <form method="post">
            <label for="student_id">Enter data for the student with ID...</label><br />
            <input type="text" name="student_id" id="student_id" class="form-control" placeholder="Student Name/ID" v-model="student_id_name" />
            <input type="button" name="action" value="Enter Data..." class="btn btn-primary" v-on:click="this.searchStudent" />
        </form>
    </div>

    <div class="survey-area" v-show="student.id">
        {{ student.id }} : {{ student.name }}
        <!--
        <survey> component.
        For Loop <question> component.
            For loop <option> component
            OR <input> / <textarea>

        OR 

        Statically put in the entire questionare
        -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'Survey',
    created () {
        this.$store.subscribe((mutation) => {
            if(mutation.type == 'SET_SURVEYS') {
                [this.index, this.survey] = this.$store.getters.searchById(this.$route.params.survey_id);
                if(this.index) this.$store.dispatch('SET_INDEX', this.index);

            } else if(mutation.type == 'SET_INDEX') {
                this.survey = this.$store.getters.getSurvey();
                this.index = this.$store.getters.getIndex();

            } else if(mutation.type == 'SET_STUDENT') {
                this.student = this.$store.getters.getStudent();
            }
        });

        const survey_count = this.$store.getters.getSurveyCount();
        if(!survey_count) { // URL called directly - nothing in the entries library
            this.$store.dispatch('LOAD_SINGLE_SURVEY', this.$route.params.survey_id);
        } else {
            [this.index, this.survey] = this.$store.getters.searchById(this.$route.params.survey_id);
            this.$store.dispatch('SET_INDEX', this.index);
        }
    },
    data () {
        return {
            survey: {},
            index: 0,
            student_id_name: "11453",
            student: {
                id: 0,
                name: ""
            }
        }
    },
    methods: {
        searchStudent(e) {
            if(!isNaN(this.student_id_name)) {
                this.student_id = this.student_id_name;
            }

            if(this.student_id) {
                this.$store.dispatch('SEARCH_STUDENT', {"id": this.student_id});
            } else if(this.student_id_name) {
                this.$store.dispatch('SEARCH_STUDENT', {"name": this.student_id_name});
            }
        }
    }
}
</script>
