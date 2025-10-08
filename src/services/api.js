import axios from 'axios';

// 从环境变量获取API基础URL，如果没有则使用默认值
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证token等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 文章相关API
 */
export const articleService = {
  /**
   * 获取所有文章（包含分类信息）
   * @returns {Promise}
   */
  getArticlesWithCategories() {
    return apiClient.get('/api/categories/articles-with-categories');
  },

  /**
   * 根据ID获取文章详情
   * @param {number|string} id - 文章ID
   * @returns {Promise}
   */
  getArticleById(id) {
    return apiClient.get(`/api/articles/${id}`);
  }
};

/**
 * 分类相关API
 */
export const categoryService = {
  /**
   * 获取所有分类
   * @returns {Promise}
   */
  getCategories() {
    return apiClient.get('/api/categories');
  },

  /**
   * 根据分类名称获取文章
   * @param {string} categoryName - 分类名称
   * @returns {Promise}
   */
  getArticlesByCategory(categoryName) {
    return apiClient.get(`/api/categories/${encodeURIComponent(categoryName)}/articles`);
  }
};

export default apiClient;