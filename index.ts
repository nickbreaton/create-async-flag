export interface AsyncFlag {
  set: () => void;
  unset: () => void;
  wait: () => Promise<void>;
}

function createAsyncFlag() {
  let isSet = false;
  let promise: Promise<void>;
  let resolve: () => void;

  const flag: AsyncFlag = {
    set(): void {
      isSet = true;
      resolve();
    },
    unset(): void {
      isSet = false;
      promise = new Promise((_resolve: typeof resolve) => {
        resolve = _resolve;
      });
    },
    wait(): Promise<void> {
      return isSet ? Promise.resolve() : promise;
    }
  };

  flag.unset();
  return flag;
};

export default module.exports = createAsyncFlag;