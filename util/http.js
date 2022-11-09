import axios from 'axios';

const BASE_URL = process.env.REACT_AXIOS_BASE_URL;

export const storeExpense = async (expenseData) => {
  const response = await axios.post(`${BASE_URL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${BASE_URL}/expenses.json`);
  const expenses = [];

  for (const key in response.data) {
    const { amount, date, description } = response.data[key];

    const expenseObject = {
      id: key,
      amount,
      date: new Date(date),
      description,
    };

    expenses.push(expenseObject);
  }

  return expenses;
};

export const updateExpenses = async (id, expenseData) => {
  console.log({id, expenseData})
  return axios.put(`${BASE_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpenses = async () => {
  return axios.delete(`${BASE_URL}/expenses/${id}.json`);
};
