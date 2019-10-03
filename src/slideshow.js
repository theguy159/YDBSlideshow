import { write, getState, getSettings, updateSettings } from "./utils";
import { YDB_CONTAINER } from "./constants";
import Timer from "tiny-timer";

function handleTimeout(settings) {
  let random_href = document.getElementsByClassName("js-rand")[0].href;
  let next_href = document.getElementsByClassName("js-next")[0].href;

  window.location = settings.slideshowRandom ? random_href : next_href;
}

export function setSlideshowTimeout() {
  const state = getState();
  const settings = getSettings();

  const timeout = settings.slideshowTimeout * 1000;
  // const {
  //   slideshowVideoSinglePlaybackThreshold: videoThreshold,
  //   shouldSkipVideoTimeout
  // } = settings;

  const { slideshowEnabled: enabled } = state;

  if (enabled) {
    const slideshowTimer = new Timer({ interval: 1000 });
    slideshowTimer.on("done", () => handleTimeout(settings));
    slideshowTimer.start(timeout);
    window.ydbSlideshowTimeout = slideshowTimer;
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
    window.ydbSlideshowTimeout.stop();
  }
}

export function handleToggleSlideshowRandomCheckbox() {
  const settings = getSettings();
  settings.slideshowRandom = !settings.slideshowRandom;
  updateSettings(settings);
}
