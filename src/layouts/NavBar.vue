<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/about">关于我</router-link></li>
            <li>
                <router-link 
                    to="/articles" 
                    :class="{ 'router-link-active': isArticlesActive }"
                >
                    文章页
                </router-link>
            </li>
            <li>
                <router-link to="/article/create" class="create-link">
                    写文章
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        computed: {
            isArticlesActive() {
                // 检查当前路由是否与文章相关的路径匹配
                // 排除创建文章页面
                return (this.$route.path === '/articles' || 
                       this.$route.path.startsWith('/article/') || 
                       this.$route.path.startsWith('/category/')) &&
                       !this.$route.path.startsWith('/article/create');
            }
        }
    };
</script>

<style scoped>
    .navbar {
        width: 90%;
        max-width: 900px;
        margin: 0 auto 1.2rem auto;
        background: var(--card-bg);
        border-radius: 14px;
        box-shadow: 0 4px 16px rgba(60, 100, 180, 0.07), 0 1.5px 4px rgba(0,0,0,0.03);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 0;
        z-index: 10;
    }
    .navbar ul {
        display: flex;
        gap: 2.5rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .navbar li {
        font-size: 1.15rem;
        font-weight: 500;
        letter-spacing: 0.5px;
    }
    .navbar a {
        color: var(--text-color);
        text-decoration: none;
        padding: 0.3rem 1.2rem;
        border-radius: 6px;
        transition: background 0.18s, color 0.18s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .navbar a.router-link-active,
    .navbar a:hover {
        background: var(--primary-color);
        color: #fff;
        transition: background 0.18s, color 0.18s;
    }
    .create-link {
        color: var(--text-color);
        background: transparent;
    }
    .create-link.router-link-active,
    .create-link:hover {
        background: var(--primary-color);
        color: #fff;
    }
</style>
