### 1. Observables - wstęp

#### Observables mogą modelować akcje...

- Events,
- Async Server Requests
- Animations

Observable - to kolekcje które się wykonują w czasie

#### Libka:

Rx.js -> http://reactivex.io/

#### Events to Observables

```javascript
// Stworzenie Obserwera!
var mouseMoves = Observable.fromEvent(element, 'mousemove');
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
var handler = e => console.log(e);
document.addEventListener('mousemove', handler);

// unsubscribe
document.removeEventListener('mousemoves', handler);
```

**To samo reaktywnie:**

```javascript
// subscribe
var subscription = mouseMove.forEach(console.log);

// unsubscribe
subscription.dispose();
```

**Expanded Observable.forEach**
shorthand przedstawiajacy obiekt z 3 callbackami:

- on next,
- on error,
- on complete,

Każda iteracja wykonuje onNext aż do momentu kiedy pojawi się error albo "done".
Tak działa Obserwer.
W odróżnieniu jednak od zwykłej funkcji forEach -> Obserwer jako producer kontroluje
dystrybucję danych.

```javascript
// 'subscibe'
var subscription = mouseMoves.forEach(
  // next data
  event => console.log(event),
  // err
  error => console.log(error),
  // completed
  () => console.log('done'),
);

// 'unsubscribe'
subscription.dispose();
```

**Converting Events to Observables**

Wszystkie Observable bazują o specyfikę implementacji forEach();

```javascript
Observable.fromEvent = function(dom, eventName) {
  // returning Observable object
  return {
    forEach: function(observer) {
      var handler = e => observer.onNext(e);
      dom.addEventListener(eventName, handler);

      // returning Subscription object
      return {
        dispose: function() {
          dom.removeEventListener(eventName, handler);
        },
      };
    },
  };
};
```

#### Concurrency 3 Strategies:

**Hot Observable** -> rzucają datą nie zważając na to czy coś nasłuchuje tych eventow czy nie.

**Cold Observable** -> nie zrobią nic dopóki ktoś nie wykona na nich funkcji forEcha (next).

W tym przykladzie kolejne Observable nie rzucają wartościami, dopóki nie zostanie
na nich wykonana funkcja forEach.

1. concatAll() - od góry do dołu, od lewa do prawej

- nie chcesz korzystac z concatAll na infinity streamach - ponieważ gdyby w ponizszym wypadku stram pusty { } był nieskonczony - nigdy nie doszloby do wykonania forEach na Observablu {4}.

```javascript
--------time--------->
{
...{1}
.....{2...........3},
..........{},
............{4}
}.concatAll()

{...1.2...........3..4}
```

2. takeUntil()

- zatrzyma wywolywanie 1 Observabla w momencie gdy 2 zwroci wartosc.
- wykonuje dispose() zarowno na zrodle jak i stop kolekcji
- w ten sposob mozna wziac 2 nieskonczone Observable, polaczyc je
  aby stworzyc Observabla, ktory sie konczy.
- powinno się wykorzystywac tą funkcję zamiast unsubscrybowania
- **Nie unsubscrybuj eventów, twórz streamy które kompletują się kiedy chcesz aby się skompletowały.**

```javascript
--------time--------->
{..1..2......3}.takeUntil(  -> source collection
{........4})                -> stop collection wywołuje onNext()
         |
{..1..2..}
```

**ćwiczenie - Mouse Drags Collection**

```javascript
var getElementDrags = elmt => {
    ['mosuedown', 'moouseMove', 'mouseup'].forEach(key => {
      elmt[key] = Observables.fromEvent(elmt, key)
    })
    return elmt.mouseDowns.
      map(mouseDown =>
        document.mouseMoves.
          takeUntil(document.mouseUps)).
      concatAll();

getElementDrags(image).
    forEach(pos => image.position = pos)
```

3. mergeAll()

- wywołuje wszystkie kolekcje od razu gdy wystartują i merguje je do 1 kolekcji na bieżaco

```javascript
--------time--------->
{
...{1}
.....{2...........3},
..........{},
............{4}
}.mergeAll()

{...1.2......4....3}
```

4. switchLatest()

- przesuwa się do ostatniego Observabla i konczy mergowanie w momencie gdy ostatni Observable sie skompletuje
- wywoluje subscription.dispose() na obserwerze {2.....3}
- pozwala zakonczyc subskrypcje roznych eventow w momencie np. klikniecia buttona Submit

```javascript
--------time--------->
{
...{1}
.....{2...........3}, <------ subscription.dispose()
..........{},
............{4}
}.switchLatest()

{...1.2......4}
```

**Przykład Netflix Search**

```javascript
var searchResultSets = keyPresses.throttle(250).map(key =>
  getJson('/searchResults?q=' + input.value)
    .retry(3)
    .takeUntil(keyPresses),
);
concatAll();

searchResultSets.forEach(
  resultSet => updateSearchResults(resultSet),
  error => showMessage('the server is down'),
);
```

**Algorytm tworzenia takich funkcji**

- jakie kolekcje mam?
- jakie kolekcje chce otrzymac?
- jak otrzymac te kolekcje?

**Powyższy search z wykorzystaniem switchLatest()**

```javascript
var searchResultSets = keyPresses
  .throttle(250)
  .map(key => getJson('/searchResults?q=' + input.value).retry(3))
  .switchLatest();

searchResultSets.forEach(
  resultSet => updateSearchResults(resultSet),
  error => showMessage('the server is down'),
);
```

**Player with observable**

```javascript
var authorizations = player
  .init()
  .map(() =>
    playAttempts
      .map(movieId =>
        player
          .authorize(movieId)
          .catch(e => Observable.empty)
          .takeUntil(cancel),
      )
      .concatAll(),
  )
  .concatAll();

authorizations.forEach(
  license => player.play(license),
  error => showDialog('sorry can play right now')
)
```

### 2. Interactive Learning Exercises

http://jhusain.github.io/learnrx/
