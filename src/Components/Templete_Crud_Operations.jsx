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

export default function Templete_Crud_Operations(props) {
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
    buttonsArray,
    buttonGeneral,
  } = props;

  const [filtrerBy, setFiltrerBy] = React.useState("");
  const [viewSeleted, setViewSeleted] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const onChangeFiltrered = () => {};

  const onChangeSearch = () => {};

  const onSearch = () => {};

  const onOrderSelected = () => {};

  const handleChangePage = () => {};

  const handleChangeRowsPerPage = () => {};

  return (
    <div className="  bg-lightBlue  h-100 w-100 ">
      <div className="col-12 col-lg-4 col-sm-12 p-0"></div>

      <div
        className="col-12 col-lg-11-mine  col-sm-12 ms-auto mt-5 pt-3"
        id="body_Ofertas"
      >
        <form>
          <div className="row mt-3 w-100 ms-3 h-100 mb-5 align-content-center d-flex justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12  ps-0 pe-0 align-content-center d-flex justify-content-center">
              <div className="row  w-100 align-content-center d-flex justify-content-center">
                <div className="col-12 col-lg-11 col-sm-12 mb-2">
                  {dataLoad === null || dataLoad.length == 0 ? (
                    <div />
                  ) : (
                    <div className="row pe-4 align-content-between d-flex justify-content-between">
                      <div className="col-6 col-lg-3 col-sm-6">
                        <FormControl color="info" variant="standard" fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Filtrar por
                          </InputLabel>
                          <Select
                            color="info"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filtrerBy}
                            onChange={onChangeFiltrered}
                          >
                            {optionsHowToSee.map((opt) => (
                              <MenuItem id={opt} value={opt}>
                                {opt}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-6 col-lg-3 col-sm-6">
                        <div className="input-group mt-1 input-group-search">
                          <input
                            type="search"
                            className="form-control"
                            name="name"
                            onChange={onChangeSearch}
                            id="nom"
                            placeholder="Buscar: "
                          />
                          <IconButton
                            className="input-group-text button-Primary"
                            aria-label="delete"
                            id="button-search"
                            onClick={(ev) => {
                              onSearch();
                            }}
                          >
                            <SearchIcon />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-12 mt-4 card bg-transparent border-none">
                  <div className="card-header bg-transparent border-none text-center">
                    <h2>
                      {"" +
                        nameReporte.substring(0, 1).toUpperCase() +
                        nameReporte.substring(1, nameReporte.length) +
                        " " +
                        viewSeleted.toLowerCase()}
                    </h2>
                  </div>
                  <div className="card-body text-center">
                    {dataLoad === null || dataLoad.length == 0 ? (
                      <div>
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
                          onElementSelected={onOrderSelected}
                          dataLoad={dataLoad}
                          idsCampoTypeObject={valuesForColumnColumn}
                          buttonsArray={buttonsArray}
                        />
                        <TablePagination
                          className="mt-3"
                          rowsPerPageOptions={[5, 10, 25, 100]}
                          component="div"
                          count={totalItems}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-transparent border-none justify-content-center align-content-center d-flex">
                    {buttonGeneral !== null ? (
                      <input
                        type="submit"
                        className={buttonGeneral.className}
                        value={buttonGeneral.value}
                        onClick={buttonGeneral.onClick}
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
