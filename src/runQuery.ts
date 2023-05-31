import { Query } from "./types";

export async function runQuery<T extends Query<any, any>>(
  endpoint: string,
  req: T["req"]
): Promise<T["res"]> {
  // Stub
  return req;
}
