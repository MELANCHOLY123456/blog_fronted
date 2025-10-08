/**
 * 统一错误处理工具
 */

/**
 * 处理API错误
 * @param {Error} error - 错误对象
 * @param {string} defaultMessage - 默认错误消息
 * @returns {string} 格式化后的错误消息
 */
export const handleApiError = (error, defaultMessage = '操作失败') => {
  if (error.response) {
    // 服务器返回错误状态码
    const { status, data } = error.response;
    
    // 根据状态码返回不同的错误信息
    switch (status) {
      case 400:
        return data.message || '请求参数错误';
      case 401:
        return '未授权访问，请重新登录';
      case 403:
        return '权限不足，无法访问';
      case 404:
        return '请求的资源不存在';
      case 500:
        return '服务器内部错误';
      default:
        return data.message || defaultMessage;
    }
  } else if (error.request) {
    // 网络错误
    return '网络连接失败，请检查网络设置';
  } else {
    // 其他错误
    return error.message || defaultMessage;
  }
};

/**
 * 显示错误消息
 * @param {string} message - 错误消息
 * @param {string} type - 消息类型 (error, warning, info, success)
 */
export const showMessage = (message, type = 'error') => {
  // 在开发环境输出错误信息到控制台
  if (import.meta.env.DEV) {
    if (type === 'error') {
      console.error('[API Error]', message);
    } else {
      console.log(`[${type.toUpperCase()}]`, message);
    }
  }
  
  // 如果有Element UI或其他UI库，可以在这里调用其消息组件
  // 例如: this.$message({ message, type });
  
  // 简单的浏览器原生提示（仅用于演示）
  // alert(`${type.toUpperCase()}: ${message}`);
};

/**
 * 处理文章数据
 * @param {Array} articles - 原始文章数据
 * @returns {Array} 处理后的文章数据
 */
export const processArticlesData = (articles) => {
  if (!Array.isArray(articles)) {
    return [];
  }

  return articles.map(article => {
    // 确保categories字段是数组
    let categories = [];
    if (Array.isArray(article.categories)) {
      categories = article.categories;
    } else if (typeof article.categories === 'string') {
      // 如果是字符串，尝试解析为数组
      try {
        categories = JSON.parse(article.categories);
      } catch (e) {
        categories = [article.categories];
      }
    } else if (article.categories) {
      categories = [article.categories];
    }
    
    return {
      ...article,
      categories: categories,
      // 添加默认头像字段
      avatar: null
    };
  });
};

export default {
  handleApiError,
  showMessage,
  processArticlesData
};