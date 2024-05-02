import { useEffect, useState } from "react";
import Service from "../Service";
import "./CardModal.css";

function CardModal({ card, closeModal }) {
  const [formError, setFormError] = useState({ comment: "" });
  const [form, setForm] = useState({
    comment: "",
    cardId: card.id
  });
  const [comments, setComments] = useState(card.CardModal || []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };

  const resetForm = () => {
    setForm({
      comment: "",
      cardId: card.id
    });
    setFormError({ comment: "" });
  };

  const saveClick = async () => {
    debugger
    try {
      if (form.comment.trim() === "") {
        setFormError({ comment: "Comment cannot be empty" });
        return;
      }

      const formData = new FormData();
      formData.append("comment", form.comment);
      formData.append("cardId", form.cardId);
      formData.append("userName",localStorage.getItem("userData"));
      await Service.createmodal(formData);
      setComments([...comments, { comment: form.comment }]);
      resetForm();
    } catch (error) {
      console.error("Unable to submit data:", error);
    }
  };

  const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);
  const [description, setDescription] = useState(card.CardModal || []);
  const [formError1, setFormError1] = useState({ description: "" });
  const [form1, setForm1] = useState({
    description: "",
    cardId: card.id,
  });

  const resetForm1 = () => {
    setForm1({
      description: "",
      cardId: card.id,
    });
    setFormError1({ description: "" });
  };

  const changeHandler1 = (e) => {
    setForm1({ ...form1, [e.target.name]: e.target.value });
    setFormError1({ ...formError1, [e.target.name]: "" });
  };

  const saveDescription = async () => {
    try {
      if (isTextBoxOpen) {
        if (form1.description.trim() === "") {
          setFormError1({ description: "Description cannot be empty" });
          return;
        }

        await Service.createdescription(form1);
        setDescription([...description, { description: form1.description }]);
        resetForm1();
      }
    } catch (error) {
      console.error("Unable to submit data:", error);
    }
  };

  const toggleTextBox = () => {
    setIsTextBoxOpen(!isTextBoxOpen);
  };

  const closeTextBox = () => {
    setIsTextBoxOpen(false);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await Service.GetOpenByCardId(card.id);
        setComments(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchComments();
  }, [card.id]);

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const result = await Service.GetDescriptionByCardId(card.id);
        setDescription(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDescriptions();
  }, [card.id]);

  const userData = JSON.parse(localStorage.getItem("userData")).userName;
  console.log("userData" ,userData)

  return (
    <div className="modal-overlay">
      <form>
        <div className="card-modal">
          <div className="card-modal-header">
            <h3>{card.text}</h3>
            <button onClick={closeModal}>&times;</button>
          </div>
          <div className="card-modal-body">
            <p>
              <i className="fas fa-info-circle"></i> Description:
            </p>
            {description?.map((des, index) => (
              <div key={index} className="card">
                <div>{des.description}</div>
              </div>
            ))}
            {isTextBoxOpen ? (
              <form>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Enter List description......"
                  value={form1.description}
                  onChange={changeHandler1}
                />
                {formError1.description && (
                  <div className="text-danger">{formError1.description}</div>
                )}
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={saveDescription}
                >
                  Save
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
              <button
                type="button"
                className="btn btn-info"
                onClick={toggleTextBox}
              >
                <i className="fas fa-plus"></i> Description
              </button>
            )}

            {/* comment */}

            <p>
              <i className="fas fa-comments"></i> Comments:
            </p>
            {comments.map((cont, index) => (
              <div key={index} className="card">
                <div>
                  {userData && <strong>{userData}: </strong>}
                  {cont.comment}
                </div>
              </div>
            ))}
            <input
              type="text"
              className="form-control"
              name="comment"
              placeholder="Enter List comment......"
              value={form.comment}
              onChange={changeHandler}
            />
            {formError.comment && (
              <div className="text-danger">{formError.comment}</div>
            )}
            <button type="button" onClick={saveClick}>
              <i class="fas fa-chart-bar fa-fw me-3"></i>Add Comments
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardModal;
