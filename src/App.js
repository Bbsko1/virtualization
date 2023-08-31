import './App.css';
import { Virtual } from './components/Virtual/Virtual';

const arData = [...Array(100)].map((a, i) => i + 1);

function App() {
    return (
        <div className="App">
            <Virtual 
                viewCount={4} 
                itemHeight={60} 
                height={240}
                width={100}
                additionCount={1}
            >
                {
                    arData.map(item => (
                        <li key={item} className='virtualization__item'>
                            {item}
                        </li>
                    ))
                }
            </Virtual>
        </div>
    );
}

export default App;
