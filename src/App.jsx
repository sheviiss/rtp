import Footer from './components/footer'
import './index.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* This pushes the footer to the bottom */}
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold text-[#e6007e]">
          RT Pastry Project Started!
        </h1>
      </main>

      {/* This runs your footer.jsx file */}
      <Footer />
    </div>
  )
}

export default App