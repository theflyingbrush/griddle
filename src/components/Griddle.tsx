import Settings from "./Settings";
import GridContainer from "./GridContainer";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { SettingsObject, MarkerProps } from "@types";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SettingsContext, defaultSettings } from "../contexts/SettingsContext";
import { AppContext, appConfig } from "../contexts/AppContext";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppStyles } from "../hooks/useAppStyles";
import { RootState } from "../app/store";
import { clearAllMarkers } from "../features/markers/markerSlice";
import { useSelector, useDispatch } from "react-redux";

type maybeHeader = null | HTMLElement;

function Griddle() {
  const dispatch = useDispatch();
  const [settings, setSettings] = useState(defaultSettings);
  const [zoom] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const headerRef = useRef(null as maybeHeader);
  const markers: MarkerProps[] = useSelector(
    (state: RootState) => state.markers.value
  );
  const onSettingsChange = useCallback((newSettings: SettingsObject) => {
    setSettings(newSettings);
  }, []);

  useEffect(() => {
    if (settings.url && settings.url !== "") {
      setHasImage(true);
    } else {
      setHasImage(false);
    }
  }, [settings]);

  const hasMarkers = useMemo(() => {
    return markers.length > 0;
  }, [markers]);

  useAppStyles(settings);

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    clearMarkers();
    setSettingsOpen(false);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  const clearMarkers = () => {
    dispatch(clearAllMarkers());
  };

  return (
    <AppContext.Provider value={appConfig}>
      <SettingsContext.Provider value={settings}>
        <div className="griddle">
          <header ref={headerRef}>
            <div className="content">
              <h1>{appConfig.name}</h1>
              {hasMarkers && (
                <>
                  <Button
                    onClick={clearMarkers}
                    variant="contained"
                    color="error"
                  >
                    Clear markers
                  </Button>
                </>
              )}
              {hasImage && !settingsOpen && (
                <Button variant="contained" onClick={handleOpenSettings}>
                  <SettingsIcon></SettingsIcon>
                </Button>
              )}
            </div>
          </header>
          {hasImage && !settingsOpen && <GridContainer zoom={zoom} />}
          {!hasImage && (
            <div className="intro">
              <h1 className="title">{`${appConfig.name}`}</h1>
              <Button
                onClick={handleOpenSettings}
                size="large"
                variant="contained"
              >
                START
              </Button>
            </div>
          )}
          <Dialog open={settingsOpen} className="settingsDialog">
            <DialogTitle className="title">{appConfig.name}</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ marginBottom: 0 }}>
                Enter a url or upload{" "}
                <FileUploadIcon
                  color="primary"
                  fontSize="small"
                ></FileUploadIcon>{" "}
                an image.
                <br />
                <br />
                Set the target width(cm) and height(cm). Markers placed on the
                image will show the position on the target in cm.
              </DialogContentText>
            </DialogContent>
            <DialogContent>
              <Settings onChange={onSettingsChange} settings={settings} />
            </DialogContent>
            <DialogActions>
              <Button onClick={resetSettings}>Reset</Button>
              <Button onClick={handleCloseSettings}>Done</Button>
            </DialogActions>
          </Dialog>
        </div>
      </SettingsContext.Provider>
    </AppContext.Provider>
  );
}

export default Griddle;
