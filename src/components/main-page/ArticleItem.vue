<template>
    <div class="article" @click="$emit('click')">
        <div class="article-body">
            <div class="article-meta">
                <div class="article-meta-left">
                <span class="author-avatar">
                    <img :src="avatarImg" alt="头像" class="avatar-img" />
                </span>
                <span class="article-author">{{ author }}</span>
                </div>
                <span class="article-time">{{ formattedUploadTime }}</span>
            </div>
            <h3 class="article-title">
                <router-link :to="`/article/${id}`">{{ title }}</router-link>
            </h3>
            <p class="article-content">{{ content }}</p> 
        </div>
    </div>
</template>

<script>
import melancholy from '@/assets/pic/melancholy.jpg'
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        title: { 
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        uploadTime: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: null
        }
    },
    computed: {
        formattedUploadTime() {
            const date = new Date(this.uploadTime);
            return date.toLocaleString();
        },
        avatarImg() {
            // 如果avatar为null或未提供，则使用默认头像
            return this.avatar || melancholy;
        }
    }
};
</script>

<style scoped>
.article {
    display: flex;
    flex-direction: column;
    background: var(--card-bg);
    border-radius: 14px;
    box-shadow: 0 4px 16px rgba(60, 100, 180, 0.07), 0 1.5px 4px rgba(0,0,0,0.03);
    border: 1px solid var(--border-color);
    margin-bottom: 24px;
    transition: box-shadow 0.2s, transform 0.2s;
    cursor: pointer;
    width: 100%;
    color: var(--text-color);
    border: 1.5px solid var(--border-color);
    transition: box-shadow 0.2s, transform 0.2s, border 0.2s;
}

.article:hover {
    box-shadow: 0 8px 32px var(--shadow-color), 0 3px 8px rgba(0,0,0,0.06);
    border: 1.5px solid var(--primary-color); 
    transform: translateY(-3px) scale(1.01);
}

.article-body {
    padding: 1.5rem 2rem 1.2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}

.article-meta {
    font-size: 0.95rem;
    color: var(--meta-color);
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    align-items: center;
}

.article-meta-left {
    display: flex;
    align-items: center;
    gap: 0.4rem; /* 控制头像和名字的间距 */
}

.article-author {
    font-weight: 500;
}

.article-title {
    font-size: 1.22rem;
    font-weight: 800;
    margin: 0 0 0.2rem 0;
    letter-spacing: 0.5px;
    line-height: 1.4;
}

.article-title a,
.article-title .router-link {
    color: var(--text-color);
    font-weight: 800;
    font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 2px;
    transition: color 0.2s, text-decoration-color 0.2s, text-decoration-thickness 0.2s;
    cursor: pointer;
}
.article-title a:hover,
.article-title .router-link:hover {
    color: var(--primary-color);
    text-decoration-color: var(--primary-color);
    text-decoration-thickness: 3px;
}

.article-content {
    font-size: 1.08rem;
    color: var(--text-color);
    line-height: 1.7;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    border-top: 1px solid var(--border-color);
    padding-top: 0.7rem;
}

.author-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--accent-color);
    margin-right: 0.5rem;
    box-shadow: 0 1px 4px var(--shadow-color);
    overflow: hidden;
}
.avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
}
</style>