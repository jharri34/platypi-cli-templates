/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
%import%
class %name%Repository %extends% { }

plat.register.injectable('%registeredname%Repository', %name%Repository, []);

export = %name%Repository;
