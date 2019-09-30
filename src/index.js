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
  getSettings
} from "./utils";

import {
  toggleSlideshow,
  setSlideshowTimeout,
  handleToggleSlideshowRandomCheckbox
} from "./slideshow";

const commonCSS = require("./static/css/style.css").toString();
const imagePageCSS = require("./static/css/imagePage.css").toString();

(function() {
  function init() {
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
    )
      injectStyle(imagePageCSS);

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
      disableFsButton: document.getElementById("_ydb_fs_disable")
    };

    document
      .getElementsByClassName("header__force-right")[0]
      .insertBefore(
        objects.toggleSlideshow,
        document.getElementsByClassName("header__force-right")[0].childNodes[0]
      );

    if (objects.disableFsButton) {
      objects.disableFsButton.addEventListener("click", () => {
        if (window.ydbSlideshowTimeout) {
          toggleSlideshow();
        }
      });
    }

    setSlideshowTimeout();
  }

  init();
})();
