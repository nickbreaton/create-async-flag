export interface AsyncFlag {
  set(): void;
  unset(): void;
  wait(): Promise<void>;
  isSet(): boolean;
}

function createAsyncFlag() {
  let isSet = false;
  let promise: Promise<void>;
  let resolve: () => void;

  const flag: AsyncFlag = {
    set() {
      isSet = true;
      resolve();
    },
    unset() {
      isSet = false;
      promise = new Promise((_resolve: typeof resolve) => {
        resolve = _resolve;
      });
    },
    wait() {
      return isSet ? Promise.resolve() : promise;
    },
    isSet() {
      return isSet;
    }
  };

  flag.unset();
  return flag;
};

export default module.exports = createAsyncFlag;