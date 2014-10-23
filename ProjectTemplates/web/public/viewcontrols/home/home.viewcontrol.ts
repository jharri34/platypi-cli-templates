/// <reference path="../../_references.ts" />

import plat = require('../../lib/platypus/platypus');
import BaseViewControl = require('../base/base.viewcontrol');

class HomeViewControl extends BaseViewControl {
    templateUrl = this.getTemplateUrl(__filename);

    context = {};
}

plat.register.viewControl('home-viewcontrol', HomeViewControl, null, [
    '/'
]);

export = HomeViewControl;
