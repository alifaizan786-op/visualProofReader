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
  const [vendor, setVendor] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [classCode, setClassCode] = React.useState("");
  const [goldKt, setGoldKt] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [color, setColor] = React.useState("");
  const [finishing, setfinishing] = React.useState("");

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

  const allSubCategories = [
    "COLLECTIONS->Ameera Collection",
    "COLLECTIONS->Anora Collection",
    "COLLECTIONS->Mudra Collection",
    "COLLECTIONS->Navya Collection",
    "COLLECTIONS->Nikhar Collection",
    "COLLECTIONS->Nitya Collection",
    "COLLECTIONS->Pushtaini Collection",
    "COLLECTIONS->Rangoli Collection",
    "COLLECTIONS->Romance Collection",
    "COLLECTIONS->Rose Collection",
    "COLLECTIONS->Sunehra Collection",
    "COLLECTIONS->Tejasvi Collection",
    "COLLECTIONS->Ujwal Collection",
    "COLLECTIONS->Utsavam Collection",
    "Custom Design->Bracelet",
    "Custom Design->Earrings",
    "Custom Design->Pendant",
    "Custom Design->Ring",
    "DEALS->Deal of the Day",
    "DEALS->Online Deals",
    "KIDS->Accessories",
    "KIDS->Bangles",
    "KIDS->Bracelets",
    "KIDS->Chains",
    "KIDS->Earrings",
    "KIDS->Pendants",
    "KIDS->Rings",
    "MEN->Bracelets",
    "MEN->Bracelets->Fancy Bracelets",
    "MEN->Bracelets->Kara",
    "MEN->Fancy Chains",
    "MEN->Fancy Chains->Fancy Chains",
    "MEN->Rings",
    "MEN->Rings->Designer Bands",
    "MEN->Rings->Fancy",
    "MEN->Rings->Plain Bands",
    "OTHERS->Astrological Rings",
    "OTHERS->Astrological Stones",
    "OTHERS->Gift Articles",
    "OTHERS->Gold Coins",
    "OTHERS->Gold Idols",
    "OTHERS->Silver Coins",
    "OTHERS->Silver Idols",
    "WATCHES->Cartier",
    "WATCHES->Movado",
    "WATCHES->Rado",
    "WATCHES->Rolex",
    "WOMEN->Accessories",
    "WOMEN->Accessories->Anklets (Payal)",
    "WOMEN->Accessories->Broach",
    "WOMEN->Accessories->Maang Tikka",
    "WOMEN->Accessories->Misc",
    "WOMEN->Accessories->Nosepins",
    "WOMEN->Accessories->Sahara",
    "WOMEN->Accessories->Waist Band",
    "WOMEN->Bangles",
    "WOMEN->Bangles->Arm Bracelets (Baju Bandh)",
    "WOMEN->Bangles->Bangle/Bracelet",
    "WOMEN->Bangles->Bracelets",
    "WOMEN->Bangles->Finger Bracelets",
    "WOMEN->Bangles->Kara",
    "WOMEN->Bangles->Set of Bangles",
    "WOMEN->Earrings",
    "WOMEN->Earrings->Chandbali",
    "WOMEN->Earrings->Clipons",
    "WOMEN->Earrings->Hoops",
    "WOMEN->Earrings->Jumkha",
    "WOMEN->Earrings->Long Drops",
    "WOMEN->Earrings->Sui Dhaga",
    "WOMEN->Earrings->Tops",
    "WOMEN->Necklaces",
    "WOMEN->Necklaces->Fancy Chains",
    "WOMEN->Necklaces->Mangalsutras",
    "WOMEN->Necklaces->Necklace Sets",
    "WOMEN->Necklaces->Patta Sets",
    "WOMEN->Necklaces->Pendant Sets",
    "WOMEN->Necklaces->Pendants",
    "WOMEN->Necklaces->Plain Chains",
    "WOMEN->Rings",
    "WOMEN->Rings->Bands",
    "WOMEN->Rings->Designer Bands",
    "WOMEN->Rings->Fancy Rings",
    "WOMEN->Rings->GIA Certified Solitaire",
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

  const allGoldKt = [
    "22KG",
    "21KG",
    "18KG",
    "20KG",
    "Oth",
    "14KG",
    "Silver",
    "Platinum",
    "24KG",
  ];

  const allCategories = [
    "CATALOG",
    "COLLECTIONS",
    "Custom Design",
    "DEALS",
    "KIDS",
    "MEN",
    "OTHERS",
    "WATCHES",
    "WOMEN",
  ];

  const allJewelryType = [
    "Gold",
    "Antique",
    "Gemstones",
    "Diamonds",
    "Silver",
    "Platinum",
  ];

  const allColors = [
    "Yellow",
    "Rose",
    "White",
    "Three-Tone",
    "Two-Tone",
    "Antique",
  ];

  const allFinishings = [
    "Yellow",
    "Rose",
    "White",
    "Three-Tone",
    "Two-Tone",
    "Antique",
    "Yellow and White",
    "Rose and White",
    "Yellow and Rose",
    "Yellow, Rose and White",
    "Minakari",
  ];

  function formatSkuToImage(sku) {
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

  // React.useEffect(() => {
  //   axios.get(`/allWebInfo`).then((res) => {
  //       var cleanData = res.data.Webinfo.filter((sku) => sku.SKUCode)
  //     setAllWebInfo(cleanData);
  //     console.log(cleanData);
  //   });
  // }, []);

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
        {/* for Category */}
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            onChange={(event) => setCategory(event.target.value)}
          >
            {allCategories.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* for Sub Category */}
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={subCategory}
            label="subCategory"
            onChange={(event) => setSubCategory(event.target.value)}
          >
            {allSubCategories.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* for GoldKt */}
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <InputLabel id="demo-simple-select-label">Gold Karat</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={goldKt}
            label="goldKt"
            onChange={(event) => setGoldKt(event.target.value)}
          >
            {allGoldKt.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* for color */}
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <InputLabel id="demo-simple-select-label">Color</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={color}
            label="color"
            onChange={(event) => setColor(event.target.value)}
          >
            {allColors.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* for finishing */}
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <InputLabel id="demo-simple-select-label">Finishing</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={finishing}
            label="finishing"
            onChange={(event) => setfinishing(event.target.value)}
          >
            {allFinishings.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Submit Button */}
        <FormControl
          sx={{ width: "200px", marginRight: "20px", height: "50px" }}
        >
          <Button variant="outlined">Submit</Button>
        </FormControl>
      </div>
      <div className="gallery">
        {/* {allWebInfo.map((item) => (
          <img
            src={formatSkuToImage(item.SKUCode)}
            key={item.SKUCode}
            alt=""
            srcset=""
          />
        ))} */}
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
