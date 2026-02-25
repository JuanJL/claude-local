#!/usr/bin/env node
import fetch from "node-fetch";

const input = process.argv.slice(2).join(" ");

if (!input) {
  console.log("Usage: claude-local \"Your prompt here\"");
  process.exit(1);
}

// Pas hier je lokale Claude Max endpoint aan
const endpoint = "http://localhost:4000/api/messages";

const run = async () => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-max",
        input: input
      }),
    });
    const data = await response.json();
    console.log(data.output || data);
  } catch (err) {
    console.error("Error connecting to local Claude Max:", err);
  }
};

run();
