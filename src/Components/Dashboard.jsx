import React from "react";
import Card_With_Graph from "./Helpers/Card_With_Graph";
import Card_With_Icon from "./Helpers/Card_With_Icon";
import { Add } from "@mui/icons-material";
import MiniDrawer from "./Helpers/Drawer_MUI";
import imageNotFound from "../Resources/undraw_no_data_re_kwbl.svg";
import Table_Customized from "./Table_Customized";
import Services from "../Services";
import Alert_MUI from "./Helpers/Alert_MUI";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";

const CssFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "gray",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "gray",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
    },
    "&:hover fieldset": {
      borderColor: "gray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
});

export default function Dashboard() {
  const [dataLoadTable, setDataLoadTable] = React.useState([]);
  const [messageAlert, setMessageAlert] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [colorAlert, setColorAlert] = React.useState("");
  const [filtrerBy, setFiltrerBy] = React.useState("");
  const [hourSelected, setHourSelected] = React.useState("10");
  const [allData, setAllData] = React.useState([]);
  const [dataToCardsReport, setDataToCardsReport] = React.useState([ {
    icon: <Add fontSize="large" sx={{ color: "white" }} />,
    title: "Total de días de asistencia",
    percentage: "0%",
    value: 0,
    percentageColor: "success",
    textForPercentage: "Mes en curso",
    colorBackIcon: "success",
  },
  {
    icon: <Add fontSize="large" sx={{ color: "white" }} />,
    title: "Total de llegadas temprano",
    percentage: 0,
    value: 0,
    percentageColor: "success",
    textForPercentage: "Mes en curso",
    colorBackIcon: "info",
  },
  {
    icon: <Add fontSize="large" sx={{ color: "white" }} />,
    title: "Total de llegadas tarde",
    percentage: 0,
    value: 0,
    percentageColor: "success",
    textForPercentage: "Mes en curso",
    colorBackIcon: "secondary",
  }]);

  const history = useNavigate();

  React.useEffect(() => {
    onLoadInfo();
    
  }, []);



  const onLoadInfo = async () => {
    const tokenLocalStorage = Services.getValueFromCookies();

    await axios
      .get(
        Services.getAllAuthLogUrlCheckInTimes() + hourSelected,
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 100) {
          console.log(response.data.data);
          setAllData(response.data.data);
          setDataLoadTable(response.data.data.allArrivals);
          setDataToCardsReport([
            {
              icon: <Add fontSize="large" sx={{ color: "white" }} />,
              title: "Total de días de asistencia",
              percentage: "100%",
              value: allData.allArrivals.length,
              percentageColor: "success",
              textForPercentage: "Mes en curso",
              colorBackIcon: "success",
            },
            {
              icon: <Add fontSize="large" sx={{ color: "white" }} />,
              title: "Total de llegadas temprano",
              percentage: Math.ceil(
                (allData.earlyArrivals.length / allData.allArrivals.length) *
                  100
              ),
              value: allData.earlyArrivals.length,
              percentageColor: "success",
              textForPercentage: "Mes en curso",
              colorBackIcon: "info",
            },
            {
              icon: <Add fontSize="large" sx={{ color: "white" }} />,
              title: "Total de llegadas tarde",
              percentage: Math.ceil(
                (allData.lateArrivals.length / allData.allArrivals.length) * 100
              ),
              value: allData.lateArrivals.length,
              percentageColor: "success",
              textForPercentage: "Mes en curso",
              colorBackIcon: "secondary",
            },
          ]);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          history("/login");
        } else if (error.response.status === 500) {
          setMessageAlert("Ha ocuurido un error en el servidor");
          setOpenAlert(true);
          setColorAlert("error");
        } else {
          setMessageAlert("Ha ocuurido un error en la conexion");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        }
      });
  };


  

  const onElementSelect = () => {};

  const onChangeFiltrered = (event) => {
    setFiltrerBy(event.target.value);
    if (event.target.value === "all") setDataLoadTable(allData.allArrivals);
    else if (event.target.value === "early")
      setDataLoadTable(allData.earlyArrivals);
    else setDataLoadTable(allData.lateArrivals);
  };

  return (
    <div className="container-fluid">
      <MiniDrawer title="Dashboard" itemSelected={0} />
      <div className="container-fluid py-4">
        <Alert_MUI
          color={colorAlert}
          msg={messageAlert}
          open={openAlert}
          onClose={() => {
            setOpenAlert(false);
          }}
        />
        <div className="row justify-content-around d-flex align-content-around">
          {dataToCardsReport.map((item) => (
            <div class="col-lg-4 col-sm-6 mb-xl-0 mb-4">
              <Card_With_Icon
                colorBackIcon={item.colorBackIcon}
                icon={item.icon}
                title={item.title}
                value={item.value}
                percentage={item.percentage}
                percentageColor={item.percentageColor}
                textForPercentage={item.textForPercentage}
              />
            </div>
          ))}
        </div>

        <div className="row j-c-c mt-5">
          <div className="card col-lg-11 col-12 col-sm-12 ">
            <div className="card-header bg-transparent border-none">
              <div className="row j-c-b w-100 mt-3">
                <div className="col-12 col-sm-12 col-lg-5">
                  <h4>Reporte de accesos al sistema</h4>
                  <hr className="hr-customized" />
                </div>
                <div className="col-12 col-sm-12 col-lg-4">
                  <div className="row j-c-e w-100">
                    <div className="col-6 col-sm-6 col-lg-6">
                      <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12">
                          <div>Holaa</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-6 col-lg-6">
                      <CssFormControl color="info" variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Filtrar por
                        </InputLabel>
                        <Select
                          color="info"
                          label="Filtrar por"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={filtrerBy}
                          onChange={onChangeFiltrered}
                        >
                          {optionsHowToSee.map((opt) => (
                            <MenuItem id={opt.value} value={opt.value}>
                              {opt.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </CssFormControl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body mt-1">
              <div className="row j-c-c">
                <div className="col-lg-11 col-md-11 mt-2 mb-2 ">
                  {dataLoadTable === null || dataLoadTable.length == 0 ? (
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
                        dataLoad={dataLoadTable}
                        onHandleSwitch={() => {}}
                        idsCampoTypeObject={[]}
                        buttonsArray={[]}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let optionsHowToSee = [
  {
    value: "all",
    label: "Todo",
  },
  {
    value: "early",
    label: "Temprano",
  },
  {
    value: "late",
    label: "Tarde",
  },
];

let dataToGrafic = [
  {
    name: "Tarea 1",
    percent: 40,
  },
  {
    name: "Tarea 2",
    percent: 30,
  },
];


let valuesForColumnColumn = [];
let columnsValue = [
  {
    id: "id",
    label: "Id",
    minWidth: 70,
    align: "center",
    isObject: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "user",
    label: "Usuario",
    minWidth: 170,
    align: "center",
    isObject: true,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "loginAt",
    label: "Hora de entrada",
    minWidth: 170,
    align: "center",
    isObject: true,
    format: (value) => value.toLocaleString("en-US"),
  },
];
