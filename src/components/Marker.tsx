import { MarkerProps } from "@types";
import React, { useContext, useMemo } from "react";
import markerTarget from "../assets/target.svg";
import SVG from "react-inlinesvg";
import { SettingsContext } from "../contexts/SettingsContext";

const Marker = (props: MarkerProps) => {
  const settingsContext = useContext(SettingsContext);
  const onClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const onMouseDown = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (props.onMouseDown) {
      props.onMouseDown(e);
    }
  };

  const scaledPosition: { x: string; y: string } = useMemo(() => {
    return {
      x: (settingsContext.width * (props.x / 100)).toFixed(2),
      y: (settingsContext.height * (props.y / 100)).toFixed(2),
    };
  }, [settingsContext, props.x, props.y]);

  return (
    <div
      onClick={onClick}
      onMouseDown={onMouseDown}
      className="marker"
      style={{ left: props.x + "%", top: props.y + "%" }}
    >
      <div className="marker-dot">
        <p className="scaledPosition">
          {scaledPosition.x},{scaledPosition.y}
        </p>
        <SVG src={markerTarget} width="10" height="10" />
      </div>
    </div>
  );
};

export default Marker;
