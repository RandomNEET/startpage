/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {
  "cp":"https://copilot.microsoft.com/",
  "gpt":"https://chat.openai.com/",
  "dl":"https://deepl.com/",
  "gh":"https://github.com/",
  "so":"https://stackoverflow.com/",
  "yt":"https://www.youtube.com/",
  "bi":"https://bilibili.com/",
  "rd":"https://reddit.com/",
  "tw":"https://twitter.com/",
  "tg":"https://web.telegram.org/",
  "st":"https://store.steampowered.com/"
}

const engine = "duckduckgo"
const engineUrls = {
  duckduckgo: "https://duckduckgo.com/?q={query}",
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [
  {
    "id":"dev",
    "label":"dev",
    "bookmarks":[
      {
        "id":"dev-github",
        "label":"github",
        "url":"https://github.com/"
      },
      {"id":"dev-stackoverflow",
        "label":"stackoverflow",
        "url":"https://stackoverflow.com/"
      },
      {
        "id":"dev-copilot",
        "label":"copilot",
        "url":"https://copilot.microsoft.com/"
      }
    ]
  },
  {
    "id":"video",
    "label":"video",
    "bookmarks":[
      {
        "id":"video-youtube",
        "label":"youtube",
        "url":"https://www.youtube.com/"
      },
      {
        "id":"video-bilibili",
        "label":"bilibili",
        "url":"https://bilibili.com/"
      }
    ]
  },
  {
    "id":"social",
    "label":"social",
    "bookmarks":[
      {
        "id":"social-reddit",
        "label":"reddit",
        "url":"https://www.reddit.com/"
      },
      {
        "id":"social-twitter",
        "label":"twitter",
        "url":"https://twitter.com/"
      },
      {
        "id":"social-telegram",
        "label":"telegram",
        "url":"https://web.telegram.org/"
      }
    ]
  },
  {
    "id":"game",
    "label":"game",
    "bookmarks":[
      {
        "id":"game-steam",
        "label":"steam",
        "url":"https://store.steampowered.com/"
      },
      {
        "id":"game-steamdb",
        "label":"steamdb",
        "url":"https://steamdb.info/"
      }
    ]
  }
]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
