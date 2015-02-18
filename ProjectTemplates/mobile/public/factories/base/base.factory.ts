/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

class BaseFactory<PM extends models.IBaseFactory, SM extends server.models.IBaseFactory> {
    protected static _inject: any = {
        _utils: plat.Utils
    };

    protected _utils: plat.Utils;

    all(data: Array<SM>): Array<PM> {
        if (!this._utils.isArray(data)) {
            data = [];
        }

        return this._utils.map((value) => {
            return this.create(value);
        }, data);
    }

    create(data: SM): PM;
    create(data: PM, forServer: boolean): SM;
    create(data: any, forServer?: boolean): any {
        if (!this._utils.isObject(data)) {
            return data;
        }

        if (this._utils.isBoolean(forServer) && forServer) {
            return this._createForServer(data);
        }

        return this._createForClient(data);
    }

    update(data: PM): SM {
        return this.create(data, true);
    }

    /**
     * This is a virtual method. Every class that inherits this class should provide 
     * its own implementation of this method.
     */
    protected _createForServer(data: PM): SM {
        return <any>{};
    }

    /**
     * This is a virtual method. Every class that inherits this class should provide 
     * its own implementation of this method.
     */
    protected _createForClient(data: SM): PM {
        return <any>{};
    }
}

export = BaseFactory;
