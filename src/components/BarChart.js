import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";
import { Link } from "react-router-dom";

// const data = [
//   {
//     name: 'Age 10-20',
//     house: 0,
//     apartment: 0,
//     unknown: 0,
//   },
//   {
//     name: 'Age 20-30',
//     house: 31,
//     apartment: 59,
//     unknown: 20,
//   },
//   {
//     name: 'Age 30-40',
//     house: 74,
//     apartment: 123,
//     unknown: 60,
//   },
//   {
//     name: 'Age 40-50',
//     house: 81,
//     apartment: 151,
//     unknown: 83,
//   },
//   {
//     name: 'Age 50-60',
//     house: 88,
//     apartment: 166,
//     unknown: 96,
//   },
//   {
//     name: 'Age 60-70',
//     house: 93,
//     apartment: 169,
//     unknown: 97,
//   },
//   {
//     name: 'Age 70-80',
//     house: 94,
//     apartment: 151,
//     unknown: 90,
//   },
//   {
//     name: 'Age 80-90',
//     house: 87,
//     apartment: 115,
//     unknown: 56,
//   },
//   {
//     name: 'Age 90-100',
//     house: 94,
//     apartment: 110,
//     unknown: 53,
//   },
// ];

const BarChartThree = (props) => {
    // console.log(props.jsonData);
    for (const key in props.jsonData) {
        // console.log(props.jsonData[key]);
        for (const k in props.jsonData[key]) {
            let x = props.selectedXAxes
            console.log(props.jsonData[key][x]);
        }
        // console.log(key);
    }
    return (
        <div class="content">
        <h1>Fix</h1>
        <div class="bar">
            <BarChart
              width={1000}
              height={500}
              data={props.jsonData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={props.selectedXAxes} height={100} textAnchor= "end" sclaeToFit="true" verticalAnchor= "start"  interval={0} angle= "-40" stroke="#8884d8" label={{ value: props.selectedXAxes, position: "bottom", offset: 20 }}/>
               <YAxis label={{ value: props.selectedYAxes, position: "insideLeft", offset: -20 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="apartment" fill="#8884d890">
              <LabelList dataKey="apartment" position="top"/>
              </Bar>
              <Bar dataKey="house" fill="#82ca9d90">
              <LabelList dataKey="house" position="top"/>
              </Bar>
              <Bar dataKey="unknown" fill="#f5b64290">
              <LabelList dataKey="unknown" position="top"/>
              </Bar>
            </BarChart>
        </div>
        <Link to={`/view`}>
            <button>
                Tillbaka
            </button>
        </Link>
        </div>
      );
}

export default BarChartThree;
