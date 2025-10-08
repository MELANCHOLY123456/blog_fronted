# 前端项目文档

## 项目概述

这是一个使用Vue 3 + Vite构建的现代化博客前端应用，采用模块化组件设计，支持主题切换和响应式布局。

## 技术栈

- Vue 3 (Composition API)
- Vue Router 4
- Axios (HTTP客户端)
- Tailwind CSS (样式框架)
- FontAwesome (图标库)

## 项目结构

```
src/
├── assets/           # 静态资源文件
│   ├── pic/          # 图片资源
│   └── style/        # 全局样式
├── components/       # 可复用组件
│   ├── common/       # 通用组件
│   └── main-page/    # 主页面组件
├── layouts/          # 布局组件
├── views/            # 页面级组件
├── router/           # 路由配置
├── services/         # API服务层
├── utils/            # 工具函数
├── App.vue           # 根组件
└── main.js           # 入口文件
```

## 克隆和运行项目

### 1. 克隆项目

```bash
git clone <your-repository-url>
cd frontend
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制`.env.example`文件并重命名为`.env`，根据需要修改配置：

```bash
cp .env.example .env
```

编辑`.env`文件：
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=眸冷但骨不累
```

### 4. 启动开发服务器

```bash
npm run dev
```

默认访问地址: http://localhost:5173

### 5. 构建生产版本

```bash
npm run build
```

构建后的文件位于`dist/`目录中。

## 功能特性

1. 响应式设计，支持移动端和桌面端
2. 深色/浅色主题切换
3. 文章列表展示
4. 文章详情查看
5. 分类文章筛选
6. 回到顶部功能

## API服务层

项目采用统一的API服务层管理所有HTTP请求，位于`src/services/api.js`，支持：
- 统一的错误处理
- 请求/响应拦截器
- 环境变量配置

## 工具函数

项目包含统一的工具函数，位于`src/utils/errorHandler.js`，提供：
- 错误处理
- 消息显示
- 数据处理

## 部署说明

1. 构建项目: `npm run build`
2. 将`dist`目录中的文件部署到Web服务器
3. 配置服务器支持Vue Router的history模式(如果使用)

## 注意事项

1. 确保后端API服务正常运行
2. 开发时注意跨域问题，已在vite.config.js中配置代理
3. 主题切换状态会保存在localStorage中
4. 环境变量以VITE_开头才能在客户端访问