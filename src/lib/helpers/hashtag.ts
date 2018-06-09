
// const hashtagRe = /(#.*)(\..*)*/g;
const hashtagSplitter = /(#\w+(?:\.\w+)*)/g;
const hashtagRe = /#|\./g;

function parseHashtags(input: string): string[] {
  return input.split(hashtagSplitter).filter(val => val);
}

function splitHashtag(input: string) {
  return input.split(hashtagRe).filter(val => val);
}

export default Object.freeze({
  parseHashtags,
  splitHashtag
});
