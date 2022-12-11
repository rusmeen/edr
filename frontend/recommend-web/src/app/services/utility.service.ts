import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class UtilityService {
  constructor(private http: HttpClient) {}
  networkCall(options: any): any {
    let body = options.data;

    if (typeof options.data != 'string') {
      body = [];

      if (options.repeatData && options.repeatData.length) {
        for (let i = 0; i < options.repeatData.length; i++) {
          let obj = options.repeatData[i];
          for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
              body.push(
                encodeURIComponent(p) + '=' + encodeURIComponent(obj[p])
              );
            }
          }
        }
      }

      for (let p in options.data) {
        if (options.data.hasOwnProperty(p)) {
          body.push(
            encodeURIComponent(p) + '=' + encodeURIComponent(options.data[p])
          );
        }
      }

      body = body.join('&');
    }


    let headers = new HttpHeaders().set(
      'Content-Type',
      options.contentType || 'application/x-www-form-urlencoded'
    );
//     headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
headers.set('Access-Control-Allow-Credentials', 'true');
   
    let opts: any = {
      headers: headers
    };
    opts = Object.assign(opts, options);

    // if (options.method && options.method.toLowerCase() == 'get') {
    //   if (options.url.indexOf('?') == -1) {
    //     options.url += '?t=' + Date.now();
    //   } else {
    //     options.url += '&t=' + Date.now();
    //   }
    // }

    if (opts.params) {
      opts.params = new HttpParams({ fromObject: opts.params });
    }

    const req = new HttpRequest(
      options.method || 'POST',
      options.url,
      body,
      opts
    );

    return this.http.request(req)
  }
}
