<template>
    <div class="article-container">
        <div class="article-detail">
            <h1 class="article-title">{{ article.title }}</h1>
            <p class="article-meta"><strong>Author:</strong> {{ article.author }}</p>
            <p class="article-meta"><strong>Upload Time:</strong> {{ formattedUploadTime }}</p>
            <div class="article-content">
                <p>{{ article.content }}</p>
            </div>
        </div>
        <button class="back-button" @click="goBack">Back to {{ backPageName }}</button>
    </div>
</template>

<script>
    import { articleService } from '@/services/api';
    import { handleApiError } from '@/utils/errorHandler';

    export default {
        name: 'ArticleDetail',
        props: {
            id: {
                type: [Number, String],
                required: true
            }
        },
        data() {
            return {
                article: {}
            };
        },
        computed: {
            formattedUploadTime() {
                if (!this.article.upload_time) return '';
                const date = new Date(this.article.upload_time);
                return date.toLocaleString();
            },
            backPageName() {
                // 根据来源页面确定返回按钮显示的文本
                if (this.$route.query.from === 'category') {
                    return 'Category';
                } else {
                    return 'Home';
                }
            }
        },
        async created() {
            const id = this.id || this.$route.params.id;
            
            // 验证ID
            if (!id) {
                // 在开发环境输出错误信息
                if (import.meta.env.DEV) {
                    console.error('Article ID is required');
                }
                return;
            }
            
            // 不再需要存储来源信息，直接在需要时检查$route.query.from
            
            await this.loadArticle(id);
        },
        methods: {
            async loadArticle(id) {
                try {
                    const response = await articleService.getArticleById(id);
                    
                    // 检查响应状态
                    if (response.data.status === 'success') {
                        this.article = response.data.data;
                    } else {
                        const errorMessage = response.data.message || '加载文章详情失败';
                        handleApiError(new Error(errorMessage), '加载文章详情失败');
                    }
                } catch (error) {
                    const errorMessage = handleApiError(error, '加载文章详情失败');
                    // 在开发环境输出错误信息
                    if (import.meta.env.DEV) {
                        console.error('Error fetching article details:', errorMessage);
                    }
                }
            },
            goBack() {
                // 根据来源页面返回到相应的页面
                if (this.$route.query.from === 'category') {
                    // 从分类页面进入，通过路由历史返回上一页
                    this.$router.go(-1);
                } else {
                    // 从主文章页面进入，返回到主文章页面
                    this.$router.push('/articles');
                }
            }
        }
    };
</script>

<style scoped>
    .article-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .article-detail {
        padding: 1.5rem;
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 14px;
        box-shadow: 0 4px 16px var(--shadow-color, rgba(60, 100, 180, 0.07));
        color: var(--text-color);
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    .article-title {
        font-size: 2rem;
        font-weight: bold;
        color: var(--text-color);
        margin-bottom: 1rem;
    }

    .article-meta {
        font-size: 1rem;
        color: var(--meta-color);
        margin-bottom: 0.5rem;
    }

    .article-content {
        font-size: 1rem;
        color: var(--text-color);
        margin-top: 1rem;
        white-space: pre-wrap;
    }

    .back-button {
        background: var(--primary-color);
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        cursor: pointer;
        transition: background 0.2s;
        display: block;
        margin: 1rem 0;
    }

    .back-button:hover {
        background: var(--card-bg);
        color: var(--text-color);
    }
</style>