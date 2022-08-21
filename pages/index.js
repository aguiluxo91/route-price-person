import Head from 'next/head'
import { useState } from 'react'
import Script from 'next/script'

const validations = {
  distance: (value) => {
    let message;
    if (!value) {
      message = 'A distance is required'
    } else if (value < 0) {
      message = 'The number must be greater than 0'
    }
    return message;
  },
  consumptionAt100: (value) => {
    let message;
    if (!value) {
      message = 'A consumption at 100km is required';
    } else if (value < 0) {
      message = 'The number must be greater than 0'
    }
    return message;
  },
  persons: (value) => {
    let message;
    if (!value) {
      message = 'A number of persons is required';
    } else if (value < 0) {
      message = 'The number must be greater than 0'
    } else if (value > 5) {
      message = 'The number must be smaller than 6'
    }
    return message;
  },
  fuelPrice: (value) => {
    let message;
    if (!value) {
      message = 'The fuel price is required';
    } else if (value < 0) {
      message = 'The number must be greater than 0'
    }
    return message;
  },

}

export default function Home() {

  const [state, setState] = useState({
    data: {
      distance: undefined,
      consumptionAt100: undefined,
      persons: undefined,
      fuelPrice: undefined,
      wayBack: undefined
    },
    errors: {
      distance: validations.distance(),
      consumptionAt100: validations.consumptionAt100(),
      persons: validations.persons(),
      fuelPrice: validations.fuelPrice()
    },
    touch: {},
    checkedBox: false,
    price: undefined
  })

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(state => ({
      ...state,
      data: {
        ...state.data,
        [name]: value
      },
      checkedBox: !checkedBox,
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value)
      }
    }));
  };

  const handleSubmit = async (event) => {
    const { distance, consumptionAt100, persons, fuelPrice } = state.data;
    const { checkedBox } = state;
    event.preventDefault();
    if (isValid()) {
      const calculatedPrice = calculateRoute(distance, consumptionAt100, persons, fuelPrice, checkedBox).toFixed(2)
      setState(state => ({
        ...state,
        price: calculatedPrice
      }))
    };
  };

  const calculateRoute = (distance, consumptionAt100, persons, fuelPrice, wayBack) => {
    const outwardConsumption = (distance * consumptionAt100) / 100;
    let routeConsumption = 0
    if (wayBack) {
      routeConsumption = outwardConsumption * 2;
    } else {
      routeConsumption = outwardConsumption;
    }
    const price = routeConsumption * fuelPrice;
    const pricePerPerson = price / persons;
    return pricePerPerson;
  }
  const { data, errors, touch, checkedBox, price } = state;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="Route Price Calculator" content="Calculate a route price" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous"></link>
      </Head>
      <main className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light w-100">
        <h1 className="mb-4">Calculate the price for your car journey</h1>
        <form onSubmit={handleSubmit} className="w-50 shadow p-3 mb-5 bg-body rounded">

          <div className="input-group mb-3">
            <input
              type="checkbox"
              name="roundedTrip"
              value={checkedBox}
              onChange={handleChange}
              className="me-2"
            />Rounded Trip
            <div className="invalid-feedback">{errors.distance}</div>
          </div>

          <label htmlFor="distance" className="form-label">Distance</label>
          <div className="input-group mb-3">
            <input
              type="number"
              name="distance"
              id="distance"
              className={`form-control ${touch.distance && errors.distance ? "is-invalid" : ""
                }`}
              placeholder="Distance to your destiny in Kms"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data.distance}
            />
            <div className="invalid-feedback">{errors.distance}</div>
          </div>

          <label htmlFor="consumptionAt100" className="form-label">Consumption L/100 Kms</label>
          <div className="input-group mb-3">
            <input
              type="number"
              id="consumptionAt100"
              name="consumptionAt100"
              className={`form-control ${touch.consumptionAt100 && errors.consumptionAt100 ? "is-invalid" : ""
                }`}
              placeholder="Consumption of your car every 100 Kms"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data.consumptionAt100}
            />
            <div className="invalid-feedback">{errors.consumptionAt100}</div>
          </div>


          <label htmlFor="persons" className="form-label">Persons</label>
          <div className="input-group mb-3">
            <input
              type="number"
              name="persons"
              className={`form-control ${touch.persons && errors.persons ? "is-invalid" : ""
                }`}
              placeholder="Persons in your car"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data.persons}
            />
            <div className="invalid-feedback">{errors.persons}</div>
          </div>


          <label htmlFor="fuelPrice" className="form-label">Fuel Price</label>
          <div className="input-group mb-3">
            <input
              type="number"
              name="fuelPrice"
              id="fuelPrice"
              className={`form-control ${touch.fuelPrice && errors.fuelPrice ? "is-invalid" : ""
                }`}
              placeholder="Price of your Fuel per Liter"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data.fuelPrice}
            />
            <div className="invalid-feedback">{errors.fuelPrice}</div>
          </div>
          <button className="btn btn-primary m-auto w-100" type="submit" disabled={!isValid()}>
            Calculate!
          </button>
        </form>
        {price &&
          <div>
            <h3>Calculated Price {price} €</h3>
          </div>
        }

      </main>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></Script>
    </div>
  )
}
