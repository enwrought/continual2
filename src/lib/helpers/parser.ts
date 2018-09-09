import { hashtagSplitter } from './hashtag';
import { userSplitter } from './user';

type RegExpMap = {
  [key: string]: RegExp
};

// TODO: newline splitter?
/**
 * Each of these needs to be wrapped in a () so that they can match the group
 */
const SPLITTERS: RegExpMap = {
  HASHTAG: hashtagSplitter, 
  USER: userSplitter
};

const splittersRe = Object.keys(SPLITTERS).map(key => SPLITTERS[key]);

const combinedSplitter = new RegExp(splittersRe.map(splitter => splitter.source).join('|'), 'g');

interface ParsedType {
  type: string;
  match: string;
}

// TODO: think about how to make this faster if needed instead of passing through
//       everything and manually finding the first match
/**
 * 
 * @param input text to be split up
 * @returns array of pairs
 */
export function parse(input: string): ParsedType[] {
  const nonEmptySplits = input.split(combinedSplitter).filter(val => val);
  return nonEmptySplits.map((nonEmptySplit: string) => {
    // TODO: implement
    const KEY = Object.keys(SPLITTERS).find((key: string) => {
      const splitter = SPLITTERS[key];
      return splitter.test(nonEmptySplit);
    });

    if (KEY) {
      return {
        type: KEY,
        match: nonEmptySplit
      };
    }
    return {
      type: 'NONE',
      match: nonEmptySplit
    };
  });
}
