## tune hosts-file or local dns

### Linux, MacOS

```shell 
sudo -e /etc/hosts
127.0.0.1 formengine.local
```

### Windows

```
notepad C:\Windows\System32\drivers\etc\hosts
127.0.0.1 formengine.local
```

## start service

```shell
docker compose stop
docker compose rm
docker compose up -d
```

## access local domains

- [Local Domain with HTTPS](https://formengine.local)
- [Local Domain](http://formengine.local)

