import React, { useState } from 'react'
import ForgetPassword from './components/ForgetPassword'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Alert from './components/Alert'
import Signup from './components/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContactState from './context/contactState'
import ContactDetail from './components/ContactDetail'

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }
  return (
    <div>
      <ContactState showAlert={showAlert}>
        <Router>
          <Navbar title="CONTACT INFORMATION APPLICATION" showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route
              exact
              path="/forgetPassword"
              element={<ForgetPassword showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route exact
            path="/contact/fetchContact/:id"   
            element={<ContactDetail showAlert={ContactDetail}/>}
            />
          </Routes>
          
        </Router>
      </ContactState>
    </div>
  )
}

export default App