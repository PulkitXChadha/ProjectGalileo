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
  TextField,
  Item,
  Text,
  View,
} from "@adobe/react-spectrum";

import { actionWebInvoke } from "../utils";

import UnifiedProfileGraph from "../components/UnifiedProfileView/UnifiedProfileGraph";

import UnifiedProfileEventTimeline from "../components/UnifiedProfileView/UnifiedProfileEventTimeline";

const UnifiedProfileHome = (props) => {
  const [errorState, setErrorState] = useState({
    actionResponseError: null,
  });

  let [value, setValue] = React.useState("william_schmidt@insightb.com");

  const [mergePolicyList, setMergePolicyList] = useState({
    mergePolicies: null,
    gettingMergePoliciesInProgress: true,
  });
  const [selectedMergePolicy, setSelectedMergePolicy] = useState({
    mergePolicyIDSelected: "",
    mergePolicySelected: false,
  });

  const [identityNamespacesList, setIdentityNamespaces] = useState({
    identityNamespaces: null,
    gettingidentityNamespacesInProgress: true,
  });
  const [selectedIdentity, setSelectedIdentity] = useState({
    identityCodeSelected: "",
    identitySelected: false,
  });
  const showProfile = null;
  const [profile, setProfile] = useState(null);
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
    actionWebInvoke("aep-mergepolicy-def", headers, params)
      .then((actionResponse) => {
        const mergePoclicyListResponse = actionResponse.children.map(
          (mergePolicy) => ({
            mergePolicyName: mergePolicy.name,
            mergePolicyID: mergePolicy.id,
          })
        );
        console.log(mergePoclicyListResponse);
        setMergePolicyList({
          mergePolicies: mergePoclicyListResponse,
          gettingMergePoliciesInProgress: false,
        });
      })
      .catch((e) => {
        console.error(e);
        setMergePolicyList({
          mergePolicies: null,
          gettingMergePoliciesInProgress: false,
        });
        setErrorState({ actionResponseError: e.message });
      });

    actionWebInvoke("aep-identitynamespace-def", headers, params)
      .then((actionResponse) => {
        const identitiesResponse = actionResponse.map((identity) => ({
          identityName: identity.name,
          identityCode: identity.code,
        }));
        console.log(identitiesResponse);
        setIdentityNamespaces({
          identityNamespaces: identitiesResponse,
          gettingidentityNamespacesInProgress: false,
        });
      })
      .catch((e) => {
        console.error(e);
        setIdentityNamespaces({
          identityNamespaces: null,
          gettingidentityNamespacesInProgress: false,
        });
        setErrorState({ actionResponseError: e.message });
      });
  }, []);

  // invokes a the selected backend actions with input headers and params
  async function getProfile() {
    const headers = {};
    const params = {
      identityNamespace: selectedIdentity.identityCodeSelected,
      mergePolicyId: selectedMergePolicy.mergePolicyIDSelected,
      identityValue: value,
    };
    console.log(params.identityNamespace);
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
        "aep-unified-profile",
        headers,
        params
      );

      setProfile(actionResponse);

      console.log(`Response from Get Unified Profile`, actionResponse);
    } catch (e) {
      // log and store any error message
      console.error(e);
      setProfile(null);
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
        "header         header          header        header",
        "input-merge    input-identity  input-value   button",
        "result-graph   result-graph    result-timeline        result-timeline",
        "footer         footer          footer        footer",
      ]}
      columns={["1fr", "1fr", "1fr", "1fr"]}
      rows={["size-1000", "size-1000", "auto", "size-1000"]}
      height="size-6000"
      gap="size-100"
    >
      <View gridArea="header">
        <Heading level={1}>Welcome to Unified Profile home</Heading>
      </View>
      <View gridArea="input-merge">
        <ProgressCircle
          aria-label="Getting MergePolicies"
          isIndeterminate
          isHidden={!mergePolicyList.gettingMergePoliciesInProgress}
          marginStart="size-100"
        />
        {mergePolicyList.mergePolicies && (
          <Form necessityIndicator="label">
            <Picker
              label="Merge Policy"
              isRequired={true}
              placeholder="Select a Merge Policy"
              aria-label="Select a Merge Policy"
              items={mergePolicyList.mergePolicies.map((k) => ({
                displayName: `${k.mergePolicyName}-(${k.mergePolicyID})`,
                mergePolicyName: k.mergePolicyName,
                mergePolicyID: k.mergePolicyID,
              }))}
              itemKey="displayName"
              onSelectionChange={(mergePolicyID) => {
                console.log(` Selected : ${mergePolicyID}`);
                setSelectedMergePolicy({
                  mergePolicyIDSelected: mergePolicyID,
                  mergePolicySelected: true,
                });
              }}
            >
              {(item) => (
                <Item key={item.mergePolicyID}>{item.displayName}</Item>
              )}
            </Picker>
          </Form>
        )}
      </View>
      <View gridArea="input-identity">
        <ProgressCircle
          aria-label="Getting IdentityNamespaces"
          isIndeterminate
          isHidden={!identityNamespacesList.gettingidentityNamespacesInProgress}
          marginStart="size-100"
        />
        {identityNamespacesList.identityNamespaces && (
          <Form necessityIndicator="label">
            <Picker
              label="Identity Namespace"
              isRequired={true}
              placeholder="Select a Identity Namespace"
              aria-label="Select a Identity Namespace"
              items={identityNamespacesList.identityNamespaces.map((k) => ({
                displayName: `${k.identityName}-(${k.identityCode})`,
                identityName: k.identityName,
                identityCode: k.identityCode,
              }))}
              itemKey="displayName"
              onSelectionChange={(identityCode) => {
                console.log(` Selected : ${identityCode}`);
                setSelectedIdentity({
                  identityCodeSelected: identityCode,
                  identitySelected: true,
                });
              }}
            >
              {(item) => (
                <Item key={item.identityCode}>{item.displayName}</Item>
              )}
            </Picker>
          </Form>
        )}
      </View>
      {selectedMergePolicy.mergePolicySelected &&
        selectedIdentity.identityCodeSelected && (
          <View gridArea="input-value">
            <TextField
              label="Email (Controlled)"
              value={value}
              onChange={setValue}
            />
          </View>
        )}
      <View
        gridArea="button"
        padding={`size-200`}
        marginTop={`size-100`}
        marginBottom={`size-100`}
        borderRadius={`small `}
      >
        <Button
          variant="primary"
          onPress={getProfile.bind(this)}
          isDisabled={
            !(
              selectedMergePolicy.mergePolicySelected &&
              selectedIdentity.identityCodeSelected
            )
          }
        >
          Get Metrics
        </Button>
      </View>
      {profile && (
        <View gridArea="result-graph">
          <UnifiedProfileGraph></UnifiedProfileGraph>
          <UnifiedProfileEventTimeline></UnifiedProfileEventTimeline>
        </View>
      )}
      <View gridArea="footer">
        {!mergePolicyList.mergePolicies &&
          !mergePolicyList.gettingMergePoliciesInProgress && (
            <Text>You have no MergePolicies!</Text>
          )}
      </View>
    </Grid>
  );
};
UnifiedProfileHome.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default UnifiedProfileHome;
