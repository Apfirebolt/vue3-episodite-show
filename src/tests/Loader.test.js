import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Loader from "../components/Loader.vue";

describe("Loader (Skeleton Grid)", () => {
  it("renders the component successfully", () => {
    const wrapper = mount(Loader);
    expect(wrapper.exists()).toBe(true);
  });

  it("has correct accessibility attributes", () => {
    const wrapper = mount(Loader);
    const container = wrapper.find('[role="status"]');
    
    expect(container.exists()).toBe(true);
    expect(container.attributes("aria-live")).toBe("polite");
    expect(wrapper.find(".sr-only").text()).toBe("Loading shows content...");
  });

  it("renders the default count of 6 skeleton cards", () => {
    const wrapper = mount(Loader);
    // Finds all card containers in the grid
    const cards = wrapper.findAll(".aspect-\\[3\\/4\\]");
    expect(cards.length).toBe(6);
  });

  it("renders a custom number of skeleton cards when count prop is passed", () => {
    const wrapper = mount(Loader, {
      props: {
        count: 12,
      },
    });
    const cards = wrapper.findAll(".aspect-\\[3\\/4\\]");
    expect(cards.length).toBe(12);
  });

  it("applies the animate-pulse class to the main wrapper", () => {
    const wrapper = mount(Loader);
    const root = wrapper.find('[role="status"]');
    expect(root.classes()).toContain("animate-pulse");
  });
});