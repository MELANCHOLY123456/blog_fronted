<template>
    <div class="article-editor">
        <div class="editor-wrapper">
            <form @submit.prevent="saveArticle" class="editor-form">
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
                    <label for="publishDate">发布日期:</label>
                    <input 
                        type="date" 
                        id="publishDate" 
                        v-model="articleData.publish_date" 
                        class="form-input"
                    />
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
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                        {{ isSubmitting ? '保存中...' : '保存文章' }}
                    </button>
                    <button type="button" class="btn btn-secondary" @click="cancelEdit">
                        取消
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { articleService } from '@/services/api';
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
                articleData: {
                    title: '',
                    content: '',
                    author: '',
                    publish_date: this.getCurrentDate()
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
            // 如果是编辑模式，获取文章详情
            if (this.isEditing) {
                await this.loadArticle();
            }
        },
        methods: {
            /**
             * 获取当前日期字符串
             * @returns {string} YYYY-MM-DD格式的日期
             */
            getCurrentDate() {
                const today = new Date();
                return today.toISOString().split('T')[0];
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
                            publish_date: response.data.data.publish_date 
                                ? response.data.data.publish_date.split('T')[0] 
                                : this.getCurrentDate()
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
                    let response;
                    if (this.isEditing) {
                        // 更新文章
                        response = await articleService.updateArticle(this.articleId, this.articleData);
                    } else {
                        // 创建文章
                        response = await articleService.createArticle(this.articleData);
                    }
                    
                    if (response.data.status === 'success') {
                        // 保存成功，返回文章列表页
                        this.$router.push('/articles');
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
        flex: 1;
        min-width: 0;
        padding-left: 2rem;
    }

    .editor-wrapper {
        max-width: 800px;
        margin: 0 auto;
    }

    .editor-form {
        background: var(--card-bg);
        padding: 2rem;
        border-radius: 14px;
        box-shadow: 0 4px 16px rgba(60, 100, 180, 0.07), 0 1.5px 4px rgba(0,0,0,0.03);
        border: 1px solid var(--border-color);
        margin-top: 0;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: var(--text-color);
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