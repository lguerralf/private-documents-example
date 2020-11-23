import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Context,
} from "aws-lambda";

const bucketName = process.env.DOCUMENTS_BUCKET_NAME;

export const getDocuments = async (
  event: APIGatewayProxyEventV2,
  contenxt: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  console.log(`Bucket name : ${bucketName}`);

  return {
    statusCode: 200,
    body: "Success",
  };
};
