# Codex Web Lab

一个用于熟悉 Codex Web 的轻量测试应用。项目只使用 HTML、CSS 和原生 JavaScript，适合练习让 Codex 阅读代码、修改界面、增加功能、运行测试以及审查变更。

## 本地运行

```bash
npm start
```

然后打开 <http://localhost:4173>。

## 测试

```bash
npm test
```

## 建议练习

1. 请 Codex 解释仓库结构以及页面渲染流程。
2. 请 Codex 增加任务筛选、截止日期或拖拽排序。
3. 请 Codex 改变主题样式，并比较修改前后的差异。
4. 故意制造一个错误，让 Codex 定位并修复它。

任务会保存在浏览器的 `localStorage` 中，刷新页面不会丢失。
