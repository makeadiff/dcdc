<template>
    <div id="app">
        <MSuiteHeader
            app_name="DC/DC"
            app_logo=""
            base_app_url="/"
            v-bind:user="{
                name: 'Binny',
                profile_image: 'https://picsum.photos/id/11/200/300',
                groups: 'Director, Technology'
            }"
        >
        </MSuiteHeader>
        <Container>
            <router-view />
        </Container>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {}
};
</script>
