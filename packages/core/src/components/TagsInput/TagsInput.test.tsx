import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { HvTagsInput } from "@core/components";

import { ControlledTagArray } from "./TagsInput.stories";

describe("TagsInput examples", () => {
  describe("<ControlledTagArray />", () => {
    it("should clear the input whenever a tags gets added", async () => {
      const { getAllByRole, getByText, getByRole, findAllByRole } = render(
        <ControlledTagArray />
      );
      const uncommittedText = "uncommitted text";
      let clickableButtons = getAllByRole("button");

      expect(clickableButtons.length).toBe(5);
      const addTagButton = getByText("Add tags");
      const tagsInput = getByRole("textbox");

      fireEvent.change(tagsInput, { target: { value: uncommittedText } });
      expect(tagsInput).toHaveValue(uncommittedText);
      expect(clickableButtons.length).toBe(5);

      fireEvent.click(addTagButton);
      clickableButtons = await findAllByRole("button");
      expect(clickableButtons.length).toBe(6);
      expect(tagsInput).not.toHaveValue(uncommittedText);
    });

    it("should retain uncommitted text when deleting tags", async () => {
      render(<ControlledTagArray />);

      const uncommittedText = "uncommitted text";
      const clickableButtons = screen.getAllByRole("button");
      expect(clickableButtons.length).toBe(5);
      const tagsInput = screen.getByRole("textbox");

      fireEvent.change(tagsInput, { target: { value: uncommittedText } });
      expect(tagsInput).toHaveValue(uncommittedText);
      expect(clickableButtons.length).toBe(5);

      const lastTag = clickableButtons[4];
      fireEvent.click(lastTag.querySelector("[data-name=CloseXS]")!);

      expect((await screen.findAllByRole("button")).length).toBe(4);
      expect(tagsInput).toHaveValue(uncommittedText);
    });
  });
});

describe("TagsInput Component", () => {
  const mockClasses = {
    tagInputContainerRoot: "tagInputContainerRoot",
  };

  beforeEach(async () => {
    vi.useRealTimers();
  });

  Element.prototype.scrollTo = () => {};

  it("should render the label correctly", () => {
    const { getByText } = render(
      <HvTagsInput id="tags-list" label="Custom label" classes={mockClasses} />
    );
    expect(getByText("Custom label")).toBeInTheDocument();
  });

  it("should render the text area with tags when controlled and input value is an array of strings", () => {
    const { getByText, getAllByRole } = render(
      <HvTagsInput
        id="tags-list"
        label="Custom label"
        classes={mockClasses}
        value={["tag1", "tag2"]}
      />
    );

    expect(getByText("tag1")).toBeInTheDocument();
    expect(getByText("tag2")).toBeInTheDocument();

    const clickableButtons = getAllByRole("button");
    expect(clickableButtons.length).toBe(2);
  });

  it("should render the text area with tags when controlled and input value is an array of tags", () => {
    const { getByText, getAllByRole } = render(
      <HvTagsInput
        id="tags-list"
        label="Custom label"
        classes={mockClasses}
        value={[
          { label: "tag1" },
          { label: "tag2", type: "categorical", color: "#ff0000" },
        ]}
      />
    );

    expect(getByText("tag1")).toBeInTheDocument();
    expect(getByText("tag2")).toBeInTheDocument();

    const clickableButtons = getAllByRole("button");
    // categorical tags don't have close buttons - not trying to test the Tag's internal behavior here,
    // just that this component will render the tags correctly.
    expect(clickableButtons.length).toBe(1);
  });

  it("should trigger the delete callback on click", async () => {
    const onChangeSpy = vi.fn();
    const onDeleteSpy = vi.fn();

    render(
      <HvTagsInput
        id="tags-list"
        label="Custom label"
        classes={mockClasses}
        value={[{ label: "tag1" }, { label: "tag2" }]}
        onChange={onChangeSpy}
        onDelete={onDeleteSpy}
      />
    );

    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();

    const clickableButtons = screen.getAllByRole("button");
    expect(clickableButtons.length).toBe(2);
    const [, tag2] = clickableButtons;
    fireEvent.click(tag2.querySelector("[data-name=CloseXS]")!);

    const remainingButtons = await screen.findAllByRole("button");
    expect(onChangeSpy).toHaveBeenCalledWith(expect.any(Object), [
      { label: "tag1" },
    ]);
    expect(onDeleteSpy).toHaveBeenCalledWith(
      expect.any(Object),
      { label: "tag2" },
      1
    );

    // the value is controlled so it should not change only inform
    expect(remainingButtons.length).toBe(2);
  });

  it("should trigger the add callback", async () => {
    const onChangeSpy = vi.fn();
    const onAddSpy = vi.fn();
    const { getByText, getAllByRole, findAllByRole, getByRole } = render(
      <HvTagsInput
        id="tags-list"
        label="Custom label"
        classes={mockClasses}
        value={[{ label: "tag1" }, { label: "tag2" }]}
        onChange={onChangeSpy}
        onAdd={onAddSpy}
      />
    );

    expect(getByText("tag1")).toBeInTheDocument();
    expect(getByText("tag2")).toBeInTheDocument();

    const clickableButtons = getAllByRole("button");
    const tagsInput = getByRole("textbox");
    fireEvent.change(tagsInput, { target: { value: "tag3" } });
    expect(tagsInput).toHaveValue("tag3");
    expect(clickableButtons.length).toBe(2);
    fireEvent.keyDown(tagsInput, { code: "Enter", keyCode: 13 });
    const remainingButton = await findAllByRole("button");
    expect(onChangeSpy).toHaveBeenCalledWith(expect.any(Object), [
      { label: "tag1" },
      { label: "tag2" },
      { label: "tag3", type: "semantic" },
    ]);
    expect(onAddSpy).toHaveBeenCalledWith(
      expect.any(Object),
      { label: "tag3", type: "semantic" },
      2
    );
    // the value is controlled so it should not change only inform
    expect(remainingButton.length).toBe(2);
  });

  it("should trigger the onBlur callback", async () => {
    vi.useFakeTimers();
    const onChangeSpy = vi.fn();
    const onBlurSpy = vi.fn();
    const { getByText, getAllByRole, getByRole } = render(
      <HvTagsInput
        id="tags-list"
        label="Custom label"
        classes={mockClasses}
        value={[{ label: "tag1" }, { label: "tag2" }]}
        onChange={onChangeSpy}
        onBlur={onBlurSpy}
      />
    );
    const { parentElement } = getByText("Custom label");
    // @ts-ignore
    const { parentElement: formContainer } = parentElement;
    expect(getByText("tag1")).toBeInTheDocument();
    expect(getByText("tag2")).toBeInTheDocument();

    const clickableButtons = getAllByRole("button");
    const tagsInput = getByRole("textbox");
    fireEvent.change(tagsInput, { target: { value: "tag3" } });
    expect(tagsInput).toHaveValue("tag3");
    expect(clickableButtons.length).toBe(2);
    fireEvent.blur(formContainer);
    vi.runAllTimers();
    // const remainingButton = await findAllByRole("button");
    expect(onBlurSpy).toHaveBeenCalledWith(expect.any(Object), "tag3");
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(tagsInput).toHaveValue("tag3");
    // // the value is controlled so it should not change only inform
    // expect(remainingButton.length).toBe(2);
  });

  it("should have a disabled tag if the `disabled` property is set to true", () => {
    const { queryAllByRole } = render(
      <HvTagsInput
        id="tags-list"
        label="Custom label"
        classes={mockClasses}
        disabled
        value={[{ label: "tag1" }, { label: "tag2", type: "categorical" }]}
      />
    );

    const clickableButtons = queryAllByRole("button");
    expect(clickableButtons.length).toBe(0);
  });

  it("should not display close buttons on readOnly tags", () => {
    const { queryAllByRole } = render(
      <HvTagsInput
        id="tags-list"
        label="Custom label"
        classes={mockClasses}
        readOnly
        value={[{ label: "tag1" }, { label: "tag2", type: "categorical" }]}
      />
    );

    const clickableButtons = queryAllByRole("button");
    expect(clickableButtons.length).toBe(0);
  });

  it("should call the suggestions callback when the input is changed", () => {
    const suggestionHandler = vi.fn();

    const { getByRole } = render(
      <HvTagsInput
        id="tags-list"
        label="Custom label"
        classes={mockClasses}
        value={[{ label: "tag1" }, { label: "tag2" }]}
        suggestionListCallback={suggestionHandler}
      />
    );

    const tagsInput = getByRole("textbox");

    fireEvent.change(tagsInput, { target: { value: "a" } });
    expect(suggestionHandler).toHaveBeenCalled();
  });
});
