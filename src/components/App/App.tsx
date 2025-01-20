import { Route, Routes } from 'react-router'
import style from './App.module.css'
import Feed from '../Feed/Feed'

function App() {
  return (
    <div className={style.main}>
      <Routes>
        <Route path="/" element={<Feed />} />
      </Routes>
    </div>
  )
}

export default App
