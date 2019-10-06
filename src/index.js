import {
  YDB_NAME,
  YDB_CONTAINER,
  YDB_STATE,
  YDB_LINK,
  YDB_HIDDEN
} from "./constants";

import {
  write,
  initCommon,
  initState,
  initSettings,
  injectStyle,
  register,
  getState,
  getSettings,
  handlePauseResume
} from "./utils";

import {
  toggleSlideshow,
  setSlideshowTimeout,
  handleToggleSlideshowRandomCheckbox,
  handleTimeout,
  handleVideo
} from "./slideshow";
const commonCSS = require("./static/css/style.css").toString();
const imagePageCSS = require("./static/css/imagePage.css").toString();
const hideCSS = require("./static/css/hide.css").toString();

(function() {
  if (window.location.pathname === "/") return;
  const settings = getSettings();
  initCommon();
  initState();
  initSettings();
  register();
  injectStyle(commonCSS);
  if (
    window.location.pathname.match(/^\/(images)?.\d{1}.*$/)
    // TODO: Get random button and first image of gallery
    // window.location.pathname.match(/^\/galleries.\d{1}.*$/)
  ) {
    injectStyle(imagePageCSS);
  } else {
    injectStyle(hideCSS);
  }

  const objects = {
    toggleSlideshow: addElem(
      "a",
      {
        id: "_ydb_ss_toggle_slideshow",
        className: "header__link",
        innerHTML: "Toggle slideshow",
        events: [{ t: "click", f: toggleSlideshow }]
      },
      document.body
    ),
    toggleSlideshowRandomLabel: addElem(
      "label",
      {
        id: "_ydb_ss_label_slideshow_random",
        for: "_ydb_ss_toggle_slideshow_random",
        innerHTML: "Random slideshow? "
      },
      document.querySelector("#content>.block:first-child")
    ),
    toggleSlideshowRandom: addElem(
      "input",
      {
        id: "_ydb_ss_toggle_slideshow_random",
        type: "checkbox",
        checked: settings.slideshowRandom,
        events: [
          {
            t: "click",
            f: handleToggleSlideshowRandomCheckbox
          }
        ]
      },
      document.querySelector("#content>.block:first-child")
    ),
    pauseResumeSlideshowButton: addElem(
      "a",
      {
        id: "_ydb_ss_pause_resume_button",
        className: "",
        style: { display: "none" },
        innerHTML: "Pause",
        events: [{ t: "click", f: handlePauseResume }]
      },
      document.querySelector("#content>.block:first-child")
    ),
    disableFsButton: document.getElementById("_ydb_fs_disable"),
    image: document.getElementById("image-display")
  };
  if (document.getElementsByClassName("header__force-right"))
    document
      .getElementsByClassName("header__force-right")[0]
      .insertBefore(
        objects.toggleSlideshow,
        document.getElementsByClassName("header__force-right")[0].childNodes[0]
      );

  if (objects.disableFsButton) {
    objects.disableFsButton.addEventListener("click", () => {
      const state = getState();
      if (state.slideshowEnabled) {
        toggleSlideshow();
      }
    });
  }
  if (objects.image) {
    if (objects.image.complete) setSlideshowTimeout();
    if (objects.image.tagName.toLowerCase() === "video") {
      handleVideo();
    } else {
      objects.image.addEventListener("load", () => setSlideshowTimeout());
    }
  }
  unsafeWindow.addEventListener("keydown", e => {
    if (e.code === "KeyP") handlePauseResume();
  });
})();
