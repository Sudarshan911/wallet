const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_MAX_PRECISION = 'MAX_PRECISION'


export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });

export const VALIDATOR_MAX_PRECISION = val => ({ type: VALIDATOR_TYPE_MAX_PRECISION, val: val });

let errorText = '';

export const validate = (value, validators, inputName) => {
  let isValid = true;
  for (const validator of validators) {

    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
      errorText = `${inputName} is required.`
      if (!isValid) { break; }
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
      if (!isValid) { break; }
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
      if (!isValid) { break; }
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
      errorText = "Only positive numbers are allowed."
      if (!isValid) { break; }
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
      if (!isValid) { break; }
    }
    if (validator.type === VALIDATOR_TYPE_MAX_PRECISION) {
      isValid = isValid && (value && (value.split(".").length > 1)) ? ((value.split("."))[1]?.length <= validator.val) : isValid;
      errorText = "Maximum prcision limit is 4.";
      if (!isValid) { break; }
    }
  }
  return { isValid, errorText };
};
