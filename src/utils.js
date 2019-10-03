import {
  YDB_NAME,
  YDB_CONTAINER,
  YDB_LINK,
  YDB_HIDDEN,
  YDB_STATE
} from "./constants";

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
        name: "Slideshow timeout",
        parameter: "slideshowTimeout",
        validation: { type: "int", min: 1, default: 15 }
      },
      // {
      //   type: "input",
      //   name: "Slideshow video skip threshold (s)",
      //   parameter: "slideshowVideoSinglePlaybackThreshold",
      //   validation: { type: "int", default: 15 }
      // },
      // {
      //   type: "checkbox",
      //   name: "Skip to next if video is longer than the threshold",
      //   parameter: "shouldSkipVideoTimeout"
      // },
      { type: "checkbox", name: "Random?", parameter: "slideshowRandom" },
      {
        type: "checkbox",
        name: "Auto fullscreen? (requires Resurrected Derp Fullscreen)",
        parameter: "slideshowFullscreen"
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
  localStorage[YDB_CONTAINER] = JSON.stringify(settings);
}

export function updateSettings(settings) {
  localStorage[YDB_CONTAINER] = JSON.stringify(settings);
}

export function injectStyle(style) {
  GM_addStyle(style);
}

function pauseSlideshow() {
  if (window.ydbSlideshowTimeout) {
    window.ydbSlideshowTimeout.pause();
    document.getElementById("_ydb_ss_pause_resume_button").innerHTML = "Resume";
  }
}

function resumeSlideshow() {
  if (window.ydbSlideshowTimeout) {
    window.ydbSlideshowTimeout.resume();
    document.getElementById("_ydb_ss_pause_resume_button").innerHTML = "Pause";
  }
}

export function handlePauseResume() {
  if (!window.ydbSlideshowPaused) {
    pauseSlideshow();
  } else {
    resumeSlideshow();
  }
  window.ydbSlideshowPaused = !window.ydbSlideshowPaused;
}
