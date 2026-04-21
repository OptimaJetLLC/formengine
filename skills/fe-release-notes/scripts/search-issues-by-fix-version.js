#!/usr/bin/env node

const base = 'https://track.optimajet.com'
const token = process.env.YT_TOKEN
const fixVersion = process.env.FIX_VERSION

if (!token) {
  throw new Error('YT_TOKEN is required')
}

if (!fixVersion) {
  throw new Error('FIX_VERSION is required')
}

const url = new URL(base + '/api/issues')
url.searchParams.set('query', 'Fix versions: ' + fixVersion)
url.searchParams.set('fields', 'idReadable,summary')

fetch(url, {
  headers: {
    Authorization: 'Bearer ' + token,
    Accept: 'application/json',
  },
})
  .then(res => {
    if (!res.ok) {
      throw new Error('YouTrack request failed: ' + res.status + ' ' + res.statusText)
    }

    return res.json()
  })
  .then(json => {
    console.log(JSON.stringify(json, null, 2))
  })
  .catch(err => {
    console.error(err.message)
    process.exitCode = 1
  })
