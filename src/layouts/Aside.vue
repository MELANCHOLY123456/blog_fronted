<template>
    <aside class="sidebar">
        <h3 class="sidebar-title">📚 文章分类</h3>
        <ul class="category-list">
            <li v-for="(category, index) in categories" :key="index" class="category-item"
                @click="goToCategory(category.name)">
                {{ category.name }}
            </li>
        </ul>
    </aside>
</template>

<script>
import { categoryService } from '@/services/api';
import { handleApiError } from '@/utils/errorHandler';

export default {
    name: 'Aside',
    data() {
        return {
            categories: []
        };
    },
    async created() {
        await this.loadCategories();
    },
    methods: {
        async loadCategories() {
            try {
                const response = await categoryService.getCategories();
                // 检查响应状态
                if (response.data.status === 'success') {
                    this.categories = response.data.data;
                } else {
                    const errorMessage = response.data.message || '加载分类失败';
                    handleApiError(new Error(errorMessage), '加载分类失败');
                }
            } catch (error) {
                const errorMessage = handleApiError(error, '加载分类失败');
                // 在开发环境输出错误信息
                if (import.meta.env.DEV) {
                    console.error('Error fetching categories:', errorMessage);
                }
            }
        },
        goToCategory(category) {
            this.$router.push(`/category/${encodeURIComponent(category)}`);
        }
    }
};
</script>

<style scoped>
.sidebar {
    background: var(--card-bg);
    color: var(--text-color);
    padding: 1.5rem;
    border-radius: 14px;
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 16px var(--shadow-color, rgba(60, 100, 180, 0.07));
    width: 250px;
    /* 新增吸顶效果 */
    position: sticky;
    top: 32px; /* 距离页面顶部的距离，可根据你的布局微调 */
    align-self: flex-start; /* 保证与右侧顶部对齐 */
    margin: 0;
    margin-right: 2rem;
}

.sidebar-title {
    color: var(--text-color);
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid var(--border-color);
    font-weight: bold;
    letter-spacing: 1px;
    border-left: 5px solid var(--primary-color);
    /* 主色条 */
    padding-left: 0.6rem;
}

.category-list {
    display: grid;
    gap: 0.8rem;
    padding-left: 0;
    list-style: none;
}

.category-item {
    font-size: 1rem;
    color: var(--text-color);
    padding: 0.8rem 0.8rem 0.8rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    transition:
        background 0.2s,
        color 0.2s,
        border 0.2s,
        box-shadow 0.25s cubic-bezier(.4, 2, .6, 1),
        transform 0.18s cubic-bezier(.4, 2, .6, 1);
    box-shadow: 0 1px 4px var(--shadow-color, rgba(60, 100, 180, 0.03));
    text-align: left;
    position: relative;
    overflow: hidden;
}

.category-item::before {
    content: "";
    position: absolute;
    left: 0;
    top: 18%;
    width: 0;
    height: 64%;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border-radius: 3px;
    transition: width 0.25s cubic-bezier(.4, 2, .6, 1);
    z-index: 0;
}

.category-item:hover {
    background: var(--hover-bg);
    color: var(--primary-color);
    border: 1.5px solid var(--primary-color);
    box-shadow: 0 4px 16px var(--shadow-color, rgba(60, 100, 180, 0.10));
    transform: scale(1.035);
}

.category-item:hover::before {
    width: 6px;
}
</style>