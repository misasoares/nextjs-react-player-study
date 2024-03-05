"use client";
import { CheckCircle, CheckOutlined } from "@mui/icons-material";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Button, LinearProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import ReactPlayer from "react-player";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navigationYoutubeUrls = [
    "https://www.youtube.com/watch?v=DfVhbfbubAE",
    "https://www.youtube.com/watch?v=dfDgs0Ive2Q",
    "https://www.youtube.com/watch?v=wmoCIHlA2bA",
  ];

  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-5`}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">React Player</Typography>
        </Grid>
        <Grid item xs={12} className="w-full flex justify-center">
          <Typography>Inicia o video ao abrir a página</Typography>
        </Grid>

        <Grid item xs={12} className="w-full flex justify-center">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ggB0fVqVobs"
            volume={volume / 100} // 0 até 1
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
            controls
            onProgress={({ loaded }) => setProgress(loaded)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <Button variant="contained"></Button>
        </Grid>
        <Grid item xs={12}>
          {isPlaying ? <CheckCircle color="success" /> : <CheckOutlined />}
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDown />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={handleChange}
            />
            <VolumeUp />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress
            color="error"
            variant="determinate"
            value={progress * 100}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Videos do youtube - hover</Typography>
        </Grid>
        {navigationYoutubeUrls.map((url, index) => (
          <Grid item xs={4} key={url + index}>
            <ReactPlayer
              height={200}
              width={360}
              url={url}
              playing={activeIndex === index}
              // onMouseEnter={() => setActiveIndex(index)}
              // onMouseLeave={() => setActiveIndex(null)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h5">Videos do vimeo</Typography>
        </Grid>
        {navigationYoutubeUrls.map((url, index) => (
          <Grid item xs={4} key={url + index}>
            <ReactPlayer height={200} width={360} url={url} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
