import {
  write,
  getState,
  getSettings,
  updateSettings,
  enableYDBFS,
} from "./utils";
import { YDB_CONTAINER } from "./constants";
import Timer from "tiny-timer";

const settings = getSettings();

export function handleTimeout(settings) {
  const state = getState();
  const { slideshowEnabled } = state;
  if (slideshowEnabled) {
    let random_href = document.getElementsByClassName("js-rand")[0].href;
    let next_href = document.getElementsByClassName("js-next")[0].href;

    window.location = settings.slideshowRandom ? random_href : next_href;
  }
}

export function setSlideshowTimeout(
  timeout = settings.slideshowTimeout * 1000
) {
  const state = getState();
  const settings = getSettings();

  const { slideshowEnabled: enabled } = state;

  if (enabled) {
    const slideshowTimer = new Timer({ interval: 1000 });
    console.debug("Added new timer");
    slideshowTimer.on("done", () => handleTimeout(settings));
    slideshowTimer.on("tick", (ms) => console.debug("Timer: ", ms));
    slideshowTimer.on("statusChanged", (status) =>
      console.debug("Timer status:", status)
    );
    slideshowTimer.start(timeout);
    window.ydbSlideshowTimeout = slideshowTimer;
  }
}

const initSlideshow = () => {
  const settings = getSettings();
  const image = document.getElementById("image-display");
  const resumeBtn = document.getElementById("_ydb_ss_pause_resume_button");
  resumeBtn.innerHTML = "Pause";
  window.ydbSlideshowPaused = false;
  if (settings.slideshowFullscreen) {
    const fullscreenEnableBtn = document.getElementById("_ydb_fs_enable");
    if (fullscreenEnableBtn)
      fullscreenEnableBtn.dispatchEvent(new MouseEvent("click"));
  }
  if (image.tagName.toLowerCase() !== "video") {
    setSlideshowTimeout();
  } else {
    handleVideo();
  }
};

export function toggleSlideshow() {
  const state = getState();
  const settings = getSettings();
  state.slideshowEnabled = !state.slideshowEnabled;
  console.debug("Setting slideshow to ", state.slideshowEnabled);
  write(state);
  const enabled = state.slideshowEnabled;
  if (enabled) {
    initSlideshow();
  } else if (window.ydbSlideshowTimeout) {
    window.ydbSlideshowTimeout.stop();
  }
}

// handle clicking the "Start slideshow" button
export function startSlideshow() {
  const state = getState();
  state.slideshowEnabled = true;
  write(state);
  initSlideshow();
}

export function handleToggleSlideshowRandomCheckbox() {
  const settings = getSettings();
  settings.slideshowRandom = !settings.slideshowRandom;
  updateSettings(settings);
}

export function handleVideo() {
  console.debug("this is a video");
  const state = getState();
  const { slideshowEnabled } = state;
  const settings = getSettings();
  if (slideshowEnabled) {
    const video = document.getElementById("image-display");
    let nearEnd = false;
    let playedOnce = false;
    let thresholdExceeded = false;
    video.addEventListener("seeked", () => {
      if (nearEnd) {
        if (
          settings.slideshowTimeout > video.duration &&
          !playedOnce &&
          !window.ydbSlideshowPaused
        )
          setSlideshowTimeout(
            (settings.slideshowTimeout - video.duration) * 1000
          );
        if (
          video.duration >= settings.slideshowTimeout &&
          !window.ydbSlideshowPaused
        )
          handleTimeout(settings);
        playedOnce = true;
      }
    });
    video.addEventListener("timeupdate", () => {
      if (video.duration - video.currentTime <= 1) nearEnd = true;
      if (
        !settings.slideshowVideoPlaysRegardless &&
        settings.shouldSkipVideoTimeout &&
        video.currentTime > settings.slideshowVideoSinglePlaybackThreshold &&
        !thresholdExceeded &&
        !window.ydbSlideshowPaused
      ) {
        thresholdExceeded = true;
        handleTimeout(settings);
      }
      if (
        !settings.slideshowVideoPlaysRegardless &&
        video.currentTime > settings.slideshowTimeout &&
        !thresholdExceeded &&
        !window.ydbSlideshowPaused
      ) {
        thresholdExceeded = true;
        handleTimeout(settings);
      }
    });
  }
}
export function handleImageListRandomSlideshow() {
  const state = getState();
  const settings = getSettings();
  const currentUrl = new URL(window.location.href);
  let url = "";

  if (
    currentUrl.pathname.startsWith("/search") ||
    currentUrl.pathname === "/images"
  ) {
    const q = currentUrl.searchParams.get("q") || "*";
    url = `/images/random?q=${q}`;
  } else if (currentUrl.pathname.startsWith("/galleries")) {
    url = `${currentUrl.pathname}/random`;
  } else if (currentUrl.pathname === "/") {
    url = "/images/random?q=*";
  } else {
    console.log("I don't know where I am!");
    return false;
  }

  state.slideshowEnabled = true;
  write(state);

  settings.slideshowRandom = true;
  updateSettings(settings);

  if (settings.slideshowFullscreen) enableYDBFS();
  unsafeWindow.location.href = url;
}
export function handleImageListSequentialSlideshow() {
  const state = getState();
  const settings = getSettings();
  const currentUrl = new URL(window.location.href);
  let url = "";

  if (
    currentUrl.pathname.startsWith("/search") ||
    currentUrl.pathname === "/images" ||
    currentUrl.pathname === "/"
  ) {
    const firstImage = document.querySelector(
      "#imagelist-container div.media-box__content a"
    );

    url = firstImage.href;
  } else if (currentUrl.pathname.startsWith("/galleries")) {
    url = document.querySelector(
      "#imagelist-container div.media-box__content a"
    ).href;
  } else {
    console.log("I don't know where I am!");
    return false;
  }

  state.slideshowEnabled = true;
  write(state);

  settings.slideshowRandom = false;
  updateSettings(settings);

  if (settings.slideshowFullscreen) enableYDBFS();
  unsafeWindow.location.href = url;
}
