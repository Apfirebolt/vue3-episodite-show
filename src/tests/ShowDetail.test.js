import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import ShowDetail from "../views/ShowDetail.vue";
import httpClient from "../plugins/interceptor";

vi.mock("../plugins/interceptor");
vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: { id: "123" },
  }),
}));

const mockShowData = {
  tvShow: {
    name: "Test Show",
    image_path: "test-image.jpg",
    status: "Running",
    country: "US",
    rating: 8.5,
    rating_count: 1000,
    start_date: "2020-01-01",
    end_date: "2023-12-31",
    description: "Test description",
    pictures: ["pic1.jpg", "pic2.jpg", "pic3.jpg"],
    episodes: [
      { name: "Episode 1", season: 1, air_date: "2020-01-01" },
      { name: "Episode 2", season: 1, air_date: "2020-01-08" },
    ],
  },
};

describe("ShowDetail", () => {
  beforeEach(() => {
    httpClient.get.mockResolvedValue({ data: mockShowData });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render loader when data is not loaded", () => {
    const wrapper = mount(ShowDetail);
    expect(wrapper.findComponent({ name: "Loader" }).exists()).toBe(true);
  });

  it("should fetch and display show details on mount", async () => {
    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    expect(httpClient.get).toHaveBeenCalledWith("show-details?q=123");
    expect(wrapper.vm.data).toEqual(mockShowData.tvShow);
  });

  it("should display show name and basic information", async () => {
    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Test Show");
    expect(wrapper.text()).toContain("Running");
    expect(wrapper.text()).toContain("US");
    expect(wrapper.text()).toContain("8.5");
  });

  it("should display gallery when pictures are available", async () => {
    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('img[src="pic1.jpg"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("1 / 3");
  });

  it("should navigate to next slide", async () => {
    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentSlide).toBe(0);
    wrapper.vm.nextSlide();
    expect(wrapper.vm.currentSlide).toBe(1);
  });

  it("should navigate to previous slide", async () => {
    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.currentSlide = 1;
    wrapper.vm.prevSlide();
    expect(wrapper.vm.currentSlide).toBe(0);
  });

  it("should wrap around when navigating past last slide", async () => {
    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.currentSlide = 2;
    wrapper.vm.nextSlide();
    expect(wrapper.vm.currentSlide).toBe(0);
  });

  it("should wrap around when navigating before first slide", async () => {
    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.currentSlide = 0;
    wrapper.vm.prevSlide();
    expect(wrapper.vm.currentSlide).toBe(2);
  });

  it("should display episodes list", async () => {
    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Episode 1");
    expect(wrapper.text()).toContain("Episode 2");
    expect(wrapper.text()).toContain("Season 1");
  });

  it("should format dates correctly", () => {
    const wrapper = mount(ShowDetail);
    const formatted = wrapper.vm.formatDate("2020-01-01");
    expect(formatted).toContain("2020");
  });

  it("should load more episodes on scroll", async () => {
    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.itemCount).toBe(10);

    vi.useFakeTimers();
    wrapper.vm.scrollHandler();
    vi.advanceTimersByTime(500);

    expect(wrapper.vm.itemCount).toBe(20);
    vi.useRealTimers();
  });

  it('should display "Ongoing" when end_date is null', async () => {
    const modifiedData = { ...mockShowData };
    modifiedData.tvShow.end_date = null;
    httpClient.get.mockResolvedValue({ data: modifiedData });

    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Ongoing");
  });

  it("should handle API errors gracefully", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    httpClient.get.mockRejectedValue(new Error("API Error"));

    const wrapper = mount(ShowDetail);
    await nextTick();

    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("should not render gallery when no pictures available", async () => {
    const modifiedData = { ...mockShowData };
    modifiedData.tvShow.pictures = [];
    httpClient.get.mockResolvedValue({ data: modifiedData });

    const wrapper = mount(ShowDetail);
    await nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).not.toContain("Gallery");
  });
});
