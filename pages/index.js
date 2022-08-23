import Head from 'next/head'
import Script from 'next/script'
import Form from '../components/Form';
import FuelStations from '../components/FuelStations';


export default function Home() {


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="Route Price Calculator" content="Calculate a route price" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous"></link>
      </Head>
      <main className='d-block'>
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light w-100 row gx-0 position-static">
          <h1 className="mb-4 text-primary col-md-12 text-center">Calculate the price for your car journey</h1>
          <Form />
        </div>
        <FuelStations />
      </main>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></Script>
    </div>
  )
}
