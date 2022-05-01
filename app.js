//Navigation
const navSlide = () =>{
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () =>{
		nav.classList.toggle('nav-active');

		navLinks.forEach((link, index)=>{
			if(link.style.animation){
				link.style.animation = ''
			} else{
				link.style.animation = 'navLinkFade 0.5s ease forwards $(index / 7 + 1.5)s'
			}
		});	
	});
}
navSlide();

//Distribution Tokens Per User
class tokenDistribution{

    tokenDistCalc(q1, q2, q3){

        //start off by inititializing numtokens and percentages to use later
        var numTokens = 0;
        var percentage = 0;

        //switch statement 1 allows for 4 different choices. based on the value that was passed in for q1 make a selection
        //depending on what case is chosen we will add the corresponding values to numTokens and percentage
        switch (q1) {
            case 1:
                numTokens = numTokens + 3;
                percentage = percentage + .15;
                break;
            case 2:
                numTokens = numTokens + 2;
                percentage = percentage + .10;
                break;
            case 3:
                numTokens = numTokens + 1;
                percentage = percentage + .5;
                break;
            case 4:
                numTokens = numTokens + 0;
                percentage = percentage + .0;
                break;
        }

        //switch statement 2 allows for 7 different choices. based on the value that was passed in for q2 make a selection
        //depending on what case is chosen we will add the corresponding values to numTokens and percentage
        switch (q2) {
            case 1:
                numTokens = numTokens + 1;
                percentage = percentage + .05;
                break;
            case 2:
                numTokens = numTokens + 2;
                percentage = percentage + .10;
                break;
            case 3:
                numTokens = numTokens + 3;
                percentage = percentage + .15;
                break;
            case 4:
                numTokens = numTokens + 4;
                percentage = percentage + .20;
                break;
            case 5:
                numTokens = numTokens + 5;
                percentage = percentage + .25;
                break;
            case 6:
                numTokens = numTokens + 6;
                percentage = percentage + .30;
                break;
            case 7:
                numTokens = numTokens + 7;
                percentage = percentage + .35;
                break;
        }

        //switch statement 3 allows for 3 different choices. based on the value that was passed in for q3 make a selection
        //depending on what case is chosen we will add the corresponding values to numTokens and percentage
        switch (q3) {
            case 1:
                numTokens = numTokens + 3;
                percentage = percentage + .20;
                break;
            case 2:
                numTokens = numTokens + 2;
                percentage = percentage + .15;
                break;
            case 3:
                numTokens = numTokens + 1;
                percentage = percentage + .10;
                break;
        }
        
        //return the final values for numtokens and percentage as an array with two elements
        return [numTokens, percentage]; 

    }
}
//Value for Question 1 in questionaire
var q1 = 1;

//Value for Question 2 in questionaire
var q2 = 1; 

//Value for Question 3 in questionaire
var q3 = 2;

//Call on distribution calculator to find num tokens and percentage
//token info is an array with two elements tokenInfo[0] contains number of tokens where as
//tokenInfo[1] contians the percentage each token takes off of the total for a ride
var tokenInfo = new tokenDistribution().tokenDistCalc(q1, q2, q3);


//Generate list of tokens for user and coupon code
class tokenList {
    constructor() {
        this.tokens = {};
    }
   
    makeCoupon(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    tokenGenerator(amt, percentage) {
        const tt = new hashTable();
        for(var i = 0; i < amt; i++) {
            tt.add(i, [this.makeCoupon(5), percentage]);
        }

        return tt;
    }
}

//Object for individual user and manipulation of tokens of user
class customer {
    constructor(username, pwd, email, initialTokenAmt, percentage) {
        this.customer = {
            username: username,
            password: pwd,
            email: email,
            tokenamount: 0,
            tokens: {}
        }
        this.percentage = percentage;
        this.generateTokens(initialTokenAmt, percentage);
    }

    generateTokens(amt, percentage) {
        const tl = new tokenList();
        this.tl = tl;
        this.tokens = tl.tokenGenerator(amt, percentage);
        this.updateTokenAmt();
        this.customer.tokens = this.tokens;
    }

    addToken() {
        this.tokens.add(this.tokens.length, [this.tl.makeCoupon(5), this.percentage]);
        this.updateTokenAmt();
    }

    useToken() {
        this.tokens.remove(this.tokens.length - 1);
        this.updateTokenAmt();
    }

    updateTokenAmt() {
        this.customer.tokenamount = this.tokens.length;
    }

    get uname() {
        return this.customer.username;
    }

    get email() {
        return this.customer.emaill;
    }

    get tokenAmount() {
        return this.customer.tokenamount;
    }

    get password() {
        return this.customer.password;
    }

    get tokenList() {
        return this.customer.tokens;
    }
}

//Fhashtable to store database of users
class hashTable {
    constructor() {
        this.values = {};
        this.length = 0;
        this.size = 0;
    }

    calculateHash(key) {
        return key.toString().length % this.size;
    }

    add(key, value) {
        const hash = this.calculateHash(key);
        if(!this.values.hasOwnProperty(hash)) this.values[hash] = {};
        this.length++;
        this.values[hash][key] = value;
    }

    search(key) {
        const hash = this.calculateHash(key);
        if(this.values.hasOwnProperty(hash) && this.values[hash].hasOwnProperty(key)) {
            return this.values[hash][key];
        } else {
            return null;
        }
    }

    remove(key) {
        const hash = this.calculateHash(key);
        if(this.values.hasOwnProperty(hash) && this.values[hash].hasOwnProperty(key)) {
            this.values[hash][key] = null;
            this.length--;
        }
    }
}

var db = new hashTable();
var john = new customer("John", "1234five", "john@miner.utep.edu", tokenInfo[0], tokenInfo[1]);
var num = john.tokenAmount;


