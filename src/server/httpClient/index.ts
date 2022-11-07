// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fetch = (...args: any[]) => import('node-fetch').then(({default: fetch}) => fetch.call(fetch, args))
