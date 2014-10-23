/// <reference path="../../_references.ts" />

import plat = require('../../lib/platypus/platypus');

class BaseViewControl extends plat.ui.WebViewControl {
    getTemplateUrl(filename: string): string {
        return filename.replace(/(?:\\|\/)public(?:\\|\/)/, '').replace('.js', '.html');
    }
}

export = BaseViewControl;
