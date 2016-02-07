var Swing = require('swing');

(function(angular, Swing, undefined) {

    "use strict";

    angular.module('gajus.swing', []);

    angular.module('gajus.swing').directive('swingStack', /* @ngInject */ function ($parse) {
        return {
            restrict: 'A',
            controller: /* @ngInject */ function ($scope, $element, $attrs) {
                var stack,
                    defaultOptions = {};

                var options = $parse($attrs.swingOptions)($scope);

                angular.extend(defaultOptions, options);

                stack = Swing.Stack(defaultOptions);

                this.add = function (cardElement) {
                    return stack.createCard(cardElement);
                };
            }
        };
    });

    angular.module('gajus.swing').directive('swingCard', function () {
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
            link: function (scope, element, attrs, swingStack) {

                var card = swingStack.add(element[0]),
                    events = ['throwout', 'throwoutleft', 'throwoutright', 'throwin', 'dragstart', 'dragmove', 'dragend'];

                // Map all Swing events to the scope expression.
                // Map eventObject variable name to the expression wrapper fn.
                // @see https://docs.angularjs.org/api/ng/service/$compile#comprehensive-directive-api
                angular.forEach(events, function (eventName) {
                    card.on(eventName, function (eventObject) {
                        scope['swingOn' + eventName.charAt(0).toUpperCase() + eventName.slice(1)]({
                            eventName: eventName,
                            eventObject: eventObject
                        });
                    });
                });
            }
        };
    });

})(angular, Swing);
