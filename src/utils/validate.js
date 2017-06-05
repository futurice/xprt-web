export const required = value => (value ? undefined : 'Required');

// Make sure e-mail address is valid according to:
// https://emailregex.com/
export const email = value => (
  value && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ?
  'Invalid email address' : undefined
);

export const matchingPasswords = (values) => {
  const errors = {};

  if (values.password !== values.repeatpassword) {
    errors.repeatpassword = 'Passwords must match';
  }

  return errors;
};
