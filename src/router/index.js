import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ThreeEight from "../views/ThreeEight.vue";
import ThreeEightRoom from "../views/ThreeEightRoom.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/ThreeEight",
    name: "ThreeEight",
    component: ThreeEight
  },
  {
    path: "/ThreeEightRoom",
    name: "ThreeEightRoom",
    component: ThreeEightRoom
  },
];

const router = new VueRouter({
  routes
});

export default router;
