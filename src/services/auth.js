import ApiHelper from "./api";

export const login = (data) =>
  ApiHelper.call(`/auth/login`, "POST", false, data);
