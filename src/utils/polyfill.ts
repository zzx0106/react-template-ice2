// https://github.com/que-etc/intersection-observer-polyfill
// require('intersection-observer');
import 'intersection-observer';

if (!Object.entries) {
  Object.entries = function (obj: any) {
    const ownProps = Object.keys(obj);
    let i = ownProps.length;
    const resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

if (!Object.prototype.hasOwnProperty.call(Object, 'getOwnPropertyDescriptors')) {
  Object.defineProperty(Object, 'getOwnPropertyDescriptors', {
    configurable: true,
    writable: true,
    value: function getOwnPropertyDescriptors(object: any) {
      return Reflect.ownKeys(object).reduce((descriptors, key) => {
        return Object.defineProperty(descriptors, key, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: Object.getOwnPropertyDescriptor(object, key),
        });
      }, {});
    },
  });
}
Promise.allSettled =
  Promise.allSettled ||
  function (this: any, arr) {
    const P = this;
    return new P((resolve, reject) => {
      if (Object.prototype.toString.call(arr) !== '[object Array]') {
        return reject(new TypeError(`${typeof arr} ${arr}  is not iterable(cannot read property Symbol(Symbol.iterator))`));
      }
      const args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      let arrCount = args.length;

      function resolvePromise(index, value) {
        if (typeof value === 'object') {
          const { then } = value;
          if (typeof then === 'function') {
            then.call(
              value,
              (val) => {
                args[index] = { status: 'fulfilled', value: val };
                if (--arrCount === 0) {
                  resolve(args);
                }
              },
              (e) => {
                args[index] = { status: 'rejected', reason: e };
                if (--arrCount === 0) {
                  resolve(args);
                }
              }
            );
          }
        }
      }

      for (let i = 0; i < args.length; i++) {
        resolvePromise(i, args[i]);
      }
    });
  };
