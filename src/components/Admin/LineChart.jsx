import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import url from "../../config"



export const options = {
    width: "100%",
    height: 500,
    bar: { groupWidth: "50%" },
    legend: { position: "none" },
};

export function LineChart() {
    const [post, setPost] = useState([]);
    var data = [[
        "Job Post",
        "Total Application",
        { role: "style" },
        {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
        },
    ]]
    useEffect(() => {
        fetchData()
    });
    post.map((value) => {
        if (value.limit !== 0) {
            data.push([value.designation, value.appliedBy, "#2d82f8", `${value.appliedBy}`])
        }
        return data
    })

    const fetchData = () => {
        axios.get(`${url}/job/all`,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
            .then((value) => {
                setPost(value.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <>
            {
                data.length > 1 ?
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="300px"
                        data={data}
                        options={options}
                    />
                    :
                    null
            }
        </>
    );

}
