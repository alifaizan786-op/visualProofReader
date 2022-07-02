import React from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { Link } from "react-router-dom";

export default function ReportGen() {
  return (
    <>
      <h1>Report Generator</h1>
      <Link to="/proofReader">
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <Tooltip
            title={
              <h3 style={{ lineHeight: "150%" }}>
                Add a list of SKU's to Generate a Daily Report, To send to
                Management
              </h3>
            }
            followCursor
          >
            <Button
              variant="outlined"
              sx={{ height: "50px", marginTop: "10px" }}
            >
              Daily Report
            </Button>
          </Tooltip>
        </FormControl>
      </Link>
      <Link to="/proofReader">
        <FormControl sx={{ width: "200px", marginRight: "20px" }}>
          <Tooltip
            title={
              <h3 style={{ lineHeight: "150%" }}>
                Compare Instore Open To Buy With Web Open To Buy
              </h3>
            }
            followCursor
          >
            <Button
              variant="outlined"
              sx={{ height: "50px", marginTop: "10px" }}
            >
              Open To Buy
            </Button>
          </Tooltip>
        </FormControl>
      </Link>
    </>
  );
}
