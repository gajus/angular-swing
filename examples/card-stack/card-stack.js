angular
    .module('card-stack-demo', ['gajus.swing'])
    .controller('card-stack-playground', function ($scope) {
        $scope.cards = [
            {name: 'clubs', symbol: '♣'},
            {name: 'diamonds', symbol: '♦'},
            {name: 'hearts', symbol: '♥'},
            {name: 'spades', symbol: '♠'}
        ];

        $scope.throwout = function (eventObject) {
            console.log('throwout', eventObject);
        };

        $scope.throwoutleft = function (eventObject) {
            console.log('throwoutleft', eventObject);
        };

        $scope.throwoutright = function (eventObject) {
            console.log('throwoutright', eventObject);
        };

        $scope.throwin = function (eventObject) {
            console.log('throwin', eventObject);
        };

        $scope.dragstart = function (eventObject) {
            console.log('dragstart', eventObject);
        };

        $scope.dragmove = function (eventObject) {
            console.log('dragmove', eventObject);
        };

        $scope.dragend = function (eventObject) {
            console.log('dragend', eventObject);
        };
    });