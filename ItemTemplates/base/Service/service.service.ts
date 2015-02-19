/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
%import%
class %name%Service %extends% {}

plat.register.injectable('%registername%', %name%Service);

export = %name%Service;
