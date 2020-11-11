import { Bucket, BucketEncryption } from "@aws-cdk/aws-s3";
import * as cdk from "@aws-cdk/core";
import { Tags } from "@aws-cdk/core";
import { Networking } from "./networking";

export class CdkTypescriptStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "DocumentBucket", {
      encryption: BucketEncryption.S3_MANAGED,
    });

    new cdk.CfnOutput(this, "DocumentsBucketNameExport", {
      value: bucket.bucketName,
      exportName: "DocumentsBucketName",
    });

    const networking = new Networking(this, "NetworkingConstruct", {
      maxAzs: 2,
    });

    Tags.of(networking).add("Module", "networking");
  }
}
