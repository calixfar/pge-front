import ReactGA from 'react-ga';

class EvenFunctionality {
    constructor(category, action, tag) {
        this.category = category; 
        this.action = action;
        this.tag = tag;
    }
    sendEvent() {
        ReactGA.event({
            category: this.category,
            action: this.action,
            tag: this.tag
        });
    }
}

export default EvenFunctionality;