export function assertNever(x: never): never {
  throw new Error("Unexpected object: " + JSON.stringify(x));
}
// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

export type Char = string & { __brandChar: "Char" };

export function Char_mkOrThrow(s: string): Char {
  const l = Array.from(s).length;
  if (l !== 1) throw new Error("");
  return s as Char;
}

export function Char_mkArray(s: string): readonly Char[] {
  return Array.from(s) as Char[];
}

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

type Series = "a" | "o";

interface ConsonantDef {
  readonly letter: Char;
  readonly trans: string;
  readonly series: Series;
}

interface ExtraConsonantDef {
  readonly letters: readonly Char[];
  readonly desc: string;
  readonly trans: string;
  readonly series: Series;
}

interface VowelDef {
  readonly letter: Char;
  readonly trans_a: string;
  readonly trans_o: string;
}

interface VowelCombinationDef {
  readonly letters: readonly Char[];
  readonly trans_a: string;
  readonly trans_o: string;
}

// ==========================================
// 2. DATA DEFINITIONS
// ==========================================

const CONSONANTS: ConsonantDef[] = (
  [
    { letter: "ក", trans: "ка", series: "a" },
    { letter: "ខ", trans: "кха", series: "a" },
    { letter: "គ", trans: "ко", series: "o" },
    { letter: "ឃ", trans: "кхо", series: "o" },
    { letter: "ង", trans: "нго", series: "o" },
    { letter: "ច", trans: "тя", series: "a" },
    { letter: "ឆ", trans: "ча", series: "a" },
    { letter: "ជ", trans: "тё", series: "o" },
    { letter: "ឈ", trans: "чо", series: "o" },
    { letter: "ញ", trans: "нё", series: "o" },
    { letter: "ដ", trans: "да", series: "a" },
    { letter: "ឋ", trans: "тха", series: "a" },
    { letter: "ឌ", trans: "до", series: "o" },
    { letter: "ឍ", trans: "тхо", series: "o" },
    { letter: "ណ", trans: "на", series: "a" },
    { letter: "ត", trans: "та", series: "a" },
    { letter: "ថ", trans: "тха", series: "a" },
    { letter: "ទ", trans: "то", series: "o" },
    { letter: "ធ", trans: "тхо", series: "o" },
    { letter: "ន", trans: "но", series: "o" },
    { letter: "ប", trans: "ба", series: "a" },
    { letter: "ផ", trans: "пха", series: "a" },
    { letter: "ព", trans: "по", series: "o" },
    { letter: "ភ", trans: "пхо", series: "o" },
    { letter: "ម", trans: "мо", series: "o" },
    { letter: "យ", trans: "йо", series: "o" },
    { letter: "រ", trans: "ро", series: "o" },
    { letter: "ល", trans: "ло", series: "o" },
    { letter: "វ", trans: "во", series: "o" },
    { letter: "ស", trans: "са", series: "a" },
    { letter: "ហ", trans: "ха", series: "a" },
    { letter: "ឡ", trans: "ла", series: "a" },
    { letter: "អ", trans: "а", series: "a" },
  ] as const
).map((x) => ({ ...x, letter: Char_mkOrThrow(x.letter) }));

const EXTRA_CONSONANTS: ExtraConsonantDef[] = (
  [
    { letters: "ហ្គ", desc: "ха + ко", trans: "га", series: "a" },
    { letters: "ហ្គ៊", desc: "ха + ко + трейсап", trans: "го", series: "o" },
    { letters: "ហ្ន", desc: "ха + но", trans: "на", series: "a" },
    { letters: "ប៉", desc: "ба + тмень-кандоль", trans: "па", series: "a" },
    { letters: "ហ្ម", desc: "ха + мо", trans: "ма", series: "a" },
    { letters: "ហ្ល", desc: "ха + ло", trans: "ла", series: "a" },
    { letters: "ហ្វ", desc: "ха + во", trans: "фа", series: "a" },
    { letters: "ហ្វ៊", desc: "ха + во + трейсап", trans: "фо", series: "o" },
    { letters: "ហ្ស", desc: "ха + са", trans: "жа, за", series: "a" },
    {
      letters: "ហ្ស៊",
      desc: "ха + са + трейсап",
      trans: "жо, зо",
      series: "o",
    },
  ] as const
)
  .map((x) => ({ ...x, letters: Char_mkArray(x.letters) }))
  .sort((a, b) => b.letters.length - a.letters.length);

const VOWELS: VowelDef[] = (
  [
    { letter: "អ", trans_a: "а", trans_o: "о" },
    { letter: "ា", trans_a: "а", trans_o: "еа" },
    { letter: "ិ", trans_a: "е", trans_o: "и" },
    { letter: "ី", trans_a: "эй", trans_o: "и" },
    { letter: "ឹ", trans_a: "э", trans_o: "ы" },
    { letter: "ឺ", trans_a: "э", trans_o: "ы" },
    { letter: "ុ", trans_a: "о", trans_o: "у" },
    { letter: "ូ", trans_a: "оу", trans_o: "у" },
    { letter: "ួ", trans_a: "уо", trans_o: "уо" },
    { letter: "ើ", trans_a: "аэ", trans_o: "э" },
    { letter: "ឿ", trans_a: "ыа", trans_o: "ыа" },
    { letter: "ៀ", trans_a: "ие", trans_o: "ие" },
    { letter: "េ", trans_a: "е", trans_o: "е" },
    { letter: "ែ", trans_a: "ае", trans_o: "э" },
    { letter: "ៃ", trans_a: "ай", trans_o: "ей" },
    { letter: "ោ", trans_a: "ао", trans_o: "оу" },
    { letter: "ៅ", trans_a: "ау", trans_o: "эу" },
  ] as const
).map((x) => ({ ...x, letter: Char_mkOrThrow(x.letter) }));

const VOWEL_COMBINATIONS: VowelCombinationDef[] = (
  [
    { letters: ["ុ", "ំ"], trans_a: "ом", trans_o: "ум" },
    { letters: ["ំ"], trans_a: "ам", trans_o: "ум" },
    { letters: ["ា", "ំ"], trans_a: "ам", trans_o: "оам" },
    { letters: ["ះ"], trans_a: "ах", trans_o: "эах" },
    { letters: ["ិ", "ះ"], trans_a: "ех", trans_o: "их" },
    { letters: ["ុ", "ះ"], trans_a: "ох", trans_o: "ух" },
    { letters: ["េ", "ះ"], trans_a: "эх", trans_o: "их" },
    { letters: ["ោ", "ះ"], trans_a: "аох", trans_o: "уох" },
  ] as const
)
  .map((x) => ({ ...x, letters: x.letters.map(Char_mkOrThrow) }))
  .sort((a, b) => b.letters.length - a.letters.length);

// ==========================================
// 2. HELPERS
// ==========================================

export type ArrayMatchOutput<T> =
  | { readonly t: "matched" }
  | { readonly t: "not_matched"; readonly otherSentencePart: readonly T[] };

// Array_match([9,9], [1,9,9,9,4,5,6,7,8]) => [ { t: 'not_matched', otherSentencePart: [1] }, {t: 'matched' }, { t: 'not_matched', otherSentencePart: [9,4,5,6,7,8] } ]
// Array_match([9,9], [1,9,9,9,4,5,6,7,8,9,9]) => [ { t: 'not_matched', otherSentencePart: [1] }, {t: 'matched' }, { t: 'not_matched', otherSentencePart: [9,4,5,6,7,8] }, {t: 'matched' } ]
export function Array_match<T extends string | number>(
  word: readonly T[],
  sentence: readonly T[],
): ArrayMatchOutput<T>[] {
  const result: ArrayMatchOutput<T>[] = [];
  let buffer: T[] = [];
  let i = 0;

  // Safety check: if word is empty, we can't really "match" it inside a sentence meaningfully
  // without creating infinite empty matches.
  if (word.length === 0)
    return [{ t: "not_matched", otherSentencePart: sentence }];

  while (i < sentence.length) {
    // Check if the sequence starting at i matches 'word'
    let isMatch = true;
    for (let j = 0; j < word.length; j++) {
      if (i + j >= sentence.length || sentence[i + j] !== word[j]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      // 1. Flush any non-matched buffer
      if (buffer.length > 0) {
        result.push({ t: "not_matched", otherSentencePart: [...buffer] });
        buffer = [];
      }
      // 2. Add the matched token
      result.push({ t: "matched" });
      // 3. Advance index
      i += word.length;
    } else {
      // No match, accumulate current char
      const c = sentence[i];
      if (!c) throw new Error("no index");
      buffer.push(c);
      i++;
    }
  }

  // Flush remaining buffer
  if (buffer.length > 0) {
    result.push({ t: "not_matched", otherSentencePart: buffer });
  }

  return result;
}

// ==========================================
// 2. HELPERS
// ==========================================

export type ArrayMatchManyOutput<T> =
  | { readonly t: "matched"; readonly word: readonly T[] }
  | { readonly t: "not_matched"; readonly otherSentencePart: readonly T[] };

export function Array_matchMany<T extends string | number>(
  words: readonly (readonly T[])[],
  sentence: readonly T[],
): ArrayMatchManyOutput<T>[] {
  // 1. Initialize with the entire sentence as a single unmatched segment
  const initialSegments: ArrayMatchManyOutput<T>[] = [
    { t: "not_matched", otherSentencePart: sentence },
  ];

  // 2. Reduce over the list of words.
  //    For each word, we scan the current list of segments.
  //    If a segment is already 'matched', we leave it alone.
  //    If it is 'not_matched', we run Array_match on it to see if we can split it further.
  return words.reduce<ArrayMatchManyOutput<T>[]>((currentSegments, word) => {
    // Safety check for empty words to prevent infinite splitting
    if (word.length === 0) return currentSegments;

    return currentSegments.flatMap((segment) => {
      // A. If already matched, keep it
      if (segment.t === "matched") {
        return [segment];
      }

      // B. If not matched, try to match the current 'word' against this segment
      const matchResults = Array_match(word, segment.otherSentencePart);

      // C. Transform the results:
      //    Array_match returns { t: 'matched' } (without data).
      //    We enrich this with the actual 'word' we are currently processing.
      return matchResults.map((res): ArrayMatchManyOutput<T> => {
        if (res.t === "matched") {
          return { t: "matched", word: word };
        } else {
          return {
            t: "not_matched",
            otherSentencePart: res.otherSentencePart,
          };
        }
      });
    });
  }, initialSegments);
}

// ==========================================
// 3. LOGIC
// ==========================================

export type TokenType =
  | "CONSONANT"
  | "EXTRA_CONSONANT"
  | "VOWEL"
  | "VOWEL_COMBINATION"
  | "SPACE"
  | "UNKNOWN";

export type Token = { t: TokenType; v: readonly Char[] };

// Internal intermediate state to track what has been tokenized and what is still raw text
type Segment = Token | { t: "PENDING"; v: readonly Char[] };

// ['ស', '្', 'រ', '្', 'ត', 'ី'] =>
// first detect EXTRA_CONSONANTS (several consecutive chars)
// then VOWEL_COMBINATIONS (several consecutive chars)
// then CONSONANTS
// then VOWELS
export const tokenize = (text: readonly Char[]): readonly Token[] => {
  // 1. Initial State: The whole text is one PENDING segment
  let segments: Segment[] = [{ t: "PENDING", v: text }];

  // 2. Helper to apply a dictionary to all PENDING segments
  const applyLayer = (
    patterns: readonly (readonly Char[])[],
    tokenType: TokenType,
  ) => {
    // We replace the current 'segments' list with a new list where
    // PENDING segments have been processed by Array_matchMany
    segments = segments.flatMap((seg) => {
      // If already a finalized Token, keep it as is
      if (seg.t !== "PENDING") {
        return [seg];
      }

      // If PENDING, try to match against the current patterns
      const matchResults = Array_matchMany(patterns, seg.v);

      // Map the match results back to Segments
      return matchResults.map((res): Segment => {
        if (res.t === "matched") {
          // Found a match! Convert to specific Token type
          // We have to cast tokenType to 'any' or verify strict union matching,
          // but logically we know tokenType matches the Token union structure.
          return { t: tokenType, v: res.word } as const;
        } else {
          // Still not matched, keep as PENDING for the next layer
          return { t: "PENDING", v: res.otherSentencePart };
        }
      });
    });
  };

  // 3. Pipeline Execution (Order matters!)

  // Layer A: Extra Consonants (Longest priority)
  applyLayer(
    EXTRA_CONSONANTS.map((x) => x.letters),
    "EXTRA_CONSONANT",
  );

  // Layer B: Vowel Combinations
  applyLayer(
    VOWEL_COMBINATIONS.map((x) => x.letters),
    "VOWEL_COMBINATION",
  );

  // Layer C: Standard Consonants (Single char, wrapped in array)
  applyLayer(
    CONSONANTS.map((x) => [x.letter]),
    "CONSONANT",
  );

  // Layer D: Standard Vowels (Single char, wrapped in array)
  applyLayer(
    VOWELS.map((x) => [x.letter]),
    "VOWEL",
  );

  // 4. Finalize: Convert remaining PENDING segments into SPACE or UNKNOWN tokens
  return segments.flatMap((seg): Token[] => {
    // Already finalized tokens pass through
    if (seg.t !== "PENDING") return [seg];

    // Process the remaining raw characters
    const results: Token[] = [];
    for (const char of seg.v) {
      if (char === " ") {
        results.push({ t: "SPACE", v: [char] });
      } else {
        // Fallback for symbols, numbers, or characters not in our definitions
        results.push({ t: "UNKNOWN", v: [char] });
      }
    }
    return results;
  });
};

// ==========================================
// 4. TTS FUNCTIONALITY
// ==========================================

/**
 * Speaks the given text using the Web Speech API
 */
const speakText = async (
  text: string,
  api: AnkiDroidJS | undefined,
): Promise<void> => {
  const lang = "km-KH";
  const rate = 0.8;

  // 1️⃣ Try AnkiDroid TTS
  if (api && typeof api.ankiTtsSpeak === "function") {
    try {
      await api.ankiTtsSetLanguage(lang);
      await api.ankiTtsSetSpeechRate(rate);
      await api.ankiTtsSpeak(text, 0); // 0 is QUEUE_FLUSH (queue dropped), 1 is QUEUE_ADD (waited)
      return; // successful → stop here
    } catch (err) {
      console.warn("AnkiDroid TTS failed, falling back:", err);
    }
  }

  // 2️⃣ Fallback: Web Speech API
  if (!("speechSynthesis" in window)) {
    console.warn("No available TTS (AnkiDroid + WebSpeech both unavailable)");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
};

const addTTSHandlers_whole = (
  elementId: string,
  api: AnkiDroidJS | undefined,
): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Add TTS to main word/sentence element
  element.style.cursor = "pointer";
  element.addEventListener("click", (e) => {
    e.preventDefault();
    const text = element.innerText.trim();
    if (text) speakText(text, api);
  });
};

/**
 * Adds click handlers to enable TTS on elements
 */
const addTTSHandlers = (
  elementId: string,
  elementToClick: string,
  api: AnkiDroidJS | undefined,
): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Add TTS to individual token boxes (letters/components)
  const tokenBoxes = element.querySelectorAll(elementToClick);
  tokenBoxes.forEach((box) => {
    (box as HTMLElement).style.cursor = "pointer";
    box.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent parent element from triggering
      const text = box.textContent?.trim();
      if (text) speakText(text, api);
    });
  });
};

// ==========================================
// 5. RENDERERS
// ==========================================

export type EnrichedToken = Token & { readonly series: Series };

export const enrichWithSeries = (
  tokens: readonly Token[],
): readonly EnrichedToken[] => {
  return tokens.reduce<{
    currentSeries: Series;
    tokens: readonly EnrichedToken[];
  }>(
    (acc, token) => {
      let newSeries = acc.currentSeries;

      if (token.t === "CONSONANT") {
        const def = CONSONANTS.find((c) => c.letter === token.v[0]);
        if (def) newSeries = def.series;
      } else if (token.t === "EXTRA_CONSONANT") {
        const def = EXTRA_CONSONANTS.find(
          (ec) =>
            ec.letters.length === token.v.length &&
            ec.letters.every((l, i) => l === token.v[i]),
        );
        if (def) newSeries = def.series;
      }

      return {
        currentSeries: newSeries,
        tokens: [...acc.tokens, { ...token, series: newSeries }],
      };
    },
    { currentSeries: "a", tokens: [] },
  ).tokens;
};

export const renderTransliteration = (
  enrichedTokens: readonly EnrichedToken[],
): string => {
  return enrichedTokens
    .map((token) => {
      const text = token.v.join("");

      switch (token.t) {
        case "CONSONANT": {
          const def = CONSONANTS.find((c) => c.letter === token.v[0]);
          if (!def) return "";

          const className = def.series === "a" ? "cons-a" : "cons-o";
          return `
          <div class="token-box">
            <div class="token-char ${className}">${text}</div>
            <div class="token-trans">${def.trans}</div>
          </div>`;
        }

        case "EXTRA_CONSONANT": {
          const def = EXTRA_CONSONANTS.find(
            (ec) =>
              ec.letters.length === token.v.length &&
              ec.letters.every((l, i) => l === token.v[i]),
          );
          if (!def) return "";

          return `
          <div class="token-box">
            <div class="token-char cons-extra"><i>${text}</i></div>
            <div class="token-trans">${def.trans}</div>
          </div>`;
        }

        case "VOWEL": {
          const def = VOWELS.find((v) => v.letter === token.v[0]);
          if (!def) return "";

          const isASeries = token.series === "a";
          const aClass = isASeries ? "trans-active" : "trans-inactive";
          const oClass = isASeries ? "trans-inactive" : "trans-active";

          return `
          <div class="token-box">
            <div class="token-char vowel">${text}</div>
            <div class="token-trans">
              <span class="trans-option ${aClass}">${def.trans_a}</span><span class="trans-separator">/</span><span class="trans-option ${oClass}">${def.trans_o}</span>
            </div>
          </div>`;
        }

        case "VOWEL_COMBINATION": {
          const def = VOWEL_COMBINATIONS.find(
            (vc) =>
              vc.letters.length === token.v.length &&
              vc.letters.every((l, i) => l === token.v[i]),
          );
          if (!def) return "";

          const isASeries = token.series === "a";
          const aClass = isASeries ? "trans-active" : "trans-inactive";
          const oClass = isASeries ? "trans-inactive" : "trans-active";

          return `
          <div class="token-box">
            <div class="token-char vowel">${text}</div>
            <div class="token-trans">
              <span class="trans-option ${aClass}">${def.trans_a}</span><span class="trans-separator">/</span><span class="trans-option ${oClass}">${def.trans_o}</span>
            </div>
          </div>`;
        }

        case "SPACE":
          return `</br>`;

        case "UNKNOWN":
          return `
          <div class="token-box">
            <div class="token-char unknown">${text}</div>
            <div class="token-trans">—</div>
          </div>`;
        default:
          assertNever(token.t);
      }
    })
    .join("");
};

// ==========================================
// 6. MAIN EXECUTION FOR ANKI
// ==========================================

function initAnkiDroidApi(): AnkiDroidJS | undefined {
  if (typeof AnkiDroidJS !== "undefined") {
    try {
      const jsApiContract = {
        version: "0.0.3",
        developer: "srghma@gmail.com", // <-- REQUIRED
      };
      return new AnkiDroidJS(jsApiContract);
    } catch (err) {
      console.warn("Failed to initialize AnkiDroid API:", err);
    }
  } else {
    console.log("AnkiDroidJS not present — using browser fallback.");
  }
}

const renderSingleKhmerText = (
  textElementId: string,
  graphemesElementId: string,
  transliterationElementId: string,
  api: AnkiDroidJS | undefined,
): void => {
  const textEl = document.getElementById(textElementId);
  if (!textEl) return;

  const text = textEl.innerText.trim();
  if (!text) return;

  const chars = Char_mkArray(text);

  // 1. Render grapheme clusters
  (() => {
    const graphemesEl = document.getElementById(graphemesElementId);
    if (!graphemesEl) return;

    try {
      const segmenter = new Intl.Segmenter("km", { granularity: "grapheme" });
      const graphemes = [...segmenter.segment(text)]
        .map((x) => (x.segment === " " ? "-" : `<span class="one-grapheme-with-audio">${x.segment}</span>`))
        .join(" ");
      graphemesEl.innerHTML = graphemes;
    } catch (e) {
      graphemesEl.innerText = "(Grapheme segmentation not supported)";
    }
  })();

  // 2. Tokenize and enrich
  const tokens = tokenize(chars);
  const enrichedTokens = enrichWithSeries(tokens);

  // 3. Render transliteration
  (() => {
    const transEl = document.getElementById(transliterationElementId);
    if (!transEl) return;
    transEl.innerHTML = renderTransliteration(enrichedTokens);
  })();

  // 4. Add TTS handlers after rendering
  addTTSHandlers_whole(textElementId, api);
  addTTSHandlers(graphemesElementId, ".one-grapheme-with-audio", api);
  addTTSHandlers(transliterationElementId, ".token-char", api);
};

export const renderKhmerAnalysis = (): void => {
  if (typeof document === "undefined") return;

  const api = initAnkiDroidApi();

  // Render main word
  renderSingleKhmerText("word", "word-graphemes", "word-split-ru", api);

  // Render example sentence (if present)
  renderSingleKhmerText(
    "example-sent",
    "example-sent-graphemes",
    "example-sent-split-ru",
    api,
  );
};

// ==========================================
// EXAMPLE USAGE (for testing)
// ==========================================

// Test with word: កម្ពុជា (Cambodia)
// const testText = "កម្ពុជា";
// const testChars = Array.from(testText);
// const testTokens = tokenize(testChars);
// const testEnriched = enrichWithSeries(testTokens);
// console.log('Tokens:', testTokens);
// console.log('Enriched:', testEnriched);
// console.log('HTML Split:', renderCharacterSplit(testEnriched));
// console.log('HTML Trans:', renderTransliteration(testEnriched));

// For Anki: Execute when DOM is ready
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderKhmerAnalysis);
  } else {
    renderKhmerAnalysis();
  }
}
