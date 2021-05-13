import React from 'react';

export default class GotService {
  constructor() {
    this._apiBase = 'https://anapioficeandfire.com/api';
  }

  async getResourse(url) {
    const response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(`Coudn't fetch: ${url} status: ${response.status}`);
    }

    return await response.json();
  }

  getAllCharacters = async () => {
    const data = await this.getResourse(`/characters?page=10&pageSize=10`);
    return data.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const data = await this.getResourse(`/characters/${id}`);
    return this._transformCharacter(data);
  }

  getAllBooks = async () => {
    const data = await this.getResourse(`/books?page=10&pageSize=10`);
    return data.map(this._transformBook);
  }

  getBook = async (id) => {
    const data = await this.getResourse(`/books/${id}`);
    return this._transformBook(data);
  }

  getAllHouses = async () => {
    const data = await this.getResourse(`/houses?page=10&pageSize=10`);
    return data.map(this._transformHouse);
  }

  getHouse = async (id) => {
    const data = await this.getResourse(`/houses/${id}`);
    return this._transformHouse(data);
  }

  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  }

  _transformBook = (book) => {
    return {
      id: this._extractId(book), 
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released
    }
  }

  _transformHouse = (house) => {
    return {
      id: this._extractId(house), 
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    }
  }

  _extractId = (arr) => {
    const regexp = /\/(\d*)$/;
    arr.match(regexp)[1];
  }
}