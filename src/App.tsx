import {HealthBar} from "./component/HealthBar/HealthBar.tsx";
import {useState} from "react";

function App() {
    const [hp1, setHp1] = useState(100);
    const [hp2, setHp2] = useState(70);
    const [hp3, setHp3] = useState(80);

    const decreaseAll = () => {
        setHp1(prev => Math.max(0, prev - 20));
        setHp2(prev => Math.max(0, prev - 20));
        setHp3(prev => Math.max(0, prev - 20));
    }

    const increaseAll = () => {
        setHp1(prev => Math.min(100, prev + 20));
        setHp2(prev => Math.min(100, prev + 20));
        setHp3(prev => Math.min(100, prev + 20));
    }

  return (
      <div style={{
          padding: '20px'
      }}>
        <HealthBar hp={hp1} maxHp={100}/>
        <HealthBar hp={hp2} maxHp={100}/>
        <HealthBar hp={hp3} maxHp={100}/>
          <button onClick={decreaseAll}>
              Deal damage
          </button>
          <button onClick={increaseAll}>
              Heal all
          </button>
      </div>
  );
}

export default App;