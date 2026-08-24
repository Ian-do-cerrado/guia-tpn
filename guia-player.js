(function () {
  const guideId = document.documentElement.getAttribute("data-guide");
  if (!guideId || !window.GuiaI18n) return;
  GuiaI18n.applyGuide(guideId);

  document.querySelectorAll("video").forEach((v) => {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.controls = false;
  });

  if (!document.getElementById("guia-player-css")) {
    const s = document.createElement("style");
    s.id = "guia-player-css";
    s.textContent =
      ".app{touch-action:pan-y}" +
      ".media video{width:100%;height:100%;object-fit:contain;object-position:center top;background:#0b1f18;display:block}" +
      ".media.is-waiting::after{content:\"\";position:absolute;left:50%;top:42%;width:36px;height:36px;margin:-18px 0 0 -18px;border:3px solid rgba(255,255,255,.22);border-top-color:#fff;border-radius:50%;animation:guia-spin .7s linear infinite;pointer-events:none}" +
      "@keyframes guia-spin{to{transform:rotate(360deg)}}" +
      "@media (prefers-reduced-motion:reduce){.media.is-waiting::after{animation:none;border-top-color:rgba(255,255,255,.55)}}" +
      ".pause-mark{position:absolute;left:50%;top:42%;z-index:12;width:64px;height:64px;margin:-32px 0 0 -32px;border-radius:50%;background:rgba(11,31,24,.72);color:#fff;display:none;place-items:center;pointer-events:none;box-shadow:0 4px 18px rgba(0,0,0,.35)}" +
      ".pause-mark svg{width:28px;height:28px;display:block}" +
      ".app.is-paused .pause-mark{display:grid}";
    document.head.appendChild(s);
  }

  const slides = [...document.querySelectorAll(".slide")];
  const done = document.getElementById("done");
  const dots = [...document.querySelectorAll(".progress button")];
  const status = document.getElementById("status");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const main = document.getElementById("conteudo");
  const last = slides.length;
  let current = 0;
  const captionEl = document.getElementById("caption");
  const app = document.querySelector(".app");

  const pauseMark = document.createElement("div");
  pauseMark.className = "pause-mark";
  pauseMark.setAttribute("aria-hidden", "true");
  pauseMark.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  app.appendChild(pauseMark);

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrateBtn = document.getElementById("narrate");
  const clips = [...document.querySelectorAll("audio[data-step-audio]")];
  const bgm = document.getElementById("bgm");
  const BGM_VOL = 0.20;
  const BGM_DUCK = 0.12;
  let voiceOn = localStorage.getItem("guia-narrate") !== "off";
  if (bgm) bgm.volume = BGM_VOL;

  let userPaused = false;
  let stepGen = 0;
  let videoDone = false;
  let audioDone = false;
  let advanceTimer = 0;
  let pausedCaptionTime = 0;
  let mediaTimer = 0;
  let stallTimer = 0;
  let ptr = { id: null, x: 0, y: 0, t: 0 };

  function clipFor(step) {
    return clips.find((item) => Number(item.dataset.stepAudio) === step);
  }

  function mediaBox(slide) {
    return slide && slide.querySelector(".media");
  }

  function mediaEl(slide) {
    return slide && (slide.querySelector("video") || slide.querySelector("img"));
  }

  function placeCaption() {
    if (!captionEl || !app) return;
    if (app.classList.contains("is-done")) {
      captionEl.style.top = "";
      captionEl.style.bottom = "0px";
      app.style.setProperty("--caption-space", "0px");
      return;
    }
    const capH = captionEl.offsetHeight || 0;
    const media = mediaEl(slides[current]);
    const appW = app.clientWidth || 430;
    const appH = app.clientHeight || window.innerHeight;
    let nw = 0;
    let nh = 0;
    if (media) {
      nw = media.videoWidth || media.naturalWidth || Number(media.getAttribute("width")) || 0;
      nh = media.videoHeight || media.naturalHeight || Number(media.getAttribute("height")) || 0;
    }
    const videoH = (nw > 0 && nh > 0) ? Math.min(appH, appW * (nh / nw)) : appH;
    if (videoH + capH >= appH - 4) {
      captionEl.style.top = "";
      captionEl.style.bottom = "0px";
      app.style.setProperty("--caption-space", capH + "px");
      return;
    }
    captionEl.style.top = Math.round(videoH) + "px";
    captionEl.style.bottom = "auto";
    app.style.setProperty("--caption-space", "0px");
  }

  if (window.ResizeObserver && app) {
    const ro = new ResizeObserver(placeCaption);
    ro.observe(app);
    if (captionEl) ro.observe(captionEl);
  }
  window.addEventListener("resize", placeCaption);
  document.querySelectorAll("video").forEach((v) => {
    v.addEventListener("loadedmetadata", placeCaption);
    v.addEventListener("resize", placeCaption);
  });

  function setWaiting(slide, on) {
    const box = mediaBox(slide);
    if (box) box.classList.toggle("is-waiting", !!on);
  }

  function startBgm() {
    if (!bgm || !bgm.paused) return;
    const play = bgm.play();
    if (play && typeof play.catch === "function") play.catch(() => {});
  }

  function duckBgm() {
    if (!bgm) return;
    const talking = clips.some((clip) => !clip.paused && !clip.ended);
    bgm.volume = talking ? BGM_DUCK : BGM_VOL;
  }

  clips.forEach((clip) => {
    clip.addEventListener("play", duckBgm);
    clip.addEventListener("pause", duckBgm);
    clip.addEventListener("ended", () => {
      duckBgm();
      if (clipFor(current) === clip) markAudioDone();
    });
  });

  function setNarrateUi() {
    if (!narrateBtn) return;
    narrateBtn.setAttribute("aria-pressed", voiceOn ? "true" : "false");
    narrateBtn.setAttribute(
      "aria-label",
      voiceOn ? GuiaI18n.t("narrateOn") : GuiaI18n.t("narrateOff")
    );
  }

  function stopNarration() {
    clips.forEach((clip) => {
      clip.pause();
      try { clip.currentTime = 0; } catch (err) {}
    });
  }

  function playWhenReady(el) {
    if (!el || userPaused) return;
    const tryPlay = () => {
      if (userPaused) return;
      const play = el.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    };
    if (el.readyState >= 2) tryPlay();
    else el.addEventListener("canplay", tryPlay, { once: true });
  }

  function speakCurrent() {
    stopNarration();
    startBgm();
    if (!voiceOn) {
      markAudioDone();
      return;
    }
    const clip = clipFor(current);
    if (!clip) {
      markAudioDone();
      return;
    }
    playWhenReady(clip);
  }

  function audioDuration() {
    const clip = clipFor(current);
    if (voiceOn && clip && Number.isFinite(clip.duration) && clip.duration > 0) return clip.duration;
    return 0;
  }

  function videoDuration(video) {
    if (!video) return 0;
    if (Number.isFinite(video.duration) && video.duration > 0) return video.duration;
    const ms = Number(video.dataset.durationMs);
    return ms > 0 ? ms / 1000 : 0;
  }

  function syncVideoToNarration(video) {
    if (!video) return;
    const vDur = videoDuration(video);
    const aDur = audioDuration();
    const clip = clipFor(current);
    if (!(vDur > 0) || !(aDur > 0) || !voiceOn) {
      video.playbackRate = 1;
      return;
    }
    let rate = vDur / aDur;
    if (clip && !clip.paused && !clip.ended) {
      const aLeft = Math.max(0.08, aDur - (clip.currentTime || 0));
      const vLeft = Math.max(0.08, vDur - (video.currentTime || 0));
      rate = vLeft / aLeft;
    }
    if (!Number.isFinite(rate) || rate <= 0) rate = 1;
    video.playbackRate = Math.min(4, Math.max(0.25, rate));
  }

  function markVideoDone() {
    if (userPaused) return;
    videoDone = true;
    maybeAdvance();
  }

  function markAudioDone() {
    if (userPaused) return;
    audioDone = true;
    maybeAdvance();
  }

  function maybeAdvance() {
    if (userPaused || app.classList.contains("is-done") || current >= last) return;
    if (!videoDone || !audioDone) return;
    const gen = stepGen;
    clearTimeout(advanceTimer);
    advanceTimer = setTimeout(() => {
      if (gen !== stepGen || userPaused) return;
      show(current + 1);
    }, 280);
  }

  let captionRaf = 0;
  let captionClock = 0;
  let captionPhrases = [];
  let captionDuration = 0;
  let captionGen = 0;

  function splitPhrases(text) {
    const parts = [];
    String(text || "").replace(/[^.!?]+[.!?]+|[^.!?]+$/g, (chunk) => {
      const s = chunk.trim();
      if (s) parts.push(s);
      return chunk;
    });
    const out = [];
    for (const part of parts) {
      const prev = out[out.length - 1];
      if (prev && prev.split(/\s+/).length < 6) out[out.length - 1] = prev + " " + part;
      else out.push(part);
    }
    return out.length ? out : [String(text || "").trim()].filter(Boolean);
  }

  function phrasePlan(text, duration) {
    const phrases = splitPhrases(text).map((phrase) => ({
      phrase,
      words: phrase.split(/\s+/).filter(Boolean),
      weight: Math.max(8, phrase.replace(/\s+/g, "").length)
    }));
    const total = phrases.reduce((n, p) => n + p.weight, 0) || 1;
    let acc = 0;
    return phrases.map((p) => {
      const start = (acc / total) * duration;
      acc += p.weight;
      return { ...p, start, end: (acc / total) * duration };
    });
  }

  function escapeWord(word) {
    return String(word)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function stopCaption() {
    captionGen += 1;
    cancelAnimationFrame(captionRaf);
    captionRaf = 0;
    captionClock = 0;
    captionPhrases = [];
    captionDuration = 0;
    if (captionEl) {
      captionEl.innerHTML = "";
      captionEl.dataset.phrase = "";
    }
  }

  function shownWordCount(phrase, t) {
    const span = Math.max(0.08, phrase.end - phrase.start);
    const local = Math.min(1, Math.max(0, (t - phrase.start) / span));
    const weights = phrase.words.map((w) => Math.max(1, w.replace(/[^a-zA-ZÀ-ÿ0-9]/g, "").length));
    const total = weights.reduce((n, w) => n + w, 0) || 1;
    const target = local * total;
    let acc = 0;
    let shown = 0;
    for (let i = 0; i < phrase.words.length; i++) {
      if (target + 0.2 >= acc) shown = i + 1;
      acc += weights[i];
    }
    if (t >= phrase.end - 0.04) shown = phrase.words.length;
    if (reduceMotion) shown = phrase.words.length;
    return shown;
  }

  function renderCaption(t) {
    if (!captionEl || !captionPhrases.length) return;
    const lastPhrase = captionPhrases[captionPhrases.length - 1];
    const phrase = captionPhrases.find((p) => t < p.end - 0.01) || lastPhrase;
    const shown = shownWordCount(phrase, t);
    if (captionEl.dataset.phrase !== phrase.phrase) {
      captionEl.dataset.phrase = phrase.phrase;
      captionEl.innerHTML = '<span class="caption-inner">' +
        phrase.words.map((word) => `<span class="w">${escapeWord(word)}</span>`).join(" ") +
        "</span>";
      placeCaption();
    }
    const apply = () => {
      captionEl.querySelectorAll(".w").forEach((el, i) => {
        el.classList.toggle("on", i < shown);
        el.classList.toggle("now", i === shown - 1 && shown > 0);
      });
    };
    if (shown > 0) requestAnimationFrame(apply);
    else apply();
  }

  function captionTime() {
    if (userPaused) return pausedCaptionTime;
    const clip = clipFor(current);
    if (voiceOn && clip && !clip.paused && !clip.ended) return clip.currentTime || 0;
    if (captionClock) return (performance.now() - captionClock) / 1000;
    if (clip) return clip.currentTime || 0;
    return 0;
  }

  function tickCaption() {
    if (userPaused || app.classList.contains("is-done")) return;
    const video = slides[current] && slides[current].querySelector("video");
    if (video) syncVideoToNarration(video);
    const t = captionTime();
    renderCaption(t);
    const clip = clipFor(current);
    const stillGoing = t < captionDuration + 0.35
      || (voiceOn && clip && !clip.ended)
      || (video && !video.paused && !video.ended);
    if (stillGoing) captionRaf = requestAnimationFrame(tickCaption);
  }

  function startCaption() {
    stopCaption();
    const slide = slides[current];
    if (!slide || current === last) return;
    const gen = captionGen;
    const clip = clipFor(current);
    const media = mediaEl(slide);
    const fallback = (media && Number(media.dataset.durationMs) / 1000) || 12;
    const text = slide.dataset.narrate || "";
    const run = () => {
      if (gen !== captionGen) return;
      const aDur = audioDuration();
      const next = aDur || ((clip && Number.isFinite(clip.duration) && clip.duration > 0)
        ? clip.duration
        : fallback);
      captionDuration = next;
      captionPhrases = phrasePlan(text, captionDuration);
      if (!captionClock) captionClock = performance.now();
      renderCaption(captionTime());
      if (!captionRaf) tickCaption();
    };
    if (clip && !(Number.isFinite(clip.duration) && clip.duration > 0)) {
      clip.addEventListener("loadedmetadata", run, { once: true });
    }
    run();
  }

  function setPaused(on) {
    userPaused = !!on;
    app.classList.toggle("is-paused", userPaused);
    if (userPaused) {
      pausedCaptionTime = captionTime();
      cancelAnimationFrame(captionRaf);
      captionRaf = 0;
      clearTimeout(advanceTimer);
      setChrome(true);
    } else {
      captionClock = performance.now() - pausedCaptionTime * 1000;
      setChrome(false);
      if (!captionRaf) tickCaption();
    }
  }

  function togglePause() {
    if (app.classList.contains("is-done")) return;
    if (userPaused) {
      setPaused(false);
      startBgm();
      const slide = slides[current];
      const video = slide && slide.querySelector("video");
      const clip = clipFor(current);
      if (video && !video.ended) playWhenReady(video);
      if (voiceOn && clip && !clip.ended) playWhenReady(clip);
      if (videoDone && audioDone) maybeAdvance();
    } else {
      const slide = slides[current];
      const video = slide && slide.querySelector("video");
      const clip = clipFor(current);
      if (video) try { video.pause(); } catch (err) {}
      if (clip) clip.pause();
      if (bgm) bgm.pause();
      setPaused(true);
    }
  }

  function unlockOrPause() {
    const clip = clipFor(current);
    const video = slides[current] && slides[current].querySelector("video");
    const audioBlocked = voiceOn && clip && clip.paused && !clip.ended && clip.currentTime < 0.2;
    const videoBlocked = video && video.paused && !video.ended && video.currentTime < 0.2 && !userPaused;
    if (!userPaused && (audioBlocked || videoBlocked)) {
      startBgm();
      if (audioBlocked) {
        playWhenReady(clip);
        startCaption();
      }
      if (videoBlocked) playWhenReady(video);
      return;
    }
    togglePause();
  }

  if (narrateBtn) {
    narrateBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      voiceOn = !voiceOn;
      localStorage.setItem("guia-narrate", voiceOn ? "on" : "off");
      setNarrateUi();
      const video = slides[current] && slides[current].querySelector("video");
      if (video) syncVideoToNarration(video);
      if (voiceOn) {
        audioDone = false;
        if (!userPaused) {
          speakCurrent();
          startCaption();
        }
      } else {
        const clip = clipFor(current);
        const t = clip ? clip.currentTime : 0;
        captionClock = performance.now() - t * 1000;
        clips.forEach((item) => item.pause());
        markAudioDone();
      }
    });
  }
  setNarrateUi();

  function hideGifReplay(slide) {
    const box = slide && slide.querySelector(".media-replay");
    if (box) box.classList.remove("is-on");
  }

  function freezeGif(slide) {
    const img = slide && slide.querySelector("img");
    if (!img || !img.dataset.still) return;
    img.dataset.ignoreError = "1";
    img.src = img.dataset.still;
    img.dataset.ignoreError = "";
  }

  function gifReady(img) {
    return !!(img && img.complete && img.naturalWidth > 0 && /\.gif(\?|#|$)/i.test(img.currentSrc || img.src));
  }

  function setChrome(on) {
    app.classList.toggle("chrome-on", !!on || userPaused);
  }

  function armMediaEnd(slide) {
    clearTimeout(mediaTimer);
    clearTimeout(stallTimer);
    hideGifReplay(slide);
    if (!slide) return;
    if (!userPaused) setChrome(false);
    const gen = stepGen;
    const video = slide.querySelector("video");
    const img = slide.querySelector("img");
    if (video) {
      const applySync = () => {
        if (gen !== stepGen) return;
        syncVideoToNarration(video);
      };
      video.onended = () => {
        if (gen !== stepGen || slides[current] !== slide) return;
        const clip = clipFor(current);
        markVideoDone();
        if (!voiceOn || !clip || (clip.paused && clip.currentTime < 0.15)) markAudioDone();
      };
      video.onplaying = () => {
        if (gen !== stepGen) return;
        setWaiting(slide, false);
        clearTimeout(stallTimer);
        applySync();
      };
      video.onwaiting = () => {
        if (gen !== stepGen) return;
        setWaiting(slide, true);
        clearTimeout(stallTimer);
        stallTimer = setTimeout(() => {
          if (gen !== stepGen) return;
          setChrome(true);
        }, 8000);
      };
      video.onerror = () => {
        if (gen !== stepGen) return;
        fallbackToGif(slide, video);
      };
      if (video.readyState >= 1) applySync();
      else video.addEventListener("loadedmetadata", applySync, { once: true });
      const clip = clipFor(current);
      if (clip && !(Number.isFinite(clip.duration) && clip.duration > 0)) {
        clip.addEventListener("loadedmetadata", applySync, { once: true });
      }
      clearTimeout(stallTimer);
      stallTimer = setTimeout(() => {
        if (gen !== stepGen || slides[current] !== slide) return;
        if (video.readyState < 2) fallbackToGif(slide, video);
        else setChrome(true);
      }, 10000);
      return;
    }
    if (!img || img.dataset.gifMissing === "1") {
      markVideoDone();
      return;
    }
    const startTimer = () => {
      if (gen !== stepGen || slides[current] !== slide) return;
      const gifMs = Number(img.dataset.durationMs) || 12000;
      const audMs = audioDuration() * 1000;
      const ms = Math.max(gifMs, audMs || 0);
      clearTimeout(mediaTimer);
      mediaTimer = setTimeout(() => {
        if (gen !== stepGen || slides[current] !== slide) return;
        freezeGif(slide);
        markVideoDone();
      }, ms + 80);
    };
    if (gifReady(img)) startTimer();
    else img.addEventListener("load", startTimer, { once: true });
  }

  function fallbackToGif(slide, video) {
    const gif = video && video.dataset.gif;
    const still = video && video.dataset.still;
    setWaiting(slide, false);
    if (!gif) {
      markVideoDone();
      return;
    }
    const img = document.createElement("img");
    img.width = video.width || 720;
    img.height = video.height || 1558;
    img.alt = video.getAttribute("aria-label") || "";
    img.dataset.gif = gif;
    img.dataset.still = still || "";
    img.dataset.durationMs = video.dataset.durationMs || "12000";
    img.addEventListener("error", () => {
      if (still) img.src = still;
      markVideoDone();
    });
    img.src = gif;
    video.replaceWith(img);
    armMediaEnd(slide);
  }

  function replayMedia(slide) {
    const video = slide && slide.querySelector("video");
    const img = slide && slide.querySelector("img");
    hideGifReplay(slide);
    if (!userPaused) setChrome(false);
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.preload = "auto";
      setWaiting(slide, true);
      try { video.currentTime = 0; } catch (err) {}
      syncVideoToNarration(video);
      if (!userPaused) playWhenReady(video);
      armMediaEnd(slide);
      return;
    }
    if (!img || img.dataset.gifMissing === "1") {
      markVideoDone();
      return;
    }
    const gif = img.dataset.gif;
    img.dataset.ignoreError = "1";
    const alreadyGif = (img.currentSrc || img.src).indexOf(gif) !== -1;
    if (alreadyGif && gifReady(img)) {
      img.src = img.dataset.still || gif;
      requestAnimationFrame(() => {
        img.src = gif;
        img.dataset.ignoreError = "";
        armMediaEnd(slide);
      });
      return;
    }
    img.src = gif;
    img.dataset.ignoreError = "";
    armMediaEnd(slide);
  }

  function preloadNearby() {
    [current, current + 1, current + 2].forEach((i) => {
      const node = slides[i] && mediaEl(slides[i]);
      if (!node) return;
      if (node.tagName === "VIDEO") {
        node.preload = i === current ? "auto" : "metadata";
        if (i === current + 1) {
          try { node.load(); } catch (err) {}
        }
      } else if (node.dataset.gif) {
        const pre = new Image();
        pre.src = node.dataset.gif;
        if (node.dataset.still) {
          const still = new Image();
          still.src = node.dataset.still;
        }
      }
      const clip = clipFor(i);
      if (clip) clip.preload = "auto";
    });
  }

  function pauseAllMedia() {
    slides.forEach((slide) => {
      const video = slide.querySelector("video");
      if (video) {
        try { video.pause(); } catch (err) {}
      }
    });
  }

  function isChromeTarget(el) {
    return !!(el && el.closest && el.closest("#prev, #next, .replay-gif, .progress, #narrate, .back, .skip"));
  }

  function show(n) {
    stopNarration();
    stopCaption();
    pauseAllMedia();
    clearTimeout(mediaTimer);
    clearTimeout(stallTimer);
    clearTimeout(advanceTimer);
    const nextIndex = Math.max(0, Math.min(last, n));
    current = nextIndex;
    const finished = current === last;
    stepGen += 1;
    videoDone = false;
    audioDone = false;
    userPaused = false;
    app.classList.remove("is-paused");
    app.classList.toggle("is-done", finished);

    slides.forEach((s, i) => s.classList.toggle("active", !finished && i === current));
    done.classList.toggle("active", finished);
    if (finished) {
      setWaiting(slides[Math.max(0, last - 1)], false);
      setChrome(true);
      videoDone = true;
    } else {
      setChrome(false);
      replayMedia(slides[current]);
      preloadNearby();
    }

    dots.forEach((d, i) => {
      d.classList.toggle("done", i < current);
      if (finished) {
        d.classList.add("done");
        d.removeAttribute("aria-current");
      } else {
        d.toggleAttribute("aria-current", i === current);
        if (i === current) d.setAttribute("aria-current", "step");
        else d.removeAttribute("aria-current");
      }
    });

    status.textContent = finished ? GuiaI18n.t("statusDone") : GuiaI18n.t("stepOf", current + 1, last);
    prev.disabled = current === 0;
    next.setAttribute("aria-label", finished ? GuiaI18n.t("again") : current === last - 1 ? GuiaI18n.t("finish") : GuiaI18n.t("next"));
    next.classList.toggle("finish", current >= last - 1);

    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    main.focus({ preventScroll: true });
    placeCaption();
    speakCurrent();
    startCaption();
  }

  document.querySelectorAll(".replay-gif").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      userPaused = false;
      app.classList.remove("is-paused");
      videoDone = false;
      audioDone = false;
      replayMedia(slides[current]);
      speakCurrent();
      startCaption();
    });
  });
  dots.forEach((d) => d.addEventListener("click", () => show(Number(d.dataset.go))));
  prev.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current === last ? 0 : current + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === " " || e.code === "Space") {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON" || e.target.tagName === "TEXTAREA")) return;
      e.preventDefault();
      unlockOrPause();
    }
  });

  app.addEventListener("pointerdown", (e) => {
    if (e.button && e.button !== 0) return;
    if (isChromeTarget(e.target)) {
      ptr.id = null;
      return;
    }
    ptr = { id: e.pointerId, x: e.clientX, y: e.clientY, t: Date.now() };
  });

  app.addEventListener("pointerup", (e) => {
    if (ptr.id !== e.pointerId) return;
    const dx = e.clientX - ptr.x;
    const dy = e.clientY - ptr.y;
    const dt = Date.now() - ptr.t;
    ptr.id = null;
    if (isChromeTarget(e.target)) return;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      show(current + (dx < 0 ? 1 : -1));
      return;
    }
    if (dt < 550 && Math.abs(dx) < 22 && Math.abs(dy) < 22) {
      unlockOrPause();
    }
  });

  app.addEventListener("pointercancel", () => {
    ptr.id = null;
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (!userPaused && !app.classList.contains("is-done")) {
        const slide = slides[current];
        const video = slide && slide.querySelector("video");
        const clip = clipFor(current);
        if (video) try { video.pause(); } catch (err) {}
        if (clip) clip.pause();
        if (bgm) bgm.pause();
        setPaused(true);
      } else if (bgm) {
        bgm.pause();
      }
    }
  });

  document.addEventListener("guia-langchange", () => {
    GuiaI18n.applyGuide(guideId);
    setNarrateUi();
    show(current);
  });

  document.querySelectorAll(".slide img").forEach((img) => {
    img.addEventListener("error", () => {
      if (img.dataset.ignoreError === "1") return;
      img.dataset.gifMissing = "1";
      if (img.dataset.still) img.src = img.dataset.still;
    });
    img.addEventListener("load", () => {
      if (/\.gif(\?|#|$)/i.test(img.src)) img.dataset.gifMissing = "";
    });
  });

  show(0);
})();
