import { useEffect, useState } from 'react';
import FuelStation from './FuelStation';

export default function FuelStationsList() {
    const [state, setState] = useState({
        fuelStations: [],
        loading: false,
        filter: '',
        filteredFuelStations: []
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
                setState({
                    fuelStations: fuelStations.ListaEESSPrecio,
                    loading: false
                })
            }
        }
        let isUnmounted = false;


        fetchFuelStations();

        return () => {
            isUnmounted = true;
        }

    }, []);

    const handleFilterChange = (event) => {
        const { value } = event.target
        setState(state => ({
            ...state,
            filter: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { fuelStations } = state
        const filteredFuelStations = fuelStations.filter(fuelStation => fuelStation["C.P."] === filter)
        filteredFuelStations.sort((a, b) => Number(a["Precio Gasoleo A"].replace(/,/g, ".")) - Number(b["Precio Gasoleo A"].replace(/,/g, ".")))
        setState(state => ({
            ...state,
            filteredFuelStations
        }))

    }

    const isValid = () => {
        const { filter } = state
        if ((filter && filter.length !== 5) || !filter ) return true
    }


    const { filteredFuelStations, filter, loading } = state;

    return (
        <>
            {loading && <div className="ping"></div>}
            {!loading &&
                <form onSubmit={handleSubmit} className="mx-auto my-3 col-md-2 d-flex flex-column">
                    <div className='input-group mb-3'>
                        <span htmlFor="CP" className='input-group-text'><svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="8.5" cy="8.5" r="5"/><path d="m17.571 17.5-5.571-5.5"/></g></svg></span>
                        <input
                        type="number"
                        className='form-control'
                        placeholder='Postal Code'
                        onChange={handleFilterChange}
                        value={filter}
                        id='CP'
                        name='CP'
                    />
                    </div>
                    
                    <button className='btn btn-primary mx-auto' disabled={isValid()}>Search Fuel Stations</button>
                </form>
            }
            {filteredFuelStations && <FuelStation filteredFuelStations={filteredFuelStations} />}
        </>
    )
}