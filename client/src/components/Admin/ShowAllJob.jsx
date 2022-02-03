import axios from "axios";
import { React, useEffect, useState } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";

export default function ShowAllJob() {
  const [alljob, setalljob] = useState([]);

  useEffect(() => {
    ShowAllJob();
  }, []);

  const ShowAllJob = () => {
    axios.get("http://localhost:5000/job/all").then((res) => {
      console.log(res);
      setalljob(res.data);
    });
  };
  console.log(alljob);

  return (
    <div className="admin text-center container px-4">
      <Table>
        <TableHead>
          <TableCell style={{ textAlign: "center" }}>Sr.No</TableCell>
          <TableCell style={{ textAlign: "center" }}>Designation</TableCell>
          <TableCell style={{ textAlign: "center" }}>Description</TableCell>
          <TableCell style={{ textAlign: "center" }}>Position</TableCell>
          <TableCell style={{ textAlign: "center" }}>Job Limit</TableCell>
        </TableHead>
        <TableBody>
            {alljob && alljob.length > 0
                ? alljob.map((i, id) =>(
                    <TableRow>
                    <TableCell style={{ textAlign: "center" }}>{id+1}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>{i.designation}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>{i.jobDescription}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>{i.positions}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>{i.limit}</TableCell>
                    </TableRow>

                    
                ))
            :null}
        </TableBody>
      </Table>
    </div>
  );
}
