import React, { useState, useEffect } from "react";

import {
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryBar,
  VictoryStack,
  VictoryGroup,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryArea,
} from "victory";

const sampleData = [
  {
    id: "88324a25-e344-48fe-b2e9-c1157e2678bd",
    startTime: "2020-08-22T12:30:01.726Z",
    totalProfiles: 10004630,
    segmentedProfileCounter: 22011,
    segmentedProfileByStatusCounter: { realized: 22011 },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 22011 },
  },
  {
    id: "39f6e4b1-e401-486b-96f0-145bc72133bf",
    startTime: "2020-08-22T13:35:48.407Z",
    totalProfiles: 11140721,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "2dc8a57f-b692-46c8-90f2-51e867dfa7b4",
    startTime: "2020-08-22T14:34:19.026Z",
    totalProfiles: 11140721,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "52fdb381-5262-47cc-a839-98bec002271c",
    startTime: "2020-08-22T15:46:33.518Z",
    totalProfiles: 11140725,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "dcac640e-c3e7-47c0-8719-b0706d701a4e",
    startTime: "2020-08-22T16:31:37.876Z",
    totalProfiles: 11140727,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "f3e7d5fe-5db7-4ccf-98cd-b95c7cb5631d",
    startTime: "2020-08-22T17:14:59.397Z",
    totalProfiles: 11140728,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "1eceebd5-553f-4325-ae3f-4e2187c48f17",
    startTime: "2020-08-24T12:57:48.277Z",
    totalProfiles: 11140863,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "bb25f2b7-6638-42e1-add7-22152f76eb5a",
    startTime: "2020-08-26T19:45:46.917Z",
    totalProfiles: 11898412,
    segmentedProfileCounter: 21468,
    segmentedProfileByStatusCounter: {
      existing: 19987,
      exited: 2024,
      realized: 1481,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 21468 },
  },
  {
    id: "b18dfbc7-e2e1-4563-8f91-72f0c41ed792",
    startTime: "2020-08-27T16:11:59.266Z",
    totalProfiles: 11898520,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "a3169ea0-330c-4736-aad2-0aa2150a9f80",
    startTime: "2020-08-27T19:46:06.616Z",
    totalProfiles: 11898538,
    segmentedProfileCounter: 21409,
    segmentedProfileByStatusCounter: {
      existing: 20991,
      exited: 2501,
      realized: 418,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 21409 },
  },
  {
    id: "c7079865-353f-4235-a803-0d62bb472869",
    startTime: "2020-08-28T13:49:59.556Z",
    totalProfiles: 11898715,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "20c336ef-c729-4e2b-bee2-d58e073da4df",
    startTime: "2020-08-28T14:02:45.156Z",
    totalProfiles: 11898720,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "76127328-fc2f-4c66-94b9-df8901007fc6",
    startTime: "2020-08-28T14:12:36.096Z",
    totalProfiles: 11898724,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "c00118c0-a738-4708-9975-449b6ec27a68",
    startTime: "2020-08-28T14:27:20.766Z",
    totalProfiles: 11898730,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "73f43afb-1e1a-4849-854b-3943448027ad",
    startTime: "2020-08-28T14:50:49.796Z",
    totalProfiles: 11898732,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "5133f485-8385-4f83-a224-8319ffb3d84f",
    startTime: "2020-08-28T15:02:31.476Z",
    totalProfiles: 11898735,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "d8eeb64d-bd47-41d8-a10f-ec6ca0015b26",
    startTime: "2020-08-28T15:32:58.816Z",
    totalProfiles: 11898741,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "ac14a4f3-96b9-44b1-b065-da11e1ffff48",
    startTime: "2020-08-28T15:41:28.976Z",
    totalProfiles: 11898741,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "b965b5b0-e044-44b3-adb1-d4f5183117fd",
    startTime: "2020-08-28T19:46:53.656Z",
    totalProfiles: 11898789,
    segmentedProfileCounter: 21532,
    segmentedProfileByStatusCounter: {
      existing: 21031,
      exited: 2879,
      realized: 501,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 21532 },
  },
  {
    id: "615408d9-2bc7-47e8-bdf2-20b62555b9df",
    startTime: "2020-08-29T19:45:30.676Z",
    totalProfiles: 11898875,
    segmentedProfileCounter: 21558,
    segmentedProfileByStatusCounter: {
      existing: 21317,
      exited: 3094,
      realized: 241,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 21558 },
  },
  {
    id: "13674a75-b617-4e05-9991-830189a27162",
    startTime: "2020-08-30T19:46:13.286Z",
    totalProfiles: 11898953,
    segmentedProfileCounter: 21557,
    segmentedProfileByStatusCounter: {
      existing: 21428,
      exited: 3224,
      realized: 129,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 21557 },
  },
  {
    id: "cb29484b-3fd1-42b7-b16a-db6ec6f3f60f",
    startTime: "2020-08-31T19:46:07.047Z",
    totalProfiles: 11899144,
    segmentedProfileCounter: 20985,
    segmentedProfileByStatusCounter: { existing: 20985, exited: 3796 },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20985 },
  },
  {
    id: "e7026e8f-56b6-4f89-b4c0-053cf05596b4",
    startTime: "2020-09-01T19:45:23.827Z",
    totalProfiles: 11899417,
    segmentedProfileCounter: 20728,
    segmentedProfileByStatusCounter: {
      existing: 20364,
      exited: 4417,
      realized: 364,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20728 },
  },
  {
    id: "910c8bb5-8643-4db3-9b52-8059b2f8bde2",
    startTime: "2020-09-02T19:45:01.826Z",
    totalProfiles: 11899671,
    segmentedProfileCounter: 20642,
    segmentedProfileByStatusCounter: {
      existing: 20313,
      exited: 4832,
      realized: 329,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20642 },
  },
  {
    id: "d7186a47-4b27-4139-8ff9-1a09ce96e4cf",
    startTime: "2020-09-03T16:46:35.961Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "c8dfcc55-25b6-4fed-940a-8b4b0930fb7c",
    startTime: "2020-09-03T16:49:46.302Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "1ecbfeb5-edbb-4b64-b9d6-88553b68f6af",
    startTime: "2020-09-03T19:45:31.781Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20680,
    segmentedProfileByStatusCounter: {
      existing: 20267,
      exited: 5207,
      realized: 413,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20680 },
  },
  {
    id: "b2695791-4250-4d0c-8852-336d66c62bf0",
    startTime: "2020-09-04T14:52:05.487Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "d954cfa3-446f-485c-83c8-129715a9e0d3",
    startTime: "2020-09-04T19:46:06.285Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20774,
    segmentedProfileByStatusCounter: {
      existing: 20329,
      exited: 5558,
      realized: 445,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20774 },
  },
  {
    id: "83fe904d-ff24-40a9-b7b7-34a5ad0905e8",
    startTime: "2020-09-05T19:46:19.997Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20975,
    segmentedProfileByStatusCounter: {
      existing: 20613,
      exited: 5719,
      realized: 362,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20975 },
  },
  {
    id: "33a752fa-4726-48b5-9415-f89acbb4628d",
    startTime: "2020-09-06T19:45:12.671Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 21125,
    segmentedProfileByStatusCounter: {
      existing: 20883,
      exited: 5811,
      realized: 242,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 21125 },
  },
  {
    id: "39784035-5a20-42d1-a277-a3ed04d18a4c",
    startTime: "2020-09-07T19:45:59.337Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20843,
    segmentedProfileByStatusCounter: {
      existing: 20726,
      exited: 6210,
      realized: 117,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20843 },
  },
  {
    id: "2dad9053-6d1c-4402-a128-50643469734a",
    startTime: "2020-09-08T19:46:00.937Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20832,
    segmentedProfileByStatusCounter: {
      existing: 20460,
      exited: 6593,
      realized: 372,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20832 },
  },
  {
    id: "5f28f05a-7e96-4c04-b506-8547970f3505",
    startTime: "2020-09-08T21:40:59.872Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "b895a12a-530e-46ce-9fdf-d07d550912ad",
    startTime: "2020-09-08T21:41:35.067Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "4b9ba7ed-377c-49ee-8707-6766aec85cc6",
    startTime: "2020-09-08T21:42:35.487Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "2fc69eac-1970-4178-b892-0de386ec32f0",
    startTime: "2020-09-09T02:01:29.327Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "f7bf8769-47a9-4449-b690-093fdf80c000",
    startTime: "2020-09-09T02:05:11.351Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "97fe59e0-8f62-4234-bafc-584af30f812e",
    startTime: "2020-09-09T02:08:21.522Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "cabddc54-914a-4fab-85a9-9e13239913b5",
    startTime: "2020-09-09T02:08:50.887Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "031690b4-df93-41d3-ba53-49736dfb89ad",
    startTime: "2020-09-09T05:35:17.478Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "7fb928e2-0ec3-4569-a3a2-35129ab82f0b",
    startTime: "2020-09-09T19:46:01.627Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20894,
    segmentedProfileByStatusCounter: {
      existing: 20484,
      exited: 6941,
      realized: 410,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20894 },
  },
  {
    id: "2c2d7d18-a4f3-4a5b-9934-edcb8f3a4550",
    startTime: "2020-09-09T20:48:40.167Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 0,
    segmentedProfileByStatusCounter: 0,
    segmentedProfileByNamespaceCounter: 0,
  },
  {
    id: "036d49af-20df-494f-974a-27b1a62e1183",
    startTime: "2020-09-10T19:45:52.335Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20816,
    segmentedProfileByStatusCounter: {
      existing: 20415,
      exited: 7420,
      realized: 401,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20816 },
  },
  {
    id: "6c1a6814-3c9c-43be-a6b4-dc8e536f8fb0",
    startTime: "2020-09-11T19:45:34.762Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20911,
    segmentedProfileByStatusCounter: {
      existing: 20417,
      exited: 7819,
      realized: 494,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20911 },
  },
  {
    id: "eac55f92-a71f-4c51-9856-15d0be87c6ee",
    startTime: "2020-09-12T19:46:35.982Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 21171,
    segmentedProfileByStatusCounter: {
      existing: 20710,
      exited: 8020,
      realized: 461,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 21171 },
  },
  {
    id: "a453ec1a-f281-4343-9b55-7d4624d31037",
    startTime: "2020-09-13T19:45:20.952Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 21298,
    segmentedProfileByStatusCounter: {
      existing: 21047,
      exited: 8144,
      realized: 251,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 21298 },
  },
  {
    id: "ed8ab626-a33a-4809-9193-c28142daeb86",
    startTime: "2020-09-14T19:45:43.274Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20996,
    segmentedProfileByStatusCounter: {
      existing: 20876,
      exited: 8566,
      realized: 120,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20996 },
  },
  {
    id: "04b9abfe-7b51-4392-88a1-7a7f6dd74cac",
    startTime: "2020-09-15T19:46:36.232Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20934,
    segmentedProfileByStatusCounter: {
      existing: 20573,
      exited: 8989,
      realized: 361,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20934 },
  },
  {
    id: "501c4830-98b4-44e5-92e4-216f4881339b",
    startTime: "2020-09-16T19:46:20.782Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20873,
    segmentedProfileByStatusCounter: {
      existing: 20531,
      exited: 9392,
      realized: 342,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20873 },
  },
  {
    id: "8181ed9e-a851-4aa9-98ef-478f55c7b2f9",
    startTime: "2020-09-17T19:45:53.745Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20894,
    segmentedProfileByStatusCounter: {
      existing: 20474,
      exited: 9791,
      realized: 420,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20894 },
  },
  {
    id: "62b40a55-e48b-426a-a22a-96beccf645d7",
    startTime: "2020-09-18T19:45:39.882Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20164,
    segmentedProfileByStatusCounter: {
      existing: 19827,
      exited: 10858,
      realized: 337,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20164 },
  },
  {
    id: "134974f7-37bd-424e-8eed-49ccf188f1f2",
    startTime: "2020-09-19T19:45:57.565Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20347,
    segmentedProfileByStatusCounter: {
      existing: 19956,
      exited: 11066,
      realized: 391,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20347 },
  },
  {
    id: "e909e46f-136a-4c85-932e-df1c17d8d6c5",
    startTime: "2020-09-20T19:45:27.372Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20415,
    segmentedProfileByStatusCounter: {
      existing: 20240,
      exited: 11173,
      realized: 175,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20415 },
  },
  {
    id: "8107ba9c-2dad-4f68-88d4-a54788c7e39b",
    startTime: "2020-09-21T19:46:30.042Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20081,
    segmentedProfileByStatusCounter: {
      existing: 19977,
      exited: 11611,
      realized: 104,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20081 },
  },
  {
    id: "070dd391-9c5f-4e39-9f67-a1e812ddf3f2",
    startTime: "2020-09-22T19:46:22.392Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20031,
    segmentedProfileByStatusCounter: {
      existing: 19684,
      exited: 12008,
      realized: 347,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20031 },
  },
  {
    id: "99c52cce-6a67-4a22-9629-c2a44b49061c",
    startTime: "2020-09-23T19:46:31.402Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 19844,
    segmentedProfileByStatusCounter: {
      existing: 19544,
      exited: 12495,
      realized: 300,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 19844 },
  },
  {
    id: "b39728c4-b05e-4607-9ea4-0716224d5a1b",
    startTime: "2020-09-24T19:45:29.255Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 19881,
    segmentedProfileByStatusCounter: {
      existing: 19498,
      exited: 12841,
      realized: 383,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 19881 },
  },
  {
    id: "dcb2f93b-c6c9-46ac-8d57-7004c42ff13d",
    startTime: "2020-09-25T19:46:37.321Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 19872,
    segmentedProfileByStatusCounter: {
      existing: 19515,
      exited: 13207,
      realized: 357,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 19872 },
  },
  {
    id: "b8f02d59-f8ed-471a-a584-2eb33a900a84",
    startTime: "2020-09-26T19:45:34.164Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20296,
    segmentedProfileByStatusCounter: {
      existing: 19707,
      exited: 13372,
      realized: 589,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20296 },
  },
  {
    id: "be024c31-3a52-4f51-92ba-a86c26fa12c0",
    startTime: "2020-09-27T19:45:13.641Z",
    totalProfiles: 11899852,
    segmentedProfileCounter: 20438,
    segmentedProfileByStatusCounter: {
      existing: 20205,
      exited: 13463,
      realized: 233,
    },
    segmentedProfileByNamespaceCounter: { cust_line_level_combo: 20438 },
  },
];
const BarChart = (props) => {
  useEffect(() => {
    console.log(`Calling BarChart`);
  }, []);

  const [state, setState] = useState({ data: null, maxima: null });

  return (
    <VictoryChart
      width={1200}
      height={600}
      theme={VictoryTheme.material}
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      domainPadding={20}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={sampleData.map((k) => k.startTime)}
        // tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={(x) => `${x / 1000}k`}
      />
      <VictoryStack colorScale={["red", "darkblue", "darkgreen"]}>
        <VictoryBar
          data={sampleData.map((key, i) => {
            return {
              x: i,
              y: -key.segmentedProfileByStatusCounter["exited"] || 0,
            };
          })}
        />
        <VictoryBar
          data={sampleData.map((key, i) => {
            return {
              x: i,
              y: key.segmentedProfileByStatusCounter["existing"] || 0,
            };
          })}
        />
        <VictoryBar
          data={sampleData.map((key, i) => {
            return {
              x: i,
              y: key.segmentedProfileByStatusCounter["realized"] || 0,
            };
          })}
        />
      </VictoryStack>
    </VictoryChart>
  );
};

export default BarChart;
