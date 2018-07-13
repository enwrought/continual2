import * as React from 'react';
import { Link } from 'react-router-dom';

interface HashtagProps {
  tag: string;
  subtags?: string[];  // TODO - fix!
  className?: string;
}

export const HASHTAG_URL_PREFIX = 'tags';

function urlReducer(combined: string[], subtag: string) {
  const next = `${combined[combined.length - 1]}/${subtag}`;
  return [...combined, next];
}

const toLink = (tag: string, url: string) => {
  return <Link to={url} key={url} className="hash-tag__link">{tag}</Link>;
};

function getTagUrl(tag: string) {
  return `/${HASHTAG_URL_PREFIX}/${tag}`;
}

function combine(tag: string, subtags: string[] | undefined, urls: string[]) {
  // let Link = ReactRouterDom.Link; 
  const tagUrl = getTagUrl(tag);
  const combined: React.ReactNode[] = [<Link key="hashtag" to={tagUrl}>{`#${tag}`}</Link>];
  // let combined : React.ReactNode[] = [<a href={ tagUrl }>{ `#${tag}` }</a>];
  // let combined : React.ReactNode[] = [<div className={ tagUrl }>{ `#${tag}` }</div>];

  if (subtags) {
    subtags.forEach((subtag, index) => {
      combined.push('.');
      combined.push(toLink(subtag, urls[index]));
    });
  }

  return combined;
}

export const HashtagComponent: React.SFC<HashtagProps> = (props: HashtagProps) => {
  const { tag, subtags } = props;
  const tagUrl = `/${HASHTAG_URL_PREFIX}/${tag}`;

  const urls = subtags ? subtags.reduce(urlReducer, [tagUrl]).splice(1) : [];
  const combined = combine(tag, subtags, urls);

  return (
    <span className="hash-tag">
      {
        combined
      }
    </span>
  );
};
