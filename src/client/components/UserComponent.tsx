import * as React from 'react';
import { Link } from 'react-router-dom';
import * as cx from 'classnames';

// TODO: STORY autocomplete
interface UsertagProps {
  userName: string;
  className?: string;
}

export const USER_URL_PREFIX = 'user';

// function urlReducer(combined: string[], subtag: string) {
//   const next = `${combined[combined.length - 1]}/${subtag}`;
//   return [...combined, next];
// }

// const toLink = (tag: string, url: string) => {
//   return <Link to={url} key={url} className="hash-tag__link">{tag}</Link>;
// };

function getUserUrl(user: string) {
  return `/${USER_URL_PREFIX}/${user}`;
}

// function combine(tag: string, subtags: string[] | undefined, urls: string[]) {
//   // let Link = ReactRouterDom.Link; 
//   const tagUrl = getTagUrl(tag);
//   const combined: React.ReactNode[] = [<Link key="hashtag" to={tagUrl}>{`#${tag}`}</Link>];
//   // let combined : React.ReactNode[] = [<a href={ tagUrl }>{ `#${tag}` }</a>];
//   // let combined : React.ReactNode[] = [<div className={ tagUrl }>{ `#${tag}` }</div>];

//   if (subtags) {
//     subtags.forEach((subtag, index) => {
//       combined.push('.');
//       combined.push(toLink(subtag, urls[index]));
//     });
//   }

//   return combined;
// }

export const UserComponent: React.SFC<UsertagProps> = (props: UsertagProps) => {
  const { userName, className } = props;
  const tagUrl = `/${USER_URL_PREFIX}/${userName}`;

  // TODO: INVESTIGATE should we do a lookup to get the real name?

  return (
    <Link to={tagUrl}>{userName}</Link>
  );
};
