import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import TravelListItem from './components/TravelListItem';

// Styled components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: 10px;
  margin-bottom:10;
`;

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 5px;
  text-align: center;
  margin-top: -10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
  }

  input,
  textarea,
  button {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    width: calc(100% - 20px); /* Adjusted width with left and right margin */
    
  }

  input,
  textarea {
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    background-color: #4caf50;
    color: #fff;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    width: 100%;
  }
`;

const GroupItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 16px;
    width: calc(100% - 20px);

    label {
    margin-right: 20px; /* Add margin to the right of each label */
  }
`;

const TravelList = styled.ul`
  list-style-type: none;
  padding: 5px;
`;

const ErrorMsg = styled.p`
  color: red;
  margin-top: 10px;
`;

const App = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    rating: 1,
    latitude: 0,
    longitude: 0,
  });

  const [travels, setTravels] = useState([]);
  const [error, setError] = useState(null);
  const server = "http://localhost:5000"
  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await axios.get(`${server}/api/travels`);
        setTravels(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTravels();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Input validation
      if (!formData.title.trim()) {
        setError('Please enter a title.');
        return;
      }

      if (!formData.description.trim()) {
        setError('Please enter a description.');
        return;
      }
      if (!formData.image.trim()) {
        setError('Please enter a image url.');
        return;
      }
    try {
      const response = await axios.post(`${server}/api/travels`, formData);
      setTravels([...travels, response.data]);
      setFormData({
        title: '',
        description: '',
        image: '',
        rating: 1,
        latitude: 0,
        longitude: 0,
      });
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error adding travel. Please try again.');
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${server}/api/travels/${id}`);
      setTravels(travels.filter((travel) => travel._id !== id));
    } catch (error) {
      console.error(error);
      setError('Error removing travel. Please try again.');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Destiny Diary</Title>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </label>
          <label>
            Image URL:
            <input type="text" name="image" value={formData.image} onChange={handleChange} />
          </label>
          <GroupItem>
            <label>
              Rating:
              <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" />
            </label>
            <label>
              Latitude:
              <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} />
            </label>
            <label>
              Longitude:
              <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} />
            </label>
          </GroupItem>
          
          <button type="submit">Add Travel</button>
        </Form>

        <h2>Travel Logs</h2>
        <TravelList>
        {travels.map((travel) => (
            <TravelListItem key={travel._id} travel={travel} onRemove={handleRemove} />
          ))}
        </TravelList>
      </Card>
    </Container>
  );
};

export default App;
