/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
import BaseRepository = require('../base/base.repository');

class %name%Repository extends BaseRepository<models.IBaseModel, server.models.IBaseModel> { }

plat.register.injectable('%registeredname%Repository', %name%Repository, []);

export = %name%Repository;
