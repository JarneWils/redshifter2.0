import './App.css'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

function App() {

  return (
    <>
      <div style={{zIndex: 2, position: 'fixed', top: 0, left: 0}}>

        <div className="cursor">+</div>

      </div>

      <Canvas
        shadows={true}
        style={{
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          overflow:'hidden',
          zIndex: 1}}
      >
        <Scene />

      </Canvas>
      
    </>
  )
}

export default App
