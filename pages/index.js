import Head from 'next/head'
import styles from '../styles/Home.module.css'
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
      distance: null,
      consumptionAt100: null,
      persons: null,
      fuelPrice: null
    },
    errors: {
      distance: validations.distance(),
      consumptionAt100: validations.consumptionAt100(),
      persons: validations.persons(),
      fuelPrice: validations.fuelPrice()
    },
    touch: {}
  })

  const [price, setPrice] = useState(null)

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
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value)
      }
    }));
  };

  const handleSubmit = async (event) => {
    const { distance, consumptionAt100, persons, fuelPrice } = state.data;
    event.preventDefault();
    if (isValid()) {
      setPrice(calculateRoute(distance, consumptionAt100, persons, fuelPrice).toFixed(2))
    };
  };

  const calculateRoute = (distance, consumptionAt100, persons, fuelPrice) => {
    const outwardConsumption = (distance * consumptionAt100) / 100;
    const routeConsumption = outwardConsumption * 2;
    const price = routeConsumption * fuelPrice;
    const pricePerPerson = price / persons;
    return pricePerPerson;
  }
  const { data, errors, touch } = state;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="Route Price Calculator" content="Calculate a route price" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous"></link>
      </Head>
      <main className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="mb-4">Calculate the price for your car journey</h1>
        <form onSubmit={handleSubmit} className="w-50 shadow p-3 mb-5 bg-body rounded">
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa fa-user fa-fw"></i>
            </span>
            <input
              type="number"
              name="distance"
              className={`form-control ${touch.distance && errors.distance ? "is-invalid" : ""
                }`}
              placeholder="Distance"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data.distance}
            />
            <div className="invalid-feedback">{errors.distance}</div>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa fa-envelope fa-fw"></i>
            </span>
            <input
              type="number"
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

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa fa-envelope fa-fw"></i>
            </span>
            <input
              type="number"
              name="persons"
              className={`form-control ${touch.persons && errors.persons ? "is-invalid" : ""
                }`}
              placeholder="How many Persons will travel?"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data.persons}
            />
            <div className="invalid-feedback">{errors.persons}</div>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa fa-envelope fa-fw"></i>
            </span>
            <input
              type="number"
              name="fuelPrice"
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
