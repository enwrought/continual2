export const userSplitter = /(@\w+)/g;

export function parseUsers(input: string): string[] {
  return input.split(userSplitter).filter(val => val);
}
