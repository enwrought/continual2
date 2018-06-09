import * as React from 'react';
import { Link } from 'react-router-dom';

interface HashtagProptypes {
  tag: string,
  subtags?: string[];  // TODO - fix!
  className?: string;
}

export const HASHTAG_URL_PREFIX = 'tags';

function urlReducer(combined: string[], subtag: string) {
  const next = `${combined[combined.length-1]}/${subtag}`;
  return [...combined, next];
}

function toLink(tag: string, url: string) {
  // let Link = ReactRouterDom.Link;
  return <Link to={url} key={url} className="hashtag__link">{ tag }</Link>
  // return <a href={url}>{ tag }</a>
  // return <div className={url}>{ tag }</div>
}

function getTagUrl(tag: string) {
  return `${HASHTAG_URL_PREFIX}/${tag}`;
}

function combine(tag: string, subtags: string[] | undefined, urls: string[]) {
  // let Link = ReactRouterDom.Link; 
  const tagUrl = getTagUrl(tag);
  let combined : React.ReactNode[] = [<Link key='hashtag' to={ tagUrl }>{ `#${tag}` }</Link>];
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

// TODO - styling
export default function HashTagComponent(props: HashtagProptypes) {
  const { tag, subtags } = props;
  const tagUrl = `${HASHTAG_URL_PREFIX}/${tag}`;

  const urls = subtags ? subtags.reduce(urlReducer, [tagUrl]).splice(1) : [];
  const combined = combine(tag, subtags, urls);

  return (
    <span className="hashtag">
      {
        combined
      }
    </span>
  )
}
