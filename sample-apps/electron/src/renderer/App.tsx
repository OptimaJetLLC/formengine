import './monaco-settings';
import React from 'react';
import {BuilderView, FormBuilder} from '@react-form-builder/designer';
import {rSuiteComponents} from '@react-form-builder/components-rsuite';

const components = rSuiteComponents.map((c) => c.build());
const builderView = new BuilderView(components);

const allowedByLicense = true

const licenseBusinessStrict2030AnyDomain =
  'TRIAL-eyJsaWNlbnNlRW5kRGF0ZSI6IjAxLjAxLjIwMzAiLCJyZWxlYXNlRXhwaXJ5IjoiMDEuMDEuMjAzMCIsImNvbXBhbnlOYW1lIjoiVFJJQUwiLCJyZXN0cmljdGlvbnMiOnsiU3RyaWN0Q2hlY2siOnRydWUsImRvbWFpbnMiOlsiKiJdLCJmdExvY2FsZUNvdW50IjoxLCJmdERlc2lnbmVyQ3VzdG9taXphdGlvbiI6ZmFsc2UsImZ0RWxlY3Ryb24iOmZhbHNlLCJmdENvbXBvbmVudFRlbXBsYXRlcyI6ZmFsc2UsImZ0Q29tcG9uZW50UHJlc2V0IjpmYWxzZSwiZnRDb21wb25lbnRSZXBlYXRlciI6ZmFsc2UsImZ0Q29tcG9uZW50VGFibGUiOmZhbHNlLCJmdENvbXBvbmVudFNpZ25hdHVyZSI6ZmFsc2UsImZ0Q29tcG9uZW50UXJDb2RlIjpmYWxzZX19:cdOcTXM8IG5nmwS4MlkJEY/pvFq+o5hRFCcamiJsZ8OSPpCF4aMqVaA9GiKTKehsH6Gx2TTZ4m0ziCixL7xJ4vCyLpWJJYxwPLSjgm3G8fumzM/CZLn4Y/HZPOJgwWfA';

export const licenseEnterprise2030NoDomain = 'TRIAL-eyJsaWNlbnNlRW5kRGF0ZSI6IjAxLjAxLjIwMzAiLCJyZWxlYXNlRXhwaXJ5IjoiMDEuMDEuMjAzMCIsImNvbXBhbnlOYW1lIjoiVFJJQUwiLCJyZXN0cmljdGlvbnMiOnsiU3RyaWN0Q2hlY2siOmZhbHNlLCJkb21haW5zIjpbXSwiZnRMb2NhbGVDb3VudCI6LTEsImZ0RGVzaWduZXJDdXN0b21pemF0aW9uIjp0cnVlLCJmdEVsZWN0cm9uIjp0cnVlLCJmdENvbXBvbmVudFRlbXBsYXRlcyI6dHJ1ZSwiZnRDb21wb25lbnRQcmVzZXQiOnRydWUsImZ0Q29tcG9uZW50UmVwZWF0ZXIiOnRydWUsImZ0Q29tcG9uZW50VGFibGUiOnRydWUsImZ0Q29tcG9uZW50U2lnbmF0dXJlIjp0cnVlLCJmdENvbXBvbmVudFFyQ29kZSI6dHJ1ZX19:hqYDHlyLHhYPwjCI/De8LKl758XO+znenYfwNo4eoD2Lfn9W0ERJdCeV0tO/VyGBCzNTUvljy0m4vL6OvPZ/IZCA6O4qUqq/Yo+sKcvPwO5EKlEWgKBCIoMIZ5tv8RXr'

const license = allowedByLicense ? licenseEnterprise2030NoDomain : licenseBusinessStrict2030AnyDomain

const style = {width: '97vw', height: '97vh'};

export default function App() {
  return (
    <div style={style}>
      <FormBuilder
        view={builderView}
        licenseKey={license}
      />
    </div>
  );
}
