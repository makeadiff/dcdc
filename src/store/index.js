import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

let api_base_url = "http://localhost/MAD/api/v1/";
let api_graphql_url = 'http://localhost/MAD/api/public/graphql';

export default new Vuex.Store({
    state: {
        surveys: [],
        index: 0,
        survey_id: 0
    },

    mutations: {
        SET_SURVEYS (state, surveys) {
            Vue.set(state, 'surveys', surveys);
        },

        SET_INDEX (state, index) {
            Vue.set(state, 'index', index)
        }
    },

    actions: {
        LOAD_SURVEYS (state) {
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
                if(response.status == 200) {
                    state.commit('SET_SURVEYS', response.data.data.survey_template.surveys);
                }
            });
        },

        LOAD_SINGLE_SURVEY (state, survey_id) {
            console.log(survey_id)
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
                if(response.status == 200 && typeof response.data !== 'undefined') {
                    state.commit('SET_SURVEYS', [response.data.data.survey]);
                }
            });
        },

        SET_INDEX (state, index) {
            state.commit('SET_INDEX', index);
        },

    },

    getters: {
        getAll: (state) => () => {
            return state.surveys;
        },

        getSurveyCount: (state) => () => {
            return state.surveys.length;
        },

        searchById: (state) => (id) => {
            for(var i in state.surveys) {
                if(state.surveys[i].id == id) {
                    return [Number(i), state.surveys[i]];
                }
            }

            return [];
        },

        getByIndex: (state) => (index) => {
            return state.surveys[index];
        },

        getIndex: (state) => () => {
            return state.index;
        },

        getSurvey: (state) => () => {
            return state.surveys[state.index];
        },
    }
});
