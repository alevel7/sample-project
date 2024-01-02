import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ClearSuggestion, loadWords } from 'src/app/store/actions/words.action';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dropDownFilter',
  templateUrl: './dropDownFilter.component.html',
  styleUrls: ['./dropDownFilter.component.scss']
})
export class DropDownFilterComponent implements OnInit {

  foundWords$!: Observable<string[]>;
  isSearchBarFocused: boolean = false;
  inputValue = new FormControl();
  @ViewChild('searchBar', { static: true })
  searchBarRef!: ElementRef;
  isWordSelected = false;

  constructor(private store: Store<{ words: { words: string[] }}>) {
    this.foundWords$ = store.select('words', 'words');
  }
  ngOnInit(): void {
  }

  search(e?: any) {
    if (e?.target?.value === '') {
      return this.clearSuggestions()
    }
    this.store.dispatch(loadWords({filter: e?.target?.value}));
  }
  setSelectedWord(word?: string) {
    if (word) {
      this.inputValue.setValue(word)
      this.searchBarRef.nativeElement.classList.add('deepGreen')
      this.isWordSelected = true;
    }

    this.clearSuggestions()
  }

  loadSuggestions() {
    this.clearHoverEffect();
    if (!this.isWordSelected && !this.inputValue.value) {
      this.isSearchBarFocused = true;
      this.store.dispatch(loadWords({}))
    }
  }

  clearSuggestions() {
    this.store.dispatch(ClearSuggestion())
  }
  onMouseEnter() {
    this.searchBarRef.nativeElement.classList.add('hoverClass')
  }
  clearHoverEffect() {
    this.searchBarRef.nativeElement.classList.remove('hoverClass');
    this.searchBarRef.nativeElement.blur()
    this.clearSuggestions()
  }

  enableSearch() {
    this.isWordSelected = false;
    this.clearHoverEffect();
    this.inputValue.setValue(null)
    this.searchBarRef.nativeElement.classList.remove('deepGreen')
  }

}
