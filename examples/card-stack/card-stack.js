angular
    .module('card-stack-demo', ['gajus.swing'])
    .controller('card-stack-playground', function ($scope, swingStacks) {
        $scope.cards = [
            {name: 'clubs', symbol: '♣'},
            {name: 'diamonds', symbol: '♦'},
            {name: 'hearts', symbol: '♥'},
            {name: 'spades', symbol: '♠'}
        ];

        $scope.throwout = function (eventName, eventObject) {
            console.log('throwout', eventObject);
        };

        $scope.throwoutleft = function (eventName, eventObject) {
            console.log('throwoutleft', eventObject);
        };

        $scope.throwoutright = function (eventName, eventObject) {
            console.log('throwoutright', eventObject);
        };

        $scope.throwin = function (eventName, eventObject) {
            console.log('throwin', eventObject);
        };

        $scope.dragstart = function (eventName, eventObject) {
            console.log('dragstart', eventObject);
        };

        $scope.dragmove = function (eventName, eventObject) {
            console.log('dragmove', eventObject);
        };

        $scope.dragend = function (eventName, eventObject) {
            console.log('dragend', eventObject);
        };

        $scope.options = {
            throwOutConfidence: function (offset, elementWidth) {
                console.log('throwOutConfidence', offset, elementWidth);
                return Math.min(Math.abs(offset) / elementWidth, 1);
            },
            isThrowOut: function (offset, elementWidth, throwOutConfidence) {
                console.log('isThrowOut', offset, elementWidth, throwOutConfidence);
                return throwOutConfidence === 1;
            }
        };

        $scope.topthrowoutleft = function() {
            var card = swingStacks.getTopCardFromStack(0);
            card.throwOut(swingStacks.Card.DIRECTION_LEFT, 0);
        };
        $scope.topthrowoutright = function() {
            var card = swingStacks.getTopCardFromStack(0);
            card.throwOut(swingStacks.Card.DIRECTION_RIGHT, 0);
        };
    });
