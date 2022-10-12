import React, { useState, useEffect } from 'react';
import screenshot from './assets/active-states.jpg'
import './App.css'

function App() {
  const initialData = {
    bill: null,
    tip: null,
    customTip: null,
    people: null
  };

  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState(initialData);
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState(0);
  const [touched, setTouched] = useState(false);

  function getTip() {
    return Number(formData.customTip || formData.tip);
  }

  React.useEffect(function() {
    calculateTotals();
    validateForm();
  },[formData])

  function calculateTotals(){
    const newTip = +formData.people == 0 || +formData.bill == 0 ? 0 : (formData.bill * (getTip() / 100)) / formData.people;
    setTip(newTip);
    const newTotal = +formData.people == 0 ? 0 : (formData.bill / formData.people) + newTip;
    setTotal(newTotal);
  }

  function validateForm(){
    if(!touched) return;
    console.log('validate form');
    const ERROR_MESSAGE = 'Cannot be empty';
    if(!formData.bill){
      console.log('bill is empty');
      setFormErrors(errors=>{
        return {...errors, bill: ERROR_MESSAGE}
      })
    }
    if(!formData.tip && !formData.tip){
      console.log('tip is empty');
      setFormErrors(errors=>{
        return {...errors, tip: ERROR_MESSAGE}
      })
    }
    if(!formData.people && !formData.people){
      console.log('people is empty');
      setFormErrors(errors=>{
        return {...errors, people: ERROR_MESSAGE}
      })
    }
  }

  function handleChange(event) {
    const {name, value, type, checked} = event.target;
    console.log(`update ${name} -> ${value}`);
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value)
        }
    });
    setTouched(true);
    // if it's a custom tip, clear selected tip
    if(name=='customTip'){
      setFormData(prevFormData => {
        return {
            ...prevFormData,
            tip: undefined,
        }
      })
    }
  }

  function selectTip(newTip){
    setFormData(prevFormData => {
      return {
          ...prevFormData,
          tip: Number(newTip),
          customTip: undefined
      }
    })
  }

  function resetForm(){
    setFormData(initialData);
    setFormErrors(initialData);
    setTouched(false);
  }

  return (
    <div className="App">
      <header>
        spli<br/>tter
      </header>
      <main>
        <div className="card">
          <div className="controls">
            <div className="row">
              <label>Bill</label>
              <input 
                type="number" 
                className="bill" 
                placeholder="0" 
                lang="en" 
                onChange={handleChange} 
                name="bill" 
                value={formData.bill}
                required
                min="1"
              ></input>
            </div>
            <br/>
            <div className="row">
              <label>Select Tip %</label>
              <div className="tip-options-wrapper">
                <div className={`tip-option ${formData.tip==5 ? "selected" : ""}`} onClick={() => selectTip(5)}>5%</div>
                <div className={`tip-option ${formData.tip==10 ? "selected" : ""}`} onClick={() => selectTip(10)}>10%</div>
                <div className={`tip-option ${formData.tip==15 ? "selected" : ""}`} onClick={() => selectTip(15)}>15%</div>
                <div className={`tip-option ${formData.tip==25 ? "selected" : ""}`} onClick={() => selectTip(25)}>25%</div>
                <div className={`tip-option ${formData.tip==50 ? "selected" : ""}`} onClick={() => selectTip(50)}>50%</div>
                <input type="number" className="custom-tip" onChange={handleChange} name="customTip" value={formData.customTip}></input>
              </div>
            </div>
            <br/>
            <div className="row">
              <label>Number of people</label>
              <input type="number" className="people" placeholder="0" onChange={handleChange} name="people" value={formData.people}></input>
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
