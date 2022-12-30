import {
  Job,
  JOB_STATUSES,
  ArcGISIdentityManager,
} from "@esri/arcgis-rest-request";
import { getSelf } from "@esri/arcgis-rest-portal";

const getAnalysisUrl = async (withAuth) => {
  const portalSelf = await getSelf({
    authentication: withAuth,
  });

  return portalSelf.helperServices.analysis.url;
};

const generateTessellations = async () => {
  const auth = await ArcGISIdentityManager.fromToken({
    token: "<ACCESS_TOKEN>", // Token representing an ArcGIS Identity from OAuth 2.0
  });

  const analysisUrl = await getAnalysisUrl(auth);

  const operationUrl = `${analysisUrl}/GenerateTessellations/submitJob`;

  const params = {
    binSize: 1,
    binType: "Hexagon",
    binSizeUnit: "Miles",
    extentLayer: {
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Boundary/FeatureServer/0",
    },
    intersectStudyArea: true,
    outputName: {
      serviceProperties: { name: "Generate hexagon bins" }, // Outputs results as a hosted feature layer.
    },
  };

  const jobReq = await Job.submitJob({
    url: operationUrl,
    params: params,
    authentication: auth,
  });

  // listen to the status event to get updates every time the job status is checked.
  jobReq.on(JOB_STATUSES.Status, (jobInfo) => {
    console.log(jobInfo.status);
  });

  // get all the results, this will start monitoring and trigger events
  const jobResp = await jobReq.getAllResults();

  console.log(jobResp);
};
