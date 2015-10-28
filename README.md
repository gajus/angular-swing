<!--
This file has been generated using GitDown (https://github.com/gajus/gitdown).
Direct edits to this will be be overwritten. Look for GitDown markup file under ./.gitdown/ path.
-->
<h1 id="angular-swing">angular-swing</h1>

[![NPM version](http://img.shields.io/npm/v/angular-swing.svg?style=flat)](https://www.npmjs.org/package/angular-swing)
[![Bower version](http://img.shields.io/bower/v/angular-swing.svg?style=flat)](http://bower.io/search/?q=angular-swing)

AngularJS directive for [Swing](https://github.com/gajus/swing): A swipeable cards interface. The swipe-left/swipe-right for yes/no input. As seen in apps like [Jelly](http://jelly.co/) and [Tinder](http://www.gotinder.com/), and [many others](http://www.saydaily.com/2014/09/tinder-swipe-and-media).

Give it a [swing](http://gajus.com/sandbox/swing/examples/card-stack/)! and please [tweet it](https://twitter.com/intent/retweet?tweet_id=527503484867084288) if you like it. : )

![Card stack example.](./.gitdown/card-stack.gif)

* [angular-swing](#angular-swing)
    * [Usage](#angular-swing-usage)
        * [Examples](#angular-swing-usage-examples)
    * [Events](#angular-swing-events)
        * [Event Object](#angular-swing-events-event-object)
    * [Download](#angular-swing-download)


<h2 id="angular-swing-usage">Usage</h2>

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

Use scope variable to change Swing Stack default options: 
```js
$scope.options = {
    throwOutConfidence: function (offset, element) {
        console.log('throwOutConfidence', offset, element.offsetWidth);
        return Math.min(Math.abs(offset) / element.offsetWidth, 1);
    },
    isThrowOut: function (offset, element, throwOutConfidence) {
        console.log('isThrowOut', offset, element.offsetWidth, throwOutConfidence);
        return throwOutConfidence === 1;
    }
};
```

```html
<ul swing-stack swing-options="options">...</ul>
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

<h3 id="angular-swing-usage-examples">Examples</h3>

* [Card stack](http://gajus.com/sandbox/angular-swing/examples/card-stack/) using AngularJS directive.

There are more examples that using the standalone [Swing](https://github.com/gajus/swing#usage-examples).

The code for all of the examples is in the [./examples/](https://github.com/gajus/angular-swing/tree/master/examples/) folder.

[Raise an issue](https://github.com/gajus/angular-swing/issues) if you are missing an example.

<h2 id="angular-swing-events">Events</h2>

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

<h3 id="angular-swing-events-event-object">Event Object</h3>

[Swing Documentation](https://github.com/gajus/swing/#event-object) for the Event Object.

<h2 id="angular-swing-download">Download</h2>

Using [Bower](http://bower.io/):

```sh
bower install angular-swing
```

Using [NPM](https://www.npmjs.org/):

```sh
npm install angular-swing
```