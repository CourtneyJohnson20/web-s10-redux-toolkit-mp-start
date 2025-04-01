import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteQuote, setHighlightedQuote, editQuoteAuthenticity, toggleVisibility } from '../state/quotesSlice'

export default function Quotes() {
  const quotes = useSelector(st => st.quotesState.quotes)
  const displayAllQuotes = useSelector(st => st.quotesState.displayAllQuotes) // ✨ `displayAllQuotes` must come from the Redux store
  const highlightedQuote = useSelector(st => st.quotesState.highlightedQuote) // ✨ `highlightedQuote` must come from the Redux store
  const dispatch = useDispatch()

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {
          quotes
            ?.filter(qt => {
              return displayAllQuotes || !qt.apocryphal
            })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => {/* ✨ dispatch an action */ 
                    dispatch(deleteQuote(qt.id))
                  }}>DELETE</button>
                  <button onClick={() => {/* ✨ dispatch an action */
                    dispatch(setHighlightedQuote(qt.id))
                   }}>HIGHLIGHT</button>
                  <button onClick={() => {/* ✨ dispatch an action */
                    dispatch(editQuoteAuthenticity(qt.id))
                   }}>FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={() => {/* ✨ dispatch an action */
        dispatch(toggleVisibility())
       }}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
