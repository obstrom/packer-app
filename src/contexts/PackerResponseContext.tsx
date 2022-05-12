import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { ResultContainer, VisContainer, ResultsVolume } from "../commons/types";
import { PackerJobResponseStatus } from "../commons/enums";

export interface PackerResponseContextValue {
  status: PackerJobResponseStatus;
  setStatus: Dispatch<SetStateAction<PackerJobResponseStatus>>;
  requestCounter: number;
  incrementRequestCounter: () => void;
  results: Array<ResultContainer>;
  setResults: Dispatch<SetStateAction<Array<ResultContainer>>>;
  visData: Array<VisContainer>;
  setVisData: Dispatch<SetStateAction<Array<VisContainer>>>;
  resultsVolume: ResultsVolume | null;
  setResultsVolume: Dispatch<SetStateAction<ResultsVolume | null>>;
}

const PackerResponseContext = createContext<PackerResponseContextValue | null>(
  null
);

const PackerResponseProvider = (props: any) => {
  const [status, setStatus] = useState<PackerJobResponseStatus>(
    PackerJobResponseStatus.NONE
  );
  const [requestCounter, setRequestCounter] = useState<number>(0);
  const [resultsContainers, setResultsContainers] = useState<
    Array<ResultContainer>
  >([]);
  const [visData, setVisData] = useState<Array<VisContainer>>([]);
  const [resultsVolume, setResultsVolume] = useState<ResultsVolume | null>(
    null
  );

  const incrementRequestCounter = (): void =>
    setRequestCounter((prevState: number) => prevState++);

  const value: PackerResponseContextValue = {
    status,
    setStatus,
    requestCounter,
    incrementRequestCounter,
    results: resultsContainers,
    setResults: setResultsContainers,
    visData,
    setVisData,
    resultsVolume,
    setResultsVolume,
  };

  return (
    <PackerResponseContext.Provider value={value}>
      {props.children}
    </PackerResponseContext.Provider>
  );
};

export { PackerResponseContext, PackerResponseProvider };
