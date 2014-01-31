
  var Processor = function() {
    var _buffer  = [],
        _running = false,
        _debug   = false,
        _logging = null,
        _time    = 0,
        _sequential =  false;
    
    function _log (data) {
      data = typeof data !== 'undefined' ? data : undefined;
      
      if(this._logging === null)  {
        if(typeof console !== 'undefined' && console.log !== 'undefined')
          this._logging = true;
        else
          this._logging = false;
      }
      if(this._logging)
        console.log(data);
    }
    
  /**
    *
    *
    * ************************ */
    this.debug = function(state) {
      this._debug = state ? true : false;
    };
    
  /**
    *
    *
    * ************************ */
    this.log = function(data) {
      this._log(data);
    };
    
  /**
    *
    *
    * ************************ */
    this.alert = function (action) {
      this.log('['+ action +'] This is not a function!');
    };
    
  /**
    * Add...?
    * 
    * param : action [function]
    * param : self   [object]
    * param : args   [array]
    *
    * return:        [Processor]  (for chaining reasins)
    *
    * demo  : Processor.add(?, ?, ?)
    * ************************************* */
    this.add = function(action, self, args) {
      if(!action) return this;
      
      self = self ? self : window;
      args = args ? args : [];
      
      if(Object.prototype.toString.call(self) === "[object Array]") {
        args = self;
        self = window;
      }
      
      this._buffer.push({action: action, self: self, args: args});
      
      // if(!this._running) this.run();
      
      return this;
    };
    
  /**
    *
    *
    * ************************ */
    this.time = function(time) {
      this._time = time ? parseInt(time) : 0;
      return this;
    };
    
  /**
    *
    *
    * ****************************** */
    this.run =  function(sequential) {
      this._sequential = sequential ? true : false;
      this._running = true;
      var obj = this._buffer.shift();

      if(!obj)                                                     // typeof action === 'undefined' || action === null
        return this.stop();
      
      var self = this;
      
      if(this._debug) this.log(obj);
      
      if(typeof obj.action === 'function') {
        if(this._sequential) {
          var self = this;
          setTimeout(function() { obj.action.apply(obj.self, obj.args); self.run(true); }, this._time);
        } else {
          setTimeout(function() { obj.action.apply(obj.self, obj.args); }, this._time);
        }
      } else {
        this.alert(obj.action);
      }
      
      if(!this._sequential)
        this.run();
        
      return true;
    };
    
  /**
    *
    *
    * ******************** */
    this.stop = function() {
      // @TODO: report back to the server every alert
      return this._running = false;
    };
  };
  