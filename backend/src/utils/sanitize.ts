// Control characters except tab (\x09), line feed (\x0A) and carriage return (\x0D).
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;
const HTML_TAGS = /<[^>]*>/g;

/**
 * Normalises free text coming from a client: strips HTML tags and control
 * characters, then trims. Values are stored as plain text and rendered by
 * React (which escapes on output), so this is defence in depth.
 */
export function sanitizeText(value: string): string {
  return value.replace(HTML_TAGS, '').replace(CONTROL_CHARS, '').replace(/[<>]/g, '').trim();
}

/** Same as sanitizeText but also collapses all whitespace to single spaces. */
export function sanitizeSingleLine(value: string): string {
  return sanitizeText(value).replace(/\s+/g, ' ');
}
