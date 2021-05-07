import React from 'react';

export default class GotService {
  constructor() {
    this._apiBase = 'https://anapioficeandfire.com/api';
  }

  async gotResourse(url) {
    const response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(`Coudn't fetch: ${url} status: ${response.status}`);
    }

    return await response.json();
  }

  getAllCharacters = async () => {
    const data = await this.gotResourse(`/characters?page=10&pageSize=10`);
    return data;
  }

  getCharacter = async (id) => {
    const data = await this.gotResourse(`/characters/${id}`);
    return data;
  }

  getAllBooks = async () => {
    const data = await this.gotResourse(`/books?page=10&pageSize=10`);
    return data;
  }

  getBook = async (id) => {
    const data = await this.gotResourse(`/books/${id}`);
    return data;
  }








}