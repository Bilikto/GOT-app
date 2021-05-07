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
}