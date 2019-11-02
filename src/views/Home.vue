<template>
  <div class="home container">
    <h2>Data Capture Events</h2>

    <div class="surveys">
        <ul>
            <li v-for="survey in surveys" v-bind:key="survey.id" v-bind:survey="survey">
            	<router-link v-bind:to="{ path: '/survey/' + survey.id }">{{ survey.name }}</router-link>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Home',
    mounted () {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'SET_SURVEYS') {
                this.surveys = state.surveys
            }
        })

        this.surveys = this.$store.getters.getAll()
        if (!this.surveys.length) { // If we don't have any surveys, load them.
            this.$store.dispatch('LOAD_SURVEYS')
        }
    },
    data () {
        return {
            surveys: []
        }
    }
}
</script>
