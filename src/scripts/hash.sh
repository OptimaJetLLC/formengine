cat ${1} | openssl dgst -sha512 -binary | openssl base64 -A
