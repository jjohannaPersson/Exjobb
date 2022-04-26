import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Link } from "react-router-dom";

const data = [
  { name: "YES", value: 89 },
  { name: "NO", value: 101 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PieChartKids() {
  return (
    <div class="content">
    <h1>Dagisbarn Index</h1>
    <div class="pie">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
        </div>
        <table>
              <tr>
                <th>Dagisbarn (2-3 år)</th>
                <th>Antal MarknadIDM</th>
                <th>Antal A-KUND</th>
                <th>Andel MarknadIDM</th>
                <th>Andel A-KUND</th>
                <th>Index</th>
              </tr>
              <tr>
                <td>NEJ</td>
                <td>7 756 830</td>
                <td>793 121</td>
                <td>94,39%</td>
                <td>95,02%</td>
                <td>101</td>
              </tr>
              <tr>
              <td>JA</td>
              <td>460 891</td>
              <td>41 530</td>
              <td>5,61%</td>
              <td>4,98%</td>
              <td>89</td>
              </tr>
        </table>
        <Link to={`/view`}>
            <button>
                Tillbaka
            </button>
        </Link>
    </div>
  );
}

export default PieChartKids;
