import { LightningElement, api, wire, track } from 'lwc';
import getBooks from '@salesforce/apex/BookResultController.getBooks';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const DELAY = 300;
export default class BookSearchResult extends LightningElement {
    @api bookTitle;

    @track books;
    @track selectedBookId;

    @wire(getBooks, {bookTitle : '$bookTitle'})
    wiredBooks({data, error}){
        if(data){
          /* window.clearTimeout(this.delayTimeout);
            this.delayTimeout = setTimeout(()=>{
                this.books = data;
            },DELAY);*/
						this.books = data;
        } else if(error){
            this.showToast('ERROR', error.body.message, 'error');
        }
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    bookSelectHandler(event){
        const bookId = event.detail;
        this.selectedBookId = bookId;
    }

    get BooksFound(){
        if(this.books){
            return true;
        }
        return false;
    }

    


}