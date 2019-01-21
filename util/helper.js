const isIP = require("../node_modules/validator/lib/isIP");

const alphabets = "23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_",
  base = alphabets.length;
const NA = "NA";

const encrypt = num => {
  let code = "";
  while (num > 0) {
    code = alphabets.charAt(num % base) + code;
    num = Math.floor(num / base);
  }
  return code;
};

const decrypt = code => {
  let num = 0;
  for (let i = 0; i < code.length; i++) {
    num = num * base + alphabets.indexOf(code.charAt(i));
  }
  return num;
};

const getRequestingGeoLocation = req => {
  return req.geoip ? req.geoip.country : isIP(req.ip) ? req.ip : NA;
};

const getRequestingBrowser = useragent => {
  return useragent.browser || NA;
};

const getRequestingPlatform = useragent => {
  return useragent.platform || NA;
};

const addHttp = url => {
  if (!/^(f|ht)tps?:\/\//i.test(url) && url.trim().length !== 0) {
    url = "http://" + url;
  }
  return url;
};

module.exports = {
  encrypt,
  decrypt,
  getRequestingGeoLocation,
  getRequestingPlatform,
  getRequestingBrowser,
  addHttp
};
