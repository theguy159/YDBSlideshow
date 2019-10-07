import { write, getState, getSettings, updateSettings } from "./utils";
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
  console.debug("SlideshowTimeout");
  const state = getState();
  const settings = getSettings();

  const { slideshowEnabled: enabled } = state;

  if (enabled) {
    const slideshowTimer = new Timer({ interval: 1000 });
    console.debug("Added new timer");
    slideshowTimer.on("done", () => handleTimeout(settings));
    slideshowTimer.on("tick", ms => console.debug("Timer: ", ms));
    slideshowTimer.start(timeout);
    window.ydbSlideshowTimeout = slideshowTimer;
  }
}

export function toggleSlideshow() {
  const state = getState();
  const settings = getSettings();
  const image = document.getElementById("image-display");
  state.slideshowEnabled = !state.slideshowEnabled;
  console.debug("Setting slideshow to ", state.slideshowEnabled);
  write(state);
  let enabled = state.slideshowEnabled;
  if (enabled) {
    if (settings.slideshowFullscreen)
      document
        .getElementById("_ydb_fs_enable")
        .dispatchEvent(new MouseEvent("click"));
    if (image.tagName.toLowerCase() !== "video") {
      setSlideshowTimeout();
    } else {
      handleVideo();
    }
  } else if (window.ydbSlideshowTimeout) {
    window.ydbSlideshowTimeout.stop();
  }
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
        if (settings.slideshowTimeout > video.duration && !playedOnce)
          setSlideshowTimeout(
            (settings.slideshowTimeout - video.duration) * 1000
          );
        if (video.duration >= settings.slideshowTimeout)
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
        !thresholdExceeded
      ) {
        thresholdExceeded = true;
        handleTimeout(settings);
      }
      if (
        !settings.slideshowVideoPlaysRegardless &&
        video.currentTime > settings.slideshowTimeout &&
        !thresholdExceeded
      ) {
        thresholdExceeded = true;
        handleTimeout(settings);
      }
    });
  }
}
