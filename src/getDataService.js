const path = require('path')

const url1 = './api/company/company'
// create Comment
const url2 = './api/company/createcomment'
// get all Comments by ticker
const url3 = './api/company/comments'
// get all favorite companies
const url4 = './api/company/favoritecompanies'
// add company to favorite
const url5 = './api/company/addcompanytofavorite'
// add company to favorite
const url6 = './api/company/removecompanyfromdb'
// buy ticker
const url7 = './api/company/tickerdeals'


export class GetDataServise {
  constructor() {

  }

  static async getCompany(ticker) {

    const compiledUrl = path.join(process.cwd(),`${url1}/${ticker}`)
    const response = await fetch(compiledUrl,
    {
      method: 'POST',
      headers:{ 'content-type': 'application/json'},
      body: JSON.stringify()
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
    console.log(ticker);
    console.log(response);
    return response
  }



  // payload: {comment: "fff", ticker: "fb"}
  static async createComment (payload) {

    const compiledUrl = path.join(process.cwd(),`${url2}/${payload.ticker}`)

    const response = await fetch(compiledUrl,
    {
      method: 'POST',
      headers:{
        // Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));

    return response
  }


  // payload: ''
  static async getComments (ticker) {

    const compiledUrl = path.join(process.cwd(),`${url3}/${ticker}`)

    const response = await fetch(compiledUrl,
    {
      method: 'POST',
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify()
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));

    return response
  }

  static async getFavoriteCompanies() {

    const compiledUrl = path.join(process.cwd(),`${url4}`)
    const response = await fetch(compiledUrl,
      {
        method: 'POST',
        headers:{ 'content-type': 'application/json'},
        body: JSON.stringify()
      })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
      console.log(response);
      return response
    }

  static async addCompanyToFavorite(ticker) {

    const compiledUrl = path.join(process.cwd(),`${url5}/${ticker}`)
    const response = await fetch(compiledUrl,
      {
        method: 'POST',
        headers:{ 'content-type': 'application/json'},
        body: JSON.stringify()
      })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
      return response
    }

  static async removeCompanyFromDB(payload) {
    // {ticker: this.company.symbol, pageFrom: this.pageFrom}
    const compiledUrl = path.join(process.cwd(),`${url6}`)
    const response = await fetch(compiledUrl,
      {
        method: 'POST',
        headers:{ 'content-type': 'application/json'},
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
      return response
  }

  static async tickerDeals (payload) {
    const compiledUrl = path.join(process.cwd(),`${url7}/${payload.ticker}`)
    const response = await fetch(compiledUrl,
    {
      method: 'POST',
      headers:{ 'content-type': 'application/json'},
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
    console.log(payload);
    console.log(response);
    return response
  }
}
