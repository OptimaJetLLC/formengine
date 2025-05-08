import {promises as fs} from 'fs'
import axios from 'axios'

const URL = 'http://localhost:3000/api/generate/fe'

const HEADERS = {
  'Accept': '*',
  'Content-Type': 'application/json',
  Cookie: 'userData=%7B%22id%22%3A1%2C%22username%22%3A%22oj%22%2C%22passwordHash%22%3A%22%22%2C%22firstName%22%3A%22%22%2C%22lastName%22%3A%22%22%2C%22active%22%3Atrue%7D; _ga=GA1.1.1367769651.1745582492; _gcl_au=1.1.1538252040.1745582492; _ym_uid=1732271244463346334; _ym_d=1745582492; gdpr=0; _ga_J6BY719RT7=GS1.1.1745582491.1.1.1745585632.0.0.0; .AspNetCore.Cookies=CfDJ8LGHipjZC7FHgAm-myyr4laOLa75su3BYWcpRCxjhH4rFCeJaWkGKv4d9du7aGtjCb4b9zf0bkJq3Tb6kcYAWEmNPBtXjPRhoks_ytc_QGvS065SbxgncMCWtKhwIGkjABCTLJCxxHMs2a4-bmOMweDmHRYRH2gFh4eSo3Qhk2YtZIntOv1_vvGKuNIfN-j10KwD6DGsZP9He3l3MX25Fx0upo5QdVBXE-UmwxXDW-oguYlzsLZKPNLPigy4qFt5zZpD8zII5yMQIzuYV7k1pNwRT4GToPBUjUkM3hlsZVy8NYpchbqEVzDMD_iZgry6mmRtyoP3Tzm2kg9IF4ldt_R421__ah9YOWxBrTXMN_mVD7Tjuq2pxaTJZmMoO3z-EcRFbXnKnlfyejwW9jUIBSE5hBtPfu46l3XTo7knrSIh'
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
    "ftComponentTemplates": true,
    "ftComponentPreset": true,
    "ftComponentRepeater": true,
    "ftComponentTable": true,
    "ftComponentSignature": true,
    "ftComponentQrCode": true
  },
  Business: {
    "ftLocaleCount": 1,
    "ftDesignerCustomization": false,
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
  }
}

const outputDir = '../../tests/common/license'

async function write(licenses) {
  try {
    // await fs.mkdir(outputDir, {recursive: true});

    for (let i = 0; i < licenses.length; i++) {
      await fs.writeFile(`${outputDir}/${licenses[i][0]}.ts`, licenses[i][1]);
    }
  } catch (err) {
    console.error('Error:', err);
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
