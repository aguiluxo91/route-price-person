import Head from 'next/head'
import Script from 'next/script'
import Footer from '../components/Footer';
import Form from '../components/Form';
import FuelStationsList from '../components/FuelStationsList';


export default function Home() {


  return (
    <>
      <Head>
        <title>Journey Calculator</title>
        <meta name="Route Price Calculator" content="Calculate a route price" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous"></link>
      </Head>

      <main>
        <div className="main-box mb-3">
          <div className="d-flex align-items-center flex-column justify-content-center row gx-0">
            <div className='w-100 d-flex justify-content-center'>
              <svg className='svg-blur' xmlns="http://www.w3.org/2000/svg">
                <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="200 0"></feGaussianBlur>
                </filter>
              </svg>
              <span filter-content="Journey" className="journey">Journey Calculator</span>
            </div>
            <Form />
          </div>
        </div>
        <FuelStationsList />
        <Footer />

      </main>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></Script>
    </>
  )
}
