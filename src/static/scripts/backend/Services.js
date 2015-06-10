angular.module('picbit').service('$backend', function ($http, $location) {

  'use strict';
  this.endpoint = 'https://' + $location.host();

  /* Envia el token y el identificador del token correspondiente a una red social */
  /* ¿¿ Control de errores ??*/
  this.sendData = function (token, tokenId, user_id, redSocial, oauth_verifier) {
    var request, uri, params;

    uri = this.endpoint + '/api/oauth/' + redSocial;
    /* Añadimos los parametros necesarios */
    params = "token_id=" + tokenId + "&access_token=" + token;

    /* Si se indica el user_id, se incluye en la peticion */
    params += user_id ? "&user_id=" + user_id : '';

    /* Si se trata de twitter añadimos el oauth_verifier*/
    params += oauth_verifier && redSocial === 'twitter' ? "&oauth_verifier=" + oauth_verifier : '';
    request = {
      method: 'post',
      url: uri,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: params
    };
    /* Devolvemos la promesa*/
    return $http(request);
  };

  this.getUserId = function (tokenId, redSocial, oauth_verifier) {
    var request, uri;

    uri = this.endpoint + '/api/oauth/' + redSocial + '/' + tokenId;
    request = {
      methor: 'get',
      url: uri,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    };

    return $http(request);
  };

  /* Permite elegir un usuario por user_id */
  this.getUser = function(user_id) {
    var request, uri;
    uri = this.endpoint + '/api/usuarios/' + user_id;

    request = {
      method: 'get',
      url: uri,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }
    return $http(request);
  }
  /* Contacto: envia un email al backend */
  this.sendEmail = function (message, sender, subject) {
    var request, uri, params;

    uri = this.endpoint + '/api/contact';
    params = "action=contact&message=" + message + "&sender=" + sender;

    if (subject) {
      params += '&subject=' + subject;
    }
    request = {
      method: 'post',
      url: uri,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: params
    };

    return $http(request)
  };

  this.sendSub = function (name, sender, surname) {
    var request, uri, params;
    uri = this.endpoint + '/api/subscriptions';
    params = "name=" + name + "&email=" + sender + "&surname=" + surname;
    request = {
      method: 'post',
      url: uri,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: params
    };

    return $http(request);
  };

  this.logout = function () {
    var request, uri, params;

    uri = this.endpoint + '/api/oauth/googleplus';
    params = "action=logout";

    request = {
      method: 'post',
      url: uri,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: params
    };

    return $http(request);
  };


}).service('$anchorSmoothScroll', function () {
  'use strict';

  this.scrollTo = function (eID) {
    var startY = nonocurrentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    speed = 25;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i=startY; i<stopY; i+=step) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
    function currentYPosition() {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) return document.body.scrollTop;
      return 0;
    }

    function elmYPosition(eID) {
      var elm = document.getElementById(eID);
      var y = elm.offsetTop;
      var node = elm;
      while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      } return y;
    }

  };

}).service('$cookie', function () {
  this.get = function (name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift()
      };

  this.put  = function (key, value, expires, path, domain, secure) {
    var cookie;
    cookie = key + '=' + value;
    if (expires) {
      cookie += '; expires=' + expires;
    }
    if (path) {
      cookie += '; path=' + path; 
    }
    if (domain) {
      cookie += '; domain=' + domain;
    }
    if (secure) {
      cookie +='; secure';
    }
    document.cookie = cookie;
  };

  this.delete = function (name) {
    document.cookie = name + '=; expires= Thu, 01 jan 1970 00:00:00 UTC';
  }
  this.set = function (key, value, expires, path, domain, secure) {
    this.put(key, value, expires, path, domain, secure); 
  };
  this.getAll = function () {
    return document.cookie;
  }
});