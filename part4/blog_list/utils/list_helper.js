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
  return { title: blogs[bestLovedIndex].title, author:blogs[bestLovedIndex].author, likes: blogs[bestLovedIndex].likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}