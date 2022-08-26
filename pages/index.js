import Head from 'next/head'
import Script from 'next/script'
import Form from '../components/Form';
import FuelStationsList from '../components/FuelStationsList';


export default function Home() {


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="Route Price Calculator" content="Calculate a route price" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous"></link>
      </Head>

      <main>
        <div className="d-flex align-items-center flex-column justify-content-center row gx-0">
          <h1 className="my-4 text-primary text-center">Calculate the price for your car journey</h1>
          <Form />
          <FuelStationsList />
        </div>
      </main>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></Script>
    </>
  )
}
