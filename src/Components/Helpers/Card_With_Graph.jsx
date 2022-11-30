import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function Card_With_Graph(props) {
  const { dataToGrafic, dataKeyX, dataKeyY, 
    titleCard,percentChanged,subtitleCard, fontColor,backgColor } = props;

  return (
    <div class="card  ">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
        <div class={" rounded-2 py-3 pe-1 bg-gradient-"+backgColor+" shadow-"+backgColor}>
          <div class="chart">
            <ResponsiveContainer aspect={3}>
              <AreaChart
                width={"90%"}
                height={"80%"}
                data={dataToGrafic}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis stroke={fontColor}  fill={fontColor} dataKey={dataKeyX} />
                <YAxis stroke={fontColor} fill={fontColor}/>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey={dataKeyY}
                  stroke={fontColor} 
                  fill={"#f1f1f1"}
                />
              </AreaChart>
            </ResponsiveContainer>{" "}
          </div>
        </div>
      </div>
      <div class="card-body">
        <h6 class="mb-0 ">{titleCard} </h6>
        <p class="text-sm ">
          {" "}
          (<span class="font-weight-bolder">{percentChanged}</span>){" "}
          {subtitleCard}{" "}
        </p>
       
      </div>
    </div>
  );
}
