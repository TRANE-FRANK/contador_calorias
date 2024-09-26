import { Activity } from "../types"
import { categories } from "../data/categories"
import { Dispatch, useMemo } from "react"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activity-reducer"

type ActivitiesListProps = {
  activities: Activity[]
  dispatch: Dispatch<ActivityActions>
}

export default function ActivittList({
  activities,
  dispatch,
}: ActivitiesListProps) {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")).join(""),
    [activities]
  )

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

  return (
    <>
      <h2 className="text-4xl font-bold text-black text-center">
        Comida y Actividades
      </h2>
      {isEmptyActivities ? (
        <p className="text-center my-5 text-2xl">Aún no hay actividades</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 flex py-10 bg-slate-200 mt-5 justify-between shadow-lg rounded-lg"
          >
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-10 -left-14 rounded-lg px-10 py-2 text-white uppercase font-bold ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoryName(activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-lime-500">
                {activity.calories}
                {""}
                <span></span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activeId",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: { id: activity.id },
                  })
                }
              >
                <XCircleIcon className="h-8 w-8 text-red-800" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  )
}
