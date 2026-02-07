




/** 색상 문자열인지 (hex, rgb, named) */
export function isColorString(value) {
  return (
    value.startsWith('#') ||
    value.startsWith('rgb') ||
    /^[a-zA-Z]+$/.test(value.trim())
  )
}