import React, { useState, useEffect } from 'react';
import './inputform.css';

function InputForm() {
  const [dateTime, setDateTime] = useState('');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [timerRunning, setTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!dateTime.trim()) {
      alert("Date and time selection is required."); // Show alert message
      return;
    }
    if (!timerRunning) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  const startTimer = () => {
    if (!timerRunning) {
      const interval = setInterval(() => {
        const targetDate = new Date(dateTime).getTime();
        const now = new Date().getTime();
        const timeDifference = targetDate - now;

        if (timeDifference > 0) {
          const seconds = Math.floor((timeDifference / 1000) % 60);
          const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
          const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

          setCountdown({ days, hours, minutes, seconds });
        } else {
          // If the specified date-time is in the past, set countdown to 0
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          clearInterval(interval);
          setTimerRunning(false);
          return 'not valid date'
        }
      }, 1000);

      setTimerRunning(true);
      setIntervalId(interval);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalId); // Clear the interval
    setTimerRunning(false); // Update timerRunning state
    setCountdown({ // Reset countdown
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });
  };

  useEffect(() => {
    if (formSubmitted && dateTime.trim()) {
      setFormSubmitted(false);
    }
  }, [dateTime, formSubmitted]);

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='title'>
          <label>
            <h1>Countdown Timer</h1>
            <div className='date'>
              <input type="datetime-local" value={dateTime} onChange={handleChange} required />
            </div>
          </label>
        </div>
        <div className='btn'>
          <button type="submit" >
            {timerRunning ? 'Cancel Countdown' : 'Start Countdown'}
          </button>
        </div>
        <h3>
          <div className='counter'>{countdown.days}<span className="days-label">Days</span></div> 
          <div className='counter'>{countdown.hours}<span className="days-label">Hours</span></div> 
          <div className='counter'> {countdown.minutes} <span className="days-label">Minutes</span></div> 
          <div className='counter'> {countdown.seconds}<span className="days-label">Seconds</span></div>
        </h3>
      </form>
    </div>
  );
}

export default InputForm;
