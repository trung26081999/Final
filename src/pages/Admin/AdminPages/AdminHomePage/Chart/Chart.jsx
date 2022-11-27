import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Chart.css";
const data = [
  { name: "January", Total: 1000 },
  { name: "February", Total: 1000 },
  { name: "March", Total: 2000 },
  { name: "April", Total: 1200 },
  { name: "May", Total: 500 },
  { name: "June", Total: 800 },
  { name: "july", Total: 3000 },
  { name: "August", Total: 3000 },
  { name: "September ", Total: "" },
  { name: "October  ", Total: "" },
  { name: "November  ", Total: "" },
  { name: "December  ", Total: "" },
];
function Chart() {
  return (
    <div className="chart">
      <div>Last 6 Months (Revenue)</div>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
