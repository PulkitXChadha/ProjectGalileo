/*
 * <license header>
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Heading,
  Form,
  Picker,
  Grid,
  Button,
  ProgressCircle,
  Item,
  Text,
  View,
} from "@adobe/react-spectrum";

import { actionWebInvoke } from "../utils";

import BrushZoomSegmentChart from "../components/SegmentCharts/BrushZoomSegmentChart";
import RadarChart from "../components/SegmentCharts/RadarChart";
import BarChart from "../components/SegmentCharts/BarChart";

const SegmentationHome = (props) => {
  const [selectedSegment, setSelectedSegment] = useState({
    segmentIDSelected: "",
    segmentSelected: false,
  });

  const [segmentList, setSegmentList] = useState({
    segmentsList: null,
    gettingSegmentsInProgress: true,
  });

  const [segmentJobRunsList, setSegmentJobRunsList] = useState({
    segmentJobRunsList: null,
    gettingSegmentJobRunsList: null,
  });

  const [errorState, setErrorState] = useState({
    actionResponseError: null,
  });

  // Similar to componentDidMount  componentDidUpdate:
  useEffect(() => {
    const headers = {};
    const params = {};

    // set the authorization header and org from the ims props object
    if (props.ims.token && !headers.authorization) {
      headers.authorization = `Bearer ${props.ims.token}`;
    }
    if (props.ims.org && !headers["x-gw-ims-org-id"]) {
      headers["x-gw-ims-org-id"] = props.ims.org;
    }
    actionWebInvoke("aep-segment-def", headers, params)
      .then((actionResponse) => {
        const segmentListResponse = actionResponse.segments.map((segment) => ({
          segmentName: segment.name,
          segmentID: segment.id,
        }));
        console.log(segmentListResponse);
        setSegmentList({
          segmentsList: segmentListResponse,
          gettingSegmentsInProgress: false,
        });
      })
      .catch((e) => {
        console.error(e);
        setSegmentList({
          segmentsList: null,
          gettingSegmentsInProgress: false,
        });
        setErrorState({ actionResponseError: e.message });
      });
  }, []);

  // invokes a the selected backend actions with input headers and params
  async function getSegmentMetrics() {
    setSegmentJobRunsList({
      segmentJobRunsList: {},
      gettingSegmentJobRunsList: true,
    });
    const headers = {};
    const params = {};
    params.segmentID = selectedSegment.segmentIDSelected;
    // set the authorization header and org from the ims props object
    if (props.ims.token && !headers.authorization) {
      headers.authorization = `Bearer ${props.ims.token}`;
    }
    if (props.ims.org && !headers["x-gw-ims-org-id"]) {
      headers["x-gw-ims-org-id"] = props.ims.org;
    }
    try {
      // invoke backend action
      const actionResponse = await actionWebInvoke(
        "aep-segment-jobs",
        headers,
        params
      );

      setSegmentJobRunsList({
        segmentJobRunsList: actionResponse,
        gettingSegmentJobRunsList: false,
      });

      console.log(`Response from Get Segment Jobs:`, actionResponse);
    } catch (e) {
      // log and store any error message
      console.error(e);
      setSegmentJobRunsList({
        segmentJobRunsList: {},
        gettingSegmentJobRunsList: false,
      });
      setErrorState({
        actionResponse: null,
        actionResponseError: e.message,
        actionInvokeInProgress: false,
      });
    }
  }
  return (
    <Grid
      areas={[
        "header   header  header",
        "input    button  progress",
        "result-chart   result-chart  result-radar",
        "result-barchart   result-barchart  result-radar",
        "footer   footer  footer",
      ]}
      columns={["1fr", "1fr", "1fr"]}
      rows={["size-1000", "size-1000", "auto", "auto", "size-1000"]}
      height="size-6000"
      gap="size-100"
    >
      <View gridArea="header">
        <Heading level={1}>Welcome to your Segmentation home</Heading>
      </View>
      <View gridArea="input">
        <ProgressCircle
          aria-label="Getting Segments"
          isIndeterminate
          isHidden={!segmentList.gettingSegmentsInProgress}
          marginStart="size-100"
        />
        {segmentList.segmentsList && (
          <Form necessityIndicator="label">
            <Picker
              label="Segments"
              isRequired={true}
              placeholder="select a segment"
              aria-label="select a segment"
              items={segmentList.segmentsList.map((k) => ({
                displayName: `${k.segmentName}-(${k.segmentID})`,
                segmentName: k.segmentName,
                segmentID: k.segmentID,
              }))}
              itemKey="displayName"
              onSelectionChange={(segmentID) => {
                console.log(` Selected : ${segmentID}`);
                setSelectedSegment({
                  segmentIDSelected: segmentID,
                  segmentSelected: true,
                });
              }}
            >
              {(item) => <Item key={item.segmentID}>{item.displayName}</Item>}
            </Picker>
          </Form>
        )}
      </View>
      <View
        gridArea="button"
        padding={`size-200`}
        marginTop={`size-100`}
        marginBottom={`size-100`}
        borderRadius={`small `}
      >
        <Button
          variant="primary"
          onPress={getSegmentMetrics.bind(this)}
          isDisabled={!selectedSegment.segmentSelected}
        >
          Get Metrics
        </Button>
      </View>
      <View
        gridArea="progress"
        marginTop={`size-100`}
        marginBottom={`size-100`}
        borderRadius={`small `}
      >
        <ProgressCircle
          aria-label="loading"
          isIndeterminate
          isHidden={!segmentJobRunsList.gettingSegmentJobRunsList}
          marginStart="size-100"
        />
      </View>
      <View gridArea="result-chart">
        {segmentJobRunsList.segmentJobRunsList &&
          !segmentJobRunsList.gettingSegmentJobRunsList && (
            <BrushZoomSegmentChart></BrushZoomSegmentChart>
          )}
      </View>
      <View gridArea="result-barchart">
        {segmentJobRunsList.segmentJobRunsList &&
          !segmentJobRunsList.gettingSegmentJobRunsList && (
            <BarChart></BarChart>
          )}
      </View>
      <View gridArea="result-radar">
        {segmentJobRunsList.segmentJobRunsList &&
          !segmentJobRunsList.gettingSegmentJobRunsList && (
            <RadarChart></RadarChart>
          )}
      </View>
      <View gridArea="footer">
        {!segmentList.segmentsList &&
          !segmentList.gettingSegmentsInProgress && (
            <Text>You have no segments !</Text>
          )}
      </View>
    </Grid>
  );
};
SegmentationHome.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default SegmentationHome;
