"use strict";
var angular = require('angular');
var Swing = require('swing');
var moduleName = 'gajus.swing';

function SwingStackController($scope, $element, $attrs, $parse) {
  var stack;
  var defaultOptions = {};
  var options = $parse($attrs.swingOptions)($scope);
  angular.extend(defaultOptions, options);
  stack = Swing.Stack(defaultOptions);

  this.add = function(cardElement) {
    return stack.createCard(cardElement);
  }
}

SwingStackController.$inject = ['$scope', '$element', '$attrs', '$parse'];

function swingStack() {
  return {
    restrict: 'A',
    controller: SwingStackController,
  }
}

function ngName(eventName) {
  return 'swingOn' +
     eventName.charAt(0).toUpperCase() +
     eventName.slice(1);
}

function swingCardLink(scope, element, attrs, swingStack) {
  var card = swingStack.add(element[0]);
  var events = [
    'throwout',
    'throwoutleft',
    'throwoutright',
    'throwin',
    'dragstart',
    'dragmove',
    'dragend'
  ];

  function addListener(eventName) {
    card.on(eventName, function(eventObject) {
      scope.$apply(function() {
        scope[ngName(eventName)]({
          eventName: eventName,
          eventObject: eventObject,
        });
      });
    });
  }

  // Map all Swing events to the scope expression.
  // Map eventObject variable name to the expression wrapper fn.
  // @see https://docs.angularjs.org/api/ng/service/$compile#comprehensive-directive-api
  angular.forEach(events, addListener);
}

swingCardLink.$inject = ['scope', 'element', 'attrs', 'swingStack'];

function swingCard() {
  return {
    restrict: 'A',
    require: '^swingStack',
    scope: {
      swingOnThrowout: '&',
      swingOnThrowoutleft: '&',
      swingOnThrowoutright: '&',
      swingOnThrowin: '&',
      swingOnDragstart: '&',
      swingOnDragmove: '&',
      swingOnDragend: '&'
    },
    link: swingCardLink,
  };
}

angular
  .module('gajus.swing', [])
  .directive('swingStack', swingStack)
  .directive('swingCard', swingCard);
