import { useState } from 'react'

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
            message = 'The number must be between 1 and 5'
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


export default function Form() {

    const [state, setState] = useState({
        data: {
            distance: undefined,
            consumptionAt100: undefined,
            persons: undefined,
            fuelPrice: undefined,
        },
        errors: {
            distance: validations.distance(),
            consumptionAt100: validations.consumptionAt100(),
            persons: validations.persons(),
            fuelPrice: validations.fuelPrice()
        },
        touch: {},
        price: undefined
    })

    const [checkBox, setCheckBox] = useState(false)

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

    const handleCheckBox = (event) => {
        const { checked } = event.target
        setCheckBox(checked)
    }

    const handleSubmit = async (event) => {
        const { distance, consumptionAt100, persons, fuelPrice } = state.data;
        event.preventDefault();
        if (isValid()) {
            const calculatedPrice = calculateRoute(distance, consumptionAt100, persons, fuelPrice, checkBox).toFixed(2)
            setState(state => ({
                ...state,
                price: calculatedPrice
            }))
        };
    };

    const calculateRoute = (distance, consumptionAt100, persons, fuelPrice, wayBack) => {
        let outwardConsumption = (distance * consumptionAt100) / 100;
        const price = outwardConsumption * fuelPrice;
        const pricePerPerson = price / persons;
        if (wayBack) return pricePerPerson * 2;
        else return pricePerPerson
    }

    const colors = (price) => {
        if (price < 6 || (checkBox && price < 13)) return 'text-success'
        if (price <= 16 || (checkBox && price < 32)) return 'text-warning'
        if (price > 16 || (checkBox && price > 32)) return 'text-danger'
    }


    const { data, errors, touch, price } = state;


    return (
        <>
            <form onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded text-dark col-md-6">
                <div className="input-group mb-3">
                    <input
                        type="checkbox"
                        value={checkBox}
                        onChange={handleCheckBox}
                        className="me-2"
                    />Rounded Trip
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
                        min="0"
                        step="0.1"
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
                        min="0"
                        step="0.1"
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
                        min="0"
                        max="5"
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
                        min="0"
                        step="0.001"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={data.fuelPrice}
                    />
                    <div className="invalid-feedback">{errors.fuelPrice}</div>
                </div>
                <button className="btn btn-primary m-auto w-100" type="submit" disabled={!isValid()}>
                    Calculate!
                </button>
                {price &&
                    <div className='col-md-12 text-center m-3'>
                        <h3 className={colors(price)}>Calculated Price {price} €</h3>
                    </div>
                }
            </form>

        </>
    )
}