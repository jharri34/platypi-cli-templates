/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');

class HomeViewControl extends BaseViewControl {
    templateString = require('./home.viewcontrol.html');

    context = {};
}

plat.register.viewControl('home-vc', HomeViewControl);

export = HomeViewControl;
