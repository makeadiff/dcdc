import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

let api_base_url = "http://localhost/MAD/api/v1/";
let api_graphql_url = 'http://localhost/MAD/api/public/graphql';

export default new Vuex.Store({
    state: {
        surveys: [],
        survey_index: 0,
        survey_id: 0,
        student: {}
    },

    mutations: {
        SET_SURVEYS (state, surveys) {
            Vue.set(state, 'surveys', surveys);
        },

        SET_SURVEY_INDEX (state, survey_index) {
            Vue.set(state, 'survey_index', survey_index)
        },

        SET_STUDENT (state, student) {
            Vue.set(state, 'student', student)
        }
    },

    actions: {
        LOAD_SURVEYS (state) {
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
                        }
                      }
                    }`
                }
            }).then(function (response) {
                NProgress.done();
                if(response.status == 200) {
                    state.commit('SET_SURVEYS', response.data.data.survey_template.surveys);
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
                    state.commit('SET_SURVEYS', [response.data.data.survey]);
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

        SET_SURVEY_INDEX (state, survey_index) {
            state.commit('SET_SURVEY_INDEX', survey_index);
        },

    },

    getters: {
        getAllSurvey: (state) => () => {
            return state.surveys;
        },

        getSurveyCount: (state) => () => {
            return state.surveys.length;
        },

        searchSurveyById: (state) => (id) => {
            for(var i in state.surveys) {
                if(state.surveys[i].id == id) {
                    return [Number(i), state.surveys[i]];
                }
            }

            return [];
        },

        getSurveyByIndex: (state) => (survey_index) => {
            return state.surveys[survey_index];
        },

        getSurveyIndex: (state) => () => {
            return state.survey_index;
        },

        getSurvey: (state) => () => {
            return state.surveys[state.survey_index];
        },

        getStudent: (state) => () => {
            return state.student;
        }
    }
});
