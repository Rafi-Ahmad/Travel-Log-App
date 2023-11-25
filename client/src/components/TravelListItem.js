// TravelListItem.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListItem = styled.li`
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const TravelInfo = styled.div`
  display: ${(props) => (props.expanded ? 'block' : 'none')};
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
`;

const Title = styled.div`
  flex-grow: 1; /* Allow the title to grow and take up available space */
`;

const TravelListItem = ({ travel, onRemove }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const handleRemove = () => {
    onRemove(travel._id);
  };

  return (
    <ListItem onClick={toggleAccordion}>
      <ButtonContainer>
        <Title>{travel.title}</Title>
        <div>
          <Button onClick={toggleAccordion}>
            <FontAwesomeIcon icon={expanded ? faMinus : faPlus} />
          </Button>
          <Button onClick={handleRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </ButtonContainer>
      <TravelInfo expanded={expanded}>
        <p>Description: {travel.description}</p>
        <img src={travel.image} width="100%" alt='t'/>
        <p>Rating: {travel.rating}</p>
      </TravelInfo>
    </ListItem>
  );
};

export default TravelListItem;
