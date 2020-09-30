import React, { useState, useEffect } from "react";

import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryGroup,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryArea,
} from "victory";
const characterData = [
  { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
  { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
  { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 },
];
const RadarChart = (props) => {
  useEffect(() => {
    console.log(`Calling RadarChart`);
  }, []);

  const [state, setState] = useState({ data: null, maxima: null });

  return (
    <VictoryChart polar theme={VictoryTheme.material}>
      {["GAID", "Phone", "Email", "AAID", "ECID"].map((d, i) => {
        return (
          <VictoryPolarAxis
            dependentAxis
            key={i}
            label={d}
            labelPlacement="perpendicular"
            style={{ tickLabels: { fill: "none" } }}
            axisValue={d}
          />
        );
      })}
      <VictoryBar
        style={{ data: { fill: "heatmap", width: 25 } }}
        data={[
          { x: "GAID", y: 10 },
          { x: "Phone", y: 25 },
          { x: "Email", y: 40 },
          { x: "AAID", y: 50 },
          { x: "ECID", y: 50 },
        ]}
      />
    </VictoryChart>
  );
};

export default RadarChart;
