/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
%import%
class %name%Repository %extends% { }

plat.register.injectable('%registername%', %name%Repository, []);

export = %name%Repository;
