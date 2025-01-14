/**
 * EspressoJS - Hippie's Fav Server Plate
 * Powered by Vimedev.com Labs
 * ----
 * API Routers
 * ---
 */

const express = require("express");
const axios = require("axios");
const router = express.Router();
const configuration = require("../../server");

const getAPI = (req, res) => {
  axios
    .get(configuration.swapi.uri, configuration.swapi.configs)
    .then(function (response) {
      if (response.status == 200) {
        res.json(response.data);
      } else if (response.status == 400) {
        res.json({ message: "400" });
      }
    })
    .catch((err) => res.send(err));
};

const getItem = (req, res, params) => {
  axios
    .get(configuration.swapi.uri + "/" + params, configuration.swapi.configs)
    .then(function (response) {
      if (response.status == 200) {
        res.json(response.data);
      } else if (response.status == 400) {
        res.json({ message: "400" });
      }
    })
    .catch((err) => res.send(err));
};

const getItemId = (req, res, params, paramsId) => {
  axios
    .get(
      configuration.swapi.uri + params + "/" + paramsId + "/",
      configuration.swapi.configs
    )
    .then(function (response) {
      if (response.status == 200) {
        res.json(response.data);
      } else if (response.status == 400) {
        res.json({ message: "400" });
      }
    })
    .catch((err) => res.send(err));
};
router.get("/v1/", (req, res) => {
  getAPI(req, res);
});
router.get("/v1/:item", (req, res, next) => {
  getItem(req, res, req.params.item);
});
router.get("/v1/:item/:itemId", (req, res, next) => {
  getItemId(req, res, req.params.item, req.params.itemId);
});

module.exports = router;
