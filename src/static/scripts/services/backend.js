// MixPanel initilization
(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);
mixpanel.init("beaf7fb737ad1263205d560568d63d10");


/*global angular */
angular.module("picbit").service("$backend", ["$http", "$location", "$rootScope", "$cookies", "$q", function ($http, $location, $rootScope, $cookies, $q) {

  "use strict";
  this.endpoint = "https://" + $location.host();

  /* Envia el token y el identificador del token correspondiente a una red social */
  /* ¿¿ Control de errores ??*/
  this.sendData = function (token, tokenId, userId, redSocial, oauthVerifier) {
    var request, uri, params;

    uri = this.endpoint + "/api/oauth/" + redSocial + "/login";
    /* Añadimos los parametros necesarios */
    params = "token_id=" + tokenId + "&access_token=" + token;

    /* Si se indica el userId, se incluye en la peticion */
    params += userId ? "&user_identifier=" + userId : "";

    /* Si se trata de twitter añadimos el oauth_verifier*/
    params += oauthVerifier && redSocial === "twitter" ? "&oauth_verifier=" + oauthVerifier : "";
    request = {
      method: "post",
      url: uri,
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      data: params
    };

    // Obtenemos la fecha actual
    var today = new Date();
    logginDate = today.toString();
    // creamos un nuevo perfil de usuario a Mixpanel
    mixpanel.identify(userId);
    mixpanel.people.set({
      "userId": userId,
      "logginDate": logginDate,
      "social_network": redSocial
    });

    /* Devolvemos la promesa*/
    $rootScope.promise = $http(request);
    return $rootScope.promise;
  };

  this.getUserId = function (tokenId, redSocial) {
    var request, uri;
    uri = this.endpoint + "/api/oauth/" + redSocial + "/credenciales/" + tokenId;

    request = {
      methor: "get",
      url: uri,
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    };

    $rootScope.promise = $http(request);
    return $rootScope.promise;
  };

  /* Permite elegir un usuario por user_id */
  this.getUser = function (userId) {
    var request, uri;
    uri = this.endpoint + "/api/usuarios/" + userId;

    request = {
      method: "get",
      url: uri,
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    };
    $rootScope.promise = $http(request);
    return $rootScope.promise;
  };

  /* Contacto: envia un email al backend */
  this.sendEmail = function (message, sender, subject) {
    var request, uri, params;

    uri = this.endpoint + "/api/contact";
    params = "action=contact&message=" + message + "&sender=" + sender;

    if (subject) {
      params += "&subject=" + subject;
    }
    request = {
      method: "post",
      url: uri,
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      data: params
    };

    $rootScope.promise = $http(request);
    return $rootScope.promise;
  };

  this.sendSub = function (name, sender, surname) {
    var request, uri, params;
    uri = this.endpoint + "/api/subscriptions";
    params = "name=" + name + "&email=" + sender + "&surname=" + surname;
    request = {
      method: "post",
      url: uri,
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      data: params
    };

    $rootScope.promise = $http(request);
    return $rootScope.promise;
  };

  this.logout = function () {
    var request, uri, socialnetwork;
    socialnetwork = $cookies.get("social_network") || "googleplus";
    uri = this.endpoint + "/api/oauth/" + socialnetwork + "/logout";
    request = {
      method: "post",
      url: uri,
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    };
    $rootScope.user = undefined;
    $rootScope.isLogged = false;
    $rootScope.promise = $http(request);
    return $rootScope.promise;
  };
}]);
