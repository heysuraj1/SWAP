import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const LineChartComp = ({ chartData }) => {


  var min = Math.min(...chartData.map(item => item.value));
  var max = Math.max(...chartData.map(item => item.value));



  return (
    <LineChart
      width={500}
      height={300}
      data={chartData}

      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="value" stroke="#8884d8" width={2} dot={false} />
      <XAxis dataKey="time" padding={{ left: 20 }} />
      <YAxis domain={[min, max]} />
    </LineChart>
  )
};

export default LineChartComp;
