import axios from "axios";

let board = "https://localhost:7137/api/board";
let list = "https://localhost:7137/api/list";
let Card = "https://localhost:7137/api/Card";
let modal="https://localhost:7137/api/open";
let description="https://localhost:7137/api/description";

//login url's
const login = (data) => {
  debugger;
  return axios.post("https://localhost:7137/api/register/Login", data);
};

const register = (data) => {
  return axios.post("https://localhost:7137/api/register/register", data);
};

//board url's
const getboard = (data) => {
  return axios.get(board, data);
};

// const createboard=(data)=>{
//   debugger
//   return axios.post(board,data);
// };

const createboard = async (formData) => {
  debugger;
  try {
    const response = await fetch("https://localhost:7137/api/board", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
const updateboard = (data) => {
  return axios.put(board, data);
};

const removeboard = (id) => {
  return axios.delete(`https://localhost:7137/api/board/${id}`);
};

const getboardid = (id) => {
  return axios.get(`https://localhost:7137/api/board/${id}`);
};


const getBoardByid = (boardId) => {
  debugger
  return axios.get(`https://localhost:7137/api/board/${boardId}`);
};

//LIST
const getlist = (data) => {
  return axios.get(list, data);
};

// const createlist=(data)=>{
//   debugger
//   return axios.post(list,data);
// };
const createlist = async (formData) => {
  debugger;
  try {
    const response = await fetch(list, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const GetlistByBoardId = (id) => {
  return axios.get(`https://localhost:7137/api/list/list?id=${id}`);
};

//Card url's
const getcard = (data) => {
  return axios.get(Card, data);
};

const createcard = async (formData) => {
  debugger;
  try {
    const response = await fetch(Card, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
const GetCardByLsitId = (id) => {
  return axios.get(`https://localhost:7137/api/Card/card?id=${id}`);
};

//modal url
const getmodal = (data) => {
  return axios.get(modal, data);
};

const createmodal = async (formData) => {
  debugger;
  try {
    const response = await fetch(modal, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
const GetOpenByCardId = (id) => {
  return axios.get(`https://localhost:7137/api/open/open?id=${id}`);
};

// const   updateCardList= async(cardId, listId)=>{
//   debugger
//   return  axios.put(`${Card}/${cardId}/moveto/${listId}`);
// }
const moveCardToList = async (cardId, listId) => {
  return axios.put(`${Card}/${cardId}/moveto/${listId}`);
};

//description url
const getdescription = (data) => {
  return axios.get(description, data);
};

const createdescription = async (data) => {
  debugger;
  return await axios.post(description, data);
  // try {
  //   const response = await fetch(description, {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const result = await response.json();
  //   return result;
  // } catch (error) {
  //   console.error("Error:", error);
  //   throw error;
  // }
};
const GetDescriptionByCardId = (id) => {
  return axios.get(`https://localhost:7137/api/description/descriptions?id=${id}`);
};

const Service = {
  login,
  register,
  getboard,
  createboard,
  updateboard,
  removeboard,
  getboardid,
  getlist,
  createlist,
  GetlistByBoardId,
  getcard,
  createcard,
  GetCardByLsitId,
  getBoardByid,
  getmodal,
  createmodal,
  GetOpenByCardId,
  // updateCardList,
  moveCardToList,
  getdescription,
  createdescription,
  GetDescriptionByCardId,
};

export default Service;
