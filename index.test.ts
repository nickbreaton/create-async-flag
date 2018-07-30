import createAsyncFlag, { AsyncFlag } from './index';

let flag: AsyncFlag;

beforeEach(() => {
  flag = createAsyncFlag();
});

test('wait should resolve when flag set before', (done) => {
  flag.set();
  flag.wait().then(done);
});

test('wait should resolve when flag set after', (done) => {
  flag.wait().then(done);
  flag.set();
});

test('wait should not resolve when nothing set', async () => {
  const promise = flag.wait();
  jest.spyOn(promise, 'then');

  expect(promise.then).not.toHaveBeenCalled();

  flag.set();
  await promise;

  expect(promise.then).toHaveBeenCalled();
});

test('unset should create a new promise instance', () => {
  const originalPromise = flag.wait();
  expect(originalPromise).toBe(flag.wait());
  flag.unset();
  expect(originalPromise).not.toBe(flag.wait());
});

test('isSet should return the current state of the flag', () => {
  expect(flag.isSet()).toBe(false);
  flag.set();
  expect(flag.isSet()).toBe(true);
  flag.unset();
  expect(flag.isSet()).toBe(false);
});