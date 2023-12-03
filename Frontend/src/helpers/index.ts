export const shortenText = (text: string) => {
  if (!text) return
  // shorten text
  if (text.length > 25) {
    return text.slice(0, 25) + '...'
  }
  return text
}

export const formatDate = (date: Date | string | undefined, dateOnly = false) => {
  // format data mm.dd.yy hh:mm
  if (!date) return '-'
  if (typeof date === 'string') {
    date = new Date(date)
  }
  if (dateOnly) {
    return date.toLocaleDateString()
  }
  return date.toLocaleString()
}