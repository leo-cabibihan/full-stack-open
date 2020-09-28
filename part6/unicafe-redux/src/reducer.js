const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const {good, ...notGood} = state
      return {
        good: good + 1,
        ...notGood
      }
    case 'OK':
      const {ok, ...notOk} = state
      return {
        ok: ok + 1,
        ...notOk
      }

    case 'BAD':
      const {bad, ...notBad} = state
      return {
        bad: bad + 1,
        ...notBad
      }
        
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer