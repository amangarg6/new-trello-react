import React, { useEffect, useState } from "react";
import Service from "../Service";
import "./Card.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardModal from "./CardModal"; 

function Card({ list }) {
  const [form, setForm] = useState({
    text: "",
    listId: list.id,
  });

  const [cards, setCards] = useState(list.cards || []);

  const [formError, setFormError] = useState({ text: "" });

  const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardComments, setCardComments] = useState({});

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };

  const resetForm = () => {
    setForm({
      text: "",
      listId: list.id,
    });
  };

  useEffect(() => {
    const fetchCards = async () => {
      debugger;
      try {
        const result = await Service.GetCardByLsitId(list.id);
        setCards(result.data);
        console.log(result.data);

        const commentPromises = result.data.map(async (card) => {
          const commentResult = await Service.GetOpenByCardId(card.id);
          return { cardId: card.id, count: commentResult.data.length };
        });

        const comments = await Promise.all(commentPromises);
        const commentsObject = comments.reduce((acc, comment) => {
          acc[comment.cardId] = comment.count;
          return acc;
        }, {});

        setCardComments(commentsObject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCards();
  }, [list.id]);

  const saveClick = async () => {
    try {
      if (isTextBoxOpen) {
        const formData = new FormData();
        formData.append("text", form.text);
        formData.append("listId", form.listId);
        await Service.createcard(formData);
        setCards([...cards, { text: form.text }]);
        resetForm();
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

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedCards = Array.from(cards);
    const [movedCard] = updatedCards.splice(result.source.index, 1);
    updatedCards.splice(result.destination.index, 0, movedCard);

    setCards(updatedCards);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`card-list-${cards}`} key={list.id}>
          {(provided) => (
            <div
              className="list-card"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <form>
                {cards?.map((card, index) => (
                  <Draggable
                    key={index}
                    draggableId={`card-${card.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="card"
                        onClick={() => openModal(card)}
                      >
                        <div className="card-title">{card.text}</div>
                        <div className="comment-section"> 
                          <i className="fas fa-comment"></i>
                          <span>{cardComments[card.id] || 0}</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {isTextBoxOpen && (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      name="text"
                      placeholder="Enter Card Text"
                      value={form.text}
                      onChange={changeHandler}
                    />
                    {formError.text && (
                      <div className="text-danger">{formError.text}</div>
                    )}
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={closeTextBox}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </>
                )}
              </form>
              <div style={{ marginTop: "10px" }}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => {
                    saveClick();
                    toggleTextBox();
                  }}
                >
                  <i className="fas fa-plus"></i> Add a card
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {selectedCard && (
        <CardModal card={selectedCard} closeModal={closeModal} />
      )}
    </div>
  );
}

export default Card;
