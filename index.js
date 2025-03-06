const express = require('express');
const path = require('path');
const marked = require('marked');

const app = express();
const port = process.env.PORT || 3000;

// 设置静态文件目录
app.use(express.static('public'));
app.use(express.json());

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

// 主页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 处理Markdown转换的API端点
app.post('/api/render/markdown', (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: '内容不能为空' });
    }
    const html = marked.parse(content);
    res.json({ html });
  } catch (error) {
    console.error('Markdown渲染错误:', error);
    res.status(500).json({ error: '渲染失败' });
  }
});

// 处理HTML预览的API端点
app.post('/api/render/html', (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: '内容不能为空' });
    }
    res.json({ html: content });
  } catch (error) {
    console.error('HTML处理错误:', error);
    res.status(500).json({ error: '处理失败' });
  }
});

// 处理SVG预览的API端点
app.post('/api/render/svg', (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: '内容不能为空' });
    }
    res.json({ svg: content });
  } catch (error) {
    console.error('SVG处理错误:', error);
    res.status(500).json({ error: '处理失败' });
  }
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});