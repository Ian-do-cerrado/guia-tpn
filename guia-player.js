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
      ".media video{width:100%;height:100%;object-fit:contain;object-position:center top;background:#0b1f18;display:block}" +
      ".media.is-waiting::after{content:\"\";position:absolute;left:50%;top:42%;width:36px;height:36px;margin:-18px 0 0 -18px;border:3px solid rgba(255,255,255,.22);border-top-color:#fff;border-radius:50%;animation:guia-spin .7s linear infinite;pointer-events:none}" +
      "@keyframes guia-spin{to{transform:rotate(360deg)}}" +
      "@media (prefers-reduced-motion:reduce){.media.is-waiting::after{animation:none;border-top-color:rgba(255,255,255,.55)}}";
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
  let startX = null;
  let startY = null;
  const captionEl = document.getElementById("caption");
  const app = document.querySelector(".app");
  if (window.ResizeObserver && captionEl) {
    new ResizeObserver(() => {
      app.style.setProperty("--caption-space", (app.classList.contains("is-done") ? 0 : captionEl.offsetHeight) + "px");
    }).observe(captionEl);
  }

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrateBtn = document.getElementById("narrate");
  const clips = [...document.querySelectorAll("audio[data-step-audio]")];
  const bgm = document.getElementById("bgm");
  const BGM_VOL = 0.20;
  const BGM_DUCK = 0.12;
  let voiceOn = localStorage.getItem("guia-narrate") !== "off";
  if (bgm) bgm.volume = BGM_VOL;

  function clipFor(step) {
    return clips.find((item) => Number(item.dataset.stepAudio) === step);
  }

  function mediaBox(slide) {
    return slide && slide.querySelector(".media");
  }

  function mediaEl(slide) {
    return slide && (slide.querySelector("video") || slide.querySelector("img"));
  }

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
    clip.addEventListener("ended", duckBgm);
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
    if (!el) return;
    const tryPlay = () => {
      const play = el.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    };
    if (el.readyState >= 2) tryPlay();
    else el.addEventListener("canplay", tryPlay, { once: true });
  }

  function speakCurrent() {
    stopNarration();
    startBgm();
    if (!voiceOn) return;
    const clip = clipFor(current);
    if (!clip) return;
    playWhenReady(clip);
  }

  function resumeBlockedMedia() {
    startBgm();
    const clip = clipFor(current);
    if (voiceOn && clip && clip.paused && !clip.ended && clip.currentTime < 0.2) {
      playWhenReady(clip);
      startCaption();
    }
    const slide = slides[current];
    const video = slide && slide.querySelector("video");
    if (video && video.paused && !video.ended && video.currentTime < 0.2) {
      playWhenReady(video);
    }
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
    const clip = clipFor(current);
    if (voiceOn && clip && !clip.paused && !clip.ended) return clip.currentTime || 0;
    if (captionClock) return (performance.now() - captionClock) / 1000;
    if (clip) return clip.currentTime || 0;
    return 0;
  }

  function tickCaption() {
    const t = captionTime();
    renderCaption(t);
    if (t < captionDuration + 0.35) captionRaf = requestAnimationFrame(tickCaption);
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
      const next = (clip && Number.isFinite(clip.duration) && clip.duration > 0)
        ? clip.duration
        : fallback;
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

  if (narrateBtn) {
    narrateBtn.addEventListener("click", () => {
      voiceOn = !voiceOn;
      localStorage.setItem("guia-narrate", voiceOn ? "on" : "off");
      setNarrateUi();
      if (voiceOn) {
        speakCurrent();
        startCaption();
      } else {
        const clip = clipFor(current);
        const t = clip ? clip.currentTime : 0;
        captionClock = performance.now() - t * 1000;
        clips.forEach((item) => item.pause());
      }
    });
  }
  setNarrateUi();

  document.addEventListener("pointerdown", (e) => {
    if (e.target.closest("#prev, #next, .replay-gif, .progress, #narrate")) return;
    resumeBlockedMedia();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") return;
    resumeBlockedMedia();
  });

  function hideGifReplay(slide) {
    const box = slide && slide.querySelector(".media-replay");
    if (box) box.classList.remove("is-on");
  }

  function showGifReplay(slide) {
    const box = slide && slide.querySelector(".media-replay");
    if (box) box.classList.add("is-on");
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

  let mediaTimer = 0;
  let mediaGen = 0;
  let stallTimer = 0;

  function setChrome(on) {
    app.classList.toggle("chrome-on", !!on);
  }

  app.addEventListener("pointerdown", (e) => {
    if (app.classList.contains("is-done")) return;
    if (e.target.closest("#prev, #next, .replay-gif, .progress")) return;
    setChrome(true);
  });

  function finishMedia(slide) {
    if (!slide || slides[current] !== slide) return;
    setWaiting(slide, false);
    const video = slide.querySelector("video");
    if (video && !video.ended) {
      try { video.pause(); } catch (err) {}
    } else {
      freezeGif(slide);
    }
    setChrome(true);
    showGifReplay(slide);
  }

  function armMediaEnd(slide) {
    clearTimeout(mediaTimer);
    clearTimeout(stallTimer);
    mediaGen += 1;
    const gen = mediaGen;
    hideGifReplay(slide);
    if (!slide) return;
    setChrome(false);
    const video = slide.querySelector("video");
    const img = slide.querySelector("img");
    if (video) {
      const startTimer = () => {
        if (gen !== mediaGen || slides[current] !== slide) return;
        const ms = (Number.isFinite(video.duration) && video.duration > 0)
          ? video.duration * 1000
          : Number(video.dataset.durationMs) || 12000;
        clearTimeout(mediaTimer);
        mediaTimer = setTimeout(() => {
          if (gen !== mediaGen || slides[current] !== slide) return;
          if (!video.paused && !video.ended) return;
          finishMedia(slide);
        }, ms + 400);
      };
      video.onended = () => {
        if (gen !== mediaGen || slides[current] !== slide) return;
        finishMedia(slide);
      };
      video.onplaying = () => {
        if (gen !== mediaGen) return;
        setWaiting(slide, false);
        clearTimeout(stallTimer);
        startTimer();
      };
      video.onwaiting = () => {
        if (gen !== mediaGen) return;
        setWaiting(slide, true);
        clearTimeout(stallTimer);
        stallTimer = setTimeout(() => {
          if (gen !== mediaGen) return;
          setChrome(true);
        }, 8000);
      };
      video.onerror = () => {
        if (gen !== mediaGen) return;
        fallbackToGif(slide, video);
      };
      clearTimeout(stallTimer);
      stallTimer = setTimeout(() => {
        if (gen !== mediaGen || slides[current] !== slide) return;
        if (video.readyState < 2) fallbackToGif(slide, video);
        else setChrome(true);
      }, 10000);
      if (!video.paused && video.readyState >= 2) startTimer();
      return;
    }
    if (!img || img.dataset.gifMissing === "1") {
      setChrome(true);
      return;
    }
    const ms = Number(img.dataset.durationMs) || 12000;
    const startTimer = () => {
      if (gen !== mediaGen || slides[current] !== slide) return;
      clearTimeout(mediaTimer);
      mediaTimer = setTimeout(() => {
        if (gen !== mediaGen || slides[current] !== slide) return;
        finishMedia(slide);
      }, ms + 280);
    };
    if (gifReady(img)) startTimer();
    else img.addEventListener("load", startTimer, { once: true });
  }

  function fallbackToGif(slide, video) {
    const gif = video && video.dataset.gif;
    const still = video && video.dataset.still;
    setWaiting(slide, false);
    if (!gif) {
      finishMedia(slide);
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
      setChrome(true);
    });
    img.src = gif;
    video.replaceWith(img);
    armMediaEnd(slide);
  }

  function replayMedia(slide) {
    const video = slide && slide.querySelector("video");
    const img = slide && slide.querySelector("img");
    hideGifReplay(slide);
    setChrome(false);
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.preload = "auto";
      setWaiting(slide, true);
      try { video.currentTime = 0; } catch (err) {}
      playWhenReady(video);
      armMediaEnd(slide);
      return;
    }
    if (!img || img.dataset.gifMissing === "1") {
      setChrome(true);
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

  function show(n) {
    stopNarration();
    stopCaption();
    pauseAllMedia();
    const nextIndex = Math.max(0, Math.min(last, n));
    current = nextIndex;
    const finished = current === last;
    app.classList.toggle("is-done", finished);

    slides.forEach((s, i) => s.classList.toggle("active", !finished && i === current));
    done.classList.toggle("active", finished);
    if (finished) {
      clearTimeout(mediaTimer);
      clearTimeout(stallTimer);
      setWaiting(slides[Math.max(0, last - 1)], false);
      setChrome(true);
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
    speakCurrent();
    if (!finished) startCaption();
  }

  document.querySelectorAll(".replay-gif").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
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
  });

  document.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      show(current + (dx < 0 ? 1 : -1));
    }
    startX = startY = null;
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopNarration();
      stopCaption();
      pauseAllMedia();
      if (bgm) bgm.pause();
    } else {
      startBgm();
      if (current < last) {
        replayMedia(slides[current]);
        speakCurrent();
        startCaption();
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
