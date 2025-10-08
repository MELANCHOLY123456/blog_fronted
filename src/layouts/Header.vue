<template>
    <header class="header" @click="goToHome">
        <div class="header-content">
            <img class="site-logo" src="/src/assets/pic/melancholy.jpg" alt="logo" />
            <h1 class="header-title">眸冷但骨不累</h1>
            <p class="subtitle">一个CS领域大学生的自学之路</p>
        </div>
        <div class="wave-wrapper">
            <svg class="wave wave-back" viewBox="0 0 1440 64" preserveAspectRatio="none">
                <path
                    :fill="waveBackColor"
                    d="M0 32C300 64 600 0 900 32C1200 64 1500 0 1800 32V64H0V32Z"/>
            </svg>
            <svg class="wave wave-front" viewBox="0 0 1440 64" preserveAspectRatio="none">
                <path
                    :fill="waveFrontColor"
                    d="M0 32C300 64 600 0 900 32C1200 64 1500 0 1800 32V64H0V32Z"/>
            </svg>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                isDark: window.matchMedia('(prefers-color-scheme: dark)').matches
            };
        },
        computed: {
            waveBackColor() {
                return this.isDark
                    ? 'rgba(255,255,255,0.25)'
                    : 'rgba(0,123,255,0.2)';
            },
            waveFrontColor() {
                return this.isDark
                    ? 'rgba(255,255,255,0.6)'
                    : 'rgba(0,123,255,0.4)';
            }
        },
        mounted() {
            // 监听主题变化
            this._mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this._mediaQuery.addEventListener('change', this.handleThemeChange);
        },
        beforeUnmount() {
            this._mediaQuery.removeEventListener('change', this.handleThemeChange);
        },
        methods: {
            handleThemeChange(e) {
                this.isDark = e.matches;
            },
            goToHome() {
                this.$router.push('/');
            }
        }
    };
</script>

<style scoped>
    .header {
        background: linear-gradient(120deg, var(--bg-color) 0%, var(--accent-color) 100%);
        border-bottom: none;
        box-shadow: 0 2px 16px rgba(91,143,249,0.06);
        border-radius: 0 0 24px 24px;
        padding: 2.5rem 1rem;
        margin-bottom: 1.2rem;
        text-align: center;
        position: relative;
        overflow: hidden;
        z-index: 10;
    }

    .site-logo {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-bottom: 0.8rem;
        box-shadow: 0 2px 8px rgba(91,143,249,0.08);
        object-fit: cover;
        border: 3px solid #fff;
        transition: transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s;
    }

    .site-logo:hover {
        transform: scale(1.08);
        box-shadow: 0 8px 32px 0 rgba(0,123,255,0.18), 0 2px 8px rgba(91,143,249,0.08);
        z-index: 10;
    }

    .header-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
        position: relative;
        z-index: 3;
    }

    .header-title {
        font-family: 'Noto Sans SC','Poppins',sans-serif;
        font-size: 2.1rem;
        font-weight: 700;
        color: var(--header-title-color);
        margin-bottom: 0.5rem;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: color 0.2s, transform 0.25s cubic-bezier(.4,2,.6,1);
    }
    .header-title::after {
        content: "";
        display: block;
        margin: 0.5rem auto 0;
        width: 2.5rem;
        height: 3px;
        border-radius: 2px;
        background: var(--primary-color);
        opacity: 0.18;
    }
    .header-title:hover {
        color: var(--primary-color);
        transform: scale(1.08) translateY(-4px);
        text-shadow: 0 4px 24px rgba(0,123,255,0.12), 0 2px 8px rgba(91,143,249,0.08);
    }

    .subtitle {
        font-size: 1.05rem;
        color: var(--meta-color);
        font-style: italic;
        opacity: 0.85;
        margin-top: 0.2rem;
        transition: color 0.3s, opacity 0.3s;
    }

    /* 波浪容器 */
    .wave-wrapper {
        position: absolute;
        left: 0; right: 0; bottom: -1px;
        width: 100%;
        height: 64px;
        overflow: hidden;
        pointer-events: none;
        z-index: 2;
    }

    /* 默认浅色模式：更轻盈的海洋蓝 */
    .wave {
        width: 200%;
        height: 100%;
        display: block;
    }

    .wave-back {
        animation: backMove 15s ease-in-out infinite;
    }

    .wave-front {
        animation: frontMove 6s ease-in-out infinite;
    }

    /* 响应式适配 */
    @media (max-width: 768px) {
        .header {
            padding: 1.5rem 0.5rem;
        }
        .header-title {
            font-size: 1.5rem;
        }
        .subtitle {
            font-size: 0.95rem;
        }
    }

    @media (max-width: 480px) {
        .header-title {
            font-size: 1.1rem;
            letter-spacing: normal;
        }
        .subtitle {
            font-size: 0.85rem;
        }
    }

    @keyframes frontMove {
        0%   { transform: translate(0, 0); }
        50%  { transform: translate(-50%, 8px); }
        100% { transform: translate(0, 0); }
    }

    @keyframes backMove {
        0%   { transform: translate(0, 0); }
        50%  { transform: translate(-25%, 4px); }
        100% { transform: translate(0, 0); }
    }

    @media (prefers-color-scheme: dark) {
        /* 默认白色文字 */
        .header-title {
            color: #fff !important;
            text-shadow: 0 2px 8px rgba(0,0,0,0.18);
        }
        /* 悬停依旧亮蓝 */
        .header-title:hover {
            color: var(--primary-color) !important;
        }
    }

</style>
