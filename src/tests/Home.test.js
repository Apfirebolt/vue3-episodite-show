import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import { nextTick } from "vue";
import Home from "../views/Home.vue";
import httpClient from "../plugins/interceptor";

vi.mock("../plugins/interceptor", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockShowsData = {
  tv_shows: [
    {
      id: 1,
      name: "Test Show",
      permalink: "test-show",
      image_thumbnail_path: "http://example.com/image.jpg",
      status: "Running",
      network: "Test Network",
      country: "US",
      start_date: "2020-01-01",
      end_date: null,
    },
    {
      id: 2,
      name: "Test Show 2",
      permalink: "test-show-2",
      image_thumbnail_path: "http://example.com/image2.jpg",
      status: "Ended",
      network: "Test Network 2",
      country: "UK",
      start_date: "2019-01-01",
      end_date: "2021-12-31",
    },
  ],
};

const mountOptions = {
  global: {
    stubs: {
      Header: true,
      Loader: { template: '<div class="loader-stub">Loading...</div>' },
      RouterLink: RouterLinkStub,
      Menu: { template: "<div><slot /></div>" },
      MenuButton: { template: "<button><slot /></button>" },
      MenuItems: { template: "<div><slot /></div>" },
      MenuItem: { template: "<div><slot :active=\"false\" /></div>" },
    },
  },
};

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(httpClient.get).mockResolvedValue({ data: mockShowsData });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render component", () => {
    const wrapper = mount(Home, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });

  it("should fetch most popular shows on mount", async () => {
    mount(Home, mountOptions);
    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith("most-popular?page=1");
  });

  it("should display loader when data is fetching initially", async () => {
    vi.mocked(httpClient.get).mockReturnValue(new Promise(() => {}));
    const wrapper = mount(Home, mountOptions);
    await nextTick();

    expect(wrapper.find(".loader-stub").exists()).toBe(true);
  });

  it("should display shows list when data is loaded", async () => {
    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    const articles = wrapper.findAll("article");
    expect(articles.length).toBe(2);
  });

  it("should search shows when search form is submitted", async () => {
    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    await wrapper.find("#search").setValue("Breaking Bad");
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith("search?q=Breaking%20Bad&page=1");
    expect(wrapper.text()).toContain('Search Results for "Breaking Bad"');
  });

  it("should navigate to next page and fetch page 2", async () => {
    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    const nextButton = wrapper
      .findAll("button")
      .find((btn) => btn.text().includes("Next Page"));

    expect(nextButton).toBeDefined();
    await nextButton?.trigger("click");
    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith("most-popular?page=2");
    expect(wrapper.text()).toContain("Navigation (Page 2)");
  });

  it("should navigate to previous page when on page 2 or higher", async () => {
    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    const nextButton = wrapper
      .findAll("button")
      .find((btn) => btn.text().includes("Next Page"));
    const prevButton = wrapper
      .findAll("button")
      .find((btn) => btn.text().includes("Previous Page"));

    // Advance to page 2 first
    await nextButton?.trigger("click");
    await flushPromises();
    expect(httpClient.get).toHaveBeenCalledWith("most-popular?page=2");

    // Click previous back to page 1
    await prevButton?.trigger("click");
    await flushPromises();
    expect(httpClient.get).toHaveBeenCalledWith("most-popular?page=1");
  });

  it("should disable previous page button when on page 1", async () => {
    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    const prevButton = wrapper
      .findAll("button")
      .find((btn) => btn.text().includes("Previous Page"));

    expect(prevButton?.attributes("disabled")).toBeDefined();

    const callsCountBefore = vi.mocked(httpClient.get).mock.calls.length;
    await prevButton?.trigger("click");
    await flushPromises();

    // No extra calls should be made
    expect(vi.mocked(httpClient.get).mock.calls.length).toBe(callsCountBefore);
  });

  it("should persist search query when paginating forward during active search", async () => {
    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    await wrapper.find("#search").setValue("Dark");
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith("search?q=Dark&page=1");

    const nextButton = wrapper
      .findAll("button")
      .find((btn) => btn.text().includes("Next Page"));
    await nextButton?.trigger("click");
    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith("search?q=Dark&page=2");
  });

  it("should display show status badge", async () => {
    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    expect(wrapper.text()).toContain("Running");
    expect(wrapper.text()).toContain("Ended");
  });

  it("should display show details and metadata correctly", async () => {
    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    expect(wrapper.text()).toContain("Test Show");
    expect(wrapper.text()).toContain("Test Network");
    expect(wrapper.text()).toContain("US");
    expect(wrapper.text()).toContain("2020-01-01");
  });

  it('should display "Ongoing" for shows without end date', async () => {
    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    expect(wrapper.text()).toContain("Ongoing");
  });

  it("should bind valid router-link to show detail page", async () => {
    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    const detailLinks = wrapper
      .findAllComponents(RouterLinkStub)
      .filter((link) => link.text().includes("View Show"));

    expect(detailLinks.length).toBe(2);
    expect(detailLinks[0].props().to).toEqual({
      name: "ShowDetail",
      params: { id: 1 },
    });
  });

  it("should display empty state when search returns no shows", async () => {
    vi.mocked(httpClient.get).mockResolvedValue({ data: { tv_shows: [] } });

    const wrapper = mount(Home, mountOptions);
    await flushPromises();

    expect(wrapper.text()).toContain("No shows found");
  });

  it("should handle API errors gracefully", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(httpClient.get).mockRejectedValue(new Error("API Error"));

    mount(Home, mountOptions);
    await flushPromises();

    expect(consoleError).toHaveBeenCalled();
  });
});