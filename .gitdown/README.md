# angular-swing

{"gitdown": "badge", "name": "npm-version"}
{"gitdown": "badge", "name": "bower-version"}

AngularJS directive for [Swing](https://github.com/gajus/swing): A swipeable cards interface. The swipe-left/swipe-right for yes/no input. As seen in apps like [Jelly](http://jelly.co/) and [Tinder](http://www.gotinder.com/), and [many others](http://www.saydaily.com/2014/09/tinder-swipe-and-media).

Give it a [swing](http://gajus.com/sandbox/swing/examples/card-stack/)! and please [tweet it](https://twitter.com/intent/retweet?tweet_id=527503484867084288) if you like it. : )

![Card stack example.](./.gitdown/card-stack.gif)

{"gitdown": "contents"}

## Usage

Include [./dist/angular-swing.js.](https://raw.githubusercontent.com/gajus/angular-swing/master/dist/swing.js).

Load `gajus.swing` module, e.g.

```js
angular.module('your-module', ['gajus.swing']);
```

Loading `gajus.swing` module will make available the `swing-stack` and `swing-card` directives.

Prepare a Swing stack:

```html
<ul swing-stack></ul>
```

Add a Card to the Swing stack:

```html
<ul swing-stack>
    <li swing-card></li>
</ul>
```

Attach event listeners to the instance of Card:

```html
<ul swing-stack>
    <li
        swing-card
        swing-on-throwout="console.log(eventName, eventObject)"
        swing-on-throwoutleft="console.log(eventName, eventObject)"
        swing-on-throwoutright="console.log(eventName, eventObject)"
        swing-on-throwin="console.log(eventName, eventObject)"
        swing-on-dragstart="console.log(eventName, eventObject)"
        swing-on-dragmove="console.log(eventName, eventObject)"
        swing-on-dragend="console.log(eventName, eventObject)"
        ></li>
</ul>
```

Use scope variables/methods to add/remove cards:

```html
<ul swing-stack>
    <li
        swing-card
        swing-on-throwout="remove($index)"
        ng-repeat="card in cards"
        >{{card.name}}</li>
</ul>
```

```js
$scope.cards = [
    {name: 'foo'},
    {name: 'bar'}
];
$scope.remove = function (index) {
    $scope.cards.splice(index, 1);
}
$scope.add = function (name) {
    $scope.cards.push({name: name});
};
```

### Examples

* [Card stack](http://gajus.com/sandbox/angular-swing/examples/card-stack/) using AngularJS directive.

There are more examples that using the standalone [Swing](https://github.com/gajus/swing#usage-examples).

The code for all of the examples is in the [./examples/](https://github.com/gajus/angular-swing/tree/master/examples/) folder.

[Raise an issue](https://github.com/gajus/angular-swing/issues) if you are missing an example.

## Events

[Swing Documentation](https://github.com/gajus/swing/#event-object) for the Events.

Swing events translate to the following attributes in the AngularJS directive:

| Name | Description |
| --- | --- |
| `throwout` | `swing-on-throwout` |
| `throwoutleft` | `swing-on-throwoutleft` |
| `throwoutright` | `swing-on-throwoutright` |
| `throwin` | `swing-on-throwin` |
| `dragstart` | `swing-on-dragstart` |
| `dragmove` | `swing-on-dragmove` |
| `dragend` | `swing-on-dragend` |

Event listener expression can use `eventName` and [`eventObject`](#event-object) parameters.

### Event Object

[Swing Documentation](https://github.com/gajus/swing/#event-object) for the Event Object.

## Download

Using [Bower](http://bower.io/):

```sh
bower install angular-swing
```

Using [NPM](https://www.npmjs.org/):

```sh
npm install angular-swing
```