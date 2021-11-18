/*
 * @Author: linzhihai
 * @Date: 2021-10-08 14:53:56
 * @LastEditTime: 2021-10-08 14:54:33
 * @Description: 
 */
const SSH2Promise = require('ssh2-promise');
const scp2 = require('scp2');
const shelljs = require('shelljs');
const path = require('path');

const publicKey = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCmkEqUVasAkWSwzrN6ekaLOQcchN1qFiPnzniuys8vxBUzZ1AOVKr9W90UpewX6XVfb1cIJKoyae5nYm92YSAe7kDUChWRNjmBbR0ahlrObukIwDzK8cnSUn0yDGVEcFl9BStYCsZRjNRm0WKgUOBmm35bEKYuawPnpfGYJPSPUroltsCeMb/xOuUY8sPSvRc++DL73osvE2z9hLugF3rFqL17MDFXsvkGkteLmEhzH4xnLSU4Sack5GUIYd+mDVCfabxM5KrPyDFsWzmnuRa8yEhUZ/wWSDJMX9Ah6xsB5u7uIUdY3ChsgHZB234TfIWli6W/Xl6JFyjIFoTEXQ+T';

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAppBKlFWrAJFksM6zenpGizkHHITdahYj5854rsrPL8QVM2dQ
DlSq/VvdFKXsF+l1X29XCCSqMmnuZ2JvdmEgHu5A1AoVkTY5gW0dGoZazm7pCMA8
yvHJ0lJ9MgxlRHBZfQUrWArGUYzUZtFioFDgZpt+WxCmLmsD56XxmCT0j1K6JbbA
njG/8TrlGPLD0r0XPvgy+96LLxNs/YS7oBd6xai9ezAxV7L5BpLXi5hIcx+MZy0l
OEmnJORlCGHfpg1Qn2m8TOSqz8gxbFs5p7kWvMhIVGf8FkgyTF/QIesbAebu7iFH
WNwobIB2Qdt+E3yFpYulv15eiRcoyBaExF0PkwIDAQABAoIBAHJkLGQdRbi5Ic7v
1oFqEqKxArpKYYnnNLeRrH5W2N30K59G98svyNMB0R7KKQ/vDOYDIGF+VMkUyV+F
UgmaAKZdeHZnipJVDD9gAZni5eBaeX7CD75NOg9RCZxiuPW8tyjOcQshMzx0nLcU
XEi/4q11Yt0F3SuJ4X+pDvgvgSogSUS1FyCqYdLyzTmWKivgBqdiPpprfP0b4SMG
Ame6O/02/UOvN+FlA20dncFJpp/kLWPSIxzoBP5VXtOUJhkxiQIDWZ0+2RUDo+DF
gWJEFOQ/fwz1aBViVIyfidmaRHdcT+PlOZbEmy1ccLEMv5pFhs3HM0iETQ1+17SK
Pfkqh7ECgYEA3imM9oF6QlPoI4T3UNTpQl/aB1lmhqccRI0fHJAF/NOXawMlp9ps
2JRfze2/TYX6c3NKhBU9UY+e2Rw0lL0AfqhmAVVqdgryCYEYEszmVWFbmcArunKq
pA7axNKsX7DzyzAIDGfrZWM/Xyg69Wa0vY4HT7GdAf63i9gYvvc4tusCgYEAv+7c
/R2Z5P+5Nt5gNBFUY4YSLNBc3iQeI/I/W35oNYPj7mCyJW1MMlPgslyBHzpqBSGA
9D2KfTxwNCwXH6RFKuaxwrXFE+xD/5cqrqPHvi/qrlZrFVsA1fC8DDgCia/fuF+r
e3l07yOf9i02lCiLjbd8I8aO9BGuFIJGXkJaL/kCgYEAhmszjC7ZL2qfSWZ5UWIR
ZISkYc/41b4kv2F3koud49SOiEQWM5JYS06zDOEt35UR7WqzimljeYbhgNGtCtW0
h+4SEfqBeLy0p4WBcFajgsNubf+1NZGNp8gJHA+wFhH14FnGdOMnrWe4fzXTPooP
D6XwzIpVylA49BcjGeBxY1MCgYB+M/0hflZUCoZp+rz9X6vCqUTILNXzx4H+Furs
KWkyTyAP/YsGKyEgMqEcBtFsjEdsSkR11QV8JcKNu7QUvTox5HFcW5NT71Yi+O46
2Tyc5PsGWZKd/zHEez/bNPUOPhP4MwgZ75ohKKalA8PQlfx1WgIJsCUNfZaeq67D
ihOtWQKBgQCiGretBKx03rpvPBBTSZNxel94mwTOj/5l66eg/NjOdcGiiLNLvzLf
b43m/7GusGO9AggqpWJRbJkLJI709f7LjJBrrc8mtKk6PsCk3TDGCsLOBgpFSZAl
t0SapmAS2AM9GZVpBhLvPPBLD3sudaFObNsDDH16iMJo62o7ox75vg==
-----END RSA PRIVATE KEY-----`;

const DEVELOP_PATH = '/data/weike/develop';

const config = {
  host: '139.199.89.56',
  port: 22,
  username: 'weike',
  privateKey,
};

const ssh = new SSH2Promise(config);

async function __main__() {
  try {
    const deployPrefix = process.argv[2].trim().replace(/\.\./g, '');
    if (!deployPrefix) {
      return;
    }
    console.log(`代码将部署至 /${deployPrefix}/`);

    console.log('1.编译项目');
    shelljs.env.PUBLIC_URL = `/${deployPrefix}/`;
    shelljs.exec('npm run build');

    const uplodaDict = 'build/';

    console.log('2.部署至服务器');
    const conn = await ssh.connect();
    console.log('SSH 链接成功');

    const deployPath = path.join(DEVELOP_PATH, deployPrefix);
    console.log('清理目录', deployPath);
    await ssh.exec(`rm -rf ${deployPath}`);

    console.log('上传至服务器');
    await new Promise((resolve, reject) => scp2.scp(uplodaDict, { ...config, path: deployPath }, err => (err ? reject(err) : resolve())));
    console.log('上传成功');
  } catch (err) {
    console.log('上传失败');
  } finally {
    await ssh.close();
    console.log('SSH 链接关闭');
    process.exit();
  }
}

__main__();
