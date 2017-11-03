'use strict';
const tape = require('tape');
const common = require('./common');

tape('usage messages', (t) => {
  t.timeoutAfter(15000);

  const sess = common.Session.create('inspect-scenario.js');

  sess.waitBreak(() => {
    sess.send('v8 print');
  });

  sess.stderr.linesUntil(/USAGE/, (lines) => {
    const re = /^error: USAGE: v8 print expr$/;
    t.ok(lines.some(line => re.test(line.trim())), 'print usage message');
    sess.send('v8 source list');
  });

  sess.stderr.linesUntil(/USAGE/, (lines) => {
    const re = /^error: USAGE: v8 source list$/;
    t.ok(lines.some(line => re.test(line.trim())), 'list usage message');
    sess.send('v8 findjsinstances');
  });

  sess.stderr.linesUntil(/USAGE/, (lines) => {
    const re = /^error: USAGE: v8 findjsinstances \[flags\] instance_name$/;
    t.ok(lines.some(line => re.test(line.trim())),
         'findjsinstances usage message');
    sess.send('v8 findrefs');
  });

  sess.stderr.linesUntil(/USAGE/, (lines) => {
    const re = /^error: USAGE: v8 findrefs expr$/;
    t.ok(lines.some(line => re.test(line.trim())), 'findrefs usage message');
    sess.quit();
    t.end();
  });
});