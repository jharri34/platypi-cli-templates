/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
%import%

class %name%TemplateControl %extends% {
    /**
     * A method called for TemplateControls to set their template. During this method a control should
     * ready its template for compilation. Whatever is in the control's element after this method's execution 
     * will be compiled and appear on the DOM.
     */
    setTemplate() { }

    /**
     * The loaded event method for a control. This event is fired after a control has been completely loaded,
     * meaning all of its children have also been loaded and all DOM has been created and populated. It is now 
     * safe for all controls to access, observe, and modify the context property.
     */
    loaded() { }

    /**
     * The dispose event is called when a control is being removed from memory. A control should release 
     * all of the memory it is using, including DOM event and property listeners.
     */
    dispose() { }
}

plat.register.control('%registername%', %name%TemplateControl);
