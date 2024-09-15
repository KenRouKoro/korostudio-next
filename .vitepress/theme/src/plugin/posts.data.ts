// posts.data.js
import { createContentLoader } from "vitepress";

export default createContentLoader("**/*.md",{
  includeSrc: true, // 包含原始 markdown 源?
  excerpt: true
});
// "**/*.md": 匹配 docs 文件夹（包含子文件夹）内的所有 md 文件
