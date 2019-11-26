import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Survey from "../views/Survey.vue";
import Select_Student from "../views/Select_Student.vue";
import Contributors from "../views/Contributors.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/survey/:survey_id/student/select",
        component: Select_Student,
        props: true
    },
    {
        path: "/survey/:survey_id/student/:student_id",
        component: Survey,
        props: true
    },
    {
        path: "/contributors",
        component: Contributors
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
