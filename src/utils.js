import {
  YDB_NAME,
  YDB_CONTAINER,
  YDB_LINK,
  YDB_HIDDEN,
  YDB_STATE,
} from "./constants";

import { toggleSlideshow } from "./slideshow";

export function getState() {
  let state;
  try {
    state = JSON.parse(localStorage[YDB_STATE]);
  } catch (e) {
    state = {};
  }
  return state;
}

export function getSettings() {
  let settings;
  try {
    settings = JSON.parse(localStorage[YDB_CONTAINER]);
  } catch (e) {
    settings = {};
  }
  return settings;
}

export function write(state) {
  localStorage[YDB_STATE] = JSON.stringify(state);
}

export function register() {
  // Register with YDB:Settings
  unsafeWindow._YDB_public.settings.ydbSlideshow = {
    name: YDB_NAME,
    container: YDB_CONTAINER,
    version: VERSION,
    link: YDB_LINK,
    hidden: YDB_HIDDEN,
    s: [
      {
        type: "input",
        name: "Slideshow timeout (s)",
        parameter: "slideshowTimeout",
        validation: { type: "int", min: 1, default: 15 },
      },
      {
        type: "input",
        name: "Slideshow video skip threshold (s)",
        parameter: "slideshowVideoSinglePlaybackThreshold",
        validation: { type: "int", default: 15 },
      },
      {
        type: "checkbox",
        name: "Pause video when pausing slideshow",
        parameter: "slideshowVideoPause",
      },
      {
        type: "checkbox",
        name: "Skip if video is longer than the threshold",
        parameter: "shouldSkipVideoTimeout",
      },
      {
        type: "checkbox",
        name: "Video will always play to the end",
        parameter: "slideshowVideoPlaysRegardless",
      },
      { type: "checkbox", name: "Random?", parameter: "slideshowRandom" },
      {
        type: "checkbox",
        name: "Auto fullscreen? (requires Resurrected Derp Fullscreen)",
        parameter: "slideshowFullscreen",
      },
      {
        type: "checkbox",
        name: "Hide image until fully loaded",
        parameter: "slideshowHideImageUntilLoaded",
      },
    ],
  };
}

export function initCommon() {
  if (unsafeWindow._YDB_public == undefined) unsafeWindow._YDB_public = {};
  if (unsafeWindow._YDB_public.settings == undefined)
    unsafeWindow._YDB_public.settings = {};
  window.ydbSlideshowPaused = false;
}

export function initState() {
  const state = getState();
  if (state.slideshowEnabled === undefined) state.slideshowEnabled = false;
  if (!state.NU1) {
    state.NU1 = true;
    write(state);
  }
  if (state.slideshowEnabled) {
    console.debug("slideshow enabled");
  }
}

export function initSettings() {
  // Initialize settings
  const settings = {
    slideshowTimeout: 15,
    slideshowVideoSinglePlaybackThreshold: 15,
    shouldSkipVideoTimeout: false,
    slideshowRandom: false,
    slideshowFullscreen: false,
    slideshowVideoPlaysRegardless: false,
    slideshowHideImageUntilLoaded: false,
    slideshowVideoPause: false,
  };
  localStorage[YDB_CONTAINER] = JSON.stringify({
    ...settings,
    ...getSettings(),
  });
}

export function updateSettings(settings) {
  localStorage[YDB_CONTAINER] = JSON.stringify(settings);
}

export function injectStyle(style) {
  GM_addStyle(style);
}

function pauseSlideshow() {
  console.debug("pauseSlideshow");
  const state = getState();
  const maybeVideo = document.getElementById("image-display");
  const settings = getSettings();
  let isVideo = false;
  if (maybeVideo.tagName.toLowerCase() === "video") isVideo = true;
  if (isVideo && settings.slideshowVideoPause) maybeVideo.pause();
  if (window.ydbSlideshowTimeout) {
    window.ydbSlideshowTimeout.pause();
  }
  document.getElementById("_ydb_ss_pause_resume_button").innerHTML = "Resume";

  state.slideshowEnabled = false;
  write(state);

  window.ydbSlideshowPaused = true;
}

function resumeSlideshow() {
  console.debug("resumeSlideshow");
  const maybeVideo = document.getElementById("image-display");
  const settings = getSettings();
  const state = getState();
  let isVideo = false;
  if (maybeVideo.tagName.toLowerCase() === "video") isVideo = true;
  if (isVideo && settings.slideshowVideoPause) maybeVideo.play();
  if (window.ydbSlideshowTimeout) {
    state.slideshowEnabled = true;
    write(state);

    window.ydbSlideshowTimeout.resume();
  } else {
    toggleSlideshow();
  }
  document.getElementById("_ydb_ss_pause_resume_button").innerHTML = "Pause";
  window.ydbSlideshowPaused = false;
}

export function handlePauseResume() {
  const state = getState();
  const { slideshowEnabled } = state;
  if (
    document.activeElement.type === undefined ||
    !document.activeElement.type.includes("text")
  ) {
    if (!window.ydbSlideshowPaused && slideshowEnabled) {
      pauseSlideshow();
    } else {
      resumeSlideshow();
    }
  }
}

// Ensure that the selector exists before running addElem
export function myAddElem(type, elem, selector) {
  if (selector === null) {
    console.warn("Selector does not exist");
    console.log("type", type);
    console.log("elem", elem);
    console.log("selector", selector);
  } else {
    return addElem(type, elem, selector);
  }
}

export function enableYDBFS() {
  localStorage["_ydb_fs_state"] = JSON.stringify({
    ...JSON.parse(localStorage["_ydb_fs_state"]),
    enabled: true,
  });
}
