const test = require('tape');
const interval = require('callbag-interval');
const fromIter = require('callbag-from-iter');
const pipe = require('callbag-pipe');
const subscribe = require('callbag-subscribe');
const find = require('./index');

test('it looks for an item that matches a predicate then completes (pullable)', t => {
  t.plan(3);

  let done;
  let value;

  pipe(
    fromIter([1, 3, 5, 2, 4, 6]),
    find(n => n % 2 === 0),
    subscribe({
      next: v => {
        value = v;
      },
      complete: () => {
        done = true;
      }
    })
  );

  t.equals(value, 2);
  t.equals(done, true);
  t.pass('nothing else happens');
  t.end();
});

test('it looks for an item that matches a predicate then completes (listenable)', t => {
  t.plan(3);

  let done;
  let value;

  pipe(
    interval(10),
    find(n => n === 1),
    subscribe({
      next: v => {
        value = v;
      },
      complete: () => {
        done = true;
      }
    })
  );

  setTimeout(() => {
    t.equals(value, 1);
    t.equals(done, true);
    t.pass('nothing else happens');
    t.end();
  }, 25);
});
