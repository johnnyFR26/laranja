import * as awsx from "@pulumi/awsx";
import * as aws from "@pulumi/aws";
import { dbSg, dbUrl } from "./database";
import { vpc } from "./network";
import * as pulumi from "@pulumi/pulumi";
import { mediaBucketName, mediaCdnUrl, mediaAccessKeyId, mediaSecretAccessKey } from "./storage";


export const repo = new awsx.ecr.Repository("api-repo", {
    forceDelete: true,
})

const cfg = new pulumi.Config()
const jwtSecret = cfg.requireSecret("jwtSecret");
const corsOrigin = cfg.require("corsOrigin");

export const image = new awsx.ecr.Image("api-image", {
    repositoryUrl: repo.url,
    context: "../",
    dockerfile: "../apps/api/Dockerfile",
  })

  const cluster = new aws.ecs.Cluster("main-cluster")

export const service = new awsx.ecs.FargateService("api-service", {
    cluster: cluster.arn,
    networkConfiguration: {
        subnets: vpc.privateSubnetIds,
        securityGroups: [dbSg.id],
    },
    taskDefinitionArgs: {
        containers: {
            api: {
                name: "api",
                image: image.imageUri,
                cpu: 256,
                memory: 512,
                portMappings: [{ containerPort: 3000 }],
                environment: [
                    { name: "DATABASE_URL", value: dbUrl },
                    { name: "JWT_SECRET", value: jwtSecret },
                    { name: "CORS_ORIGIN", value: corsOrigin },
                    { name: "NODE_ENV", value: "production" },
                    { name: "AWS_S3_BUCKET", value: mediaBucketName },
                    { name: "AWS_CDN_URL", value: mediaCdnUrl },
                    { name: "AWS_ACCESS_KEY_ID", value: mediaAccessKeyId },
                    { name: "AWS_SECRET_ACCESS_KEY", value: mediaSecretAccessKey },
                ]
            }
        }
    },
    desiredCount: 1,
})

export const alb = new awsx.lb.ApplicationLoadBalancer("api-alb", {
    subnetIds: vpc.publicSubnetIds,
  });