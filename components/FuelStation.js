
export default function FuelStation({ filteredFuelStations }) {

    const capitalizeFirstLetter = (string) => {
        const words = string.split(' ')
        const capitalizedWords = words.map((word) => {
            return word[0]?.toUpperCase() + word.substring(1);
        });
        return capitalizedWords.join(" ")
    }

    return (
        <>
            {filteredFuelStations.map((fuelStation, i) => (
                <div key={i}>
                    {(fuelStation["Precio Gasolina 95 ES"] || fuelStation["Precio Gasoleo A"]) &&
                        <div key={i} className="card mb-3 w-75 mx-auto">
                            <div className="card-header text-success text-decoration-underline">
                                <strong>{fuelStation.Rótulo}</strong>
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <p className='text-dark'>{capitalizeFirstLetter(fuelStation.Dirección.toLowerCase())}</p>
                                    <p className='text-muted fs-6'>Horarios: {fuelStation.Horario}</p>
                                    {fuelStation["Precio Gasoleo A"] &&
                                        <p className='fw-light fs-6 text-dark'>Precio Gasoleo A <span className='fw-semibold'>{fuelStation["Precio Gasoleo A"]} €</span></p>
                                    }

                                    {fuelStation["Precio Gasolina 95 E5"] &&
                                        <p className='fw-light fs-6 text-dark'>Precio Gasolina 95 <span className='fw-semibold'>{fuelStation["Precio Gasolina 95 E5"]} €</span></p>
                                    }
                                    <footer className="blockquote-footer mt-3">{fuelStation.Municipio}, {fuelStation.Provincia}</footer>
                                </blockquote>
                            </div>
                        </div>
                    }
                </div>
            ))}
        </>
    )
}