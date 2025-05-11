"use client";
import React from "react";
import Image from "next/image";
import styles from "../styles/cards.module.css";

const Features = () => {
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.getElementsByClassName(styles.card);
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    const cardsContainer = document.getElementById("cards");
    if (cardsContainer) {
      cardsContainer.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (cardsContainer) {
        cardsContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div className={styles.cardsContainer}>
      <div id="cards" className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardImage}>
              <Image
                src="/immutable.svg"
                alt="immutable"
                width={120}
                height={120}
                objectFit="cover"
              />
            </div>
            <div className={styles.cardInfoWrapper}>
              <div className={styles.cardInfo}>
                <div className={styles.cardInfoTitle}>
                  <h3>Immutable Records</h3>
                  <h4>Once notarized, documents cannot be altered</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardImage}>
              <Image
                src="/verification.svg"
                alt="Decentralized Verification"
                width={120}
                height={120}
              />
            </div>
            <div className={styles.cardInfoWrapper}>
              <div className={styles.cardInfo}>
                <div className={styles.cardInfoTitle}>
                  <h3>Decentralized Verification </h3>
                  <h4> No need for third-party trust.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardImage}>
              <Image
                src="/secure.svg"
                alt="Secure & Transparent"
                width={120}
                height={120}
              />
            </div>
            <div className={styles.cardInfoWrapper}>
              <div className={styles.cardInfo}>
                <div className={styles.cardInfoTitle}>
                  <h3>Secure & Transparent</h3>
                  <h4>All records are on-chain and publicly verifiable</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
