import { ValidationResult } from "..";
import { ValidationFn } from "../models/ValidationFn";

export const validationFnExecutor = <T, P>(args: {
  value: T;
  validationFn: ValidationFn<T, P>;
  parent: P;
}): ValidationResult | undefined => {
  try {
    const result = args.validationFn(args.value, args.parent);
    if (result) {
      return {
        ...result, // created by user, so put that first, such that `isValid` and `errorPath` are not overwritten
        isValid: false,
        errorPath: [],
      };
    }
  } catch (e) {
    if (e.message) {
      return {
        errorMessage: e.message,
        isValid: false,
        errorPath: [],
      };
    }
    console.error(`Exception executing executor function`, e);
    return {
      errorMessage: `Exception in validationFn`,
      isValid: false,
      errorPath: [],
    };
  }
};
