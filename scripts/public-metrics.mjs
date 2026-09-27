#!/usr/bin/env node

const repo = process.argv[2];

if (!repo || !/^[^/]+\/[^/]+$/.test(repo)) {
  console.error("Usage: npm run metrics -- owner/repository");
  process.exit(2);
}

const headers = { accept: "application/vnd.github+json", "user-agent": "workflow-stoplight-metrics" };
const response = await fetch(`https://api.github.com/repos/${repo}`, { headers });
if (!response.ok) {
  console.error(`GitHub API returned ${response.status}`);
  process.exit(1);
}

const data = await response.json();
const releasesResponse = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=5`, { headers });
const releases = releasesResponse.ok ? await releasesResponse.json() : [];

console.log(JSON.stringify({
  repo: data.full_name,
  url: data.html_url,
  stars: data.stargazers_count,
  forks: data.forks_count,
  openIssues: data.open_issues_count,
  watchers: data.subscribers_count,
  releases: releases.map((release) => ({ tag: release.tag_name, url: release.html_url, publishedAt: release.published_at })),
  fetchedAt: new Date().toISOString()
}, null, 2));
