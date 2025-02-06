const express = require('express');
const ctr = require('../controllers/blogctr');
const router = express.Router();


router.get('/new', ctr.viewCreate);
router.get('/edit/:id', ctr.viewEdit);
router.get('/:slug', ctr.viewBlog);
router.post('/',ctr.createBlog, ctr.saveBlogAndRedirect('new'));
router.put('/:id',ctr.editBlog, ctr.updateBlogAndRedirect('edit'));
router.delete('/:id',ctr.deleteBlog);

module.exports = router;