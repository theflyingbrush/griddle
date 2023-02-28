import { useContext, useState, useEffect, useRef, FC, useMemo } from "react";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import Grid from "./Grid";
import MarkerLayer from "./MarkerLayer";
import { SettingsContext } from "../contexts/SettingsContext";
import { MarkerProps, GridContainerProps } from "@types";

type maybeImage = null | HTMLImageElement;

export const GridContainer: FC<GridContainerProps> = ({
  zoom = 1,
  onImageSizeChange = (_rect: DOMRect) => {},
  onMarkerSelect = (_i: number, _markerProps: MarkerProps) => {},
}) => {
  const settingsContext = useContext(SettingsContext);
  const imageRef = useRef(null as maybeImage);
  const containerRef = useRef(null as HTMLDivElement | null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [gridVisible] = useState(true);
  const onImageLoad = (event: React.SyntheticEvent) => {
    updateImageSize();
  };
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);

  const updateImageSize = useDebouncedCallback(
    () => {
      const img = imageRef.current as HTMLImageElement;
      const size = { width: img.offsetWidth, height: img.offsetHeight };
      setImageSize(size);
    },
    250,
    { maxWait: 500 }
  );

  useEffect(() => {
    const img = imageRef.current as HTMLImageElement;
    const rect = img.getBoundingClientRect();
    if (rect) {
      setXOffset(rect.x);
      setYOffset(rect.y);
    }
    if (onImageSizeChange) {
      onImageSizeChange(rect);
    }
  }, [imageSize, onImageSizeChange]);

  const containerStyle = useMemo(() => {
    return {
      transform: `scale(${zoom})`,
      width: imageSize.width,
      height: imageSize.height,
      transformOrigin: "50% 0",
    };
  }, [zoom, imageSize]);

  useEffect(() => {
    window.addEventListener("resize", updateImageSize);
    return () => {
      window.removeEventListener("resize", updateImageSize);
    };
  }, [updateImageSize]);

  const onMarkerSelection = (i: number, marker: MarkerProps) => {
    if (onMarkerSelect) {
      onMarkerSelect(i, marker);
    }
  };

  return (
    <div className="content-container">
      <div ref={containerRef} className="grid-container" style={containerStyle}>
        <img
          alt="Grid source"
          ref={imageRef}
          id="image"
          onLoad={onImageLoad}
          src={settingsContext.url}
          style={{ display: "block" }}
        />
        <Grid
          visible={gridVisible}
          color={settingsContext.color}
          divisions={settingsContext.gridX}
          width={imageSize.width}
          height={imageSize.height}
        />
        <MarkerLayer
          onMarkerSelect={onMarkerSelection}
          offset={{ x: xOffset, y: yOffset }}
          width={imageSize.width}
          height={imageSize.height}
        />
      </div>
    </div>
  );
};

export default GridContainer;
