/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input");
const searchButton = document.querySelector("#searchbar > button");

const lookup = {
  gh: "https://github.com/",
  hn: "https://news.ycombinator.com/",
  yt: "https://www.youtube.com/",
  bi: "https://bilibili.com/",
  rd: "https://reddit.com/",
  tw: "https://twitter.com/",
  rd: "https://reddit.com/",
  cp: "https://copilot.github.com/",
  gpt: "https://chatgpt.com/",
};

const engine = "duckduckgo";
const engineUrls = {
  duckduckgo: "https://duckduckgo.com/?q={query}",
  google: "https://www.google.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
};

const isWebUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getTargetUrl = (value) => {
  if (isWebUrl(value)) return value;
  if (lookup[value]) return lookup[value];
  const url = engineUrls[engine] ?? engine;
  return url.replace("{query}", value);
};

const search = () => {
  const value = searchInput.value;
  const targetUrl = getTargetUrl(value);
  window.open(targetUrl, "_self");
};

searchInput.onkeyup = (event) => event.key === "Enter" && search();
searchButton.onclick = search;

/**
 * inject bookmarks into html
 */

const bookmarks = [
  {
    id: "ai",
    label: "ai",
    bookmarks: [
      {
        id: "ai-copilot",
        label: "copilot",
        url: "https://copilot.github.com/",
      },
      {
        id: "ai-chatgpt",
        label: "chatgpt",
        url: "https://chatgpt.com/",
      },
    ],
  },
  {
    id: "dev",
    label: "dev",
    bookmarks: [
      {
        id: "dev-github",
        label: "github",
        url: "https://github.com/",
      },
      {
        id: "dev-hackernews",
        label: "hackernews",
        url: "https://news.ycombinator.com/",
      },
    ],
  },
  {
    id: "watch",
    label: "watch",
    bookmarks: [
      {
        id: "watch-youtube",
        label: "youtube",
        url: "https://www.youtube.com/",
      },
      {
        id: "watch-bilibili",
        label: "bilibili",
        url: "https://bilibili.com/",
      },
    ],
  },
  {
    id: "social",
    label: "social",
    bookmarks: [
      {
        id: "social-reddit",
        label: "reddit",
        url: "https://www.reddit.com/",
      },
      {
        id: "social-twitter",
        label: "twitter",
        url: "https://twitter.com/",
      },
    ],
  },
];

const createGroupContainer = () => {
  const container = document.createElement("div");
  container.className = "bookmark-group";
  return container;
};

const createGroupTitle = (title) => {
  const h2 = document.createElement("h2");
  h2.innerHTML = title;
  return h2;
};

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = url;
  a.innerHTML = label;
  li.append(a);
  return li;
};

const createBookmarkList = (bookmarks) => {
  const ul = document.createElement("ul");
  bookmarks.map(createBookmark).forEach((li) => ul.append(li));
  return ul;
};

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer();
  const title = createGroupTitle(label);
  const bookmarkList = createBookmarkList(bookmarks);
  container.append(title);
  container.append(bookmarkList);
  return container;
};

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks");
  bookmarksContainer.append();
  bookmarks
    .map(createGroup)
    .forEach((group) => bookmarksContainer.append(group));
};

injectBookmarks();
