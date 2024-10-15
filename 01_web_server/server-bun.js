import {serve} from 'bun'
import { hostname } from 'os';

serve({
    fetch(request){
        const url = new URL(request.url);
        if(url.pathname === '/'){
            return new Response('hello world')
        } else if (url.pathname === '/about'){
        return new Response('hello world- about')
        }
        else {
            return new Response('404 not found',{status:404})
        }
        },
        port:3000,
        hostname:'127.0.0.1'
})