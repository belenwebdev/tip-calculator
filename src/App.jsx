import React, { useState, useEffect } from 'react';
import screenshot from './assets/active-states.jpg'
import Tip from './Tip';
import './App.css'

function App() {
  const initialInputState = { data: '', valid: true, touched: false};
  const initialData = {
    bill: {...initialInputState},
    tip: {...initialInputState},
    customTip: {...initialInputState},
    people: {...initialInputState}
  };

  const [formData, setFormData] = useState(initialData);
  const [customTip, setCustomTip] = useState(false);
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState(0);

  React.useEffect(function() {
    calculateTotals();
  },[formData])

  function calculateTotals(){
    const people = +formData.people.data;
    const bill = +formData.bill.data;
    const tip = +formData.tip.data;
    const newTip = !people || !bill ? 0 : (bill * (tip / 100)) / people;
    setTip(newTip);
    setTotal(!people ? 0 : (bill / people) + newTip);
  }

  function handleChange(event) {
    const {name, value} = event.target;
    console.log(`update ${name} -> ${value}`);
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: {...formData[name], data: Number(value), touched: true, valid: +value>0 }
        }
    });
  }

  function selectTip(newTip){
    setFormData(prevFormData => {
      return {
          ...prevFormData,
          tip: {...formData[tip], data: Number(newTip), touched: true, valid: true },
      }
    })
    setCustomTip(false);
  }

  function resetForm(){
    setFormData(initialData);
    setCustomTip(false);
  }

  function handleCustomTip(){
    selectTip('');
    setCustomTip(true);
  }

  const tipOptions = [5,10,15,25,50];
  const tips = tipOptions.map(tip=>{
    return (<Tip tip={tip} key={tip} selected={!customTip && formData.tip.data==tip} handleClick={()=> selectTip(tip)}></Tip>);
  })

  return (
    <div className="App">
      <header>
        spli<br/>tter
      </header>
      <main>
        <div className="card">
          <div className="controls">
            <div className="row">
              <label htmlFor="bill">
                Bill
                <span className="error">{!formData.bill.valid && 'Can\'t be zero'}</span>
              </label>
              <input 
                type="number" 
                className={`bill ${formData.bill.valid?'':'invalid'}`} 
                placeholder="0" 
                lang="en" 
                onChange={handleChange} 
                name="bill" 
                value={formData.bill.data}
                required
                min="1"
              ></input>
            </div>
            <br/>
            <div className="row">
              <label htmlFor="tip">
                Select Tip %
                <span className="error">{!formData.tip.valid && 'Can\'t be zero'}</span>
              </label>
              <div className="tip-options-wrapper">
                {tips}
                {customTip && <input 
                  type="number" 
                  className={formData.tip.valid?'':'invalid'}
                  onChange={handleChange} 
                  name="tip" 
                  value={formData.tip.data}
                ></input>}
                {!customTip && <button className="custom-tip" onClick={handleCustomTip}>CUSTOM</button>}
              </div>
            </div>
            <br/>
            <div className="row">
              <label htmlFor="people">
                Number of people
                <span className="error">{!formData.people.valid && 'Can\'t be zero'}</span>
              </label>
              <input 
                type="number" 
                className={`people ${formData.people.valid?'':'invalid'}`} 
                placeholder="0" 
                onChange={handleChange} 
                name="people" 
                value={formData.people.data}
              ></input>
            </div>
          </div>
          <div className="result">
            <div className="row">
              <div>
                Tip Amount<br/>
                <span className="info">/ person</span>
              </div>
              <div className="total">
                $ {tip.toFixed(2)}
              </div>
            </div>
            <div className="row">
              <div>
                Total<br/>
                <span className="info">/ person</span>
              </div>
              <div className="total">
                $ {total.toFixed(2)}
              </div>
            </div>
            <div className="btn-wrapper">
              <button onClick={resetForm}>RESET</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
