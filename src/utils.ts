import * as md5 from 'md5'

export function sign (appId: string, secretKey: string, salt: string, query: string): string {
  const str1: string = appId + query + salt + secretKey
  return md5(str1)
}
