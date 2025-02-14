const Blog = require('../models/blogs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const viewLogin = (req, res) => {
    res.render('login');
};

const login = (req, res) => { 
    username = req.body.username;
    password = req.body.password;
    if (username === process.env.USER && password === process.env.PASS) {
        const token = jwt.sign({ username: username}, process.env.JWT_SECRET);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        res.redirect('/');
    } else {
      console.log(process.env.USER, " ", process.env.PASS);
      res.redirect('/login');
        
    }  
}

const show = (req) => {
    if(req.user === null){
        return false;
    }   
    return true;
}

const viewCreate = (req, res) => {
    res.render('new', { blog: new Blog() ,show: show(req)});
    
};

const viewEdit = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('edit', { blog: blog ,show: show(req)});
};

const viewBlog = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (blog == null) res.redirect('/');
  res.render('show', { blog: blog ,show: show(req)});
};

const createBlog = async (req, res, next) => {
  req.blog = new Blog();
  next();
};

const editBlog = async (req, res, next) => {
  req.Blog = await Blog.findById(req.params.id);
  next();
};

const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/');;
};

function saveBlogAndRedirect(path) {
  return async (req, res) => {
    let blog = new Blog();
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.markdown = req.body.markdown;
    
    try {
      blog = await blog.save();
      res.redirect(`/blogs/${blog.slug}`);
    } catch (e) {
        console.log(e);
      res.render(`${path}`, { blog: blog ,show: show(req)});
    }
  }
}
function updateBlogAndRedirect(path) {
  return async (req, res) => {
    let blog = await Blog.findById(req.params.id);
    try {
        blog = await Blog.findById(req.params.id);
        blog.markdown = req.body.markdown;
        await blog.save();
        
        res.redirect(`/blogs/${blog.slug}`);
    } catch (e) {
        console.log(e);
      res.render(`${path}`, { blog: blog ,show: show(req)});
    }
  }
}

module.exports = {
    viewBlog, viewCreate, viewEdit, createBlog, editBlog, deleteBlog, 
    saveBlogAndRedirect,updateBlogAndRedirect, viewLogin, login, show
}