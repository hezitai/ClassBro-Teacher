import defaultSettings from '@/settings'

const title = defaultSettings.title || '万能讲师'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
