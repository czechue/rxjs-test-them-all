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

### Reducing Arrays

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