import { LightningElement, track } from 'lwc';

export default class BookSearch extends LightningElement {
    @track bookTitle = '';
    bookTitleSearchHandler(event){
        this.bookTitle = event.detail;
    }



}