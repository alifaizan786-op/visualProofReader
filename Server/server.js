const puppeteer = require("puppeteer");
const express = require("express");
var fs = require("fs");
var path = require("path");
var {
    downloadImage,
    formatSkuToImage
} = require("./utils/functions");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8085;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

require("events").EventEmitter.prototype._maxListeners = 100;

app.get("/info", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    /* Opening a browser and going to the URL. */
    const browser = await puppeteer.launch({args: ["--no-sandbox"]});
    const page = await browser.newPage();
    await page.goto(`https://www.malanijewelers.com/Views/Product/ProductInfo?value=${
        req.query.sku
    }`);

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

    allInfo.push(`Description : ${
        productDescriptionTxt.split("\n")[2].trim()
    }`);

    /* Going to the URL and waiting for the page to load. */
    await page.goto("http://173.14.213.113:8081/mj/sku.aspx");

    /* Waiting for the element with the given CSS selector to appear in the page. */
    await page.waitForSelector("input[name=txtBxSku]");

    /* Typing the value of the `sku` query parameter into the input field with the ID `txtBxSku`. */
    console.log(req.query.sku.length);

    if (req.query.sku.length === 9) {
        await page.type("#txtBxSku", req.query.sku);
    } else if (req.query.sku.length === 8) {
        await page.type("#txtBxSku", ` ${
            req.query.sku
        }`);
    } else {
        await page.type("#txtBxSku", `  ${
            req.query.sku
        }`);
    }

    /* Clicking the button with the name `btnSearchJS`. */
    await page.click('input[name="btnSearchJS"]');

    /* Waiting for the element with the ID `GridViewWS` to appear in the page. */
    await page.waitForSelector("#GridViewWS");

    /* Using the `evaluate` method to get the text content of the element. */
    const mjDescText = await page.evaluate(() => {
        const anchor = document.querySelector("#GridViewWS > tbody > tr:nth-child(2) > td:nth-child(4)");
        if (anchor) {
            return anchor.textContent;
        } else {
            return "0.00";
        }
    });

    const wsQty = await page.evaluate(() => {
        const anchor = document.querySelector("#GridViewWS > tbody > tr:nth-child(2) > td:nth-child(8)");
        if (anchor) {
            return anchor.textContent;
        } else {
            return "0.00";
        }
    });
    const atlQty = await page.evaluate(() => {
        const anchor = document.querySelector("#GridViewATL > tbody > tr:nth-child(2) > td:nth-child(6)");
        if (anchor) {
            return anchor.textContent;
        } else {
            return "0.00";
        }
    });
    const dalQty = await page.evaluate(() => {
        const anchor = document.querySelector("#GridViewDal > tbody > tr:nth-child(2) > td:nth-child(6)");
        if (anchor) {
            return anchor.textContent;
        } else {
            return "0.00";
        }
    });
    const tpaQty = await page.evaluate(() => {
        const anchor = document.querySelector("#GridViewTPA > tbody > tr:nth-child(2) > td:nth-child(6)");
        if (anchor) {
            return anchor.textContent;
        } else {
            return "0.00";
        }
    });

    const vendor = await page.evaluate(() => {
        const anchor = document.querySelector("#GridViewWS > tbody > tr:nth-child(2) > td:nth-child(1)");
        return anchor.textContent;
    });

    const retail = await page.evaluate(() => {
        const anchor = document.querySelector("#GridViewWS > tbody > tr:nth-child(2) > td:nth-child(6)");
        return anchor.textContent;
    });

    const entryDate = await page.evaluate(() => {
        const anchor = document.querySelector("#GridViewWS > tbody > tr:nth-child(2) > td:nth-child(7)");
        return anchor.textContent;
    });

    const webPrice = await page.evaluate(() => {
        const anchor = document.querySelector("#gvMJCom > tbody > tr:nth-child(2) > td:nth-child(2)");
        if (anchor.textContent) {
            return anchor.textContent;
        } else {
            return "Item Code Is Not Online";
        }
    });

    const webPerGram = await page.evaluate(() => {
        const anchor = document.querySelector("#gvMJCom > tbody > tr:nth-child(2) > td:nth-child(3)");
        if (anchor.textContent) {
            return anchor.textContent;
        } else {
            return "Item Code Is Not Online";
        }
    });

    const webPurchasable = await page.evaluate(() => {
        const anchor = document.querySelector("#gvMJCom_ctl02_ctl00");
        if (anchor.checked) {
            return anchor.checked;
        } else {
            return "Item Code Is Not Online";
        }
    });

    const webHiiden = await page.evaluate(() => {
        const anchor = document.querySelector("#gvMJCom_ctl02_ctl01");
        if (! anchor.checked) {
            return anchor.checked;
        } else {
            return "Item Code Is Not Online";
        }
    });

    const uploadDate = await page.evaluate(() => {
        const anchor = document.querySelector("#gvMJCom > tbody > tr:nth-child(2) > td:nth-child(6)");
        if (anchor.textContent) {
            return anchor.textContent;
        } else {
            return "Item Code Is Not Online";
        }
    });

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

    res.json({Webinfo: allInfo, mjPlusInfo: mjInfo});
    await browser.close();
});

app.get("/allWebInfo", async (req, res) => {
    var filePath = path.join(__dirname, "./output.json");

    var f = fs.readFileSync(filePath, {
        encoding: "utf-8"
    }, function (err) {
        console.log(err);
    });

    res.json({Webinfo: JSON.parse(f)});
});

// https://www.malanijewelers.com/TransactionImages/Styles/Large/04907574.jpg
// 04905693
app.get("/rename/:curImageName/to/:newImageName", async (req, res) => {


    let imageUrl = `https://www.malanijewelers.com/TransactionImages/Styles/Large/${req.params.curImageName}`
    let imageName = req.params.newImageName

    downloadImage(imageUrl, imageName)

    res.send('Successfull')
});

app.get("/download/:imageName", (req, res) => {
    res.setHeader('Content-disposition', `attachment; filename=${req.params.imageName}`);
    res.setHeader('Content-Type', 'image/jpg');
    res.download(path.join(__dirname, `./images/${req.params.imageName}`))
})

app.use(express.static(path.join(__dirname, "../Client/build")));
app.use(express.static(path.join(__dirname, "./images")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
