const _ = require('lodash')

const initialBlogs = [{ _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]

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
  mostLikes,
  initialBlogs
}