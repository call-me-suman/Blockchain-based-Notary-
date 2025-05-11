import Image from "next/image";
import React from "react";

const Cards = ({ val }) => {
  const heading = [
    " Upload Your Document",
    " Blockchain Notarization",
    "Verification Anytime",
  ];
  const gifs = ["/upload.gif", "/blockchain.gif", "/checked.gif"];
  const paragraph = [
    "Select the document you want to notarize.",
    "The hash is securely stored on the blockchain.",
    "Anyone can verify its authenticity instantly.",
  ];
  return (
    <>
      {" "}
      <div className="verification-card">
        <div className="illustration-section">
          <div className="illustration-wrapper">
            <Image
              unoptimized
              src={gifs[val]}
              alt="blcokchain gif"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="contentsection">
          <h2>&nbsp;Step {val + 1}</h2>
          <h2 className="heading">{heading[val]}</h2>
          <p className="description">{paragraph[val]}</p>
        </div>
      </div>
      <style jsx>{`
        .identity-verification-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          height: 800px;
          padding: 20px;
        }

        .verification-card {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          max-width: 900px;
          height: max-content;
          width: 100%;
        }

        .illustration-section {
          border-radius: 16px;
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }

        .illustration-wrapper {
          max-width: 300px;
          width: 100%;
        }

        .illustration {
          width: 100%;
          height: auto;
        }

        .contentsection {
          display: flex;
          flex-direction: column;
          justify-content: center;
          // background-color: rgba(7, 152, 181, 0.48);

          padding: 40px;
          flex: 1;
        }

        .contentsection h2 {
          font-size: 26px;
          font-weight: 700;
          line-height: 1.1;
          color: black;
        }

        .contentsection p {
          font-size: 18px;
          line-height: 1.5;
        }
        .contentsection h .step-list {
          display: flex;
          margin-bottom: 30px;
          color: #8a8a8a;
          list-style: none;
          padding: 0;
        }

        .step-list li {
          margin-right: 20px;
          display: flex;
          align-items: center;
        }

        .step-list li.active {
          color: #5d3fd3;
          font-weight: bold;
        }

        .step-list li::before {
          content: attr(data-step);
          margin-right: 8px;
          background-color: #f0f0f0;
          color: #8a8a8a;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-list li.active::before {
          background-color: #5d3fd3;
          color: white;
        }

        .heading {
          font-size: 24px;
          margin-bottom: 10px;
          color: #333;
        }

        .description {
          color: #666;
          margin-bottom: 30px;
        }

        .cta-button {
          background-color: #5d3fd3;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .cta-button:hover {
          background-color: #4a32a8;
        }

        .cta-button::after {
          content: "→";
          margin-left: 10px;
        }
      `}</style>
    </>
  );
};

export default Cards;
