import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import "./index.css";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { MTableToolbar } from "material-table";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import tableIcons from "./tableicons";

function RemoteData() {
  const [propertyData, setPropertyData] = useState([]);
  const [selectedDate, handleDateChange] = useState(null);
  const [selectedtext, handlechangetext] = useState("null");

  const Dataprop = propertyData.filter((item) =>
    moment(item.updated_at)
      .format("DD-MMM-YYYY")
      .includes(moment(selectedDate).format("DD-MMM-YYYY"))
  );
  console.log(selectedtext);

  const submit = () => {
    console.log("enterwed");
  };

  useEffect(() => {
    fetch("https://uatnew.berighthere.com/api/property?limit=1300")
      .then((response) => response.json())
      .then((result) => {
        setPropertyData(result.result.data);
      });
  }, []);

  return (
    <MaterialTable
      icons={tableIcons}
      style={{ width: "100%" }}
      options={{
        debounceInterval: 700,
        padding: "dense",
        search: true,
        searchFieldAlignment: "right",
      }}
      columns={[
        {
          title: "Property Name",
          field: "property_name",
        },
        {
          title: "Updated Date",
          field: "updated_at",
          render: (rowData) =>
            moment(rowData.updated_at).format("DD-MMM-YYYY HH:MM") + "hrs",
          filtering: false,
        },
        // { title: "First Name", field: "first_name" },
        // { title: "Last Name", field: "last_name" },
      ]}
      data={selectedDate === null ? propertyData : Dataprop}
      components={{
        Toolbar: (props) => (
          <div>
            <div
              style={{
                width: "40%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MTableToolbar {...props} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {" "}
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  className="positions"
                >
                  {" "}
                  <KeyboardDatePicker
                    clearable
                    className="form-control"
                    value={selectedDate}
                    placeholder="Select Date"
                    onChange={(date) => handleDateChange(date)}
                    format="MM/dd/yyyy"
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </div>
        ),
      }}
    />
  );
}

export default RemoteData;
