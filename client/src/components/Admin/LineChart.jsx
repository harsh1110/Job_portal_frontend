import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import url from "../../config"



export const options = {
    chart: {
        title: "Daily Application Tracking",
        animation: {
            startup: true,
            easing: "linear",
            duration: 500,
          },
    },
};

export function LineChart() {
    const [post, setPost] = useState([]);
    var data = [["Post", ""]]
    useEffect(() => {
        fetchData()
    }, []);
    post.map((value) => {
        data.push([value.designation, value.appliedBy])
    })

    const fetchData = () => {
        axios.get(`${url}/job/all`)
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
                        style={{ marginTop: "50px" }}
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                    />
                    :
                    null
            }
        </>
    );

}
