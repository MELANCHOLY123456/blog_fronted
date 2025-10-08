<template>
    <div class="category-articles">
        <h2 class="category-title">分类: {{ categoryName }}</h2>
        <ArticleList 
            :articles="filteredArticles" 
            @article-click="goToDetail" 
        />
        <button class="back-button" @click="goBack">Back to Home</button>
    </div>
</template>

<script>
    import { articleService } from '@/services/api';
    import { handleApiError, processArticlesData } from '@/utils/errorHandler';
    import ArticleList from '@/components/common/ArticleList.vue';

    export default {
        name: 'CategoryArticles',
        components: {
            ArticleList
        },
        props: {
            name: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                articles: [],
                categoryName: this.name
            };
        },
        computed: {
            filteredArticles() {
                if (!Array.isArray(this.articles)) {
                    return [];
                }

                if (typeof this.categoryName !== 'string') {
                    return [];
                }

                return this.articles.filter(article => {
                    if (!article.categories || !Array.isArray(article.categories)) {
                        return false;
                    }

                    return article.categories.some(cat =>
                        cat.toString().toLowerCase() === this.categoryName.toLowerCase()
                    );
                });
            }
        },
        async created() {
            this.categoryName = this.name || this.$route.params.name;
            await this.loadArticles();
        },
        watch: {
            name(newVal) {
                this.categoryName = newVal;
            },
            '$route.params.name'(newVal) {
                this.categoryName = newVal;
            }
        },
        methods: {
            async loadArticles() {
                try {
                    const response = await articleService.getArticlesWithCategories();
                    
                    // 检查响应状态
                    if (response.data.status === 'success') {
                        // 使用统一的数据处理方法
                        this.articles = processArticlesData(response.data.data);
                    } else {
                        const errorMessage = response.data.message || '加载文章列表失败';
                        handleApiError(new Error(errorMessage), '加载文章列表失败');
                    }
                } catch (error) {
                    const errorMessage = handleApiError(error, '加载文章列表失败，请稍后重试');
                    // 在开发环境输出错误信息
                    if (import.meta.env.DEV) {
                        console.error('Error fetching articles:', errorMessage);
                    }
                }
            },
            goToDetail(id) {
                this.$router.push(`/article/${id}`);
            },
            goBack() {
                this.$router.push('/articles');
            }
        }
    };
</script>

<style scoped>
    .back-button {
        background: var(--primary-color);
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        cursor: pointer;
        transition: background 0.2s;
        display: block;
        margin: 2rem auto 0 auto;
        /* 水平居中并与上方内容间隔 */
    }

    .back-button:hover {
        background: var(--accent-color);
        color: var(--text-color);
    }
</style>