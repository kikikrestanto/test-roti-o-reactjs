import { CONSTANT_ALL_ERROR_HTTP } from "../constant";

export const handleExceptionError = (statusCode) =>
    !CONSTANT_ALL_ERROR_HTTP.includes(statusCode);