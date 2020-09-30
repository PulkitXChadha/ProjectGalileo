import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const UnifiedProfileEventTimeline = (props) => {
  var data = [
    {
      eventDate: "2020-09-25T00:00:00Z",
      eventData: "Welcome Email Opened",
      eventType: "emailOpened",
    },
    {
      eventDate: "2020-09-26T00:00:00Z",
      eventData: "emailClick",
      eventType: "emailClick",
    },
    {
      eventDate: "2020-09-27T00:00:00Z",
      eventData: "emailOpened",
      eventType: "emailOpened",
    },
    {
      eventDate: "2020-09-28T00:00:00Z",
      eventData: "webVisit",
      eventType: "webVisit",
    },
    {
      eventDate: "2020-09-29T00:00:00Z",
      eventData: "webVisit",
      eventType: "webVisit",
    },
    {
      eventDate: "2020-09-30T00:00:00Z",
      eventData: "webVisit",
      eventType: "webVisit",
    },
  ];
  return (
    <VerticalTimeline>
      {data.map((evnt) => {
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={evnt.eventDate}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            // icon={<WorkIcon />}
          >
            <h3 className="vertical-timeline-element-title">
              {evnt.eventData}
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              {evnt.eventType}
            </h4>
            <p>
              Creative Direction, User Experience, Visual Design, Project
              Management, Team Leading
            </p>
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
};

export default UnifiedProfileEventTimeline;
