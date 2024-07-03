import React from 'react'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { MdOutlineCardGiftcard, MdProductionQuantityLimits } from 'react-icons/md'
import { useAppSelector } from '../../../store';


function StatisticsCard() {
  const themeState = useAppSelector((state) => state.theme);
  return (
         <div className="grid grid-cols-3 gap-4">
        <div className={themeState.theme === "light" ? "border-b-4 border-blue-600 flex  justify-between items-center p-4 rounded  bg-white" : "border-b-4 border-blue-600 flex  justify-between items-center p-4 rounded  bg-gray-700 text-white"}>
          <div>
            <h2 className="flex flex-col text-lg font-medium">
              Products In Stock
            </h2>
            <p>{23} Products</p>
          </div>
          <div className="text-5xl text-blue-500">
            <MdProductionQuantityLimits />
          </div>
        </div>
        <div className={themeState.theme === "light" ? "border-b-4 border-orange-600 flex  justify-between items-center p-4 rounded  bg-white" : "border-b-4 border-orange-600 flex  justify-between items-center p-4 rounded  bg-gray-700 text-white"}>
          <div>
            <h2 className="flex flex-col text-lg font-medium">Orders</h2>
            <p>{23} Orders</p>
          </div>
          <div className="text-5xl text-orange-500">
            <MdOutlineCardGiftcard />
          </div>
        </div>

        <div className={themeState.theme === "light" ? "border-b-4 border-violet-600 flex  justify-between items-center p-4 rounded  bg-white" : "border-b-4 border-violet-600 flex  justify-between items-center p-4 rounded  bg-gray-700 text-white"}>
          <div>
            <h2 className="flex flex-col text-lg font-medium">Total Revenue</h2>
            <p>{23} $</p>
          </div>
          <div className="text-5xl text-violet-500">
            <FaRegMoneyBillAlt />
          </div>
        </div>
      </div>
  )
}

export default StatisticsCard