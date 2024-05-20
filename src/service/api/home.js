import HYRequest from '../request'

export function getHomeHotSuggests() {
  return HYRequest.get({ 
    url: "/home/hotSuggests"
  })
}

export function getHomeCategories() {
  return HYRequest.get({
    url: "/home/categories"
  })
}

export function getHomeHouselist(currentPage) {
  return HYRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}
