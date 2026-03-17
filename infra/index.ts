import "./src/network";
import "./src/database";
import "./src/backend";
import { cdn, bucket } from "./src/frontend";

export const frontendUrl   = cdn.domainName;
export const frontendBucket = bucket.bucket;