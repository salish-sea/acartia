const axios = require('axios')

const baseURL = 'https://acartia.io/api/v1/sightings/current';

describe('GET /api/v1/sightings/current', () => {
  it('should return status code 200', async () => {
    try {
      const response = await axios.get(baseURL);
      expect(response.status).toBe(200);
    } catch (error) {
      throw new Error(`Request failed with status: ${error.response.status}`);
    }
  });

  it('should return a JSON mime type', async () => {
    try {
      const response = await axios.get(baseURL);
      expect(response.headers['content-type']).toMatch(/application\/json/);
    } catch (error) {
      throw new Error(`Request failed with error: ${error.message}`);
    }
  });

  it('should return an array of sightings objects', async () => {
    try {
      const response = await axios.get(baseURL);
      expect(Array.isArray(response.data)).toBe(true);
    } catch (error) {
      throw new Error(`Request failed with error: ${error.message}`);
    }
  });


  it('should return a non-empty array of sightings', async () => {
    try {
      const response = await axios.get(baseURL);
      const data = response.data;
      expect(data.length).toBeGreaterThan(0);
    } catch (error) {
      throw new Error(`Request failed with error: ${error.message}`);
    }
  });

  it('should contain specific fields in the sighting objects', async () => {
    try {
      const response = await axios.get(baseURL);
      const sightings = response.data;
      if (sightings.length > 0) {
        const sighting = sightings[0];
        expect(sighting).toHaveProperty('ssemmi_id');
        expect(sighting).toHaveProperty('created');
        expect(sighting).toHaveProperty('type');
        expect(sighting).toHaveProperty('created');
        expect(sighting).toHaveProperty('data_source_witness');
        expect(sighting).toHaveProperty('data_source_comments');
        expect(sighting).toHaveProperty('data_source_entity');
        expect(sighting).toHaveProperty('ssemmi_date_added');
        expect(sighting).toHaveProperty('trusted');
        expect(sighting).toHaveProperty('entry_id');
      } else {
        throw new Error('No sightings returned');
      }
    } catch (error) {
      throw new Error(`Request failed with error: ${error.message}`);
    }
  });
})
