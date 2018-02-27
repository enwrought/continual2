import React from 'react';
import { Link } from 'react-router-dom';

interface HashtagProptypes {
  tag: string,
  subtags?: string[];  // TODO - fix!
  className?: string;
}

export const HASHTAG_URL_PREFIX = 'tags';

function urlReducer(combined: string[], subtag: string) {
  const next = `${combined[-1]}/${subtag}`;
  return [...combined, next];
}

function toLink(tag: string, url: string) {
  return <Link to={url} className="hashtag__link">{ tag }</Link>
}

function getTagUrl(tag: string) {
  return `${HASHTAG_URL_PREFIX}/${tag}`;
}

function combine(tag: string, subtags: string[] | undefined, urls: string[]) {
  const tagUrl = getTagUrl(tag);
  let combined : React.ReactNode[] = [<Link to={ tagUrl }>{ `#${tag}` }</Link>];

  if (subtags) {
    subtags.forEach((subtag, index) => {
      combined.push('.');
      combined.push(toLink(subtag, urls[index]));
    });
  }

  return combined;
}

// TODO - styling
export default function HashTag(props: HashtagProptypes) {
  const { tag, subtags } = props;
  const tagUrl = `${HASHTAG_URL_PREFIX}/${tag}`;

  const urls = subtags ? subtags.reduce(urlReducer, [tagUrl]).slice(1) : [];
  const combined = combine(tag, subtags, urls);

  return (
    <span className="hashtag">
      {
        combined
      }
    </span>
  )
}
