import React, { useEffect, useState, useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { MarkerProps, MarkerLayerProps, Position } from "@types";
import Marker from "./Marker";
import { RootState } from "../app/store";
import { useMouse } from "../hooks/useMouse";
import { useSelector, useDispatch } from "react-redux";
import { addNewMarker, editMarker } from "../features/markers/markerSlice";

const MarkerLayer = (props: MarkerLayerProps) => {
  const dispatch = useDispatch();
  const settingsContext = useContext(SettingsContext);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const markers: MarkerProps[] = useSelector(
    (state: RootState) => state.markers.value
  );
  const [draggingMarker, setDraggingMarker] = useState<number | null>(null);
  const mousePosition = useMouse({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (draggingMarker === null) {
      return;
    }
    const x = ((mousePosition.x - props.offset.x) / props.width) * 100;
    const y = ((mousePosition.y - props.offset.y) / props.height) * 100;
    const newPosition: Position = { x, y };
    dispatch(editMarker({ index: draggingMarker, position: newPosition }));
  }, [
    mousePosition,
    dispatch,
    draggingMarker,
    props.width,
    props.height,
    props.offset.x,
    props.offset.y,
  ]);

  useEffect(() => {
    if (draggingMarker) {
      setDragging(true);
    } else {
      setTimeout(() => {
        setDragging(false);
      }, 500);
    }
  }, [draggingMarker]);

  const addMarker = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (dragging) {
      return;
    }
    const event: PointerEvent = e.nativeEvent as PointerEvent;
    const target: HTMLElement = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const newMarker: MarkerProps = {
      x: ((event.clientX - rect.left) / props.width) * 100,
      y: ((event.clientY - rect.top) / props.height) * 100,
      targetSize: {
        width: settingsContext.width,
        height: settingsContext.height,
      },
      selected: false,
    };
    dispatch(addNewMarker(newMarker));
  };

  const dragMarker = (e: React.SyntheticEvent, i: number) => {
    setDraggingMarker(i);
  };

  const dropMarker = (e: React.SyntheticEvent) => {
    setDraggingMarker(null);
  };

  const selectMarker = (i: number) => {
    if (props.onMarkerSelect) {
      props.onMarkerSelect(i, markers[i]);
      setSelectedIndex(i);
    }
  };

  return (
    <div onClick={addMarker} onMouseUp={dropMarker} className="marker-layer">
      {markers.map((marker, i) => (
        <Marker
          selected={selectedIndex === i}
          targetSize={marker.targetSize}
          onMouseDown={(e: React.SyntheticEvent) => dragMarker(e, i)}
          onClick={() => selectMarker(i)}
          key={i}
          x={marker.x}
          y={marker.y}
        />
      ))}
    </div>
  );
};

export default MarkerLayer;
