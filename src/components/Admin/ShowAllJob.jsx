import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import url from "../../config";
import { Grid } from "@mui/material";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mui/material";
import { useState } from "react";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "Job Id",
    numeric: false,
    disablePadding: false,
    label: "JobId",
  },
  {
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "Designation",
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Positions",
  },
  {
    id: "limit",
    numeric: false,
    disablePadding: false,
    label: "Limits",
  },
  {
    id: "jobDescription",
    numeric: false,
    disablePadding: false,
    label: "Job Description",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",

  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <>
            {headCell.label === "Actions" ? (
              <TableCell
                colSpan={2}
                className="fw-bold action"
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ) : (
              <TableCell
                className="fw-bold"
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )}
          </>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h4"
          id="tableTitle"
          component="div"
          className="table-title purple"
        >
          All Job Post List
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [alljobs, setAlljobs] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [defaultjob, setdefaultjob] = useState("");
  const [newdesignation, setnewdesignation] = useState("");
  const [newposition, setnewposition] = useState("");
  const [newjobdescription, setnewjobdescription] = useState("");
  const [newlimit, setnewlimit] = useState("");
  const handleClose = () => setOpen(false);
  const [flag, setFlag] = useState(false);

  React.useEffect(() => {
    axios.get(`${url}/job/all`,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}}).then((value) => {
      setAlljobs(value.data);
      // console.log(value.data)
    });
  }, [flag]);
  const handleView = (e, id) => {
    axios.get(`${url}/job/apply/all/${id}`,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}}).then((res) => {
      console.log(res);
      window.location = `/jobdetails/${id}`;
      setFlag(!flag);
    });
  };
  const handleEdit = (e, id) => {
    axios.get(`${url}/job/one/${id}`,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}}).then(
      (res) => {
        console.log(res);
        setdefaultjob(res.data);
        setOpen(true);
        // setFlag(!flag)
      },
      [flag]
    );
  };
  const handleEditOk = (e, id) => {
    const data = {
      designation: newdesignation ? newdesignation : defaultjob.designation,
      position: newposition ? newposition : defaultjob.positions,
      jobDescription: newjobdescription
        ? newjobdescription
        : defaultjob.jobDescription,
      limit: newlimit ? newlimit : defaultjob.limit,
    };
    axios.post(`${url}/job/one/${id}`, data,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}}).then((res) => {
      console.log(res);
      setFlag(!flag);
    });
  };
  const handleCreateJob = (e) => {
    window.location = `/Create%20Job%20Post`;
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = alljobs.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - alljobs.length) : 0;

  return (
    <>
      {alljobs.length === 0 ? (
        <Grid
          item
          xs={12}
          sx={{
            marginLeft: "180px",
            height: 490,
            textAlign: "center",
          }}
        >
          <ReportRoundedIcon
            className="my-2"
            sx={{ height: "20%", width: "20%", color: "#c0cd30" }}
          />
          <Typography
            variant="h6"
            className="my-2"
            sx={{ fontSize: 60, fontWeight: "bold", color: "red" }}
          >
            Opps...!
          </Typography>
          <Typography variant="h6">There is no Record for Jobs</Typography>
        </Grid>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Grid item xs={12} sx={{ textAlign: "end" }}>
            <Button
              variant="contained"
              className="button-job"
              onClick={(e) => handleCreateJob(e)}
            >
              Create Job
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3" className="job-title">
              All Job Details
            </Typography>
          </Grid>

          <Paper
            className="table admin row text-center"
            sx={{ width: "100%", mb: 2 }}
          >
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={alljobs.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(alljobs, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((job, index) => {
                      const isItemSelected = isSelected(index);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, job._id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={job._id}
                          selected={isItemSelected}
                        >
                          {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell> */}

                          {job.limit === 0 ? (
                            <>
                              <TableCell
                                className="text-secondary"
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="4px"
                              >
                                <del>{index + 1}</del>
                              </TableCell>
                              <TableCell
                                className="text-secondary"
                                align="start"
                              >
                                <del>{job.designation}</del>
                              </TableCell>
                              <TableCell
                                className="text-secondary"
                                align="start"
                              >
                                <del>{job.positions}</del>
                              </TableCell>
                              <TableCell
                                className="text-secondary"
                                align="start"
                              >
                                <del>{job.limit}</del>
                              </TableCell>
                              <TableCell
                                className="text-secondary"
                                align="start"
                              >
                                <del>{job.jobDescription}</del>
                              </TableCell>
                              <TableCell>
                                <Button
                                  className="btn"
                                  onClick={(e) => handleView(e, job._id)}
                                >
                                  <RemoveRedEyeIcon className="text-white" />
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  disabled
                                  className="btn"
                                  onClick={(e) => handleEdit(e, job._id)}
                                >
                                  <EditIcon className="text-white" />
                                </Button>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="4px"
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell align="start">
                                {job.designation}
                              </TableCell>
                              <TableCell align="start">
                                {job.positions}
                              </TableCell>
                              <TableCell align="start">{job.limit}</TableCell>
                              <TableCell align="start">
                                {job.jobDescription}
                              </TableCell>
                              <TableCell>
                                <Button
                                  className="btn"
                                  onClick={(e) => handleView(e, job._id)}
                                >
                                  <RemoveRedEyeIcon className="text-white" />
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  className="btn"
                                  onClick={(e) => handleEdit(e, job._id)}
                                >
                                  <EditIcon className="text-white" />
                                </Button>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      );
                    })}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <h1 style={{ color: "#2962ff" }}>Edit Job</h1>

                        <p
                          style={{ margin: "0px 0px 0px -150px" }}
                          className="fw-bold"
                        >
                          Designation:
                        </p>

                        <input
                          className="input"
                          // style={{ width: "200px" }}
                          defaultValue={defaultjob.designation}
                          onChange={(event) =>
                            setnewdesignation(event.target.value)
                          }
                        ></input>

                        <br />
                        <br />

                        <p
                          style={{ margin: "-5px 0px 0px -180px" }}
                          className="fw-bold"
                        >
                          Position:
                        </p>

                        <input
                          className="input"
                          type="number"
                          defaultValue={defaultjob.positions}
                          onChange={(event) =>
                            setnewposition(event.target.value)
                          }
                        ></input>

                        <br />
                        <br />

                        <p
                          style={{ margin: "-5px 0px 0px -120px" }}
                          className="fw-bold"
                        >
                          Job Description:
                        </p>

                        <input
                          className="input"
                          defaultValue={defaultjob.jobDescription}
                          onChange={(event) =>
                            setnewjobdescription(event.target.value)
                          }
                        ></input>

                        <br />
                        <br />

                        <p
                          style={{ margin: "-5px 0px 0px -115px" }}
                          className="fw-bold"
                        >
                          Limit of Position:
                        </p>

                        <input
                          className="input"
                          type="number"
                          defaultValue={defaultjob.limit}
                          onChange={(event) => setnewlimit(event.target.value)}
                        ></input>
                       
                        <br />
                        <br />

                        <Button
                          variant="contained"
                          style={{width:'250px'}}
                          onClick={(e) => {
                            handleEditOk(e, defaultjob._id);
                            handleClose();
                          }}
                        >
                          Ok
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={alljobs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </>
  );
}
