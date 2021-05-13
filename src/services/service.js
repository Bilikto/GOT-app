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
      name: this._isSet(char.name),
      gender: this._isSet(char.gender),
      born: this._isSet(char.born),
      died: this._isSet(char.died),
      culture: this._isSet(char.culture)
    }
  }

  _transformBook = (book) => {
    return {
      id: this._extractId(book), 
      name: this._isSet(book.name),
      numberOfPages: this._isSet(book.numberOfPages),
      publiser: this.__isSet(book.publiser),
      released: this.__isSet(book.released)
    }
  }

  _transformHouse = (house) => {
    return {
      id: this._extractId(house), 
      name: this._isSet(house.name),
      region: this._isSet(house.region),
      words: this._isSet(house.words),
      titles: this._isSet(house.titles),
      overlord: this._isSet(house.overlord),
      ancestralWeapons: this._isSet(house.ancestralWeapons)
    }
  }

  _extractId = (arr) => {
    const regexp = /\/(\d*)$/;
    arr.match(regexp)[1];
  }

  _isSet = (data) => {
    if (data) {
      return data;
    } else {
      return 'No data..';
    }
  }
}