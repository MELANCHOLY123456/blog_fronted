import { createRouter, createWebHistory } from 'vue-router';
import About from '@/components/Home.vue'; // 你的自我介绍页
import Main from '@/components/main-page/Main.vue';
import ArticleDetail from '@/components/main-page/ArticleDetail.vue';
import CategoryArticles from '@/components/main-page/CategoryArticles.vue';

const routes = [
    {
        path: '/',
        redirect: '/about'
    },
    {
        path: '/about',
        name: 'About',
        component: About
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

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;