import React, { useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchContext from '../../../SearchContext.jsx';

export default function Search() {
  const { setSearchTerm } = useContext(SearchContext);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <InputGroup>
      <Form.Control type="search" placeholder="Search..." onChange={handleSearch} />
      <InputGroup.Text>
        <FontAwesomeIcon icon={faSearch} />
      </InputGroup.Text>
    </InputGroup>
  );
}
