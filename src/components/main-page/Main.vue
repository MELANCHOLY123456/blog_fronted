<template>
    <div class="main">
        <ArticleList 
            :articles="articles" 
            @article-click="goToDetail" 
            @category-click="goToCategory" 
        />
    </div>
</template>

<script>
import { articleService } from '@/services/api';
import { handleApiError, processArticlesData } from '@/utils/errorHandler';
import ArticleList from '@/components/common/ArticleList.vue';

export default {
    name: 'MainPage',
    components: {
        ArticleList
    },
    data() {
        return {
            articles: [] // 用于存储从后端获取的文章数据
        };
    },
    async created() {
        // 在组件创建时调用后端 API 获取数据
        await this.loadArticles();
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
                    const errorMessage = response.data.message || '加载文章失败';
                    handleApiError(new Error(errorMessage), '加载文章失败');
                }
            } catch (error) {
                const errorMessage = handleApiError(error, '加载文章失败，请检查网络连接');
                // 在开发环境输出错误信息
                if (import.meta.env.DEV) {
                    console.error('Error fetching data:', errorMessage);
                }
            }
        },
        goToDetail(id) {
            this.$router.push({
                path: `/article/${id}`,
                query: { from: 'articles' }
            });
        },
        // 新增方法：跳转到分类页面
        goToCategory(categoryName) {
            // 编码分类名称以兼容特殊字符
            this.$router.push({
                name: 'CategoryArticles',
                params: {
                    name: encodeURIComponent(categoryName)
                }
            });
        }
    }
};
</script>