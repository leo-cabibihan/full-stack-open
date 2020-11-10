import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import { prettyDOM } from "@testing-library/dom";

describe("<Blog />", () => {
  const blog = {
    author: "dave",
    title: "null",
    likes: 10,
    user: {
      username: "someone",
    },
  };

  const like = jest.fn();

  let component;

  beforeEach(() => {
    component = render(<Blog blog={blog} like={like} />);
  });

  test("renders content", () => {
    expect(component.container).toHaveTextContent("null dave");
  });

  test("shows likes on click", () => {
    const button = component.container.querySelector(".toggleButton");
    console.log(prettyDOM(button));
    fireEvent.click(button);

    const likes = component.container.querySelector(".likes");
    expect(likes).toHaveTextContent("10");
  });

  test("like button works", () => {
    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(like.mock.calls).toHaveLength(2);
  });
});
