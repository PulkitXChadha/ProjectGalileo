"use strict";

const payload = require("./sampleSegmentJobs.json");
const segmentID = "1469fe33-5f30-4bab-9203-661df8deb76d";

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  return payload.children
    .filter((jobs) => jobs.status === "SUCCEEDED")
    .map((job) => {
      var segJob = {};
      segJob.id = job.id;
      segJob.startTime = new Date(job.metrics.totalTime.startTimeInMs);
      segJob.totalProfiles = job.metrics.totalProfiles;
      segJob.segmentedProfileCounter =
        job.metrics.segmentedProfileCounter[segmentID] || 0;
      segJob.segmentedProfileByStatusCounter =
        job.metrics.segmentedProfileByStatusCounter[segmentID] || 0;
      segJob.segmentedProfileByNamespaceCounter =
        job.metrics.segmentedProfileByNamespaceCounter[segmentID] || 0;
      console.log(segJob);
    });
}

exports.main = main;
exports.main = main;
