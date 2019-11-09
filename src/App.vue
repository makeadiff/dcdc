<template>
    <div id="app">
        <Header msg="Hello" />
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
        <div id="body" class="containter">
            <router-view />
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";

export default {
    name: "App",
    components: {
        Header
    }
};
</script>
