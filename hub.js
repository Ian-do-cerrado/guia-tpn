(function () {
  const { createApp, computed, onBeforeUnmount, onMounted, ref } = Vue;
  const i18n = window.GuiaI18n;
  const HTML_LANG = i18n.HTML_LANG;

  const FlagIcon = {
    props: { code: { type: String, required: true } },
    template:
      '<span class="flag" aria-hidden="true">' +
      '<svg v-if="code === \'pt\'" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="15" fill="#009b3a"/><polygon points="11,1.6 20.4,7.5 11,13.4 1.6,7.5" fill="#fedf00"/><circle cx="11" cy="7.5" r="3.15" fill="#002776"/></svg>' +
      '<svg v-else-if="code === \'en\'" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="15" fill="#b22234"/><rect y="1.15" width="22" height="1.15" fill="#fff"/><rect y="3.46" width="22" height="1.15" fill="#fff"/><rect y="5.77" width="22" height="1.15" fill="#fff"/><rect y="8.08" width="22" height="1.15" fill="#fff"/><rect y="10.38" width="22" height="1.15" fill="#fff"/><rect y="12.69" width="22" height="1.15" fill="#fff"/><rect width="8.8" height="8.05" fill="#3c3b6e"/></svg>' +
      '<svg v-else viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="15" fill="#c60b1e"/><rect y="3.75" width="22" height="7.5" fill="#ffc400"/></svg>' +
      "</span>"
  };

  const GuideIcon = {
    props: { name: { type: String, required: true } },
    template:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<template v-if="name === \'user-plus\'"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M16 11h6"/></template>' +
      '<template v-else-if="name === \'leaf\'"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></template>' +
      '<template v-else-if="name === \'refresh\'"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></template>' +
      '<template v-else-if="name === \'swap\'"><path d="M16 3l4 4-4 4"/><path d="M20 7H4"/><path d="M8 21l-4-4 4-4"/><path d="M4 17h16"/></template>' +
      '<template v-else-if="name === \'shield\'"><path d="M12 3l8 4v5c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V7l8-4z"/><path d="M9 12l2 2 4-4"/></template>' +
      '<template v-else-if="name === \'qr\'"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3"/><path d="M21 14h-1"/><path d="M14 17h7"/><path d="M14 21h3"/><path d="M21 21h-4"/></template>' +
      '<template v-else><path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7" rx="1"/></template>' +
      "</svg>"
  };

  createApp({
    components: { FlagIcon: FlagIcon, GuideIcon: GuideIcon },
    setup: function () {
      const lang = ref(i18n.getLang());
      const open = ref(false);
      const switchRef = ref(null);

      const langs = [
        { code: "pt", label: "Português" },
        { code: "en", label: "English" },
        { code: "es", label: "Español" }
      ];

      function applyDocument() {
        document.documentElement.lang = HTML_LANG[lang.value] || "pt-BR";
        document.title = i18n.INDEX.title[lang.value];
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute("content", i18n.INDEX.description[lang.value]);
      }

      const heading = computed(function () {
        return i18n.INDEX.heading[lang.value];
      });
      const logoAlt = computed(function () {
        return i18n.INDEX.logoAlt[lang.value];
      });
      const credit = computed(function () {
        return i18n.INDEX.credit[lang.value];
      });
      const langGroup = computed(function () {
        const labels = { pt: "Idioma", en: "Language", es: "Idioma" };
        return labels[lang.value] || labels.pt;
      });
      const current = computed(function () {
        return langs.find(function (item) {
          return item.code === lang.value;
        }) || langs[0];
      });
      const options = computed(function () {
        return langs.filter(function (item) {
          return item.code !== lang.value;
        });
      });
      const cards = computed(function () {
        return i18n.INDEX.cards.map(function (card) {
          return {
            href: card.href,
            icon: card.icon,
            intro: card.intro[lang.value],
            key: card.key[lang.value],
            note: card.note ? card.note[lang.value] : "",
            title: card.title[lang.value]
          };
        });
      });

      function choose(code) {
        lang.value = i18n.setLang(code);
        open.value = false;
        applyDocument();
        document.dispatchEvent(new CustomEvent("guia-langchange", { detail: { lang: lang.value } }));
      }

      function onPointerDown(event) {
        if (switchRef.value && !switchRef.value.contains(event.target)) open.value = false;
      }

      onMounted(function () {
        applyDocument();
        document.addEventListener("pointerdown", onPointerDown);
      });
      onBeforeUnmount(function () {
        document.removeEventListener("pointerdown", onPointerDown);
      });

      return {
        lang: lang,
        open: open,
        switchRef: switchRef,
        heading: heading,
        logoAlt: logoAlt,
        credit: credit,
        langGroup: langGroup,
        current: current,
        options: options,
        cards: cards,
        choose: choose
      };
    }
  }).mount("#app");
})();
