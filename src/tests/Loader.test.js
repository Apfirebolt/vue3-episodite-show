import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Loader from "../components/Loader.vue";

describe("Loader", () => {
  it("renders the component", () => {
    const wrapper = mount(Loader);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays "Loading..." text', () => {
    const wrapper = mount(Loader);
    expect(wrapper.text()).toContain("Loading...");
  });

  it("has correct container classes", () => {
    const wrapper = mount(Loader);
    const container = wrapper.find("div");
    expect(container.classes()).toContain("container");
    expect(container.classes()).toContain("mx-auto");
    expect(container.classes()).toContain("py-4");
  });

  it("renders h1 element with correct classes", () => {
    const wrapper = mount(Loader);
    const heading = wrapper.find("h1");
    expect(heading.exists()).toBe(true);
    expect(heading.classes()).toContain("text-2xl");
    expect(heading.classes()).toContain("font-bold");
  });

  it("has correct component name", () => {
    expect(Loader.name).toBe("Loader");
  });
});
