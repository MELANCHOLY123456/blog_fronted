<template>
    <div class="article-detail">
        <h1 class="article-title">{{ article.title }}</h1>
        <p class="article-meta"><strong>Author:</strong> {{ article.author }}</p>
        <p class="article-meta"><strong>Upload Time:</strong> {{ formattedUploadTime }}</p>
        <div class="article-content">
            <p>{{ article.content }}</p>
        </div>
        <button class="back-button" @click="goBack">Back to Home</button>
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
            this.$router.push('/articles');
        }
    }
};
</script>

<style scoped>
.article-detail {
    padding: 20px;
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(60, 100, 180, 0.07), 0 1.5px 4px rgba(0, 0, 0, 0.03);
    color: var(--text-color);
    line-height: 1.6;
    display: flex;
    flex-direction: column;
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
    align-self: center;
    margin-top: 2rem;
}

.back-button:hover {
    background: var(--accent-color);
    color: var(--text-color);
}
</style>