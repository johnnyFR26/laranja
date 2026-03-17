import * as awsx from "@pulumi/awsx";


export const vpc = new awsx.ec2.Vpc("grove-opportunities-vpc", {
    natGateways: { strategy: "Single" },
});

export const { vpcId, privateSubnetIds, publicSubnetIds } = vpc;