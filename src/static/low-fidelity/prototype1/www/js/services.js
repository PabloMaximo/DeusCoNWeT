angular.module('prototype1.services', [])
  // SINGLETON TO COMMUNICATE WITH BACKEND SIDE AND REQUEST THE AVAILABLE COMPONENTS FOR THE USER.
  .factory('Components', function(){
    var components = [
      {
        name:'component1',
        type: 'social-component',
        available: true,
        content:[
          {
            src: 'http://buzzerg.com/wp-content/uploads/8589130449652-free-landscape-wallpaper-hd.jpg',
            content: 'Society excited by cottage private an it esteems. Fully begin on by wound an. ' +
            'Girl rich in do up or both. At declared in as rejoiced of together. He impression collecting delightful ' +
            'unpleasant by prosperous as on. End too talent she object mrs wanted remove giving.'
          },
          {
            src: 'http://buzzerg.com/wp-content/uploads/8589130449652-free-landscape-wallpaper-hd.jpg',
            content: 'Society excited by cottage private an it esteems. Fully begin on by wound an. ' +
            'Girl rich in do up or both. At declared in as rejoiced of together. He impression collecting delightful ' +
            'unpleasant by prosperous as on. End too talent she object mrs wanted remove giving.'
          },
          {
            src: 'http://buzzerg.com/wp-content/uploads/8589130449652-free-landscape-wallpaper-hd.jpg',
            content: 'Society excited by cottage private an it esteems. Fully begin on by wound an. ' +
            'Girl rich in do up or both. At declared in as rejoiced of together. He impression collecting delightful ' +
            'unpleasant by prosperous as on. End too talent she object mrs wanted remove giving.'
          }
        ],
        /*operations: {
          all: function(){
            return content;
          },
        }*/
      },
      {
        name: 'component2-twitter-social',
        type: 'social-component',
        available: true,
        content: [],
        operations: { }
      },
      {
        name: 'component3',
        type: 'social-component',
        available: true,
        content: [],
        operations: { }
      },
      {
        name: 'component4',
        type: 'social-component',
        available: true,
        content: [],
        operations: { }
      }
    ];
    return {
      _components: components,
      all: function() {
        return this._components;
      },
      get: function(name){
        for(var elem in this._components){
          if(this._components[elem].name == name){
            return this._components[elem];
          }
        }
      },
      inUse: function(name){
        for(var elem in this._components){
          if(this._components[elem].name == name){
            this._components[elem].available = false;
          }
        }
      },
      setCountAvailable: function(){
        this._components.countAvailable --;
      },
      countAvailables: function(){
        var count = 0;
        for(var elem in this._components){
          if(this._components[elem].available == true){
            count++;
          }
        }
        return count;
      }
    }
  })
