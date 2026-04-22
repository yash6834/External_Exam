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
  const [restaurants, setRestaurants] = useState([])
  const [editId, setEditId] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (editId !== null) {
      setRestaurants((current) =>
        current.map((restaurant) =>
          restaurant.id === editId ? { ...restaurant, ...formData } : restaurant,
        ),
      )
      setEditId(null)
    } else {
      const newRestaurant = {
        id: Date.now(),
        ...formData,
      }

      setRestaurants((current) => [newRestaurant, ...current])
    }

    setFormData(initialForm)
  }

  const handleEdit = (restaurant) => {
    setFormData({
      restaurantName: restaurant.restaurantName,
      ownerName: restaurant.ownerName,
      city: restaurant.city,
      cuisine: restaurant.cuisine,
      phone: restaurant.phone,
    })
    setEditId(restaurant.id)
  }

  const handleDelete = (id) => {
    setRestaurants((current) => current.filter((restaurant) => restaurant.id !== id))

    if (editId === id) {
      setEditId(null)
      setFormData(initialForm)
    }
  }

  const handleCancelEdit = () => {
    setEditId(null)
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
        <button type="submit">
          {editId !== null ? 'Update Restaurant' : 'Register Restaurant'}
        </button>
        {editId !== null ? (
          <button
            type="button"
            className="secondary-button"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        ) : null}
      </form>

      <h2>Registered Restaurants</h2>

      <div className="table-wrapper">
        <table className="restaurant-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner</th>
              <th>City</th>
              <th>Cuisine</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  No restaurant data added yet.
                </td>
              </tr>
            ) : (
              restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td>{restaurant.restaurantName}</td>
                  <td>{restaurant.ownerName}</td>
                  <td>{restaurant.city}</td>
                  <td>{restaurant.cuisine}</td>
                  <td>{restaurant.phone}</td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="action-button edit-button"
                      onClick={() => handleEdit(restaurant)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="action-button delete-button"
                      onClick={() => handleDelete(restaurant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
