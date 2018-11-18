###  1. Observables - wstęp

#### Observables mogą modelować akcje...

- Events,
- Async Server Requests
- Animations

Observable - to kolekcje które się wykonują w czasie

#### Libka:

Rx.js -> http://reactivex.io/

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
