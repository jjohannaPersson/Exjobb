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
//     {
//     name: '-',
//     index: 2,
//     },
//     {
//     name: '0 - 50.000 kr',
//     index: 44,
//     },
//     {
//     name: '50.000 - 100.000 kr',
//     index: 65,
//     },
//     {
//     name: '100.000 - 150.000 kr',
//     index: 86,
//     },
//     {
//     name: '150.000 - 200.000 kr',
//     index: 96,
//     },
//     {
//     name: '200.000 - 300.000 kr',
//     index: 101,
//     },
//     {
//     name: '300.000 - 400.000 kr',
//     index: 105,
//     },
//     {
//     name: '400.000 - 500.000 kr',
//     index: 117,
//     },
//     {
//     name: '500.000 - 600.000 kr',
//     index: 128,
//     },
//     {
//     name: '600.000 - 700.000 kr',
//     index: 142,
//     },
//     {
//     name: '700.000 - 800.000 kr',
//     index: 151,
//     },
//     {
//     name: '800.000 - 900.000 kr',
//     index: 157,
//     },
//     {
//     name: '900.000 - 1.000.000 kr',
//     index: 166,
//     },
//     {
//     name: '1.000.000 - 1.500.000 kr',
//     index: 178,
//     },
//     {
//     name: '1.500.000 - 2.000.000 kr',
//     index: 210,
//     },
//     {
//     name: '2.000.000 - 3.000.000 kr',
//     index: 227,
//     },
//     {
//     name: '3.000.000 - 4.000.000 kr',
//     index: 261,
//     },
//     {
//     name: '4.000.000 - 5.000.000 kr',
//     index: 264,
//     },
//     {
//     name: '5.000.000 kr',
//     index: 262,
//     },
// ];

const SimpleBarChart = (props) => {
    console.log(props.selectedXAxes)
    console.log(Object.values(props.jsonData[0][props.selectedXAxes]));
    return (
        <div class="content">
        <h1>Fix</h1>
        <div class="bar">
            <BarChart
              width={1200}
              height={500}
              data={props.jsonData}
              margin={{
                top: 5,
                right: 70,
                left: 20,
                bottom: 60
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={props.selectedXAxes} height={100} textAnchor= "end" sclaeToFit="true" verticalAnchor= "start"  interval={0} angle= "-40" stroke="#8884d8" label={{ value: props.selectedXAxes, position: "bottom", offset: 20 }}/>
              <YAxis label={{ value: "Index", position: "insideLeft", offset: -20 }} />
              <Tooltip />

              <Bar dataKey={props.selectedYAxes} fill="#8884d890">
              <LabelList dataKey={props.selectedYAxes} position="top"/>
              </Bar>
            </BarChart>
        </div>

        </div>
      );
}

export default SimpleBarChart;
