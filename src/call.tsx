import { API, Auth } from "aws-amplify";
import { apiName as api } from "./config";

export const call = async (path: string, body: any) => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  return await API.post(api, path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body,
  });
};
