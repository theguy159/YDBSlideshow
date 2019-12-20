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
  handlePauseResume,
  myAddElem
} from "./utils";

import {
  toggleSlideshow,
  setSlideshowTimeout,
  handleToggleSlideshowRandomCheckbox,
  handleTimeout,
  handleVideo,
  handleImageListRandomSlideshow,
  handleImageListSequentialSlideshow
} from "./slideshow";
const commonCSS = require("./static/css/style.css").toString();
const imagePageCSS = require("./static/css/imagePage.css").toString();
const hideCSS = require("./static/css/hide.css").toString();

(function() {
  initCommon();
  initState();
  initSettings();
  register();
  injectStyle(commonCSS);
  const settings = getSettings();
  const state = getState();
  const { slideshowEnabled } = state;
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
    toggleSlideshow: myAddElem(
      "a",
      {
        id: "_ydb_ss_toggle_slideshow",
        className: "header__link",
        innerHTML: "Toggle slideshow",
        events: [{ t: "click", f: toggleSlideshow }]
      },
      document.body
    ),
    toggleSlideshowRandomLabel: myAddElem(
      "label",
      {
        id: "_ydb_ss_label_slideshow_random",
        for: "_ydb_ss_toggle_slideshow_random",
        innerHTML: "Random slideshow? "
      },
      document.querySelector("#content>.block:first-child")
    ),
    toggleSlideshowRandom: myAddElem(
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
    pauseResumeSlideshowButton: myAddElem(
      "a",
      {
        id: "_ydb_ss_pause_resume_button",
        className: "",
        style: { display: "none" },
        innerHTML: slideshowEnabled ? "Pause" : "Resume",
        events: [{ t: "click", f: handlePauseResume }]
      },
      document.querySelector("#content>.block:first-child")
    ),
    imageListRandomSlideshow: myAddElem(
      "a",
      {
        id: "_ydb_ss_image_list_random_slideshow",
        innerHTML:
          '<i class="fa fa-random"></i> <span class="hide-mobile hide-limited-desktop">Random slideshow</span>',
        events: [{ t: "click", f: handleImageListRandomSlideshow }]
      },
      document.querySelector("#imagelist-container > section div.flex__right")
    ),
    imageListSequentialSlideshow: myAddElem(
      "a",
      {
        id: "_ydb_ss_image_list_sequential_slideshow",
        innerHTML:
          '<i class="fa fa-play"></i> <span class="hide-mobile hide-limited-desktop">Sequential slideshow</span>',
        events: [{ t: "click", f: handleImageListSequentialSlideshow }]
      },
      document.querySelector("#imagelist-container > section div.flex__right")
    ),
    disableFsButton: document.getElementById("_ydb_fs_disable"),
    image: document.getElementById("image-display")
  };
  if (
    settings.slideshowHideImageUntilLoaded &&
    objects.image !== null &&
    objects.image.tagName.toLowerCase() !== "video"
  ) {
    if (objects.image.complete) {
      objects.image.classList.add("hideUntilLoaded");
      setTimeout(() => objects.image.classList.add("loaded"), 50);
    } else {
      objects.image.classList.add("hideUntilLoaded");
    }
  }
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
      objects.image.addEventListener("load", () => {
        objects.image.classList.add("loaded");
        setSlideshowTimeout();
      });
    }
  }
  unsafeWindow.addEventListener("keydown", e => {
    if (e.code === "KeyP") handlePauseResume();
  });
})();
