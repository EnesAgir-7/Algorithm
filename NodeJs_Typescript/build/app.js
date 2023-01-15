"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs_1 = __importDefault(require("fs"));
// import { Purchases, Items } from '../data.json';
const app = (0, express_1.default)();
const port = 3033;
app.use((0, express_1.json)());
// interface Purchase {
//   id: number
//   userId: number
//   item: string
//   quantity: number
// }
// interface PurchaseItem {
//   id: number
//   purchaseId: number
//   item: string
//   price: number
// }
let users = [];
if (fs_1.default.existsSync("../user.json"))
    users = JSON.parse(fs_1.default.readFileSync("../user.json", "utf-8"));
let nextUserId = 1;
const data = JSON.parse(fs_1.default.readFileSync("purchase.json", "utf-8"));
// Load purchases and the relationships
let Purchases = data.Purchases;
const PurchaseItems = data.PurchaseItems;
const Items = data.Items;
Purchases = Purchases.map((purchase) => {
    purchase.PurchaseItems = PurchaseItems.filter((item) => item.PurchaseID == purchase.ID);
    purchase.PurchaseItems = purchase.PurchaseItems.map((purchaseItem) => {
        purchaseItem.Item = Items.filter((item) => item.ID == purchaseItem.ItemID)[0];
        return purchaseItem;
    });
    return purchase;
});
const FormatPurchase = function (purchase) {
    purchase = {
        ID: purchase.ID,
        Date: purchase.Date,
        UserID: purchase.UserID,
        PurchaseItems: purchase.PurchaseItems
    };
    purchase.PurchaseItems = purchase.PurchaseItems.map((purchaseItem) => {
        return {
            ItemName: purchaseItem.Item.Name,
            Quantity: purchaseItem.Quantity,
            Price: purchaseItem.Price,
            TotalPurchaseItemPrice: purchaseItem.TotalPurchaseItemPrice
        };
    });
    return purchase;
};
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, lastname, birthday, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = {
        id: nextUserId++,
        email,
        name,
        lastname,
        birthday,
        password: hashedPassword
    };
    users.push(user);
    // await fs.promises.writeFile('../db.json', JSON.stringify(users));
    fs_1.default.writeFileSync("user.json", JSON.stringify(users), "utf-8");
    res.status(201).send('User created');
}));
app.get('/purchase', (req, res) => {
    res.status(200).json(Purchases.map((purchase) => FormatPurchase(purchase)));
});
app.get('/purchase/:id', (req, res) => {
    //get the data from the purchase.json file
    const id = req.params.id;
    const purchases = Purchases.filter((purchase) => purchase.ID == id);
    if (purchases.length == 0) {
        return res.status(404).send("not found");
    }
    res.status(200).json(FormatPurchase(purchases[0]));
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
