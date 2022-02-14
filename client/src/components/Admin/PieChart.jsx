import React from "react";
import { Chart } from "react-google-charts";


export function PieChart(props) {
  const data = [
    ["Status", "No of Application"],
    ["Total", 0],
    ["Rejected", props.reject],
    ["Pending", props.pending],
    ["Approved", props.approve],
  ];
  
  const options = {
    is3D:true,
    pieSliceText: "lable",
  };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}