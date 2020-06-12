const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, currentLikes) => (sum + currentLikes)
  const blogLikes = blogs.map((blog) => blog.likes)
  return blogLikes.length === 1 ? blogLikes.find((x) => x) : blogLikes.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}