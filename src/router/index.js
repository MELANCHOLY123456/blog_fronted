import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Main from '@/components/main-page/Main.vue'
import ArticleDetail from '@/components/main-page/ArticleDetail.vue'
import CategoryArticles from '@/components/main-page/CategoryArticles.vue'
import ArticleEditor from '@/components/main-page/ArticleEditor.vue'

/**
 * 应用路由配置
 */
const routes = [
    {
        path: '/',
        redirect: '/about'
    },
    {
        path: '/about',
        name: 'Home',
        component: Home
    },
    {
        path: '/articles',
        name: 'Articles',
        component: Main
    },
    {
        path: '/article/:id',
        name: 'ArticleDetail',
        component: ArticleDetail,
        props: route => ({ id: Number(route.params.id) })
    },
    {
        path: '/category/:name',
        name: 'CategoryArticles',
        component: CategoryArticles,
        props: route => ({ name: decodeURIComponent(route.params.name) })
    },
    {
        path: '/article/create',
        name: 'ArticleCreate',
        component: ArticleEditor
    },
    {
        path: '/article/edit/:id',
        name: 'ArticleEdit',
        component: ArticleEditor,
        props: true
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router