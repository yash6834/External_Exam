import { useState } from 'react'
import './App.css'

const sampleRestaurants = [
  {
    id: 1,
    restaurantName: 'Spice Garden',
    ownerName: 'Aarav Sharma',
    city: 'Jaipur',
    cuisine: 'Indian',
    phone: '9876543210',
  },
  {
    id: 2,
    restaurantName: 'Ocean Bowl',
    ownerName: 'Riya Nair',
    city: 'Kochi',
    cuisine: 'Seafood',
    phone: '9988776655',
  },
]

const initialForm = {
  restaurantName: '',
  ownerName: '',
  city: '',
  cuisine: '',
  phone: '',
}

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [restaurants, setRestaurants] = useState(sampleRestaurants)
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newRestaurant = {
      id: restaurants.length + 1,
      ...formData,
    }

    setRestaurants((current) => [newRestaurant, ...current])
    setFormData(initialForm)
    setMessage('Restaurant registered successfully.')
  }

  return (
    <div className="container">
      <h1>Restaurant Registration</h1>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
        Fill out the form below and the registered restaurant data will appear
        underneath.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="restaurantName"
          placeholder="Restaurant Name"
          value={formData.restaurantName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      {message ? (
        <p style={{ textAlign: 'center', color: 'green', marginBottom: '20px' }}>
          {message}
        </p>
      ) : null}

      <h2>Registered Restaurant Data</h2>

      <div className="list">
        {restaurants.map((restaurant) => (
          <div className="card" key={restaurant.id}>
            <p>
              <strong>Restaurant Name:</strong> {restaurant.restaurantName}
            </p>
            <p>
              <strong>Owner Name:</strong> {restaurant.ownerName}
            </p>
            <p>
              <strong>City:</strong> {restaurant.city}
            </p>
            <p>
              <strong>Cuisine:</strong> {restaurant.cuisine}
            </p>
            <p>
              <strong>Phone:</strong> {restaurant.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
