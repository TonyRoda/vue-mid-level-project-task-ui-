import {createRouter, createWebHistory} from 'vue-router'
import ProjectList from '../views/ProjectList.vue'
import TaskList from '../views/TaskList.vue'

const routes = [
    {path: '/', redirect: '/projects'},
    //{path: 'projects', component: ProjectList},
    { path: '/projects', component: () => import('../views/ProjectList.vue') },
    {path: '/task/:projectId', component: TaskList}
]