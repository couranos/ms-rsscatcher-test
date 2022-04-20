import { Schema, model } from 'mongoose';
import { MainInterface } from "./interface";
import { MongoDbSet } from "./sets/mongodb.set";


// 1. Create a Schema corresponding to the document interface.
const schema = new Schema<MainInterface>({
    _id: Schema.Types.ObjectId,
    title:  {
        type: String,
        required: true
    }, // Libellé
    category:  String, // Category
    subcategory:  String, // Subcategory
    status: { type: String, default: 'active'}, // 
    user:  {type: Schema.Types.ObjectId, ref: 'UserDoc'}, //
  }, {timestamps: true});

/*
|-------------------------------------------- 
| CREATE MODEL
|--------------------------------------------
*/
const MainModel = model<MainInterface>('mainDoc', schema);
/*
|--------------------------------------------
| DEFAULT METHODS CALLED BY EXPORTED CLASS
|--------------------------------------------
*/
export class MainSet extends MongoDbSet{
    static defaultModel = MainModel
    constructor(){
     super()   
    }
}
