import { useEffect, useState } from 'react';
import FuelStation from './FuelStation';

const validations = {
    cp: (value) => {
        let message
        if (value?.length < 5 || value?.length > 5) {
            message = 'A Postal Code has 5 digits'
        }
        return message
    },
    city: (value) => {
        let message
        if (value?.length < 3) {
            message = 'City must have more than 2 letters'
        }
        return message
    }
}

export default function FuelStationsList() {
    const [state, setState] = useState({
        fuelStations: [],
        loading: false,
        filter: {
            cp: "",
            city: ""
        },
        filteredFuelStations: [],
        errors: {
            cp: validations.cp(),
            city: validations.city(),
        },
        noResults: false
    })




    useEffect(() => {

        async function fetchFuelStations() {
            console.log('Fetching Fuel Stations...');
            setState(state => ({
                ...state,
                loading: true
            }))
            const fuelStations = await fetch("https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/")
                .then(fuelStations => fuelStations.json())
            if (!isUnmounted) {
                setState(state => ({
                    ...state,
                    fuelStations: fuelStations.ListaEESSPrecio,
                    loading: false
                }))
            }
        }
        let isUnmounted = false;

        fetchFuelStations();

        return () => {
            isUnmounted = true;
        }

    }, []);

    const handleFilterChange = (event) => {
        const { value, name } = event.target
        setState(state => ({
            ...state,
            filter: {
                ...state.filter,
                [name]: value
            },
            errors: {
                ...state.errors,
                [name]: validations[name] && validations[name](value)
            }
        }))
    }
    const eliminarDiacriticos = (texto) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { fuelStations, filter } = state
        let filteredFuelStations
        if (filter.cp.length === 5 && !filter.city) {
            const filterByCP = fuelStations.filter(fuelStation => fuelStation["C.P."] === filter.cp)
            filteredFuelStations = filterByCP.sort((a, b) => Number(a["Precio Gasoleo A"].replace(/,/g, ".")) - Number(b["Precio Gasoleo A"].replace(/,/g, ".")))
        }
        if (filter.city.length > 3 && !filter.cp) {
            const filterByCity = fuelStations.filter(fuelStation => eliminarDiacriticos(fuelStation.Municipio.toLowerCase()).includes(eliminarDiacriticos(filter.city.toLowerCase())))
            filteredFuelStations = filterByCity.sort((a, b) => Number(a["Precio Gasoleo A"].replace(/,/g, ".")) - Number(b["Precio Gasoleo A"].replace(/,/g, ".")))
        }
        if (filteredFuelStations?.length > 1) {
            setState(state => ({
                ...state,
                errors: {},
                noResults: false,
                filteredFuelStations
            }))
        } else {
            setState(state => ({
                ...state,
                filteredFuelStations: [],
                noResults: true
            }))
        }

    }


    const isValid = (error) => {
        const { filter } = state
        if (error === 'cp') {
            if (filter.cp.length === 5 && !filter.city) {
                return true
            }
        }
        if (error === 'city' && !filter.cp) {
            if (filter.city.length > 2) {
                return true
            }
        }

    }


    const { filteredFuelStations, filter, loading, errors, noResults } = state;

    return (
        <>
            {loading && <div className="ping mb-3 mx-auto"></div>}
            {!loading &&
                <div className='col-11 col-md-8 border shadow mb-4 rounded bg-body mx-auto'>
                    <h3 className='text-center text-success m-2 text-decoration-underline'>Look for your nearest Fuel Station:</h3>
                    
                    {(filter.cp && filter.city) && <p className="text-center fs-6 text-danger">Enter only 1 field</p>}

                    <form onSubmit={handleSubmit} className="mx-auto my-3 col-11 col-sm-6 col-md-4 rounded">
                        <div className='input-group mb-3'>
                            <span htmlFor="cp" className='input-group-text'><svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 4)"><path d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v8c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-8c0-1.1045695.8954305-2 2-2z" /><path d="m10.5 2.5h1c.5522847 0 1 .44771525 1 1v1c0 .55228475-.4477153 1-1 1h-1c-.55228475 0-1-.44771525-1-1v-1c0-.55228475.44771525-1 1-1z" /><path d="m2.5 7.5h5" /><path d="m2.5 9.5h5" /></g></svg></span>
                            <input
                                type="number"
                                className={`form-control ${errors.cp && "is-invalid"}`}
                                placeholder='Postal Code...'
                                onChange={handleFilterChange}
                                value={filter.cp}
                                id='cp'
                                name='cp'
                            />
                            <button className='btn btn-primary rounded-end' disabled={!isValid('cp')}>Search</button>
                            <div className="invalid-feedback">{errors.cp}</div>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit} className="mx-auto my-3 col-11 col-sm-6 col-md-4 rounded">
                        <div className='input-group mb-3'>
                            <span htmlFor="city" className='input-group-text'><svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 2)"><path d="m6.5 16.5407715.6311176-.7118691c.71585099-.8191184 1.36011688-1.5983525 1.93279767-2.3377022l.4733382-.6239608c1.97516433-2.6615039 2.96274653-4.77276704 2.96274653-6.33378943 0-3.33218241-2.6862915-6.03344997-6-6.03344997s-6 2.70126756-6 6.03344997c0 1.56102239.98758218 3.67228553 2.96274653 6.33378943l.4733382.6239608c.73630387.9505925 1.5909423 1.9671163 2.56391527 3.0495713z" /><circle cx="6.5" cy="6.5" r="2.5" /></g></svg></span>
                            <input
                                type="text"
                                className={`form-control ${errors.city && "is-invalid"}`}
                                placeholder='City name...'
                                onChange={handleFilterChange}
                                value={filter.city}
                                id='city'
                                name='city'
                            />
                            <button className='btn btn-primary rounded-end' disabled={!isValid('city')}>Search</button>
                            <div className="invalid-feedback">{errors.city}</div>
                        </div>

                    </form>
                </div>
            }
            {filteredFuelStations && <FuelStation filteredFuelStations={filteredFuelStations} />}
            {noResults && <p className='w-100 text-center text-danger fs-4 mb-4'>No results...</p>}
        </>
    )
}