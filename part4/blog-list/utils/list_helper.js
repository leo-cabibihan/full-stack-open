const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((acc, cur) => acc + cur.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce((acc, cur) => (acc < cur.likes ? cur : acc), 0);

const mostBlogs = (blogs) => {
  const frequencies = new Map();
  blogs.forEach(({ author }) => {
    frequencies.has(author)
      ? frequencies.set(author, frequencies.get(author) + 1)
      : frequencies.set(author, 1);
  });
  return [...frequencies.entries()].reduce(
    (acc, cur) => (acc < cur[1] ? cur : acc),
    []
  )[0];
};

const mostLikes = (blogs) => {
  const frequencies = new Map();
  blogs.forEach((blog) => {
    const { author, likes } = blog;
    frequencies.has(author)
      ? frequencies.set(author, frequencies.get(author) + likes)
      : frequencies.set(author, likes);
  });
  return [...frequencies.entries()].reduce((acc, cur) =>
    acc < cur[1] ? cur : acc
  )[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
