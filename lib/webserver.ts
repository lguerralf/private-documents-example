import * as cdk from '@aws-cdk/core';
import { Construct } from "@aws-cdk/core";
import * as path from "path";
import { DockerImageAsset } from "@aws-cdk/aws-ecr-assets";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecsp from "@aws-cdk/aws-ecs-patterns";
import * as ecs from "@aws-cdk/aws-ecs";
import * as apig from "@aws-cdk/aws-apigatewayv2";

export interface DocumentManagementWebserverProps {
  vpc: ec2.IVpc;
  api: apig.HttpApi;
}

export class DocumentManagementWebserver extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: DocumentManagementWebserverProps
  ) {
    super(scope, id);

    const webserverDocker = new DockerImageAsset(this, "WebserverDockerAsset", {
      directory: path.join(__dirname, "..", "containers", "webserver"),
    });

    const fargateService = new ecsp.ApplicationLoadBalancedFargateService(this, 'webserverfargate', {
      vpc: props.vpc,
      taskImageOptions: {
        image: ecs.ContainerImage.fromDockerImageAsset(webserverDocker),
        environment: {
          SERVER_PORT: '8080',
          API_BASE: props.api.url!
        },
        containerPort: 8080
      }
    });

    new cdk.CfnOutput(this, "webserverHost", {
      exportName: "webserverHost",
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });

  }
}
