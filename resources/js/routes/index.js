import {createRouter, createWebHistory} from 'vue-router'
import adminRoutes from '../routes/admin'
import publicRoutes from '../routes/public'
import customeRoutes from '../routes/customer'

const routes = [...adminRoutes,...publicRoutes,...customeRoutes]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router
