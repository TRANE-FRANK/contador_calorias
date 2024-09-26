import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivittList from "./components/ActivittList"
import CalorieTracker from "./components/CalorieTracker"

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities))
  }, [state])

  const canRestartApp = () =>
    useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-black py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase m-2">
            Contador de Calorias
          </h1>

          <button
            className="bg-white hover:bg-slate-200 p-2 m-4 uppercase text-black cursor-pointer rounded-lg disabled:opacity-10 hover:animate-bounce"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar APP
          </button>
        </div>
      </header>

      <section className="bg-zinc-900 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>


      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker 
          activities={state.activities}
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl p-10">
        <ActivittList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  )
}

export default App
