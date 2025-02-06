const express = require('express');
const router = require('./routes/index');
const Blog = require('./models/blogs');
const config = require('./config/global');
const db = require('./config/connectdb');
const app = express();
require('dotenv').config();

const port = process.env.PORT_SERVER;
config(app);
db.connect();

app.get('/', async (req, res) => {
  const blog = await Blog.find().sort({ createdAt: 'desc' });
  res.render('index', { blogs: blog });
})

app.use('/blogs', router);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});