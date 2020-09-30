"use strict";
const request = require("request");

const { Core } = require("@adobe/aio-sdk");
const {
  errorResponse,
  getBearerToken,
  getIMSOrg,
  stringParameters,
  checkMissingRequestInputs,
} = require("../../utils");

async function getDefinitions(params) {
  // extract the user Bearer token from the input request parameters

  const token = getBearerToken(params);
  // extract the user IMS Org from the input request parameters
  const IMSOrg = getIMSOrg(params);

  return new Promise(function (resolve, reject) {
    try {
      var options = {
        method: "get",
        headers: {
          "x-api-key": params.apiKey,
          "x-gw-ims-org-id": IMSOrg,
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.adobe.xed+json",
          "cache-control": "no-cache",
          "x-sandbox-name": "prod",
        },
        url: "https://platform.adobe.io/data/core/ups/config/mergePolicies",
      };
      console.log(options);
      request(options, function (error, response, body) {
        if (error) reject(error);
        else {
          resolve(JSON.parse(body));
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  // create a Logger
  const logger = Core.Logger("main", { level: params.LOG_LEVEL || "info" });

  try {
    // 'info' is the default level if not set
    logger.info("Calling the main action");

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params));
    console.log(`API Key :${params.apiKey}`);

    // check for missing request input parameters and headers
    const requiredParams = ["apiKey"];
    const requiredHeaders = ["Authorization", "x-gw-ims-org-id"];
    const errorMessage = checkMissingRequestInputs(
      params,
      requiredParams,
      requiredHeaders
    );
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger);
    }

    // get profiles from Campaign Standard
    const mergePolicies = await getDefinitions(params);
    logger.debug("MergePolicies = " + JSON.stringify(mergePolicies, null, 2));
    const response = {
      statusCode: 200,
      body: mergePolicies,
    };

    // log the response status code
    logger.info(`${response.statusCode}: successful request`);
    return response;
  } catch (error) {
    // log any server errors
    logger.error(error);
    // return with 500
    return errorResponse(500, "server error", logger);
  }
}

exports.main = main;
