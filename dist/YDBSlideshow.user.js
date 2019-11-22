// ==UserScript==
// @name        YDBSlideshow
// @version     "0.3.4"
// @author      theguy159
// @description An YDB plugin for automatic slideshow on derpibooru.org
// @homepage    https://tehvoid.net
// @supportURL  https://github.com/theguy159/YDBSlideshow/issues
// @include     /http[s]*://(www.|)(trixie|derpi)booru.org/.*/
// @exclude     /http[s]*://(www.|)(trixie|derpi)booru.org/adverts/.*/
// @exclude     /http[s]*://(www.|)(trixie|derpi)booru.org/.*.json.*/
// @grant       GM_addStyle
// @runAt       document-end
// @require     https://github.com/stsyn/derpibooruscripts/raw/master/YouBooru/lib.js
// @downloadURL https://github.com/theguy159/YDBSlideshow/raw/master/dist/YDBSlideshow.user.js
// @updateURL   https://github.com/theguy159/YDBSlideshow/raw/master/dist/YDBSlideshow.meta.js
// ==/UserScript==

!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=(r=i,a=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),d="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(d," */")),s=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot).concat(e," */")}));return[n].concat(s).concat([o]).join("\n")}var r,a,d;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2],"{").concat(n,"}"):n})).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},o=0;o<this.length;o++){var s=this[o][0];null!=s&&(i[s]=!0)}for(var r=0;r<e.length;r++){var a=e[r];null!=a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="(".concat(a[2],") and (").concat(n,")")),t.push(a))}},t}},function(e,t,n){"use strict";var i,o="object"==typeof Reflect?Reflect:null,s=o&&"function"==typeof o.apply?o.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};i=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var d=10;function l(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function u(e,t,n,i){var o,s,r;if("function"!=typeof n)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof n);if(void 0===(s=e._events)?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),r=s[t]),void 0===r)r=s[t]=n,++e._eventsCount;else if("function"==typeof r?r=s[t]=i?[n,r]:[r,n]:i?r.unshift(n):r.push(n),(o=l(e))>0&&r.length>o&&!r.warned){r.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+r.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=e,a.type=t,a.count=r.length,console&&console.warn}return e}function c(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,s(this.listener,this.target,e))}function h(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=c.bind(i);return o.listener=n,i.wrapFn=o,o}function p(e,t,n){var i=e._events;if(void 0===i)return[];var o=i[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):m(o,o.length)}function f(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function m(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return d},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");d=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return l(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){var r;if(t.length>0&&(r=t[0]),r instanceof Error)throw r;var a=new Error("Unhandled error."+(r?" ("+r.message+")":""));throw a.context=r,a}var d=o[e];if(void 0===d)return!1;if("function"==typeof d)s(d,this,t);else{var l=d.length,u=m(d,l);for(n=0;n<l;++n)s(u[n],this,t)}return!0},a.prototype.addListener=function(e,t){return u(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return u(this,e,t,!0)},a.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,h(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,h(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,i,o,s,r;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){r=n[s].listener,o=s;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,r||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,s=Object.keys(n);for(i=0;i<s.length;++i)"removeListener"!==(o=s[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},a.prototype.listeners=function(e){return p(this,e,!0)},a.prototype.rawListeners=function(e){return p(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):f.call(e,t)},a.prototype.listenerCount=f,a.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]}},function(e,t,n){var i=n(3);e.exports="string"==typeof i?i:i.toString()},function(e,t,n){(e.exports=n(0)(!1)).push([e.i,"#_ydb_ss_toggle_slideshow {\r\n  display: none;\r\n}\r\n._fs #_ydb_ss_pause_resume_button {\r\n  left: 0;\r\n  top: 2rem;\r\n  position: fixed;\r\n  z-index: 202;\r\n  display: inline-block !important;\r\n  opacity: 0.3;\r\n  font-size: 120%;\r\n  line-height: 205%;\r\n}\r\n\r\n#_ydb_ss_pause_resume_button:hover {\r\n  opacity: 0.7;\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n._fs #_ydb_ss_label_slideshow_random {\r\n  top: 1.4rem;\r\n}\r\n\r\n._fs #_ydb_ss_toggle_slideshow_random {\r\n  top: 1.4rem;\r\n}\r\n",""])},function(e,t,n){var i=n(5);e.exports="string"==typeof i?i:i.toString()},function(e,t,n){(e.exports=n(0)(!1)).push([e.i,"#_ydb_ss_toggle_slideshow {\r\n  display: inline-block;\r\n}\r\n#_ydb_ss_toggle_slideshow_random {\r\n  z-index: 202;\r\n  position: relative;\r\n}\r\n#_ydb_ss_label_slideshow_random {\r\n  z-index: 202;\r\n  position: relative;\r\n  user-select: none;\r\n}\r\n.hideUntilLoaded {\r\n  opacity: 0;\r\n}\r\n\r\n#image-display.loaded {\r\n  opacity: 1;\r\n  transition: opacity 0.2s ease-in-out;\r\n}\r\n",""])},function(e,t,n){var i=n(7);e.exports="string"==typeof i?i:i.toString()},function(e,t,n){(e.exports=n(0)(!1)).push([e.i,"#_ydb_ss_toggle_slideshow {\r\n  display: none;\r\n}\r\n#_ydb_ss_toggle_slideshow_random {\r\n  display: none;\r\n}\r\n#_ydb_ss_label_slideshow_random {\r\n  display: none;\r\n}\r\n",""])},function(e,t,n){"use strict";n.r(t);var i="Slideshow",o="YDBSlideshowConf",s="YDBSlideshowState",r="https://tehvoid.net",a=!1,d=function(e){function t(t){var n=this;void 0===t&&(t={});var i=t.interval;void 0===i&&(i=1e3);var o=t.stopwatch;void 0===o&&(o=!1),e.call(this),this._duration=0,this._endTime=0,this._pauseTime=0,this._status="stopped",this.tick=function(){"paused"!==n.status&&(Date.now()>=n._endTime?(n.stop(),n.emit("tick",n._stopwatch?n._duration:0),n.emit("done")):n.emit("tick",n.time))},this._interval=i,this._stopwatch=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={time:{configurable:!0},duration:{configurable:!0},status:{configurable:!0}};return t.prototype.start=function(e,t){if("stopped"===this.status){if(null==e)throw new TypeError("Must provide duration parameter");this._duration=e,this._endTime=Date.now()+e,this._changeStatus("running"),this.emit("tick",this._stopwatch?0:this._duration),this._timeoutID=setInterval(this.tick,t||this._interval)}},t.prototype.stop=function(){this._timeoutID&&clearInterval(this._timeoutID),this._changeStatus("stopped")},t.prototype.pause=function(){"running"===this.status&&(this._pauseTime=Date.now(),this._changeStatus("paused"))},t.prototype.resume=function(){"paused"===this.status&&(this._endTime+=Date.now()-this._pauseTime,this._pauseTime=0,this._changeStatus("running"))},t.prototype._changeStatus=function(e){this._status=e,this.emit("statusChanged",this.status)},n.time.get=function(){if("stopped"===this.status)return 0;var e="paused"===this.status?this._pauseTime:Date.now(),t=this._endTime-e;return this._stopwatch?this._duration-t:t},n.duration.get=function(){return this._duration},n.status.get=function(){return this._status},Object.defineProperties(t.prototype,n),t}(n(1).EventEmitter),l=y();function u(e){if(m().slideshowEnabled){var t=document.getElementsByClassName("js-rand")[0].href,n=document.getElementsByClassName("js-next")[0].href;window.location=e.slideshowRandom?t:n}}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3*l.slideshowTimeout;return function(){var t=m(),n=y();if(t.slideshowEnabled){var i=new d({interval:1e3});i.on("done",(function(){return u(n)})),i.on("tick",(function(e){})),i.on("statusChanged",(function(e){})),i.start(e),window.ydbSlideshowTimeout=i}}()}function h(){var e=m(),t=y(),n=document.getElementById("image-display");e.slideshowEnabled=!e.slideshowEnabled,v(e),e.slideshowEnabled?(t.slideshowFullscreen&&document.getElementById("_ydb_fs_enable").dispatchEvent(new MouseEvent("click")),"video"!==n.tagName.toLowerCase()?c():f()):window.ydbSlideshowTimeout&&window.ydbSlideshowTimeout.stop()}function p(){var e=y();e.slideshowRandom=!e.slideshowRandom,function(e){localStorage[o]=JSON.stringify(e)}(e)}function f(){var e=m().slideshowEnabled,t=y();if(e){var n=document.getElementById("image-display"),i=!1,o=!1,s=!1;n.addEventListener("seeked",(function(){i&&(t.slideshowTimeout>n.duration&&!o&&c(1e3*(t.slideshowTimeout-n.duration)),n.duration>=t.slideshowTimeout&&u(t),o=!0)})),n.addEventListener("timeupdate",(function(){n.duration-n.currentTime<=1&&(i=!0),!t.slideshowVideoPlaysRegardless&&t.shouldSkipVideoTimeout&&n.currentTime>t.slideshowVideoSinglePlaybackThreshold&&!s&&(s=!0,u(t)),!t.slideshowVideoPlaysRegardless&&n.currentTime>t.slideshowTimeout&&!s&&(s=!0,u(t))}))}}function m(){var e;try{e=JSON.parse(localStorage[s])}catch(t){e={}}return e}function y(){var e;try{e=JSON.parse(localStorage[o])}catch(t){e={}}return e}function v(e){localStorage[s]=JSON.stringify(e)}function _(e){GM_addStyle(e)}function g(){var e,t,n=m().slideshowEnabled;void 0!==document.activeElement.type&&document.activeElement.type.includes("text")||(!window.ydbSlideshowPaused&&n?(e=document.getElementById("image-display"),t=!1,"video"===e.tagName.toLowerCase()&&(t=!0),t&&e.pause(),window.ydbSlideshowTimeout&&(window.ydbSlideshowTimeout.pause(),document.getElementById("_ydb_ss_pause_resume_button").innerHTML="Resume"),window.ydbSlideshowPaused=!0):(!function(){var e=document.getElementById("image-display"),t=!1;"video"===e.tagName.toLowerCase()&&(t=!0),t&&e.play(),window.ydbSlideshowTimeout?window.ydbSlideshowTimeout.resume():h(),document.getElementById("_ydb_ss_pause_resume_button").innerHTML="Pause"}(),window.ydbSlideshowPaused=!1))}var w=n(2).toString(),b=n(4).toString(),S=n(6).toString();!function(){if("/"!==window.location.pathname){null==unsafeWindow._YDB_public&&(unsafeWindow._YDB_public={}),null==unsafeWindow._YDB_public.settings&&(unsafeWindow._YDB_public.settings={}),window.ydbSlideshowPaused=!1,function(){var e=m();void 0===e.slideshowEnabled&&(e.slideshowEnabled=!1),e.NU1||(e.NU1=!0,v(e)),e.slideshowEnabled}(),function(){var e=y();void 0===e.slideshowTimeout&&(e.slideshowTimeout=15),void 0===e.slideshowVideoSinglePlaybackThreshold&&(e.slideshowVideoSinglePlaybackThreshold=15),void 0===e.shouldSkipVideoTimeout&&(e.shouldSkipVideoTimeout=!1),void 0===e.slideshowRandom&&(e.slideshowRandom=!1),void 0===e.slideshowFullscreen&&(e.slideshowFullscreen=!1),void 0===e.slideshowVideoPlaysRegardless&&(e.slideshowVideoPlaysRegardless=!1),void 0===e.slideshowHideImageUntilLoaded&&(e.slideshowHideImageUntilLoaded=!1),localStorage[o]=JSON.stringify(e)}(),unsafeWindow._YDB_public.settings.ydbSlideshow={name:i,container:o,version:"0.3.4",link:r,hidden:a,s:[{type:"input",name:"Slideshow timeout (s)",parameter:"slideshowTimeout",validation:{type:"int",min:1,default:15}},{type:"input",name:"Slideshow video skip threshold (s)",parameter:"slideshowVideoSinglePlaybackThreshold",validation:{type:"int",default:15}},{type:"checkbox",name:"Skip if video is longer than the threshold",parameter:"shouldSkipVideoTimeout"},{type:"checkbox",name:"Video will always play to the end",parameter:"slideshowVideoPlaysRegardless"},{type:"checkbox",name:"Random?",parameter:"slideshowRandom"},{type:"checkbox",name:"Auto fullscreen? (requires Resurrected Derp Fullscreen)",parameter:"slideshowFullscreen"},{type:"checkbox",name:"Hide image until fully loaded",parameter:"slideshowHideImageUntilLoaded"}]},_(w);var e=y(),t=m().slideshowEnabled;if(window.location.pathname.match(/^\/(images)?.\d{1}.*$/)?_(b):_(S),null!==document.querySelector("#content>.block:first-child")){var n={toggleSlideshow:addElem("a",{id:"_ydb_ss_toggle_slideshow",className:"header__link",innerHTML:"Toggle slideshow",events:[{t:"click",f:h}]},document.body),toggleSlideshowRandomLabel:addElem("label",{id:"_ydb_ss_label_slideshow_random",for:"_ydb_ss_toggle_slideshow_random",innerHTML:"Random slideshow? "},document.querySelector("#content>.block:first-child")),toggleSlideshowRandom:addElem("input",{id:"_ydb_ss_toggle_slideshow_random",type:"checkbox",checked:e.slideshowRandom,events:[{t:"click",f:p}]},document.querySelector("#content>.block:first-child")),pauseResumeSlideshowButton:addElem("a",{id:"_ydb_ss_pause_resume_button",className:"",style:{display:"none"},innerHTML:t?"Pause":"Resume",events:[{t:"click",f:g}]},document.querySelector("#content>.block:first-child")),disableFsButton:document.getElementById("_ydb_fs_disable"),image:document.getElementById("image-display")};e.slideshowHideImageUntilLoaded&&"video"!==n.image.tagName.toLowerCase()&&(n.image.complete?(n.image.classList.add("hideUntilLoaded"),setTimeout((function(){return n.image.classList.add("loaded")}),50)):n.image.classList.add("hideUntilLoaded")),document.getElementsByClassName("header__force-right")&&document.getElementsByClassName("header__force-right")[0].insertBefore(n.toggleSlideshow,document.getElementsByClassName("header__force-right")[0].childNodes[0]),n.disableFsButton&&n.disableFsButton.addEventListener("click",(function(){m().slideshowEnabled&&h()})),n.image&&(n.image.complete&&c(),"video"===n.image.tagName.toLowerCase()?f():n.image.addEventListener("load",(function(){n.image.classList.add("loaded"),c()}))),unsafeWindow.addEventListener("keydown",(function(e){"KeyP"===e.code&&g()}))}}}()}]);