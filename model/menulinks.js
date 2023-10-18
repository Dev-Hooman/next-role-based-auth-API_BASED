import { Schema, model, models } from 'mongoose';

const MenuLinksSchema = new Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    icon: {
        type: String
    },
    path: {
        type: String,
    },
    subItems: {
        type: Array,
        Default: []
    },
});

const MenuLinks = models?.MenuLink || model("MenuLink", MenuLinksSchema);

export default MenuLinks;