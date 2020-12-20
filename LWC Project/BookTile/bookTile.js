import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { createRecord } from 'lightning/uiRecordApi';
// importing Account fields
import BOOK_OBJECT from '@salesforce/schema/Book__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class BookTile extends LightningElement {

    @api book;
    @api bookSelectedId;
		@wire(CurrentPageReference) pageRef;
    handleBookSelect(event){
        event.preventDefault();

        const bookId = this.book.Id;

        const bookSelect = new CustomEvent('bookselect', {detail:bookId});
        this.dispatchEvent(bookSelect);
				fireEvent(this.pageRef, 'bookselect', this.book.Id);
    }

    get isBookSelected(){
        if(this.book.Id === this.bookSelectedId){
            return "tile selected";
        }
        return "tile";
    }
		createBookRecord(event){
				console.log(event.currentTarget.dataset.id);
				console.log(event.currentTarget.dataset.name);
				console.log(event.currentTarget.dataset.author);
				console.log(event.currentTarget.dataset.image);
				event.currentTarget.style='display:none;';
				
				const fields = {};
        fields["Goodreads__c"] = event.currentTarget.dataset.id;
        fields["Name"] = event.currentTarget.dataset.name;
				fields["Author__c"] = event.currentTarget.dataset.author;
				fields["ImageUrl__c"] = event.currentTarget.dataset.image;
				
        const recordInput = { apiName: BOOK_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(obj=> {
               // this.scrId = scrobj.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Book Added Successfully',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
				
				
				
				
		}
}