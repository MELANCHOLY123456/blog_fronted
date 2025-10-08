<template>
  <div class="home-intro">
    <p v-for="(line, idx) in displayedLines" :key="idx">
      {{ line }}
      <span v-if="cursorIndex === idx" class="cursor">|</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lines: [
        "你好！我是杨昊博，一名计算机专业的本科生，目前正处于探索计算机世界的旅程中。",
        "我搭建这个博客的初衷是希望记录和分享自己在学习计算机底层、数据结构与算法、深度学习与人工智能等领域的所思所感。希望我的经历和思考，能为同样走在自学路上的你带来一些启发和帮助。",
        "计算机世界广阔而神秘，但只要我们愿意不断探索，就一定能一层层揭开它的面纱。欢迎你和我一起，对计算机“祛魅”，共同成长！点击上方文章页，开启你的探索之旅吧！"
      ],
      displayedLines: ["", "", ""],
      typingSpeed: 120,
      linePause: 800,
      restartPause: 2000,
      cursorIndex: 0
    };
  },
  mounted() {
    this.startTyping();
  },
  methods: {
    startTyping() {
      this.displayedLines = ["", "", ""];
      this.cursorIndex = 0;
      this.typeLines(0);
    },
    typeLines(lineIdx) {
      if (lineIdx >= this.lines.length) {
        setTimeout(() => {
          this.startTyping();
        }, this.restartPause);
        return;
      }
      let line = this.lines[lineIdx];
      let display = "";
      let i = 0;
      this.cursorIndex = lineIdx;
      const timer = setInterval(() => {
        display += line[i];
        this.displayedLines[lineIdx] = display;
        i++;
        if (i >= line.length) {
          clearInterval(timer);
          setTimeout(() => {
            this.typeLines(lineIdx + 1);
          }, this.linePause);
        }
      }, this.typingSpeed);
    }
  }
};
</script>

<style scoped>
.home-intro {
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;      /* 水平居中内容块 */
}
.home-intro p {
  font-size: 1.6rem;
  color: var(--meta-color, #444);
  min-height: 2.5rem;
  letter-spacing: 1px;
  transition: color 0.3s;
  max-width: 800px;
  margin: 0 0 1.8rem 0;
  line-height: 2.8rem;
  word-break: break-all;
  text-align: left;         /* 文字左对齐 */
}
.cursor {
  display: inline-block;
  width: 1ch;
  animation: blink 1s steps(1) infinite;
  color: var(--text-color, #222);
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
