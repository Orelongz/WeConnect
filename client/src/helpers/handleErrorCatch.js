/**
 * handleErrorCatch()
 * @desc handles the error passed to state
 * @param {error} error 
 * @return {String} error
 */
export default function handleErrorCatch(error) {
  if (typeof error.error === 'string') {
    return error.error;
  }
  return error.error[0];
};