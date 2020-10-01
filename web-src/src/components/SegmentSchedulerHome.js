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
  Flex,
  Divider,
} from "@adobe/react-spectrum";

import { actionWebInvoke } from "../utils";

const SegmentSchedulerHome = (props) => {
  const [scheduleList, setScheduleList] = useState({
    schedules: [
      { name: "Daily" },
      { name: "Weekly" },
      { name: "Monthly" },
      { name: "Quaterly" },
    ],
    sscheduleSelected: true,
  });

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
        "segementName    schedule  button",
        "footer   footer  footer",
      ]}
      columns={["1fr", "1fr", "1fr"]}
      rows={["size-1000", "size-1000", "auto", "auto", "size-1000"]}
      height="size-6000"
      gap="size-100"
    >
      <View gridArea="header">
        <Heading level={1}>Welcome to Segment Scheduler </Heading>
      </View>
      <View gridArea="segementName">
        <ProgressCircle
          aria-label="Getting Segments"
          isIndeterminate
          isHidden={!segmentList.gettingSegmentsInProgress}
          marginStart="size-100"
        />
        {segmentList.segmentsList && (
          <View gridArea="segementName">
            {segmentList.segmentsList.map((k) => (
              <Flex gap="size-125">
                <View gridArea="segementName">
                  <Text>{`${k.segmentName}-(${k.segmentID})`}</Text>
                </View>

                <Divider orientation="vertical" />
                <View
                  gridArea="schedule"
                  padding={`size-200`}
                  marginTop={`size-100`}
                  marginBottom={`size-100`}
                  borderRadius={`small `}
                >
                  <Picker
                    label="Schedule"
                    isRequired={true}
                    placeholder="select a schedule"
                    aria-label="select a segment"
                    items={scheduleList.schedules.map((k) => ({
                      displayName: `${k.name}`,
                    }))}
                    itemKey="displayName"
                    onSelectionChange={(schedule) => {
                      console.log(` Selected : ${schedule}`);
                      setSelectedSegment({
                        segmentIDSelected: segmentID,
                        segmentSelected: true,
                      });
                    }}
                  >
                    {(item) => (
                      <Item key={item.displayName}>{item.displayName}</Item>
                    )}
                  </Picker>
                </View>
                <Divider orientation="vertical" />
                <View
                  gridArea="button"
                  padding={`size-200`}
                  marginTop={`size-100`}
                  marginBottom={`size-100`}
                  borderRadius={`small `}
                >
                  <Button
                    variant="primary"
                    // onPress={.bind(this)}
                    // isDisabled={!selectedSegment.segmentSelected}
                  >
                    Set Schedule
                  </Button>
                </View>
                <Divider />
              </Flex>
            ))}
          </View>
        )}
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
SegmentSchedulerHome.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default SegmentSchedulerHome;
