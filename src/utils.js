import {
  YDB_NAME,
  YDB_CONTAINER,
  YDB_LINK,
  YDB_HIDDEN,
  YDB_STATE
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
        validation: { type: "int", min: 1, default: 15 }
      },
      {
        type: "input",
        name: "Slideshow video skip threshold (s)",
        parameter: "slideshowVideoSinglePlaybackThreshold",
        validation: { type: "int", default: 15 }
      },
      {
        type: "checkbox",
        name: "Skip if video is longer than the threshold",
        parameter: "shouldSkipVideoTimeout"
      },
      {
        type: "checkbox",
        name: "Video will always play to the end",
        parameter: "slideshowVideoPlaysRegardless"
      },
      { type: "checkbox", name: "Random?", parameter: "slideshowRandom" },
      {
        type: "checkbox",
        name: "Auto fullscreen? (requires Resurrected Derp Fullscreen)",
        parameter: "slideshowFullscreen"
      },
      {
        type: "checkbox",
        name: "Hide image until fully loaded",
        parameter: "slideshowHideImageUntilLoaded"
      }
    ]
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
  const settings = getSettings();
  // Initialize settings
  if (settings.slideshowTimeout === undefined) settings.slideshowTimeout = 15;
  if (settings.slideshowVideoSinglePlaybackThreshold === undefined)
    settings.slideshowVideoSinglePlaybackThreshold = 15;
  if (settings.shouldSkipVideoTimeout === undefined)
    settings.shouldSkipVideoTimeout = false;
  if (settings.slideshowRandom === undefined) settings.slideshowRandom = false;
  if (settings.slideshowFullscreen === undefined)
    settings.slideshowFullscreen = false;
  if (settings.slideshowVideoPlaysRegardless === undefined)
    settings.slideshowVideoPlaysRegardless = false;
  if (settings.slideshowHideImageUntilLoaded === undefined)
    settings.slideshowHideImageUntilLoaded = false;
  localStorage[YDB_CONTAINER] = JSON.stringify(settings);
}

export function updateSettings(settings) {
  localStorage[YDB_CONTAINER] = JSON.stringify(settings);
}

export function injectStyle(style) {
  GM_addStyle(style);
}

function pauseSlideshow() {
  const maybeVideo = document.getElementById("image-display");
  let isVideo = false;
  if (maybeVideo.tagName.toLowerCase() === "video") isVideo = true;
  if (isVideo) maybeVideo.pause();
  if (window.ydbSlideshowTimeout) {
    window.ydbSlideshowTimeout.pause();
    document.getElementById("_ydb_ss_pause_resume_button").innerHTML = "Resume";
  }
}

function resumeSlideshow() {
  const maybeVideo = document.getElementById("image-display");
  let isVideo = false;
  if (maybeVideo.tagName.toLowerCase() === "video") isVideo = true;
  if (isVideo) maybeVideo.play();
  if (window.ydbSlideshowTimeout) {
    window.ydbSlideshowTimeout.resume();
  } else {
    toggleSlideshow();
  }
  document.getElementById("_ydb_ss_pause_resume_button").innerHTML = "Pause";
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
      window.ydbSlideshowPaused = true;
    } else {
      resumeSlideshow();
      window.ydbSlideshowPaused = false;
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
    enabled: true
  });
}
