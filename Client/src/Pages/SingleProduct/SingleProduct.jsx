import React from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function SingleProduct() {
  const [skuData, setSkuData] = React.useState({});
  const [renameList, setRenameList] = React.useState([]);
  const [btnDisable, setBtnDisable] = React.useState(true);

  console.log(renameList);

  async function renamer() {
    for (let i = 0; i < renameList.length; i++) {
      let curImgName = formatSkuToImage(SKUCODE);
      let newImgName = formatSkuToImage(renameList[i]);
      console.log(`From ${curImgName} to ${newImgName}`);
      await axios.get(`/rename/${curImgName}/to/${newImgName}`).then((res) => {
        console.log(res);
      });

      setTimeout(async function () { 
        // Create blob link to download
        const url = `http://localhost:8085/download/${formatSkuToImage(renameList[i])}`;
        console.log(url);
        const link = document.createElement("a");
        console.log(link);
        link.href = url;
        link.setAttribute("download", `${formatSkuToImage(renameList[i])}`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        await link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
        console.log("done");
      }, 1000)

        
    }
  }

  console.log(window.location.href.split("/")[3]);
  

  let SKUCODE = window.location.href.split("/")[4];
  let [imgNo, setImgNo] = React.useState(".jpg");

  React.useEffect(() => {
    axios.get(`/allWebInfo`).then((res) => {
      var cleanData = res.data.Webinfo.filter((sku) => sku.SKUCode === SKUCODE);
      setSkuData(cleanData[0]);
    });
  }, []);

  function formatSkuToImage(sku, index) {
    if (sku.length === 7) {
      return `00${sku.split("-").join("")}${imgNo}`;
    } else if (sku.length === 8) {
      return `0${sku.split("-").join("")}${imgNo}`;
    } else {
      return `${sku.split("-").join("")}${imgNo}`;
    }
  }

  return (
    <>
      <h1>{SKUCODE}</h1>
      <div>
        <div>
          <img
            src={`https://www.malanijewelers.com/TransactionImages/Styles/Large/${formatSkuToImage(
              SKUCODE
            )}`}
            style={{ maxWidth: "800px" }}
          />
          <br />
          {/* Image Num Buttons */}
          <div>
            <FormControl
              sx={{ width: "200px", marginRight: "20px", maxWidth: "100px" }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setImgNo(".jpg");
                }}
                sx={{ height: "50px", marginTop: "10px" }}
              >
                Img # 1
              </Button>
            </FormControl>
            <FormControl
              sx={{ width: "200px", marginRight: "20px", maxWidth: "100px" }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setImgNo("_1.jpg");
                }}
                sx={{ height: "50px", marginTop: "10px" }}
              >
                Img # 2
              </Button>
            </FormControl>
            <FormControl
              sx={{ width: "200px", marginRight: "20px", maxWidth: "100px" }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setImgNo("_2.jpg");
                }}
                sx={{ height: "50px", marginTop: "10px" }}
              >
                Img # 3
              </Button>
            </FormControl>
            <FormControl
              sx={{ width: "200px", marginRight: "20px", maxWidth: "100px" }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setImgNo("_3.jpg");
                }}
                sx={{ height: "50px", marginTop: "10px" }}
              >
                Img # 4
              </Button>
            </FormControl>
            <FormControl
              sx={{ width: "200px", marginRight: "20px", maxWidth: "100px" }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setImgNo("_4.jpg");
                }}
                sx={{ height: "50px", marginTop: "10px" }}
              >
                Img # 5
              </Button>
            </FormControl>
            <FormControl
              sx={{ width: "200px", marginRight: "20px", maxWidth: "100px" }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setImgNo("_5.jpg");
                }}
                sx={{ height: "50px", marginTop: "10px" }}
              >
                Img # 6
              </Button>
            </FormControl>
            <FormControl
              sx={{ width: "200px", marginRight: "20px", maxWidth: "100px" }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setImgNo("_6.jpg");
                }}
                sx={{ height: "50px", marginTop: "10px" }}
              >
                Img # 7
              </Button>
            </FormControl>
            <FormControl
              sx={{ width: "200px", marginRight: "20px", maxWidth: "100px" }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setImgNo("_7.jpg");
                }}
                sx={{ height: "50px", marginTop: "10px" }}
              >
                Img # 8
              </Button>
            </FormControl>
          </div>
          {/* parent */}
          <div style={{ display: "flex" }}>
            {/* childLeft */}
            <div style={{ width: "50%" }}>
              <ul style={{ textAlign: "left", listStyle: "none" }}>
                {Object.entries(skuData).map(([key, value], i) => (
                  <li key={i}>
                    {" "}
                    <strong>{key}</strong> : {value}{" "}
                  </li>
                ))}
              </ul>
            </div>
            {/* childLeft */}
            {window.location.href.split("/")[3] === "rename" ? (
            <div style={{ width: "50%" }}>
            <h3>Enter the List Of SKU's You wish to rename this Image to</h3>
            <textarea
              name=""
              id=""
              cols="30"
              style={{ width: "100%" }}
              onChange={(event) => {
                setRenameList(event.target.value.split("\n"));
              }}
              rows="10"
            ></textarea>
            <br />
            <FormControl
              sx={{ width: "200px", marginRight: "20px",  }}
            >
              <Button
                variant="outlined"
                sx={{ height: "50px", marginTop: "10px" }}
                onClick={() => {
                  renamer();
                }}
              >
                Rename & Download
              </Button>
            </FormControl>
          </div>
            ) : (
              <div></div>
            )}

            
          </div>
        </div>
      </div>
    </>
  );
}
