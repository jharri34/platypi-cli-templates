/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
%import%

class %name%AttributeControl %extends% {
    /**
        * The initialize event method for a control. This is event is called prior to compilation.
        */
    initialize() { }
        
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

plat.register.control('%registername%', %name%AttributeControl);
