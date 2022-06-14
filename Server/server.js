const puppeteer = require("puppeteer");
const express = require("express");
const path = require('path')

const app = express();

const PORT = process.env.PORT || 4000


require("events").EventEmitter.prototype._maxListeners = 100;

app.get("/info", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  /* Opening a browser and going to the URL. */
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto(
    `https://www.malanijewelers.com/Views/Product/ProductInfo?value=${req.query.sku}`
  );

  const extractedText = await page.$eval("*", (el) => el.innerText);
  let textToArray = extractedText.split("\n");

  let allInfo = [];
  for (let i = 0; i < textToArray.length; i++) {
    if (textToArray[i].includes(":")) {
      allInfo.push(textToArray[i]);
    }
  }

  const productDescriptionTxt = await page.evaluate(() => {
    const anchor = document.querySelector(".sku-dkt-prdpage");
    return anchor.textContent;
  });

  allInfo.push(`Description : ${productDescriptionTxt.split("\n")[2].trim()}`);

  /* Going to the URL and waiting for the page to load. */
  await page.goto("http://173.14.213.113:8081/mj/sku.aspx");

  /* Waiting for the element with the given CSS selector to appear in the page. */
  await page.waitForSelector("input[name=txtBxSku]");

  /* Typing the value of the `sku` query parameter into the input field with the ID `txtBxSku`. */
  console.log(req.query.sku.length);

  if (req.query.sku.length === 9) {
    await page.type("#txtBxSku", req.query.sku);
  } else if (req.query.sku.length === 8) {
    await page.type("#txtBxSku", ` ${req.query.sku}`);
  } else {
    await page.type("#txtBxSku", `  ${req.query.sku}`);
  }

  /* Clicking the button with the name `btnSearchJS`. */
  await page.click('input[name="btnSearchJS"]');

  /* Waiting for the element with the ID `GridViewWS` to appear in the page. */
  await page.waitForSelector("#GridViewWS");

  /* Using the `evaluate` method to get the text content of the element. */
  const mjDescText = await page.evaluate(() => {
    const anchor = document.querySelector(
      "#GridViewWS > tbody > tr:nth-child(2) > td:nth-child(4)"
    );
    if (anchor) {
      return anchor.textContent;
    } else {
      return "0.00";
    }
  });

  const wsQty = await page.evaluate(() => {
    const anchor = document.querySelector(
      "#GridViewWS > tbody > tr:nth-child(2) > td:nth-child(8)"
    );
    if (anchor) {
      return anchor.textContent;
    } else {
      return "0.00";
    }
  });
  const atlQty = await page.evaluate(() => {
    const anchor = document.querySelector(
      "#GridViewATL > tbody > tr:nth-child(2) > td:nth-child(6)"
    );
    if (anchor) {
      return anchor.textContent;
    } else {
      return "0.00";
    }
  });
  const dalQty = await page.evaluate(() => {
    const anchor = document.querySelector(
      "#GridViewDal > tbody > tr:nth-child(2) > td:nth-child(6)"
    );
    if (anchor) {
      return anchor.textContent;
    } else {
      return "0.00";
    }
  });
  const tpaQty = await page.evaluate(() => {
    const anchor = document.querySelector(
      "#GridViewTPA > tbody > tr:nth-child(2) > td:nth-child(6)"
    );
    if (anchor) {
      return anchor.textContent;
    } else {
      return "0.00";
    }
  });

  const vendor = await page.evaluate(() => {
    const anchor = document.querySelector("#GridViewWS > tbody > tr:nth-child(2) > td:nth-child(1)")
    return anchor.textContent;
  });

  const retail = await page.evaluate(() => {
    const anchor = document.querySelector("#GridViewWS > tbody > tr:nth-child(2) > td:nth-child(6)")
    return anchor.textContent;
  });

  const entryDate = await page.evaluate(() => {
    const anchor = document.querySelector("#GridViewWS > tbody > tr:nth-child(2) > td:nth-child(7)")
    return anchor.textContent;
  });

  const webPrice = await page.evaluate(() => {
    const anchor = document.querySelector("#gvMJCom > tbody > tr:nth-child(2) > td:nth-child(2)")
    if (anchor.textContent) {
      return anchor.textContent;
    }else{
      return "Item Code Is Not Online";
    }
  })
  
  const webPerGram = await page.evaluate(() => {
    const anchor = document.querySelector("#gvMJCom > tbody > tr:nth-child(2) > td:nth-child(3)")
    if (anchor.textContent) {
      return anchor.textContent;
    } else {
      return "Item Code Is Not Online";
    }
  })

  const webPurchasable = await page.evaluate(() => {
    const anchor = document.querySelector("#gvMJCom_ctl02_ctl00")
    if (anchor.checked) {
      return anchor.checked;
    } else {
      return "Item Code Is Not Online";
    }
  })

  const webHiiden = await page.evaluate(() => {
    const anchor = document.querySelector("#gvMJCom_ctl02_ctl01")
    if (!anchor.checked) {
      return anchor.checked;
    } else {
      return "Item Code Is Not Online";
    }
  })

  const uploadDate = await page.evaluate(() => {
    const anchor = document.querySelector("#gvMJCom > tbody > tr:nth-child(2) > td:nth-child(6)")
    if (anchor.textContent) {
      return anchor.textContent;
    } else {
      return "Item Code Is Not Online";
    }
  })









  let mjInfo = [];

  mjInfo.push(`MJ Description : ${mjDescText}`);
  mjInfo.push(`Qty in Wholesale: ${wsQty}`);
  mjInfo.push(`Qty in Atlanta : ${atlQty}`);
  mjInfo.push(`Qty in Dallas : ${dalQty}`);
  mjInfo.push(`Qty in Tampa : ${tpaQty}`);
  mjInfo.push(`Vendor : ${vendor}`);
  mjInfo.push(`Retail : ${retail}`);
  mjInfo.push(`Entry Date : ${entryDate}`);
  mjInfo.push(`Web Price : ${webPrice}`);
  mjInfo.push(`Web Per Gram : ${webPerGram}`);
  mjInfo.push(`Web Purchasable : ${webPurchasable}`);
  mjInfo.push(`Web Hidden : ${webHiiden}`);
  mjInfo.push(`Web Upload Date : ${uploadDate}`);


  res.json({ Webinfo: allInfo, mjPlusInfo: mjInfo });
  await browser.close();
});



app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(4000);
