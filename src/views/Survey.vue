<template>
  <div class="survey container">
    <h2>Survey: {{ survey.name }}</h2>

    <div class="form">
        <form method="post">
            <label for="student_id">Student Name/ID</label><br />
            <input type="text" name="student_id" id="student_id" /><br />
            <input type="submit" name="action" value="Enter Data..." />
        </form>
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
                if(this.index) {
                    this.$store.dispatch('SET_INDEX', this.index);
                }
            } else if(mutation.type == 'SET_INDEX') {
                this.survey = this.$store.getters.getSurvey();
                this.index = this.$store.getters.getIndex();
                this.setStrategy();
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
        }
    }
}
</script>
