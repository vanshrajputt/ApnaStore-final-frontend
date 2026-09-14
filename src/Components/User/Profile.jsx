import React, { useEffect, useState } from 'react'


export default function Profile() {
    let [data, setData] = useState({})
    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            })
            response = await response.json()
            console.log(response)
            setData(response.data)

        })()

    }, [Option])

    return (
        <>
            <table className="table table-bordered">
                {/* <table className="table table-bordered table-striped"> */}
                {/* <table className="table table-dark"> */}
                {/* <table className="table table-sm"> */}
                {/* <table className="table table-hover table-bordered"> */}
                {/* <table className="table table-success"> */}
                {/* <table className="table table-borderless"> */}
                {/* <table className="table table-hover table-primary"> */}
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <th> User Name</th>
                        <td>{data.username}</td>
                    </tr>
                    <tr>
                        <th>Email Address</th>
                        <td>{data.email}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{data.phone}</td>
                    </tr>
                    <tr>
                        <th>Account Type</th>
                        <td>{data.role}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
