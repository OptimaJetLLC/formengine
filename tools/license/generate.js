import {promises as fs} from 'node:fs'
import axios from 'axios'

const URL = 'http://localhost:3000/api/generate/fe'

const HEADERS = {
  'Accept': '*',
  'Content-Type': 'application/json',
  Cookie: '_ga=GA1.1.241856649.1760629457; _gcl_au=1.1.1621790874.1760629457; _clck=yp769q%5E2%5Eg0b%5E0%5E2115; _rdt_uuid=1760629457894.46133cc3-ef46-40c8-beba-faed4e562f5e; _ga_MNS3X8H57G=GS2.1.s1760961585$o2$g1$t1760961781$j60$l0$h0; _ga_J6BY719RT7=GS2.1.s1760961585$o2$g1$t1760961781$j60$l0$h0; .AspNetCore.Cookies=CfDJ8G55VI_KI5tPmzNZTQtWpvh6y5v5Ec-5ZyYGNQ3JAW6uo6pCelxAPdbJoXA5CKlKamRfaI9IytJEiP5VOZgjGuK53YKxTugIq-Vn40piEUEbpVfUaGq3gpSG4E3oJqJHsuSgQXGw_je5DS1yvWWqyYZljP2wlY0vuicmXAdISA7Yv4nz1oDeX59brpDFZwbaoCs_QSpqB6JkgwKRCVAEDSXzn-U4fcdCHb0FwgZhQKvEvqCrvnJh0Yywv-gAqy-DWrrdwS8VnXeWiJiYdurR-QROMVB6HHQsEkU2a3hmMEjh4O471Eq5q5uG8WGypgUiTUq3g-enGrzWwWIGO3EZxvzNuqdu2SNeKb7hgcQQCl0Yb18NookA_-RrqiqAfMW-GHgNpDSZuxXuls3k59V4hOXIQkTftxY8ve6FsWB41CemeHnUUsQ-Uy2TmqqVUcepLw; userData=%7B%22id%22%3A1%2C%22username%22%3A%22username%22%2C%22passwordHash%22%3A%22%22%2C%22firstName%22%3A%22first_name%22%2C%22lastName%22%3A%22last_name%22%2C%22active%22%3Atrue%7D'
}

const expiredDate = "2024-01-01T00:00:00.000Z"
const futureDate = "2030-01-01T00:00:00.000Z"

const domains = [
  "testnet.local",
  "foo.testnet.local",
  "bar.foo.testnet.local",
  "*.testnet.local",
  "*.foo.testnet.local"
]

const domainsPort = domains.map(d => d + ':5173')

const anyDomain = ['*']

const allDomain = [...domains, ...domainsPort]

const licenseTypes = ['Enterprise', 'Business']

const restrictions = {
  Enterprise: {
    "ftLocaleCount": -1,
    "ftDesignerCustomization": true,
    "ftElectron": true,
    "ftComponentTemplates": true,
    "ftComponentPreset": true,
    "ftComponentRepeater": true,
    "ftComponentTable": true,
    "ftComponentSignature": true,
    "ftComponentQrCode": true,
  },
  Business: {
    "ftLocaleCount": 1,
    "ftDesignerCustomization": false,
    "ftElectron": false,
    "ftComponentTemplates": false,
    "ftComponentPreset": false,
    "ftComponentRepeater": false,
    "ftComponentTable": false,
    "ftComponentSignature": false,
    "ftComponentQrCode": false
  }
}

const createPayload = ({licenseType, strict, endDate, domains, restrictions}) => ({
  licenseParams: {
    FE: {
      StrictCheck: strict,
      domains: domains || [],
      ...restrictions,
    }
  },
  endDate,
  productType: "FE",
  licenseType,
  companyName: "TRIAL",
  bitrixUrl: "demo"
})

async function getLicense(payload) {
  try {
    const {data: {key}} = await axios.post(URL, payload, {headers: HEADERS})
    return key
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

const outputDir = '../../src/tests/common/license'

async function write(licenses) {
  try {
    // await fs.mkdir(outputDir, {recursive: true});

    for (let i = 0; i < licenses.length; i++) {
      await fs.writeFile(`${outputDir}/${licenses[i][0]}.ts`, licenses[i][1]);
    }
  } catch (err) {
    console.error('Error:', err);
    process.exit(1)
  }
}

function kebabToLicensedCamel(str) {
  const camelStr = str.replace(/-([a-z0-9])/g, function (match, group) {
    return group.toUpperCase();
  });

  return 'license' + camelStr.charAt(0).toUpperCase() + camelStr.slice(1);
}

async function main() {
  const licenses = []

  for (const licenseType of licenseTypes) {
    for (const endDate of [expiredDate, futureDate]) {
      for (const strict of [true, false]) {
        for (const domains of [[], anyDomain, allDomain]) {
          const payload = createPayload({
            licenseType,
            endDate,
            strict,
            domains,
            restrictions: restrictions[licenseType]
          })
          const key = await getLicense(payload)
          const year = (new Date(endDate)).getFullYear()

          let filename = licenseType.toLowerCase()
          if (strict) filename += '-strict'
          filename += `-${year}`
          switch (domains.length) {
            case 0:
              filename += '-no-domain'
              break
            case 1:
              filename += '-any-domain'
              break
            default:
              filename += '-multiple-domains'
          }

          const varName = kebabToLicensedCamel(filename)

          const content = `/*` +
            `${JSON.stringify(payload, null, 2)}` +
            `*/\n` +
            `export const ${varName} = '${key}'`

          console.log(filename, content)
          licenses.push([filename, content])

        }
      }
    }
  }

  await write(licenses)
}

await main()
