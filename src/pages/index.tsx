import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Inter } from "next/font/google";
import { useState } from "react";
import ReactPlayer from "react-player";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navigationYoutubeUrls = [
    "https://www.youtube.com/watch?v=DfVhbfbubAE",
    "https://www.youtube.com/watch?v=dfDgs0Ive2Q",
    "https://www.youtube.com/watch?v=wmoCIHlA2bA",
  ];

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-5 ${inter.className}`}
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
            playing
            url="https://www.youtube.com/watch?v=ggB0fVqVobs"
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
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
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
