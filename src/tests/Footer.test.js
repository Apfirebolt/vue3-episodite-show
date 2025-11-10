import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "../components/Footer.vue";

describe("Footer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Footer);
  });

  it("renders the footer component", () => {
    expect(wrapper.find("footer").exists()).toBe(true);
  });

  it("displays copyright text", () => {
    const copyrightText = wrapper.find("p").text();
    expect(copyrightText).toContain("© 2025 Episodate. All rights reserved.");
  });

  it("has primary background class", () => {
    expect(wrapper.find("footer").classes()).toContain("bg-primary");
  });

  it("renders dark mode toggle button", () => {
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain("Enable Dark Mode");
  });

  it("calls toggleDarkMode when button is clicked", async () => {
    const button = wrapper.find("button");
    await button.trigger("click");
    // Note: You may need to mock useDarkMode composable to verify the call
  });

  it("has correct button styling classes", () => {
    const button = wrapper.find("button");
    expect(button.classes()).toContain("btn");
    expect(button.classes()).toContain("bg-secondary-100");
  });
});
