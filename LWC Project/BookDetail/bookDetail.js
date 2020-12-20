import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookDetail extends NavigationMixin(LightningElement) {

    @api book;

    fullDetails(){
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes :{
                recordId : this.book.data.fields.Id.value,
                objectApiName : "Book__c",
                actionName : "view",
            }
        });
    }
	deleteRecord(event) {
        deleteRecord(this.book.data.fields.Id.value)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
		
		navigateToBookEdit() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.book.data.fields.Id.value,
                objectApiName: 'Book__c',
                actionName: 'edit'
            },
        });
    }
		
		
		
    get bookName(){
        try{
            return this.book.data.fields.Name.value;
        }catch(error){
            return 'NA';
        }
    }

    get authorName(){
        try{
          return this.book.data.fields.Author__c.value;
        } catch(error){
          return 'NA';
        }
      }
    
      get publisherName(){
        try{
          return this.book.data.fields.Publisher__c.value;
        } catch(error){
          return 'NA';
        }
      }
    
      get bookIsbn(){
        try{
          return this.book.data.fields.ISBN__c.value;
        } catch(error){
          return 'NA';
        }
      }
    
      get publishedYear(){
        try{
          return this.book.data.fields.PublishedYear__c.value;
        } catch(error){
          return 'NA';
        }
      }
    
      get bookRating(){
        try{
          return this.book.data.fields.Average_Rating__c.value;
        } catch(error){
          return 'NA';
        }
      }
    
      get bookBinding(){
        try{
          return this.book.data.fields.Binding__c.value;
        } catch(error){
          return 'NA';
        }
      }
      get pictureUrl(){
        try{
          return this.book.data.fields.ImageUrl__c.value;
        } catch(error){
          return 'NA';
        }
      }
}