import React from "react";
import Card_With_Graph from "./Helpers/Card_With_Graph";
import Card_With_Icon from "./Helpers/Card_With_Icon";
import { Add } from "@mui/icons-material";



export default function Dashboard(){
    return(
        <div className="container-fluid">
      <div class="container-fluid py-4">
        <div class="row justify-content-around d-flex align-content-around">
          {dataToCardsReport.map((item) => (
            <div class="col-xl-3  col-sm-6 mb-xl-0 mb-4">
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
        <div class="row mt-4 j-c-c">
          <div class="col-lg-11 col-md-11 mt-4 mb-4">
            <Card_With_Graph
              dataToGrafic={dataToGrafic}
              dataKeyX={"name"}
              dataKeyY={"percent"}
              titleCard={"Avances diarios"}
              percentChanged={"50%"}
              subtitleCard={" desde ayer"}
              fontColor={"#135816"}
              backgColor={"lightgreen"}
            />
          </div>
         
        </div>
        </div>
        </div>
    )
}

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

  let dataToCardsReport = [
    {
      icon: <Add fontSize="large" sx={{ color: "white" }} />,
      title: "Avances diarios",
      percentage: "50%",
      value: "1548",
      percentageColor: "success",
      textForPercentage: " desde ayer",
      colorBackIcon: "success",
    },
    {
      icon: <Add fontSize="large" sx={{ color: "white" }} />,
      title: "Avances diarios",
      percentage: "50%",
      value: "1548",
      percentageColor: "success",
      textForPercentage: " desde ayer",
      colorBackIcon: "info",
    },
    {
      icon: <Add fontSize="large" sx={{ color: "white" }} />,
      title: "Avances diarios",
      percentage: "50%",
      value: "1548",
      percentageColor: "success",
      textForPercentage: " desde ayer",
      colorBackIcon: "secondary",
    },
  ];
  