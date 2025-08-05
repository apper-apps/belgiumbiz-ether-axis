import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import SearchPage from "@/components/pages/SearchPage"
import CompanyProfilePage from "@/components/pages/CompanyProfilePage"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background font-inter">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/company/:vatNumber" element={<CompanyProfilePage />} />
        </Routes>
        
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App