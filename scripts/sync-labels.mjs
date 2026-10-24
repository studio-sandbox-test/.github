#!/usr/bin/env node
// Create or update the studio's standard labels in one repo or every repo of the org.
//
// Usage:
//   node scripts/sync-labels.mjs <owner/repo>
//   node scripts/sync-labels.mjs --org <org>
//
// Requires the GitHub CLI (gh), logged in.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const GH = existsSync("C:\\Program Files\\GitHub CLI\\gh.exe") && process.platform === "win32"
	? "C:\\Program Files\\GitHub CLI\\gh.exe"
	: "gh";

function gh(args) {
	return execFileSync(GH, args, { encoding: "utf8" });
}

const labels = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "labels.json"), "utf8"));

const args = process.argv.slice(2);
let repos;
if (args[0] === "--org" && args[1]) {
	repos = JSON.parse(gh(["repo", "list", args[1], "--limit", "1000", "--json", "nameWithOwner"])).map(
		(r) => r.nameWithOwner,
	);
} else if (args[0] && args[0].includes("/")) {
	repos = [args[0]];
} else {
	console.error("Usage: node scripts/sync-labels.mjs <owner/repo> | --org <org>");
	process.exit(1);
}

for (const repo of repos) {
	for (const label of labels) {
		gh(["label", "create", label.name, "--color", label.color, "--description", label.description, "--force", "-R", repo]);
	}
	console.log(`${repo}: ${labels.length} labels synced`);
}
