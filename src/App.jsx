import { Container } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import useCollections from "./hooks/useCollections";
import useMyNfts from "./hooks/useMyNfts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { Controller } from "./controllers/ContractController";
import { useRef } from "react";
import AllCollections from "./component/AllCollections";
import MyCollections from "./component/MyCollections";

configureWeb3Modal();

function App() {
  const inputRef = useRef();
  const tokensData = useCollections();
  const [[_, ownedTokenIds], myTokensData] = useMyNfts(tokensData);
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const controller = new Controller(chainId, walletProvider);

  return (
    <Container>
      <Header />
      <main className="mt-6">
        <AppTabs
          MyNfts={
            <MyCollections
              controller={controller}
              inputRef={inputRef}
              myTokensData={myTokensData}
            />
          }
          AllCollections={
            <AllCollections
              controller={controller}
              tokensData={tokensData}
              ownedTokenIds={ownedTokenIds}
            />
          }
        />
      </main>
    </Container>
  );
}

export default App;
