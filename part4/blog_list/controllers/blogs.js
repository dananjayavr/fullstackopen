const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const receivedBlog = request.body

  if(!Object.prototype.hasOwnProperty.call(receivedBlog,'likes')) {
    receivedBlog['likes'] = 0
  }

  const blog = new Blog(request.body)

  const createdBlog = blog.save()
  response.status(201).json(createdBlog)
})

module.exports = blogsRouter