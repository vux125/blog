const Blog = require('../models/blogs')

const viewCreate = (req, res) => {
    res.render('new', { blog: new Blog() });
    
};

const viewEdit = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('edit', { blog: blog });
};

const viewBlog = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (blog == null) res.redirect('/');
  console.log(blog);
  res.render('show', { blog: blog });
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
    console.log(blog);
    try {
      blog = await blog.save();
      console.log(blog);
      res.redirect(`/blogs/${blog.slug}`);
    } catch (e) {
        console.log(e);
      res.render(`${path}`, { blog: blog });
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
        console.log(blog);
        res.redirect(`/blogs/${blog.slug}`);
    } catch (e) {
        console.log(e);
      res.render(`${path}`, { blog: blog });
    }
  }
}

module.exports = {
    viewBlog, viewCreate, viewEdit, createBlog, editBlog, deleteBlog, saveBlogAndRedirect,updateBlogAndRedirect
}