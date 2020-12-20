/**
 * @description       : 
 * @author            : Kamaal Ahmad Usmani
 * @group             : 
 * @last modified on  : 12-07-2020
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   12-06-2020   Kamaal Ahmad Usmani                  Initial Version
**/
public with sharing class BookResultController {
    public static String url = 'https://www.goodreads.com/search/index.xml?';
    public static String DEV_KEY = '2ZI3MEgz3oVj6v6h0nCTZA';
    static Map<String, Book__c> booksMap = new Map<String, Book__c>();
    
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks(String bookTitle){
        
        if(String.isEmpty(bookTitle)){
            return [SELECT Id, Name,ImageUrl__c, ISBN__c,ISBN13__c,Numberofpages__c,PublishedYear__c,
                    Publisher__c,Author__c,Average_Rating__c,Binding__c	
                    FROM Book__c LIMIT 30
                    ];
        } else{
            String keyString = '%'+bookTitle+'%';
            return [SELECT Id, Name,ImageUrl__c, ISBN__c,ISBN13__c,Numberofpages__c,PublishedYear__c,
            Publisher__c,Author__c,Average_Rating__c,Binding__c	
            FROM Book__c WHERE Name like:keyString LIMIT 30];
        }

    }
    @AuraEnabled(Cacheable = true)
    public static List<Book__c> searchGoodReadBooks(String searchStr){
        Map<String, String> requestParams = new Map<String, String>();
        requestParams.put('key', DEV_KEY);
        requestParams.put('q', EncodingUtil.urlEncode(searchStr,'UTF-8'));
        httpResponse response = callout(url, 'GET', requestParams);
        Dom.Document doc = response.getBodyDocument();
        parseBooks(doc);

        //Check and update if book already exist in system
        for(Book__c book : [SELECT Id, Name, Goodreads__c FROM Book__c WHERE Goodreads__c IN :booksMap.keySet()])
        {
            booksMap.get(book.Goodreads__c).Id = book.Id;
        }

        return booksMap.values();
    }

    public static httpResponse callout(String endpoint, String httpMethod, Map<String, String> requestParams){

        //Instantiate an httpRequest and set the required attributes
        httpRequest req = new httpRequest();
        req.setMethod(httpMethod);
        
        if(httpMethod == 'GET' && requestParams != null)
        {
            String reqStr = '';
            for(String key : requestParams.keySet())
            {
                if(String.isNotBlank(reqStr))
                {
                    reqStr = reqStr + '&';
                }
                reqStr = reqStr + key + '=' + requestParams.get(key);
            }

            endpoint = endpoint + reqStr;
        }
		req.setEndpoint(endpoint);
        //timeout duration (in milliseconds) to deal with slow servers or large payloads
        req.setTimeout(120000);
        
        return new http().send(req);
	}
    
    private static void parseBooks(Dom.Document doc) {
        //Retrieve the root element for this document.
        Dom.XMLNode rootNode = doc.getRootElement();
        iterateThroughXML(rootNode);
    }

    private static void iterateThroughXML(DOM.XMLNode node){
		Book__c book = new Book__c();
        if (node.getNodeType() == DOM.XMLNodeType.ELEMENT){
        
            if(node.getName().equalsIgnoreCase('best_book')){
                book.Goodreads__c = node.getChildElement('id', null).getText();
                book.Name = node.getChildElement('title', null).getText();
                book.Author__c = node.getChildElement('author', null).getChildElement('name', null).getText();
                book.ImageUrl__c = node.getChildElement('image_url', null).getText();
                booksMap.put(book.Goodreads__c, book);
            }

            for (Dom.XMLNode child: node.getChildElements())
              iterateThroughXML(child);
        }
    }
}