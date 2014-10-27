/// <reference path="../../_references.d.ts" />

import BaseFactory = require('../base/base.model');
import plat = require('platypus');

class %name%Factory extends BaseFactory <models.I%name%, server.models.IBaseModel> { }

plat.register.injectable('%registername%Factory', %name%Factory, null, plat.register.injectable.FACTORY);

export = %name%Factory;
