// const express = require("express");
// const app = express();
// const cors = require("cors");
// const PORT = 3000;

// app.use(cors());

// // Define your static data
// const staticData = [
//   {
//     id: 1,
//     name: "Silk Kurta",
//     url: "https://www.etsy.com/in-en/listing/1309852010/silk-kurta-sets-for-women-indian-wedding?ref=anchored_listing&pro=1&frs=1&sts=1",
//   },
//   {
//     id: 2,
//     name: "Handmade Sky Blue Jacket",
//     url: "https://etsy.com/in-en/listing/1011925739/handmade-elegant-jodhpuri-sky-blue-nehru?ref=anchored_listing&pro=1&frs=1",
//   },
//   {
//     id: 3,
//     name: "Menista Suite Stylish",
//     url: "https://www.etsy.com/in-en/listing/1153716558/menista-suit-stylish-three-piece-beige?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=mens+clothing&ref=sc_gallery-1-2&pro=1&frs=1&plkey=d10ad5c41af6d688f2db83ca6c9b2474548cc4fa%3A1153716558",
//   },
// ];

// // Create an API endpoint
// app.get("/allproducts", (req, res) => {
//   //   console.log(staticData);
//   res.json(staticData);
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const request = require("request");
// const fetch = require("node-fetch"); // Import node-fetch package

const PORT = process.env.PORT || 8001;

// const client_id = "0aa6qx7gfy3cds87hvijwe40";
const client_id = "aoeoryx59j26t30056nqabv8";
const clientVerifier = "5w_otfPzFzad3vLmZPSz_HZlbJPaOJiJiTLIheQ4w7w";
// const redirectUri = "http://localhost:8001/application/oauth/redirect";
// const redirectUri = "https://sellerkin-backend.onrender.com/callback";
const redirectUri = "https://sellerkin.onrender.com/callback";
// const redirectUri = "https://www.sellerkin.com/callback";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/application/listings/active", (req, res) => {
  // const client_id = req.params.client_id;
  const limit = req.query.limit;
  const keywords = req.query.keywords;
  const sort_on = req.query.sort_on;
  const offset = req.query.offset;
  const shop_location = req.query.shop_location;
  const taxonomy_id = req.query.taxonomy_id;
  const min_price = req.query.min_price;
  const max_price = req.query.max_price;
  // console.log("keywords: ", keywords);
  if (true) {
    request(
      {
        // url: `https://api.etsy.com/v3/application/listings/active?client_id=${client_id}&limit=${limit}&keywords=${keywords}`,
        url: `https://api.etsy.com/v3/application/listings/active?limit=${limit}&keywords=${keywords}&offset=${offset}&sort_on=${sort_on}&client_id=${client_id}`,
      },
      (error, response, body) => {
        // console.log("server body: ", body);
        if (error) {
          return res
            .status(500)
            .json({ type: "error", message: error.message });
        }
        res.json({ body });
      }
    );
  } else {
    alert("please provide all details!");
  }
});

app.get("/application/listings/:listingid", (req, res) => {
  // const client_id = req.params.client_id;
  const listing_id = req.params.listingid;
  if (true) {
    request(
      {
        // url: `https://api.etsy.com/v3/application/listings/active?client_id=${client_id}&limit=${limit}&keywords=${keywords}`,
        url: `https://openapi.etsy.com/v3/application/listings/${listing_id}?client_id=${client_id}`,
      },
      (error, response, body) => {
        // console.log("server body: ", body);
        if (error) {
          return res
            .status(500)
            .json({ type: "error", message: error.message });
        }
        res.json({ body });
      }
    );
  } else {
    alert("please provide all details!");
  }
});

app.get("/application/listings/:listingid/reviews", (req, res) => {
  // const client_id = req.params.client_id;
  const listing_id = req.params.listingid;
  if (true) {
    request(
      {
        // url: `https://api.etsy.com/v3/application/listings/active?client_id=${client_id}&limit=${limit}&keywords=${keywords}`,
        url: `https://openapi.etsy.com/v3/application/listings/${listing_id}/reviews?client_id=${client_id}`,
      },
      (error, response, body) => {
        // console.log("server body: ", body);
        if (error) {
          return res
            .status(500)
            .json({ type: "error", message: error.message });
        }
        res.json({ body });
      }
    );
  } else {
    alert("please provide all details!");
  }
});

app.get("/application/listings/:listingid/images", (req, res) => {
  const listing_id = req.params.listingid;
  request(
    {
      url: `https://openapi.etsy.com/v3/application/listings/${listing_id}/images?client_id=${client_id}`,
    },
    (error, response, body) => {
      // console.log("server body: ", body);
      if (error) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      res.json({ body });
    }
  );
});

app.get("/application/shops", (req, res) => {
  const shop_name = req.query.shop_name;
  request(
    {
      url: `https://openapi.etsy.com/v3/application/shops?shop_name=${shop_name}&client_id=${client_id}`,
    },
    (error, response, body) => {
      // console.log("server body: ", body);
      if (error) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      res.json({ body });
    }
  );
});

app.get("/application/shops/:shopid/listings/featured", (req, res) => {
  const shop_id = req.params.shopid;
  request(
    {
      // url: `https://openapi.etsy.com/v3/application/shops/39370823/listings/featured?client_id=aoeoryx59j26t30056nqabv8`,
      url: `https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/featured?client_id=${client_id}`,
    },
    (error, response, body) => {
      // console.log("server body: ", body);
      if (error) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      res.json({ body });
    }
  );
});

app.get("/application/shops/:shopid/listings/active", (req, res) => {
  const shop_id = req.params.shopid;
  const limit = req.query.limit;
  const offset = req.query.offset;
  request(
    {
      // url: `https://openapi.etsy.com/v3/application/shops/39370823/listings/featured?client_id=aoeoryx59j26t30056nqabv8`,
      url: `https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/active?limit=${limit}&offset=${offset}&client_id=${client_id}`,
    },
    (error, response, body) => {
      // console.log("server body: ", body);
      if (error) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      res.json({ body });
    }
  );
});

app.get("/application/listings/getbatch/batch", (req, res) => {
  const listing_ids = req.query.listing_ids_string
    ?.slice(1, -1)
    ?.replace(/x/g, "&")
    ?.replace(/y/g, "=");
  // console.log("server listing string: ", listing_ids);
  request(
    {
      // listing_ids[]=1393827200&listing_ids[]=1267752787
      url: `https://openapi.etsy.com/v3/application/listings/batch?${listing_ids}client_id=${client_id}`,
    },
    (error, response, body) => {
      if (error) {
        // console.log("server body: batch listing error");
        return res.status(500).json({ type: "error", message: error.message });
      }
      // console.log("server body: ", JSON.stringify(body).slice(0, 100));
      res.json({ body });
    }
  );
});

app.get("/application/seller-taxonomy/nodes", (req, res) => {
  request(
    {
      url: `https://openapi.etsy.com/v3/application/seller-taxonomy/nodes?client_id=${client_id}`,
    },
    (error, response, body) => {
      if (error) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      // console.log("server body: ", JSON.stringify(body).slice(0, 100));
      res.json({ body });
    }
  );
});

app.get("/application/buyer-taxonomy/nodes", (req, res) => {
  request(
    {
      url: `https://openapi.etsy.com/v3/application/buyer-taxonomy/nodes?client_id=${client_id}`,
    },
    (error, response, body) => {
      if (error) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      // console.log("server body: ", JSON.stringify(body).slice(0, 100));
      res.json({ body });
    }
  );
});

app.get("/application/ping", (req, res) => {
  request(
    {
      url: `https://api.etsy.com/v3/application/openapi-ping?client_id=${client_id}`,
    },
    (error, response, body) => {
      // console.log("server body: ", body);
      if (error) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      res.json({ body });
    }
  );
});

app.get("/application/transactions", (req, res) => {
  let headers = new Headers();
  // let headers = new fetch.Headers();
  // headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("x-api-key", "aoeoryx59j26t30056nqabv8");
  headers.append(
    "Authorization",
    "Bearer 790847060.SbOM8vU-_3kSCEGa5FL4GkOZ6jAAInh2mAjRDhdhR-7-a1IeAl8_8FZQETZBrfb_CPit7oyt4H8Tj4kz2XpPEwFaHb"
  );
  let requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };
  request(
    {
      url: `https://openapi.etsy.com/v3/application/shops/5325754/transactions`,
      requestOptions,
    },
    (error, response, body) => {
      console.log("server body: ", body);
      if (error) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      res.json({ body });
    }
  );
});

app.get("/application/callback", (req, res) => {
  // The req.query object has the query params that Etsy authentication sends
  // to this route. The authorization code is in the `code` param
  const authCode = req.query.code;
  const state = req.query.state;
  // const error = req.query.error;
  // const error_description = req.query.error_description;
  // const error_uri = req.query.error_uri;

  console.log("state: ", state);
  console.log(redirectUri);
  if (authCode === undefined) {
    console.log("error: ");
    res.json({ error: "Error" });
  } else {
    const tokenUrl = "https://api.etsy.com/v3/public/oauth/token";

    request(
      {
        url: tokenUrl,
        method: "POST",
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: client_id,
          redirect_uri: redirectUri,
          code: authCode,
          code_verifier: clientVerifier,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      (error, response, body) => {
        if (error) {
          return res
            .status(500)
            .json({ type: "error during last step", message: error.message });
        }
        res.json({ body });
      }
    );
  }
});

app.post("/application/getrefreshtoken", (req, res) => {
  // const access_token = req.query.access_token;
  // console.log("body: ", req);
  const { refresh_token } = req.body;

  // console.log("tokens: ", refresh_token);
  // console.log(redirectUri);
  if (refresh_token === undefined) {
    console.log("error: ");
    res.json({ error: "Error" });
  } else {
    const tokenUrl = "https://api.etsy.com/v3/public/oauth/token";

    request(
      {
        url: tokenUrl,
        method: "POST",
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: refresh_token,
          client_id: client_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      (error, response, body) => {
        if (error) {
          return res
            .status(500)
            .json({ type: "error during last step", message: error.message });
        }
        res.json({ body: body });
      }
    );
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
