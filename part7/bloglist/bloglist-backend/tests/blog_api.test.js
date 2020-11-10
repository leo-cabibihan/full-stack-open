const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "chicken chicken",
    author: "kfc",
    url: "a.com",
    likes: 20,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  let BlogObject = new Blog(initialBlogs[0]);
  await BlogObject.save();

  BlogObject = new Blog(initialBlogs[1]);
  await BlogObject.save();

  await api.post("/api/user").send({
    username: "chicken",
    password: "hello",
  });
});

describe("when there are some notes saved", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("unique identifier is id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("when adding new blogs", () => {
  test("post successfully creates blog post", async () => {
    const {
      body: { token },
    } = await api.post("/api/login").send({
      username: "chicken",
      password: "hello",
    });

    const newData = {
      title: "cows",
      author: "kfc",
      url: "a.com",
      like: 1,
    };

    await api
      .post("/api/blogs")
      .send(newData)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(response.body.map((r) => r.title)).toContain(newData.title);
  });

  test("likes property defaults to 0", async () => {
    const {
      body: { token },
    } = await api.post("/api/login").send({
      username: "chicken",
      password: "hello",
    });

    const newData = {
      title: "cows",
      author: "kfc",
      url: "a.com",
    };

    await api
      .post("/api/blogs")
      .send(newData)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(response.body.map((r) => r.likes)).toContain(0);
  });

  test("return code 400 if title or author not provided", async () => {
    const newData = {
      url: "a.com",
    };

    await api.post("/api/blogs").send(newData).expect(400);
  });
});

/*
describe("when deleting a blog post", () => {
  test("deletion is successful", async () => {
    const response = await api.get("/api/blogs");
    const { id } = response[0];
    expect(id).toBeDefined();
    await api.delete(`/api/blogs/${id}`).expect(204);
    const secondResponse = await api.get("/api/blogs");
    expect(secondResponse).toHaveLength(response.length - 1);
  });
});
describe("when updating a blog post", () => {
  test("the amount of likes change", async () => {
    const response = await api.get("/api/blogs");
    const firstItem = response[0];
    const { id } = firstItem;
    const newData = { ...firstItem, likes: firstItem.likes + 1 };
    await api.put(`/api/blogs${id}`).send(newData).expect(204);
    const secondResponse = await api
    .get(`/api/blogs/${id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
    expect(secondResponse).toEqual(newData);
  });
});

*/

afterAll(() => {
  mongoose.connection.close();
});
