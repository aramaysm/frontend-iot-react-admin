import React from "react";
import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TablePagination from "@mui/material/TablePagination";
import imageNotFound from "../Resources/undraw_no_data_re_kwbl.svg";
import Table_Customized from "./Table_Customized";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ResponsiveAppBar from "./Helpers/AppBar";

export default function Template_Crud_Operations(props) {
  const {
    columnasName,
    columnsValue,
    optionsHowToSee,
    optionsHowToFiltered,
    nameReporte,
    dataLoad,
    valuesForColumnColumn,
    totalItems,
    isButtonDisable,
    onElementSelect,
    onHandleSwitch,
    onHandleSelectionView,
    buttonsArray,
    buttonGeneral,
  } = props;

  const [filtrerBy, setFiltrerBy] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const onChangeFiltrered = (event) => {
    setFiltrerBy(event.target.value);
    onHandleSelectionView(filtrerBy);
  };

  const onChangeSearch = () => {};

  const onSearch = () => {};

  return (
    <div className="bg-light h-100 w-100 j-c-c">
        
      <div className="col-12 col-lg-11  col-sm-12  ">
        <div className="card ">
          <div className="card-header bg-transparent border-none">
            <div className="row j-c-b w-100">
              <div className="col-12 col-sm-12 col-lg-5">
                <h4>{nameReporte}</h4>
                <hr className="hr-customized"/>
              </div>
              <div className="col-12 col-sm-12 col-lg-4">
                <div className="row j-c-e w-100">
                  <div className="col-8 col-sm-8 col-lg-8">                   
                  </div>
                  <div className="col-4 col-sm-4 col-lg-4">
                    {buttonGeneral !== null ? (
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={buttonGeneral.className}
                        onClick={buttonGeneral.onClick}
                      >
                        {buttonGeneral.value}
                      </Button>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body mt-3">
            {dataLoad === null || dataLoad.length == 0 ? (
              <div className="text-center">
                <img
                  className="imgPerfilUserProfile ms-auto me-auto"
                  src={imageNotFound}
                />
                <h6 className="text-center mt-3">
                  Sin información que mostrar
                </h6>
              </div>
            ) : (
              <div>
                <Table_Customized
                  columns={columnsValue}
                  onElementSelected={onElementSelect}
                  dataLoad={dataLoad}
                  onHandleSwitch={onHandleSwitch}
                  idsCampoTypeObject={valuesForColumnColumn}
                  buttonsArray={buttonsArray}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
