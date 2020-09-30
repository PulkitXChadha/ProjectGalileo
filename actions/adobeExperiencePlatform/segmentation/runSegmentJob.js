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

async function parseSegmentJobPayload(payload, segmentID, next = null) {
  return {
    data: payload.children
      .filter((jobs) => jobs.status === "SUCCEEDED")
      .map((job) => {
        var segJob = {};
        segJob.id = job.id;
        segJob.startTime = new Date(job.metrics.totalTime.startTimeInMs);

        segJob.segmentedProfileCounter =
          job.metrics.segmentedProfileCounter[segmentID] || 0;
        segJob.segmentedProfileByStatusCounter =
          job.metrics.segmentedProfileByStatusCounter[segmentID] || 0;
        segJob.segmentedProfileByNamespaceCounter =
          job.metrics.segmentedProfileByNamespaceCounter[segmentID] || 0;
        return segJob;
      }),
    next: next,
  };
}

async function getJobs(params) {
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
          Authorization: token,
          Accept: "application/vnd.adobe.xed+json",
          "cache-control": "no-cache",
          "x-sandbox-name": "prod",
        },
        url:
          "https://platform.adobe.io/data/core/ups/segment/jobs?start=" +
          params.start +
          "&limit=" +
          params.limit,
      };
      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          const res = parseSegmentJobPayload(
            JSON.parse(body),
            params.segmentID,
            JSON.parse(body)._page.next || null
          );
          resolve(res);
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
  params.start = 0;
  params.limit = 25;
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
    let segmentJobs = [];
    do {
      logger.debug(`Calling getJobs for ${params.start} time`);
      const subsetJobs = await getJobs(params);
      segmentJobs = [...segmentJobs, ...subsetJobs.data];
      params.start = subsetJobs.next;
    } while (params.start);
    logger.debug("segmentJobs = " + JSON.stringify(segmentJobs, null, 2));
    const response = {
      statusCode: 200,
      body: segmentJobs,
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
