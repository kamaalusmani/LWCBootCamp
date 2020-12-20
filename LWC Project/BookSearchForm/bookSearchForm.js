import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class BookSearchForm extends NavigationMixin(LightningElement) {

    handleBookTitleChange(event){
        const bookTitle = event.detail.value;

        const bookTitleChangeEvent = new CustomEvent('booktitlesearch', {detail : bookTitle});
        this.dispatchEvent(bookTitleChangeEvent);
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }


}