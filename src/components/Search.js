import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchTerm.trim() !== "") {
      setErrorMsg("");
      // eslint-disable-next-line react/prop-types
      props.handleSearch(searchTerm);
    } else {
      setErrorMsg("Please enter a search term.");
    }
  };

  return (
    <Form inline onSubmit={handleSearch}>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form.Group>
        <Form.Control
          type="search"
          name="searchTerm"
          value={searchTerm}
          placeholder="Search for a song..."
          onChange={handleInputChange}
          autoComplete="off"
          style={{ width: "330px" }}
        />
      </Form.Group>
    </Form>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
