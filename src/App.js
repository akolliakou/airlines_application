import React, { useState} from 'react';
import './App.css'
import Table from './components/Table'
import AirlineData from './data'
import Select from './components/Select';
import Button from './components/Button'
import Map from './components/Map'

const App = () => {
  const allRoutes = AirlineData.routes
  const allAirports = AirlineData.airports
  const allAirlines = AirlineData.airlines

  const [routes, setRoutes] = useState(allRoutes)
  const [airline, setAirline] = useState('All')
  const [airport, setAirport] = useState('All')

  const columns = [
    { name: 'Airline', property: 'airline' },
    { name: 'Source Airport', property: 'src' },
    { name: 'Destination Airport', property: 'dest' },
  ];

  const formatValue = (property, value) => {
    if (property === 'airline') {
      return AirlineData.getAirlineById(value).name
    } else {
      return AirlineData.getAirportByCode(value).name
    }
  }

  const setAirlinesRoutes = (e) => {
    if ((e.target.value === 'All Airlines' && airport === 'All') || e.target.value === 'All') {
      setAirline('All')
      setAirport('All')
      setRoutes([...allRoutes])
    } else if (e.target.value === 'All Airlines' && airport !== 'All') {
      setAirline('All')
      setAirport(airport)
      setRoutes(allRoutes.filter(route => {
        return formatValue('airport', route.src) === airport || formatValue('airport', route.dest) === airport
      }))
    } else if (e.target.value !== 'All Airlines' && airport === 'All') {
      setAirline(e.target.value)
      setAirport('All')
      setRoutes(allRoutes.filter(route => {
        return formatValue('airline', route.airline) === e.target.value
      }))
    } else if (e.target.value !== 'All Airlines' && airport !== 'All') {
      setAirline(e.target.value)
      setAirport(airport)
      setRoutes(allRoutes.filter(route => {
        return formatValue('airline', route.airline) === e.target.value &&
          (formatValue('airport', route.src) === airport || formatValue('airport', route.dest) === airport)
      }))
    }
  }

  const setAirportsRoutes = (e) => {
    if ((e.target.value === 'All Airports' && airline === 'All') || e.target.value === 'All') {
      setAirline('All')
      setAirport('All')
      setRoutes([...allRoutes])
    } else if (e.target.value === 'All Airports' && airline !== 'All') {
      setAirline(airline)
      setAirport('All')
      setRoutes(allRoutes.filter(route => {
        return formatValue('airline', route.airline) === airline
      }))
    } else if (e.target.value !== 'All Airports' && airline === 'All') {
      setAirline('All')
      setAirport(e.target.value)
      setRoutes(allRoutes.filter(route => {
        return formatValue('airport', route.src) === e.target.value || formatValue('airport', route.dest) === e.target.value 
      }))
    } else if (e.target.value !== 'All Airports' && airline !== 'All') {
      setAirline(airline)
      setAirport(e.target.value)
      setRoutes(allRoutes.filter(route => {
        return formatValue('airline', route.airline) === airline &&
          (formatValue('airport', route.src) === e.target.value || formatValue('airport', route.dest) === e.target.value)
      }))
    }
  }

  const clearFilters = (e) => {
    e.preventDefault()
    setAirlinesRoutes(e)
    setAirportsRoutes(e)
  }

  const defaultFilters = (airline === 'All' && airport === 'All')

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Map routes={routes} />
        <div>
          Show routes on
          <Select onSelect={setAirlinesRoutes} selected={airline} all={allAirlines} routes={routes} title="All Airlines" />
          flying in or out of
          <Select onSelect={setAirportsRoutes} selected={airport} all={allAirports} routes={routes} title="All Airports" />
          <Button onClick={clearFilters} value="All" disabled={defaultFilters} />
        </div>
          <Table className="routes-table" columns={columns} routes={routes} format={formatValue} />
      </section>
    </div>
  )
}

export default App;