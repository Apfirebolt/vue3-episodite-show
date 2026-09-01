import { describe, it, expect, beforeEach } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import Header from "../components/Header.vue";

const mountOptions = {
  global: {
    stubs: {
      RouterLink: RouterLinkStub,
      // Provide simple stubs for Headless UI components to expose their default slots
      Disclosure: {
        template: '<nav class="shrink-0 bg-primary text-secondary-100"><slot :open="false" /></nav>',
      },
      DisclosureButton: {
        template: "<button><slot /></button>",
      },
      DisclosurePanel: {
        template: '<div class="disclosure-panel"><slot /></div>',
      },
    },
  },
};

describe("Header.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(Header, mountOptions);
  });

  it("renders the brand logo linking to the root path", () => {
    const brandLink = wrapper.findComponent(RouterLinkStub);
    expect(brandLink.exists()).toBe(true);
    expect(brandLink.props().to).toBe("/");
    expect(wrapper.text()).toContain("Brand");
  });

  it("renders desktop and mobile navigation links", () => {
    const text = wrapper.text();
    expect(text).toContain("Home");
    expect(text).toContain("About");
    expect(text).toContain("Gallery");
  });

  it("binds the correct router-link destinations to nav items", () => {
    const routerLinks = wrapper.findAllComponents(RouterLinkStub);
    const destinations = routerLinks.map((link) => link.props().to);

    expect(destinations).toContainEqual({ name: "Home" });
    expect(destinations).toContainEqual({ name: "About" });
    expect(destinations).toContainEqual({ name: "Gallery" });
  });

  it("renders the mobile menu toggle button with accessible label", () => {
    const mobileButton = wrapper.find("button");
    expect(mobileButton.exists()).toBe(true);
    expect(wrapper.find(".sr-only").text()).toBe("Toggle main menu");
  });

  it("renders the mobile drawer DisclosurePanel", () => {
    expect(wrapper.find(".disclosure-panel").exists()).toBe(true);
  });

  it("applies the theme background and text classes to nav container", () => {
    const nav = wrapper.find("nav");
    expect(nav.classes()).toContain("bg-primary");
    expect(nav.classes()).toContain("text-secondary-100");
  });
});