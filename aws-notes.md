# AWS notes

## AWS CLI setup

* https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

## Lambda function deployment using SAM CLI

> Example: https://github.com/unioslight/download-service
  
* The `template.yaml` file specifies the configuration for the Lambda function and its triggering API Gateway (if any)
* Running `sam build` builds the Lambda function. This basically just copies the code files as specified in package.json's `files` field and the `node_modules` folder into a `.aws-sam` folder
* Running `sam deploy --guided` for the first time walks you through the deployment setup. The `samconfig.toml` file is created and contains the configuration for the deployment.
* Subsequent deployments using the `sam deploy` command will update the existing CloudFormation stack, composed of the lambda function itself as an application, an S3 bucket dedicated to SAM which contains the source code in a template format, and an API that triggers the lambda function (if any).

_Note:_ Subsequent deployments upload a new source code template as an s3 bucket object every time.
