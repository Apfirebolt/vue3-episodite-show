import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Home from "../views/Home.vue";
import httpClient from "../plugins/interceptor";

vi.mock("../plugins/interceptor");

describe("Home Component", () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
    httpClient.get.mockResolvedValue({ data: mockShowsData });
  });

  it("should render component", () => {
    const wrapper = mount(Home);
    expect(wrapper.exists()).toBe(true);
  });

  it("should fetch most popular shows on mount", async () => {
    mount(Home);
    await vi.waitFor(() => {
      expect(httpClient.get).toHaveBeenCalledWith("most-popular?page=1");
    });
  });

  it("should display shows list when data is loaded", async () => {
    const wrapper = mount(Home);
    await vi.waitFor(() => {
      expect(wrapper.findAll(".grid > div").length).toBe(2);
    });
  });

  it("should display loader when data is null", () => {
    httpClient.get.mockResolvedValue({ data: null });
    const wrapper = mount(Home);
    expect(wrapper.findComponent({ name: "Loader" }).exists()).toBe(true);
  });

  it("should search shows when search button is clicked", async () => {
    const wrapper = mount(Home);
    await wrapper.vm.$nextTick();

    await wrapper.find("#search").setValue("Breaking Bad");
    await wrapper.findAll("button")[0].trigger("click");

    expect(httpClient.get).toHaveBeenCalledWith("search?q=Breaking Bad&page=1");
  });

  it("should navigate to next page", async () => {
    const wrapper = mount(Home);
    await wrapper.vm.$nextTick();

    await wrapper.findAll("button")[1].trigger("click");

    expect(httpClient.get).toHaveBeenCalledWith("most-popular?page=2");
  });

  it("should navigate to previous page", async () => {
    const wrapper = mount(Home);
    await wrapper.vm.$nextTick();

    wrapper.vm.page = 2;
    await wrapper.findAll("button")[2].trigger("click");

    expect(httpClient.get).toHaveBeenCalledWith("most-popular?page=1");
  });

  it("should not go below page 1 when clicking previous", async () => {
    const wrapper = mount(Home);
    await wrapper.vm.$nextTick();

    const initialCalls = httpClient.get.mock.calls.length;
    await wrapper.findAll("button")[2].trigger("click");

    expect(httpClient.get.mock.calls.length).toBe(initialCalls);
  });

  it("should generate correct full link", () => {
    const wrapper = mount(Home);
    const result = wrapper.vm.getFullLink("test-show");
    expect(result).toBe("https://www.episodate.com/tv-show/test-show");
  });

  it("should display show status badge", async () => {
    const wrapper = mount(Home);
    await vi.waitFor(() => {
      expect(wrapper.html()).toContain("Running");
      expect(wrapper.html()).toContain("Ended");
    });
  });

  it("should display show details correctly", async () => {
    const wrapper = mount(Home);
    await vi.waitFor(() => {
      expect(wrapper.html()).toContain("Test Show");
      expect(wrapper.html()).toContain("Test Network");
      expect(wrapper.html()).toContain("US");
      expect(wrapper.html()).toContain("2020-01-01");
    });
  });

  it('should display "Ongoing" for shows without end date', async () => {
    const wrapper = mount(Home);
    await vi.waitFor(() => {
      expect(wrapper.html()).toContain("Ongoing");
    });
  });

  it("should handle API errors gracefully", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    httpClient.get.mockRejectedValue(new Error("API Error"));

    mount(Home);
    await vi.waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
    });

    consoleError.mockRestore();
  });

  it("should update searchStr when input changes", async () => {
    const wrapper = mount(Home);
    const input = wrapper.find("#search");

    await input.setValue("New Search Term");

    expect(wrapper.vm.searchStr).toBe("New Search Term");
  });
});
