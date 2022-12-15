import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function Table_Customized(props) {
  const {
    columns,
    dataLoad,
    idsCampoTypeObject,
    onElementSelected,
    onHandleSwitch,
    buttonsArray,
    ...other
  } = props;

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const history = useNavigate();

  const handleClickRow = (event, idSelection) => {
    setSelectedRow(idSelection);

    if (onElementSelected !== null) {
      onElementSelected(idSelection);
      console.log("Handle click row", idSelection);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                className="color-mediumGray"
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label.toUpperCase()}
              </TableCell>
            ))}
            <TableCell className="color-mediumGray"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? dataLoad.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : dataLoad
          ).map((row) => (
            <TableRow
              hover
              aria-checked={selectedRow === row}
              selected={selectedRow === row}
              onClick={(event) => handleClickRow(event, row)}
              role="checkbox"
              tabIndex={-1}
              key={row.id}
            >
              {columns.map((column) => {
                let value = {};
                if (column.id === "status") {
                  if (row[column.id] === "Activo") {
                    value = (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={true}
                            className="color-success"
                            onChange={onHandleSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Activo"
                      />
                    );
                  } else {
                    value = (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={false}
                            onChange={onHandleSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Inactivo"
                      />
                    );
                  }
                } else if (column.id === "photo") {
                  value = (
                    <img src={row[column.id]} height="100px" width="100px" />
                  );
                } else {
                  if (column.id === "user") 
                  value = row["user"]["username"];
                  else 
                  value = row[column.id];
                }

                return (
                  <TableCell key={row[column.id]} align={column.align}>
                    {value}
                  </TableCell>
                );
              })}
              {buttonsArray !== null &&
              buttonsArray.length > 0 &&
              buttonsArray !== undefined ? (
                buttonsArray.map((button) => (
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={button.icon}
                      className={button.className}
                      disabled={row.status === "Inactivo" ? true : false}
                      onClick={(event) => {
                        handleClickRow(event, row);
                        setTimeout(() => button.functionOnClick(), 300);
                      }}
                    >
                      {button.value}
                    </Button>
                  </TableCell>
                ))
              ) : (
                <div />
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        className="mt-3"
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={dataLoad.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
