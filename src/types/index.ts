export type Dimensions = {
  width: number;
  height: number;
};

export type Position = {
  x: number;
  y: number;
};

export type SettingsObject = Dimensions & {
  gridX: number;
  url: string;
  color: string;
};

export type SettingsProps = {
  onChange?: Function;
  settings: SettingsObject;
};

export type GridContainerProps = {
  zoom: number;
  onMarkerSelect?: (_i: number, _markerProps: MarkerProps) => void;
  onImageSizeChange?: (rect: DOMRect) => void;
};

export type GridProps = Dimensions & {
  visible: boolean;
  divisions: number;
  color: string;
};

export type MarkerProps = Position & {
  onClick?: Function;
  onMouseDown?: Function;
  targetSize: Dimensions;
  selected: boolean;
};

export type MarkerLayerProps = Dimensions & {
  offset: Position;
  onMarkerSelect?: Function;
};
