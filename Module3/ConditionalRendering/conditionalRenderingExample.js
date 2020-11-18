import { LightningElement } from 'lwc';
import addidasLogo from '@salesforce/resourceUrl/adidasImage';
import otherImage from '@salesforce/resourceUrl/trailhead_characters';

export default class ConditionalRenderingExample extends LightningElement {
    showTemplateOne = true;

    firstImage = addidasLogo;
    secondImage = otherImage;
    switchImages() {
        this.showTemplateOne = !this.showTemplateOne;
    }
}
