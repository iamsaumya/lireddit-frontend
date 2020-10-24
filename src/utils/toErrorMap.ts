import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const errorMaps: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorMaps[field] = message;
  });

  return errorMaps;
};
