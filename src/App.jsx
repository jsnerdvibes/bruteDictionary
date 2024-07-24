import { useCallback, useEffect, useState } from 'react';

function App() {
  let [tasks, setTasks] = useState([]);
  let [adtask, setAdtask] = useState('');
  let [bruteDict, setBruteDict] = useState([]);
  let char = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

  let [dates, setDates] = useState([]);
  let [dateText, setDateText] = useState('');

  let addTask = useCallback(() => {
    if (adtask) {
      setTasks((prevTask) => [...prevTask, adtask]);
      setAdtask('');
    }
  }, [adtask]);

  let addDates = useCallback(() => {
    if (dateText) {
      setDates((prevTask) => [...prevTask, dateText]);
      setDateText('');
    }
  }, [dateText]);

  let delLast = useCallback(() => {
    setDates((prevState) => prevState.slice(0, -1));
  }, [dates]);

  let delTask = useCallback(() => {
    setTasks((prevState) => prevState.slice(0, -1));
  }, [tasks]);

  let bruteDictfile = useCallback(() => {
    const result = [];
    for (let i = 0; i < tasks.length; i++) {
      for (let j = 0; j < dates.length; j++) {
        result.push(`${tasks[i]}${dates[j]}`);
        for (let k = 0; k < char.length; k++) {
          result.push(`${tasks[i]}${char[k]}${dates[j]}`);
        }
      }
    }

    setBruteDict(result);
    console.log(result);
  }, [tasks, dates]);

  return (
    <>
      <div className="text-center p-4">
        <h1 className="text-4xl mb-4">BruteForce Dictionary</h1>
        <div className="flex flex-col sm:flex-row justify-around items-center h-auto sm:h-20 pt-5">
          <div className="mt-4 sm:mt-0">
            <input
              className="border border-black mr-2 p-1"
              type="text"
              value={adtask}
              onChange={(e) => setAdtask(e.target.value)}
            />
            <button
              className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 mr-2"
              onClick={addTask}
            >
              Add Names
            </button>
            <button
              className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
              onClick={delTask}
            >
              Delete Names
            </button>
          </div>
          <div className="mt-4 sm:mt-0">
            <input
              className="border border-black mr-2 p-1"
              type="number"
              value={dateText}
              onChange={(e) => setDateText(e.target.value)}
            />
            <button
              className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 mr-2"
              onClick={addDates}
            >
              Add Dates
            </button>
            <button
              className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
              onClick={delLast}
            >
              Delete Dates
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <button
            className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 mr-2 mt-4"
            onClick={bruteDictfile}
          >
            Create Brute Dict
          </button>
          <button
            className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 mb-2 mt-2"
            onClick={() => {
              setBruteDict([]);
            }}
          >
            Clear List
          </button>
          <textarea
            className="border border-black p-2 w-full max-w-4xl mt-4"
            name=""
            id=""
            cols="100"
            rows="10"
            readOnly
            value={bruteDict.join('\n')}
          ></textarea>
        </div>
        <div className="flex flex-col sm:flex-row justify-around mt-6">
          <ul className="list-none">
            <li className="font-bold text-xl font-serif">Names</li>
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
          <ul>
            <li className="font-bold text-xl font-serif">Numbers</li>
            {dates.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
