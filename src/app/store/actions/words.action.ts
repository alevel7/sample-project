import { createAction, props } from "@ngrx/store";


export const loadWords = createAction('[Words] Load', props<{filter?: string}>());
export const ClearSuggestion = createAction('[Words] Clear suggestion');
