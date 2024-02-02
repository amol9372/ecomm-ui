import BaseService from "./baseApiService";

export const Response = (res) => {
  return { data: res.data, status: res.status };
};

export const errorResponse = (error) => {
  return { message: error.data.description, status: error.status };
};

class AddressService extends BaseService {
  static async getAllAdresses() {
    return BaseService.get(null, "/address");
  }

  // static async getFeatureNames(category) {
  //     return BaseService.get(null, "/admin/feature-template/".concat(category));
  // }

  // static async getVariantFeatures(category) {
  //     return BaseService.get(null, "/admin/variant/".concat(category));
  // }

  //   static async createBudget(budget) {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     const body = { ...budget, userId: user.userId, currency: "CAD" };
  //     return BaseService.post(body, "/budget");
  //   }

  //   static async fetchAllBudgets() {
  //     const user = JSON.parse(localStorage.getItem("user"));

  //     return BaseService.get(null, "/budget/all/".concat(user.userId));
  //   }
}

export default AddressService;
