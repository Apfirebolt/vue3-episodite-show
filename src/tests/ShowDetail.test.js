import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import ShowDetail from "../views/ShowDetail.vue";
import httpClient from "../plugins/interceptor";

// Mock API client & Vue Router
vi.mock("../plugins/interceptor", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: { id: "123" },
  }),
}));

const mockShowData = {
  tvShow: {
    name: "Test Show",
    image_path: "test-image.jpg",
    image_thumbnail_path: "test-thumb.jpg",
    status: "Running",
    country: "US",
    rating: 8.5,
    rating_count: 1000,
    start_date: "2020-01-01",
    end_date: "2023-12-31",
    description: "Test description",
    genres: ["Drama", "Sci-Fi"],
    pictures: ["pic1.jpg", "pic2.jpg", "pic3.jpg"],
    episodes: [
      { 
        name: "Pilot Episode", 
        season: 1, 
        episode: 1, 
        air_date: "2020-01-01",
        overview: "A great pilot overview."
      },
      { 
        name: "Second Chapter", 
        season: 1, 
        episode: 2, 
        air_date: "2020-01-08",
        overview: "Second episode overview."
      },
      { 
        name: "Season Two Premiere", 
        season: 2, 
        episode: 1, 
        air_date: "2021-01-01",
        overview: "Season 2 starts here."
      },
    ],
  },
};

const mountOptions = {
  global: {
    stubs: {
      Header: true,
      Loader: { template: '<div class="loader-stub">Loading...</div>' },
    },
  },
};

describe("ShowDetail.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(httpClient.get).mockResolvedValue({ data: mockShowData });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render loader when data is loading initially", async () => {
    // Return a pending promise so loading state remains active
    vi.mocked(httpClient.get).mockReturnValue(new Promise(() => {}));
    const wrapper = mount(ShowDetail, mountOptions);
    await nextTick();

    expect(wrapper.find(".loader-stub").exists()).toBe(true);
  });

  it("should fetch and display show details on mount", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith("show-details?q=123");
    expect(wrapper.text()).toContain("Test Show");
    expect(wrapper.text()).toContain("Running");
    expect(wrapper.text()).toContain("US");
    expect(wrapper.text()).toContain("8.5");
  });

  it("should render genres and synopsis description", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    expect(wrapper.text()).toContain("Drama");
    expect(wrapper.text()).toContain("Sci-Fi");
    expect(wrapper.text()).toContain("Test description");
  });

  it("should display gallery when pictures are available", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    expect(wrapper.find('img[src="pic1.jpg"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("1 / 3");
  });

  it("should navigate slides on button click and wrap around", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    const prevBtn = wrapper.find('button[aria-label="Previous Slide"]');
    const nextBtn = wrapper.find('button[aria-label="Next Slide"]');

    expect(prevBtn.exists()).toBe(true);
    expect(nextBtn.exists()).toBe(true);

    // Click Next -> Slide 2
    await nextBtn.trigger("click");
    expect(wrapper.text()).toContain("2 / 3");

    // Click Next -> Slide 3
    await nextBtn.trigger("click");
    expect(wrapper.text()).toContain("3 / 3");

    // Click Next -> Wrap around to Slide 1
    await nextBtn.trigger("click");
    expect(wrapper.text()).toContain("1 / 3");

    // Click Prev -> Wrap back to Slide 3
    await prevBtn.trigger("click");
    expect(wrapper.text()).toContain("3 / 3");
  });

  it("should select specific slide when thumbnail image is clicked", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    // Thumbnails are in the bottom scroller
    const thumbnails = wrapper.findAll(".scrollbar-thin button");
    expect(thumbnails.length).toBe(3);

    // Click 3rd thumbnail
    await thumbnails[2].trigger("click");
    expect(wrapper.text()).toContain("3 / 3");
  });

  it("should handle keyboard navigation (ArrowLeft and ArrowRight)", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("2 / 3");

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("1 / 3");
  });

  it("should remove keydown listener when component is unmounted", async () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it("should display episodes list and formatted episode codes", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    expect(wrapper.text()).toContain("Pilot Episode");
    expect(wrapper.text()).toContain("S01E01");
    expect(wrapper.text()).toContain("Second Chapter");
    expect(wrapper.text()).toContain("S01E02");
  });

  it("should filter episodes when season button is clicked", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    const seasonButtons = wrapper.findAll("section:last-of-type button");
    const seasonTwoBtn = seasonButtons.find((b) => b.text().includes("Season 2"));

    expect(seasonTwoBtn).toBeDefined();
    await seasonTwoBtn?.trigger("click");

    expect(wrapper.text()).toContain("Season Two Premiere");
    expect(wrapper.text()).not.toContain("Pilot Episode");
  });

  it("should reset filter when All Seasons button is clicked", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    const seasonTwoBtn = wrapper.findAll("button").find((b) => b.text().includes("Season 2"));
    await seasonTwoBtn?.trigger("click");
    expect(wrapper.text()).not.toContain("Pilot Episode");

    const allSeasonsBtn = wrapper.findAll("button").find((b) => b.text().includes("All Seasons"));
    await allSeasonsBtn?.trigger("click");

    expect(wrapper.text()).toContain("Pilot Episode");
    expect(wrapper.text()).toContain("Season Two Premiere");
  });

  it("should filter episodes based on search query input", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    const searchInput = wrapper.find('input[placeholder="Search episodes..."]');
    await searchInput.setValue("Second");

    expect(wrapper.text()).toContain("Second Chapter");
    expect(wrapper.text()).not.toContain("Pilot Episode");
  });

  it("should expand and collapse episode card details when clicked", async () => {
    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    // Find the first episode item header
    const firstEpisodeHeader = wrapper.find(".space-y-3 > div .cursor-pointer");
    expect(firstEpisodeHeader.exists()).toBe(true);

    // Expand
    await firstEpisodeHeader.trigger("click");
    expect(wrapper.text()).toContain("Episode Overview");
    expect(wrapper.text()).toContain("A great pilot overview.");

    // Collapse
    await firstEpisodeHeader.trigger("click");
    expect(wrapper.text()).not.toContain("A great pilot overview.");
  });

  it('should display "Ongoing" when end_date is missing', async () => {
    const modifiedData = JSON.parse(JSON.stringify(mockShowData));
    modifiedData.tvShow.end_date = null;
    vi.mocked(httpClient.get).mockResolvedValue({ data: modifiedData });

    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    expect(wrapper.text()).toContain("Ongoing");
  });

  it("should not render gallery when pictures array is empty", async () => {
    const modifiedData = JSON.parse(JSON.stringify(mockShowData));
    modifiedData.tvShow.pictures = [];
    vi.mocked(httpClient.get).mockResolvedValue({ data: modifiedData });

    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    expect(wrapper.text()).not.toContain("Stills & Media Gallery");
  });

  it("should handle API errors gracefully", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(httpClient.get).mockRejectedValue(new Error("Network Error"));

    const wrapper = mount(ShowDetail, mountOptions);
    await flushPromises();

    expect(consoleError).toHaveBeenCalled();
  });
});