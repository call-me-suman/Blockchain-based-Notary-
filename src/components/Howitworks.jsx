"use client";
import React from "react";
import style from "../styles/howitworks.module.css";

import Cards from "../components/Cards";

const howitworks = () => {
  return (
    <div className={style.container}>
      <div className={style.main}>
        <section id="scrolling" className={style.section}>
          <div className={style.content}>
            <div className={style.card}>
              <div className={style.filler}></div>
              <Cards val={0} />
            </div>
          </div>
        </section>
        <section id="layout" className={style.section}>
          <div className={style.content}>
            <div className={style.card}>
              <div className={style.filler}></div>
              <Cards val={1} />
            </div>
          </div>
        </section>
        <section id="transition" className={style.section}>
          <div className={style.content}>
            <div className={style.card}>
              <div className={style.filler}></div>
              <Cards val={2} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default howitworks;
