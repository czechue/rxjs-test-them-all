###  1. Observables - wstęp

#### Observables mogą modelować akcje...

- Events,
- Async Server Requests
- Animations

Observable - to kolekcje które się wykonują w czasie

#### Libka:

Rx.js -> http://reactivex.io/
http://reactivex.io/learnrx/

#### Events to Observables

```javascript
var mouseMoves = Observable.fromEvent(element, 'mousemove')
```

#### Zaadaptowane API do Obserwerów

- DOM Events
- Websockets
- Server-sent Events
- Node Streams
- Service Workers
- XMLHttpRequests
- setInterval

#### Event Subscription

```javascript
// subscribe
var handler = (e) => console.log(e);
document.addEventListener('mousemove', handler);

// unsubscribe
document.removeEventListener('mousemoves', handler)
```

**To samo reaktywnie:**

```javascript
// subscribe
var subscription = mouseMove.forEach(console.log)

// unsubscribe
subscription.dispose()
```

#### Deeply nested collections:
- tak długo mapować aż otrzyma się oczekiwaną wartość,
- następnie z tego miejsca ma się dostęp do wartości znajdujących się powyżej
- w zależności od ilości zagnieżdzeń (n) użyć na końcu concatAll() n-1 razy
- It's a very common pattern to see several nested concatMap operations, 
with the last operation being a map. 
You can think of this pattern as the functional version of a nested forEach.

#### Reducing Arrays

Sometimes we need to perform an operation on more than one item in 
the array at the same time. For example, let's say we need to find 
the largest integer in an array. We can't use a filter() operation, 
because it only examines one item at a time. To find the largest 
integer we need to compare items in the array to each other.
    
One approach could be to select an item in the array as the 
assumed largest number (perhaps the first item), and then compare 
that value to every other item in the array. Each time we come 
across a number that was larger than our assumed largest number, 
we'd replace it with the larger value, and continue the process 
until the entire array was traversed.
    
If we replaced the specific size comparison with a closure, 
we could write a function that handled the array traversal process 
for us. At each step our function would apply the closure to the 
last value and the current value and use the result as the last 
value the next time. Finally we'd be left with only one value. 
This process is known as reducing because we reduce many values 
to a single value.

### 2. Working with Observables

Microsoft's open-source Reactive Extensions library introduces a 
new collection type to Javascript: Observable. An Observable is a lot 
like an Event. Like an Event, an Observable is a sequence of values 
that a data producer pushes to the consumer. However unlike an Event, 
an Observable can signal to a listener that it has completed, 
and will send no more data.

Observables can send data to consumers asynchronously. 
Unlike Array, there's no Javascript literal syntax for creating 
Observable sequences. However we can build a helper method that 
visually describes the contents of sequences as well as the 
times between each item's arrival. The seq function creates 
an Observable from an array of items, and adds a delay for every 
empty item encountered. Every ,,, adds up to a second.

```javascript
// An array of numbers 1,2,3
var numbers123Array =      [1,2,3];

// A sequence that returns 1, and then after 4 seconds returns 2,
// and then after another second returns 3, and then completes.
var numbers123Observable = seq([1,,,,,,,,,,,,2,,,3]);

// Like Arrays, Observables can contain any object - even Arrays.
var observableOfArrays = seq([ [1,2,3],,,,,,[4,5,6],,,,,,,,,,,[1,2] ]);
			
```

Observables are a sequence of values, delivered one after the other. 
Therefore it's possible that an Observable can go on sending data 
to a listener forever just like a mouse move event. 
To create a sequence that doesn't complete, you can add a 
trailing ,,, to the end of the items passed to seq().

```javascript
// The trailing ,,, ensures that the sequence will not complete.
var mouseMovesObservable =
	seq([ {x: 23, y: 55},,,,,,,{x: 44, y: 99},,,{x:55,y:99},,,{x: 54, y:543},,, ]);

// No trailing ,,, indicates that sequence will complete.
var numbers123Observable = seq([1,,,2,,,3]);
```

Querying Arrays only gives us a snapshot. By contrast, 
querying Observables allows us to create data sets that react 
and update as the system changes over time. 
This enables a very powerful type of programming known as 
reactive programming.

Let's start off by contrasting Observable with Events...

Exercise 28: Subscribing to an event

You're probably used to thinking about events as a list of handlers 
stored in an object. In this example, we subscribe to a button click 
event and then unsubscribe the first time the button is clicked.

```javascript
function(button) {
	// the button click handler
	var handler = function(ev) {
		// Unsubscribe from the button event.
		button.removeEventListener("click", handler);

		alert("Button was clicked. Unsubscribing from event.");
	};

	// add the button click handler
	button.addEventListener("click", handler);
}
	
```
Ask yourself this question: How is subscribing to an event different 
than traversing an array? Both operations involve sending a listener 
a sequence of items by repeatedly invoking a function. 
So why can't we traverse Arrays and Events the same way?

Exercise 29: Traversing an Event

Subscribing to an Event and traversing an Array are fundamentally 
the same operation. The only difference is that Array traversal is 
synchronous and completes, and Event traversal is asynchronous and 
never completes. If we convert a button click Event to an Observable 
object, we can use forEach() to traverse the Event.

```javascript
function(button) {
	var buttonClicks = Observable.fromEvent(button, "click");

	// In the case of an Observable, forEach returns a subscription object.
	var subscription =
		buttonClicks.
			forEach(function(clickEvent) {
				alert("Button was clicked. Stopping Traversal.");

				// Stop traversing the button clicks
				subscription.dispose();
			});
}
```
Notice that Observable's forEach() function returns a Subscription object. 
Disposing of a Subscription object unsubscribes from the event and prevents 
memory leaks. Disposing of a subscription is the asynchronous equivalent of 
stopping half-way through a counting for loop.

Disposing of a Subscription object is basically the same as calling 
removeEventListener(). On the surface, these two approaches to Event handling 
don't seem to be very different. Under the circumstances, why should we bother 
converting Events to Observables? The reason is that if we convert Events 
to Observable Objects, we can use powerful functions to transform them. 
In the next exercise we'll learn how we can use one such function to avoid 
dealing with Subscriptions in many cases...

Exercise 30: Completing Sequences with take()

Have you ever wished that you could listen for the next occurrence of an event 
and then immediately unsubscribe? For example, developers will often attach an 
event handler to window.onload, expecting that their event handler will only be 
called once.

```javascript
window.addEventListener(
	"load",
	function()
		// do some work here, but expect this function will only be called once.
	})
```
In instances such as this, it's good practice to unsubscribe from the event after 
it's fired. Failing to unsubscribe is a memory leak. Depending on the circumstances, 
memory leaks can seriously destablize your application and can be very difficult 
to track down. Unfortunately unsubscribing from an event after one occurrence 
can be cumbersome:

```javascript
var handler = function() {
	// do some work here, then unsubscribe from the event
	window.removeEventListener("load", handler)
};
window.addEventListener("load", handler);
```

Wouldn't it be nice if there was an easier way to code this? 
That's why Observable has a **take()** function. The take() function works like this...

```javascript
seq([1,,,2,,,3,,,4,,,5,,,6,,,]).take(3) === seq([1,,,2,,,3]);
```
An Observable based on an Event will never complete on its own. **The take() function 
creates a new sequence that completes after a discrete number of items arrive**. 
This is important, because unlike an Event, when an Observable sequence completes it 
unsubscribes all of its listeners. That means that if we use take() to complete our Event sequence, we don't need to unsubscribe!

Let's repeat the previous exercise, in which we listened for a single button click 
and then unsubscribed. This time let's use the take() function to complete the 
sequence after the button is clicked.

```javascript
function(button) {
	var buttonClicks = Observable.fromEvent(button, "click");

	// Use take() to listen for only one button click
	// and unsubscribe.
	buttonClicks.
		// Insert take() call here
		forEach(function(clickEvent) {
			alert("Button was clicked once. Stopping Traversal.");
		});
}
```
The take() function is great way of listening for a discrete number of events and 
then unsubscribing, but Observable has an even more flexible function that we can 
use to complete sequences...

Exercise 31: Completing sequences with **takeUntil()**

**Have you ever wanted to unsubscribe from one Event when another Event fires?** 
Observable's takeUntil() function is a convenient way of completing a sequence 
when another Event occurs. Here's how takeUntil() works:

```javascript
var numbersUntilStopButtonPressed =
	seq(            [ 1,,,2,,,3,,,4,,,5,,,6,,,7,,,8,,,9,,, ])
	.takeUntil(seq( [  ,,, {eventType: "click"},,, ]) )       === seq([ 1,,,2 ])
```

Earlier we (unknowningly) built a dynamic Microsoft price stock ticker using Observable. 
The problem with that stock ticker was that it kept going on forever. 
If left unchecked, all the entries in the log could use up all of the memory on the page. 
In the exercise below, filter the Observable sequence of NASDAQ prices for MSFT stock 
prices, use the fromEvent() function to create an Observable .

```javascript
function(pricesNASDAQ, printRecord, stopButton) {
	var stopButtonClicks = Observable.fromEvent(stopButton,"click"),
		microsoftPrices =
			pricesNASDAQ.
				filter(function(priceRecord) {
					return priceRecord.name === "MSFT";
				}).
				takeUntil(stopButtonClicks);

	microsoftPrices.
		forEach(function(priceRecord) {
			printRecord(priceRecord);
		});
}
```

We've learned that Observable sequences are much more powerful than raw events, 
because they can complete. **The take() and takeUntil() functions are powerful enough 
to ensure that we never have to unsubscribe from another event again!** 
This reduces the risk of memory leaks and makes our code more readable.

Here's what we learned in this section:

- We can traverse Observables using forEach().
- We can use fromEvent() to convert Events into Observables that never complete.
- We can apply take() and takeUntil() to an Observable to create a new sequence which does complete.
- In the next section we'll learn how to combine events to create more complex events. 
You'll be suprised how easily you can solve complex, asynchronous problems!

### Querying Observables

What's the difference between these two tasks?

Creating a flat list of movies with a rating of 5.0 from a bunch of movie lists.
Creating a sequence of all the mouse drag events from the mouseDown, mouseMove, 
and mouseUp events.
You might think of them as different, and might code them very differently, 
but these tasks are fundamentally the same. Both of these tasks are queries, 
and can be solved using the functions you've learned in these exercises.

The difference between traversing an Array and traversing an Observable is the 
direction in which the data moves. When traversing an Array, the client pulls data 
from the data source, blocking until it gets a result. When traversing Observables, 
the data source pushes data at the client whenever it arrives.

It turns out that the direction in which data moves is orthogonal to querying that data. 
In other words, when we're querying data it doesn't matter whether we pull data, 
or data is pushed at us. In either case the query methods make the same transformations. 
The only thing that changes is the input and output type respectively. 
If we filter an Array, we get a new Array. If we filter an Observable, 
we get a new Observable, and so on.

Take a look at how the query methods transform Observables and Arrays

```javascript
// map()

[1,2,3].map(function(x) { return x + 1 })                       === [2,3,4]
seq([1,,,2,,,3]).map(function(x) { return x + 1})               === seq([2,,,3,,,4])
seq([1,,,2,,,3,,,]).map(function(x) { return x + 1 })           === seq([2,,,3,,,4,,,])

// filter()

[1,2,3].filter(function(x) { return x > 1; })                   === [2,3]
seq([1,,,2,,,3]).filter(function(x) { return x > 1; })          === seq([2,,,3])
seq([1,,,2,,,3,,,]).filter(function(x) { return x > 1; })       === seq([2,,,3,,,])

// concatAll()

[ [1, 2, 3], [4, 5, 6] ].concatAll()                             === [1,2,3,4,5,6]
seq([ seq([1,,,2,,,3]),,,seq([4,,,5,,,6]) ]).concatAll()         === seq([1,,,2,,,3,,,4,,,5,,,6])

// If a new sequence arrives before all the items
// from the previous sequence have arrived, no attempt
// to retrieve the new sequence's elements is made until
// the previous sequence has completed. As a result the
// order of elements in the sequence is preserved.
seq([
	seq([1,,,, ,2, ,3])
	,,,seq([,,4, ,5, ,,6]) ]).
	concatAll()                                                  === seq([1,,,,,2,,3,,4,,5,,,6])

// Notice that as long as at least one sequence being
// concatenated is incomplete, the concatenated sequence is also
// incomplete.
seq([
	seq([1,, ,,, ,,,2,,,3])
	,,,seq([4,,,5,,, ,,, ,,6,,,]) ]).
	concatAll()                                                  === seq([1,,,,,,,,2,,,3,4,,,5,,,,,,,,6,,,])

// reduce()

[ 1, 2, 3 ].reduce(sumFunction)                                 === [ 6 ]
seq([ 1,,,2,,,3 ]).reduce(sumFunction)                          === seq([,,,,,,6])

// Reduced sequences do not complete until the
// sequence does.
seq([ 1,,,2,,,3,,, ]).reduce(sumFunction)                       === seq([ ,,,,,,,,,])

// zip()

// In both Arrays and Observables, the zipped sequence
// completes as soon as either the left or right-hand
// side sequence completes.
Array.zip([1,2],[3,4,5], sumFunction)                           === [4,6]
Observable.zip(seq([1,,,2]),seq([3,,,4,,,5]), sumFunction)      === seq([4,,,6])

// take()
[1,2,3].take(2)                                                 === [1, 2]
seq([ 1,,,2,,,3 ]).take(2)                                      === seq([ 1,,,2 ])
seq([ 1,,,2,,,3,,, ]).take(2)                                   === seq([ 1,,,2 ])

// takeUntil()

// takeUntil works for Arrays, but it's not very useful
// because the result will always be an empty array.
[1,2,3].takeUntil([1])                                          === []

seq([1,,,2,,,3,,, ]).takeUntil(
seq([ ,,, ,,4 , ]))                                             === seq([ 1,,,2 ])
```

Remember when I prohibited the use of array indexers? The reason for that restriction 
should now become clearer to you. Whereas the 5 functions can be used on any collection, 
indexers can only be used on collections that support random-access (like Array). 
If you avoid indexers and stick to the functions you've learned in this tutorial, 
you'll have a unified programming model for transforming any collection. 
Having a unified programming model makes it trivial to convert synchronous code to 
asynchronous code, a process which would otherwise be very difficult. 
As we've demonstrated, you don't need indexers to perform complex collection 
transformations.

Now that we've seen that we can query asychronous and synchronous data sources 
using the same programming model, let's use Observable and our query functions to 
create complex new events.