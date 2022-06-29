import React from "react";
import axios from "axios";
import "./Gallery.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function Gallery() {
  const [allWebInfo, setAllWebInfo] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);

  const [vendor, setVendor] = React.useState("");
  const [classCode, setClassCode] = React.useState("");
  const [jewelryType, setJewelryType] = React.useState("")


  const [render, setRender] = React.useState(false);

  function clearState() {
    setVendor("");
    setClassCode("");
    setJewelryType("")
    setFiltered([]);
    setRender(false);
  }

  const allVendors = [
    "FC",
    "SUR",
    "DP",
    "BLJ",
    "EMR",
    "MOD",
    "SWR",
    "RHC",
    "SON",
    "MJW",
    "ANM",
    "RAM",
    "CJ",
    "BM",
    "DHA",
    "FRZ",
    "MNX",
    "SSN",
    "LXM",
    "SRE",
    "UJ",
    "MOT",
    "BAF",
    "LKS",
    "MJA",
    "SN",
    "MJI",
    "NA",
    "MJ",
    "MAH",
    "GP",
    "PR",
    "AU",
    "EJZ",
    "ZAR",
    "ITN",
    "MLO",
    "PRD",
    "ZVR",
    "SP",
    "JN",
    "MIS",
    "RS",
    "PG",
    "NRD",
    "SHT",
    "GS",
    "CVM",
    "RML",
    "OP",
    "GUR",
    "JH",
    "AMP",
    "MNJ",
    "RA",
    "CF",
    "MAN",
    "SBC",
    "GSJ",
    "DEW",
    "EDI",
    "HOP",
    "TRU",
    "SRK",
    "SRN",
    "KRN",
    "LUX",
    "MAT",
    "CCI",
    "ALW",
    "HPG",
    "BRK",
    "ORO",
    "HPD",
    "RVA",
    "BNG",
    "MRG",
    "UG",
    "GFT",
    "SCS",
    "RK",
    "LGS",
    "VM",
    "SRY",
    "KUS",
    "PM",
    "ISQ",
    "KS",
    "RC",
  ];

  const allClassCode = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "20",
    "21",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "60",
    "61",
    "62",
    "69",
    "70",
    "72",
    "73",
    "75",
    "77",
    "78",
    "79",
    "80",
    "81",
    "82",
    "85",
    "87",
    "90",
    "93",
    "95",
    "98",
    "100",
    "101",
    "102",
    "103",
    "104",
    "105",
    "108",
    "110",
    "150",
    "201",
    "202",
    "203",
    "205",
    "208",
    "210",
    "211",
    "215",
    "218",
    "220",
    "222",
    "225",
    "228",
    "230",
    "231",
    "232",
    "233",
    "235",
    "236",
    "238",
    "298",
    "299",
    "301",
    "302",
    "303",
    "304",
    "305",
    "306",
    "307",
    "320",
    "321",
    "322",
    "323",
    "324",
    "325",
    "326",
    "330",
    "331",
    "332",
    "333",
    "334",
    "335",
    "340",
    "341",
    "342",
    "343",
    "344",
    "345",
    "346",
    "350",
    "351",
    "352",
    "353",
    "354",
    "360",
    "361",
    "362",
    "363",
    "364",
    "370",
    "371",
    "372",
    "373",
    "374",
    "375",
    "380",
    "381",
    "382",
    "383",
    "384",
    "385",
    "390",
    "391",
    "392",
    "393",
    "395",
    "398",
    "399",
    "400",
    "401",
    "402",
    "403",
    "404",
    "405",
    "406",
    "410",
    "411",
    "412",
    "413",
    "414",
    "415",
    "416",
    "420",
    "421",
    "422",
    "423",
    "424",
    "425",
    "430",
    "431",
    "432",
    "433",
    "434",
    "435",
    "436",
    "440",
    "441",
    "450",
    "451",
    "452",
    "453",
    "454",
    "455",
    "456",
    "457",
    "458",
    "460",
    "461",
    "462",
    "463",
    "464",
    "465",
    "466",
    "500",
    "501",
    "505",
    "510",
    "525",
    "550",
    "575",
    "580",
    "63",
    "750",
    "57",
    "396",
  ];

  const allJewelryType = [
    "Diamonds",
    "Antique",
    "Gold",
    "Gemstones"
  ]

  async function filter() {
    if (vendor && classCode && jewelryType) {

      let tempArrOne = await allWebInfo.filter((item) => item.Vendor === vendor);
      
      let tempArrTwo = await tempArrOne.filter((item) => item.Classcode === classCode);

      let tempArrThree = await tempArrTwo.filter((item) => item["Jewelry Type"] === jewelryType);
      
      setFiltered(tempArrThree);

    } else if (vendor && classCode) {

      let tempArrOne = await allWebInfo.filter((item) => item.Vendor === vendor);
      
      let tempArrTwo = await tempArrOne.filter((item) => item.Classcode === classCode);

      setFiltered(tempArrTwo);

    } else if (vendor && jewelryType) {

      let tempArrOne = await allWebInfo.filter((item) => item.Vendor === vendor);

      let tempArrThree = await tempArrOne.filter((item) => item["Jewelry Type"] === jewelryType);

      setFiltered(tempArrThree);

    } else if (classCode && jewelryType) {

      let tempArrTwo = await allWebInfo.filter((item) => item.Classcode === classCode);

      let tempArrThree = await tempArrTwo.filter((item) => item["Jewelry Type"] === jewelryType);

      setFiltered(tempArrThree);

    } else if (jewelryType) {

      let tempArrThree = await allWebInfo.filter((item) => item["Jewelry Type"] === jewelryType);

      setFiltered(tempArrThree);

    } else if (classCode) {

      let tempArrThree = await allWebInfo.filter((item) => item.Classcode === classCode);

      setFiltered(tempArrThree);

    } else if (vendor) {

      let tempArrThree = await allWebInfo.filter((item) => item.Vendor === vendor);

      setFiltered(tempArrThree);

    } 
    setRender(true);
  }

  function formatSkuToImage(sku, index) {
    if (sku.length === 7) {
      return `https://www.malanijewelers.com/TransactionImages/Styles/Large/00${sku
        .split("-")
        .join("")}.jpg`;
    } else if (sku.length === 8) {
      return `https://www.malanijewelers.com/TransactionImages/Styles/Large/0${sku
        .split("-")
        .join("")}.jpg`;
    } else {
      return `https://www.malanijewelers.com/TransactionImages/Styles/Large/${sku
        .split("-")
        .join("")}.jpg`;
    }
  }

  React.useEffect(() => {
    axios.get(`/allWebInfo`).then((res) => {
      var cleanData = res.data.Webinfo.filter((sku) => sku.SKUCode);
      setAllWebInfo(cleanData)
    });
  }, []);

  console.log(filtered);

  return (
    <>
      <h1>Gallery</h1>
      <div>
        {/* for vendor */}
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <InputLabel id="demo-simple-select-label">Vendor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vendor}
            label="vendor"
            onChange={(event) => setVendor(event.target.value)}
          >
            {allVendors.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* for Class Code */}
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <InputLabel id="demo-simple-select-label">Class Code</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={classCode}
            label="classCode"
            onChange={(event) => setClassCode(event.target.value)}
          >
            {allClassCode.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* for Jewelry Type */}
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <InputLabel id="demo-simple-select-label">Jewlery Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={jewelryType}
            label="classCode"
            onChange={(event) => setJewelryType(event.target.value)}
          >
            {allJewelryType.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <Button
            variant="outlined"
            onClick={() => {
              filter();
            }}
            sx={{ height: "50px" }}
          >
            Submit
          </Button>
        </FormControl>
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <Button
            variant="outlined"
            onClick={() => {
              clearState();
            }}
            sx={{ height: "50px" }}
          >
            Clear
          </Button>
        </FormControl>
      </div>
      <div className="gallery">
        <h1>{filtered.length} Products Found</h1>
        {render ? (
          <div>
            {filtered.map((item, index) => (
              <a href={`/productpage/${item.SKUCode}`} index={index} target="__blank">
                <img
                  src={formatSkuToImage(item.SKUCode)}
                  style={{ maxWidth: "400px" }}
                />
              </a>
            ))}
          </div>
        ) : (
          <div>
            <h1>Set The Filters and Click on submit</h1>
          </div>
        )}
      </div>
    </>
  );
}

//Color
//Finishing
//Vendor
//SubCategory
//Classcode
//Category
//GoldKt
//Jewelry Type
