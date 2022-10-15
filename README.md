# alda-js

This repository contains two different things:

- javascript reimplementation of [Alda music programming language](https://alda.io/).
- frontend (in `index.html` file and `js` folder) for Alda WASM port. See [here](https://severak.github.io/alda-js/).

## What works in javascript reimplementation

- `node alda.js --test-parser examples\blade-runner.alda`
- `node alda.js --parse-examples`

## Not supported yet

- note times - `d2s`, `c350ms`
- underscores in notes - `b_8`
- multiple instruments in call
- this - `d4~|1`
- [crams](https://github.com/alda-lang/alda/blob/master/doc/cram-expressions.md)
- [variables](https://github.com/alda-lang/alda/blob/master/doc/variables.md)

## Credits

- based on original Alda language by Dave Yarwood
- parser based on [MML parser](https://github.com/korinVR/mml2smf) by Katsuomi Kobayashi (korinVR)
- uses [JZZ.js](https://github.com/jazz-soft/JZZ) for MIDI connectivity

Made by [Severák](http://tilde.town/~severak/) in 2021 and 2022. Sponsored by my cat.
