import React from "react";
import "../../App.css";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default function Home() {
  return (
    <>
      <h1>Malani Jeweler Web</h1>

      <a href="/proofReader">
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <Tooltip
            title={
              <h3 style={{ lineHeight: "150%" }}>
                Add A number of SKU's to compare the data between Web and VJS
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
      </a>

      <a href="/Gallery">
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <Tooltip
            title={
              <h3 style={{ lineHeight: "150%" }}>
                View All Web Data, filter thru vendor & Class Code
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
      </a>

      <a href="/rename">
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <Tooltip
            title={
              <h3 style={{ lineHeight: "150%" }}>
                View All Web Data, filter thru vendor & Class Code
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
      </a>
    </>
  );
}
