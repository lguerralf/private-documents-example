#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkTypescriptStack } from "../lib/cdk-typescript-stack";
import { Tags } from "@aws-cdk/core";

const app = new cdk.App();
const stack = new CdkTypescriptStack(app, "CdkTypescriptStack", {
  env: {
    region: "us-west-1",
  },
});

Tags.of(stack).add("App", "Lguerra-test-documents");
Tags.of(stack).add("Environment", "Lguerra-test-dev");
