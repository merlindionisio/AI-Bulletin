const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");
const path = require("path");

// Load env vars from .env.local when running locally
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Initialize markdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

async function syncNotion() {
  console.log("Initiating live API hook to APEX HQ AI Command Center...");
  try {
    // Target specific authenticated block
    const mdblocks = await n2m.pageToMarkdown("330cd1c105d081e28872d0e1e862b9ec");
    const mdString = n2m.toMarkdownString(mdblocks);
    
    // Parse output based on varying notion-to-md library behaviors
    const finalContent = typeof mdString === 'object' ? mdString.parent : mdString;

    const outputPath = path.join(__dirname, '..', 'openclaw_knowledge.md');
    fs.writeFileSync(outputPath, finalContent || "# Failed to extract content. Page might be empty.");
    console.log("Transmission complete. Guardrails locked into 'openclaw_knowledge.md'.");
  } catch (err) {
    console.error("Transmission failed. Ensure connections were granted correctly in Notion.", err.message);
  }
}

syncNotion();
