import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ListImages from './components/ListImages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-image" element={<ListImages />} />
      </Routes>
    </Router>
  )
}

export default App
