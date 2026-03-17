import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { vpc } from "./network";

const cfg = new pulumi.Config()
const dbPassword = cfg.requireSecret("dbPassword");

export const dbSg = new aws.ec2.SecurityGroup("db-sg", {
    vpcId: vpc.vpcId,
    ingress: [{
        protocol: "tcp", fromPort: 5432, toPort: 5432,
        cidrBlocks: ["10.0.0.0/16"]
    }]
})

const subnetGroup = new aws.rds.SubnetGroup("db-subnets", {
    subnetIds: vpc.privateSubnetIds
})

export const db = new aws.rds.Instance("db", {
    engine: "postgres",
    engineVersion: "16.2",
    instanceClass: "db.t3.micro",
    allocatedStorage: 20,
    dbName: "grove_opportunities",
    username: "grove_opportunities",
    password: dbPassword,
    dbSubnetGroupName: subnetGroup.name,
    vpcSecurityGroupIds: [dbSg.id],
    skipFinalSnapshot: false,
    finalSnapshotIdentifier: "grove-opportunities-db-snapshot",
    multiAz: false,
})

export const dbUrl = pulumi.interpolate`postgresql://${db.username}:${db.password}@${db.endpoint}/${db.dbName}`;