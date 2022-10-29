import Templete_Crud_Operations from "./Templete_Crud_Operations";
import React from 'react';
import PropTypes from 'prop-types';

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";



export default function Users_Operations(){


    const [dataForLoad, setDataForLoad] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [totalItems, setTotalItems] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const history = useNavigate();

    const onChangeSearch = () => {
    }

    const onChangeRowPerPage = () => {
    }

    const onChangePage = () => {
    }

    const onOrderSelect = () => {
    }

    const onHandleSelectionViewOrders = () => {

    }

    const onButtonClick = () => {
    }

    const onHandleButtonInsert = () => {

    }


    return (
        <div className='container-fluid  bg-lightBlue  h-100 w-100 p-0' id='body-pd'>
          
          <Templete_Crud_Operations
            page={page}
            rowsPerPage={rowsPerPage}
            onChangeRowPerPage={onChangeRowPerPage}
            onChangePage={onChangePage}
            user={""}
            totalItems={totalItems}
            onOrderSelect={onOrderSelect}
            onHandleSelectionViewOrders={onHandleSelectionViewOrders}
            columnasName={namesColumn}
            columnsValue={columnsToFill}
            nameReporte='Perosonal con permiso de entrada'
            optionsHowToFiltered={namesColumn}
            dataLoad={dataForLoad}
            optionsHowToSee={["Todas", "Pendientes", "Completadas"]}
            valueForButton={"Ver "}
            onSearch={onChangeSearch}
            isButtonDisable={true}
            buttonsArray={[{
              id: "resp-button",
              label: "Ver",
              functionOnClick: onButtonClick,
              className: "button-Primary-Two",
              icon: <VisibilityIcon />,
              disabled: ()=>{
                return false
            },
            },]} 
            buttonGeneral={{
                value: "Insertar", 
                className:"button-Primary",
                onClick: (ev) => {
                    ev.preventDefault();
                    onHandleButtonInsert();
            }}}
          />
        </div>
      );
}

let namesColumn = [
    "Id",
    "Fecha de compra",
    "Costo",
    "Monto total",
    "Moneda",
    "Hash",
    "Oferta?",
    "Confirmada?",
  ];

let columnsToFill = [
    {
      id: "id",
      label: "Id",
      minWidth: 170,
      align: "center",
      isObject: false,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "created_at",
      label: "Fecha de compra",
      minWidth: 170,
      align: "center",
      isObject: false,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "stateOrder",
      label: "Estado",
      minWidth: 120,
      align: "center",
      isObject: true,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "total_price",
      label: "Monto total",
      minWidth: 120,
      align: "center",
      isObject: false,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "currency_sign",
      label: "Moneda",
      minWidth: 170,
      align: "center",
      isObject: false,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "confirmed_at",
      label: "Confirmada?",
      minWidth: 170,
      align: "center",
      isObject: false,
      format: (value) => value.toLocaleString("en-US"),
    },
  ];