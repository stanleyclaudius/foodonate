import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import { getDataAPI } from './../utils/fetchData'
import Layout from './../components/admin/Layout'
import NotFound from './../components/general/NotFound'

ChartJS.register(...registerables)

const Overview = () => {
  const [monthlyEvent, setMonthlyEvent] = useState([])

  const { auth } = useSelector(state => state)

  useEffect(() => {
    getDataAPI('dashboard/donator', auth.accessToken)
      .then(res => {
        setMonthlyEvent(res.data.monthlyEvent)
      })
  }, [auth.accessToken])

  if (auth.user?.role !== 'donatur') {
    return <NotFound />
  }

  return (
    <Layout>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-xl text-orange-400 font-medium'>RIngkasan Donatur</h1>
      </div>
      <div className='mt-8'>
        <div className='w-[750px]'>
          <Bar
            data={{
              labels: monthlyEvent.map(item => item.month),
              datasets: [{
                label: 'Event Growth',
                data: monthlyEvent.map(item => item.count),
                backgroundColor: ['skyblue']
              }]
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Overview