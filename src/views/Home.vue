<template>
    <div class="home container">
        <h2>Data Capture Events</h2>

        <div class="surveys">
            <ul>
                <li
                    v-for="survey in all_surveys"
                    v-bind:key="survey.id"
                    v-bind:survey="survey"
                >
                    <a href="#" v-on:click="selectSurvey(survey.id)">{{
                        survey.name
                    }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    mounted() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === "SET_SURVEY_LIST") {
                this.all_surveys = state.all_surveys;
            }
        });

        this.all_surveys = this.$store.getters.getAllSurveys();
        if (!this.all_surveys.length) {
            // If we don't have any surveys, load them.
            this.$store.dispatch("LOAD_ALL_SURVEYS");
        }
    },
    data() {
        return {
            all_surveys: []
        };
    },
    methods: {
        selectSurvey(survey_id) {
            for (var i in this.all_surveys) {
                if (this.all_surveys[i].id == survey_id) {
                    this.$store.commit("SET_SURVEY", this.all_surveys[i]);
                    this.$router.push({
                        path: `/survey/${survey_id}/student/select`
                    });
                    return;
                }
            }

            alert("Can't find any survey with given ID");
        }
    }
};
</script>
