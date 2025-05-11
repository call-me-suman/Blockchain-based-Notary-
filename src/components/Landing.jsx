import style from "../styles/landing.module.css";
import Splinemodel from "../components/splinemodel";
import InteractiveButton from "./InteractiveButton";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";
function Landing() {
  return (
    <div className={style.app}>
      <div className={style.landingpage}>
        <div className={style.herosection}>
          <div className={style.herocontent}>
            <h1 className={style.herotitle}>
              Secure
              <br />
              Blockchain-Powered
              <br />
              Notarization{" "}
            </h1>
            <p className={style.herosubtitle}>
              Verify, notarize, and protect your
              <br />
              documents with decentralized trust
            </p>
            <div className={style.herocta}>
              {/* <InteractiveButton /> */}
              <InteractiveButton>
                <ConnectButton client={client} />
              </InteractiveButton>
            </div>
          </div>
          <div className={style.herovisual}>
            <Splinemodel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
