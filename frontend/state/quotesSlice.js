// ✨ create your `quotesSlice` in this module
import { createSlice } from '@reduxjs/toolkit'

let id = 1
const getNextId = () => id++

const quotesSlice = createSlice({
    name: 'quote_state',
    initialState: {
    displayAllQuotes: true,
    highlightedQuote: null,
    quotes: [
      {
        id: getNextId(),
        quoteText: "Don't cry because it's over, smile because it happened.",
        authorName: "Dr. Seuss",
        apocryphal: false,
      },
      {
        id: getNextId(),
        quoteText: "So many books, so little time.",
        authorName: "Frank Zappa",
        apocryphal: false,
      },
      {
        id: getNextId(),
        quoteText: "Be yourself; everyone else is already taken.",
        authorName: "Oscar Wilde",
        apocryphal: false,
      },
    ],
  },

  reducers: {
    toggleVisibility(state) {
      state.displayAllQuotes = !state.displayAllQuotes
    },
    setHighlightedQuote(state, action) {
      if (state.highlightedQuote === action.payload) {
        state.highlightedQuote = null
      } else {
        state.highlightedQuote = action.payload
      }
    },
    deleteQuote(state, action) {
      const id = action.payload
      state.quotes = state.quotes.filter(qt => qt.id !== id)

    },
    editQuoteAuthenticity(state, action) {
      const id = action.payload
      const quote = state.quotes
        .find(qt => qt.id === id)
      quote.apocryphal = !quote.apocryphal
    },
    createQuote: {
      prepare(quoteText, authorName){
        return { payload: {id: getNextId(), quoteText, authorName}}
      },
      reducer(state, action){
        state.quotes.push(action.payload)
      }
    }
  }
})

/*let id = 1
const getNextId = () => id++
const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
}*/

export default quotesSlice.reducer;
export const {
  toggleVisibility,
  setHighlightedQuote,
  deleteQuote,
  editQuoteAuthenticity,
  createQuote
} = quotesSlice.actions
