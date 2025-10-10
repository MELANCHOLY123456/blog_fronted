<template>
    <div class="app">
        <Header />
        <button class="theme-switch" @click="toggleTheme" :aria-pressed="isDark">
            <span class="switch-track">
                <span class="switch-thumb" :class="{ dark: isDark }"></span>
            </span>
        </button>
        <NavBar />
        <div class="content">
            <Aside v-if="showAside" class="sidebar" />
            <router-view class="articles" />
        </div>
        <footer class="site-footer">
            <div class="footer-content">
                <p>© {{ currentYear }} 眸冷但骨不累. All rights reserved.</p>
                <p>Powered by Vue.js & Node.js</p>
            </div>
        </footer>
        <!-- 回到顶部按钮 -->
        <button
            v-show="showBackTop"
            class="back-to-top"
            @click="scrollToTop"
            aria-label="回到顶部"
        >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M12 5L6 11M12 5l6 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</template>

<script>
    import Header from '@/layouts/Header.vue';
    import Aside from '@/layouts/Aside.vue';
    import NavBar from '@/layouts/NavBar.vue';

    export default {
        components: {
            Header,
            Aside,
            NavBar
        },
        data() {
            return {
                isDark: false,
                titleTimer: null,
                defaultTitle: '眸冷但骨不累',
                showBackTop: false,
                currentYear: new Date().getFullYear()
            };
        },
        computed: {
            /**
             * 控制侧边栏显示条件
             * @returns {boolean} 是否显示侧边栏
             */
            showAside() {
                return this.$route.path.startsWith('/articles') ||
                    this.$route.path.startsWith('/article/') ||
                    this.$route.path.startsWith('/category/');
            }
        },
        mounted() {
            // 初始化主题设置
            const theme = localStorage.getItem('theme');
            if (theme === 'dark') {
                this.isDark = true;
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                this.isDark = false;
                document.documentElement.setAttribute('data-theme', '');
            }

            // 设置页面标题
            const appTitle = import.meta.env.VITE_APP_TITLE || this.defaultTitle;
            document.title = appTitle;
            this.defaultTitle = appTitle;
            
            // 绑定事件监听器
            document.addEventListener('visibilitychange', this.handleVisibilityChange);
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeUnmount() {
            // 清理事件监听器
            document.removeEventListener('visibilitychange', this.handleVisibilityChange);
            window.removeEventListener('scroll', this.handleScroll);
            if (this.titleTimer) clearTimeout(this.titleTimer);
        },
        methods: {
            /**
             * 切换主题模式
             */
            toggleTheme() {
                this.isDark = !this.isDark;
                document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : '');
                localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
            },
            
            /**
             * 处理页面可见性变化
             */
            handleVisibilityChange() {
                if (this.titleTimer) clearTimeout(this.titleTimer);
                if (document.hidden) {
                    document.title = '诶，你怎么走了？';
                } else {
                    document.title = '诶，你又回来啦！';
                    this.titleTimer = setTimeout(() => {
                        document.title = this.defaultTitle;
                    }, 1500);
                }
            },
            
            /**
             * 处理滚动事件
             */
            handleScroll() {
                this.showBackTop = window.scrollY > 200;
            },
            
            /**
             * 滚动到页面顶部
             */
            scrollToTop() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };
</script>

<style>
    .content {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        max-width: 1200px;
        margin: 32px auto 0 auto;
        min-height: 600px;
        box-sizing: border-box;
        padding: 0 2rem;
    }
    .sidebar {
        width: 250px;
        min-width: 200px;
        margin-right: 3rem;
        position: sticky;
        top: 32px;
        align-self: flex-start;
    }
    .articles {
        flex: 1;
        min-width: 0;
    }

    /* 主题切换开关样式 */
    .theme-switch {
        position: absolute;
        top: 24px;
        right: 40px;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        z-index: 100;
        padding: 0;
    }
    .switch-track {
        position: relative;
        width: 54px;
        height: 28px;
        background: var(--primary-color);
        border-radius: 16px;
        display: flex;
        align-items: center;
        transition: background 0.2s;
    }
    .switch-thumb {
        position: absolute;
        left: 3px;
        top: 3px;
        width: 22px;
        height: 22px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 1px 4px rgba(0,0,0,0.12);
        transition: left 0.25s cubic-bezier(.4,2,.6,1);
        z-index: 2;
    }
    .switch-thumb.dark {
        left: 29px;
    }

    .back-to-top {
        position: fixed;
        right: 32px;
        bottom: 32px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7ecbff 60%, #b3e5fc 100%);
        color: #fff;
        border: none;
        box-shadow: 0 4px 16px rgba(79,140,255,0.18), 0 1.5px 6px rgba(0,0,0,0.08);
        font-size: 2rem;
        cursor: pointer;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
        outline: none;
    }
    .back-to-top:hover {
        background: linear-gradient(135deg, #4fc3f7 60%, #81d4fa 100%);
        box-shadow: 0 8px 24px rgba(79,140,255,0.28), 0 2px 8px rgba(0,0,0,0.12);
        transform: translateY(-4px) scale(1.08);
    }
    .back-to-top:active {
        transform: scale(0.96);
    }

    /* 页脚样式 */
    .site-footer {
        color: var(--text-color);
        padding: 1.5rem 2rem;
        margin-top: 2rem;
        text-align: center;
        width: 100%;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
    }

    .footer-content {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }
    
    .footer-content p {
        margin: 0.5rem 0;
        font-size: 0.9rem;
        color: var(--meta-color);
    }

    /* 响应式页脚 */
    @media (max-width: 768px) {
        .site-footer {
            padding: 1rem;
            margin-top: 1rem;
        }
        
        .footer-content p {
            font-size: 0.8rem;
        }
    }

    body, #app {
        min-height: 100vh;
        width: 100vw;
        background: linear-gradient(120deg, var(--bg-color) 0%, var(--accent-color) 100%);
        background-size: 200% 200%;
        animation: globalGradientBG 16s ease-in-out infinite;
        color: var(--text-color);
        transition: background 0.2s, color 0.2s;
    }
    @keyframes globalGradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
</style>
