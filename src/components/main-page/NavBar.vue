<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/about">关于我</router-link></li>
      <li><router-link to="/articles">文章页</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  width: 90%;
  max-width: 900px;
  margin: 0 auto 1.2rem auto;
  background: var(--card-bg);
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(60, 100, 180, 0.07), 0 1.5px 4px rgba(0,0,0,0.03);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  z-index: 10;
}
.navbar ul {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.navbar li {
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.navbar a {
  color: var(--text-color);
  text-decoration: none;
  padding: 0.3rem 1.2rem;
  border-radius: 6px;
  transition: background 0.18s, color 0.18s;
}
.navbar a.router-link-active,
.navbar a:hover {
  background: var(--primary-color);
  color: #fff;
  transition: background 0.18s, color 0.18s;
}
</style>
