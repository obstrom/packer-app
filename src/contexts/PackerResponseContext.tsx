import React, {createContext, Dispatch, SetStateAction, useState,} from "react";
import {ResultContainer, ResultsVolume, VisContainer} from "../commons/types";
import {PackerJobResponseStatus, WeightUnits} from "../commons/enums";

export interface PackerResponseContextValue {
  results: Array<ResultContainer>;
  setResults: Dispatch<SetStateAction<Array<ResultContainer>>>;
  visData: Array<VisContainer>;
  setVisData: Dispatch<SetStateAction<Array<VisContainer>>>;
  status: PackerJobResponseStatus;
  setStatus: Dispatch<SetStateAction<PackerJobResponseStatus>>;
  info: ResultsInfo;
  setInfo: Dispatch<SetStateAction<ResultsInfo>>;
}

export interface ResultsInfo {
  resultsVolume: ResultsVolume | null;
  packingTime: number;
  totalWeight: number;
  weightUnit: WeightUnits;
}

const PackerResponseContext = createContext<PackerResponseContextValue | null>(
  null
);

const PackerResponseProvider = (props: any) => {
  const [resultsContainers, setResultsContainers] = useState<
    Array<ResultContainer>
  >([]);
  const [visData, setVisData] = useState<Array<VisContainer>>([]);
  const [status, setStatus] = useState<PackerJobResponseStatus>(
    PackerJobResponseStatus.NONE
  );

  const [info, setInfo] = useState<ResultsInfo>({
    resultsVolume: null,
    packingTime: 0,
    totalWeight: 0,
    weightUnit: WeightUnits.METRIC_GRAM,
  });

  const value: PackerResponseContextValue = {
    results: resultsContainers,
    setResults: setResultsContainers,
    visData,
    setVisData,
    status,
    setStatus,
    info,
    setInfo,
  };

  return (
    <PackerResponseContext.Provider value={value}>
      {props.children}
    </PackerResponseContext.Provider>
  );
};

export { PackerResponseContext, PackerResponseProvider };
