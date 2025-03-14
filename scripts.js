/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
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

const bookmarks = [{"id":"F82in0q62lq4UE8C","label":"dev","bookmarks":[{"id":"wpz6zFbNM20qNK5Q","label":"github","url":"https://github.com"},{"id":"pkoGU7B7aElOALVh","label":"stackoverflow","url":"https://stackoverflow.com"},{"id":"xbYhdCpzNHvO76gA","label":"chatgpt","url":"https://chat.openai.com/"}]},{"id":"MgWePOfce5FJiOdi","label":"video","bookmarks":[{"id":"BFSc6YFtKmc8py7t","label":"youtube","url":"https://www.youtube.com/"},{"id":"1LtGuoTu1p2YRfzh","label":"bilibili","url":"https://bilibili.com/"}]},{"id":"6rHz2iOVNWVJ0evH","label":"social","bookmarks":[{"id":"qa3WIKY2KrYKTty0","label":"reddit","url":"https://www.reddit.com/"},{"id":"DjFc2OZmFV5qBAqW","label":"twitter","url":"https://twitter.com/"},{"id":"NGfWhik2alKk2nXg","label":"telegram","url":"https://web.telegram.org/"}]},{"id":"wgbHHywd8d3MX2hk","label":"game","bookmarks":[{"id":"bATX1DhdUgfoF7mr","label":"steam","url":"https://store.steampowered.com/"},{"id":"BRkB4INBZ5eJMGXu","label":"steamdb","url":"https://steamdb.info/"}]}]

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
