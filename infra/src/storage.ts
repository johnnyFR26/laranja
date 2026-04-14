import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// ── S3 bucket for user-generated media (avatars, establishment logos, offer images) ──
export const mediaBucket = new aws.s3.BucketV2("media-bucket", {
    forceDestroy: true,
});

new aws.s3.BucketPublicAccessBlock("media-block", {
    bucket: mediaBucket.id,
    blockPublicAcls: true,
    blockPublicPolicy: true,
    ignorePublicAcls: true,
    restrictPublicBuckets: true,
});

// CORS – allow the API (and dev tooling) to PUT objects directly
new aws.s3.BucketCorsConfigurationV2("media-cors", {
    bucket: mediaBucket.id,
    corsRules: [{
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
        allowedOrigins: ["*"],
        exposeHeaders: ["ETag"],
        maxAgeSeconds: 3000,
    }],
});

// ── CloudFront OAC so the CDN can read the private bucket ──
const mediaOac = new aws.cloudfront.OriginAccessControl("media-oac", {
    originAccessControlOriginType: "s3",
    signingBehavior: "always",
    signingProtocol: "sigv4",
});

export const mediaCdn = new aws.cloudfront.Distribution("media-cdn", {
    enabled: true,
    origins: [{
        domainName: mediaBucket.bucketRegionalDomainName,
        originId: "media-s3-origin",
        originAccessControlId: mediaOac.id,
    }],
    defaultCacheBehavior: {
        targetOriginId: "media-s3-origin",
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: ["GET", "HEAD"],
        cachedMethods: ["GET", "HEAD"],
        forwardedValues: { queryString: false, cookies: { forward: "none" } },
    },
    restrictions: { geoRestriction: { restrictionType: "none" } },
    viewerCertificate: { cloudfrontDefaultCertificate: true },
});

// Grant CloudFront OAC read access to the bucket
new aws.s3.BucketPolicy("media-bucket-policy", {
    bucket: mediaBucket.id,
    policy: pulumi.all([mediaBucket.arn, mediaCdn.arn]).apply(
        ([bucketArn, distributionArn]) =>
            JSON.stringify({
                Version: "2012-10-17",
                Statement: [{
                    Sid: "AllowCloudFrontServicePrincipal",
                    Effect: "Allow",
                    Principal: { Service: "cloudfront.amazonaws.com" },
                    Action: "s3:GetObject",
                    Resource: `${bucketArn}/*`,
                    Condition: {
                        StringEquals: {
                            "AWS:SourceArn": distributionArn,
                        },
                    },
                }],
            }),
    ),
});

// ── IAM user for the API service to upload objects ──
const mediaUser = new aws.iam.User("media-uploader", {
    name: "grove-media-uploader",
});

new aws.iam.UserPolicy("media-uploader-policy", {
    user: mediaUser.name,
    policy: mediaBucket.arn.apply((arn) =>
        JSON.stringify({
            Version: "2012-10-17",
            Statement: [{
                Effect: "Allow",
                Action: ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
                Resource: `${arn}/*`,
            }],
        }),
    ),
});

const mediaAccessKey = new aws.iam.AccessKey("media-uploader-key", {
    user: mediaUser.name,
});

// ── Exported values (consumed by the backend task definition and CI) ──
export const mediaBucketName = mediaBucket.id;
export const mediaCdnUrl = pulumi.interpolate`https://${mediaCdn.domainName}`;
export const mediaAccessKeyId = mediaAccessKey.id;
export const mediaSecretAccessKey = mediaAccessKey.secret;
