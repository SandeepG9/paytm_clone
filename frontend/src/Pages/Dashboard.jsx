import { useState } from "react";
import Appbar from "../components/Appbar"
import { BalanceComponent } from "../components/BalanceComponent"
function Dashboard() {
  
  const [names,setNames] = useState("");
  return (
    <>
    <Appbar/>
    <BalanceComponent value="450"/>

    <div className="font-bold mt-6 text-lg">
        {names}
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" onChange={
              e=>{
                setNames(e.target.value)
              }
            }></input>
        </div>
        <div>
            dsamdban
        </div>
    </>
  )
}
export{Dashboard}