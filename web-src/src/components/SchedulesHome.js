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

const SchedulesHome = (props) => {
  const [triggerList, setTriggerList] = useState({
    triggers: null,
    gettingTriggersInProgress: true,
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
    actionWebInvoke("op-get-triggers", headers, params)
      .then((actionResponse) => {
        const triggerListResponse = actionResponse;
        console.log(triggerListResponse);
        setTriggerList({
          triggers: triggerListResponse,
          gettingTriggersInProgress: false,
        });
      })
      .catch((e) => {
        console.error(e);
        setTriggerList({
          triggers: null,
          gettingTriggersInProgress: false,
        });
        setErrorState({ actionResponseError: e.message });
      });
  }, []);

  return (
    <Grid
      areas={[
        "header   header  header",
        "schdules schdules schdules",
        "footer   footer  footer",
      ]}
      columns={["1fr", "1fr", "1fr"]}
      rows={["size-1000", "auto", "size-1000"]}
      height="size-6000"
      gap="size-100"
    >
      <View gridArea="header">
        <Heading level={1}>Welcome to you Schedules home</Heading>
      </View>
    </Grid>
  );
};
SchedulesHome.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default SchedulesHome;
