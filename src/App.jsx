import { useState } from 'react'
import './App.css'

const initialForm = {
  restaurantName: '',
  ownerName: '',
  city: '',
  cuisine: '',
  phone: '',
}

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      restaurantName: 'Spice Garden',
      ownerName: 'Aarav Sharma',
      city: 'Jaipur',
      cuisine: 'Indian',
      phone: '9876543210',
    },
  ])

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
  }

  return (
    <div className="container">
      <h1>Restaurant Registration Form</h1>

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
        <button type="submit">Register Restaurant</button>
      </form>

      <h2>Registered Restaurants</h2>

      <div className="list">
        {restaurants.map((restaurant) => (
          <div className="card" key={restaurant.id}>
            <p>
              <strong>Name:</strong> {restaurant.restaurantName}
            </p>
            <p>
              <strong>Owner:</strong> {restaurant.ownerName}
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
