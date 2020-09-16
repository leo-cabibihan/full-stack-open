import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    author: "dave",
    title: "null",
    user: {
      username: "someone",
    },
  };

  const component = render(<Blog blog={blog} />);

  component.debug();

  expect(component.container).toHaveTextContent("null dave");
});
