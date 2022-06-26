import React from "react";
import axios from "axios";

export default function SingleProduct() {
  const [skuData, setSkuData] = React.useState({});
  let SKUCODE = window.location.href.split("/")[3];

  React.useEffect(() => {
    axios.get(`/allWebInfo`).then((res) => {
      var cleanData = res.data.Webinfo.filter((sku) => sku.SKUCode === SKUCODE);
      console.log(SKUCODE);
      console.log(res.data.Webinfo);
      console.log(cleanData);
    });
  }, []);

  return (
    <>
      <h1>{SKUCODE}</h1>
      
    </>
  );
}
