const initialState = {
  isTimerRunning: false,
  workTime: '00:40',
  restTime: '00:20',
  rounds: 4
}

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return {
        ...state,
        isTimerRunning: true
      }
    case 'STOP_TIMER':
      return {
        ...state,
        isTimerRunning: false
      }
    case 'SET_TIMER_SETTINGS':
      return {
        ...state,
        workTime: action.payload.workTime,
        restTime: action.payload.restTime,
        rounds: action.payload.rounds
      }
    default:
      return state
  }
}

export default timerReducer
