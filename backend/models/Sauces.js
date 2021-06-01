const mongoose = require('mongoose');
const validator = require('validator');

const isAlphaNum = (/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+(?:[\s-][a-zA-Z]+)+$/i);

const sauceSchema = mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true, 
        validate(value){
            console.log(isAlphaNum.test(value))
            if(!isAlphaNum.test(value)){
                console.log('Le champ Name ne peut contenir des caractères spéciaux');
                console.log(value);
                throw new Error('Ce champ ne peut contenir des caractères spéciaux')
            }
        } 
    },
    manufacturer: { 
        type: String, 
        required: true, 
        validate(value){
            console.log(isAlphaNum.test(value))
            if(!isAlphaNum.test(value)){
                console.log('Le champ Manufacturer ne peut contenir des caractères spéciaux');
                console.log(value);
                throw new Error('Ce champ ne peut contenir des caractères spéciaux')
            }
        }     
    },
    description: { 
        type: String, 
        required: true, 
        validate(value){
            console.log(isAlphaNum.test(value))
            if(!isAlphaNum.test(value)){
                console.log('Le champ Description ne peut contenir des caractères spéciaux');
                console.log(value);
                throw new Error('Ce champ ne peut contenir des caractères spéciaux')
            }
        }     
    },
    mainPepper: { 
        type: String, 
        required: true, 
        validate(value){
            console.log(isAlphaNum.test(value))
            if(!isAlphaNum.test(value)){
                console.log('Le champ Main Pepper Ingredient ne peut contenir des caractères spéciaux');
                console.log(value);
                throw new Error('Ce champ ne peut contenir des caractères spéciaux')            
            }
        }  
    },
    imageUrl: { 
        type: String, 
        required: true 
    },
    heat: { 
        type: Number, 
        required: true 
    },
    likes: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    dislikes: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    usersLiked: { 
        type: [String], 
        required: true, 
        default: [] 
    },
    usersDisliked: { 
        type: [String], 
        required: true, 
        default: [] },
});

module.exports = mongoose.model('Sauce', sauceSchema);
