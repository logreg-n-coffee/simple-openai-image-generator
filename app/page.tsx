"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Box,
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
  Container,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";

// custom fonts
import { Racing_Sans_One } from "next/font/google";
const racingSansOne = Racing_Sans_One({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [size, setSize] = useState<string>("256x256");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({
          prompt,
        }),
      });
      const { imageUrl } = await res.json();
      setImage(imageUrl);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const [width, height] = size.split("x").map(Number);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Stack
          spacing={3}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 3, font: "Inter" }}
            className={racingSansOne.className}
          >
            OpenAI Image Generator
          </Typography>

          <form onSubmit={handleSubmit}>
            <Container>
              <Box display="flex" alignItems="right" justifyContent="right">
                <FormControl sx={{ mr: 1, minWidth: 100 }} size="small">
                  <InputLabel id="image-size-label">Size</InputLabel>
                  <Select
                    labelId="image-size-label"
                    id="size"
                    label="Size"
                    value={size}
                    onChange={(e) => setSize(e.target.value as string)}
                  >
                    <MenuItem value="">
                      <em>Image Size</em>
                    </MenuItem>
                    <MenuItem value="256x256">256 x 256</MenuItem>
                    <MenuItem value="512x512">512 x 512</MenuItem>
                    <MenuItem value="1024x1024">1024 x 1024</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Container>
            <Stack direction="column" spacing={1}>
              <Container>
                <TextField
                  id="prompt"
                  label="What would you like to generate?"
                  multiline
                  variant="filled"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </Container>

              <Container>
                <Button
                  variant="outlined"
                  size="large"
                  className="flex items-center justify-between mx-auto"
                  type="submit"
                >
                  {loading ? "Loading..." : "Generate"}
                </Button>
              </Container>
            </Stack>
          </form>

          <Container>
            {image && (
              <Image
                src={image}
                alt="Generated content"
                width={width}
                height={height}
                className="flex items-center justify-between mx-auto"
              />
            )}
          </Container>
        </Stack>
      </div>
    </main>
  );
}
