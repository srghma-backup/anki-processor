import {
  tokenize,
  Array_match,
  Array_matchMany,
  Char_mkOrThrow,
  Token,
} from "./anki";

describe("Anki Processor Logic", () => {
  // ==========================================
  // 1. Helper Tests
  // ==========================================
  describe("Char_mkOrThrow", () => {
    it("should accept a single character", () => {
      expect(() => Char_mkOrThrow("ក")).not.toThrow();
      expect(Char_mkOrThrow("A")).toBe("A");
    });

    it("should throw on multiple characters", () => {
      expect(() => Char_mkOrThrow("AB")).toThrow();
    });

    it("should throw on empty string", () => {
      expect(() => Char_mkOrThrow("")).toThrow();
    });
  });

  // ==========================================
  // 2. Array Matcher Tests
  // ==========================================
  describe("Array_match", () => {
    it("should match a sub-sequence correctly", () => {
      const result = Array_match([9, 9], [1, 9, 9, 9, 4]);
      // Expect: [ {not_matched: [1]}, {matched: [9,9]}, {not_matched: [9,4]} ]
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ t: "not_matched", otherSentencePart: [1] });
      expect(result[1]).toEqual({ t: "matched", word: [9, 9] });
      expect(result[2]).toEqual({
        t: "not_matched",
        otherSentencePart: [9, 4],
      });
    });

    it("should handle no matches", () => {
      const result = Array_match([5, 5], [1, 2, 3]);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        t: "not_matched",
        otherSentencePart: [1, 2, 3],
      });
    });

    it("should handle full match", () => {
      const result = Array_match([1, 2], [1, 2]);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ t: "matched", word: [1, 2] });
    });
  });

  describe("Array_matchMany (Greedy)", () => {
    it("should prefer longer matches (greedy behavior)", () => {
      // Long [1, 2, 3] vs Short [1, 2]
      const dict = [
        [1, 2, 3],
        [1, 2],
      ];
      const sentence = [1, 2, 3, 4];

      const result = Array_matchMany(dict, sentence);

      // Should match [1, 2, 3] first, leaving [4]
      expect(result[0]).toEqual({ t: "matched", word: [1, 2, 3] });
      expect(result[1]).toEqual({ t: "not_matched", otherSentencePart: [4] });
    });

    it("should respect order if lengths are equal or order dictates priority", () => {
      // If we put the shorter one first in the dictionary, and the logic simply Iterates,
      // it might catch the shorter one depending on implementation.
      // Your implementation breaks on the *first* dictionary match found.
      const dict = [
        [1, 2],
        [1, 2, 3],
      ];
      const sentence = [1, 2, 3];

      const result = Array_matchMany(dict, sentence);

      // Since [1, 2] is checked first, it matches, leaving [3]
      expect(result[0]).toEqual({ t: "matched", word: [1, 2] });
      expect(result[1]).toEqual({ t: "not_matched", otherSentencePart: [3] });
    });
  });

  // ==========================================
  // 3. Khmer Tokenizer Tests
  // ==========================================
  describe("tokenize (Khmer)", () => {
    // Helper to extract values for easier assertion
    const getValues = (tokens: readonly Token[]) =>
      tokens.map((t) =>
        t.t === "UNKNOWN" || t.t === "SPACE" ? t.v.join("") : t.v.join(""),
      );

    const getTypes = (tokens: readonly Token[]) => tokens.map((t) => t.t);

    it("should tokenize simple consonants", () => {
      // "កខ" -> Ka, Kha
      const input = Char_mkOrThrow("ក") + Char_mkOrThrow("ខ");
      const tokens = tokenize(input.split("") as any);

      expect(getTypes(tokens)).toEqual(["CONSONANT", "CONSONANT"]);
      expect(getValues(tokens)).toEqual(["ក", "ខ"]);
    });

    it("should prioritize EXTRA_CONSONANTS over standard consonants", () => {
      // Input: ហ្គ (Ho + Coeng + Ko) -> Transliterates to "ga" (Extra Consonant)
      // If not prioritized, it would be ហ (Ha) + ្ (Coeng) + គ (Ko)
      const input = "ហ្គ";
      const tokens = tokenize(input.split("") as any);

      expect(tokens).toHaveLength(1);
      expect(tokens[0].t).toBe("EXTRA_CONSONANT");
      expect(getValues(tokens)).toEqual(["ហ្គ"]);
    });

    it("should prioritize VOWEL_COMBINATIONS over standard vowels", () => {
      // Input: ុះ (U + Reahmuk) -> Vowel Combo "oh"
      // If not prioritized, might be U then Reahmuk (which might be unknown or separate)
      const input = "ុះ";
      const tokens = tokenize(input.split("") as any);

      expect(tokens).toHaveLength(1);
      expect(tokens[0].t).toBe("VOWEL_COMBINATION");
      expect(getValues(tokens)).toEqual(["ុះ"]);
    });

    it("should handle mixed complex sentences", () => {
      // "ហ្គាសុះ"
      // Breakdown:
      // ហ្គ (Extra Consonant)
      // ា  (Vowel)
      // ស  (Consonant)
      // ុះ (Vowel Combination)
      const input = "ហ្គាសុះ";
      const tokens = tokenize(input.split("") as any);

      expect(getTypes(tokens)).toEqual([
        "EXTRA_CONSONANT",
        "VOWEL",
        "CONSONANT",
        "VOWEL_COMBINATION",
      ]);

      expect(getValues(tokens)).toEqual(["ហ្គ", "ា", "ស", "ុះ"]);
    });

    it("should handle spaces and unknown characters", () => {
      const input = "ក B"; // Ka, Space, Latin B
      const tokens = tokenize(input.split("") as any);

      expect(getTypes(tokens)).toEqual(["CONSONANT", "SPACE", "UNKNOWN"]);
      expect(getValues(tokens)).toEqual(["ក", " ", "B"]);
    });
  });
});
