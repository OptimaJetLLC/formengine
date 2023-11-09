// Octokit.js
// https://github.com/octokit/core.js#readme
import {Octokit} from "octokit";
import {readFileSync} from 'node:fs';

if (process.argv.length < 3) {
    throw new Error("The release configuration file does not passed.")
}

const tokenEnv = 'GITHUB_ACCESS_TOKEN'
const authToken = process.env[tokenEnv];
if (!authToken) {
    throw new Error(`Cannot find token in ${tokenEnv}`)
}

const octokit = new Octokit({auth: authToken})

const callGetReleaseByTagName = async data => {
    return await octokit.request(`GET /repos/${data.owner}/${data.repo}/releases/tags/${data.tagName}`, {
        owner: data.owner,
        repo: data.repo,
        tag: data.tagName,
        headers: {'X-GitHub-Api-Version': '2022-11-28'}
    })
}

const callUpdateRelease = async (data, release) => {
    return await octokit.request(`PATCH /repos/${data.owner}/${data.repo}/releases/${release.id}`, {
        release_id: release.id,
        owner: data.owner,
        repo: data.repo,
        tag_name: data.tagName,
        name: data.name,
        body: data.body,
        draft: false,
        prerelease: false,
        headers: {'X-GitHub-Api-Version': '2022-11-28'}
    })
}

const callCreateRelease = async data => {
    return await octokit.request(`POST /repos/${data.owner}/${data.repo}/releases`, {
        owner: data.owner,
        repo: data.repo,
        tag_name: data.tagName,
        name: data.name,
        body: data.body,
        draft: false,
        prerelease: false,
        generate_release_notes: false,
        headers: {'X-GitHub-Api-Version': '2022-11-28'}
    })
}

const createRelease = async data => {
    const releaseDescription = `'${data.name}' (tag ${data.tagName}) for ${data.owner}/${data.repo}`

    let response;
    try {
        response = await callCreateRelease(data)
    } catch (e) {
        if (!(e.status === 422
            && e.response?.data?.errors?.find(e => e.code === 'already_exists' && e.field === 'tag_name'))) {
            throw e;
        }
        console.info(`Release ${releaseDescription} has already been created.`)
        const releaseResponse = await callGetReleaseByTagName(data)
        response = await callUpdateRelease(data, releaseResponse.data)
    }

    if (response.status < 200 || response.status > 201) {
        console.error(response)
        throw new Error('Cannot create release')
    }
    console.info(`Release ${releaseDescription} successfully created or updated.`)
}

const text = readFileSync(process.argv[2], 'utf-8');
const data = JSON.parse(text)

await createRelease(data)
