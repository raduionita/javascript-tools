
  var EventManager =  {
    NAME   : "Event handling object",
    VERSION: "0.3a2",

  /**
    * Add an event handler
    *
    * param : node  [object]   (element that has the event attached)
    * param : event [object]   (an event bind to the node)
    * param : func  [function] (function to be executed when event occurs)
    * param : cap   [bool]     (do capture phase, N/A for IE)
    * return: [void]
    *
    * demo  : Tools.Events.addEventHandler(window, "load", function(evt) { }, false);
    * demo  : Tools.Events.addEventHandler(button, "click", doSomething, false);
    * ******************************************************************************* */
    addEventHandler: function(node, event, func, cap) {
      if(!cap) cap = false;
      
      if(typeof(window.event) != "undefined")
        node.attachEvent("on" + event, func);     /* IE */
      else
        node.addEventListener(event, func, cap);  /* DOM 2 */
    },

  /**
    * Remove the event handler(added by addEventHandler)
    *
    * param : node  [object]   (element that has the event attached)
    * param : event [object]   (an event bind to the node)
    * param : func  [function] (the same function(func) from addEventHandler !)
    * param : cap   [bool]     (do capture phase, N/A for IE)
    * return: [void]
    *
    * demo  : Tools.Events.removeEventHandler(button, "click", doSomething, false);
    * ***************************************************************************** */
    removeEventHandler: function(node, event, func, cap) {
      if(!cap) cap = false;
      
      if(typeof(window.event) != "undefined") 
        node.detachEvent("on" + event, func);         /* IE */
      else 
        node.removeEventListener(event, func, cap);   /* DOM 2 */ 
    },
    
  /**
    * Get the target(element you clicked on)
    *
    * param : evt [object] (the event function evt argument)
    * return: [object]     (HTML element object)
    *
    * demo  : target = Tools.Events.getEventTarget(evt);
    * ************************************************** */
    getEventTarget: function(evt) {
      var target = evt.target || window.event.srcElement;
      if(target.nodeType === 3) target = target.parentNode;
      return target;
    },
    
  /**
    * Get the event object
    *
    * param : evt [object]  (event that comes with the event handler)
    * return: [object|null] (event (if found) or NULL)
    *
    * demo  : evt = getEvent(evt);
    * **************************** */
    getEvent: function(evt) {
      return evt = (evt) ? evt : ((event) ? event : null);
    },
    
  /**
    * Get the keyCode 
    * 
    * param : evt [object]  (the event that commes with the handler)
    * return: [int]         (number matching the pressed key)
    *
    * demo  : key = getKeyCode(evt);
    * ****************************** */
    getKeyCode: function(evt) {
      return evt.keyCode ? evt.keyCode : evt.which;
    },
    
  /**
    * Get mouse event coordonates (mouse position where the event occured)
    *
    * param : evt [object] (event that comes with the event handler)
    * return: [object]     (position on the mouse as a literal object)
    *
    * demo  : var coords = getMousePosition(evt);
    *         alert(coords.left +', '+ coords.right);
    * *********************************************** */
    getMousePosition: function(evt) {
      var coords = {left: 0, top: 0};
      if(evt.pageX) {
        coords.left = evt.pageX;
        coords.top  = evt.pageY;
      } else if(evt.clientX) {
        coords.left = evt.clientX + document.body.screenLeft - document.body.clientLeft;
        coords.top  = evt.clientY + document.body.screenTop  - document.body.clientTop;
        /* include html element space, if applicable */
        if(document.body.parentElement && document.body.parentElement.clientLeft) {
          var html = document.body.parentElement;
          coords.left += html.scrollLeft - html.clientLeft;
          coords.top  += html.scrollTop  - html.clientTop;
        }
      }
      return coords;
    },

  /**
    * Stop event bubbling
    *
    * param : evt [object] (the event function evt argument)
    * return: [void]
    *
    * demo  : Tools.Events.stopBubbling(evt);
    * *************************************** */
    stopBubbling: function(evt) {
      if(window.event) 
        window.event.cancelBubble = true;
      else 
        evt.stopPropagation();
    },

  /**
    * Cancel default event.(Eg: <a> won't follow an URL)
    *
    * param : evt [object] (the event function evt argument)
    * return: [object] (HTML element object)
    *
    * demo  : Tools.Events.cancelDefault(evt);
    * **************************************** */
    cancelDefault: function(evt) {
      if(window.event)
        window.event.returnValue = false;
      else 
        evt.preventDefault();
    }
    
  };