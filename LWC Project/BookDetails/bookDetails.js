import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

import BOOK_ID from '@salesforce/schema/Book__c.Id';
import BOOK_NAME from '@salesforce/schema/Book__c.Name';
import BOOK_PICTURE from '@salesforce/schema/Book__c.ImageUrl__c';
import BOOK_ISBN from '@salesforce/schema/Book__c.ISBN__c';
import BOOK_ISBN13 from '@salesforce/schema/Book__c.ISBN13__c';
import BOOK_PAGES from '@salesforce/schema/Book__c.Numberofpages__c';
import BOOK_YEAR from '@salesforce/schema/Book__c.PublishedYear__c';
import BOOK_PUBLISHER from '@salesforce/schema/Book__c.Publisher__c';
import BOOK_AUTHOR from '@salesforce/schema/Book__c.Author__c';
import BOOK_RATING from '@salesforce/schema/Book__c.Average_Rating__c';
import BOOK_BINDING from '@salesforce/schema/Book__c.Binding__c';

const fields = [
    BOOK_ID,
    BOOK_NAME,
    BOOK_PICTURE,
    BOOK_ISBN,
    BOOK_ISBN13,
    BOOK_PAGES,
    BOOK_YEAR,
    BOOK_PUBLISHER,
    BOOK_AUTHOR,
    BOOK_RATING,
    BOOK_BINDING
]

export default class BookDetails extends LightningElement {

    bookId;
    @track selectedTabValue;
    
    @wire(CurrentPageReference) pageRef;

    @wire(getRecord, { recordId : '$bookId', fields})
    book;

    connectedCallback(){
        registerListener('bookselect', this.callBackMethod, this);
    }

    callBackMethod(payload){
        this.bookId = payload;
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    tabChangeHandler(event){
        this.selectedTabValue = event.target.value;
    }

    get bookFound(){
        if(this.book.data){
            return true;
        }
        return false;
    }
}