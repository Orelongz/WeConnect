/**
 * isLoading()
 * @desc isLoading action helper
 * @param {String} type
 * @param {Boolean} status
 * @return {Object} action to be dispatched
 */
export const isLoading = (type, status) => ({
  type,
  status
});

/**
 * successfulRequest
 * @desc successfulRequest action
 * @param {String} type
 * @param {Object} credentials
 * @return {Object} login action
 */
export const successfulRequest = (type, credentials) => ({
  type,
  credentials
});

/**
 * failedRequest()
 * @desc failedRequest action helper
 * @param {String} type
 * @param {String} error
 * @return {Object} action to be dispatched
 */
export const failedRequest = (type, error) => ({
  type,
  error
});
