import { LightningElement,track,wire} from 'lwc';
// importing apex class to make callout
import searchGoodReadBooks from '@salesforce/apex/BookResultController.searchGoodReadBooks';
import { refreshApex } from '@salesforce/apex';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
 
export default class SearchBookAPI extends LightningElement {
    searchValue = '';
		@track matchingBookList;
		@track error;

    // update searchValue var when input field value change
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }
 
    // call apex method on button click 
    handleSearchKeyword() {
        console.log('Inside Search Click');
				// endpoint URL
        //let endpointURL = 'https://www.goodreads.com/search/index.xml?' 
                                //+'key=2ZI3MEgz3oVj6v6h0nCTZA'+'&q=' + this.searchValue ;
				 //console.log('endpointURL'+endpointURL);
        if (this.searchValue !== '') {
						console.log('Search Value '+this.searchValue);
            searchGoodReadBooks({searchStr : this.searchValue})
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.matchingBookList = result;
										console.log('jsonResponse ===> '+ result);
										console.log('jsonResponse ===> '+ result.data);
                })
                .catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: 'Data Not Present',
                    });
                    this.dispatchEvent(event);
                    // reset Books var with null   
                    this.matchingBookList = null;
                });
        } else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}