# callbag-find

Callbag operator that emits only the first value emitted by the source Callbag that meets some condition given a predicate function. Works for listenable and pullable sources.

`npm install callbag-find`

## Examples

### Find the first even number

```js
const find = require('callbag-find');
const subscribe = require('callbag-subscribe');
const fromIter = require('callbag-from-iter');
const pipe = require('callbag-pipe');

pipe(
  fromIter([1, 3, 5, 7, 2, 4, 6, 8]),
  find(n => n % 2 === 0),
  subscribe({
    next: (v) => console.log('=> ', v),
    complete: () => console.log('=> done')
  }) // => 2
);   // => done
```

### Find the first click that happens on a div tag

```js
const find = require('callbag-find');
const subscribe = require('callbag-subscribe');
const fromEvent = require('callbag-from-event');
const pipe = require('callbag-pipe');

pipe(
  fromEvent(document, 'click'),
  find(ev => ev.target.tagName === 'DIV'),
  subscribe({
    next: (v) => console.log('=> ', v),
    complete: () => console.log('=> done')
  })
);
```
