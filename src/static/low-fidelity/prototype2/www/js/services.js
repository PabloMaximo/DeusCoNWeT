angular.module('prototype1.services', [])
  // SINGLETON TO COMMUNICATE WITH BACKEND SIDE AND REQUEST THE AVAILABLE COMPONENTS FOR THE USER.
  .factory('Components', function(){
    var components = [
      {
        name: "twitter-timeline",
        "checked": false,
        attributes: {
          accessToken: "3072043347-T00ESRJtzlqHnGRNJZxrBP3IDV0S8c1uGIn1vWf",
          secretToken: "OBPFI8deR6420txM1kCJP9eW59Xnbpe5NCbPgOlSJRock",
          consumerKey: "J4bjMZmJ6hh7r0wlG9H90cgEe",
          consumerSecret: "8HIPpQgL6d3WWQMDN5DPTHefjb5qfvTFg78j1RdZbR19uEPZMf",
          endpoint: "https://192.168.1.87:8100/api/aux/twitterTimeline",
          language: "{{idioma}}",
          count: "200",
          currentComponentValoration: {      
            usability: 0,
            completeness: 0,
            efficiency: 0,
            effectivity: 0,
            simplicity: 0,
          }
        }
      },
      {
        name: "github-events",
        "checked": false,
        attributes: {
          username: "mortega5",
          token: "",
          mostrar: "10",
          language: "{{idioma}}",
          currentComponentValoration: {      
            usability: 0,
            completeness: 0,
            efficiency: 0,
            effectivity: 0,
            simplicity: 0,
          }
        }
      },
      {
        name: "instagram-timeline",
        "checked": false,
        attributes: {
          accessToken: "2062815740.34af286.169a9c42e1404ae58591d066c00cb979",
          endpoint: "https://192.168.1.87:8100/api/aux/instagramTimeline",
          language: "{{idioma}}",
          currentComponentValoration: {      
            usability: 0,
            completeness: 0,
            efficiency: 0,
            effectivity: 0,
            simplicity: 0,
          }
        }
      }
       /* name:'component1',
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
        ],*/
        /*operations: {
          all: function(){
            return content;
          },
        }
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
         }*/
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
            this._components[elem].checked = true;
          }
        }
      },
      outUse: function(name){
        console.log("trying stop use: "+ name)
        for(var elem in this._components){
          if(this._components[elem].name == name){
            this._components[elem].checked = false;
            console.log(JSON.stringify(this._components))
          }
        }
      },
      setCountAvailable: function(){
        this._components.countAvailable --;
      },
      countAvailables: function(){
        var count = 0;
        for(var elem in this._components){
          if(this._components[elem].checked == false){
            count++;
          }
        }
        this._components.countAvailables = count;
        return count;
      }
    }
  })
