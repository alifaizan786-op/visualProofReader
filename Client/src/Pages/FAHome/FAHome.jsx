import React from "react";
import "../../App.css";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { Link } from "react-router-dom";

export default function FAHome() {
  const [password, setPassword] = React.useState("Year2019");
  const [totalSku, setTotalSku] = React.useState(0);
  const [openToBuy, setOpenToBuy] = React.useState([]);

  const [input, setInput] = React.useState("password");

  const handleViewPassword = () => {
    if (input == "password") {
      setInput("text");
    } else {
      setInput("password");
    }
  };

  React.useEffect(() => {
    axios.get(`/api/ReportGen/OpenToBuy`).then((res) => {
      console.log(res);

    //   setOpenToBuy(res.data.data);
    //   setTimeout(() => {
    //     let j = 0;
    //     for (let i = 0; i < openToBuy.lenth; i++) {
    //       j += openToBuy[i].ttlPcsOnline;
    //     }
    //     console.log(j);
    //   }, 2000);
    });
  });

  console.log(openToBuy);
  console.log(totalSku);

  return (
    <>
      <h1>Malani Jeweler Web</h1>

      {password === "Year2019" ? (
        <>
          <Link to="/proofReader">
            <FormControl sx={{ width: "200px", marginRight: "20px" }}>
              <Tooltip
                title={
                  <h3 style={{ lineHeight: "150%" }}>
                    Add A number of SKU's to compare the data between Web and
                    VJS
                  </h3>
                }
                followCursor
              >
                <Button
                  variant="outlined"
                  sx={{ height: "50px", marginTop: "10px" }}
                >
                  Visual Proof Reader
                </Button>
              </Tooltip>
            </FormControl>
          </Link>

          <Link to="/Gallery">
            <FormControl sx={{ width: "200px", marginRight: "20px" }}>
              <Tooltip
                title={
                  <h3 style={{ lineHeight: "150%" }}>
                    View All Web Data & Images, filter thru vendor & Class Code
                  </h3>
                }
                followCursor
              >
                <Button
                  variant="outlined"
                  sx={{ height: "50px", marginTop: "10px" }}
                >
                  Gallery
                </Button>
              </Tooltip>
            </FormControl>
          </Link>

          <Link to="/rename">
            <FormControl sx={{ width: "200px", marginRight: "20px" }}>
              <Tooltip
                title={
                  <h3 style={{ lineHeight: "150%" }}>
                    Find Images And Rename them in bulk to upload to web
                  </h3>
                }
                followCursor
              >
                <Button
                  variant="outlined"
                  sx={{ height: "50px", marginTop: "10px" }}
                >
                  Rename
                </Button>
              </Tooltip>
            </FormControl>
          </Link>
          <Link to="/ReportGen">
            <FormControl sx={{ width: "200px", marginRight: "20px" }}>
              <Tooltip
                title={
                  <h3 style={{ lineHeight: "150%" }}>
                    Generate Different Kind of Reports, Daily Reports, Web Open
                    to Buy vs MJ Open To Buy
                  </h3>
                }
                followCursor
              >
                <Button
                  variant="outlined"
                  sx={{ height: "50px", marginTop: "10px" }}
                >
                  Report Generator
                </Button>
              </Tooltip>
            </FormControl>
          </Link>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            size="lg"
            sx={{ maxWidth: "200px" }}
            startDecorator={<KeyRoundedIcon />}
            placeholder="Password"
            type={input}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            endDecorator={
              <IconButton color="neutral" onClick={handleViewPassword}>
                <VisibilityRoundedIcon />
              </IconButton>
            }
          />
        </Box>
      )}
    </>
  );
}
