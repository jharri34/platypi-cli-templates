/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

class BaseService {
    protected static _inject: any = {
        _http: plat.async.Http,
        _Promise: plat.async.IPromise,
        _utils: plat.Utils
    };

    protected _http: plat.async.Http;
    protected _Promise: plat.async.IPromise;
    protected _utils: plat.Utils;

    host: string;
    baseRoute: string;

    constructor(host?: string, baseRoute?: string) {
        if (!this._utils.isString(host)) {
            host = '';
        }

        if (host[0] === '/') {
            host = host.substr(1);
        }

        if (host.length > 0 && host[host.length - 1] !== '/') {
            host = host + '/';
        }

        if (!this._utils.isString(baseRoute)) {
            baseRoute = '';
        }

        if (baseRoute[0] === '/') {
            baseRoute = baseRoute.substr(1);
        }

        this.host = host;
        this.baseRoute = baseRoute;
    }

    protected _get<T>(...urlParams: Array<string | number>): plat.async.IAjaxThenable<T>;
    protected _get<T>(options?: ajax.IHttpConfig, ...urlParams: Array<string | number>): plat.async.IAjaxThenable<T>;
    protected _get<T>(options?: any, ...urlParams: Array<string | number>): plat.async.IAjaxThenable<T> {
        return this._do<T>('GET', options, urlParams);
    }

    protected _put<T>(...urlParams: Array<string | number>): plat.async.IAjaxThenable<T>;
    protected _put<T>(options?: ajax.IHttpConfig, ...urlParams: Array<string | number>): plat.async.IAjaxThenable<T>;
    protected _put<T>(options?: any, ...urlParams: Array<string | number>): plat.async.IAjaxThenable<T> {
        return this._do<T>('PUT', options, urlParams);
    }

    protected _post<T>(...urlParams: Array<string | number>): plat.async.IAjaxThenable<T>;
    protected _post<T>(options?: ajax.IHttpConfig, ...urlParams: Array<string | number>): plat.async.IAjaxThenable<T>;
    protected _post<T>(options?: any, ...urlParams: Array<string | number>): plat.async.IAjaxThenable<T> {
        return this._do<T>('POST', options, urlParams);
    }

    protected _delete<T>(...urlParams: Array<string | number>): plat.async.IAjaxThenable<T>;
    protected _delete<T>(options?: ajax.IHttpConfig, ...urlParams: Array<string | number>): plat.async.IAjaxThenable<T>;
    protected _delete<T>(options?: any, ...urlParams: Array<string | number>): plat.async.IAjaxThenable<T> {
        return this._do<T>('DELETE', options, urlParams);
    }

    protected _do<T>(method: string, urlParam?: string, urlParams?: Array<string | number>): plat.async.IAjaxThenable<T>;
    protected _do<T>(method: string, options?: ajax.IHttpConfig, urlParams?: Array<string | number>): plat.async.IAjaxThenable<T>;
    protected _do<T>(method: string, options?: any, urlParams: Array<string | number> = []): plat.async.IAjaxThenable<T> {
        if (!this._utils.isObject(options)) {
            if (!this._utils.isUndefined(options)) {
                urlParams.unshift(options);
            }

            options = {};
        }

        return this._json<T>(this._utils.extend({
            url: this._buildUrl.apply(this, urlParams),
            method: method
        }, options));
    }

    protected _json<T>(options: plat.async.IHttpConfig): plat.async.IAjaxThenable<T> {
        return this._http.json<any>(options).then((result: any) => {
            return result.response;
        }, (result) => {
            this._handleError(result.response);
        });
    }

    protected _handleError(response: any) {
        console.log(response.message);
    }

    /**
     * Builds a url with the arguments joined with '/'
     */
    protected _buildUrl(...args: Array<any>) {
        var url: string = this.host + this.baseRoute;

        this._utils.forEach((path) => {
            if (path[0] === '?' || path[0] === '&') {
                url += path;
                return;
            }

            url += '/' + path;
        }, args);

        return url;
    }
}

export = BaseService;
