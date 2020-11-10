import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";
import { prettyDOM } from "@testing-library/dom";

describe("<BlogForm />", () => {
  let component;
  const action = jest.fn();
  beforeEach(() => {
    component = render(<BlogForm action={action} />);
  });

  test("<BlogForm /> updates parent state and calls onSubmit", () => {
    const inputs = component.container.querySelectorAll("input");
    const someData = ["meh", "something", "idk"];
    inputs.forEach((input, i) => {
      fireEvent.change(input, {
        target: { value: someData[i] },
      });
    });
    const form = component.container.querySelector("form");

    fireEvent.submit(form);
    expect(action.mock.calls).toHaveLength(1);
    expect(action.mock.calls[0][0]).toBe("meh");
  });
});
