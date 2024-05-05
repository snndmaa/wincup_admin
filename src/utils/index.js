import { encode } from 'base-64'
export { Fetcher } from './Fetcher'
export const BASE_URL = 'https://teamakatsuki.maurice.webcup.hodi.host/api'
// export const BASE_URL = 'http://localhost:5000/api'


export function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return encode(binary)
}