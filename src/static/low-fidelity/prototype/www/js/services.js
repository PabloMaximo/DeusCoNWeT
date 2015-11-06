angular.module('starter.services', [])

.factory('Components', function(){
    var components = [
      {
        id: 1,
        name: 'facebook component',
        posts: [
          {
            img: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
            text: 'Minions ipsum chasy poopayee bee do bee do bee do. Underweaaar po kass hahaha belloo! ' +
                  'Aaaaaah chasy bananaaaa ti aamoo!',
          },
          {
            img: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
            text: 'Minions ipsum chasy poopayee bee do bee do bee do. Underweaaar po kass hahaha belloo! ' +
            'Aaaaaah chasy bananaaaa ti aamoo!',
          },
          {
            img: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
            text: 'Minions ipsum chasy poopayee bee do bee do bee do. Underweaaar po kass hahaha belloo! ' +
            'Aaaaaah chasy bananaaaa ti aamoo!',
          }
        ]
      },
      {
        id: 2,
        name: 'twitter component',
        posts: [
          {
            img: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
            text: 'Minions ipsum chasy poopayee bee do bee do bee do. Underweaaar po kass hahaha belloo! ' +
            'Aaaaaah chasy bananaaaa ti aamoo!',
          },
          {
            img: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
            text: 'Minions ipsum chasy poopayee bee do bee do bee do. Underweaaar po kass hahaha belloo! ' +
            'Aaaaaah chasy bananaaaa ti aamoo!',
          },
          {
            img: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
            text: 'Minions ipsum chasy poopayee bee do bee do bee do. Underweaaar po kass hahaha belloo! ' +
            'Aaaaaah chasy bananaaaa ti aamoo!',
          }
        ]
      }
    ];
    return {
      cont: 0,
      all: function(){
        return components;
      },
      get: function(id){
        for (var i = 0; i < components.length; i++) {
          if (components[i].id === parseInt(id)) {
            return components[i];
          }
        }
        return null;
      }
    }
  })

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
