import { describe, it, expect, beforeEach } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import NotFound from "../views/NotFound.vue";

describe("NotFound.vue (Option 2 - Bento Layout)", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NotFound, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  });

  it("renders the 404 error badge and headings", () => {
    expect(wrapper.text()).toContain("Error 404");
    expect(wrapper.text()).toContain("Looking for something?");
    expect(wrapper.text()).toContain(
      "We couldn't locate that page. Try one of the links below to continue browsing."
    );
  });

  it("renders all navigation router-links with proper targets", () => {
    const links = wrapper.findAllComponents(RouterLinkStub);
    
    // Expect 3 links: "Browse Shows", "Search Database", and "Return to main dashboard"
    expect(links.length).toBe(3);

    // Verify each link redirects to home / root destination
    links.forEach((link) => {
      expect(link.props().to).toBe("/");
    });
  });

  it("renders the Browse Shows and Search Database card sections", () => {
    expect(wrapper.text()).toContain("Browse Shows");
    expect(wrapper.text()).toContain("Explore top-rated and trending TV series.");
    expect(wrapper.text()).toContain("Search Database");
    expect(wrapper.text()).toContain("Find specific episodes and air schedules.");
  });

  it("applies proper theme and responsive layout classes", () => {
    const root = wrapper.find("div");
    expect(root.classes()).toContain("min-h-screen");
    expect(root.classes()).toContain("bg-slate-50");

    const grid = wrapper.find(".grid");
    expect(grid.classes()).toContain("grid-cols-1");
    expect(grid.classes()).toContain("sm:grid-cols-2");
  });
});