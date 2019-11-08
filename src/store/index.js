import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

let api_base_url = "http://localhost/MAD/api/v1";
let api_graphql_url = 'http://localhost/MAD/api/public/graphql';
let api_auth = {
    username: 'data.simulation@makeadiff.in',
    password: 'pass'
}

// :TODO: Surveys should be changed survey - store single active

export default new Vuex.Store({
    state: {
        questions: [],
        all_surveys: [],
        survey: {},
        student: {},
        responses: {}
    },

    mutations: {
        SET_QUESTIONS (state, questions) {
            Vue.set(state, 'questions', questions)
        },

        SET_SURVEY_LIST (state, all_surveys) {
            Vue.set(state, 'all_surveys', all_surveys)
        },

        SET_SURVEY (state, survey) {
            Vue.set(state, 'survey', survey)
        },

        SET_STUDENT (state, student) {
            Vue.set(state, 'student', student)
        },
        
        SET_RESPONSE(state, response) {
            let existing_responses = state.responses
            existing_responses[response.question_id] = response
            Vue.set(state, 'responses', existing_responses)
        }
    },

    actions: {
        LOAD_ALL_SURVEYS (state) {
            NProgress.start();
            axios({
                url: api_graphql_url,
                method: 'post',
                data: {
                    query: `{
                      survey_template(id:13) {
                        id
                        name
                        surveys {
                          id
                          name
                          template {
                              id
                              name
                            }
                        }
                      }
                    }`
                }
            }).then(function (response) {
                NProgress.done();
                if(response.status == 200) {
                    state.commit('SET_SURVEY_LIST', response.data.data.survey_template.surveys);
                }
            });
        },

        LOAD_SINGLE_SURVEY (state, survey_id) {
            NProgress.start();
            axios({
                url: api_graphql_url,
                method: 'post',
                data: {
                    query: `{
                      survey(id:${survey_id}) {
                        id
                        name
                        template {
                          id
                          name
                        }
                      }
                    }`
                }
            }).then(function (response) {
                NProgress.done();
                if(response.status == 200 && typeof response.data !== 'undefined') {
                    // console.log(response.data.data.survey, 'LOAD_SINGLE_SURVEY')
                    state.commit('SET_SURVEY', response.data.data.survey);
                }
            });
        },

        LOAD_SURVEY_QUESTIONS (state, survey_template_id) {
            NProgress.start();
            let dc_survey_template_id = 13
            axios({
                // Not working right now - because CORS
                // url: api_base_url + `/survey_templates/${survey_template_id}/categorized_questions`,
                // method: 'get',
                // withCredentials: true,
                // auth: api_auth
                url: api_graphql_url,
                method: 'post',
                data: {
                    query: `{
                        survey_template(id:${dc_survey_template_id}) {
                            id
                            name
                            questions {
                                id
                                question
                                description
                                required
                                options
                                response_type
                                choices {
                                    id
                                    name
                                }
                            }
                        }
                    }`
                }
            }).then(function (response) {
                NProgress.done();
                if(response.status == 200 && typeof response.data !== 'undefined') {
                    state.commit('SET_QUESTIONS', response.data.data.survey_template.questions);
                }
            });
        },

        SEARCH_STUDENT(state, search) {
            NProgress.start();
            const student_id = search.id;

            if(!student_id) return;
            axios({
                url: api_graphql_url,
                method: 'post',
                data: {
                    query: `{
                      student(id:${student_id}) {
                        id
                        name
                      }
                    }`
                }
            }).then(function (response) {
                NProgress.done();
                if(response.status == 200 && typeof response.data !== 'undefined') {
                    state.commit('SET_STUDENT', response.data.data.student);
                }
            });
        },

        SAVE_RESPONSES(state) {
            console.log("SAVE_RESPONSES")
            const survey = this.getters.getSurvey()
            const student = this.getters.getStudent()
            if(!survey || !student) return false;

            const raw_responses = this.getters.getResponses()
            if(!raw_responses) return false;

            let added_by = 0
            let responses = [];
            for(let question_id in raw_responses) {
                const row = raw_responses[question_id]
                if(!added_by) added_by = row.added_by_user_id
                responses.push(`{
                    question_id: ${row.question_id},
                    response: "${row.response}",
                    choice_id: ${row.choice_id}
                }`);
            }
            const responses_json = responses.join(",")

            if(!responses.length) return false;

            NProgress.start();
            axios({
                url: api_graphql_url,
                method: 'post',
                data: {
                    query: `mutation {
                        saveSurveyResponses(
                            survey_id: ${survey.id}, 
                            responder_id: ${student.id}, 
                            added_by_user_id: ${added_by},
                            responses: [${responses_json}]
                        )
                    }`
                }
            }).then(function (response) {
                NProgress.done();
                if(response.status == 200 && typeof response.data !== 'undefined') {
                    console.log(response.data)
                }
            });
        }
    },

    getters: {
        getQuestions: (state) => () => {
            return state.questions
        },

        getAllSurveys: (state) => () => {
            return state.all_surveys;
        },

        getSurveyCount: (state) => () => {
            return state.all_surveys.length;
        },

        searchSurveyById: (state) => (id) => {
            for(var i in state.all_surveys) {
                if(state.all_surveys[i].id == id) {
                    return state.all_surveys[i];
                }
            }

            return false;
        },

        getSurvey: (state) => () => {
            return state.survey;
        },

        getStudent: (state) => () => {
            return state.student;
        },

        getResponses: (state) => () => {
            return state.responses;
        }
    }
});
