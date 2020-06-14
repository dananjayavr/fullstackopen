const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const receivedBlog = request.body

  if(!Object.prototype.hasOwnProperty.call(receivedBlog,'title') || !Object.prototype.hasOwnProperty.call(receivedBlog,'url')) {
    response.status(400).json({ error: 'Bad Request' })
  } else {
    if(!Object.prototype.hasOwnProperty.call(receivedBlog,'likes')) {
      receivedBlog['likes'] = 0
      const blog = new Blog(request.body)

      const createdBlog = await blog.save()
      response.status(201).json(createdBlog.toJSON())
    } else {
      const blog = new Blog(request.body)

      const createdBlog = await blog.save()
      response.status(201).json(createdBlog.toJSON())
    }
  }
})

module.exports = blogsRouter