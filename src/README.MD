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
