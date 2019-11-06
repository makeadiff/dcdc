<template>
  <div class="select-student container">
    <h2>Survey: {{ survey.name }}</h2>

    <div class="form" v-show="!student.id">
        <form method="post">
            <label for="student_id">Enter data for the student with ID...</label><br />
            <input type="text" name="student_id" id="student_id" class="form-control" placeholder="Student Name/ID" v-model="student_id_name" />
            <input type="button" name="action" value="Enter Data..." class="btn btn-primary" v-on:click="this.searchStudent" />
        </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Select_Student',
    created () {
        this.$store.subscribe((mutation) => {
            if(mutation.type == 'SET_SURVEYS') {
                [this.index, this.survey] = this.$store.getters.searchSurveyById(this.$route.params.survey_id);
                if(this.index) this.$store.dispatch('SET_SURVEY_INDEX', this.index);

            } else if(mutation.type == 'SET_SURVEY_INDEX') {
                this.survey = this.$store.getters.getSurvey();
                this.index = this.$store.getters.getSurveyIndex();

            } else if(mutation.type == 'SET_STUDENT') {
                this.student = this.$store.getters.getStudent();

                if(this.student) {
                    // this.$router.push({ name: 'survey', params: { survey_id: this.survey_id, student_id: this.student.id } })
                    this.$router.push({ path: `/survey/${this.survey.id}/student/${this.student.id}` })
                }
            }
        });

        const survey_count = this.$store.getters.getSurveyCount();
        if(!survey_count) { // URL called directly - nothing in the entries library
            this.$store.dispatch('LOAD_SINGLE_SURVEY', this.$route.params.survey_id);
        } else {
            [this.index, this.survey] = this.$store.getters.searchSurveyById(this.$route.params.survey_id);
            this.$store.dispatch('SET_SURVEY_INDEX', this.index);
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
