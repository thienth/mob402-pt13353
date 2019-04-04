var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, default: null},
    cate_id: {type: Schema.Types.ObjectId, ref: 'categories'},
    price: {type: Number, default: null},
    detail: {type: String, default: null},
    products: [
        {
            pro_id: {type: Schema.Types.ObjectId, ref: 'products'},
            pro_name: {type: String, default: null},
            pro_img: {type: String, default: null}
        }
    ]
});

module.exports = mongoose.model('products', categorySchema);