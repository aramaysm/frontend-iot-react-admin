import React from "react";

export default function Shown_Info_From_Protocol() {
  const [data, setData] = React.useState(
    JSON.parse(localStorage.getItem("data"))
  );
  const response_Phase0 = data.phase0_from_Server;
  const response_Phase1 = data.phase1_from_Server;

  return (
    <div
      className="container-fluid  bg-lightBlue  h-100 w-100 "
      id="body-pd"
    >
      <div className="bg-light h-100 w-100 j-c-c">
        <div className="col-12 col-lg-11  col-sm-12 p-0">
          <div className="card m-0 p-0">
            <div className="card-header bg-transparent border-none">
              <div className="row  w-100">
                <div className="col-6 col-sm-6 col-lg-1">
                  <h6>Enteros: </h6>
                </div>
                <div className="col-3 col-sm-3 col-lg-1">
                  <h6>{"m = " + data.phase0_from_Server.data.m}</h6>
                </div>
                <div className="col-3 col-sm-3 col-lg-1">
                  <h6>{"n = " + data.phase0_from_Server.data.n}</h6>
                </div>
              </div>
            </div>

            <div className="card-body bg-transparent border-none ">
              <h5 className="text-center mt-3">Fase de preparacion</h5>
              <div className="row border-dark w-100 p-0">
                <div className="col-12 col-sm-12 col-lg-4 m-0  p-1">
                  <div className="card h-100">
                    <div className="card-header bg-transparent text-center">
                      <h5>Matriz P</h5>
                    </div>
                    <div className="card-body">
                      <div className="row  w-100">
                        {data.phase0_from_Server.data.P.map((row, index) => (
                          <div className="col-2 ">
                            <h6>{row}</h6>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-lg-4 m-0 mr-1 p-1">
                  <div className="card">
                    <div className="card-header bg-transparent text-center">
                      <h5>Matriz G</h5>
                    </div>
                    <div className="card-body">
                      <div className="row  w-100">
                        {data.phase0_from_Server.data.G.map((row, index) => (
                          <div className="col-2 ">
                            <h6>{row}</h6>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-lg-4 m-0 p-1">
                  <div className="card">
                    <div className="card-header bg-transparent text-center">
                      <h5>Matriz GB</h5>
                    </div>
                    <div className="card-body">
                      <div className="row  w-100">
                        {data.phase0_from_Server.data.GB.map((row, index) => (
                          <div className="col-2 ">
                            <h6>{row}</h6>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h5 className="text-center mt-3">Fase de testigo</h5>
              <div className="row border-dark j-c-c w-100 mt-4">
                <div className="col-12 col-sm-12 col-lg-4 m-0 mr-1 p-1">
                  <div className="card">
                    <div className="card-header bg-transparent text-center">
                      <h5>Matriz S - Testigo</h5>
                    </div>
                    <div className="card-body">
                      <div className="row  w-100">
                        {data.infoPhase1_to_Server.witness.map((row, index) => (
                          <div className="col-2 ">
                            <h6>{row}</h6>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-lg-4 m-0 p-1">
                  <div className="card">
                    <div className="card-header bg-transparent text-center">
                      <h5>Matriz GA</h5>
                    </div>
                    <div className="card-body">
                      <div className="row  w-100">
                        {data.infoPhase1_to_Server.GA.map((row, index) => (
                          <div className="col-2 ">
                            <h6>{row}</h6>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h5 className="text-center mt-3">Fase de desafio y respuesta</h5>
              <div className="row border-dark w-100 mt-4">
                <div className="col-12 col-sm-12 col-lg-4 m-0 p-1">
                  <div className="card">
                    <div className="card-header bg-transparent text-center">
                      <h5>Matriz Q - Desafio</h5>
                    </div>
                    <div className="card-body">
                      <div className="row  w-100">
                        {data.phase1_from_Server.data.challenge.map(
                          (row, index) => (
                            <div className="col-2 ">
                              <h6>{row}</h6>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-lg-4 m-0 p-1">
                  <div className="card">
                    <div className="card-header bg-transparent text-center">
                      <h5>Matriz R - Respuesta al desafio</h5>
                    </div>
                    <div className="card-body">
                      <div className="row  w-100">
                        {data.infoPhase3_to_Server.R.map((row, index) => (
                          <div className="col-2 ">
                            <h6>{row}</h6>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-lg-4 m-0 p-1">
                  <div className="card">
                    <div className="card-header bg-transparent text-center">
                      <h5>Matriz Ga</h5>
                    </div>
                    <div className="card-body">
                      <div className="row  w-100">
                        {data.infoPhase3_to_Server.Ga.map((row, index) => (
                          <div className="col-2 ">
                            <h6>{row}</h6>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
