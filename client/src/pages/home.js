import LatestNews from './../components/home/LatestNews'
import Navbar from './../components/general/Navbar'
import Banner from './../components/home/Banner'
import LatestEvents from './../components/home/LatestEvents'
import Footer from './../components/general/Footer'
import Overview from './../components/home/Overview'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Overview />
      <LatestEvents />
      <LatestNews />
      <Footer />
    </div>
  )
}

export default Home