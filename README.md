# Green Room
A private little room for friends and family to watch a stream.

## Quick start
> This repo is just the front end.  I haven't written the actual backend yet but requires that you point to some rtmp or hls stream.

Create a `.env` file and add a `STREAMURL` value.
> Check `.env.example` for example

```sh
$ git clone https://github.com/jl642/greenroom.git
$ cd greenroom
$ npm install
$ npm start
```

## NPM Scripts


### **npm start**
Opens browser to the local server and starts the application with hot reload

### **npm run build**
Builds the application into `./dist` to be ready for production.

## Building your own nginx with RTMP/HLS module in Ubuntu
For the most part you just follow [this guide](https://docs.peer5.com/guides/setting-up-hls-live-streaming-server-using-nginx/).  However, there are a few changes required highlighted below

### Install Dependencies
```sh
sudo apt-get install -y build-essential libpcre3 libpcre3-dev libssl-dev zlib1g zlib1g-dev
```

### Download nginx and the RTMP/HLS module
The guide links to an older version of nginx.  You can probably use [the latest version](http://nginx.org/en/download.html) and it should still work.

### Building nginx

```sh
$ cd /path/to/downloaded/nginx
$ ./configure --with-http_ssl_module --add-module=/path/to/rtmp-module --with-http_secure_link_module
$ make
$ make install
```

This should install nginx to `/usr/local/nginx`

Edit `/usr/local/nginx/conf/nginx.conf` and replace it all with this

```
worker_processes  auto;

# change this to the location you want the pid file to go, important if you want to use nginx as a service
pid /change/this/location/nginx.pid

events {
    worker_connections  1024;
}

# RTMP configuration
rtmp {
    server {
        listen 1935; # Listen on standard RTMP port
        chunk_size 4000;

        # 'show' is the name you'll be accessing this ie. rtmp://mydomain.lol/show
        # you may want to change this to something else
        application show {
            live on;
            # Turn on HLS
            hls on;
            # change hls_path to location where you want to store the stream chunks and playlist
            hls_path /change/this/path/;
            hls_fragment 3;
            hls_playlist_length 60;
            # disable consuming the stream from nginx as rtmp
            deny play all;
        }
    }
}

http {
    sendfile off;
    tcp_nopush on;
    directio 512;
    default_type application/octet-stream;

    server {
        # http port for pointing your player
        listen 8080;

        location / {
            # Disable cache
            add_header 'Cache-Control' 'no-cache';

            # CORS setup
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Expose-Headers' 'Content-Length';

            # allow CORS preflight requests
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
            }

            types {
                application/dash+xml mpd;
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }

            # change root to the same place where you pointed hls_path above
            root /change/this/path/;
        }
    }
}
```

To make nginx a service, create the file `/lib/systemd/system/nginx.service`

```
[Unit]
Description=The nginx HTTP and reverse proxy server
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
PIDFile=/change/this/location/same/as/above/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

I'm going to assume you know how to set file permissions and all that stuff in linux to setup all the directories.

Feel free to look up more about the [nginx configuration](https://www.nginx.com/resources/wiki/start/topics/examples/full/#nginx-conf).


## Todo

* chatrooms
* unique urls ie. www.myapp.com/aDgfTsxT
* youtube/vimeo/twitch/etc. support?
* maybe switch to vue3 just because!
