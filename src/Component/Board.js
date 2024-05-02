import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Service from "../Service";
import Navbar from "./Navbar";
import List from "./List";
import { useLocation, useNavigate } from "react-router-dom";

function Board() {

  const [form, setForm] = useState({ title: "", visibility: "" });
  const [formError, setFormError] = useState({ title: "", visibility: "" });
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };

  const resetForm = () => {
    setForm({ title: "", visibility: "" });
  };

  // const location = useLocation();
  // const id = location.state?.id;
  // const navigate = useNavigate();

  // const employee = (id) => {
  //   navigate("/app/list", { state: { id: id } });
  // };
  

  const getAll = async () => {
    try {
      const result = await Service.getboard();
      setBoards(result.data); 
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveClick = async () => {
    debugger;
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("visibility", form.visibility);

      await Service.createboard(formData);
      await getAll();
      resetForm();
      document.getElementById("newModal").click();
    } catch (error) {
      console.error("Unable to submit data:", error);
    }
  };

  return (
    <div className="row">
    <Sidebar boards={boards} />

      <div className="modal" id="newModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">New Board</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
         
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group text-left">
                  <label htmlFor="txtTitle">Title:</label>
                  <input
                    onChange={changeHandler}
                    id="txtTitle"
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    className="form-control"
                    value={form.title}
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="ddlVisibility">Visibility:</label>
                  <select
                    id="ddlVisibility"
                    name="visibility"
                    className="form-control"
                    value={form.visibility}
                    onChange={changeHandler}
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Workspace">Workspace</option>
                  </select>
                </div>
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
                onClick={saveClick}
                data-dismiss="modal"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
