<template>
    <div class="article-list">
        <Article 
            v-for="article in articles" 
            :key="article.article_id" 
            :id="article.article_id" 
            :title="article.title"
            :content="article.content" 
            :uploadTime="article.upload_time" 
            :author="article.author"
            :categories="article.categories" 
            :avatar="article.avatar"
            @click="handleArticleClick(article.article_id)" 
            @category-click="handleCategoryClick" 
        />
    </div>
</template>

<script>
    import Article from '@/components/main-page/ArticleItem.vue';

    export default {
        name: 'ArticleList',
        components: {
            Article
        },
        props: {
            articles: {
                type: Array,
                default: () => []
            }
        },
        emits: ['article-click', 'category-click'],
        methods: {
            handleArticleClick(id) {
                this.$emit('article-click', id);
            },
            handleCategoryClick(categoryName) {
                this.$emit('category-click', categoryName);
            }
        }
    };
</script>

<style scoped>
    .article-list {
        width: 100%;
    }
</style>