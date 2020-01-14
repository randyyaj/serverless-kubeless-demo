import * as request from 'request-promise-native';

/**
 * Module containing functions for kubeless+serverless
 * @author github.com/randyyaj
 * @version 2019.01
 */

/**
 * Function to POST data to an external API and recieve a response back
 * @param event The passed in event containing relevant http metadata
 * @see https://helloacm.com/tools/hash/
 * @return object response
 */
export async function encrypt(event: any) {
  const uri = 'https://helloacm.com/api/hash/?cached';
  const options = {
    json: true,
    body: { s: event.data }
  };

  return request.post(uri, options)
    .then((response: any) => {
        console.log('response', response);
        return response;
    })
    .catch((error: any) => {
        return error;
  });
}

/**
 * Demo function for scheduled cron lambdas. Simply returns success.
 * @see https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
 * @see serverless.yml#minutecron
 * @return string
 */
export async function minutecron() {
    return 'success';
}

/**
 * Lambda function that reverses a string.
 * Local Invocation: serverless invoke --function reverse --data '{"word": "linux"}'
 * @param event Contains input data from caller
 * @param context
 * @return object {statusCode, body}
 */
export async function reverse(event: any, context: any) {
  if (event.data && typeof event.data == 'string') {
    console.log(`Event: ${event.data}`);
    let reversed = event.data.split('').reverse().join('');
    return reversed;
  } else {
    return 304;
  }
}

  /**
 * Lambda function that capitalizes a string
 * Local Invocation: serverless invoke --function capitalize --data '{"word": "linux"}' 
 * @param event Contains input data from caller
 * @param context 
 * @return object {statusCode, body}
 */
export async function capitalize(event: any, context: any) {
  if (event.data && typeof event.data == 'string') {
    let uppercased = event.data.toUpperCase();
    return uppercased;
  } else {
    return 304;
  }
}

/**
 * Lambda function that quotes a string
 * Local Invocation: serverless invoke --function quote --data '{"word": "linux"}'
 * @param event Contains input data from caller
 * @param context 
 * @return object {statusCode, body}
 */
export async function quote(event: any, context: any) {
  if (event.data && typeof event.data == 'string') {
    let quoted = `"${event.data}"`;
    return quoted;
  } else {
    return 304;
  }
}

/**
 * Lambda function checks if string contains numbers.
 * Local Invocation: serverless invoke --function isPalindrome --data '{"word": "racecar"}' 
 * @param event Contains input data from caller
 * @param context 
 * @return object {statusCode, body}
 */
export async function hasNumerical(event: any, context: any) {
  if (event.data && typeof event.data == 'string') {
    let hasNumerical = /\d/.test(event.data);
    return hasNumerical;
  } else {
    return 304;
  }
}

/**
 * Lambda function checks if string is a palindrome
 * Local Invocation: serverless invoke --function isPalindrome --data '{"word": "racecar"}'
 * @param event Contains input data from caller
 * @param context 
 * @return object {statusCode, body}
 */
export async function isPalindrome(event: any, context: any) {
  let isPalindrome = false;

  if (event.data && typeof event.data == 'string') {
    if (event.data.split('').reverse().join('') === event.data) {
      isPalindrome = true;
    }

    return isPalindrome;
  } else {
    return 304;
  }
}

