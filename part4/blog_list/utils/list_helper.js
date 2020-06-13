const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, currentLikes) => (sum + currentLikes)
  const blogLikes = blogs.map((blog) => blog.likes)
  return blogLikes.length === 1 ? blogLikes.find((x) => x) : blogLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const blogLikes = blogs.map((blog) => blog.likes)
  const bestLovedIndex = blogLikes.indexOf(Math.max(...blogLikes))
  return { title: blogs[bestLovedIndex].title, author: blogs[bestLovedIndex].author, likes: blogs[bestLovedIndex].likes }
}

const mostBlogs = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  const mostBlogsAuthor = _.orderBy(authors, ['desc']).pop()
  return {
    author: mostBlogsAuthor[0].author,
    blogs: mostBlogsAuthor.length
  }
}

const mostLikes = (blogs) => {

  const authors = _.groupBy(blogs, 'author')
  const authorNames = Object.keys(authors)
  const authorsLikes = Object.create({})

  authorNames.forEach(name => {
    authorsLikes[name] = _.sumBy(authors[name], (o) => o.likes)
  })

  const mostLikes = Math.max(...Object.values(authorsLikes))
  const mostLikesAuthor = Object.keys(authorsLikes).find(key => authorsLikes[key] === mostLikes)

  const response = Object.create({})
  response['author'] = mostLikesAuthor
  response['likes'] = mostLikes

  return response
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}