import express, { json } from 'express'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import fs from 'fs';
// import { Purchases, Items } from '../data.json';

const app = express()
const port = 3033

app.use(json())

interface User {
  id: number
  email: string
  name: string
  lastname: string
  birthday: string
  password: string
}

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

let users: User[] = []
if (fs.existsSync("../user.json"))
  users = JSON.parse(fs.readFileSync("../user.json", "utf-8"));

let nextUserId = 1

const data = JSON.parse(fs.readFileSync("purchase.json", "utf-8"));
// Load purchases and the relationships
let Purchases = data.Purchases;
const PurchaseItems = data.PurchaseItems;
const Items = data.Items;
Purchases = Purchases.map((purchase: any) => {
  purchase.PurchaseItems = PurchaseItems.filter((item: any) => item.PurchaseID == purchase.ID)
  purchase.PurchaseItems = purchase.PurchaseItems.map((purchaseItem: any) => {
    purchaseItem.Item = Items.filter((item: any) => item.ID == purchaseItem.ItemID)[0]
    return purchaseItem;
  });
  return purchase;
})

const FormatPurchase = function (purchase: any) {
  purchase = {
    ID: purchase.ID,
    Date: purchase.Date,
    UserID: purchase.UserID,
    PurchaseItems: purchase.PurchaseItems
  };
  purchase.PurchaseItems = purchase.PurchaseItems.map((purchaseItem: any) => {
    return {
      ItemName: purchaseItem.Item.Name,
      Quantity: purchaseItem.Quantity,
      Price: purchaseItem.Price,
      TotalPurchaseItemPrice: purchaseItem.TotalPurchaseItemPrice
    }
  });
  return purchase;
};

app.post('/user', async (req: Request, res: Response) => {
  const { email, name, lastname, birthday, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const user: User = {
    id: nextUserId++,
    email,
    name,
    lastname,
    birthday,
    password: hashedPassword
  }

  users.push(user)
  // await fs.promises.writeFile('../db.json', JSON.stringify(users));
  fs.writeFileSync("user.json", JSON.stringify(users), "utf-8");
  res.status(201).send('User created');
})


app.get('/purchase', (req: Request, res: Response) => {
  res.status(200).json(Purchases.map((purchase: any) => FormatPurchase(purchase)));
})

app.get('/purchase/:id', (req: Request, res: Response) => {
  //get the data from the purchase.json file
  const id = req.params.id;
  const purchases = Purchases.filter((purchase: any) => purchase.ID == id);
  if (purchases.length == 0) {
    return res.status(404).send("not found");

  }
  res.status(200).json(FormatPurchase(purchases[0]));
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
