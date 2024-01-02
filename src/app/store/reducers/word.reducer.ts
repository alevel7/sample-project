import { createReducer, on } from "@ngrx/store";
import { ClearSuggestion, loadWords } from "../actions/words.action";

const database: string[] = [
  'ability', 'ancient', 'culture', 'democracy', 'evidence',
  'freedom', 'government', 'heritage', 'intelligence', 'justice',
  'knowledge', 'liberty', 'mystery', 'nature', 'opportunity',
  'principle', 'quality', 'resource', 'strength', 'tradition',
  'inspiration', 'visionary', 'creativity', 'innovation', 'collaboration',
  'strategy', 'disruption', 'execution', 'transparency', 'agility',
  'expertise', 'integrity', 'adaptability', 'reliability', 'efficiency',
  'diversity', 'sustainability', 'growth', 'achievement', 'leadership',
  'commitment', 'passion', 'excellence', 'respect', 'courage',
  'trust', 'ambition', 'accountability', 'determination', 'empathy',
  'gratitude', 'humility', 'mindfulness', 'patience', 'persistence',
  'resilience', 'wisdom', 'balance', 'curiosity', 'reflection'
]

export interface WordState {
  words: string[];
}

export const initialState:WordState = {
  words: [
    // ...database
  ]
}

export const WordReducer = createReducer(initialState,
  on(loadWords, (state, { filter }) => {

    if (filter) {
      const filteredWords = database.filter(word => word.includes(filter))
      return { ...state, words: filteredWords }
    }
    return { ...state, words: database }
  }),
  on(ClearSuggestion, (state, _) => {
    return {...state, words: []}
  })
  )
