import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from "@mui/material";

export default function JobDetails() {
  const { id } = useParams();
  const [data, setdata] = useState("");
  const [ref, setref] = useState([]);

  React.useEffect((e) => {
    axios.get(`http://localhost:5000/job/apply/all/${id}`).then((value) => {
      setdata(value.data);
      setref(data.map((i) => i.Reference));
      console.log(ref);
    });
  }, []);
  {
    console.log(data);
  }
  return (
    <div className="admin raw text-center">
      <Box>
        <Table>
          <TableHead>
            <TableCell style={{ textAlign: "center" }}>Name</TableCell>
            <TableCell style={{ textAlign: "center" }}>E-Mail</TableCell>
            <TableCell style={{ textAlign: "center" }}>Number</TableCell>
            <TableCell style={{ textAlign: "center" }}>Birth-Date</TableCell>
            <TableCell style={{ textAlign: "center" }}>Status</TableCell>
          </TableHead>
          <TableBody>
            {data && data.length > 0
              ? data.map((i, id) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell style={{ textAlign: "center" }}>
                          {i.name}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {i.email}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {i.phone}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {i.date}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {i.employStatus}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
}
