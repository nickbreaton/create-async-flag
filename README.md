# create-async-flag

Simple promise utility for separate, but dependent control flow. [See example here.](https://stackblitz.com/edit/create-async-flag)

## API

#### `createAsyncFlag()`

> Creates a flag that can be `set`, `unset`, and `wait` upon.
> ```js
> import createAsyncFlag from 'create-async-flag';
>
> const flag = createAsyncFlag();
> ```
<br>

#### `[flag].wait()`

> Creates a promise that will only resolve once `set`, or resolve immediatly if already `set`.
> ```js
> const flag = createAsyncFlag();
>
> async function run() {
>   // ...
>   await flag.wait(); // execution will hault until flag is `set`
>   // ...
> }
> ```
<br>

#### `[flag].set()`

> Marks the flag to be immediatly resolved, and to resolve any currently waiting promises.
> ```js
> const flag = createAsyncFlag();
>
> function log() {
>   flag.wait().then(() => console.log('one'));
>   flag.set();
>   flag.wait().then(() => console.log('two'));
> }
>
> log(); // => 'one'
>        // => 'two'
<br>

#### `[flag].unset()`

> Marks a flag to wait until set is called again.
> ```js
> const flag = createAsyncFlag();
>
> async function start() {
>   flag.unset();
>   await flag.wait();
>   return; // will never return, unless `set` is called
> }

#### `[flag].isSet()`

> Returns the current state of the flag.
> ```js
> const flag = createAsyncFlag();
>
> flag.isSet(); // => false
> flag.set()
> flag.isSet(); // => true
