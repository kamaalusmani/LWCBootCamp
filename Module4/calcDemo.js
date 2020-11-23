import { LightningElement,track } from 'lwc';

export default class CalcDemo extends LightningElement {
		
		@track result='';
		@track partialresult='';
		
		handleClick(event){
                let textValue=event.target.label;
				this.result=this.result+textValue;
				try {
    				this.partialresult=eval(this.result);
				}catch(e) {
   						if (e instanceof SyntaxError) {
        					this.partialresult="Invalid Expression";
    					}
				}				
		}
		handleSymbolClick(event){
                let textValue=event.target.title;
                this.result=this.result+textValue;
		}
		clearInput(event){
            this.result='';
			this.partialresult='';
						
		}
		handleResult(event){
			try {
    			this.result=eval(this.result);
			}catch(e) {
   					if (e instanceof SyntaxError) {
        				this.result="Invalid Expression";
    				}
			}			
		}
}