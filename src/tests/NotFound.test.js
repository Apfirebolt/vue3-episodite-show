import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NotFound from "../views/NotFound.vue";

describe("NotFound", () => {
  it("renders the component", () => {
    const wrapper = mount(NotFound);
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the 404 image", () => {
    const wrapper = mount(NotFound);
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("alt")).toBe("Not Found");
  });

  it('displays "Not Found Page" heading', () => {
    const wrapper = mount(NotFound);
    expect(wrapper.text()).toContain("Not Found Page");
  });

  it("displays error message", () => {
    const wrapper = mount(NotFound);
    expect(wrapper.text()).toContain(
      "The page you are looking for does not exist."
    );
  });

  it("has correct CSS classes for layout", () => {
    const wrapper = mount(NotFound);
    const container = wrapper.find(".flex");
    expect(container.exists()).toBe(true);
    expect(container.classes()).toContain("items-center");
    expect(container.classes()).toContain("justify-center");
  });

  it("has centered white card container", () => {
    const wrapper = mount(NotFound);
    const card = wrapper.find(".bg-white");
    expect(card.exists()).toBe(true);
    expect(card.classes()).toContain("rounded-lg");
    expect(card.classes()).toContain("shadow-md");
  });
});
