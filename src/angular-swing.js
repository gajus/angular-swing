var Swing = require('swing');

(function(angular, Swing, undefined) {

    "use strict";

    angular.module('gajus.swing', []);

    angular.module('gajus.swing').factory('swingStacks', function() {
        return {
            stacks: [],
            getTopCardFromStack: function(stackIndex) {
                if (this.stacks[stackIndex]) {
                    return this.stacks[stackIndex].cards[this.countCardsInStack(stackIndex) - 1];
                }
                return null;
            },
            getCardFromStack: function(stackIndex, cardIndex) {
                if (this.stacks[stackIndex] && this.stacks[stackIndex].cards[cardIndex]) {
                    return this.stacks[stackIndex].cards[cardIndex];
                }
                return null;
            },
            countCardsInStack: function(stackIndex) {
                if (this.stacks[stackIndex]) {
                    return this.stacks[stackIndex].cards.length;
                }
                return -1;
            },
            Card: Swing.Card,
            Stack: Swing.Stack
        };
    });

    angular.module('gajus.swing').directive('swingStack', /* @ngInject */ function ($parse, swingStacks) {
        var stackIndex = 0;
        return {
            restrict: 'A',
            controller: /* @ngInject */ function ($scope, $element, $attrs) {
                var stack,
                    defaultOptions = {};

                var options = $parse($attrs.swingOptions)($scope);

                angular.extend(defaultOptions, options);

                stack = Swing.Stack(defaultOptions);

                this.add = function (cardElement) {
                    var thecard = stack.createCard(cardElement);
                    swingStacks.stacks[this.index].cards.push(thecard);
                    return thecard;
                };

                this.index = stackIndex++;
                swingStacks.stacks.push({cards: []});
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
                        var swingEventName = 'swingOn' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
                        scope[swingEventName]({
                            eventName: eventName,
                            eventObject: eventObject
                        });
                        switch(swingEventName) {
                            case 'swingOnThrowoutleft':
                            case 'swingOnThrowoutright':
                            case 'swingOnThrowout':
                                if(scope.$$phase) {
                                    scope.$apply();
                                }
                                break;
                            default:
                                break;
                        }
                    });
                });
            }
        };
    });

})(angular, Swing);
