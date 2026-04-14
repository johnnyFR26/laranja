import "./src/network";
import "./src/database";
import "./src/backend";
import { cdn, bucket } from "./src/frontend";
import { mediaBucketName, mediaCdnUrl, mediaAccessKeyId, mediaSecretAccessKey } from "./src/storage";

export const frontendUrl   = cdn.domainName;
export const frontendBucket = bucket.bucket;

export { mediaBucketName, mediaCdnUrl, mediaAccessKeyId, mediaSecretAccessKey };