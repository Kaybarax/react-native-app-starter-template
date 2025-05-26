//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isNullUndefined, isTrue, objectKeyExists } from '../util/util';

/**
 * sd _ Kaybarax
 * @param key
 * @param model
 * @param expectationFunction
 * @returns {*}
 */
export function displayFieldExpectationSatisfied(key, model, expectationFunction) {
  if (isNullUndefined(model)) {
    return false;
  }
  if (!objectKeyExists(model, key)) {
    return false;
  }
  return expectationFunction(model[key]);
}

/**
 * sd _ Kaybarax
 * @param threadWork
 * @param threadRunTime
 * @param threadRunTimeCountdown
 * @param threadWorkRunSuccess
 * @param onWorkSuccess
 * @param onWorkFail
 * @param threadPool
 * @param startOrJoinThread
 * @param startOrJoinThreadCountdown
 */
export function serviceWorkerThread(
  threadWork: Function,
  threadWorkRunSuccess: Function | boolean = false,
  onWorkSuccess: Function,
  onWorkFail: Function,
  threadRunTime: number = 5000,
  threadRunTimeCountdown: number = 1000,
  threadPool: Array<any> = [],
  startOrJoinThread: Function | boolean = true,
  startOrJoinThreadCountdown: number = 1000,
) {
  let countdown: number = threadRunTime;
  //because on push, length increases by one,
  // and interval is at former length value
  let threadIndex = threadPool.length;

  threadPool.push(
    setInterval(_ => {
      let runThread: boolean | Function =
        typeof startOrJoinThread === 'boolean' ? startOrJoinThread : startOrJoinThread.call(null);

      if (runThread) {
        //clear this top level thread
        clearInterval(threadPool[threadIndex]);

        //start thread work and
        threadWork.call(null);

        //next index for thread work
        threadIndex = threadPool.length;

        threadPool.push(
          setInterval(_ => {
            let done: boolean | Function =
              typeof threadWorkRunSuccess === 'boolean' ? threadWorkRunSuccess : threadWorkRunSuccess.call(null);
            console.log('Thread work at -> ', countdown, done);
            if (isTrue(done)) {
              clearInterval(threadPool[threadIndex]);
              onWorkSuccess.call(null);
            } else {
              //if out of time, terminate
              if (countdown <= 0) {
                clearInterval(threadPool[threadIndex]);
                onWorkFail.call(null);
              }
            }
            countdown -= threadRunTimeCountdown;
          }, threadRunTimeCountdown),
        );
      } else {
        //if out of time, terminate
        if (countdown <= 0) {
          clearInterval(threadPool[threadIndex]);
          //and report thread work failure
          onWorkFail.call(null);
        }
      }

      countdown -= startOrJoinThreadCountdown;
    }, startOrJoinThreadCountdown),
  );
}
