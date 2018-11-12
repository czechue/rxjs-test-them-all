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