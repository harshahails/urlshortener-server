const LongUrlSchema = require("../models/link");
const UrlAnalyticsSchema = require("../models/analytics");
const isUrl = require("../node_modules/validator/lib/isURL");
const helper = require("../util/helper");

const saveUrl = (req, res) => {
  if (req.body.url && isUrl(req.body.url)) {
    const link = new LongUrlSchema(req.body);
    link.save((err, doc) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      }

      if (doc) {
        const code = helper.encrypt(doc._id);
        res.status(201).json({
          code: code,
          link: req.protocol + "://" + req.get("host") + "/" + code
        });
      }
    });
  } else {
    res
      .status(400)
      .json({
        message: "Bad request: url is undefined or not formatted properly"
      });
  }
};

const getUrl = (req, res) => {
  if (req.params.code) {
    const id = helper.decrypt(req.params.code);

    const update = { $inc: { hits: 1 } };

    LongUrlSchema.findByIdAndUpdate(id, update, (err, link) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      }

      if (link === null)
        return res.status(404).json({ message: "Resource Not Found" });

      const analytics = new UrlAnalyticsSchema({
        urlId: link._id,
        geo: helper.getRequestingGeoLocation(req),
        browser: helper.getRequestingBrowser(req.useragent),
        platform: helper.getRequestingPlatform(req.useragent)
      });

      analytics.save((err, doc) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Internal Server Error", error: err });
        }

        if (doc) {
          res.status(302).redirect(helper.addHttp(link.url));
        }
      });
    });
  }
};

module.exports = {
  saveUrl,
  getUrl
};
