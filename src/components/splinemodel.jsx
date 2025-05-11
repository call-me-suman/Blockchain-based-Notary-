"use client";
import { useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
// import "../styles/globals.css";

function MyApp() {
  let initialZoom;
  const cube = useRef();

  function getScaleValue() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1000) {
      return 0.5;
    } else if (screenWidth > 700) {
      return 0.38;
    } else if (screenWidth > 500) {
      return 0.32;
    }
    return 0.25;
  }

  function onLoad(spline) {
    const scaleValue = getScaleValue();
    initialZoom = scaleValue;
    spline.setZoom(scaleValue);
    const obj = spline.findObjectByName("Cube");
    cube.current = obj;
  }

  function setSplineScale(scale) {
    const newScale = cube.current.scale;
    newScale.x = scale;
    newScale.y = scale;
    newScale.z = scale;
    cube.current.scale = newScale;
  }

  useEffect(() => {
    function scaleSpline() {
      if (cube.current?.scale) {
        const scaleValue = getScaleValue();
        setSplineScale(scaleValue / initialZoom);
      }
    }
    window.addEventListener("resize", scaleSpline);
    return () => window.removeEventListener("resize", scaleSpline);
  }, [initialZoom]);

  return (
    <div>
      <main>
        <Spline
          scene="https://prod.spline.design/IXlcUQDA0Z1ZnJb5/scene.splinecode"
          onLoad={onLoad}
        />
      </main>
    </div>
  );
}

export default MyApp;
