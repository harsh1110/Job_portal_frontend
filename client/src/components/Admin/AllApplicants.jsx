import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios'
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useParams } from 'react-router-dom';
import url from '../../config';
import { Grid } from '@mui/material';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';

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
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Candidate Id",
  },
  {
    id: "Designation",
    numeric: false,
    disablePadding: false,
    label: "Designation",
  },
  {
    id: "Candidate Name",
    numeric: false,
    disablePadding: false,
    label: "Candidate Name",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Employee Status",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Application Status",
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
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [alljobs, setAlljobs] = React.useState([]);
  const { id } = useParams();
  const [data, setdata] = React.useState("");
  const [ref, setref] = React.useState([]);

  React.useEffect((e) => {
    axios.get(`${url}/job/apply/all`,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}}).then((value) => {
      setdata(value.data);
      // setref(data.map((i) => i.Reference));
      console.log(ref);
    });
  }, []);
  const handleView = (e, candidateid) => {
    axios.get(`${url}/job/apply/one/${candidateid}`,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}}).then((res) => {
      window.location = `/candidatedetails/${candidateid}`;
    });
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <>
      {data.length === 0 ?
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
            className='my-2'
            sx={{ fontSize: 60, fontWeight: "bold", color: "red" }}
          >
            Opps...!
          </Typography>
          <Typography variant="h6">
            There is no Record for Application
          </Typography>
        </Grid>
        :
        <Box sx={{ width: '100%' }}>
          
          <Typography variant="h3" className="job-title">
          All Applicants Details
          </Typography>
         
          <Paper className='table admin row text-center' sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {
                    data.length === 0 ?
                      null :
                      stableSort(data, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((i, index) => {
                          const isItemSelected = isSelected(index);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, i._id)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={i._id}
                              selected={isItemSelected}
                            >
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="4px"
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                {i.designation}
                              </TableCell>
                              <TableCell>
                                {i.name}
                              </TableCell>
                              <TableCell>
                                {i.employStatus}
                              </TableCell>
                              {
                                i.ApplicationStatus === "Pending"?
                              <TableCell className="text-warning" sx={{fontWeight:800}}>{i.ApplicationStatus}</TableCell>:null
                              }
                               {
                                i.ApplicationStatus === "Approve"?
                              <TableCell className="text-success" sx={{fontWeight:800}}>{i.ApplicationStatus}</TableCell>:null
                              }
                               {
                                i.ApplicationStatus === "Reject"?
                              <TableCell className="text-danger" sx={{fontWeight:800}}>{i.ApplicationStatus}</TableCell>:null
                              }
                              <TableCell><Button className="btn" 
                              onClick={(e) => handleView(e, i._id)}
                              ><RemoveRedEyeIcon className='text-white' /></Button></TableCell>
                            </TableRow>
                          );
                        })}
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
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      }
    </>
  );
}
