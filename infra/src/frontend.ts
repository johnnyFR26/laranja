import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export const bucket = new aws.s3.BucketV2("frontend-bucket", {
  forceDestroy: true,
});

new aws.s3.BucketPublicAccessBlock("frontend-block", {
  bucket: bucket.id,
  blockPublicAcls: true,
  blockPublicPolicy: true,
});

const oac = new aws.cloudfront.OriginAccessControl("oac", {
  originAccessControlOriginType: "s3",
  signingBehavior: "always",
  signingProtocol: "sigv4",
});

export const cdn = new aws.cloudfront.Distribution("cdn", {
  enabled: true,
  defaultRootObject: "index.html",
  origins: [{
    domainName: bucket.bucketRegionalDomainName,
    originId: "s3-origin",
    originAccessControlId: oac.id,
  }],
  defaultCacheBehavior: {
    targetOriginId: "s3-origin",
    viewerProtocolPolicy: "redirect-to-https",
    allowedMethods: ["GET", "HEAD"],
    cachedMethods:  ["GET", "HEAD"],
    forwardedValues: { queryString: false, cookies: { forward: "none" } },
  },
  restrictions: { geoRestriction: { restrictionType: "none" } },
  viewerCertificate: { cloudfrontDefaultCertificate: true },
});