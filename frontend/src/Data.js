import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import TableData from "./TableData";
import "./Home";
import "./Data.css"

const Data = () => {
  const [tableDatas, setTableDatas] = useState([]);
  let [sn, setSn] = useState(1);
  const [socket, setSocket] = useState(null);
  const [socketData, setSocketData] = useState([]);

  useEffect(() => {
    setSocket(io("https://enigmatic-plateau-39308.herokuapp.com/"));
  }, []);

  useEffect(() => {
    if (socket === null || tableDatas === null) return;
    socket?.emit("send-changes", tableDatas);
    return;
  }, [socket, tableDatas]);

  useEffect(() => {
    console.log(socketData);
    socket?.on("receive-changes", (changedData) => {
      setSocketData(changedData);
    });

    if (socketData[socketData.length - 1] && socketData[socketData.length - 1].result !== "Correct") {
      toast.error(`${socketData[socketData.length - 1].result}`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    return;
  }, [socket, tableDatas.length, socketData.length]);

  useEffect(() => {
    fetch("http://3.145.160.248/api/data")
      .then((res) => res.json())
      .then((data) => setTableDatas(data));
  }, [tableDatas]);

  const handleDelete = (id) => {
    console.log(id);
    const url = `http://3.145.160.248/api/data/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          alert("this will be deleted");
          const remaining = tableDatas.filter(
            (tabledata) => tabledata._id !== id
          );
          setTableDatas(remaining);
        }
      });
  };

  return (
    <div className="">
      <Container>
        <h1 className="tableTitle">Nuts Tightening</h1>
        <ToastContainer position="bottom-right" />
        <div className="container mx-2 my-5 p-2 bg-white shadow shadow-5 rounded rounded-3 ">
          <Table striped hover className="my-4 bg-white rounded">
            <thead>
              <tr>
                <th>Sno/Order</th>
                <th>Nut</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableDatas.map((tabledata) => (
                <tr key={tabledata._id} tableData={tabledata}>
                  <td>{sn++}</td>
                  <td>{tabledata.nut}</td>
                  <td>{tabledata.start}</td>
                  <td>{tabledata.end}</td>
                  <td>{tabledata.result}</td>
                  <td>
                    <Button
                      className="button"
                      onClick={() => handleDelete(tabledata._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Data;