import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import { Component } from "react";
import moment from "moment";
import { MTableToolbar } from "material-table";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import tableIcons from "./tableicons";

function RemoteData() {
  const [propertyData, setPropertyData] = useState([]);

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
      options={{ debounceInterval: 700, padding: "dense" }}
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
        },
        // { title: "First Name", field: "first_name" },
        // { title: "Last Name", field: "last_name" },
      ]}
      data={propertyData}
      components={{
        Toolbar: (props) => (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "40%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MTableToolbar {...props} />
              <DatePicker
                style={{
                  width: "750px",
                  margin: "30px",
                }}
                id="datepicker"
                className="form-control"
                placeholderText="Search Date"
                // isClearable={true}
                dateFormat="dd MMM, yyyy"
                // selected={this.state.filterDate}
                // onChange={this.handleDateChange}
                // startDate={this.state.filterDate}
                showTimeSelect={false}
              />
              <label htmlFor="datepicker" className="mb-0">
                <i className="fas fa-calendar-alt" />
              </label>
            </div>
          </div>
        ),
      }}
    />
  );
}

export default RemoteData;
