<template>
    <div class="article-editor">
        <form @submit.prevent="saveArticle" class="editor-form">
            <div class="editor-body">
                <div class="form-group">
                    <label for="title">标题:</label>
                    <input 
                        type="text" 
                        id="title" 
                        v-model="articleData.title" 
                        required 
                        class="form-input"
                        placeholder="请输入文章标题"
                    />
                </div>
                
                <div class="form-group">
                    <label for="author">作者:</label>
                    <input 
                        type="text" 
                        id="author" 
                        v-model="articleData.author" 
                        class="form-input"
                        placeholder="请输入作者姓名"
                    />
                </div>
                
                <div class="form-group">
                    <label for="category">分类:</label>
                    <select 
                        id="category" 
                        v-model="articleData.category" 
                        class="form-input"
                        required
                    >
                        <option value="">请选择分类</option>
                        <option 
                            v-for="category in categories" 
                            :key="category.name" 
                            :value="category.name"
                        >
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="content">内容:</label>
                    <textarea 
                        id="content" 
                        v-model="articleData.content" 
                        required 
                        class="form-textarea"
                        rows="15"
                        placeholder="请输入文章内容"
                    ></textarea>
                </div>
                
                <!-- 成功提示信息 -->
                <div v-if="showSuccessMessage" class="success-message">
                    <div class="success-animation">
                        <span class="success-icon">✓</span>
                        <span class="success-text">文章保存成功！</span>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                        {{ isSubmitting ? '保存中...' : '保存文章' }}
                    </button>
                    <button type="button" class="btn btn-secondary" @click="cancelEdit">
                        取消
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { articleService, categoryService } from '@/services/api';
    import { handleApiError } from '@/utils/errorHandler';

    export default {
        name: 'ArticleEditor',
        props: {
            // 编辑文章时传入的文章ID
            articleId: {
                type: [Number, String],
                default: null
            }
        },
        data() {
            return {
                isSubmitting: false,
                showSuccessMessage: false,
                categories: [],
                articleData: {
                    title: '',
                    content: '',
                    author: '',
                    category: ''
                }
            };
        },
        computed: {
            /**
             * 是否为编辑模式
             * @returns {boolean}
             */
            isEditing() {
                return !!this.articleId;
            }
        },
        async created() {
            // 加载分类列表
            await this.loadCategories();
            
            // 如果是编辑模式，获取文章详情
            if (this.isEditing) {
                await this.loadArticle();
            }
        },
        methods: {
            /**
             * 加载分类列表
             */
            async loadCategories() {
                try {
                    const response = await categoryService.getCategories();
                    if (response.data.status === 'success') {
                        this.categories = response.data.data;
                    } else {
                        throw new Error(response.data.message || '获取分类失败');
                    }
                } catch (error) {
                    const errorMessage = handleApiError(error, '获取分类失败');
                    console.error('Error loading categories:', errorMessage);
                }
            },
            
            /**
             * 加载文章详情（编辑模式）
             */
            async loadArticle() {
                try {
                    const response = await articleService.getArticleById(this.articleId);
                    if (response.data.status === 'success') {
                        // 填充表单数据
                        this.articleData = {
                            ...response.data.data,
                            category: response.data.data.categories && response.data.data.categories.length > 0 
                                ? response.data.data.categories[0] 
                                : ''
                        };
                    } else {
                        throw new Error(response.data.message || '获取文章失败');
                    }
                } catch (error) {
                    const errorMessage = handleApiError(error, '获取文章失败');
                    console.error('Error loading article:', errorMessage);
                    // 返回文章列表页
                    this.$router.push('/articles');
                }
            },
            
            /**
             * 保存文章（创建或更新）
             */
            async saveArticle() {
                this.isSubmitting = true;
                try {
                    // 准备文章数据
                    const articleData = {
                        ...this.articleData,
                        // 使用当前时间作为发布日期
                        publish_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                        // 将分类转换为数组格式
                        categories: this.articleData.category ? [this.articleData.category] : []
                    };
                    
                    // 删除临时的category字段
                    delete articleData.category;
                    
                    let response;
                    if (this.isEditing) {
                        // 更新文章
                        response = await articleService.updateArticle(this.articleId, articleData);
                    } else {
                        // 创建文章
                        response = await articleService.createArticle(articleData);
                    }
                    
                    if (response.data.status === 'success') {
                        // 保存成功，显示提示信息
                        this.showSuccessMessage = true;
                        // 3秒后自动隐藏提示并跳转到文章列表页
                        setTimeout(() => {
                            this.showSuccessMessage = false;
                            this.$router.push('/articles');
                        }, 3000);
                    } else {
                        throw new Error(response.data.message || '保存文章失败');
                    }
                } catch (error) {
                    const errorMessage = handleApiError(error, '保存文章失败');
                    console.error('Error saving article:', errorMessage);
                } finally {
                    this.isSubmitting = false;
                }
            },
            
            /**
             * 取消编辑
             */
            cancelEdit() {
                this.$router.push('/articles');
            }
        }
    };
</script>

<style scoped>
    .article-editor {
        width: 100%;
    }

    .editor-form {
        display: flex;
        flex-direction: column;
        background: var(--card-bg);
        border-radius: 14px;
        box-shadow: 0 4px 16px rgba(60, 100, 180, 0.07), 0 1.5px 4px rgba(0,0,0,0.03);
        border: 1px solid var(--border-color);
        margin-bottom: 24px;
        transition: box-shadow 0.2s, transform 0.2s;
        width: 100%;
        color: var(--text-color);
        border: 1.5px solid var(--border-color);
        transition: box-shadow 0.2s, transform 0.2s, border 0.2s;
        box-sizing: border-box;
    }

    .editor-body {
        padding: 1.5rem 2rem 1.2rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
    }

    .form-group {
        margin-bottom: 0.7rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--text-color);
        font-size: 0.95rem;
    }

    .form-input,
    .form-textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        font-size: 1rem;
        font-family: inherit;
        background: var(--card-bg);
        color: var(--text-color);
        box-sizing: border-box;
    }

    .form-textarea {
        resize: vertical;
        min-height: 200px;
    }

    .success-message {
        padding: 1rem;
        margin: 1rem 0;
        background: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 6px;
        color: #155724;
        text-align: center;
        animation: fadeInOut 3s ease-in-out;
    }

    .success-animation {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .success-icon {
        font-size: 1.5rem;
        font-weight: bold;
        color: #28a745;
        animation: bounce 0.5s ease-in-out;
    }

    .success-text {
        font-size: 1.1rem;
        font-weight: 500;
    }

    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-10px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }

    @keyframes bounce {
        0% { transform: scale(0.5); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }

    .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.2s;
    }

    .btn-primary {
        background: var(--primary-color);
        color: white;
    }

    .btn-primary:hover:not(:disabled) {
        background: var(--accent-color);
    }

    .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .btn-secondary {
        background: #6c757d;
        color: white;
    }

    .btn-secondary:hover {
        background: #5a6268;
    }
</style>