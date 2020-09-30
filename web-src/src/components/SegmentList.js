/*
 * <license header>
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Picker, Item } from "@adobe/react-spectrum";

const SegmentList = ({ onSelect, segmentsList }) => {
  return (
    <Picker
      label="Segments"
      isRequired={true}
      placeholder="select a segment"
      aria-label="select a segment"
      items={segmentsList.map((k) => ({
        displayName: `${k.segmentName}-(${k.segmentID})`,
        segmentName: k.segmentName,
        segmentID: k.segmentID,
      }))}
      itemKey="displayName"
      onSelectionChange={onSelect}
    >
      {(item) => <Item key={item.segmentID}>{item.displayName}</Item>}
    </Picker>
  );
};

SegmentList.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default SegmentList;
