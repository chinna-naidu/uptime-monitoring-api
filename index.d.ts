import { IncomingHttpHeaders } from "http"
import { ParsedUrlQuery } from "querystring"


export interface RequestData {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    query: ParsedUrlQuery & string
    path: string
    body: any
    headers: IncomingHttpHeaders
}

export type ReplyCb = (status: number, payload: object) => void 