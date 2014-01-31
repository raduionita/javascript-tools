  
  var AdaptiveLayouts =  {
    NAME   : "Adaptive Layouts",
    VERSION: "0.1a1",
    
    sizes: [],

    initSizes: function() {
      this.sizes.push({ minWidth: 800, maxWidth: -1,  class_name: "large" });
      this.sizes.push({ minWidth: 400, maxWidth: 800, class_name: "normal" });
      this.sizes.push({ minWidth: -1,  maxWidth: 400, class_name: "small" });
    },

    setStyleSize: function() {
      var width = document.documentElement.clientWidth;

      var len = this.sizes.length;
      for(var i = 0; i < len; i++) {
        console.log("this: " + width + ", use: " + this.sizes[i].classe);

        if((this.sizes[i] == -1) && (width <= this.sizes[i].maxWidth)) {
          document.body.className = this.sizes[i].class_name;
          return;
        }
        if((this.sizes[i].maxWidth == -1) && (width > this.sizes[i].minWidth)) {
          document.body.className = this.sizes[i].class_name;
          return;
        }
        if((width > this.sizes[i].minWidth) && (width <= this.sizes[i].maxWidth)) {
          document.body.className = this.sizes[i].class_name;
          return;
        }
      }
    }
  };