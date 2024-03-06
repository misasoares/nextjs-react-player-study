"use client";
import { CheckCircle, CheckOutlined } from "@mui/icons-material";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Button, LinearProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { useState } from "react";
//import ReactPlayer from "react-player";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navigationYoutubeUrls = [
    "https://www.youtube.com/watch?v=DfVhbfbubAE",
    "https://www.youtube.com/watch?v=dfDgs0Ive2Q",
    "https://www.youtube.com/watch?v=wmoCIHlA2bA",
  ];

  const navigationVimeoUrls = [
    "https://vimeo.com/347152004",
    "https://vimeo.com/82045045",
    "https://vimeo.com/378840916",
  ];

  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, setPlay] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(30);
  const [volumeVideo, setVolumeVideo] = useState<number>(0.5);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleVolume = (action: string) => {
    action === "turn up"
      ? setVolumeVideo(volumeVideo + 0.1)
      : setVolumeVideo(volumeVideo - 0.1);
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
        </Grid>
        <div className="w-full flex justify-center">
          <div className="w-2/4">
            <Grid item xs={4}>
              {isPlaying ? <CheckCircle color="success" /> : <CheckOutlined />}
            </Grid>
            <Grid item xs={12}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
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
          </div>
        </div>

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
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h5">Videos do vimeo</Typography>
        </Grid>
        {navigationVimeoUrls.map((url, index) => (
          <Grid item xs={4} key={url + index}>
            <ReactPlayer controls height={200} width={360} url={url} />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Typography variant="h5">Video em loop e velocidade 2x</Typography>
        </Grid>
        <Grid item xs={12} className="w-full flex justify-center">
          <ReactPlayer
            playing
            loop
            volume={0}
            playbackRate={2}
            url="https://www.youtube.com/watch?v=yXGaDsFzQY0"
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5">Video com botões</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        className="w-full flex flex-col items-center justify-center"
      >
        <div style={{ pointerEvents: "none" }}>
          <ReactPlayer
            playing={play}
            volume={volumeVideo}
            url="https://www.youtube.com/watch?v=dfDgs0Ive2Q"
          />
        </div>
        <div
          className="flex justify-between flex-row mt-3"
          style={{ width: "640px" }}
        >
          <Button
            variant="outlined"
            onClick={() => setPlay(!play)}
            color="secondary"
          >
            {play ? "Pause" : "Play"}
          </Button>
          <div className="flex flex-row items-center justify-center gap-5">
            <p>Volume</p>

            <Button
              variant="outlined"
              onClick={() => handleVolume("turn down")}
              color="success"
            >
              -
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleVolume("turn up")}
              color="success"
            >
              +
            </Button>
          </div>
        </div>
        <ReactPlayer
          url="videos/exemplo1.mp4"
          controls
          config={{
            file: {
              attributes: {
                onContextMenu: (e: any) => e.preventDefault(),
                controlsList: "nodownload",
              },
            },
          }}
        />
      </Grid>
    </main>
  );
}
