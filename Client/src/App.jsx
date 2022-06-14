import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [SKU, setSKU] = React.useState([]);
  const [info, setinfo] = React.useState([]);

  const handleChange = (event) => {
    setSKU(event.target.value.split("\n"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(SKU);
    apiCalls();
  };

  function apiCalls() {
    for (let i = 0; i < SKU.length; i++) {
      axios.get(`http://localhost:4000/info?sku=${SKU[i]}`).then((res) => {
        let allInfoObj = {
          sku: SKU[i],
          infoFromWeb: res.data.Webinfo,
          infoFromMjPlus: res.data.mjPlusInfo,
          webImg: imgUrl(SKU[i]).webImgUrl,
          mjPlusImage: imgUrl(SKU[i]).mjPlusImage,
          searchImgOnDrive : imgUrl(SKU[i]).searchImgOnDrive,
          searchSkuOnDrive: `https://drive.google.com/drive/u/0/search?q=${SKU[i]}`,
          searchSkuOnMalani: `https://www.malanijewelers.com/Views/Product/ProductInfo?value=${SKU[i]}`,
        };
        setinfo((info) => [...info, allInfoObj]);
      });
    }
  }

  console.log(info);

  function imgUrl(sku) {
    let formattedSku = sku.split("-").join("");
    if (formattedSku.length === 6) {
      var mjPlusImage = `http://173.14.213.113:8081/mj/images/00${formattedSku}.jpg`;
      var webImgUrl = `https://www.malanijewelers.com/TransactionImages/Styles/Large/00${formattedSku}.jpg`;
      var searchImgOnDrive = `https://drive.google.com/drive/search?q=00${formattedSku}`
      return { mjPlusImage, webImgUrl, searchImgOnDrive };
    } else if (formattedSku.length === 7) {
      var mjPlusImage = `http://173.14.213.113:8081/mj/images/0${formattedSku}.jpg`;
      var webImgUrl = `https://www.malanijewelers.com/TransactionImages/Styles/Large/0${formattedSku}.jpg`;
      var searchImgOnDrive = `https://drive.google.com/drive/search?q=0${formattedSku}`
      return { mjPlusImage, webImgUrl, searchImgOnDrive };
      } else {
      var mjPlusImage = `http://173.14.213.113:8081/mj/images/${formattedSku}.jpg`;
      var webImgUrl = `https://www.malanijewelers.com/TransactionImages/Styles/Large/${formattedSku}.jpg`;
      var searchImgOnDrive = `https://drive.google.com/drive/search?q=${formattedSku}`
      return { mjPlusImage, webImgUrl, searchImgOnDrive };
    }
  }

  return (
    <div className="App">
      <textarea
        name="sku"
        id="sku"
        cols="30"
        onChange={handleChange}
        rows="10"
      ></textarea>
      <button id="submitBtn" onClick={handleSubmit} type="submit">
        Submit
      </button>
      <div id="table">
        <table style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={{ textAlign: "center" }}>MJ Plus Image</th>
              <th style={{ textAlign: "center" }}>Info</th>
              <th style={{ textAlign: "center" }}>Web Image</th>
            </tr>
            {/* map data or whatever */}
            {info.map((skuData, index) => (
              <tr key={index}>
                <td style={{ width: "25vw" }}>
                  <img src={skuData.mjPlusImage} />
                </td>
                <td style={{ display: "flex", width: "50vw" }}>
                  <table
                    className="skuInfo"
                    style={{ border: "1px solid #ddd" }}
                  >
                    <tbody style={{ border: "1px solid #ddd" }}>
                      <th colspan="2">Web Info</th>
                      {skuData.infoFromWeb.map((info, index) => (
                        <tr key={index} style={{ border: "1px solid #ddd" }}>
                          <td style={{ border: "1px solid #ddd" }}>
                            {info.split(":")[0]}
                          </td>
                          <td style={{ border: "1px solid #ddd" }}>
                            {info.split(":")[1]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <table
                    className="skuInfo"
                    style={{ border: "1px solid #ddd" }}
                  >
                    <tbody style={{ border: "1px solid #ddd" }}>
                      <th colspan="2">Mj Plus Info</th>
                      {skuData.infoFromMjPlus.map((info, index) => (
                        <tr key={index} style={{ border: "1px solid #ddd" }}>
                          <td style={{ border: "1px solid #ddd" }}>
                            {info.split(":")[0]}
                          </td>
                          <td style={{ border: "1px solid #ddd" }}>
                            {info.split(":")[1]}
                          </td>
                        </tr>
                      ))}
                        <tr style={{border:'none'}} >
                          <td colSpan={2}>
                          <a href={skuData.searchSkuOnMalani} style={{width:'100%'}}>
                            <button style={{width:'100%'}}>Search Sku On mj.com</button>
                          </a>
                          </td>
                        </tr>
                        <tr>
                        <td colSpan={2}>
                          <a href={skuData.searchSkuOnDrive} style={{width:'100%'}}>
                            <button style={{width:'100%'}}>Search Sku On Drive</button>
                          </a>
                          </td>
                        </tr>
                        <tr>
                        <td colSpan={2}>
                          <a href={skuData.searchImgOnDrive} style={{width:'100%'}}>
                            <button style={{width:'100%'}}>Search Image On Drive</button>
                          </a>
                          </td>
                        </tr>
                      
                    </tbody>
                  </table>
                </td>
                <td style={{ width: "25vw" }}>
                  <img src={skuData.webImg} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
