import { readFileSync } from "fs";
import { join } from "path";

export function getMock(path: string): any[] {
  return JSON.parse(readFileSync(join(process.cwd(), `mocks/${path}`), "utf8"));
}