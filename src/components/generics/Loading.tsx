import svg from "../../assets/loading.svg"

function Loading() {
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-16 h-16 p-8">
               <img src={svg} alt="loading ..."/>
         </div>
    </div>
  )
}

export default Loading