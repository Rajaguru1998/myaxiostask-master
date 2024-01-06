import axios from "axios";
import React, { useEffect, useState } from "react";


const PersonDetails = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState(0);
  const [init, setInit] = useState(false);

  useEffect(() => {
      
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const postData = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name: name,
        email: email,
        phone: phone,
      })
      .then((res) => {
        const newData = [...data, res.data];
        setData(newData);
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteApi = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const updatedData = data.filter((user) => user.id !== id);
        setData(updatedData);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const updateEdit = (data) => {
    console.log(data);
    setName(data.name);
    setEmail(data.email);
    setPhone(data.phone);
    setInit(true);
  };

  const handleUpdateUser = () => {
    setName(false);
    const updatedUser = {
      id: id,
      name: name,
      email: email,
      phone: phone,
    };
    axios
      .patch(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      )
      .then((res) => {
        console.log(res);
        const updatedData = data.map((user) => {
          if (user.id === updatedUser.id) {
            return { ...user, ...updatedUser };
          }
          return user;
        });
        setData(updatedData);
        setName(name);
        setEmail(email);
        setPhone(phone);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="container">
        <label className="texts">Name</label>
        <input
          type="text"
          className="input-text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="texts">Email-ID</label>
        <input
          type="email"
          className="input-text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="texts">Phone.No</label>
        <input
          type="number"
          className="input-text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          className="btn btn-success"
          onClick={() => {
            if (init) {
              handleUpdateUser();
            } else {
              postData();
            }
          }}
        >
          Create
        </button>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-title mt-3">
          </div>
          <div className="card-body">
            <table className="table table-bordered mt-3">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email-ID</th>
                  <th>Phone.No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button
                        className="btn btn-success m-1"
                        onClick={() => {
                          updateEdit(user);
                          setId(user.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => deleteApi(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;