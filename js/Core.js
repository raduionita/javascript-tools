
/**
  * Signed sqrt(). Signed version of Math.sqrt()
  *
  * param : [number] (number to be operated on)
  * return: [number] (result of Math.sqrt() operation here with + or -)
  *
  * demo  : Math.ssqrt(-4);
  * return: -2
  * ***************************** */
  Math.ssqrt = function(number) {
    if(number >= 0)
      return Math.sqrt(number);
    else
      return -1 * Math.sqrt(Math.abs(number));
  };

/**
  * Binary search
  *
  * param : find    [mixed]    what to find
  * param : compare [function] compare function
  *
  * return: [int]              array index | position of the found element
  * 
  * demo  : var array = [2,31,54,312,4,523];
  *         result = array.binarySearch(312, function(a, b) {
  *           if(a == b)
  *             return 0; 
  *           else if(a < b)
  *             return 1;
  *           else if(a > b)
  *             return -1;
  *         });
  *        console.log(result);
  * 
  * output: 3
  * ***************************************************** */
  Array.prototype.binarySearch = function(what, compare) {
    var low = 0, high = this.length - 1,
        i, result;
    while(low <= high) {
      i = Math.floor((low + high) / 2);    /* on each run split the search in 2 */
      result = compare(this[i], what);
      if(result < 0)
        low = i + 1;
      else if (result > 0)
        high = i - 1;
      else
        return i;
    }
    return -1;
  }

/**
  * Remove index from an Array.
  *
  * param : index   [int] (true: '===' or false: '==')
  * return: [Array]       (shorter array)
  *
  * demo  : var array = [1, 2, 3, 4, 1, 2, 'radu', 'vlad', '1', 'radu', '4'];
  *         array = array.removeIndex(3);
  *         console.log(array);
  *
  * output: [1, 2, 3, 1, 2, 'radu', 'vlad', '1', 'radu', '4'];
  * ********************************************************** */
  Array.prototype.removeIndex = function(index) {
    for(var i = index - 1, len = this.length - 1; ++i < len; )
      this[i] = this[i+1];
    this.length = len;
    return this;
  }

/**
  * Remove duplicates from an Array. Strict or not.
  *
  * param : strict [bool]  true: '===' or false: '==' | strict: compare types
  * return:        [Array] trimmed array
  *
  * demo  : var array = [1, 2, 3, 4, 1, 2, 'radu', 'vlad', '1', 'radu', '4'];
  *         console.log(array);
  *         array = array.unique(true);  
  *         console.log(array);
  *
  * output: [1,2,3,4,'radu','vlad','1','4']
  * **************************************** */
  Array.prototype.unique = function(strict) {
    var strict = strict || false;

    var newArray = [],
        orgLen = this.length,
        newLen,
        isFound = false,
        i,j;
    for(i = 0; i < orgLen; i++) {
      newLen = newArray.length;

      for(j = 0; j < newLen; j++) {
        if(strict) {
          if(this[i] === newArray[j]) {
            isFound = true;
            break;
          }
        } else if(this[i] == newArray[j]) {
          isFound = true;
          break;
        }
      }
      if(!isFound)
        newArray.push(this[i]);

      isFound = false;
    }
    return newArray;
  };
  
/**
  * Run callback on each array item
  *
  * param : callback [Function] callback function to run
  * param : that     [Object]   (optional) value of this inside callback
  * return:          [void]
  *
  * demo  : var list = [1, 2, 3];
  *         list.map(function(elem, i) { 
  *           console.log(elem); 
  *         });
  * *********************** */
  if(!Array.prototype.map) {
    Array.prototype.map = function(callback, that) {
      that = (typeof that === 'undefined') ? this : that;
      for(var i = -1, len = this.length; ++i < len; )
        callback.apply(that, [this[i], i]);   /* run callback for each element, and index */
    }
  }

/**
  * Return the Integer part of a Number
  *
  * return: [Number] (the integer part of the number)
  *
  * demo  : var res = -10 / 3;
  *         console.log(res.integer());
  * output: -3 
  * ************************************* */
  Number.prototype.integer = function() {
    if(this < 0)
      return Math.ceil(this);
    else
      return Math.floor(this);
  };

/**
  * Write a string backwards
  *
  * return: string [String] (the reversed string)
  *
  * demo  : var string = "hello!";
  *         console.log(string.reverse());
  * output: "!olleh"
  * *************************************** */
  String.prototype.reverse = function() {
    var len = this.length;
    var string = "";

    for(var i = len; i >= 0; i--)
      string += this.charAt(i);

    return string;
  };

/**
  * Explode a String into an Array using a separator(sep),
  *
  * param : sep   [String] (separator use to break the string)
  * return: array [Array] (array containing all string separated words)
  *
  * demo  : var string = "hello my darling";
  *         var array = string.explode(" ");
  * return: array = [hello, my, darling]
  * **************************************** */
  String.prototype.explode = function(sep) {
    var array = new Array();
    var pos = 0;
    var string = this;

    pos = string.indexOf(sep);

    while(pos != -1) {
      array.push(string.substring(0, pos));
      string = string.substring(pos + sep.length);
      pos = string.indexOf(sep)
    }
    /* insert what's left of the string */
    array.push(string);

    return array;
  };

/**
  * Trim whitespace from start and end
  *
  * return: [String] (the string with less whitespaces)
  *
  * demo  : var msg = " hello ";
  *         console.log(msg.trim());
  * output: "hello"
  * demo  : console.log('flag ro'.trim('flag').length)  
  * output: 3
  * *************************************** */
  String.prototype.trim = function(chars) {
    chars = chars ? chars : ' ';
    return this.replace(new RegExp('^(?:'+chars+')+|(?:'+chars+')+$', 'ig'), '');
  };

/**
  * Transform html special chars in the string to their entity forms
  *
  * return: [String] (the html entities version)
  *
  * demo  : var string = 'radu "<&>';
  *         console.log(string.entityify());
  * output: 'radu &quot;&lt;&amp;&gt;'
  * *************************************** */
  String.prototype.entityify = function() {
    var chars = {
      '<' : '&lt;',
      '>' : '&gt;',
      '&' : '&amp;',
      '"' : '&quot;'
    };
    return this.replace(/[<>&"]/g, function(c) { return chars[c]; });
  };

/**
  * Repeat a string 'n' times
  *
  * param : n        [int] (how many times the string should repeat)
  * 
  * return: [string]       (result string)
  * 
  * demo  : "hello..".repeat(3);
  * 
  * output: "hello..hello..hello.."
  * **************************************** */
  String.prototype.repeat = function(n) {
    return n < 0 ? '' : new Array(n + 1).join(this);
  };

/**
   * Capitalize word, uppper case the first letter(ucfirst)
   * 
   * demo  : var name = 'radu';
   *         name.capitalize();
   *         console.log(name);
   * output: 'Radu'
   * ************************************* */
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  
/**
  * Prototype new functionality to Objects
  *
  * param : name [String]   (name of the new function)
  * param : func [function] (anonymous function(), code)
  * return:
  *
  * demo  : String.method("ltrim", function() { return this.replace(/^[\s+]/g, ""); });
  *         ' hello'.ltrim();
  * return: 'hello' // trimmed
  * *********************************************** */
  Function.prototype.method = function(name, func) {
    if(!this.prototype[name])       /* don't override */
      this.prototype[name] = func;
    /* return this; */
  };

/**
  * Create an object that extends another. Instantiates an object.
  *
  * param : [Object] (source object)
  * return: [Object] (new extensible object, with sources attributes)
  *
  * demo  : var cat = Object.construct(mammals);   // cat.prototype = new Mamal()
  *         cat.name = "New_cat_name";
  * ***************************************** */
  if(typeof Object.construct !== 'function') {
    Object.construct = function(object) {
      var F = function() { };
      F.prototype = object;
      return new F();
    };
  }
/**
  * Execute object 'method' after a 'delay' of 'msec' miliseconds
  * 
  * param : msec   [int]    time to wait until it can fire 'method'
  * param : method [string] name of the method to run after 'delay'
  * param : arguments       (optional) pass aditional argument to delay for firing the 'method'
  * 
  * return: that   [object] the calling object - for chaining
  *
  * demo  : cat.delay(1000, 'purr', 2);   // after 1 sec cat.purr(2) is triggered
  *         dog.delay(2000. function(cat) {
  *           this.chase(cat);
  *         }, cat);
  * *********************************************** */
  Object.prototype.delay = function(msec, method /* [, arguments] */) {
    var that = this,
        args = Array.prototype.slice.apply(arguments, [2]); /* trim off the first 2 args(msec, method) */
    if(typeof method === 'string')
      method = that[method];
    setTimeout(function() {
      method.apply(that, args);
    }, msec);
  };

/**
  * Log data
  * 
  * prama : data [mixed]
  * 
  * notice: ! Change this to a logger object with server/socket communication capabilities
  *
  * demo  : logdata(variable)
  * ************************* */
  function logdata(data) {
    var data = typeof data !== 'undefined' ? data : undefined;
    /* var args = Array.prototype.slice.call(arguments); */
    if(typeof console !== 'undefined' && console.log !== 'undefined')
      console.log(data);
      /* console.log(args); */
  }
  
/**
  * Check is object is an array
  *
  * param : vArg [mixed] variable to check if it's an Array
  * return:      [bool]  true is it's an Array
  * 
  * demo  : if(inArray([1, 3]))
  * ********************** */
  function isArray (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  }
  
/**
  * Check if a variable is a number or not
  *
  * param : [mix]  (variable to test)
  * return: [bool] (true if it's a number)
  *
  * demo  : isNumber(2);
  * return: true
  * *********************** */
  function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
  }
  
/**
  * This function was inspired by the print_r function of PHP
  *
  * param : variable [array]  Array to be outputted to string
  * param : level    [int]    (Optional)
  *
  * return:          [string] The textual representation of the array
  *
  * docs  : http://www.openjs.com/scripts/others/dump_function_php_print_r.php
  *
  * demo  : dump([ 1, 3, 6 ]);
  * ************************************************************************ */
  function dump(variable, level) {
    var dumped_text = "";

    level = !level ? 0 : level;
    
    var level_padding = "";                                       // The padding given at the beginning of the line.
    
    for(var j = 0; j < level + 1; j++) 
      level_padding += "    ";
    
    if(typeof(variable) == 'object') {                            // Array/Hashes/Objects 
      for(var item in variable) {
        var value = variable[item];
        
        if(typeof(value) == 'object') {                           // If it is an array,
          dumped_text += level_padding +"'"+ item +"' ...\n";
          dumped_text += dump(value,level+1);
        } else {
          dumped_text += level_padding +"'"+ item +"' => \""+ value +"\"\n";
        }
      }
    } else {                                                      // Stings/Chars/Numbers etc.
      dumped_text = "===>"+ variable +"<===("+ typeof(variable) +")";
    }
    return dumped_text;
  }


/**
  * Get CSS Rule value
  *
  *
  *
  * ************** */
  function getCSSRuleValue(styleID, selector, attr) {
    var sheet, styleElem, i;
    for(i = -1, len = document.styleSheets.length; ++i < len; ) {
      sheet = document.styleSheets[i];
      /* styleElem = sheet.ownerNode || sheet.owningElement; */
      styleElem = (sheet.ownerNode) ? sheet.ownerNode : ((sheet.owningElement) ? sheetowningElement : null);
      if(styleElem && styleElem.id == styleID)
        break;
    }
    
    var rules = (sheet.cssRules) ? sheet.cssRules : ((sheet.rules) ? sheet.rules : null);
    if(!rules) return null;
    
    for(i = -1, len = rules.length; ++i < len; )
      if(rules[i].selectorText = selector || rules[i].selectorText == '*'+ selector)
        return rules[i].style[attr];
  }
