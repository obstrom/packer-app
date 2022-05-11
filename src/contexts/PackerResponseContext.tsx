import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { ResultContainer, VisContainer } from "../commons/types";

export interface PackerResponseContextValue {
  results: Array<ResultContainer>;
  setResults: Dispatch<SetStateAction<Array<ResultContainer>>>;
  visData: Array<VisContainer>;
  setVisData: Dispatch<SetStateAction<Array<VisContainer>>>;
}

const PackerResponseContext = createContext<PackerResponseContextValue | null>(
  null
);

const PackerResponseProvider = (props: any) => {
  const [results, setResults] = useState<Array<ResultContainer>>([]);
  const [visData, setVisData] = useState<Array<VisContainer>>([]);

  const value: PackerResponseContextValue = {
    results,
    setResults,
    visData,
    setVisData,
  };

  return (
    <PackerResponseContext.Provider value={value}>
      {props.children}
    </PackerResponseContext.Provider>
  );
};

export { PackerResponseContext, PackerResponseProvider };
