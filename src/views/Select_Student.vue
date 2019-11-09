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

    <div v-show="student_list.length">
        <ul>
            <li v-for="stu in student_list" v-bind:key="stu.id">
                <a href="#" v-on:click="selectStudent(stu)">{{ stu.name }}</a>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Select_Student',
    created () {
        this.$store.subscribe((mutation) => {
            if(mutation.type == 'SET_SURVEY') {
                this.survey = this.$store.getters.getSurvey()

            } else if(mutation.type == 'SET_STUDENT') {
                this.student = this.$store.getters.getStudent();

                if(this.student) {
                    this.$router.push({ path: `/survey/${this.survey.id}/student/${this.student.id}` })
                }
            } else if(mutation.type == 'SET_STUDENT_LIST') {
                this.student_list = this.$store.getters.getStudentList();
            }
        });

        this.survey = this.$store.getters.getSurvey();
        if(!this.survey.id) { // URL called directly - nothing in the entries library
            this.$store.dispatch('LOAD_SINGLE_SURVEY', this.$route.params.survey_id);
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
            },
            student_list: []
        }
    },
    methods: {
        searchStudent(e) {
            if(!isNaN(this.student_id_name)) {
                this.$store.dispatch('SEARCH_STUDENT', {"id": this.student_id_name});
            } else if(this.student_id_name) {
                this.$store.dispatch('SEARCH_STUDENT', {"name": this.student_id_name, "city_id": current_user.city_id});
            }
        },
        selectStudent(student) {
            this.$store.commit('SET_STUDENT', student);
        }
    }
}
</script>
