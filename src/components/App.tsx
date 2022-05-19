import React, { useState } from "react";
import styled from "styled-components";

import { AppViewStatus } from "../commons/enums";
import { PackerObjectProvider } from "../contexts/PackerObjectContext";
import { PackerResponseProvider } from "../contexts/PackerResponseContext";
import { Footer } from "./layout/Footer";
import { StartView } from "./layout/StartView";
import { SetupView } from "./layout/SetupView";
import { ResultsView } from "./layout/ResultsView";
import { PageTitle } from "./elements/PageTitle";

const AppContainer = styled.div`
  font-family: "Inter", sans-serif;
  background-color: #fff;
  min-width: 100vw;
  min-height: 100vh;
`;

function App() {
  const [viewStatus, setViewStatus] = useState(AppViewStatus.START);

  return (
    <PackerObjectProvider>
      <PackerResponseProvider>
        <AppContainer className="pb-5">
          {viewStatus === AppViewStatus.START && (
            <StartView setViewStatus={setViewStatus} />
          )}
          {viewStatus !== AppViewStatus.START && <PageTitle text={"PackMe"} />}
          {viewStatus === AppViewStatus.SETUP && (
            <SetupView setViewStatus={setViewStatus} />
          )}
          {viewStatus === AppViewStatus.RESULTS && (
            <ResultsView setViewStatus={setViewStatus} />
          )}
          <Footer className="footer mt-4" />
        </AppContainer>
      </PackerResponseProvider>
    </PackerObjectProvider>
  );
}

export default App;
