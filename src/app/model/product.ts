export interface Product {
 
  //   briyani: { id: number; title: string; price: number; photo: string,description:String,categoryId:number,restaurantId:number };
  // iceCream: { id: number; title: string; price: number; photo: string,description:String,categoryId:number,restaurantId:number  };
  // snack:{ id: number; title: string; price: number; photo: string,description:String,categoryId:number,restaurantId:number  };
  id: number;
  title: String;
  description: String;
  price: number;
  categoryId:number;
  restaurantId:number;
  count:number;
  vegOrNonVegId:number;

}
