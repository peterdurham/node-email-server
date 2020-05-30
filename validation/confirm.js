const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateConfirmInput(data) {
  let errors = {};

  data._id = !isEmpty(data._id) ? data._id : "";

  if (Validator.isEmpty(data._id)) {
    errors._id = "id field is required";
  }

  if (!Validator.isLength(data._id, { min: 20, max: 30 })) {
    errors._id = "id must be between 20 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
