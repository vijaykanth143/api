import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import { Fragment, Component } from "react";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { MTableToolbar } from "material-table";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import tableIcons from "./tableicons";

function RemoteData() {
  const [propertyData, setPropertyData] = useState([]);
  const [selectedDate, handleDateChange] = useState(null);

  const Dataprop = propertyData.filter((item) =>
    moment(item.updated_at)
      .format("DD-MMM-YYYY")
      .includes(moment(selectedDate).format("DD-MMM-YYYY"))
  );
  console.log(Dataprop);

  console.log(propertyData);

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
      options={{
        debounceInterval: 700,
        padding: "dense",
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
        },
        // { title: "First Name", field: "first_name" },
        // { title: "Last Name", field: "last_name" },
      ]}
      data={selectedDate === null ? propertyData : Dataprop}
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
              {/* <DatePicker
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
              </label> */}
              '
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                className="positions"
              >
                {" "}
                <KeyboardDatePicker
                  clearable
                  value={selectedDate}
                  placeholder="Date"
                  value={selectedDate}
                  onChange={(date) => handleDateChange(date)}
                  format="MM/dd/yyyy"
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        ),
      }}
    />
  );
}

export default RemoteData;
