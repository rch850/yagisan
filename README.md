# yagisan
> Yagisan forwards emails like mailgun.

[![NPM version](https://badge.fury.io/js/yagisan.png)](http://badge.fury.io/js/yagisan)
[![Build Status](https://travis-ci.org/rch850/yagisan.png?branch=master)](https://travis-ci.org/rch850/yagisan)
[![Code Climate](https://codeclimate.com/github/rch850/yagisan.png)](https://codeclimate.com/github/rch850/yagisan)

Yagisan can:

  - forward emails like [mailgun](http://www.mailgun.com/).

Yagisan cannot:

  - retry forwarding emails.

INSTALL
-------

```shell
npm install -g yagisan
```

in your /etc/aliases...

```shell
register:   "| yagisan -k key-like-mailgun -d https://yourdomain/endpoint"
```

then, yagisan eats your email which is sent to `register@yourdomain` and
forward it to `https://yourdomain/endpoint` in json format.

