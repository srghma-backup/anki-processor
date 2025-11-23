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
  if (word.length === 0) {
    return [{ t: "not_matched", otherSentencePart: sentence }];
  }

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
      buffer.push(sentence[i]);
      i++;
    }
  }

  // Flush remaining buffer
  if (buffer.length > 0) {
    result.push({ t: "not_matched", otherSentencePart: buffer });
  }

  return result;
}

export type ArrayMatchManyOutput<T> =
  | { readonly t: "matched"; readonly word: readonly T[] }
  | { readonly t: "not_matched"; readonly otherSentencePart: readonly T[] };

export function Array_matchMany<T extends string | number>(
  words: readonly (readonly T[])[], // should be ordered from longest to smallest lengths
  sentence: readonly T[],
): ArrayMatchOutput<T>[] {}

// ==========================================
// 3. LOGIC
// ==========================================

export type Token =
  | { t: "CONSONANT"; v: readonly Char[] }
  | { t: "EXTRA_CONSONANT"; v: readonly Char[] }
  | { t: "VOWEL"; v: readonly Char[] }
  | { t: "VOWEL_COMBINATION"; v: readonly Char[] }
  | { t: "SPACE"; v: readonly Char[] }
  | { t: "UNKNOWN"; readonly v: Char[] };

// ['ស', '្', 'រ', '្', 'ត', 'ី'] =>
export const tokenize = (text: readonly Char[]): readonly Token[] => {
  // first detect EXTRA_CONSONANTS (several consecutive chars)
  // then VOWEL_COMBINATIONS (several consecutive chars)
  // then CONSONANTS
  // then VOWELS
};

// ==========================================
// 4. TEST
// ==========================================

