import { write, getState, getSettings, updateSettings } from "./utils";
import { YDB_CONTAINER } from "./constants";

export function setSlideshowTimeout() {
  const state = getState();
  const settings = getSettings();
  let timeout = settings.slideshowTimeout * 1000;
  let videoThreshold = settings.slideshowVideoSinglePlaybackThreshold;
  let shouldSkipVideoTimeout = settings.shouldSkipVideoTimeout;
  let random_href = document.getElementsByClassName("js-rand")[0].href;
  let next_href = document.getElementsByClassName("js-next")[0].href;
  let enabled = state.slideshowEnabled;
  if (enabled) {
    window.ydbSlideshowTimeout = setTimeout(function() {
      window.location = settings.slideshowRandom ? random_href : next_href;
    }, timeout);
  }
}

export function toggleSlideshow() {
  const state = getState();
  const settings = getSettings();
  state.slideshowEnabled = !state.slideshowEnabled;
  write(state);
  let enabled = state.slideshowEnabled;
  if (enabled) {
    if (settings.slideshowFullscreen)
      document
        .getElementById("_ydb_fs_enable")
        .dispatchEvent(new MouseEvent("click"));
    setSlideshowTimeout();
  } else {
    clearTimeout(window.ydbSlideshowTimeout);
  }
}

export function handleToggleSlideshowRandomCheckbox() {
  const settings = getSettings();
  settings.slideshowRandom = !settings.slideshowRandom;
  updateSettings(settings);
}
