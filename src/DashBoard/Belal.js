import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FaTrash, FaEye, FaMoneyCheckAlt } from "react-icons/fa";
import moment from "moment"; // install this via `npm i moment`
const CampTable = ({ camps, onDelete }) => {
    const navigate = useNavigate()

    const { campId } = useParams()
    const handelePay = (id) => {
        console.log('process to payment', id)
        navigate(`/dashboard/payment/${campId}`)
    }


    return ( <
        div className = "overflow-x-auto" >
        <
        table className = "table table-zebra w-full" > { /* head */ } <
        thead >
        <
        tr >
        <
        th > # < /th> <
        th > Participant Name < /th> <
        th > Camp Name < /th> <
        th > Camp Fees < /th> <
        th > Location < /th> <
        th > Status < /th>             <
        th > Actions < /th> <
        /tr> <
        /thead> <
        tbody > {
            camps ? .map((parcel, index) => ( <
                tr key = { parcel._id } >
                <
                td > { index + 1 } < /td> <
                td className = "capitalize" > { parcel.name } < /td> <
                td className = "capitalize" > { parcel.camp_name } < /td> <
                td className = "capitalize" > { parcel.fees } < /td> <
                td className = "capitalize" > { parcel.location } < /td>

                <
                td > {
                    parcel.payment_status === "paid" ? ( <
                        span className = "badge badge-success" > Paid < /span>
                    ) : ( <
                        span className = "badge badge-error" > Unpaid < /span>
                    )
                } <
                /td> <
                td className = "flex gap-2 justify-center" > { /* View Details */ } <
                Link to = { `/parcel/${parcel._id}` }
                className = "btn btn-sm btn-info text-white tooltip"
                data - tip = "View Details" >
                <
                FaEye / >
                <
                /Link>

                { /* Pay */ } {
                    parcel.payment_status === "unpaid" && ( <
                        button onClick = {
                            () => handelePay(parcel._id) }
                        className = "btn btn-sm btn-warning tooltip"
                        data - tip = "Pay Now" >
                        <
                        FaMoneyCheckAlt / >
                        <
                        /button>
                    )
                }

                { /* Delete */ } <
                button onClick = {
                    () => onDelete(parcel._id) }
                className = "btn btn-sm btn-error tooltip"
                data - tip = "Delete" >
                <
                FaTrash / >
                <
                /button> <
                /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div>
    );
};

export default CampTable;