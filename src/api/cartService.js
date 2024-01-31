import BaseService from "./baseApiService";

export const Response = (res) => {
  return { data: res.data, status: res.status };
};

export const errorResponse = (error) => {
  return { message: error.data.description, status: error.status };
};

class CartService extends BaseService {
  static async getCartItems() {
    return BaseService.get(null, "/cart");
  }
}

export default CartService;
