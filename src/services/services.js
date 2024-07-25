import http from "./axios";
export const getMainData = () => {
  return http.get(
    `https://run.mocky.io/v3/72e7e252-2f2b-462c-8e60-30a8a0cac801`,
    {
      timeout: 30000,
    }
  );
};
