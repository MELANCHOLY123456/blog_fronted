import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Main from '@/components/main-page/Main.vue';
import ArticleDetail from '@/components/main-page/ArticleDetail.vue';
import CategoryArticles from '@/components/main-page/CategoryArticles.vue';

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
        props: true
    }
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;