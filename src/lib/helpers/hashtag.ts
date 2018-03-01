
// const hashtagRe = /(#.*)(\..*)*/g;
const hashtagSplitter = /(#\w+(?:\.\w+)*)/g;
const hashtagRe = /#|\./g;

export function parseHashtags(input: string): string[] {
  return input.split(hashtagSplitter).filter(val => val);
}

export function splitHashtag(input: string) {
  return input.split(hashtagRe).filter(val => val);
}
