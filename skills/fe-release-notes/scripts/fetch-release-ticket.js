#!/usr/bin/env node

const base = 'https://track.optimajet.com'
const token = process.env.YT_TOKEN
const issueId = process.env.ISSUE_ID

if (!token) {
  throw new Error('YT_TOKEN is required')
}

if (!issueId) {
  throw new Error('ISSUE_ID is required')
}

const fields =
  'id,idReadable,summary,description,customFields(name,value(name)),links(direction,linkType(name),issues(idReadable,summary,url))'

const url = new URL(base + '/api/issues/' + encodeURIComponent(issueId))
url.searchParams.set('fields', fields)

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
