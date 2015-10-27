var Swing = require('swing');

angular
    .module('gajus.swing', [])
    .directive('swingStack', function () {
        return {
            restrict: 'A',
            scope: {
                swingThrowOutConfidence: '&',
                swingIsThrowOut: '&'
            },
            controller: function ($scope) {
                var stack;

                var config = {
                    throwOutConfidence: function (offset, element) {
                        return $scope.swingThrowOutConfidence({"offset": offset, "elementWidth": element.offsetWidth});
                    },
                    isThrowOut: function (offset, element, throwOutConfidence) {
                        return $scope.swingIsThrowOut({"offset": offset, "elementWidth": element.offsetWidth, "throwOutConfidence": throwOutConfidence});
                    }
                };

                stack = Swing.Stack(config);

                this.add = function (cardElement) {
                    return stack.createCard(cardElement);
                };
            }
        };
    })
    .directive('swingCard', function ($interval) {
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