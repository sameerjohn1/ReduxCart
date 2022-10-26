import React, { useState, useEffect } from "react";
import "./style.css";
import Table from "react-bootstrap/Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT, ADD, REMOVE } from "../redux/actions/action";

const CardsDetails = () => {
  const [data, setData] = useState([]);
  // console.log(data);

  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(id);
  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const dispatch = useDispatch();

  // add data
  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  // remove one
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Detail Page</h2>
        {/*  */}
        <section className="container mt-3">
          <div className="iteamsdetails">
            {data.map((ele) => {
              return (
                <>
                  <div className="items_img">
                    <img src={ele.imgdata} alt="" />
                  </div>
                  {/*  */}
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restuarent</strong> : {ele.rname}
                          </p>
                          <p>
                            <strong>Price</strong> : $ {ele.price}
                          </p>
                          <p>
                            <strong>Dishes</strong> : {ele.address}
                          </p>
                          <p>
                            <strong>Total</strong> : $ {ele.price * ele.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              color: "#111",
                              background: "#ddd",
                              cursor: "pointer",
                            }}
                          >
                            <span
                              style={{ fontSize: 24 }}
                              onClick={
                                ele.qnty <= 1
                                  ? () => dlt(ele.id)
                                  : () => remove(ele)
                              }
                            >
                              -
                            </span>
                            <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => send(ele)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating :</strong>
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {ele.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review :</strong>
                            <span>{ele.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove :</strong>
                            <span>
                              <i
                                className="fa fa-trash"
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                                onClick={() => dlt(ele.id)}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;
