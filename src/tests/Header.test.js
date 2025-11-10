import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../components/Header.vue";

describe("Header", () => {
  it("renders navigation items", () => {
    const wrapper = mount(Header);
    expect(wrapper.text()).toContain("Home");
  });

  it("displays mobile menu button on small screens", () => {
    const wrapper = mount(Header);
    const mobileButton = wrapper.find("button");
    expect(mobileButton.exists()).toBe(true);
  });

  it("renders router-link for navigation items in desktop view", () => {
    const wrapper = mount(Header, {
      global: {
        stubs: ["router-link"],
      },
    });
    const routerLinks = wrapper.findAllComponents({ name: "router-link" });
    expect(routerLinks.length).toBeGreaterThan(0);
  });

  it("has correct navigation structure", () => {
    const wrapper = mount(Header);
    expect(wrapper.vm.navigation).toEqual([
      { name: "Home", href: "#", current: true },
    ]);
  });

  it("renders DisclosurePanel with mobile navigation", () => {
    const wrapper = mount(Header);
    expect(wrapper.findComponent({ name: "DisclosurePanel" }).exists()).toBe(
      true
    );
  });

  it("applies correct CSS classes to nav element", () => {
    const wrapper = mount(Header);
    const nav = wrapper.find("nav");
    expect(nav.classes()).toContain("bg-primary");
    expect(nav.classes()).toContain("text-secondary-100");
  });
});
