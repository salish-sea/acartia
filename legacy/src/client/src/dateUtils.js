import dayjs from 'dayjs'

export function getNDaysAgo(n) {
  let day = dayjs(new Date()).subtract(n, "day")
  day = day.format('YYYY-MM-DD')
  return day
}

export function getSightingCountsForPrimaryChart(sightings) {
  let data = [
    {}, //empty object to maintain consistent indexes with month
    { month: 'Jan' },
    { month: 'Feb' },
    { month: 'Mar' },
    { month: 'Apr' },
    { month: 'May' },
    { month: 'Jun' },
    { month: 'Jul' },
    { month: 'Aug' },
    { month: 'Sep' },
    { month: 'Oct' },
    { month: 'Nov' },
    { month: 'Dec' },
  ]

  for (let i = 0; i < sightings.length; i++) {
    if (data[sightings[i].properties.month] < 1 || data[sightings[i].properties.month] > 12) {
      continue
    }

    if (data[sightings[i].properties.year] < 2021 || data[sightings[i].properties.month] > 2024) {
      continue
    }

    if (data[sightings[i].properties.month][sightings[i].properties.year]) {
      data[sightings[i].properties.month][sightings[i].properties.year]++
    } else {
      data[sightings[i].properties.month][sightings[i].properties.year] = 1
    }
  }

  return data
}


