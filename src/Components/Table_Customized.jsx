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

export default function Table_Customized(props) {
  const {
    columns,
    dataLoad,
    idsCampoTypeObject,
    onElementSelected,
    buttonsArray,
    ...other
  } = props;


  const [selectedRow, setSelectedRow] = React.useState([]);

  const history = useNavigate();

  const handleClickRow = (event, idSelection) => {
    setSelectedRow(idSelection);
    if (onElementSelected !== null) {
      onElementSelected(idSelection);
      console.log("Handle click row",idSelection);
    }
    
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
          {dataLoad.map((row) => (
           <TableRow
           hover
           aria-checked={selectedRow === row}
           selected={selectedRow === row}
           onClick={(event) => handleClickRow(event, row)}
           role='checkbox'
           tabIndex={-1}
           key={row.id}>
           {columns.map((column) => {
             let value = "";
                     

             return (
               <TableCell key={row[column.id]} align={column.align}>
                 {value}
               </TableCell>
             );
           })}
           {buttonsArray !== null && buttonsArray.length>0 && buttonsArray  !== undefined 
           ?
           buttonsArray.map((button) => (
             <TableCell align='center'>
               <Button variant='contained'                       
                 onClick={(event) =>  {
                   handleClickRow(event, row);
                   setTimeout(()=>button.functionOnClick(),300); }}
                 endIcon={button.icon}
                 className={button.className} disabled={button.disabled(row.id)}>
               {button.label}</Button>
             </TableCell>
           ))
           :
           <div/>
           }
         </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
