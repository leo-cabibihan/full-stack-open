const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe("it gets the blog with most likes, if there are more than one have the most likes it just returns the first one it comes accross", () => {
  const oneElement = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
  ];

  test("with only one element in the list", () => {
    const result = listHelper.favoriteBlog(oneElement);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("gets author with most blog posts", () => {
  const oneElement = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
  ];
  test("only one element", () => {
    const result = listHelper.mostBlogs(oneElement);
    expect(result).toEqual();
  });
});

describe("gets author with most likes", () => {
  const oneElement = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
  ];
  test("only one element", () => {
    const result = listHelper.mostLikes(oneElement);
    expect(result).toEqual(oneElement[0]);
  });
});
