/// <reference path="../../_references.d..ts" />

import plat = require('platypus');
import BaseService = require('../base/base.service');

class %name%Service extends BaseService<server.models.IBaseModel> {
    constructor() {
        super(null, '/');
    }
}


plat.register.injectable('%registername%Service', %name%Service);

export = %name%Service;
