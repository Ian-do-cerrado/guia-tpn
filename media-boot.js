(function () {
  if (!document.getElementById("guia-media-boot-css")) {
    var css = document.createElement("style");
    css.id = "guia-media-boot-css";
    css.textContent =
      ".slide.active .media{animation:none!important}" +
      ".media,.media video{background:#0b1f18!important}" +
      ".media video{width:100%;height:100%;object-fit:contain;object-position:center top;display:block}";
    (document.head || document.documentElement).appendChild(css);
  }

  var KEY = "guia-lang";
  var q = new URLSearchParams(location.search).get("lang");
  var lang = q === "en" || q === "es" || q === "pt" ? q : localStorage.getItem(KEY) || "";
  if (lang !== "en" && lang !== "es") return;
  if (document.documentElement.getAttribute("data-guide") === "isencao") {
    location.replace("index.html?lang=" + lang);
    return;
  }

  function swapExt(src, from, to) {
    if (!src || src.indexOf("." + lang + ".") >= 0) return src;
    var re = new RegExp("\\." + from + "$", "i");
    return re.test(src) ? src.replace(re, "." + lang + "." + to) : src;
  }

  function patchVideo(el) {
    if (!el || el.nodeName !== "VIDEO") return;
    var src = swapExt(el.getAttribute("src") || "", "mp4", "mp4");
    if (src) el.setAttribute("src", src);
    var poster = swapExt(el.getAttribute("poster") || "", "jpg", "jpg");
    if (poster) {
      el.setAttribute("poster", poster);
      el.setAttribute("data-still", poster);
    }
    var still = swapExt(el.getAttribute("data-still") || "", "jpg", "jpg");
    if (still) el.setAttribute("data-still", still);
    var slide = el.closest && el.closest(".slide, .done, section.done");
    if (slide) {
      var a = swapExt(slide.getAttribute("data-audio") || "", "mp3", "mp3");
      if (a) slide.setAttribute("data-audio", a);
    }
  }

  function patchAudio(el) {
    if (!el || el.nodeName !== "AUDIO") return;
    if (el.id === "bgm") return;
    var src = swapExt(el.getAttribute("src") || "", "mp3", "mp3");
    if (src) el.setAttribute("src", src);
  }

  function scan(root) {
    if (!root) return;
    if (root.nodeName === "VIDEO") patchVideo(root);
    if (root.nodeName === "AUDIO") patchAudio(root);
    if (!root.querySelectorAll) return;
    root.querySelectorAll("video").forEach(patchVideo);
    root.querySelectorAll("audio").forEach(patchAudio);
    root.querySelectorAll("[data-audio]").forEach(function (el) {
      var a = swapExt(el.getAttribute("data-audio") || "", "mp3", "mp3");
      if (a) el.setAttribute("data-audio", a);
    });
  }

  scan(document);
  var mo = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      m.addedNodes.forEach(function (n) {
        if (n.nodeType === 1) scan(n);
      });
    });
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", function () {
    scan(document);
    mo.disconnect();
  });
})();
