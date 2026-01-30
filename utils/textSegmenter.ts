/**
 * Utility function to segment text into grapheme clusters
 * Handles emojis, Korean, complex characters, etc. correctly.
 *
 * @param text - Text to segment
 * @param locale - Locale (default: "en")
 * @returns Array of segmented characters
 */
export function segmentText(text: string, locale: string = "en"): string[] {
  if (!text) return [];

  const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
  const segments = Array.from(segmenter.segment(text));

  return segments.map((segment) => segment.segment);
}

/**
 * Convert HTML element's text to wrap each character in a span
 * Handles emojis, Korean, complex characters, etc. correctly.
 *
 * @param element - Element to convert
 * @param locale - Locale (default: "en")
 * @param preserveWhitespace - Whether to convert whitespace to non-breaking space (default: true)
 */
export function wrapTextInSpans(
  element: HTMLElement,
  locale: string = "en",
  preserveWhitespace: boolean = true
): void {
  const text = element.textContent || "";
  const segments = segmentText(text, locale);

  // aria-label
  element.ariaLabel = text;

  // Clear existing content and wrap each character in a span
  element.innerHTML = "";
  segments.forEach((segment) => {
    const span = document.createElement("span");
    // Convert whitespace to non-breaking space
    span.textContent =
      preserveWhitespace && segment === " " ? "\u00A0" : segment;
    element.appendChild(span);
  });
}
