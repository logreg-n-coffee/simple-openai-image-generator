"use client";
import { useState } from "react";
import Image from "next/image";
import { Box, TextField, Stack, Button } from "@mui/material";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Stack
          spacing={5}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
        >
          <Box>
            <form onSubmit={handleSubmit}>
              <TextField
                id="prompt"
                label="What would you like to generate?"
                multiline
                variant="filled"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Box marginTop={2}>
                <Button
                  variant="outlined"
                  size="large"
                  className="flex items-center justify-between mx-auto"
                  type="submit"
                >
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </Box>
            </form>
          </Box>

          <Box>
            {image && (
              <Image
                src={image}
                alt="Generated content"
                width={256}
                height={256}
                className="flex items-center justify-between mx-auto"
              />
            )}
          </Box>
        </Stack>
      </div>
    </main>
  );
}
