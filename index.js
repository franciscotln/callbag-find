const find = pred => source => (start, sink) => {
  if (start !== 0) return;
  let end;
  let talkback;
  source(start, (t, d) => {
    if (end) return;
    if (t === 0) talkback = d;
    if (t === 1) {
      if (pred(d)) {
        end = true;
        sink(t, d);
        talkback(2);
        sink(2);
      } else {
        talkback(t);
      }
      return;
    }
    sink(t, d);
  });
};

module.exports = find;
