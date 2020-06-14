const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('getting all blog entries', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('there are 6 notes', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog object contains id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.map(r => r.id)).toBeDefined()
})

test('creates a new blog entry', async () => {
  const newBlog = {
    title: 'Never Hertz to Ask',
    author: 'Alex Danco',
    url:'https://alexdanco.com/2020/06/14/never-hertz-to-ask/',
    likes:9
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

  const blogs= await Blog.find({})
  const blogsAtEnd = blogs.map(blog => blog.toJSON())

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain('Never Hertz to Ask')
})

test('a blog without likes property will default to zero', async () => {
  const newBlog = {
    title: 'Storytelling tips for technical interviews',
    author: 'David Stanete',
    url: 'https://stanete.com/storytelling-tips-technical-interviews'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

  const targetBlog = await Blog.find({ title:'Storytelling tips for technical interviews' })

  targetBlog.map(blog => expect(blog.likes).toEqual(0))

})

afterAll(() => {
  mongoose.connection.close()
})