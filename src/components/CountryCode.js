import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import { countries } from "country-data";
import "../styles/BulkOrder.css";

const CountryPhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState(""); // State to hold the phone number

  const handlePhoneChange = (value) => {
    setPhoneNumber(value); // Update the phone number state on input change
  };

  const countryList = countries.all
    .map((country) => ({
      code: country.countryCallingCodes[0],
      name: country.name,
      flag: country.alpha2.toLowerCase(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const formatOptionLabel = ({ code, name, flag }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        className={`flag-icon flag-icon-${flag}`}
        style={{ marginRight: "8px" }}
      ></span>
      {name} ({code})
    </div>
  );

  return (
    <PhoneInput
      defaultCountry="US" // Set the default country to United States
      value={phoneNumber} // Set the phone number value
      onChange={handlePhoneChange} // Handle the input change event
      countries={countryList}
      countryOptions={{
        // Custom render function to display country flags in dropdown
        renderOption: formatOptionLabel,
        // Show the country's phone number format in the dropdown
        formatOptionLabel,
      }}
      inputStyle={{ width: "100%" }}
    />
  );
};

export default CountryPhoneInput;
