const express = require('express');
const router = require('./routes/index');
const Blog = require('./models/blogs');
const config = require('./config/global');
const db = require('./config/connectdb');
const app = express();
const {authentication1} = require('./middleware/admin');
const {viewLogin, login, show} = require('./controllers/blogctr');
require('dotenv').config();

const port = process.env.PORT_SERVER;
config(app);
db.connect();

app.get('/', authentication1,async (req, res) => {
  console.log(req);
  const blog = await Blog.find().sort({ createdAt: 'desc' });
  res.render('index', { blogs: blog , show: show(req)});
})

app.get('/login', viewLogin);
app.post('/login', login);  
app.get('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.redirect('/');
});

app.use('/blogs', router);

app.listen(port, (req,res) => {
  console.log(req);
  console.log(`Example app listening at http://localhost:${port}`);
});