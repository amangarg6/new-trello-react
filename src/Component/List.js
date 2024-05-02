import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Service from '../Service';
import './List.css';
import { useParams, useNavigate } from 'react-router-dom';
import Card from './Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function List() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    boardId: id || '',
  });
  const [formError, setFormError] = useState({ title: '' });
  const [lists, setLists] = useState([]);
  const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);

  const fetchLists = async () => {
    try {
      const result = await Service.GetlistByBoardId(id);
      setLists(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [id]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: '' });
  };

  const resetForm = () => {
    setForm({
      title: '',
      boardId: id || '',
    });
  };

  const saveClick = async () => {
    try {
      if (isTextBoxOpen) {
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('boardId', form.boardId);

        await Service.createlist(formData);
        await fetchLists();
        resetForm();
        setIsTextBoxOpen(false); // Close the text box
      }
    } catch (error) {
      console.error('Unable to submit data:', error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    // Reorder the lists based on the drag-and-drop result
    const updatedLists = Array.from(lists);
    const [movedList] = updatedLists.splice(result.source.index, 1);
    updatedLists.splice(result.destination.index, 0, movedList);

    // Update the state with the new list order
    setLists(updatedLists);
  };

  const toggleTextBox = () => {
    setIsTextBoxOpen(!isTextBoxOpen);
  };
  const closeTextBox = () => {
    setIsTextBoxOpen(false);
  };
  return (
    <div className="row">
    <Sidebar />
    <div className="col-10">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`list-containe-${lists}`} direction="horizontal" type="LIST">
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map((list, index) => (
                <Draggable key={list.id} draggableId={`list-${list.id}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="list-card"
                    >
                      <h4>{list.title}</h4>
                      <Card list={list} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className="list-card add-list-card">
                {isTextBoxOpen ? (
                  <form>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Enter List Title"
                      value={form.title}
                      onChange={changeHandler}
                    />
                    {formError.title && <div className="text-danger">{formError.title}</div>}
                    <button type="button" className="btn btn-info" onClick={saveClick}>
                      Add List
                    </button>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={closeTextBox}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </form>
                ) : (
                  <button type="button" className="btn btn-info" onClick={toggleTextBox}>
                    <i className="fas fa-plus"></i> Add another list
                  </button>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  </div>
);
}


export default List;
