const express = require('express');
const {authentication1, authentication2} = require('../middleware/admin');
const ctr = require('../controllers/blogctr');
const router = express.Router();


router.get('/new', authentication2, ctr.viewCreate);
router.get('/edit/:id', authentication2, ctr.viewEdit);
router.get('/:slug', authentication1, ctr.viewBlog);
router.post('/', authentication2,ctr.createBlog, ctr.saveBlogAndRedirect('new'));
router.put('/:id', authentication2, ctr.editBlog, ctr.updateBlogAndRedirect('edit'));
router.delete('/:id', authentication2, ctr.deleteBlog);

module.exports = router;