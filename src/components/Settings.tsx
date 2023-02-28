import React, { useCallback, useState, useEffect } from "react";
import { SettingsProps, SettingsObject } from "@types";
import { TextField, Input, Button, Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { MuiColorInput, MuiColorInputColors } from "mui-color-input";

type SettingsKeys = keyof SettingsObject;

function Settings(props: SettingsProps): JSX.Element {
  const [settings, setSettings] = useState(props.settings);

  const handleChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const name: string | null = target.name;
      const key = name as SettingsKeys;
      const newState = { ...settings };
      let value: string | number = target.value;
      if (target.type === "number") {
        value = parseInt(value);
      }
      (newState as Record<typeof key, typeof value>)[key] = value;
      setSettings(newState);
    }
  };

  const handleColorChange = (color: string, colors: MuiColorInputColors) => {
    const newState = { ...settings };
    newState.color = color;
    setSettings(newState);
  };

  useEffect(() => {
    if (props.onChange) {
      props.onChange(settings);
    }
  }, [settings, props]);

  const handleSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (props.onChange) {
        props.onChange(settings);
      }
    },
    [props, settings]
  );

  const onImageUpload = useCallback(
    (event: React.ChangeEvent) => {
      const target = event.target as HTMLInputElement;
      const files: FileList | null = target.files;
      const file: File | null = files ? files[0] : null;
      if (file) {
        const newSettings = { ...settings };
        newSettings.url = URL.createObjectURL(file);
        console.log(newSettings.url);
        setSettings(newSettings);
      }
    },
    [settings]
  );

  return (
    <div className="settings">
      <div className="inputs">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                sx={{
                  width: "100%",
                  ".MuiInputBase-root": {},
                }}
                size="small"
                name="url"
                id="settings-url"
                label="URL"
                variant="outlined"
                value={settings.url}
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" component="label">
                <FileUploadIcon></FileUploadIcon>
                <Input
                  sx={{ display: "none" }}
                  type="file"
                  onChange={onImageUpload}
                ></Input>
              </Button>
            </Grid>

            <Grid item xs={4}>
              <TextField
                sx={{
                  ".MuiInputBase-root": {
                    width: "100%",
                  },
                }}
                size="small"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                name="gridX"
                id="settings-gridX"
                label="Grid divisions"
                variant="outlined"
                value={settings.gridX}
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{
                  ".MuiInputBase-root": {
                    width: "100%",
                  },
                }}
                size="small"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                name="width"
                id="settings-width"
                label="Image width"
                variant="outlined"
                value={settings.width}
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{
                  ".MuiInputBase-root": {
                    width: "100%",
                  },
                }}
                size="small"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                name="height"
                id="settings-height"
                label="Image height"
                variant="outlined"
                value={settings.height}
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <MuiColorInput
                label="Grid and marker colors"
                isAlphaHidden={true}
                fallbackValue="#ffffff"
                format="hex"
                value={settings.color}
                onChange={handleColorChange}
                name="color"
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default Settings;
