## Firefox workaround to allow https-only api's

`about:config`
`dom.securecontext.allowlist`

domain list with comma:

```
testnet.local, foo.testnet.local, bar.foo.testnet.local
```

## tune hosts-file or local dnss

`/etc/hosts`

```shell 
127.0.0.1 testnet.local
127.0.0.1 foobar.testnet.local
127.0.0.1 foo.testnet.local
127.0.0.1 bar.foo.testnet.local
127.0.0.1 example.com
```
