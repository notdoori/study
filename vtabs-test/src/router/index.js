import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/components/HomePage.vue";
import User1 from "@/components/Users.vue";
import TaskTab from "@/components/Task.vue";
import ProjectTab from "@/components/Project.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/user",
    component: User1,
    children: [
      {
        path: "sub1",
        component: TaskTab
      },
      {
        path: "sub2",
        component: ProjectTab
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
