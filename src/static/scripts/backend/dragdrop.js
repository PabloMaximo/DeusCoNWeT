/*global angular, document*/
var picbit = angular.module("picbit");
/**
  * Directiva que se añade al elemento que vamos a querer desplazar dentro del
  * dashboard.
  */
picbit.directive("ngDrag", function () {
  "use strict";
  function link(scope, element, attrs) {
    /*Indicamos que es arrastrable */
    element.attr("draggable", "true");
    scope.move = {};
    element.css({position: "absolute"});
    /* Obligamos a hacer el binding de las variables parametrizadas */
    for (var attr in attrs.$attr) {
      if (attrs.hasOwnProperty(attr)) {
        attrs.$observe(attr, function(value) {
          element.attr(attr, value);
        });
      }
    }

    // Hace el efecto de arrastrarse cuando se mueve el elemento
    scope.dragging = function (event) {
      // Calculamos la cantidad de movimiento que ha sufrido el objeto
      var x, y, newPosition;
      if (event.clientX !== 0 && event.clientY !== 0) {
        scope.move.x = scope.move.x || event.clientX - event.target.offsetLeft;
        scope.move.y = scope.move.y || event.clientY - event.target.offsetTop;

        x = (event.clientX - event.target.offsetLeft - scope.move.x);
        y = (event.clientY - event.target.offsetTop - scope.move.y);

        newPosition = scope.calculatePosition(event.target, x, y);
        // actualizamos la posicion
        event.target.style.top = newPosition.top + "px";
        event.target.style.left = newPosition.left + "px";
      }
    };// end function

    scope.calculatePosition = function(target, x, y) {
      var newPosition = {},
          padding = {},
          into = {};
      newPosition.left = target.offsetLeft + x;
      newPosition.right = target.offsetLeft + x + target.offsetWidth;
      newPosition.top = target.offsetTop + y;
      newPosition.bottom = target.offsetTop + y + target.offsetHeight;

      /* Buscamos el elemento contenedor del objeto */
      var container = document.querySelector("#container");


      /* Comparamos los limites de ambos elementos para saber si esta dentro */

      padding.top = parseInt(angular.element(container).css("padding-top").split("px")[0]) || 0;
      padding.right = parseInt(angular.element(container).css("padding-right").split("px")[0]) || 0;
      padding.bottom = parseInt(angular.element(container).css("padding-bottom").split("px")[0]) || 0;
      padding.left = parseInt(angular.element(container).css("padding-left").split("px")[0]) || 0;



      into.left = container.offsetLeft + padding.left < newPosition.left;
      into.right = container.offsetWidth + container.offsetLeft - padding.right > newPosition.right;
      into.top = container.offsetTop + padding.top < newPosition.top;
      into.bottom = container.offsetHeight + container.offsetTop - padding.bottom > newPosition.bottom;

      // top
      newPosition.top = into.top ? newPosition.top : container.offsetTop + padding.top;
      // bottom
      newPosition.top  = into.bottom ? newPosition.top : container.offsetTop + container.offsetHeight - target.offsetHeight - padding.bottom;
      // left
      newPosition.left = into.left ? newPosition.left : container.offsetLeft + padding.left;
      // right
      newPosition.left = into.right ? newPosition.left : container.offsetLeft + container.offsetWidth - target.offsetWidth - padding.right;

      return newPosition;
    };

    scope.deleteShadow = function (event) {
      var img = document.createElement("img");
      // creamos una imagen transparente de 1x1
      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      event.dataTransfer.setDragImage(img, 20, 20);
    };//end function


    scope.deleteMove = function () {
      scope.move = {};
    };

    // Asociamos los eventos necesarios para producir los efectos
    element.on("drag", scope.dragging);
    element.on("dragstart", scope.deleteShadow);
    element.on("dragend", scope.deleteMove);
  }
  /* creamos un scope propio */
  return {link: link, scope: true};
});

picbit.directive("ngContainer", function () {
  "use strict";
  function link(scope, element) {


    scope.dropObject = function (evento) {
      /* Evitamos la accion por defecto y la propagacion a los hijos*/
      evento.preventDefault();
      evento.stopPropagation();
      /* Reseteamos el estilo del contenedor (quitamos la sombra) */
      evento.target.style.transition = "";
      evento.target.style.boxShadow = "";

      var id, attributes, newTimeline, injector, $compile, key;
      /* Cogemos el objeto que tuvo lugar en el intercambio de datos */
      id = evento.dataTransfer.getData("element");

      /* Si no esta repetido, lo añadimos al dashboard */
      if (id && document.getElementsByTagName(id).length === 0) {
        /* Creamos el nuevo objeto en funcion del identificador intercambiado */
        newTimeline = angular.element("<" + id + "/>");
        /* Añadimos los atributos necesarios para su funcionamiento */
        /* TODO: parametrizar los attributos para que se le pasen como una lista
         * y que se añadan de manera automatica
         */
        newTimeline.attr("ng-drag", "");

        /* Añadimos todos los attributos necesarios */
        attributes = evento.dataTransfer.getData("attributes");
        if (attributes) {
          attributes = JSON.parse(attributes);

          for (key in attributes) {
            if (attributes.hasOwnProperty(key)) {
              newTimeline.attr(key, attributes[key]);
            }
          }
        }
        /* Caracteristicas del estilo para arrastrarlo */

        /* Enlazamos el elemento al contenedor*/
        element.append(newTimeline);
        mixpanel.track("Add Component", {
          "name": id,
          "version": 1.0
        })
        /* Forzamos la fase de compile de angular para que cargue las directivas del
         * nuevo elemento
         */

        injector = element.injector();
        $compile = injector.get("$compile");
        $compile(newTimeline)(newTimeline.scope());

        var position = newTimeline.scope()
        .calculatePosition(newTimeline[0], evento.clientX - newTimeline[0].offsetLeft,
                           evento.clientY - newTimeline[0].offsetTop);
        newTimeline.css({
          "position": "absolute",
          "top": position.top + "px",
          "left": position.left + "px"
        });
      }
    };
    /* Funcion que evita la accion por defecto cuando entra un elemento */
    scope.dragEntry = function (evento) {evento.preventDefault(); };

    /* quitamos las sombras una vez que el elemento no está en el contenedor */
    /* quitamos las sombras una vez que el elemento no está en el contenedor */
    scope.removeShadow = function (event) {
      event.preventDefault();
      event.target.style.transition = "";
      event.target.style.boxShadow = "";
    };
    /* Mostramos sombra en el contenedor con un pequeño delay (0.2s)*/
    /* Mostramos sombra en el contenedor con un pequeño delay (0.2s)*/
    scope.showShadow = function (event) {
      if (event.target.id === "container") {
        event.target.style.transition = "boxShadow 0.2s";
        event.target.style.boxShadow = "0px 0px 10px black";
      }
    };
    /* Enlazamos las funciones con los eventos correspondientes */
    element.on("drop", scope.dropObject);
    element.on("dragover", scope.dragEntry);
    //element.on("dragleave", scope.removeShadow);
    // element.on("dragenter", scope.showShadow);
  }
  /* enviamos el link y cogemos la lista de los atributos y la añadimos al scope*/
  return {link: link};
});

picbit.directive("ngCreateElement", function () {
  "use strict";
  function link(scope, element) {

    scope.comienzo = function (evento) {
      evento.dataTransfer.setData("element", scope.idElement);

      /* Pasamos los atributos del timeline */
      if (scope.attributes) {
        evento.dataTransfer.setData("attributes", scope.attributes);
      }

      var image, container;
      image = document.createElement("img");

      image.src = scope.imagesrc || "";
      evento.dataTransfer.setDragImage(image, 0, 0);
      container = document.querySelector("#container");
      container.style.boxShadow = "5px 5px 5px solid black";
    };

    element.attr("draggable", "true");
    element.on("dragstart", scope.comienzo);
  }
  return {scope: {imagesrc: "@imagesrc", attributes: "@listAttributes", idElement: "@idElement"}, link: link};
});
